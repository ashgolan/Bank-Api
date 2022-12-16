import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/hompage/Homepage";
import NewUserPage from "./pages/NewUserPage/NewUserPage";
import NewTransactionPage from "./pages/NewTransactionPage/NewTransactionPage";
import bankData from "./context/context";
import { useHttp } from "./hooks/use-http";
import { useEffect, useState } from "react";
import NewAccountPage from "./pages/newAccountPage/NewAccountPage";
function App() {
  const [data, setData] = useState(null);

  const { isLoading, getData } = useHttp(setData);

  useEffect(() => {
    getData({ url: "https://bankapi-5xef.onrender.com/api/bank/all" });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {isLoading ? <p>Loading...</p> : null}
      {data ? (
        <bankData.Provider value={data}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage setData={setData} />} />
            <Route path="/new-user" element={<NewUserPage />} />
            <Route path="/new-transaction" element={<NewTransactionPage />} />
            <Route path="/new-account" element={<NewAccountPage />} />
          </Routes>
        </bankData.Provider>
      ) : (
        <p>couldnt fetch</p>
      )}
    </div>
  );
}

export default App;
