import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import { registerUser } from '../../actions/authAction';

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          error: ''
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

      componentDidMount() {
        if(this.props.auth.uid) {
          // this.props.history.push('/');
        }
      }
      

      componentWillReceiveProps(nextProps) {
        if(nextProps.auth.uid) {
          this.props.history.push('/');
        }
        if(nextProps.error) {
          this.setState({error: nextProps.error})
        }
      }

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const newUser = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
        };
    
        
        this.props.registerUser(newUser);
      }
    
      render() {
        
        return (
          <div className="container">
            
            <div className="row justify-content-center">        
              <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-body p-0">
                    <div className="row">
                      <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                      <div className="col-lg-6">
                        <div className="p-5">
                          <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Register</h1>
                            { 
                              this.state.error ? 
                              <div className="alert alert-danger">{this.state.error.message}</div>: null
                            }
                          </div>
                          <form className="user" onSubmit={this.onSubmit}>
                            <div className="form-group">
                              <input id="firstName"
                                  type="text"
                                  field="firstName"
                                  value={this.state.firstName}
                                  onChange={this.onChange}
                                  required={true}
                                  maxLength={100}
                                  label="firstName"
                                  name="firstName"
                                  className="form-control"
                                  placeholder="First Name" 
                                />
                            </div>
                            <div className="form-group">
                              <input id="lastName"
                                  type="text"
                                  field="lastName"
                                  value={this.state.lastName}
                                  onChange={this.onChange}
                                  required={true}
                                  maxLength={100}
                                  label="lastName"
                                  name="lastName"
                                  className="form-control"
                                  placeholder="Last Name" 
                                />
                            </div>
                            <div className="form-group">
      
                              <input id="email"
                                type="email"
                                field="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                required={true}
                                maxLength={100}
                                label="userId"
                                name="email"
                                className="form-control"
                                placeholder="Email" />
                            </div>
                            <div className="form-group">
                              <input id="password"
                                field="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                required={true}
                                maxLength={100}
                                className="form-control"
                                type="password"
                                label="Password"
                                name="password"
                                placeholder="Password" />
                            </div>                            
                            <button
                              className={`btn btn-primary btn-user btn-block`}
                              type="submit">
                              Register
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
        );
                
      }

}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        error: state.errors.error
    };
};


export default connect(mapStateToProps, {registerUser})(Register);