import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { login } from "../actions/authActions";
import Snackbar from "@material-ui/core/Snackbar";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import { clearErrors } from "../actions/errorActions";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center"
  },
  input: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  select: {
    marginTop: theme.spacing.unit * 2,
    fontSize: "1.2rem",
    width: 195
  },
  button: {
    margin: 30,
    marginLeft: "auto",
    marginRight: "auto"
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

class Login extends Component {
  state = {
    username: "",
    password: "",
    msg: null,
    alert: false,
    checked: false
  };

  componentDidMount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for login error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg, alert: true });
      } else {
        this.setState({ msg: null });
      }
    }

    if (prevProps.isAuthenticated === false && isAuthenticated === true) {
      this.setState({
        loginSuccess: true
      });
    }
  }
  handleClose = () => {
    this.setState({ alert: false });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;

    const user = {
      username,
      password
    };

    this.props.login(user);
  };
  //   const responseFacebook = (response) => {
  //     console.log(response);
  //   };

  // prova

  render() {
    const { classes } = this.props;
    const { alert } = this.state;

    return (
      <div>
        <h3 className="title">Login</h3>

        {!this.state.loginSuccess ? (
          <div>
            <Snackbar
              open={alert}
              onClose={this.handleClose}
              ContentProps={{
                "aria-describedby": "message-id"
              }}
              message={
                <span id="message-id">
                  <ErrorIcon /> {this.state.msg}
                </span>
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
              }}
              autoHideDuration={6000}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />

            <form
              className={classes.container}
              noValidate
              autoComplete="off"
              id="register-form"
              onSubmit={this.onSubmit}
            >
              <div>
                <InputLabel htmlFor="username" className="form-label">
                  Username:
                </InputLabel>
                <Input
                  id="username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  className={classes.input}
                />
              </div>

              <div>
                <InputLabel htmlFor="password" className="form-label">
                  Password:
                </InputLabel>
                <Input
                  id="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  className={classes.input}
                  type="password"
                />
              </div>

              <div className="terms">
                <Checkbox
                  checked={this.state.checked}
                  onChange={this.handleChecked}
                  value="checked"
                />{" "}
                <p>Remember Me</p>
              </div>

              <Button
                variant="contained"
                className={classes.button}
                size="medium"
                type="submit"
                form="register-form"
              >
                Login
              </Button>
            </form>

            <div>
              <GoogleLogin
                clientId="169141627109-7viqrdegtp9b9hlmc5a2qkq521o8dsl1.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.googleResponse}
                onFailure={this.googleResponse}
              />
              <FacebookLogin
                appId="624502731356721"
                autoLoad={true}
                fields="name,email,picture"
                callback={this.facebookResponse}
              />
            </div>
            <div />
            <div />

            <div className="login-text">
              <p>
                Don&apos;t have a MYtinerary account yet? You should create one!
                It&apos;s totally free and only takes a minute.
              </p>
              <Link to="/createaccount" className="login-link">
                Create Account
              </Link>
            </div>
          </div>
        ) : (
          <p>Login successful!</p>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(withStyles(styles)(Login));
