import React from "react";
import Admin from "./admincomponent/Admin";
import Header from "./admincomponent/Header";
import SideNav from "./admincomponent/SideNav";
import Home from "./admincomponent/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const FinalComponent = () => {
  return (
    <div>
      <Header />
      <SideNav />
    </div>
  );
};

export default FinalComponent;
