import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import Navbar from "./components/shared/Navbar.jsx";
import BottomNav from "./components/shared/BottomNav.jsx";
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Location from "./pages/Location.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import CategoryManagerPage from "./pages/CategoryManagerPage.jsx";

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/location" element={<Location />} />
              </Route>

              <Route path="/admin/login" element={<Login />} />

              <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/products/new" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
              <Route path="/admin/products/:id/edit" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
              <Route path="/admin/categories" element={<ProtectedRoute><CategoryManagerPage /></ProtectedRoute>} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
