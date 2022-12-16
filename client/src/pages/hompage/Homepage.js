import React, { useEffect } from "react";
import Table from "../../components/Table/Table";
import { useHttp } from "../../hooks/use-http";

function Homepage({ setData }) {
  const { getData } = useHttp(setData);

  useEffect(() => {
    getData({ url: "https://bankapi-5xef.onrender.com/api/bank/all" });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="main-container flex-row">
        <div className="half-main-content">
          <h2>USERS</h2>
          <Table category="users" />
        </div>
        <div className="half-main-content">
          <h2>ACCOUNTS</h2>
          <Table category="accounts" />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
