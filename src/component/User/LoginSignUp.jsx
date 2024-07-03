import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import SettingsCellIcon from "@mui/icons-material/SettingsCell";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [Visibility, setVisibility] = useState(false);
  const handleVisibility = () => {
    setVisibility(!Visibility);
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { name, email, phone, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }
    dispatch(login(loginEmailOrPhone, loginPassword));
    navigate("/");
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password) {
      toast.error("All fields are mandatory.");
      return;
    }

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("phone", phone);
    myForm.set("email", email);
    myForm.set("password", password);
    dispatch(register(myForm));
    navigate("/");
  };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  if (error) {
    toast.error(error);
    dispatch(clearErrors());
  }

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      navigate(-1);
    }
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <div className="LoginSignUpContainer">
            <div className="sideImage p-8 max-[1076px]:hidden">
              <p className="text-white text-[1.8rem]">Please Login</p>
              <p className="text-white text-[1.25rem] mt-4 text-gray-500">
                Login to get new offers and recommendations.
              </p>
            </div>
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="text"
                    placeholder="Email or Phone"
                    required
                    name="loginEmailOrPhone"
                    value={loginEmailOrPhone}
                    onChange={(e) => setLoginEmailOrPhone(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type={Visibility ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <i className="visible" onClick={handleVisibility}>
                    <VisibilityIcon />
                  </i>
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon
                    style={{ borderRadius: "100%", objectFit: "cover" }}
                  />
                  <input
                    type="text"
                    placeholder="Name*"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpName">
                  <SettingsCellIcon
                    style={{ borderRadius: "100%", objectFit: "cover" }}
                  />
                  <input
                    type="text"
                    placeholder="Phone*"
                    required
                    name="phone"
                    value={phone}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type={Visibility ? "text" : "password"}
                    placeholder="Password*"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  <i className="visible" onClick={handleVisibility}>
                    <VisibilityIcon />
                  </i>
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Layout>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
