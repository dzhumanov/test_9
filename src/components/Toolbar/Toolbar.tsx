import React from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../app/Hooks";
import { toggleModal } from "../../store/transactions/transactionsSlice";

const Toolbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(toggleModal());
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid w-50">
        <NavLink to="/" className="navbar-brand">
          Money tracker
        </NavLink>
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/categories" className="nav-link">
              Categories
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
