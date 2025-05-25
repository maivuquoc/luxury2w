//Dashboard
import Dashboard from '../pages/admin/Dashboard/Index'

//category
import CategoryList from "../pages/admin/category/List";
import CategoryShow from "../pages/admin/category/Show"
import CategoryAdd from "../pages/admin/category/Add";
import CategoryEdit from "../pages/admin/category/Edit";
import CategoryTrash from "../pages/admin/category/Trash"

//banner
import BannerList from '../pages/admin/banner/List';
import BannerShow from '../pages/admin/banner/Show';
import BannerAdd from '../pages/admin/banner/Add';
import BannerEdit from '../pages/admin/banner/Edit';
import BannerTrash from '../pages/admin/banner/Trash';

//product
import ProductList from "../pages/admin/product/List";
import ProductShow from '../pages/admin/product/Show';
import ProductAdd from "../pages/admin/product/Add";
import ProductEdit from "../pages/admin/product/Edit";
import ProductTrash from"../pages/admin/product/Trash"
// import ProductDetail from "../pages/admin/product/Detail";
// import ProductList from "../pages/admin/product/List";

//contact
import ContactList from "../pages/admin/contact/List";
import ContactShow from "../pages/admin/contact/Show";
import ContactAdd from "../pages/admin/contact/Add";
import ContactEdit from "../pages/admin/contact/Edit";
import ContactTrash from "../pages/admin/contact/Trash";

//user
import UserList from '../pages/admin/user/List';
import UserShow from '../pages/admin/user/Show';
import UserEdit from '../pages/admin/user/Edit';
import UserTrash from '../pages/admin/user/Trash';

//order
import OrderList from '../pages/admin/order/List';
import OrderShow from '../pages/admin/order/Show';
import OrderAdd from '../pages/admin/order/Add';
import OrderEdit from '../pages/admin/order/Edit';
import OrderTrash from '../pages/admin/order/Trash';

//Order Detail
import OrderDetailList from '../pages/admin/orderdetail.js/List';
import OrderDetailShow from '../pages/admin/orderdetail.js/Show';
import OrderDetailAdd from '../pages/admin/orderdetail.js/Add';
import OrderDetailEdit from '../pages/admin/orderdetail.js/Edit';
import OrderDetailTrash from '../pages/admin/orderdetail.js/Trash';

//topic
import TopicList from '../pages/admin/topic/List';
import TopicShow from '../pages/admin/topic/Show';
import TopicAdd from '../pages/admin/topic/Add';
import TopicEdit from '../pages/admin/topic/Edit';
import TopicTrash from '../pages/admin/topic/Trash';

//post
import PostList from '../pages/admin/post/List';
import PostShow from '../pages/admin/post/Show';
import PostAdd from '../pages/admin/post/Add';
import PostEdit from '../pages/admin/post/Edit';
import PostTrash from '../pages/admin/post/Trash';

//brand
import BrandList from '../pages/admin/brand/List';
import BrandShow from '../pages/admin/brand/Show';
import BrandAdd from '../pages/admin/brand/Add';
import BrandEdit from '../pages/admin/brand/Edit';
import BrandTrash from '../pages/admin/brand/Trash';

//login
import LoginAdmin from '../pages/admin/LoginAdmin';
//register
import RegisterAdmin from '../pages/admin/RegisterAdmin';

const AdminRouter = [

    {'path': '/admin' , 'component' :Dashboard},


    //category
    {'path': '/admin/listCategory' , 'component' :CategoryList},
    {'path': '/admin/showCategory/:id' , 'component' :CategoryShow},
    {'path': '/admin/addCategory' , 'component' :CategoryAdd},
    {'path': '/admin/editCategory/:id' , 'component' :CategoryEdit},
    {'path': '/admin/trashCategory' , 'component' :CategoryTrash},


    //banner
    {'path': '/admin/listBanner' , 'component' :BannerList},
    {'path': '/admin/showBanner/:id' , 'component' :BannerShow},
    {'path': '/admin/addBanner' , 'component' :BannerAdd},
    {'path': '/admin/editBanner/:id' , 'component' :BannerEdit},
    {'path': '/admin/trashBanner' , 'component' :BannerTrash},

    //product
    {'path': '/admin/listProduct' , 'component' :ProductList},
    {'path': '/admin/showProduct/:id' , 'component' :ProductShow},
    {'path': '/admin/addproduct' , 'component' :ProductAdd},
    {'path': '/admin/editProduct/:id' , 'component' :ProductEdit},
    {'path': '/admin/trashProduct' , 'component' :ProductTrash},


    // {'path': '/admin/products/:page/:limit' , 'component' :ProductList},
    // {'path': '/admin/detailProduct/:slug' , 'component' :ProductDetail},

    //brand
    {'path': '/admin/listBrand' , 'component' :BrandList},
    {'path': '/admin/showBrand/:id' , 'component' :BrandShow},
    {'path': '/admin/addBrand' , 'component' :BrandAdd},
    {'path': '/admin/editBrand/:id' , 'component' :BrandEdit},
    {'path': '/admin/trashBrand' , 'component' :BrandTrash},

    //contact
    {'path': '/admin/listContact' , 'component' :ContactList},
    {'path': '/admin/showContact/:id' , 'component' :ContactShow},
    {'path': '/admin/addContact' , 'component' :ContactAdd},
    {'path': '/admin/editContact/:id' , 'component' :ContactEdit},
    {'path': '/admin/trashContact' , 'component' :ContactTrash},

    //user
    {'path': '/admin/listUser' , 'component' :UserList},
    {'path': '/admin/showUser/:id' , 'component' :UserShow},
    {'path': '/admin/editUser/:id' , 'component' :UserEdit},
    {'path': '/admin/trashUser' , 'component' :UserTrash},

    //topic
    {'path': '/admin/listTopic' , 'component' :TopicList},
    {'path': '/admin/showTopic/:id' , 'component' :TopicShow},
    {'path': '/admin/addTopic' , 'component' :TopicAdd},
    {'path': '/admin/editTopic/:id' , 'component' :TopicEdit},
    {'path': '/admin/trashTopic' , 'component' :TopicTrash},

    //post
    {'path': '/admin/listPost' , 'component' :PostList},
    {'path': '/admin/showPost/:id' , 'component' :PostShow},
    {'path': '/admin/addPost' , 'component' :PostAdd},
    {'path': '/admin/editPost/:id' , 'component' :PostEdit},
    {'path': '/admin/trashPost' , 'component' :PostTrash},
    
    //order
    {'path': '/admin/listOrder' , 'component' :OrderList},
    {'path': '/admin/showOrder/:id' , 'component' :OrderShow},
    {'path': '/admin/addOrder' , 'component' :OrderAdd},
    {'path': '/admin/editOrder/:id' , 'component' :OrderEdit},
    {'path': '/admin/trashOrder' , 'component' :OrderTrash},

    //order detail
    {'path': '/admin/listOrderDetail' , 'component' :OrderDetailList},
    {'path': '/admin/showOrderDetail/:id' , 'component' :OrderDetailShow},
    {'path': '/admin/addOrderDetail' , 'component' :OrderDetailAdd},
    {'path': '/admin/editOrderDetail/:id' , 'component' :OrderDetailEdit},
    {'path': '/admin/trashOrderDetail' , 'component' :OrderDetailTrash},
    
    //login
    {'path': '/admin/login' , 'component' :LoginAdmin},
    //register
    {'path': '/admin/register' , 'component' :RegisterAdmin},



];
export default AdminRouter;