import React, { useState, Dispatch } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import firebase from '../../firebase';
import {logoutUser} from '../../actions/authAction';
import PropTypes from 'prop-types';

function TopMenuAccount(props) {

  const { auth } = props;
  const [isShow, setShow] = useState(false);
  const onLogout = (e) => {
    e.preventDefault();
    firebase.auth().signOut()
    props.logoutUser();
  }

  if( auth.uid ) {
    return (

      <li className="nav-item dropdown no-arrow">
        <a className="nav-link dropdown-toggle"
          onClick={() => {
            setShow(!isShow);
          }}
          href="# "
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          <span className="mr-2 d-none d-lg-inline small cadet">{auth.email}</span>
          <img className="img-profile rounded-circle" alt=""
            src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
        </a>
  
        <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${(isShow) ? "show" : ""}`}
          aria-labelledby="userDropdown">
          <a className="dropdown-item"
          onClick={onLogout}
          href="# " 
          data-toggle="modal"
          data-target="#logoutModal">
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </li>
    );
  }
  else {
    return null;
  }
  
};

TopMenuAccount.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
      auth: state.firebase.auth
  };
}

export default connect(mapStateToProps, {logoutUser})(TopMenuAccount);
