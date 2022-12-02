import React, { useState } from "react";
import {
  Input,
  FormLabel,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DataRequest } from "../service/api";
import "./index.css";
import { userApiUrl } from "../service/request";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginuser = async () => {
    var res = await DataRequest("post", userApiUrl.userLogin, {
      userName: userName,
      userPassword: password,
    });
    console.log("response", res);
    if (res.data.token) {
      sessionStorage.setItem("token", res.data.token);
      localStorage.setItem("token", res.data.token);
      sessionStorage.setItem("userName", res.data.result.username);
      console.log("resss", res.data.token);
    } else if (res.data.status === 401) {
      setOpenModal(!openModal);
      setMessage(res.data.message);
    } else if (res.data.status === 402) {
      setOpenModal(!openModal);
      setMessage(res.data.message);
    }
    if (sessionStorage.getItem("token")) {
      navigate("/dashboard-table");
    }
  };
  const NavigateForget = () => {
    if (userName !== "") {
      sessionStorage.setItem("userName", userName);
      navigate("/forgotpassowrd");
    } else {
      alert("Eneter User Name");
    }
  };

  
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <div
        style={{
          width: "50%",
          height: "500px",
          backgroundImage: `url('https://thumbs.dreamstime.com/b/hexagons-background-abstract-top-rads-server-hardware-concept-information-technology-big-data-152590006.jpg')`,
        }}
      ></div> */}
      <div
        style={{
          // width: "50%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <div
          style={{
            height: "400px",
            width: "400px",
            // backgroundColor: "#ff99cc",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: "20px",
            color: "white",
          }}
        >
          <div>
            <img
              src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
              alt="Profile"
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                marginTop: "-70px",
              }}
            ></img>
          </div>
          <div className="d-flex align-items-center"></div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "20px",
              alignItems: "start",
              rowGap: "10px",
            }}
          >
            <FormLabel style={{color:"white"}} >User Name:</FormLabel>
            <Input
              type="text"
              value={userName}
              name="userName"
              style={{ width: "260px" ,color:"white"}}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const form = event.target.form;
                  if (userName !== "" && userName !== null) {
                    form.elements.password.focus();
                  } else {
                    alert("Please Enter UserName");
                  }
                }
              }}
            />
            <FormLabel style={{color:"white"}} >Password:</FormLabel>
            <Input
              //  id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              style={{
                width: "260px",
                color: "white",
                paddingRight: "10px",
              }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  if (userName !== "" && userName !== null) {
                    if (password !== "" && password) {
                      loginuser();
                    } else {
                      alert("Please Enter Password");
                    }
                  } else {
                    alert("Please Enter UserName");
                  }
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff  style={{color:"white"}}/> : <Visibility style={{color:"white"}}/>}
                  </IconButton>
                </InputAdornment>
              }
            />
            {/* <div style={{display:"flex",justifyContent:"flex-end"}}> */}
            <Link
              style={{ cursor: "pointer",color:"white" }}
              onClick={() => {
                NavigateForget();
              }}
            >
              Forgot Password?
            </Link>
            {/* </div> */}
            <Button
              style={{ color: "white", width: "260px" }}
              onClick={() => loginuser()}
            >
              Login
            </Button>
            <p>
              If you don't have account
              <Link
                style={{ cursor: "pointer",color:"#c6e51c",marginLeft:"5px" }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register here
              </Link>
            </p>
          </form>
          <Modal className="modal" show={openModal}>
            <div className="modal-div">
              <p>{message}</p>
              <Button
                onClick={() => {
                  setOpenModal(!openModal);
                }}
              >
                OK
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default Login;
