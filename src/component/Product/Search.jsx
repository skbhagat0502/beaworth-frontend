import React, { useState, Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import Dropdown from "../Categories/Dropdown";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/keyword=${keyword}`);
    }
  };

  return (
    <Fragment>
      <MetaData title="Search A Product -- Beaworth" />
      <div className="search">
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <i className="min-[550px]:hidden searchIcon">
            <IoIosSearch />
          </i>
          <input
            autoFocus
            type="text"
            placeholder="Search products..."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input type="submit" value="Search" className="max-[550px]:hidden" />
        </form>
      </div>
    </Fragment>
  );
};

export default Search;
