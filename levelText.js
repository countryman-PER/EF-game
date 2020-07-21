import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { Svg, Text } from "react-native-svg";

export class LevelText extends PureComponent 
{

  render() {
    const x = this.props.position.x;
    const y = this.props.position.y;
    const text = this.props.text;
    return (
      <Svg style={[styles.charge, {top: y, left: x}]} key={1}>
        <Text x={10} 
          y={10} 
          fill="white" 
          stroke="none" 
          fontSize="16"
          key={3}
          style={{zIndex: 150,}} >
            {text}
        </Text>

        
      </Svg>
    );
  }
}

const styles = StyleSheet.create({
  charge: 
  {
    width: 80, 
    height: 40, 
    position: "absolute",
  },
});