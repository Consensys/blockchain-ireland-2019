import React, { Component } from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {ROUTES, SERVER_ENDPOINT} from "../../util/Constant";
import Header from "../header/Header";
import SettlementList from "./components/SettlementList";

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
  }
});

class Settlement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    }
  }

  componentWillMount() {
    if(this.props.location.state === undefined) {
      this.props.history.push(ROUTES.LOGIN);
    }
  }

  componentDidMount() {
    this._getAllSettlements(this.props.location.state.role);
  }

  _getAllSettlements(role) {
    let endPoint = `${SERVER_ENDPOINT}/events/all`;
    if (role === 'operator') {
      endPoint = `${SERVER_ENDPOINT}/events/69f486ea-94e8-40e3-9903-4a38c4386267` //e-flow
    }

    axios.get(endPoint)
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

  render() {
    let { data, loading } = this.state;
    const { classes, history } = this.props;
    return (
      <section className="Settlement">
        <Header role={this.props.location.state.role} history={history} />
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
        {!loading && <SettlementList data={data}/>}
      </section>
    );
  }
}

Settlement.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withStyles(styles)(Settlement);
