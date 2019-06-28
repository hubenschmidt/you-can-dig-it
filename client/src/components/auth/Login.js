import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import "./style.css"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    document.body.style.backgroundImage = `url(https://www.reviewgeek.com/thumbcache/0/0/47da2cd69c05931dfe3daef2df660586/p/uploads/2018/09/a927a281.jpg)`;

    // If logged in and user navigates to Login page, should redirect them to dashboard

    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = null;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };


    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <main>
        <div className="d-flex justify-content-center h-100">
          <div className="login-card mt-5">
            <div className="card-header">
              <h3>Sign In</h3>
            </div>
            <div className="error-container">
              <span className="error-message">
                {errors.password}
                {errors.passwordincorrect}
              </span>
              <span className="error-message">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                  </div>
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="username"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                  </div>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    minlength="8"
                    className="form-control"
                    placeholder="password"
                    required
                  />
                </div>
                <div className="form-group">
                  <input type="submit" value="Login" className="btn login_btn float-right" />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<Link to="/register">Register</Link>
              </div>
            </div>
          </div>
        </div>

      </main>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
