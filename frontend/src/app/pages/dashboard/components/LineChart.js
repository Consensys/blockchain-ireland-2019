import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { SERVER_ENDPOINT } from "../../../util/Constant";

const styles = {
  card: {
    width: 540,
    height: 400
  },
  title: {
    fontSize: 14,
  }
};

let hours = ["04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00", "00:00", "02:00"]

class LineChart extends Component {
  constructor(){
    super()
    this.state = { 
      traffic: [
        
      ]
    }
    axios.get(`${SERVER_ENDPOINT}/events/all`)
        .then(({ data })=> {
          this.setState({traffic:data.map(x => parseInt(x.timestamp.split(" ")[1].split(":")[0]))})
    })
  }

  calculateTraffic(h){
    return this.state.traffic.filter(x => x===h || x===h+1).length
  }

  render() {
    const { classes } = this.props;
    return (
         <section style={{ height: 400 + 'px' , margin: 10}}>
        <Card className={classes.card} style={{ height: 400 + 'px' }}>
          <CardContent style={{ height: 400 + 'px' }}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Journeys over time
            </Typography>
          <ResponsiveLine
        data={[

          {"id": "Num. journeys",
          "color": "hsl(78, 70%, 50%)",
          "data": hours.map((h,i) => {return {"x":h, "y": this.calculateTraffic(parseInt(h.split(":")[0]))}} )}
        ]}
        margin={{
          "top": 50,
          "right": 20,
          "bottom": 100,
          "left": 60
      }}
        xScale={{
            "type": "point"
        }}
        yScale={{
            "type": "linear",
            "stacked": true,
            "min": "auto",
            "max": "auto"
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            "orient": "bottom",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "Hours",
            "legendOffset": 36,
            "legendPosition": "middle"
        }}
        axisLeft={{
            "orient": "left",
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "count",
            "legendOffset": -40,
            "legendPosition": "middle"
        }}
        dotSize={10}
        dotColor="inherit:darker(0.3)"
        dotBorderWidth={2}
        dotBorderColor="#ffffff"
        enableDotLabel={true}
        dotLabel="y"
        dotLabelYOffset={-12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[ ]}
    />

          </CardContent>
        </Card>
      </section>

    );
  }
}

LineChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LineChart);
