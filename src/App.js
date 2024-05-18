import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/profile/Profile';
import UserDetails from './pages/profile/UserDetails';
import ProductList from './pages/product/ProductList';
import CartList from './pages/cart/cartList';
import ProductCreatePage from './pages/product/ProductCreatePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/userDetails/:id" element={<UserDetails />} />
        <Route path="/productList/:id" element={<ProductList />} />
        <Route path="/cartList/:id" element={<CartList />} />
        <Route path="/addProduct" element={<ProductCreatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
