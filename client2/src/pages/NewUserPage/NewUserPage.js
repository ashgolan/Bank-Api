import React, { useEffect, useState } from "react";
import NewUserForm from "../../components/NewUserForm/NewUserForm";
import { useHttp } from "../../hooks/use-http";
import "./NewUserPage.css";

function NewUserPage() {
  const [newUser, setNewUser] = useState(null);
  const { getData } = useHttp();

  useEffect(() => {
    console.log(newUser);
    if (!newUser) return;
    getData({
      url: "https://bank-api-xeyd.onrender.com/api/users",
      method: "POST",
      body: newUser,
      headers: {
        "Content-Type": "application/json",
      },
    }); // eslint-disable-next-line
  }, [newUser]);

  return <NewUserForm setNewUser={setNewUser} />;
}

export default NewUserPage;
