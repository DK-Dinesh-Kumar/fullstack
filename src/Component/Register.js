import React, { useState } from "react";
import {
  Input,
  FormLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {  DataRequest } from "../service/api";
import { userApiUrl } from "../service/request";

function Register() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userDetails, setUserDetails] = useState();
  const [userProfile, setUserProfile] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [registerSuccessModal, setRegisterSuccessModal] = useState(false);
  const [registerErrorModal, setRegisterErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const regiterAccount = async () => {
    console.log("userProfile", userProfile);

    function validateEmail(email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
      console.log(re.test(email));
      return re.test(email);
    }

    if (userName !== "" && userPassword !== "" && userEmail !== "") {
      if (validateEmail(userEmail)) {
        setUserDetails({
          userName: userName,
          userPassword: userPassword,
          userEmail: userEmail,
        });

        var res = await DataRequest( "post",userApiUrl.userRegister,userDetails,);
        console.log("res", res);
        if (res.data.status === 200) {
          setRegisterSuccessModal(!registerSuccessModal);
        } else {
          setErrorMessage(res.data.message);
          setRegisterErrorModal(!registerErrorModal);
        }
      } else {
        alert("Email is not Valid");
      }
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
            height: "500px",
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
            <label style={{ color:"white", fontSize: "20px" }}>
              Register Your Account Here!
            </label>
          </div>
          <div className="d-flex align-items-center"></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "20px",
              alignItems: "start",
              rowGap: "10px",
            }}
          >
            <FormLabel style={{ color: "white" }}>User Name:</FormLabel>
            <Input
              type="text"
              value={userName}
              style={{ width: "260px",color:"white" }}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <FormLabel style={{ color: "white" }}>Password:</FormLabel>
            <Input
              type={showPassword ? "text" : "password"}
              value={userPassword}
              style={{
                width: "260px",
                backgroundColor: "white",
                paddingRight: "15px",
              }}
              onChange={(e) => {
                setUserPassword(e.target.value);
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
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormLabel style={{ color: "white" }}>Email:</FormLabel>
            <Input
              type="text"
              value={userEmail}
              style={{ width: "260px",color:"white" }}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />

            <input
              type={"file"}
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setUserProfile(e.target.files[0]);
              }}
            />
            {/* <img
              style={{ height: "200px", width: "200px" }}
              alt="Profile"
              src={userProfile}
            /> */}
            <Button
              style={{ color: "white", width: "260px" }}
              onClick={regiterAccount}
            >
              Sign Up
            </Button>
            <Modal className="modal" show={registerSuccessModal}>
              <div className="modal-div">
                <p>Your Account Was Registered Successfully.</p>
                <Button
                  onClick={() => {
                    setRegisterSuccessModal(!registerSuccessModal);
                    navigate("/");
                  }}
                >
                  OK
                </Button>
              </div>
            </Modal>
            <Modal show={registerErrorModal} className="modal">
              <div className="modal-div">
                <h4>!Oops...</h4>
                <p>{errorMessage}</p>
                <Button
                  onClick={() => {
                    setRegisterErrorModal(!registerErrorModal);
                  }}
                >
                  OK
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
