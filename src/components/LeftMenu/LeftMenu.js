import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const LeftMenu = () => {

    let [leftMenuVisibility, setLeftMenuVisibility] = useState(false);

    function changeLeftMenuVisibility() {
        setLeftMenuVisibility(!leftMenuVisibility);
    }

    function getCollapseClass() {
        return (leftMenuVisibility) ? "" : "collapsed";
    }

    return (
        <Fragment>
            <div className="toggle-area">
                <button className="btn btn-primary toggle-button" onClick={() => changeLeftMenuVisibility()}>
                    <i className="fas fa-bolt"></i>
                </button>
            </div>

            <ul className={`navbar-nav bg-gradient-primary-green sidebar sidebar-dark accordion ${getCollapseClass()}`}
                id="collapseMenu">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon icon-green rotate-n-15">
                        <i className="fas fa-bolt"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">REACT <sup>Admin</sup></div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">

                    <Link className="nav-link" to="Home">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Warehouse
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/projects/new`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Projects</span>
                    </Link>
                    <ul>
                        <li>
                            <Link className="nav-link" to={`/projects/new`}>
                                <i className="fas fa-fw fa-warehouse"></i>
                                <span>New</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to={`/projects`}>
                                <i className="fas fa-fw fa-warehouse"></i>
                                <span>List</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/tasks/new`}>
                        <i className="fas fa-fw fa-dollar-sign"></i>
                        <span>Tasks</span>
                    </Link>
                    <ul>
                        <li>
                            <Link className="nav-link" to={`/tasks/new`}>
                                <i className="fas fa-fw fa-warehouse"></i>
                                <span>New</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to={`/tasks`}>
                                <i className="fas fa-fw fa-warehouse"></i>
                                <span>List</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <hr className="sidebar-divider" />

                <div className="sidebar-heading">
                    Admin
                </div>


                

                <li className="nav-item">
                    <Link className="nav-link" to={`/users/add`}>
                        <i className="fas fa-fw fa-user"></i>
                        <span>Users</span>
                    </Link>
                    <ul>
                        <li>
                            <Link className="nav-link" to={`/users/add`}>
                                <i className="fas fa-fw fa-warehouse"></i>
                                <span>New</span>
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to={`/users`}>
                                <i className="fas fa-fw fa-warehouse"></i>
                                <span>List</span>
                            </Link>
                        </li>
                    </ul>
                </li>

                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
        </Fragment>
    );
};

export default LeftMenu;
