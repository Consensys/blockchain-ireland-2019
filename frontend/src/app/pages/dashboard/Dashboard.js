import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Header from '../header/Header';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import LineChart from './components/LineChart';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import axios from "axios";
import { SERVER_ENDPOINT, ROLES, ROUTES } from "../../util/Constant";

const styles = {
  grid: {
    marginBottom: 32
  },
  card: {
    width: 300
  },
  calculation: {
    fontWeight: 600
  }
};

// TODO: If role == operator push to login
class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      journeys:[]
    };
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
      this._getData();
    }
  }

  _getData() {
    axios.get(`${SERVER_ENDPOINT}/events/all`)
      .then(({ data })=> {
        this.setState({journeys:data})
      })
  }

  render() {
    let { classes, history } = this.props;
    return (
      <section className="Dashboard">
        <Header role={this.props.location.state.role} history={history} />
        <Paper className={"classes.root"} elevation={1}>

        <Grid container
          direction="row"
          justify="center"
          alignItems="center" style={{ padding: 20 }} > 
        <Card className={classes.card} style={{ margin: 10 }}>
          <CardContent>
          <Typography component="h2">
              Total journeys
            </Typography>
            <Typography variant="h5" className={classes.calculation}>{this.state.journeys.length}</Typography>
            </CardContent>
        </Card>

        <Card className={classes.card} style={{ margin: 10 }}>
          <CardContent>
          <Typography component="h2">
            Total revenue
            </Typography>
            <Typography variant="h6" className={classes.calculation}>
              €{Number(this.state.journeys.reduce((accumulator, currentValue) => accumulator + currentValue.settlementAmount, 0)).toFixed(2)}
            </Typography>
            </CardContent>
        </Card>

     
        <Card className={classes.card} style={{ margin: 10 }}>
          <CardContent>
          <Typography component="h2">
            Time period
            </Typography>
            <Typography variant="h6" className={classes.calculation}>January 27, 2019</Typography>
            </CardContent>
        </Card>
        </Grid>  

      </Paper>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{'backgroundColor': 'lightgray'}}
        >
          <LineChart />
          <BarChart />
          <PieChart />
        </Grid>
      </section>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object
};

export default withStyles(styles)(Dashboard);
