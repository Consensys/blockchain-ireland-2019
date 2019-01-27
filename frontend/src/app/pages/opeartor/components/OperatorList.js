import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  wrapper: {
    marginLeft: 40,
    marginRight: 40,
    backgroundColor: '#eeeeee',
    padding: '20px'
  },
  paper: {
    padding: '15px 20px',
    backgroundColor: 'white'
  },
  heading: {
    textTransform: 'uppercase',
    flex: 1,
    fontWeight: 600,
    margin: '10px 0'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    textAlign: 'left'
  },
  entry: {
    borderTop: '1px solid rgba(224, 224, 224, 1)',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    textAlign: 'left'
  },
  body: {
    flex: 1
  },
  location: {
    flex: 1,
    color: '#2196f3',
    fontWeight: 600,
  },
  sumBody: {
    fontWeight: 600,
  },
  sumheader: {
    width: '200px',
    margin: '20px 0'
  }
});

class OperatorList extends Component {
  render() {
    const { classes, data } = this.props;
    return (
      <section className={classes.root}>

        <section className={classes.wrapper}>
          <Grid container
                direction="row"
                justify="flex-start">
            <section className={classes.sumheader}>
            </section>
          </Grid>
          <section className={classes.paper}>
            <section className={classes.row}>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                ID
              </Typography>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                Name
              </Typography>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                Registration Date
              </Typography>
            </section>
            {data.map((opeartor, index) => {
              let { id, name, registrationTimestamp } = opeartor;
              return (
                <section key={index} className={classes.entry}>
                  <Typography variant="subtitle2" color="inherit" className={classes.location}>
                    {id}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit" className={classes.body}>
                    {name}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit" className={classes.body}>
                    {registrationTimestamp}
                  </Typography>
                </section>
              );
            })}

          </section>
        </section>
      </section>
    )
  }
}

OperatorList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
};

export default withStyles(styles)(OperatorList);