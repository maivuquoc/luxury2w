//Trang chủ
import Home from "../pages/shop/Home";
import About from "../pages/shop/About";

//Liên hệ
import Contact from "../pages/shop/Contact/Contact";

//Sản phẩm
import Products from "../pages/shop/Product/Products";
import ProductDetail from "../pages/shop/ProductDetail";
import ProductsByCat from "../pages/shop/Product/ProductByCat";
import ProductsByBra from "../pages/shop/Product/ProductByBra";

//Bài viết
import Post from "../pages/shop/Post/Post";
import PostDetail from "../pages/shop/Post/PostDetail";

//Người dùng
import RegisterUser from "../pages/shop/User/Resgister";
import Login from "../pages/shop/User/Login";
import ForgotPassword from "../pages/shop/User/ForgotPassword";
import Cart from "../pages/shop/Cart/Cart";
import Checkout from "../pages/shop/Cart/Checkout";
import Profile from "../pages/shop/User/Profile";
import Orders from "../pages/shop/User/Orders";
import OrderDetail from "../pages/shop/Cart/OrderDetail"

//Chính sách
import PolicyProduct from "../pages/shop/Policy/PolicyProduct";
import PolicySell from "../pages/shop/Policy/PolicySell";
import PolicyDelivery from "../pages/shop/Policy/PolicyDelivery";
import PolicyReturn from "../pages/shop/Policy/PolicyReturn";

//Hộ trợ
import SupportService from "../pages/shop/Support/SupportService";
import StoreLocator from "../pages/shop/Support/StoreLocator";
import FaqPage from "../pages/shop/Support/FaqPage";

//mật khẩu
import ResetPassword from "../pages/shop/User/ResetPassword";


const ShopRouter = [

    //Trang chủ
    {'path': '/' , 'component' :Home},
    {'path': 'about' , 'component' :About},
    {'path': 'contact' , 'component' :Contact},
    {'path': 'products' , 'component' :Products},

    {'path': 'products/slug/:slug' , 'component' :ProductDetail},
    {'path': 'products-by-cat/:category_id' , 'component' :ProductsByCat},
    {'path': 'products-by-bra/:brand_id' , 'component' :ProductsByBra},


    //Người dùng
    {'path': 'register' , 'component' :RegisterUser},
    {'path': 'login' , 'component' :Login},
    {'path': 'forgot-password' , 'component' :ForgotPassword},
    {'path': 'cart' , 'component' :Cart},
    {'path': 'checkout' , 'component' :Checkout},
    {'path': 'profile' , 'component' :Profile},
    {'path': 'order-by-user/:user_id' , 'component' :Orders},
    {'path': 'orders/:id' , 'component' :OrderDetail},

    //matkhau
    {'path': 'resetpassword' , 'component' :ResetPassword},


    //Bài viết
    {'path': 'post', 'component' :Post},
    {'path': 'post/:id', 'component' :PostDetail},

    //Chính sách
    {'path': 'policyproduct', 'component' :PolicyProduct},
    {'path': 'policysell', 'component' :PolicySell},
    {'path': 'policydelivery', 'component' :PolicyDelivery},
    {'path': 'policyreturn', 'component' :PolicyReturn},

    //Hỗ trợ
    {'path': 'supportservice', 'component' :SupportService},
    {'path': 'storelocator', 'component' :StoreLocator},
    {'path': 'faqpage', 'component' :FaqPage},

    //Thanh toán
    

    

];
export default ShopRouter;