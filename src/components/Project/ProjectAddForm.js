import React, { useState, Fragment } from 'react'
import { projectsRef } from '../../firebase'
import { addProject } from '../../actions/projectAction';
import { connect } from 'react-redux'

const ProjectAddForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        errors: [],
    });

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        isFormValid(formData)
        handleAddProject(formData);
    }

    const handleAddProject = formData => {
        const key = projectsRef.push().key;
        const newProject = {
            id: key,
            name: formData.name,
            code: formData.code,
            description: formData.description,
            createdBy: {
                userId: 'userId'
            }
        }
        props.addProject(newProject);
    }

    const { name, code, description, errors } = formData;


    const isFormValid = ({ name, code, description }) =>
        name && code && description

    return (
        <Fragment>
            <div className="col-xl-7 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">Add Project</h6>
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
                                    <label htmlFor={"code"}>Code</label>
                                    <input type="text" id="code"
                                        value={code}
                                        field="code"
                                        onChange={(e) => onChange(e)}
                                        required={true}
                                        maxLength={15}
                                        minLength={5}
                                        label="Code"
                                        name="code"
                                        className="form-control"
                                        placeholder="Code" />
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
                                        maxLength={15}
                                        minLength={5}
                                        label="Description"
                                        name="description"
                                        className="form-control"
                                        placeholder="Description" />
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

export default connect(null, { addProject })(ProjectAddForm);