import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchUsers,clearUser } from '../../actions/userAction';
import _ from 'lodash';
import UserItem from './UserItem'
import PropTypes from 'prop-types';

const UserList = (props) => {
  const [users, setUsers] = useState({});

  useEffect(() => {
    props.fetchUsers();
    setUsers(user.users);
    return () => {
      props.clearUser();
    }
  }, [props.clearUser,props.fetchUsers,props.user.loading]);

  const { user } = props;

  return (
    (props.loading || null == user.users)?
    <h4>Loading ...</h4>  :
    (!user.users)? <h4>No Users Yet</h4> :
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Last Sign in</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {_.map(users, (value, key) => {
            return <UserItem key={key} item={value} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

UserList.propTypes = {
  user: PropTypes.object.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  clearUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { fetchUsers,clearUser })(UserList);