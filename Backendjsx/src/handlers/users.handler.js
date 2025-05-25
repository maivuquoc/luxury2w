const usersService = require('../services/users.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function getAll(req, res){
    usersService.getAll(this.mysql)
    .then((result) =>{
        res.send(result);
    })
    .catch((err) =>{
        console.error('Database error: ', err);
        res.status(500).send({error: 'Internal Server Error'});
    });
}

//
function getOne(req, res){
    const id = req.params.id;
    usersService.getOne(this.mysql, id)
    .then((result) => {
        if(!result){
            res.status(404).send({error: 'Not found'});
            return;
        }
        res.send(result);
    })
    .catch((err) =>{
        console.error('Database error: ', err);
        res.status(500).send({error: 'Internal Server Error'});
    });
}

//
async function createUser(req, res) {
    const {name, username, password, email, phone, address, gender, thumbnail, roles, created_at, created_by, updated_at, updated_by, status} = req.body;
    //thuc hien ma hoa password
    const saltRounds= 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
        const result = await usersService.createUser(this.mysql, {username, password:
        hashedPassword, name, email, phone, address, gender, thumbnail, roles, created_at, created_by, updated_at, updated_by, status});
        const id = result.insertId;
        const user = await usersService.getOne(this.mysql, id);
        res.send(user);
    }catch(err){
        console.error('Database error: ', err);
        res.status(500).send({error: err.message});
    }
}

//
async function login(req, res) {
    try{    
        const {email, password} = req.body;
        const user = await usersService.login(this.mysql, {email});
        if(!user){
            res.status(401).send({error: 'Unauthorized'});
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(401).send({error: 'Unauthorized'});
            return;
        }

        //tạo jwt token
        const secretkey = process.env.JWT_SECRET_KEY;
        if(!secretkey){
            console.error('JWT_SECRET_KEY is not set in enviroment variables');
            res.status(500).send({error: 'Internal Server Error'});
            return;
        }
        const token = jwt.sign({id: user.id, name: user.name}, secretkey,
            {expiresIn: '2h'}
        );

        const response = {
            jwt: token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                password: user.password,
                email: user.email,
                phone: user.phone,
                address: user.address,
                gender: user.gender,
                thumbnail: user.thumbnail,
                roles: user.roles,
                
                created_at: user.created_at,
                created_by: user.created_by,
                updated_at: user.updated_at,
                updated_by: user.updated_by,
                status: user.status
            }
        };
        res.send(response);
    }catch(err){
        console.error('Database or bcrypt error: ', err);
        res.status(500).send({error: 'Internal Server Error'});

    }
}

//
function updateUser(req, res){
    const data = req.body;
    const id = req.params.id;
    usersService.updateUser(this.mysql, data, id)
    .then(async(result) => {
        if(result.affectedRows === 0){
            res.status(400).send({Error: 'Not found'});
            return
        }
        const item = await usersService.getOne(this.mysql, id);
        res.send(item);
    })
    .catch(err => {
        console.error('Database', err);
        res.status(500).send({Error: 'Internal Server Error'});
    })
}

//
async function deleteUser(req, res){
    const id = req.params.id;
    try {
        const item = await usersService.getOne(this.mysql, id);
        if(!item){
            res.status(404).send({error: 'user not found'});
        }
        const result = await usersService.deleteUser(this.mysql, id);
        if(result.error){
            res.status(404).send(result);
        }else{
            res.send(item);
        }
    } catch (error) {
        console.err('Database error:', err);
        res.status(500).send({error: 'Internal Server Error'});
    }
}

//
function updateStatus(req, res) {
    const id = req.params.id;
    const { status } = req.body;

    usersService.updateStatus(this.mysql, id, status)
        .then((result) => {
            if (result.affectedRows === 0) {
                res.status(404).send({ error: 'User not found' });
            } else {
                res.send({ message: 'Status updated successfully' });
            }
        })
        .catch((err) => {
            console.error('Database error:', err);
            res.status(500).send({ error: 'Internal Server Error' });
        });
}

//check email
async function checkEmail(req, res) {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).send({ error: 'Email là bắt buộc' });
        }

        // Sử dụng hàm login trong service để kiểm tra email (vì login cũng lấy user theo email)
        const user = await usersService.login(this.mysql, { email });

        if (user) {
            return res.send({ exists: true });
        } else {
            return res.status(404).send({ exists: false, message: 'Email không tồn tại' });
        }
    } catch (err) {
        console.error('Lỗi kiểm tra email:', err);
        return res.status(500).send({ error: 'Lỗi server nội bộ' });
    }
}

//thay đổi pass
async function updatePassword(req, res) {
    try {
        const { email, newPassword } = req.body;

        // B1: Kiểm tra email có tồn tại
        const user = await usersService.login(this.mysql, { email });
        if (!user) {
            res.status(404).send({ error: 'Email không tồn tại' });
            return;
        }

        // B2: Mã hoá mật khẩu mới
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // B3: Cập nhật mật khẩu mới vào database
        const result = await usersService.updatePassword(this.mysql, {
            email,
            password: hashedPassword
        });

        if (result.affectedRows === 0) {
            res.status(500).send({ error: 'Cập nhật mật khẩu thất bại' });
            return;
        }

        res.send({ message: 'Mật khẩu đã được cập nhật thành công' });

    } catch (err) {
        console.error('Lỗi xử lý forgotPassword:', err);
        res.status(500).send({ error: 'Lỗi server nội bộ' });
    }
}


module.exports = {
    getAll, getOne, createUser, login, updateUser, deleteUser, updateStatus, checkEmail, updatePassword
}
