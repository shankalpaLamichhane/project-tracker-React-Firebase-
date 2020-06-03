import React, { useEffect,useState,Fragment } from 'react'
import {fetchProjectById,deleteProject} from '../../actions/projectAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Modal,Button} from 'react-bootstrap'
import {Link,withRouter} from 'react-router-dom'

const ProjectDetail = (props) => {

    const {history} = props;
    const { project,loading } = props.project;
    const id = props.match.params.id;

    useEffect(() => {
        props.fetchProjectById(id)
    },[props.fetchProjectById,loading])    

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleDelete = (e) => {
      
      console.log('the id is '+id)
      props.deleteProject(id);
      deleteProject(id)
      history.push('/projects')
      handleClose()
    }

    return (
        (loading || null == project) ?
        <h4>Loading ... </h4>:
        <Fragment>
        <div className="form-row">
            <label>Name</label><h3 className="form-control">{project.name}</h3>
            <label>Code</label><h3 className="form-control">{project.code}</h3>
            <label>Description</label><h3 className="form-control">{project.description}</h3>
            <div className="flex-row">
            <button className="btn-danger btn-sm m-2" onClick={handleShow}>Delete project</button>
            <button className="btn-success btn-sm m-2"><Link to={`/projects/${project.id}/edit`}>Edit project</Link></button>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Project</Modal.Title>
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

ProjectDetail.propTypes = {
    project: PropTypes.object.isRequired,
    fetchProjectById: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    project: state.project,
})

export default connect(mapStateToProps,{fetchProjectById,deleteProject}) (withRouter(ProjectDetail));