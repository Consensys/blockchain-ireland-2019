import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { USERS, ROLES, ROUTES } from '../../util/Constant';

const styles = theme => ({
  wrapper: {
    backgroundColor: '#1976d2',
    width: '100vw',
    height: '100vh'
  },
  card: {
    width: 480,
    height: 480
  },
  content: {
    height: '100%'
  },
  title: {
    color: '#1976d2',
  },
  grid: {
    height: '100%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 320,
  },
  button: {
    marginTop: 20
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangeUserName (event) {
    this.setState({
      username: event.target.value,
    });
  };

  onChangePassword (event) {
    this.setState({
      password: event.target.value,
    });
  };

  handleClickButton() {
    if(this.state.username === USERS[ROLES.ADMIN]) {
      this.props.history.push({
        pathname: ROUTES.DASHBOARD,
        state: { role: ROLES.ADMIN }
      });
    }
    if(this.state.username === USERS[ROLES.OPERATOR]) {
      this.props.history.push({
        pathname: ROUTES.SETTLEMENT,
        state: { role: ROLES.OPERATOR }
      });
    }
  }

  render() {
    let { classes } = this.props;
    let { username, password } = this.state;

    return (
      <Grid className={classes.wrapper}
            container
            direction="column"
            justify="center"
            alignItems="center"
            alignContent="center">
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              alignContent="center"
              className={classes.grid}
            >
              <Typography gutterBottom variant="h4" className={classes.title}>
                Trans<b>Port</b>
              </Typography>
              <Typography gutterBottom variant="h6" className={classes.subtitle}>
                Sign in to your account
              </Typography>
              <TextField
                label="Username"
                className={classes.textField}
                type="username"
                autoComplete="current-password"
                margin="normal"
                value={username}
                onChange={this.onChangeUserName}
              />
              <TextField
                label="Password"
                className={classes.textField}
                type="Password"
                value={password}
                autoComplete="current-password"
                margin="normal"
                onChange={this.onChangePassword}
              />
              <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={() => this.handleClickButton()}>
                Sign in
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
