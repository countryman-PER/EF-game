import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { Svg, Circle, Text } from "react-native-svg";

const starRadius = 10;

export class Star extends PureComponent 
{

  pickColor = (collected) =>
  {
    if (!collected) { return "#FFD600"; }
    return "none";
  } 

  render() {
    const x = this.props.position.x;
    const y = this.props.position.y;
    const collected = this.props.collected;
    return (
      <Svg style={[styles.charge, {top: y - starRadius, left: x - starRadius}]} key={1}>
        <Circle cx={starRadius} cy={starRadius} 
          r={starRadius - 2} 
          fill={this.pickColor(collected)} 
          key={2} />
        
      </Svg>
    );
  }
}

const styles = StyleSheet.create({
  charge: 
  {
    width: 40, 
    height: 40, 
    position: "absolute",
  },
});