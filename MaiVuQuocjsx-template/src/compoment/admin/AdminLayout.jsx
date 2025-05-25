import Header from './Header';
import Footer from './Footer';
import { Outlet } from "react-router-dom";


const AdminLayout = ({ children }) => {
    return (
        <div className="d-flex flex-column vh-100">
            <Header />
            <div >
                            <Outlet/>
                        </div>
            <Footer />
        </div>
    );
};

export default AdminLayout;
