import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {ROLES, ROUTES, SERVER_ENDPOINT} from "../../util/Constant";
import OperatorList from './components/OperatorList';
import CreateOperator from './components/CreateOperator';
import Header from "../header/Header";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  loading: {
    position: 'absolute',
    top: '40%',
    left: '35%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center'
  },
  hint: {
    marginTop: 30
  },
  titleWrapper: {
    margin: '40px 40px 30px 40px',
  },
  title: {
    fontWeight: 600
  }
});

class Operator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
    this.handleSuccessCreation = this.handleSuccessCreation.bind(this);
  }

  componentWillMount() {
    if(this.props.location.state === undefined) {
      this.props.history.push(ROUTES.LOGIN);
    }
  }

  componentDidMount() {
    if (this.props.location.state.role !== ROLES.ADMIN) {
      this.props.history.push(ROUTES.LOGIN);
    } else {
      this._getAllOperators();
    }
  }

  _getAllOperators() {
    axios.get(`${SERVER_ENDPOINT}/operator`)
      .then(({ data })=> {
        // handle success
        this.setState({
          data,
          loading: false
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  handleSuccessCreation() {
    this._getAllOperators();
  }

  render() {
    let { data, loading } = this.state;
    let { classes, history } = this.props;
    return (
      <section className="Operator">
        <Header role={this.props.location.state.role} history={history} />
        <section className={classes.titleWrapper}>
          <Grid container
                direction="row"
                justify="space-between"
                className={classes.title}>
            <Typography variant="h6" color="inherit" className={classes.title}>
              Operators
            </Typography>
            <CreateOperator handleSuccessCreation={this.handleSuccessCreation}/>
          </Grid>
        </section>

        <div className={classes.loading}>
          <Fade
            in={loading}
            style={{
              transitionDelay: loading ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
          {loading &&
          <Typography variant="h6" color="inherit" className={classes.hint}>
            We're working hard to get some data for you.
          </Typography>
          }
        </div>
        {!loading && <OperatorList data={data}/>}
      </section>
    );
  }
}

Operator.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object,
  location: PropTypes.object
};

export default withStyles(styles)(Operator);
