import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ROUTES, ROLES } from '../../util/Constant';
import UserIcon from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    marginLeft: 20
  },
  userWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginLeft: 50
  },
  user: {
    marginLeft: 10
  }
};

// TODO: IMPORTANT - Add access level to each menu
class Header extends Component {
  constructor(props) {
    super(props);
    this.onClickSettlement = this.onClickSettlement.bind(this);
  }

  onClickSettlement() {
    this.props.history.push({pathname: ROUTES.SETTLEMENT, state: { role: this.props.role }})
  }

  render() {
    const { classes, history, role } = this.props;
    return (
      <section className="Header">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <b>TRANS</b>PORT
            </Typography>
            {role === ROLES.ADMIN && <Button color="inherit" onClick={()=> history.push({pathname: ROUTES.DASHBOARD, state: { role: ROLES.ADMIN }})}>Dashboard</Button>}
            <Button color="inherit" onClick={this.onClickSettlement}>Settlements</Button>
            {role === ROLES.ADMIN && <Button color="inherit" onClick={()=> history.push({pathname: ROUTES.OPERATOR, state: { role: ROLES.ADMIN }})}>Operators</Button>}
            <Button color="inherit" onClick={()=> history.push({pathname: ROUTES.JOURNEY, state: { role }})}>Journey</Button>
            <Button color="inherit" onClick={()=> history.push({pathname: ROUTES.LOGIN, state: { role: undefined }})}>Logout</Button>
            <div className={classes.userWrapper}>
              <UserIcon />
              <Typography variant="body1" color="inherit" className={classes.user}>
                Hi, {role === ROLES.ADMIN ? 'Government': 'eFlow'}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
      </section>
    );
  }
}

Header.propTypes = {
  role: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withStyles(styles)(Header);
