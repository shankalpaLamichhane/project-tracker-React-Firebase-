import React, { useEffect, useState, Fragment } from 'react'
import { editTask, fetchTaskById, clearTask } from '../../actions/taskAction';
import {fetchProjects} from '../../actions/projectAction'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'

const TaskEditForm = (props) => {
    const [formData, setFormData] = useState({
        id:'',
        name: '',
        assignee: '',
        project: '',
        status:'',
        description: '',
        deadline: new Date(),
        errors: [],
    });

    useEffect(() => {
        props.fetchProjects()
    }, [])

    const {projects} = props.project

    const { task } = props.task;

    useEffect(() => {
        const id = props.match.params.id;
        props.fetchTaskById(id);
        setFormData({
            id: id,
            name: null != task && task.name ? task.name : 'task.name',
            description: null != task && task.description ? task.description : 'task.description',
            assignee: null != task && task.assignee ? task.assignee : 'task.asignee',
            project: null != task && task.assignee ? task.assignee : 'task.asignee',
            status: null != task && task.status ? task.status: 'task.status',
            deadline: null != task && task.deadline ? task.deadline : 'task.asignee',
        })
        return () => {
            props.clearTask();
        }
    }, [props.task.loading, props.clearTask, props.fetchTaskById])

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        isFormValid(formData)
        handleEditTask(formData);
    }

    const handleEditTask = formData => {
        const taskToUpdate = {
            id: formData.id,
            name: formData.name,
            assignee: formData.assignee,
            project: formData.project,
            deadline: formData.deadline,
            description: formData.description,
        }
        props.editTask(taskToUpdate);
    }

    const { name, assignee, taskToUpdate, description,deadline, errors } = formData;


    const isFormValid = ({ name, code, description }) =>
        name && code && description

        return (
        props.task == null || props.task.loading || null == props.task.task? <h4>Loading</h4> :
            <Fragment>
                <div className="col-xl-7 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">Edit Task</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor={"name"}>Name</label>
                                    <input type="text" id="name"
                                        value={name}
                                        field="name"
                                        name="name"
                                        onChange={(e) => onChange(e)}
                                        required={true}
                                        maxLength={15}
                                        minLength={5}
                                        label="Name"
                                        className="form-control"
                                        placeholder="Name" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor={"assignee"}>Asignee</label>
                                    <input type="text" id="assignee"
                                        value={assignee}
                                        field="assignee"
                                        name="assignee"
                                        onChange={(e) => onChange(e)}
                                        required={true}
                                        maxLength={15}
                                        minLength={5}
                                        label="Assignee"
                                        className="form-control"
                                        placeholder="Assignee" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor={"project"}>Project</label>
                                    <select className="form-control" id="project" name="project" onChange={(e) => onChange(e)}>
                                        {projects!=null &&  _.map(projects,(project,key)=>{
                                            console.log(JSON.stringify(project))
                                            return(
                                                <option value={project.code}>{project.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor={"status"}>Status</label>
                                    <select className="form-control" id="status" name="status" onChange={(e) => onChange(e)}>
                                            return(
                                                <option value="To_Do">To Do</option>
                                                <option value="In_Progress">In Progress</option>
                                                <option value="Review">Review</option>
                                                <option value="Done">Done</option>
                                            )
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor={"description"}>Description</label>
                                    <input type="text" id="description"
                                        value={description}
                                        field="description"
                                        onChange={(e) => onChange(e)}
                                        required={true}
                                        maxLength={80}
                                        minLength={5}
                                        label="Description"
                                        name="description"
                                        className="form-control"
                                        placeholder="Description" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="deadline">Deadline: </label>
                                    <hr />
                                    <input type="date" id="deadline" name="deadline" onChange={onChange} value={deadline} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <button type="submit" className="btn btn-success">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </Fragment>
    )
}

TaskEditForm.propTypes = {
    task: PropTypes.object.isRequired,
    fetchTaskById: PropTypes.func.isRequired,
    clearTask: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    project: state.project,
    task: state.task
})

export default connect(mapStateToProps, { editTask, fetchTaskById, clearTask,fetchProjects })(TaskEditForm);