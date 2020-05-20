import React, { useState, Fragment, useEffect } from 'react'
import { tasksRef } from '../../firebase'
import { fetchProjects } from '../../actions/projectAction';
import {addTask} from '../../actions/taskAction';
import { connect } from 'react-redux'
import _ from 'lodash';

const TaskAddForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        assignee: '',
        project: '',
        description: '',
        deadline: new Date(),
        errors: [],
    });

    useEffect(() => {
        props.fetchProjects()
    }, [])

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        isFormValid(formData)
        handleAddTask(formData);
    }

    const handleAddTask = formData => {
        const key = tasksRef.push().key;
        const newTask = {
            id: key,
            name: formData.name,
            description: formData.description,
            assignee: formData.assignee,
            project: formData.project,
            deadline: formData.deadline,
            createdBy: {
                userId: props.auth.uid
            }
        }
        console.log('THE FORM DATA IS ::: '+JSON.stringify(formData))
        props.addTask(newTask);
    }

    const { name, assignee, deadline, description } = formData;

    const {projects} = props.project

    const isFormValid = ({ name, project, assignee, description,deadline }) =>
        name && assignee && project && description && deadline

    return (
        <Fragment>
            <div className="col-xl-7 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">Add Task</h6>
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

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        project: state.project
    }
}

export default connect(mapStateToProps, { addTask, fetchProjects })(TaskAddForm);