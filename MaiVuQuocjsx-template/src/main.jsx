import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import ShopRouter from './route/shop.js'
import AdminRouter from './route/admin.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './compoment/shop/ShopLayout.jsx'
import LayoutAdmin from './compoment/admin/AdminLayout.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PrivateRoute from '../src/compoment/common/PrivateRoute.jsx';
import LoginAdmin from './pages/admin/LoginAdmin.jsx';
import RegisterAdmin from './pages/admin/RegisterAdmin.jsx';
import store from './redux/store.jsx';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {
            ShopRouter.map((router, index) => {
              const Page = router.component;
              return <Route key={index} path={router.path} element={< Page />} />
            })
          }
        </Route>

        {/* Route login admin tách riêng */}
        <Route path='/admin/login' element={<LoginAdmin />} />
        <Route path='/admin/register' element={<RegisterAdmin />} />

        {/* Các route admin còn lại nằm trong layout + có thể được bảo vệ */}
        <Route
          path='/admin'
          element={
            <PrivateRoute>
              <LayoutAdmin />
            </PrivateRoute>
          }
        >
          {AdminRouter.map((router, index) => {
            const Page = router.component;
            return <Route key={index} path={router.path} element={<Page />} />;
          })}
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </BrowserRouter>
  </StrictMode>
  </Provider>
  ,
)
