const fs = require('fs');
const path = require('path');
const util = require('util');
const pump = util.promisify(require('stream').pipeline);

async function uploadFile(req, res) {
    const data = await req.file();

    if (!data || !data.filename) {
        res.status(400).send({ message: 'No file uploaded or file name is missing!' });
        return;
    }

    const filename = data.filename.replace(/\s+/g, '-');

    // Đảm bảo thư mục tồn tại
    const uploadDir = path.join(global.appRoot, "uploads");
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename); // ✔ sửa chỗ này
    const fileUrl = `${process.env.HOST}/uploads/${filename}`;

    try {
        await pump(data.file, fs.createWriteStream(filePath));
        res.send({
            message: 'File uploaded successfully',
            url: fileUrl,
            filename: filename
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error uploading file' });
    }
}

module.exports = {
    uploadFile
}
