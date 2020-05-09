import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authAction';
import {Link} from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
      loading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.uid) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.uid) {
      this.props.history.push('/');
    }
    if(nextProps.error) {
      this.setState({error: nextProps.error})
    }
    // if(nextProps.auth.loading) {
    //   this.setState({loading:true});
    // }
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };
    // console.log(user);
    this.props.loginUser(user);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {error} = this.state;

    // if(this.state.loading) {
    //   return <h1>Loading</h1>;
    // }

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
                        <h1 className="h4 text-gray-900 mb-4">Welcome!</h1>
                        { 
                          this.state.error ? 
                          <div className="alert alert-danger">{this.state.error.message}</div>: null
                        }
                      </div>
                      <form className="user" onSubmit={this.onSubmit}>
                        <div className="form-group">
  
                          <input id="userId"
                            type="email"
                            field="userId"
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
                        <div className="form-group">
                          <div className="custom-control small">                                                        
                              <Link to="/register">Register Here</Link>
                          </div>
                        </div>
                        <button
                          className={`btn btn-primary btn-user btn-block`}
                          type="submit">
                          Login
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    error: state.errors.error
  }
}

export default connect(mapStateToProps,{loginUser})(Login);
