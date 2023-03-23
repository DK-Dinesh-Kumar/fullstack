import React, { useEffect, useState } from "react";
import { DataRequest } from "../service/api";
import { FormLabel, Input } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./index.css";
import { tableApiUrl } from "../service/request";

const DashboardTable = () => {
  const [tableData, setTableData] = useState(null);
  const [edit, setEdit] = useState(true);
  const [newDataModal, setNewDataModal] = useState(false);
  const [editDataModal, setEditDataModal] = useState(false);
  const [deleteDataModal, setDeleteDataModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newData, setNewData] = useState({
    type: "",
    modal: "",
    cost: "",
    color: "",
    company: "",
    id: "",
  });
  const navigate = useNavigate();

  const Token = sessionStorage.getItem("token");
  const UserName = sessionStorage.getItem("userName");

  async function getdata() {
    var res = await DataRequest("post", tableApiUrl.getTableData, {
      token: Token,
    });
    console.log("---", res);
    if (res.data.status === 200) {
      setTableData(res.data.items);
    } else {
      setErrorModal(!errorModal);
      res.data.message
        ? setErrorMessage(res.data.message)
        : setErrorMessage("Something Went Wrong");
    }
  }
  useEffect(() => {
    sessionStorage.getItem("token") ? getdata() : navigate("/");
  }, []);

  async function AddItem() {
    if (
      newData.color !== "" ||
      newData.company !== "" ||
      newData.cost !== "" ||
      newData.modal !== "" ||
      newData.type !== ""
    ) {
      var response = await DataRequest("post", tableApiUrl.addTableData, {
        ...newData,
        token: Token,
      });
      if (response.status === 200) {
        setNewDataModal(!newDataModal);
        setNewData({
          type: "",
          modal: "",
          cost: "",
          color: "",
          company: "",
          id: "",
        });
      }
    }
  }

  const deleteItem = async (value) => {
    var res = await DataRequest("delete", tableApiUrl.deleteTabledata, {
      id: value,
      token: Token,
    });
    if (res.status === 200) {
      setDeleteDataModal(!deleteDataModal);
    }
  };

  const EditItem = (item) => {
    setNewData({
      type: item.type,
      modal: item.modal,
      cost: item.cost,
      color: item.color,
      company: item.company,
      id: item._id,
    });
  };
  const updateData = async () => {
    if (
      newData.color !== "" ||
      newData.company !== "" ||
      newData.cost !== "" ||
      newData.modal !== "" ||
      newData.type !== ""
    ) {
      var res = await DataRequest("put", tableApiUrl.editTableData, {
        ...newData,
        token: Token,
      });
      if (res.status === 200) {
        setEditDataModal(!editDataModal);
        setNewData({
          type: "",
          modal: "",
          cost: "",
          color: "",
          company: "",
          id: "",
        });
      }
    } else {
      alert("Please Enter atleast any one field");
    }
  };
  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%", display: "flex", padding: "5px 0" }}>
        <div style={{ width: "75%", color: "white", fontSize: "20px" }}>
          <label>VEHICLE DETAILS </label>
        </div>
        <div style={{ width: "15%", color: "white" }}>
          <label>Welcome {UserName}</label>
          <label
            style={{
              marginLeft: "5px",
              cursor: "pointer",
              textDecoration: "underLine",
            }}
          >
            Chat
          </label>
        </div>
        <div style={{ width: "10%" }}>
          <label
            style={{
              cursor: "pointer",
              color: "white",
              textDecoration: "underline",
            }}
            onClick={() => {
              sessionStorage.clear();
              navigate("/");
            }}
          >
            Log Out
          </label>
        </div>
      </div>

      <div className="input-container">
        <FormLabel> Type:</FormLabel>
        <Input
          name="type"
          value={newData.type}
          placeholder="Enter Type"
          onChange={(e) => {
            setNewData({ ...newData, type: e.target.value });
          }}
        />

        <FormLabel> Company:</FormLabel>

        <Input
          value={newData.company}
          name="company"
          placeholder="Enter Company"
          onChange={(e) => {
            setNewData({ ...newData, company: e.target.value });
          }}
        />
        <FormLabel>Modal:</FormLabel>
        <Input
          name="modal"
          placeholder="Enter Modal"
          style={{ textAlign: "center" }}
          value={newData.modal}
          onChange={(e) => {
            setNewData({ ...newData, modal: e.target.value });
          }}
        />
        <FormLabel>Color:</FormLabel>
        <Input
          value={newData.color}
          placeholder="Enter Color"
          onChange={(e) => {
            setNewData({ ...newData, color: e.target.value });
          }}
        />
        <FormLabel>Cost:</FormLabel>
        <Input
          name="cost"
          placeholder="Enter Cost"
          value={newData.cost}
          onChange={(e) => {
            setNewData({ ...newData, cost: e.target.value });
          }}
        />
        {edit ? (
          <Button
            variant="contained"
            data-testid="add"
            style={{ width: "80px", backgroundColor: "blue", color: "white" }}
            onClick={AddItem}
          >
            Add
          </Button>
        ) : (
          <Button
            variant="contained"
            data-testid="update"
            style={{ width: "80px", backgroundColor: "blue", color: "white" }}
            onClick={() => {
              updateData();
            }}
          >
            Update
          </Button>
        )}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Type</th>
            <th>Company</th>
            <th>Modal</th>
            <th>Color</th>
            <th>Cost</th>
          </tr>
        </thead>
        {tableData?.map((item, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{item.type}</td>
              <td>{item.company}</td>
              <td>{item.modal}</td>
              <td>{item.color}</td>
              <td>{item.cost}</td>
              <td>
                <Button
                  style={{ width: "100px", backgroundColor: "blue" }}
                  data-testid={`edit-${index}`}
                  onClick={(event) => {
                    EditItem(item);
                    setEdit(false);
                    event.target.form.elements.type.focus();
                  }}
                >
                  <EditIcon />
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "green", width: "100px" }}
                  data-testid={`delete-${index}`}
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  <DeleteOutlinedIcon />
                  Delete
                </Button>
              </td>
            </tr>
          );
        })}
      </table>
      <Modal className="modal" show={newDataModal}>
        <div className="modal-div">
          <p>New Data Added To Table Successfully</p>
          <Button
            onClick={() => {
              setNewDataModal(!newDataModal);
              getdata();
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
      <Modal className="modal" show={editDataModal}>
        <div className="modal-div">
          <p>Table Data is Updated Successfully.</p>
          <Button
            onClick={() => {
              setEditDataModal(!editDataModal);
              getdata();
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
      <Modal className="modal" show={deleteDataModal}>
        <div className="modal-div">
          <p>Table Data is Deleted Successfully.</p>
          <Button
            onClick={() => {
              setDeleteDataModal(!deleteDataModal);
              getdata();
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
      <Modal className="modal" show={errorModal}>
        <div className="modal-div">
          <p>{errorMessage}</p>
          <Button
            onClick={() => {
              setErrorModal(!errorModal);
              navigate("/");
            }}
          >
            OK
          </Button>
        </div>
      </Modal>
    </form>
  );
};
export default DashboardTable;
