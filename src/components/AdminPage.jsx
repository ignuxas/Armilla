import React, { useState } from "react";
import Axios from "axios";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AdminPageCss from "./Styles/AdminPage.css";

import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function AdminPage() {
  const [password, setPassword] = useState("");
  const [ItemData, setData] = useState([]);

  function GetData() {
    Axios.get("http://192.168.31.159:6969/api/AllItems").then((response) => {
      setData(response.data);
    });
  }

  const GetAdminPage = () => {
    Axios.post("http://localhost:6969/api/adminpage", {
      Password: password,
    }).then((response) => {
      if (response.data === 0) {
        console.log("Wrong Password");
        document.getElementById("WrongPass").style.display = "block";
      } else if (response.data === 1) {
        document.getElementById("DataBaseContainer").style.display = "flex";
        document.getElementById("container").style.display = "none";
        GetData();
      }
    });
  };

  function AddNewItem() {
    Axios.post("http://localhost:6969/api/additem", {
      Password: password,
      Name: document.getElementById("NameI").value,
      Category: document.getElementById("CategoryI").value,
      Price: document.getElementById("PriceI").value,
      Size: document.getElementById("SizeI").value,
      Storage: document.getElementById("StorageI").value,
      Img: document.getElementById("ImgI").value,
      Colors: document.getElementById("ColorsI").value,
    }).then((response) => {
      GetData();
    });
  }

  const HandleEdit = (data) => {
    Axios.post("http://localhost:6969/api/edititem", {
      Password: password,
      ItemID: data.id,
      Field: data.field,
      Value: data.value,
    }).then((response) => {
      GetData();
    });
  };

  const handleDeleteRow = (rowID) => {
    Axios.post("http://localhost:6969/api/deleteitem", {
      Password: password,
      ItemID: rowID,
    }).then((response) => {
      GetData();
    });
  };

  function DecreaseStorage(data, currentValue) {
    if (currentValue > 0) {
      Axios.post("http://localhost:6969/api/decreasestorage", {
        Password: password,
        ItemID: data.id,
        Value: currentValue,
      }).then((response) => {
        GetData();
      });
    }
  }

  function IncreaseStorage(rowID, currentValue) {
    Axios.post("http://localhost:6969/api/increasestorage", {
      Password: password,
      ItemID: rowID,
      Value: currentValue,
    }).then((response) => {
      GetData();
    });
  }

  const columns = [
    { field: "ID", headerName: "ID", width: 50 },
    {
      field: "Name",
      headerName: "Name",
      flex: 0.3,
      minWidth: 150,
      editable: true,
    },
    {
      field: "Category",
      headerName: "Category",
      flex: 0.2,
      minWidth: 60,
      maxWidth: 80,
      editable: true,
    },
    {
      field: "Price",
      headerName: "Price",
      type: "number",
      width: 60,
      editable: true,
    },
    { field: "Size", headerName: "Size", width: 150, editable: true },
    {
      field: "Storage",
      headerName: "Storage",
      width: 70,
      editable: true,
      renderCell: (item) => (
        <div className="StorageRow">
          {item.value}
          <div className="quickInc">
            <button
              className="quickIncButton"
              onClick={() => {
                IncreaseStorage(item.id, item.value);
              }}
            >
              <ArrowDropUpIcon />
            </button>
            <button
              className="quickIncButton"
              onClick={() => {
                DecreaseStorage(item, item.value);
              }}
            >
              <ArrowDropDownIcon />
            </button>
          </div>
        </div>
      ),
    },
    { field: "Img", headerName: "Img", flex: 1, editable: true },
    { field: "Model", headerName: "Model", flex: 1, editable: true },
    {
      field: "Colors",
      headerName: "Colors",
      flex: 0.3,
      minWidth: 80,
      editable: true,
    },
    {
      field: "Actions",
      headerName: "ツ",
      minwidth: 130,
      width: 40,
      type: "actions",
      getActions: (item) => [
        <GridActionsCellItem
          icon={<DeleteIcon style={{ fill: "#fff" }} />}
          label="Delete"
          onClick={() => {
            handleDeleteRow(item.id);
          }}
        />,
      ],
    },
  ];

  return (
    <div className="AdminPage">
      <div className="wrapper">
        <div id="container">
          <h1>Armilla</h1>

          <form className="form" onSubmit={GetAdminPage} action="#">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <button className="login-button" onClick={GetAdminPage}>
            Login
          </button>
          <p id="WrongPass">Wrong Password</p>
        </div>

        <ul className="bg-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div id="DataBaseContainer">
          <div id="DataBase">
            <div id="DataContainer" className="acrylic">
              <div id="DataTable">
                <DataGrid
                  rows={ItemData}
                  columns={columns}
                  getRowId={(ItemData) => ItemData.ID}
                  disableColumnMenu
                  hideFooter
                  onCellEditCommit={HandleEdit}
                  sx={{ border: 0 }}
                />
              </div>
            </div>
          </div>
          <div id="newFormContainer">
            <div id="newForm" className="acrylic">
              <form className="form form2 onTop" action="#">
                <h1 className="centerText">Armilla</h1>
                <input placeholder="Name" id="NameI"></input>
                <input placeholder="Category" id="CategoryI"></input>
                <input placeholder="Price" id="PriceI"></input>
                <input placeholder="Size" id="SizeI"></input>
                <input placeholder="Storage" id="StorageI"></input>
                <input placeholder="Image Link" type="url" id="ImgI"></input>
                <input placeholder="Colors" id="ColorsI"></input>
              </form>
              <button className="submit-button onTop" onClick={AddNewItem}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
