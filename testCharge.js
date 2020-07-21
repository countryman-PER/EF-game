import React, { PureComponent } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Svg, Circle, Path } from "react-native-svg";

const testChargeRadius = 5;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export class TestCharge extends PureComponent 
{
  drawPoints = (points) =>
  {
    let pointsInSVG = "M 0,0";
    points.forEach(point => {
      pointsInSVG += " M " + point.x + "," + point.y;
      pointsInSVG += " l 1,0 ";
    });
    return pointsInSVG;
  }

  getColorAndStroke = (moving) =>
  {
    if (moving) 
    {
      return {fill: "#D32F2F", stroke: "none"}
    }
    else
    {
      return {fill: "none", stroke: "#D32F2F"}
    }
  }

  render() {
    const x = this.props.position.x - testChargeRadius;
    const y = this.props.position.y - testChargeRadius;
    const points = this.props.points;
    const moving = this.props.moving;
    const color = this.getColorAndStroke(moving)
    
    return (
      <Svg style={[styles.testCharge, {top: 0, left: 0}]} key={1}>
        <Circle cx={x + testChargeRadius} 
          cy={y + testChargeRadius} 
          r={testChargeRadius} 
          fill={color.fill}
          stroke={color.stroke}
          strokeWidth={2}
          key={2}
          />
          <Path d={this.drawPoints(points)} 
          key={3}
          fill="none"
          stroke="black"
          />
      </Svg>
    );
  }
}



const styles = StyleSheet.create({
  testCharge: 
  {
    width: windowWidth, 
    height: windowHeight, 
    position: "absolute",
  },
});