import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";
import BasicModal from "../layout/Modal";
import { toast } from "react-toastify";
import Layout from "../layout/Layout";
import SideBar from "./SideBar";
const VISIBLE_FIELDS = ["id", "name", "email", "phone", "role", "actions"];

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const deleteUserHandler = (id) => {
    setSelectedUserId(id);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleConfirmation = () => {
    if (selectedUserId) {
      dispatch(deleteUser(selectedUserId));
      setSelectedUserId(null);
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
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
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
                <Link to={`/admin/user/${params.id}`}>
                  <EditIcon />
                </Link>

                <Button onClick={() => deleteUserHandler(params.id)}>
                  <DeleteIcon />
                </Button>
              </React.Fragment>
            );
          }
          return params.value;
        },
      })),
    [deleteUserHandler]
  );

  const rows = React.useMemo(() => {
    return (
      users &&
      users.map((item, index) => ({
        id: item._id,
        role: item.role,
        phone: item?.phone,
        email: item?.email,
        name: item.name,
      }))
    );
  }, [users]);

  return (
    <Layout>
      <div className="flex justify-start items-start w-full bg-white">
        <SideBar screenName="Users" />
        <Box sx={{ height: "100vmin", width: "100vmax" }}>
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

          <BasicModal
            text="Are you sure that you want to delete!"
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

export default UsersList;
