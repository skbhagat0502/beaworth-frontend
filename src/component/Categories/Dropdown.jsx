import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../actions/categoryAction";
import { getProduct } from "../../actions/productAction";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [category, setCategory] = useState("");

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (category.trim() !== "") {
      dispatch(getProduct(category));
      navigate(`/products/category=${category}`);
    }
  }, [dispatch, category, navigate]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "black", margin: "0", padding: "0" }}
      >
        <span className="max-[500px]:text-[16px] text-gray-500 capitalize">
          category
        </span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {categories.map((category) => (
          <MenuItem
            key={category._id}
            onClick={() => setCategory(category.category)}
          >
            {category.category}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
export default Dropdown;
