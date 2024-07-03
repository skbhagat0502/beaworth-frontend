import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import BasicModal from "../layout/Modal";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
const VISIBLE_FIELDS = ["id", "name", "stock", "price", "actions"];
import SideBar from "./SideBar";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, products } = useSelector((state) => state.products);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.product);

  const [selectedProductId, setSelectedProductId] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const deleteProductHandler = (id) => {
    setSelectedProductId(id);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleConfirmation = () => {
    if (selectedProductId) {
      dispatch(deleteProduct(selectedProductId));
      setSelectedProductId(null);
      setOpenModal(false);
    }
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success(message);
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, deleteError, navigate, isDeleted, message]);

  const columns = React.useMemo(
    () =>
      VISIBLE_FIELDS.map((field) => ({
        field,
        headerName: field.charAt(0).toUpperCase() + field.slice(1),
        flex: 1,
        sortable: false,
        renderCell: (params) => {
          if (field === "actions") {
            return (
              <React.Fragment>
                <Link to={`/admin/product/${params.id}`}>
                  <EditIcon />
                </Link>
                <Button onClick={() => deleteProductHandler(params.id)}>
                  <DeleteIcon />
                </Button>
              </React.Fragment>
            );
          }
          return params.value;
        },
      })),
    [deleteProductHandler]
  );

  const rows = React.useMemo(() => {
    return (
      products &&
      products.map((item) => ({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      }))
    );
  }, [products]);

  return (
    <Layout>
      <div className="flex justify-start items-start w-full bg-white">
        <SideBar screenName="Products" />
        <Box sx={{ height: "100vmin", width: "100vmax" }}>
          {rows ? (
            <DataGrid
              rows={rows}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          ) : (
            <div>Loading...</div>
          )}

          <BasicModal
            text="Are you sure that you want to delete this product?"
            btnText1="No"
            btnText2="Yes"
            open={openModal}
            handleClose={handleModalClose}
            handleConfirmation={handleConfirmation}
          />
        </Box>
      </div>
    </Layout>
  );
};

export default ProductList;
