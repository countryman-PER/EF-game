import React, { PureComponent } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Svg, Rect, Circle, Text, Path } from "react-native-svg";

import { levels } from "./levels.js";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export class FinishScreen extends PureComponent 
{
  getStars = (numberofStars) =>
  {
    let stars = "";
    for (let i = 0; i < numberofStars; i++) {

      stars += "★";
      
    }
    for (let i = numberofStars; i < 3; i++) 
    {
      stars += "☆";
      
    }
    return stars;
  }


  render() {
    const level = this.props.level;
    const numberofStars = this.props.stars;
    const stars = this.getStars(numberofStars);
    const time = this.props.time;
    const attempts = this.props.attempts;
    const score = this.props.score;
    return (
      <Svg style={styles.charge} key={1}>
        <Rect x={0} y={0} width={windowWidth} height={windowHeight} fill={"rgba(150,150,150,0.95)"} />
        <Text x={windowWidth/2 - 100} y={50}>
          Level: {level}
            
        </Text>
        <Text x={windowWidth/2 - 100} y={125} fontSize={80} >
          {stars}
        </Text>
        <Text x={windowWidth/2 - 100} y={175} >
          Time:  {time}
        </Text>
        <Text x={windowWidth/2 - 100} y={200} >
          Attempts:  {attempts}
        </Text>
        <Text x={windowWidth/2 - 100} y={225} >
          Score:  {score}
        </Text>

        
      </Svg>
    );
  }
}

const styles = StyleSheet.create({
    charge: 
    {
        top: 0,
        left: 0,
        width: windowWidth, 
        height: windowHeight, 
        position: "absolute",
    },
  });