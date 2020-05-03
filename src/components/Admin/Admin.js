import React, { Fragment } from "react";
import LeftMenu from "../LeftMenu/LeftMenu";
import Notifications from '../../common/components/Notification'
import TopMenu from '../TopMenu/TopMenu'
import {Switch,Route} from 'react-router'
import Home from '../Home/Home'
import ProjectAddForm from '../Project/ProjectAddForm'
import ProjectList from '../Project/ProjectList'
import ProjectDetail from '../Project/ProjectDetail'
import Alert from '../layout/Alert';
import ProjectEditForm from "../Project/ProjectEditForm";
import ProtectedRoute from "../route/ProtectedRoute";

const Admin = () => {

  return (
    <Fragment>
      <Notifications />
      <LeftMenu />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
        <TopMenu />
          <div className="container-fluid">
            <Alert/>
            <Switch>
                <ProtectedRoute exact path={"/"} component={Home} />
                {/* <ProtectedRoute path={"/s"}><Home/></ProtectedRoute> */}
                <ProtectedRoute exact path={`/projects/new`} component={ProjectAddForm} />
                <ProtectedRoute exact path={`/projects`} component={ProjectList} />
                <ProtectedRoute exact path={`/projects/:id/detail`} component={ProjectDetail} />
                <ProtectedRoute exact path={`/projects/:id/edit`} component={ProjectEditForm} />
            </Switch>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Admin;
