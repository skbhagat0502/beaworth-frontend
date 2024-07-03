import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./SideBar";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { toast } from "react-toastify";
import { getAllCategories } from "../../actions/categoryAction";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout/Layout";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { error, product } = useSelector((state) => state.productDetails);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { categories } = useSelector((state) => state.categories);

  const productId = params.id;
  if (error) {
    toast.error(error);
    dispatch(clearErrors());
  }
  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
    dispatch(getAllCategories());
  }, [dispatch, navigate, isUpdated, productId, product, updateError]);

  const updateProductSubmitHandler = (e) => {
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
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
      <MetaData title="Update Product" />
      <div className="dashboard">
        <SideBar />
        <div className="min-[1075px]:mx-[8vmax] mx-[2vmax] my-[5vmax] flex justify-center items-center ">
          <form
            className="bg-white flex flex-col w-96 p-4 gap-4"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1 className="text-white bg-blue-600 p-2 text-xl mb-2">
              Create Product
            </h1>

            <div className="flex justify-start items-center gap-2">
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-b border-gray-300 outline-none mx-2"
              />
            </div>
            <div className="flex justify-start items-center gap-2">
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="w-full border-b border-gray-300 outline-none mx-2"
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
                className="w-full border-b border-gray-300 outline-none mx-2"
              ></textarea>
            </div>

            <div className="flex justify-start items-center gap-2">
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border-b border-gray-300 outline-none mx-2"
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate._id} value={cate._id}>
                    {cate.category}
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
                value={Stock}
                className="w-full border-b border-gray-300 outline-none mx-2"
              />
            </div>

            <div className="flex justify-start items-center gap-2">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
                className="w-full border-b border-gray-300 outline-none mx-2"
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
              className="bg-blue-600 p-2 rounded-sm text-white text-xl"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
