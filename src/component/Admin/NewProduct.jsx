import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./SideBar";
import { toast } from "react-toastify";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { getAllCategories } from "../../actions/categoryAction";
import Layout from "../layout/Layout";
import Loader from "../layout/Loader/Loader";

const NewProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  if (error) {
    toast.error(error);
    dispatch(clearErrors());
  }
  useEffect(() => {
    if (success) {
      toast.success("Product Created Successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
    dispatch(getAllCategories());
  }, [dispatch, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
    setName("");
    setDescription("");
    setImages("");
    setCategory("");
    setPrice([]);
    setImagesPreview([]);
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Layout>
      <MetaData title="Create Product" />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-start items-start w-full h-full">
          <SideBar screenName="listProduct" />
          <div className="w-[100vmax] mt-[5vmax] grid place-items-center">
            <form
              className="flex flex-col gap-4 bg-white w-96 p-4 rounded-md border border-gray-300"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <h1 className="text-2xl">List Product</h1>

              <div className="flex justify-start items-center gap-2">
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="outline-none w-full border-b border-gray-300"
                />
              </div>
              <div className="flex justify-start items-center gap-2">
                <AttachMoneyIcon />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  className="outline-none w-full border-b border-gray-300"
                />
              </div>

              <div className="flex justify-start items-center gap-2">
                <DescriptionIcon />

                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                  className="outline-none w-full border-b border-gray-300"
                ></textarea>
              </div>

              <div className="flex justify-start items-center gap-2">
                <AccountTreeIcon />
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="outline-none w-full border-b border-gray-300"
                >
                  <option value="">Choose Category</option>
                  {categories &&
                    categories.map((category, index) => (
                      <option key={index} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex justify-start items-center gap-2">
                <StorageIcon />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                  className="outline-none w-full border-b border-gray-300"
                />
              </div>

              <div className="flex justify-start items-center gap-2">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                  className="outline-none w-full border-b border-gray-300"
                />
              </div>

              <div
                id="createProductFormImage"
                className="w-full h-32 flex gap-2"
              >
                {imagesPreview.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Product Preview"
                    className="w-[80px] h-[80px] aspect-square object-cover"
                  />
                ))}
              </div>

              <button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
                className="bg-blue-600 text-white py-2 rounded-md"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default NewProduct;
