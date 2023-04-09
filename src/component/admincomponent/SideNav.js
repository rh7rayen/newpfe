import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
const SideNav = () => {
  const { user } = useContext(UserContext);

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <a href="index3.html" className="brand-link">
        <img
          src="/dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">AdminLTE 3</span>
      </a>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="/dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <Link href="/Profile" className="d-block">
              {user.name} {user.lastname}
            </Link>
          </div>
        </div>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item menu-open">
              <Link to="/Dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-link">
                Gestion Admin
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/classe" className="nav-link">
                Gestion classe
              </Link>
              <Link to="/GestionEvent" className="nav-link">
                GESTION ÉVÉNEMENT{" "}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideNav;
