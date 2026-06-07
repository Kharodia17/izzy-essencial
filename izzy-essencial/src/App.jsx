import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import ProtectedRoute from "./components/shared/ProtectedRoute.jsx";
import Navbar from "./components/shared/Navbar.jsx";
import BottomNav from "./components/shared/BottomNav.jsx";

// Lazy-load all pages — splits Firebase SDK and page code into separate chunks
const Home                = lazy(() => import("./pages/Home.jsx"));
const Catalog             = lazy(() => import("./pages/Catalog.jsx"));
const ProductDetail       = lazy(() => import("./pages/ProductDetail.jsx"));
const Location            = lazy(() => import("./pages/Location.jsx"));
const Login               = lazy(() => import("./pages/Login.jsx"));
const Dashboard           = lazy(() => import("./pages/Dashboard.jsx"));
const AddProduct          = lazy(() => import("./pages/AddProduct.jsx"));
const EditProduct         = lazy(() => import("./pages/EditProduct.jsx"));
const CategoryManagerPage = lazy(() => import("./pages/CategoryManagerPage.jsx"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
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

              <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />

              <Route path="/admin" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><Dashboard /></Suspense></ProtectedRoute>} />
              <Route path="/admin/products/new" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><AddProduct /></Suspense></ProtectedRoute>} />
              <Route path="/admin/products/:id/edit" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><EditProduct /></Suspense></ProtectedRoute>} />
              <Route path="/admin/categories" element={<ProtectedRoute><Suspense fallback={<PageLoader />}><CategoryManagerPage /></Suspense></ProtectedRoute>} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
