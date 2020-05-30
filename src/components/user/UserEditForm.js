import React, { useEffect, useState, Fragment } from 'react'
import { editUser, fetchUserById, clearUser } from '../../actions/userAction';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const UserEditForm = (props) => {
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
        id: '',
        errors: [],
    });
    const { user } = props.user;

    useEffect(() => {
        const id = props.match.params.id;
        props.fetchUserById(id);
        setFormData({
            id: id,
            displayName: null != user && user.displayName ? user.displayName : 'user.name',
            email: null != user && user.email ? user.email : 'user.code',
            password: '',
        })
        return () => {
            props.clearUser();
        }
    }, [props.user.loading, props.clearUser, props.fetchUserById])

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        isFormValid(formData)
        handleEditUser(formData);
    }

    const handleEditUser = formData => {

        const userToUpdate ={
            id: formData.id,
            displayName: formData.displayName,
            email: formData.email,
            password: formData.password,
        }
        props.editUser(userToUpdate);
    }

    const { displayName, email, password, id, errors } = formData;


    const isFormValid = ({ name, code, description }) =>
        name && code && description

    return (
        props.user == null || props.user.loading || null == props.user.user? <h4>Loading</h4> :
            <Fragment>
                <div className="col-xl-7 col-lg-7">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Edit User</h6>
                        </div>
                        <input type="hidden" name="id" value={id}></input>
                        <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor={"name"}>Name</label>
                                    <input id="displayName"
                                  type="text"
                                  field="displayName"
                                  value={displayName}
                                  onChange={(e) => onChange(e)}
                                  required={true}
                                  maxLength={100}
                                  label="displayName"
                                  name="displayName"
                                  className="form-control"
                                  placeholder="Name" 
                                />
                                </div>
                            </div>                            
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor={"code"}>Email</label>
                                    <input id="email"
                                    type="email"
                                    field="email"
                                    value={email}
                                    onChange={(e) => onChange(e)}
                                    required={true}
                                    maxLength={100}
                                    label="userId"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor={"description"}>Password</label>
                                    <input id="password"
                                        field="password"
                                        value={password}
                                        onChange={(e) => onChange(e)}
                                        required={false}
                                        maxLength={100}
                                        className="form-control"
                                        type="password"
                                        label="Password"
                                        name="password"
                                        placeholder="Password" />
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

UserEditForm.propTypes = {
    user: PropTypes.object.isRequired,
    fetchUserById: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { editUser, fetchUserById, clearUser })(UserEditForm);