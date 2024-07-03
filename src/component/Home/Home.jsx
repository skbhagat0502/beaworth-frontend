import { Fragment, useEffect } from "react";
import Slider from "../Slider/Slider";
import Categories from "../Categories/Categories";
import Layout from "../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Shops from "../Shop/Shops";
import { getAllCategories } from "../../actions/categoryAction";

const Home = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { categories } = useSelector((state) => state.categories);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);
  return (
    <Fragment>
      <Layout>
        <div className="grid place-items-center min-[1075px]:px-[8vmax] px-[2vmax]">
          <div className="flex gap-4 my-4 overflow-x-auto min-[500px]:hidden w-full">
            {categories.map((category) => (
              <button
                className="bg-gray-300 px-6 py-2 rounded-md text-blue-600 scrollbar-hidden"
                onClick={() =>
                  navigate(`/products/category=${category.category}`)
                }
              >
                {category.category}
              </button>
            ))}
          </div>
          <div className="flex w-full justify-center item-center min-[1075px]:p-4 p-2 my-[2rem] max-[500px]:my-2 bg-white rounded-md border border-[#DEE2E7]">
            <div className="max-[1075px]:hidden">
              <Categories />
            </div>
            <Slider />
            <div className="w-[15vmax] h-full max-[1075px]:hidden min-w-60 mx-4">
              <div className="bg-[#E3F0FF] h-[50%] w-full p-4 rounded-md">
                <p className="text-xl">
                  Hi, {user?.name ? `${user.name}` : "there!"}
                  <br />
                  let’s get stated
                </p>
                {!isAuthenticated && (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="my-2 bg-blue-500 w-full h-[2rem] rounded-md text-white"
                    >
                      Join Now
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      className="bg-white w-full h-[2rem] rounded-md text-blue-500"
                    >
                      Login
                    </button>
                  </>
                )}
                {isAuthenticated && (
                  <>
                    <button
                      onClick={() => navigate("/orders")}
                      className="my-2 bg-blue-500 w-full h-[2rem] rounded-md text-white"
                    >
                      Orders
                    </button>
                    <button
                      onClick={() => navigate("/cart")}
                      className="bg-white w-full h-[2rem] rounded-md text-blue-500"
                    >
                      Your Cart
                    </button>
                  </>
                )}
              </div>
              <div className="bg-[#F38332] h-[50%] w-full p-4 rounded-md my-4">
                <p className="text-white text-[1.25vmax]">
                  List your shop in Beaworth
                </p>
              </div>
              <div className="bg-[#55BDC3] h-[50%] w-full p-2 rounded-md max-[1075px]:hidden">
                <p className="text-white text-[1.25vmax]">
                  Earn more by selling on Beaworth
                </p>
              </div>
            </div>
          </div>
        </div>
        <Shops />
      </Layout>
    </Fragment>
  );
};

export default Home;
