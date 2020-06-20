import React, { useEffect,useState,Fragment } from 'react'
import {fetchTaskById,deleteTask} from '../../actions/taskAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Modal,Button} from 'react-bootstrap'
import {Link,withRouter} from 'react-router-dom'

const TaskDetail = (props) => {

    const {history} = props;
    const { task,loading } = props.task;
    const id = props.match.params.id;

    useEffect(() => {
        props.fetchTaskById(id)
    },[props.fetchTaskById,loading])    

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleDelete = (e) => {
      
      props.deleteTask(id);
      history.push('/tasks/new')
      handleClose()
    }

    return (
        (loading || null == task) ?
        <h4>Loading ... </h4>:
        <Fragment>
        <div className="form-row">
            <b><h4>Project Id = {task.project}</h4></b>            
            <hr/>
            <label>Name</label><h3 className="form-control">{task.name}</h3>
            <label>Assined To : </label><h3 className="form-control">{task.assignee}</h3>
            <label>Description</label><h3 className="form-control">{task.description}</h3>
            <label>Status</label><h3 className="form-control">{task.status}</h3>
            <label>Deadline</label><h4 className="form-control">{task.deadline}</h4>
            <div className="flex-row">
            <button className="btn-danger btn-sm m-2" onClick={handleShow}>Delete task</button>
            <button className="btn-success btn-sm m-2"><Link to={`/tasks/${task.id}/edit`}>Edit task</Link></button>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={e=>handleDelete(e)}>
            Delete Project
          </Button>
        </Modal.Footer>
      </Modal>
        </Fragment>
    )
}

TaskDetail.propTypes = {
    task: PropTypes.object.isRequired,
    fetchTaskById: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    task: state.task,
})

export default connect(mapStateToProps,{fetchTaskById,deleteTask}) (withRouter(TaskDetail));