import React, { useEffect,useState,Fragment } from 'react'
import {fetchUserById,deleteUser} from '../../actions/userAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Modal,Button} from 'react-bootstrap'
import {Link,withRouter} from 'react-router-dom'

const UserDetail = (props) => {

    const {history} = props;
    const { user,loading } = props.user;
    const id = props.match.params.id;

    useEffect(() => {
        props.fetchUserById(id)
    },[props.fetchUserById,loading])    

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleDelete = (e) => {
      
      console.log('the id is '+id)
      props.deleteUser(id);
      deleteUser(id)
      history.push('/users')
      handleClose()
    }

    return (
        (loading || null == user) ?
        <h4>Loading ... </h4>:
        <Fragment>
        <div className="form-row">
            <label>Name</label><h3 className="form-control">{user.displayName}</h3>
            <label>Email</label><h3 className="form-control">{user.email}</h3>
            <div className="flex-row">
            <button className="btn-danger btn-sm m-2" onClick={handleShow}>Delete user</button>
            <button className="btn-success btn-sm m-2"><Link to={`/users/${user.uid}/edit`}>Edit user</Link></button>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={e=>handleDelete(e)}>
            Delete User
          </Button>
        </Modal.Footer>
      </Modal>
        </Fragment>
    )
}

UserDetail.propTypes = {
    user: PropTypes.object.isRequired,
    fetchUserById: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps,{fetchUserById,deleteUser}) (withRouter(UserDetail));