import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOAD_CART, TOTAL } from "../../redux/action/cartAction"; 
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/layoutsite.css';

const Layout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser?.id) {
            const savedCart = localStorage.getItem(`cart_${currentUser.id}`);
            if (savedCart) {
                dispatch({ type: LOAD_CART, payload: JSON.parse(savedCart) });
            }
        }
    }, [dispatch]);

    return (
        <div>
            <Header />
            
            <div className="row content">
                <Outlet />
            </div>
            
            <Footer />
        </div>
    );
};

export default Layout;
