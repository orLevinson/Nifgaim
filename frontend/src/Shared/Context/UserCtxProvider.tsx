import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttpRequest from "../Hooks/useHttpRequest";
import { userInfo } from "../Types/Users";
import UserCtx from "./UserCtx";

const UserCtxProvider = (props: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { httpRequest } = useHttpRequest();
  const [values, setValues] = useState<userInfo>({
    token: "",
    id: "",
    name: "",
    canEdit: false,
    perm: [],
    isAdmin: false,
  });

  const login = async (username: string, password: string) => {
    if (
      !username ||
      !password ||
      password.length === 0 ||
      username.length === 0
    ) {
      return;
    }

    const result = await httpRequest({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
      method: "POST",
      headers: {},
      body: {
        username,
        password,
      },
      customErrorMsg: "ההתחברות נכשלה, אנא בדוק את הערכים שהזנת ונסה שנית",
    });

    if (!result.success) {
      return;
    }

    let { res } = result;

    setValues(res as userInfo);

    console.log(res);

    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

    localStorage.setItem("token", res.token);
    localStorage.setItem("expiration", oneWeekFromNow.toString());
    localStorage.setItem("id", res.id);
    localStorage.setItem("name", res.name);
    localStorage.setItem("canEdit", res.canEdit);
    localStorage.setItem("perm", res.perm);
    localStorage.setItem("isAdmin", res.isAdmin);
  };

  const register = async (
    username: string,
    password: string,
    perm: string[],
    name: string
  ) => {
    if (
      !username ||
      !password ||
      password.length === 0 ||
      username.length === 0 ||
      !Array.isArray(perm) ||
      !name ||
      name.length === 0
    ) {
      console.log("hi");
      return;
    }

    const result = await httpRequest({
      url: `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
      method: "POST",
      headers: {},
      body: {
        username,
        password,
        name,
        perm,
      },
      customErrorMsg: "ההרשמה נכשלה, אנא נסה שנית",
    });

    if (!result.success) {
      return;
    }

    let { res } = result;

    setValues(res as userInfo);

    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

    localStorage.setItem("token", res.token);
    localStorage.setItem("expiration", oneWeekFromNow.toString());
    localStorage.setItem("id", res.id);
    localStorage.setItem("name", res.name);
    localStorage.setItem("canEdit", res.canEdit);
    localStorage.setItem("perm", res.perm);
    localStorage.setItem("isAdmin", res.isAdmin);
  };

  const logout = () => {
    setValues({
      token: "",
      id: "",
      name: "",
      canEdit: false,
      perm: [],
      isAdmin: false,
    });

    localStorage.clear();

    navigate("/");
  };

  // auto login if there is an expiration
  useEffect(() => {
    const expiration = localStorage.getItem("expiration");
    const token = localStorage.getItem("token");

    // if expiration is missing clear all
    if (!expiration || !token) {
      localStorage.clear();
      return;
    }

    const expirationDateObj = new Date(expiration);

    if (expirationDateObj.getTime() <= new Date().getTime()) {
      setValues({
        token: "",
        id: "",
        name: "",
        canEdit: false,
        perm: [],
        isAdmin: true,
      });
      localStorage.clear();
      return;
    }

    const id = localStorage.getItem("id");
    const name = localStorage.getItem("name");
    const canEdit = localStorage.getItem("canEdit");
    const isAdmin = localStorage.getItem("isAdmin");
    const perm = localStorage.getItem("perm");

    console.log(perm ? perm.split(",") : []);

    setValues({
      token: token ? token : "",
      id: id ? id : "",
      name: name ? name : "",
      canEdit: canEdit ? JSON.parse(canEdit) : false,
      isAdmin: isAdmin ? JSON.parse(isAdmin) : false,
      perm: perm ? perm.split(",") : [],
    });

    setTimeout(logout, expirationDateObj.getTime() - new Date().getTime());
  }, []);

  return (
    <UserCtx.Provider value={{ ...values, login, register, logout }}>
      {props.children}
    </UserCtx.Provider>
  );
};

export default UserCtxProvider;
