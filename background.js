import React, { PureComponent } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Svg } from "react-native-svg";

import { Track } from "./raceTrack.js";
import { FieldLines } from "./fieldLines.js";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export class Background extends PureComponent 
{
  getFieldLinesVisibility = (gameMode) =>
  {
    if (gameMode == "Build") return "1"; 
    if (gameMode == "Play")  return "0"; 
  } 

  getBackgroundColor = (gameMode) =>
  {
    if (gameMode == "Build") return "#37474F"; 
    if (gameMode == "Play")  return "black"; 
  } 

  render() {
    const fieldLinesPoints = this.props.fieldLinesPoints;
    const gameMode = this.props.gameMode;
    const level = this.props.level;

    const opacity = this.getFieldLinesVisibility(gameMode);
    const backgroundColor = this.getBackgroundColor(gameMode);
    
    
    
    return (
      <Svg style={[styles.background, {backgroundColor: backgroundColor}]} key={1}>

        <Track level={level} gameMode={gameMode} />

        <FieldLines lines={fieldLinesPoints} opacity={opacity} />

      </Svg>
    );
  }
}

const styles = StyleSheet.create({
  background: 
  {
    top: 0,
    left: 0,
    width: windowWidth, 
    height: windowHeight, 
    position: "absolute",
  },
});