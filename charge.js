import React, { PureComponent } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Svg, Circle, Text } from "react-native-svg";

const chargeRadius = 20;

export class Charge extends PureComponent 
{

  drawBorder = (selected) =>
  {
    if (selected) { return 1; }
    else { return 0; }
  }

  pickColor = (charge) =>
  {
    if (charge > 0) { return "#D32F2F"; }
    if (charge < 0) { return "#1976D2"; }
    return "#616161";
  } 

  chargeToString = (charge) =>
  {
    if (charge > 0) { return "+" + charge; } 
    else { return charge; }
  }

  render() {
    const x = this.props.position.x - chargeRadius;
    const y = this.props.position.y - chargeRadius;
    const charge = this.props.charge;
    const selected = this.props.selected;
    return (
      <Svg style={[styles.charge, {top: y, left: x}]} key={1}>
        <Circle cx={chargeRadius} cy={chargeRadius} 
          r={chargeRadius - 2} 
          fill={this.pickColor(charge)} 
          stroke="white" 
          strokeWidth={this.drawBorder(selected)} 
          key={2} />
          
        <Text x={chargeRadius - 5} 
          y={chargeRadius + 6} 
          fill="white" 
          stroke="none" 
          fontSize="16"
          key={3}
          style={{zIndex: 150,}} >
            {this.chargeToString(charge)}
        </Text>

        
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