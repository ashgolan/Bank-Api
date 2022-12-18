import "./App.css";
import NavBar from "./NavBar";
import AddUser from "./users/AddUser";
import { Route, Routes } from "react-router-dom";
import DepositMoney from "./accounts/DepositMoney";
import TransferMoney from "./accounts/TransferMoney";
import WithdrawMoney from "./accounts/WithdrawMoney";
import UpdateAccount from "./accounts/UpdateAccount";
import AddAccount from "./accounts/AddAccount";
import { useEffect, useState } from "react";
import axios from "axios";
import Transaction from "./accounts/Transaction";
function App() {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState({
    status: true,
    text: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setMessage({ status: false, text: "" });
        setLoading(true);
        const allData = await axios.get(
          "https://bank-api-xeyd.onrender.com/api/bank/all"
          // "http://localhost:5001/api/bank/all"
        );
        setData(allData);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setMessage({ status: true, text: "שגיאה בקליטת נתונים" });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      {message.status && (
        <h5
          style={{
            fontSize: "1rem",
            color: "brown",
            textAlign: "center",
            backgroundColor: "yellow",
            width: "40%",
            margin: "auto",
          }}
        >
          {message.text}
        </h5>
      )}
      {loading && (
        <div className="loading">
          <span className="loader"></span>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <AddUser setLoading={setLoading} setMessage={setMessage}></AddUser>
          }
        />
        <Route
          path="/addUser"
          element={
            <AddUser
              data={data}
              setData={setData}
              setMessage={setMessage}
              setLoading={setLoading}
            ></AddUser>
          }
        />{" "}
        <Route
          path="/DepositMoney"
          element={
            <DepositMoney
              setData={setData}
              setMessage={setMessage}
              setLoading={setLoading}
            ></DepositMoney>
          }
        />
        <Route
          path="/TransferMoney"
          element={
            <TransferMoney
              setData={setData}
              setMessage={setMessage}
              setLoading={setLoading}
            ></TransferMoney>
          }
        />
        <Route
          path="/updateAccount"
          element={
            <UpdateAccount
              data={data}
              setData={setData}
              setMessage={setMessage}
              setLoading={setLoading}
            ></UpdateAccount>
          }
        />
        <Route
          path="/AddAccount"
          element={
            <AddAccount
              setLoading={setLoading}
              data={data}
              setData={setData}
              setMessage={setMessage}
            ></AddAccount>
          }
        />
        <Route
          path="/WithdrawMoney"
          element={
            <WithdrawMoney
              setLoading={setLoading}
              data={data}
              setData={setData}
              setMessage={setMessage}
            ></WithdrawMoney>
          }
        />
        <Route
          path="/Transaction"
          element={
            <Transaction
              data={data}
              setData={setData}
              setMessage={setMessage}
            ></Transaction>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
