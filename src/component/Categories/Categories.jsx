import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {
  getAllCategories,
  clearErrors,
  deleteCategory,
} from "../../actions/categoryAction";
import { useNavigate } from "react-router-dom";
import "./category.css";
import { getProduct } from "../../actions/productAction";
import { newCategory } from "../../actions/categoryAction";
import DeleteIcon from "@mui/icons-material/Delete";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { error, loading } = useSelector((state) => state.newCategory);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [categoryValue, setCategoryValue] = useState("");
  const [currCategory, setCurrCategory] = useState("");
  useEffect(() => {
    if (categoryValue.trim() !== "") {
      dispatch(getProduct(categoryValue));
      navigate(`products/category=${categoryValue}`);
    }
    dispatch(getAllCategories());
  }, [dispatch, categoryValue, navigate]);

  const handleClick = (event) => {
    setCategoryValue(event.target.value);
  };
  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (currCategory.trim().length == 0) {
      return;
    }
    dispatch(newCategory({ category: currCategory }));
    setCurrCategory("");
    dispatch(getAllCategories());
  };
  const handleDeleteCategory = async (id) => {
    dispatch(deleteCategory(id));
    dispatch(getAllCategories());
  };
  if (error) {
    toast.error(error);
    dispatch(clearErrors());
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="category grow flex justify-start rounded-sm h-full flex-col w-[max-content] items-start h-96 min-w-60 mx-2">
          <button className="text-xl w-full h-[2.5rem] px-2 flex justify-between items-center text-gray-700 rounded-sm text-white bg-blue-600">
            All Categories
          </button>
          {categories &&
            categories.map((singleCategory) => {
              return (
                <div
                  className="flex justify-between items-center w-full"
                  key={singleCategory._id}
                >
                  <button
                    onClick={handleClick}
                    value={singleCategory.category}
                    className="text-xl w-full h-[2.5rem] px-2 flex justify-between items-center text-gray-700 rounded-md"
                  >
                    {singleCategory.category}
                  </button>
                  {user && user.role === "admin" && (
                    <button
                      onClick={() => handleDeleteCategory(singleCategory._id)}
                      className="text-blue-600"
                    >
                      <DeleteIcon />
                    </button>
                  )}
                </div>
              );
            })}
          {user && user.role === "admin" && (
            <form
              className="text-xl w-full h-[2.5rem] px-2 flex flex-col justify-start items-center text-gray-700 rounded-md"
              onSubmit={handleCreateCategory}
            >
              <input
                type="text"
                className="border border-gray-500 outline-none px-2 text-sm py-2 w-full rounded-sm"
                placeholder="Add a category"
                value={currCategory}
                onChange={(e) => setCurrCategory(e.target.value)}
              />
              <button
                type="submit"
                className="text-white bg-blue-600 p-2 w-full my-2 rounded-sm text-sm"
              >
                Create
              </button>
            </form>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Categories;
