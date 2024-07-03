import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../actions/categoryAction";
import { clearErrors } from "../../actions/shopAction";
import Loader from "../layout/Loader/Loader";
import { newShop } from "../../actions/shopAction";

function SellerApplication() {
  const dispatch = useDispatch();
  const { loading, categories } = useSelector((state) => state.categories);
  const { error, success } = useSelector((state) => state.shop);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    "Basic Details",
    "Shop Details",
    "Other Details",
    "Shop Address Details",
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    shopName: "",
    shopAddress: "",
    category: "",
    gstNo: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // const storedFormData = localStorage.getItem("formData");
    // if (!storedFormData) {
    //   setFormData(JSON.parse(formData));
    // }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getAllCategories());
  }, [dispatch]);

  const validateFormPart1 = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required!";
    }
    if (!formData.mobileNumber || formData.mobileNumber.length !== 10) {
      newErrors.mobileNumber = "Mobile Number must be 10 characters long";
    }

    if (!/^[0-9]+$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile Number must contain only numbers";
    }

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid Email format";
    }
    return newErrors;
  };

  const validateFormPart2 = () => {
    const newErrors = {};

    if (!formData.shopName) {
      newErrors.shopName = "Shop name is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    return newErrors;
  };
  const validateFormPart3 = () => {
    const newErrors = {};

    if (!formData.accountNumber) {
      newErrors.accountNumber = "Account number is required";
    }

    if (!formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = "Re enter account number.";
    }

    if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = "Acount number is different.";
    }

    if (!formData.ifscCode) {
      newErrors.ifscCode = "Ifsc code is required";
    }

    return newErrors;
  };

  const validateFormPart4 = () => {
    const newErrors = {};

    if (!formData.streetAddress) {
      newErrors.streetAddress = "Street Address is required";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    }

    if (!formData.postalCode) {
      newErrors.postalCode = "Postal Code is required";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateFormPart4();
    if (Object.keys(newErrors).length === 0) {
      dispatch(newShop(formData));
      if (success) {
        toast.success("Shop registered successfully");
      }
      setFormData({
        fullName: "",
        email: "",
        mobileNumber: "",
        shopName: "",
        category: "",
        accountNumber: "",
        ifscCode: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      });
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleNext = () => {
    let newErrors;
    if (activeStep == 0) {
      newErrors = validateFormPart1();
    }
    if (activeStep == 1) {
      newErrors = validateFormPart2();
    }
    if (activeStep == 2) {
      newErrors = validateFormPart3();
    }
    if (activeStep === steps.length - 1) {
      handleSubmit();
    }
    if (Object.keys(newErrors).length === 0) {
      setErrors({});
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      setErrors(newErrors);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth="lg" className="my-[5vmax]">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form>
            <Grid container spacing={3}>
              {activeStep === 0 && (
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Typography variant="h6">Basic Details</Typography>
                    <TextField
                      fullWidth
                      type="text"
                      label="Full Name*"
                      variant="outlined"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      error={!!errors.fullName}
                      helperText={errors.fullName}
                    />
                    <TextField
                      fullWidth
                      type="email"
                      label="Email Id*"
                      variant="outlined"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                    <TextField
                      fullWidth
                      type="number"
                      label="Mobile Number*"
                      variant="outlined"
                      value={formData.mobileNumber}
                      onChange={(e) =>
                        handleChange("mobileNumber", e.target.value)
                      }
                      error={!!errors.mobileNumber}
                      helperText={errors.mobileNumber}
                    />
                  </Box>
                </Grid>
              )}

              {activeStep === 1 && (
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Typography variant="h6">Shop Details</Typography>
                    <TextField
                      fullWidth
                      type="text"
                      label="Shop Name"
                      variant="outlined"
                      value={formData.shopName}
                      onChange={(e) => handleChange("shopName", e.target.value)}
                      error={!!errors.shopName}
                      helperText={errors.shopName}
                    />
                    <TextField
                      fullWidth
                      select
                      variant="outlined"
                      SelectProps={{
                        native: true,
                      }}
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      error={!!errors.category}
                      helperText={errors.category}
                    >
                      <option value="">Select Category</option>
                      {categories &&
                        categories.map((category) => {
                          return (
                            <option
                              key={category._id}
                              value={category.category}
                            >
                              {category.category}
                            </option>
                          );
                        })}
                    </TextField>
                  </Box>
                </Grid>
              )}

              {activeStep === 2 && (
                <Grid item xs={12} sm={4}>
                  <Box>
                    <Typography variant="h6">Other Details</Typography>
                    <TextField
                      fullWidth
                      type="number"
                      label="Account Number*"
                      variant="outlined"
                      value={formData.accountNumber}
                      onChange={(e) =>
                        handleChange("accountNumber", e.target.value)
                      }
                      error={!!errors.accountNumber}
                      helperText={errors.accountNumber}
                    />
                    <TextField
                      fullWidth
                      type="number"
                      label="Confirm Account Number*"
                      variant="outlined"
                      value={formData.confirmAccountNumber}
                      onChange={(e) =>
                        handleChange("confirmAccountNumber", e.target.value)
                      }
                      error={!!errors.confirmAccountNumber}
                      helperText={errors.confirmAccountNumber}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="IFSC Code*"
                      variant="outlined"
                      value={formData.ifscCode}
                      onChange={(e) => handleChange("ifscCode", e.target.value)}
                      error={!!errors.ifscCode}
                      helperText={errors.ifscCode}
                    />
                  </Box>
                </Grid>
              )}

              {activeStep === 3 && (
                <Grid item xs={12} sm={6}>
                  <Box>
                    <Typography variant="h6">Shop Address Details</Typography>
                    <TextField
                      fullWidth
                      type="text"
                      label="Street Address*"
                      variant="outlined"
                      value={formData.streetAddress}
                      onChange={(e) =>
                        handleChange("streetAddress", e.target.value)
                      }
                      error={!!errors.streetAddress}
                      helperText={errors.streetAddress}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="City*"
                      variant="outlined"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      error={!!errors.city}
                      helperText={errors.city}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="State*"
                      variant="outlined"
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      error={!!errors.state}
                      helperText={errors.state}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="Postal Code*"
                      variant="outlined"
                      value={formData.postalCode}
                      onChange={(e) =>
                        handleChange("postalCode", e.target.value)
                      }
                      error={!!errors.postalCode}
                      helperText={errors.postalCode}
                    />
                    <TextField
                      fullWidth
                      type="text"
                      label="Country*"
                      variant="outlined"
                      value={formData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      error={!!errors.country}
                      helperText={errors.country}
                    />
                  </Box>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="contained"
                  style={{ marginRight: "10px" }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      )}
    </Fragment>
  );
}

export default SellerApplication;
