import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Store from './pages/Store';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}> 
              <Route path="/store" element={<Store />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/*" element={<Navigate to="/store" />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}
