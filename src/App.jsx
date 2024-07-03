import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./component/layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
const ProtectedRoute = lazy(() => import("./component/Route/ProtectedRoute"));
const Dashboard = lazy(() => import("./component/Admin/Dashboard"));
const LoginSignUp = lazy(() => import("./component/User/LoginSignUp"));
const Home = lazy(() => import("./component/Home/Home"));
const Products = lazy(() => import("./component/Product/Products"));
const Profile = lazy(() => import("./component/User/Profile"));
const NewProduct = lazy(() => import("./component/Admin/NewProduct"));
const OrderList = lazy(() => import("./component/Admin/OrderList"));
const UserList = lazy(() => import("./component/Admin/UsersList"));
const ProductList = lazy(() => import("./component/Admin/ProductList"));
const ProductReviews = lazy(() => import("./component/Admin/ProductReviews"));
const ProductDetails = lazy(() => import("./component/Product/ProductDetails"));
const Cart = lazy(() => import("./component/Cart/Cart"));
const Shipping = lazy(() => import("./component/Cart/Shipping"));
const Payment = lazy(() => import("./component/Cart/Payment"));
const OrderSuccess = lazy(() => import("./component/Cart/OrderSuccess"));
const MyOrders = lazy(() => import("./component/Order/MyOrders"));
const ProcessOrder = lazy(() => import("./component/Admin/ProcessOrder"));
const UpdateUser = lazy(() => import("./component/Admin/UpdateUser"));
const UpdateProduct = lazy(() => import("./component/Admin/UpdateProduct"));
const SellerApplication = lazy(() =>
  import("./component/Seller/SellerApplication")
);
import Contact from "./component/layout/Contact/Contact";
const ShopChannel = lazy(() => import("./component/Shop/ShopChannel"));
const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route exact path="/products/*" element={<Products />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/shipping" element={<ProtectedRoute />}>
            <Route exact path="/shipping" element={<Shipping />} />
          </Route>
          <Route exact path="/shop/:id" element={<ShopChannel />} />
          <Route exact path="/account" element={<ProtectedRoute />}>
            <Route exact path="/account" element={<Profile />} />
          </Route>
          <Route exact path="orders" element={<ProtectedRoute />}>
            <Route exact path="/orders" element={<MyOrders />} />
          </Route>
          <Route exact path="/seller/application" element={<ProtectedRoute />}>
            <Route
              exact
              path="/seller/application"
              element={<SellerApplication />}
            />
          </Route>
          <Route
            exact
            path="/process/payment"
            isAdmin={true}
            element={<ProtectedRoute />}
          >
            <Route exact path="/process/payment" element={<Payment />} />
          </Route>
          <Route
            exact
            path="/admin/dashboard"
            isAdmin={true}
            element={<ProtectedRoute />}
          >
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
          </Route>
          <Route
            exact
            path="/admin/product"
            isAdmin={true}
            element={<ProtectedRoute />}
          >
            <Route exact path="/admin/product" element={<NewProduct />} />
          </Route>
          <Route
            exact
            path="/admin/orders"
            isAdmin={true}
            element={<ProtectedRoute />}
          >
            <Route exact path="/admin/orders" element={<OrderList />} />
          </Route>
          <Route
            exact
            path="/admin/users"
            isAdmin={true}
            element={<ProtectedRoute />}
          >
            <Route exact path="/admin/users" element={<UserList />} />
          </Route>
          <Route
            exact
            path="/admin/products"
            isAdmin={true}
            element={<ProtectedRoute />}
          >
            <Route exact path="/admin/products" element={<ProductList />} />
          </Route>
          <Route
            exact
            path="/admin/reviews"
            isAdmin={true}
            element={<ProtectedRoute />}
          >
            <Route exact path="/admin/reviews" element={<ProductReviews />} />
          </Route>
          <Route
            exact
            path="/admin/order/:id"
            isAdmin={true}
            element={<ProtectedRoute />}
          >
            <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
          </Route>
          <Route
            exact
            path="/admin/user/:id"
            isAdmin={true}
            element={<ProtectedRoute />}
          >
            <Route exact path="/admin/user/:id" element={<UpdateUser />} />
          </Route>
          <Route
            exact
            path="/admin/product/:id"
            isAdmin={true}
            element={<ProtectedRoute />}
          >
            <Route
              exact
              path="/admin/product/:id"
              element={<UpdateProduct />}
            />
          </Route>
          <Route exact path="/success" element={<ProtectedRoute />}>
            <Route exact path="/success" element={<OrderSuccess />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
