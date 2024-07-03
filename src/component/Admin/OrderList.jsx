import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";
import BasicModal from "../layout/Modal";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import SideBar from "./SideBar";

const VISIBLE_FIELDS = ["id", "status", "itemsQty", "amount", "actions"];

const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, orders } = useSelector((state) => state.allOrders);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.order);

  const [selectedOrderId, setSelectedOrderId] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const deleteOrderHandler = (id) => {
    setSelectedOrderId(id);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleConfirmation = () => {
    if (selectedOrderId) {
      dispatch(deleteOrder(selectedOrderId));
      setSelectedOrderId(null);
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
      toast.success("Order deleted successfully!");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, deleteError, history, isDeleted, message]);

  const columns = React.useMemo(
    () =>
      VISIBLE_FIELDS.map((field) => ({
        field,
        headerName: field.charAt(0).toUpperCase() + field.slice(1),
        flex: 1,
        sortable: true,
        renderCell: (params) => {
          if (field === "actions") {
            return (
              <React.Fragment>
                <Link to={`/admin/order/${params.id}`}>
                  <EditIcon />
                </Link>
                <Button onClick={() => deleteOrderHandler(params.id)}>
                  <DeleteIcon />
                </Button>
              </React.Fragment>
            );
          }
          return params.value;
        },
      })),
    [deleteOrderHandler]
  );

  const rows = React.useMemo(() => {
    return (
      orders &&
      orders.map((item) => ({
        id: item._id,
        itemsQty: item.orderItems.reduce(
          (qty, orderItem) => qty + orderItem.quantity,
          0
        ),
        amount: item.totalPrice,
        status: item.orderStatus,
      }))
    );
  }, [orders]);

  return (
    <Layout>
      <div className="flex justify-start items-start w-full bg-white">
        <SideBar screenName="Orders" />
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
            text="Are you sure that you want to delete this order?"
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

export default OrderList;
