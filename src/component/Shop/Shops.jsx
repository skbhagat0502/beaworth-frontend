import { useDispatch, useSelector } from "react-redux";
import { getAllShops, clearErrors } from "../../actions/shopAction";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { NavLink } from "react-router-dom";
const Shops = () => {
  const dispatch = useDispatch();
  const { error, loading, shops } = useSelector((state) => state.allShops);
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getAllShops());
  }, [dispatch]);
  return (
    <div className="min-[1076px]:mx-[8vmax] mx-[2vmax] mb-20">
      {loading ? (
        <Loader />
      ) : (
        shops &&
        shops.map((shop) => (
          <NavLink
            to={`/shop/${shop._id}`}
            key={shop._id}
            className="flex flex-col justify-start bg-white rounded-t-md w-56 max-[475px]:w-full h-50 border border-[#DEE2E7]"
          >
            <div className="p-4">
              <p className="text-blue-600 font-bold text-[1.125rem]">
                {shop.shopName}
              </p>
              <p className="text-gray-600 font-semibold">
                {shop.category} Shop
              </p>
            </div>
            <div className="bg-blue-600 text-white w-full p-4 rounded-t-md">
              <p>Address {shop.streetAddress}</p>
              <p>{shop.city}</p>
              <button className="bg-white text-blue-600 rounded-md w-full py-2 mt-2 font-bold">
                Visit Shop
              </button>
            </div>
          </NavLink>
        ))
      )}
    </div>
  );
};
export default Shops;
