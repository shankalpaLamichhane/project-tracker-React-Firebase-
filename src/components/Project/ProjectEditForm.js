import React, { useEffect, useState, Fragment } from 'react'
import { editProject, fetchProjectById, clearProject } from '../../actions/projectAction';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const ProjectEditForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
        id: '',
        errors: [],
    });

    const { project } = props.project;

    useEffect(() => {
        const id = props.match.params.id;
        props.fetchProjectById(id);
        setFormData({
            id: id,
            name: null != project && project.name ? project.name : 'project.name',
            code: null != project && project.code ? project.code : 'project.code',
            description: null != project && project.description ? project.description : 'project.description',
        })
        return () => {
            props.clearProject();
        }
    }, [props.project.loading, props.clearProject, props.fetchProjectById])

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        isFormValid(formData)
        handleEditProject(formData);
    }

    const handleEditProject = formData => {
        const projectToUpdate = {
            id: formData.id,
            name: formData.name,
            code: formData.code,
            description: formData.description,
            createdBy: {
                userId: 'userId'
            }
        }
        props.editProject(projectToUpdate);
    }

    const { name, code, description, id, errors } = formData;


    const isFormValid = ({ name, code, description }) =>
        name && code && description

    return (
        props.project == null || props.project.loading || null == props.project.project? <h4>Loading</h4> :
            <Fragment>
                <div className="col-xl-7 col-lg-7">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Edit Project</h6>
                        </div>
                        <input type="hidden" name="id" value={id}></input>
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
                                        <button type="submit" className="btn btn-success">Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
    )
}

ProjectEditForm.propTypes = {
    project: PropTypes.object.isRequired,
    fetchProjectById: PropTypes.func.isRequired,
    clearProject: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    project: state.project
})

export default connect(mapStateToProps, { editProject, fetchProjectById, clearProject })(ProjectEditForm);