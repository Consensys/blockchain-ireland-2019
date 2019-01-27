import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import { SERVER_ENDPOINT } from "../../../util/Constant";

let locations = ['M1 Drogheda',
        'M3 Clonee Kells',
        'Limerick Tunnel',
        'M8 Fermoy',
        'M25 Waterford',
        'Dublin Port Tunnel',
        'East Link',
        'M50 Dublin'];

const styles = {
  card: {
    width: 540,
    height: 400
  },
  title: {
    fontSize: 14,
  }
};

class BarChar extends Component {

    constructor(){
        super()
        this.state = { 
            dataJourneys : [{"location":""}]
        }
        axios.get(`${SERVER_ENDPOINT}/events/all`)
        .then(({ data })=> {
          let d = locations.map(x => {return{"location": x.split(" ")[0], "journeys":data.filter(y => y.location === x).length} })
          this.setState({dataJourneys:d})
        })
    }

  render() {
    const { classes } = this.props;
    return (
       <section style={{ height: 400 + 'px',weight: 400 + 'px', margin: 10 }}>
        <Card className={classes.card} style={{ height: 400 + 'px',weight: 400 + 'px' }}>
          <CardContent style={{ height: 400 + 'px',weight: 400 + 'px' }}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Total journeys
            </Typography>
          
          <ResponsiveBar
          
        data={this.state.dataJourneys}
        keys={[
            "journeys"
        ]}
        indexBy="location"
        margin={{
            "top": 50,
            "right": 20,
            "bottom": 100,
            "left": 60
        }}
        padding={0.3}
        colors="nivo"
        colorBy="id"
        defs={[
            {
                "id": "dots",
                "type": "patternDots",
                "background": "inherit",
                "color": "#38bcb2",
                "size": 4,
                "padding": 1,
                "stagger": true
            },
            {
                "id": "lines",
                "type": "patternLines",
                "background": "inherit",
                "color": "#eed312",
                "rotation": -45,
                "lineWidth": 6,
                "spacing": 10
            }
        ]}
        fill={[
            {
                "match": {
                    "id": "fries"
                },
                "id": "dots"
            },
            {
                "match": {
                    "id": "sandwich"
                },
                "id": "lines"
            }
        ]}
        borderColor="inherit:darker(1.6)"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "location",
            "legendPosition": "middle",
            "legendOffset": 32
        }}
        axisLeft={{
            "tickSize": 5,
            "tickPadding": 5,
            "tickRotation": 0,
            "legend": "journeys",
            "legendPosition": "middle",
            "legendOffset": -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
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

BarChar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BarChar);
