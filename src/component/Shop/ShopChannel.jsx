import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getShopDetails, clearErrors } from "../../actions/shopAction";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import ProductCard from "../Home/ProductCard";
import "../Product/Products.css";
const ShopChannel = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const shopId = params.id;
  const { shop, products, error, loading } = useSelector(
    (state) => state.shopDetails
  );
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getShopDetails(shopId));
  }, [dispatch]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-[1076px]:mx-[8vmax]">
          <div className="py-4 bg-slate-600 text-white px-4">
            <h1 className="font-bold text-[3vmax] text-center font-mono">
              {shop.shopName}
            </h1>
            <p className="text-center">
              {shop.streetAddress}
              {", "}
              {shop.city}
            </p>
          </div>
          <div>
            <MetaData title="PRODUCTS -- Beaworth" />
            <h2 className="productsHeading">Products</h2>

            <div className="products">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ShopChannel;
