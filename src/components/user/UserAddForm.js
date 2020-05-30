import React, { useState, Fragment } from 'react'
import { projectsRef } from '../../firebase'
import { addUser } from '../../actions/userAction';
import { connect } from 'react-redux'

const UserAddForm = (props) => {
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
        errors: [],
    });

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        isFormValid(formData)
        handleAddUser(formData);
    }

    const handleAddUser = formData => {
        
        const newUser = {            
            displayName: formData.displayName,
            email: formData.email,
            password: formData.password,
            createdBy: {
                userId: props.auth.uid
            }
        }
        props.addUser(newUser);
    }

    const { displayName, email, password, errors } = formData;


    const isFormValid = ({ displayName, email, password }) =>
    displayName && email && password

    return (
        <Fragment>
            <div className="col-xl-7 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">Add User</h6>
                    </div>
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
                                        required={true}
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

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth
    }
  }

export default connect(mapStateToProps, { addUser })(UserAddForm);