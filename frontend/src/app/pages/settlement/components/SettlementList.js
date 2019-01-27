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

class SettlementList extends Component {
  render() {
    const { classes, data } = this.props;
    let sum = data.reduce((acc, cur) => {
      return acc + cur.settlementAmount;
    }, 0).toFixed(2);
    return (
      <section className={classes.root}>
        <Typography variant="h6" color="inherit" className={classes.title}>
          Settlements
        </Typography>
        <section className={classes.wrapper}>
          <Grid container
                direction="row"
                justify="flex-start">
            <section className={classes.sumheader}>
              <Typography variant="body1" color="inherit" className={classes.sum}>
                Settlements amount
              </Typography>
              <Typography variant="h5" color="inherit" className={classes.sumBody}>
                {`€${sum}`}
              </Typography>
            </section>
          </Grid>
          <section className={classes.paper}>
            <section className={classes.row}>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                Location
              </Typography>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                Owner
              </Typography>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                Tag Operator
              </Typography>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                Amount
              </Typography>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                Fee
              </Typography>
              <Typography variant="subtitle2" color="inherit" className={classes.heading}>
                Date
              </Typography>
            </section>
            {data.map((settlement, index) => {
              let { location, tagOperatorName, timestamp, tollOperatorName, amount, settlementAmount } = settlement;
              return (
                <section key={index} className={classes.entry}>
                  <Typography variant="subtitle2" color="inherit" className={classes.location}>
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
                    {`€${settlementAmount.toFixed(2)}`}
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

SettlementList.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
};

export default withStyles(styles)(SettlementList);