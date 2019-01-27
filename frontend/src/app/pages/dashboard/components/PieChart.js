import React, { Component } from 'react';
import { ResponsivePie } from '@nivo/pie';
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

class PieChart extends Component {
  constructor(){
    super()
    this.state = { 
      pieData: [
        {
          "id": "",
          "label": "",
          "value": 100,
          "color": "hsl(271, 70%, 50%)"
        }
      ]
    }
    axios.get(`${SERVER_ENDPOINT}/operator`)
      .then(({ data })=> {
        this.setState({ operators: data});
        let operators = data
        axios.get(`${SERVER_ENDPOINT}/events/all`)
        .then(({ data })=> {
          let numTotalTrx = data.length
          let statsPie = operators.map((op, i) => {return {"id": op.name,
          "label": op.name,"value": parseInt((data.filter(x=>x.tagOperatorId===op.id).length*100)/numTotalTrx),  "color": "hsl(271, 70%, 50%)"}})
          this.setState({pieData:statsPie})
        })

      })
  }

  render () {
    const { classes } = this.props;
    return (
      <section style={{ height: 400 + 'px' }}>
        <Card className={classes.card} style={{ height: 400 + 'px', margin: 10 }}>
          <CardContent style={{ height: 400 + 'px' }}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Operator share
            </Typography>
            <ResponsivePie
              data={this.state.pieData}
              margin={{
                "top": 5,
                "right": 20,
                "bottom": 75,
                "left": 0
              }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors="nivo"
              colorBy="id"
              borderColor="inherit"
              radialLabelsSkipAngle={10}
              radialLabelsTextXOffset={9}
              radialLabelsTextColor="#333333"
              radialLabelsLinkOffset={3}
              radialLabelsLinkDiagonalLength={14}
              radialLabelsLinkHorizontalLength={22}
              radialLabelsLinkStrokeWidth={2}
              radialLabelsLinkColor="inherit"
              sliceLabel={function(e){return"".concat(e.id," (").concat(e.value,")")}}
              slicesLabelsSkipAngle={0}
              slicesLabelsTextColor="#333333"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              defs={[
                {
                  "id": "dots",
                  "type": "patternDots",
                  "background": "inherit",
                  "color": "rgba(255, 255, 255, 0.3)",
                  "size": 4,
                  "padding": 1,
                  "stagger": true
                },
                {
                  "id": "lines",
                  "type": "patternLines",
                  "background": "inherit",
                  "color": "rgba(255, 255, 255, 0.3)",
                  "rotation": -45,
                  "lineWidth": 6,
                  "spacing": 10
                }
              ]}
              fill={[
                {
                  "match": {
                    "id": "ruby"
                  },
                  "id": "dots"
                },
                {
                  "match": {
                    "id": "c"
                  },
                  "id": "dots"
                },
                {
                  "match": {
                    "id": "go"
                  },
                  "id": "dots"
                },
                {
                  "match": {
                    "id": "python"
                  },
                  "id": "dots"
                },
                {
                  "match": {
                    "id": "scala"
                  },
                  "id": "lines"
                },
                {
                  "match": {
                    "id": "lisp"
                  },
                  "id": "lines"
                },
                {
                  "match": {
                    "id": "elixir"
                  },
                  "id": "lines"
                },
                {
                  "match": {
                    "id": "javascript"
                  },
                  "id": "lines"
                }
              ]}
              legends={[
                {
                  "anchor": "bottom",
                  "direction": "row",
                  "translateY": 56,
                  "itemWidth": 100,
                  "itemHeight": 18,
                  "itemTextColor": "#999",
                  "symbolSize": 18,
                  "symbolShape": "circle",
                  "effects": [
                    {
                      "on": "hover",
                      "style": {
                        "itemTextColor": "#000"
                      }
                    }
                  ]
                }
              ]}
            />
          </CardContent>
        </Card>
      </section>
    )
  }
}

PieChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PieChart);