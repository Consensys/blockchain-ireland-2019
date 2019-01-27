import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  title: {
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 40,
    fontWeight: 600
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

class JourneyList extends Component {
  render() {
    const { classes, data } = this.props;

    return (
      <section className={classes.root}>
        <Typography variant="h6" color="inherit" className={classes.title}>
          Journeys
        </Typography>
        <section className={classes.wrapper}>
          <section className={classes.paper}>
            <section className={classes.row}>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                Tag ID
              </Typography>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                Location
              </Typography>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                TOLL Operator
              </Typography>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                Tag Operator
              </Typography>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                Amount
              </Typography>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                Date
              </Typography>
            </section>
            {data.map((settlement, index) => {
              let { tagId, location, tagOperatorName, timestamp, tollOperatorName, amount } = settlement;
              return (
                <section key={index} className={classes.entry}>
                  <Typography variant="subtitle2" color="inherit" className={classes.location}>
                    {tagId}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit" className={classes.body}>
                    {location}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit" className={classes.body}>
                    {tollOperatorName}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit" className={classes.body}>
                    {tagOperatorName}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit" className={classes.body}>
                    {`€${amount.toFixed(2)}`}
                  </Typography>
                  <Typography variant="subtitle2" color="inherit" className={classes.body}>
                    {timestamp}
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

JourneyList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
};

export default withStyles(styles)(JourneyList);