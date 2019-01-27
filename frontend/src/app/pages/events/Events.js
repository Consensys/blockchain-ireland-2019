import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { SERVER_ENDPOINT } from "../../util/Constant";
import axios from "axios";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText'

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
    color: '#1976d2'
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
  },
  hint: {
    color: 'white',
    marginTop: 20
  }
})

let locations = ['M1 Drogheda',
        'M3 Clonee Kells',
        'Limerick Tunnel',
        'M8 Fermoy',
        'M25 Waterford',
        'Dublin Port Tunnel',
        'East Link',
        'M50 Dublin'];

class Events extends Component {

    constructor(props) {
      super(props);
      this.state = {
        tollOperatorId: '',
        tagOperatorId: '',
        tagOperatorIdx: 0,
        tollOperatorIdx: 0,
        amount: '',
        location: '',
        locationIdx: 0,
        tagId: '',
        success: false,
        operators: []
      };

      axios.get(`${SERVER_ENDPOINT}/operator`)
      .then(({ data })=> {
        this.setState({operators:data})
      })

      this.onChangeTollID=this.onChangeTollID.bind(this);
      this.onChangeTagID=this.onChangeTagID.bind(this);
      this.onChangeAmount=this.onChangeAmount.bind(this);
      this.onChangeLocation=this.onChangeLocation.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.onChangeTagOperatorID=this.onChangeTagOperatorID.bind(this);
    }


      onChangeTollID (event) {

        this.setState({
          tollOperatorId: this.state.operators[event.target.value].id,
          tollOperatorIdx: event.target.value
        });
      };

      onChangeTagOperatorID (event) {
        console.log(this.state.operators)
        console.log(event.target.value)
        console.log(this.state.operators[event.target.value])
        this.setState({
          tagOperatorId: this.state.operators[event.target.value].id,
          tagOperatorIdx: event.target.value
        });
      };

      onChangeTagID (event) {
        this.setState({
          tagId: event.target.value,
        });
      };


      onChangeAmount (event) {
        this.setState({
          amount: event.target.value,
        });
      };

      onChangeLocation (event) {
        this.setState({
          location: locations[event.target.value],
          locationIdx: event.target.value
        });
      };

    handleSubmit(event){
      const allowed = ['tollOperatorId',
      'tagOperatorId', 'amount',
      'location',
      'tagId'];

      const filtered = Object.keys(this.state)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
          obj[key] = this.state[key];
          return obj;
        }, {});
      console.log(filtered)
      axios.post(`${SERVER_ENDPOINT}/events`, filtered)
      .then(({ data })=> {
        this.setState({
          tollOperatorId: '',
          tagOperatorId: '',
          amount: '',
          location: '',
          tagId: '',
          locationIdx: 0,
          success: true
        });
      })
    };

    render() {
      let { classes } = this.props;
      let { success } = this.state;
      return (
        <Grid className={classes.wrapper}
        container
        direction="column"
        justify="center"
        alignItems="center"
        alignContent="center">

          <Card className={classes.card}>
            <CardContent className={classes.content}>
              <React.Fragment>
                <Typography variant="h5" gutterBottom className={classes.title}>
                        Create new event
                      </Typography>
                    
                    <Grid container spacing={24}>

                        <Grid item xs={12} md={12}>
                        <Select
                        value={this.state.tollOperatorIdx}
                        onChange={this.onChangeTollID}
                      >
                        {this.state.operators.map((o, idx) => {
                          return <MenuItem value={idx}>{o.name}</MenuItem>
                        })}

                      </Select>
                      <FormHelperText>Toll Operator</FormHelperText>

                      </Grid>

                      <Grid item xs={12} md={12}>
                        <Select
                        value={this.state.tagOperatorIdx}
                        onChange={this.onChangeTagOperatorID}
                      >
                        {this.state.operators.map((o, idx) => {
                          return <MenuItem value={idx}>{o.name}</MenuItem>
                        })}

                      </Select>

                      <FormHelperText>Tag Operator</FormHelperText>
                      </Grid>

                        <Grid item xs={12} md={12}>
                          <TextField required id="tagId" onChange={this.onChangeTagID} name="tagId" label="Tag ID" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField required id="amount" onChange={this.onChangeAmount} name="amount" label="Amount" fullWidth />
                        </Grid>
                        <Grid item xs={12} md={12}>

                        <Select
                        value={this.state.locationIdx}
                        onChange={this.onChangeLocation}
                      >
                        <MenuItem value={0}>{locations[0]}</MenuItem>
                        <MenuItem value={1}>{locations[1]}</MenuItem>
                        <MenuItem value={2}>{locations[2]}</MenuItem>
                        <MenuItem value={3}>{locations[3]}</MenuItem>
                        <MenuItem value={4}>{locations[4]}</MenuItem>
                        <MenuItem value={5}>{locations[5]}</MenuItem>
                        <MenuItem value={6}>{locations[6]}</MenuItem>
                        <MenuItem value={7}>{locations[7]}</MenuItem>
                      </Select>
                      </Grid>

                        <Button variant="contained" size="medium" color="primary" className={classes.button} onClick={() => this.handleSubmit()}>
                          Send data!
                        </Button>
                      </Grid>
              </React.Fragment>
                        </CardContent>
         </Card>
          {success &&
          <Typography variant="h6" gutterBottom className={classes.hint}>
            Congrats you have created a new event 👍
          </Typography>}
            </Grid>
      )
    }
  }

  Events.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Events);