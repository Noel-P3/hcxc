import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@material-ui/core";
import { Get } from "./common/functionServer/FunctionServer";
import AlertMessage from "./common/messageAlert/MessageAlert";
import Login from "./login/Login";
import SideBar from "./layout/SideBar";
import { Switch, Route, Redirect } from "react-router-dom";

/* Screens */
import User from "./screens/configurations/User";
import Cliente from "./screens/cxc/clients/Cliente";
import Seller from "./screens/cxc/seller/Seller";
import Group from "./screens/products/productGroup/Group";
import Almacen from "./screens/products/almacen/Almacen";
import Inventory from "./screens/products/inventory/Inventory";
import Factura from "./screens/cxc/facturas/Facturas";

export const authContext = React.createContext();

/**
 * ID
 * NAME
 * LASTNAME
 * EMAIL
 * PASSWORD
 * CONFIRMED
 */

function MainComponent() {
  const [loginState, setLoginState] = useState(null);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loginState")))
      setLoginState(JSON.parse(localStorage.getItem("loginState")));
    else setLoginState(null);
  }, []);

  const onLogIn = async (creds) => {
    let auth = await Get("api/Users/getUser", null, creds);
    if (auth.length) {
      setLoginState(auth[0]);
      localStorage.setItem("loginState", JSON.stringify(auth[0]));
    } else AlertMessage("error", "Usuario o Contraseña invalido");

    console.log(auth[0]);
  };

  const onLogOut = async () => {
    localStorage.removeItem("loginState");
    setLoginState(null);
  };

  return (
    <>
      <CssBaseline />
      <ToastContainer />
      {loginState ? (
        <authContext.Provider value={loginState}>
          <SideBar nombreUsuario={""} onLogOut={onLogOut} />
          <Switch>
            <Route
              exact
              path="/User"
              component={() => <User onLogOut={onLogOut} />}
            />
            <Route exact path="/Clients" component={Cliente} />
            <Route exact path="/Sellers" component={Seller} />
            <Route exact path="/Groups" component={Group} />
            <Route exact path="/Almacens" component={Almacen} />
            <Route exact path="/Inventories" component={Inventory} />
            <Route exact path="/Facturas" component={Factura} />
            <Redirect to="/User" />
          </Switch>
        </authContext.Provider>
      ) : (
        <Login onLogIn={onLogIn} />
      )}
    </>
  );
}

export default MainComponent;
