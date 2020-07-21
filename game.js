import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, StatusBar, Dimensions } from "react-native";
import Slider from "react-native-slider";
import * as ScreenOrientation from 'expo-screen-orientation';

import { GameEngine } from "react-native-game-engine";
import { MoveCharges, MoveTestCharge, FinishPopUp } from "./systems";

import { createVector } from "./physics.js";
import { TestCharge } from "./testCharge.js";
import { Charge } from "./charge.js";
import { Background } from "./background.js";
import { GameButton } from "./gameButton.js";

//ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class BestGameEver extends PureComponent {
  constructor() {
    super();
    this.Event = null;
  }

  

  render() {
    return (
      
      <GameEngine
        key={"Game Engine"}
        ref={(ref) => { this.Event = ref; }}
        style={styles.container}
        systems={[MoveCharges, MoveTestCharge, FinishPopUp]}
        entities={{
          // // The two modes are "Build" or "Play"
          // // The <Background /> has both the track and feildlines in it
          0: { renderer: <Background />, fieldLinesPoints: null, gameMode: "Play", level: 5}, 
          

          1: { renderer: <GameButton />, title: "Delete", position: createVector(       30        , windowHeight - 40), opacity: "1", color: "white" }, 
          2: { renderer: <GameButton />, title: "Build" , position: createVector(windowWidth - 120, windowHeight - 40), opacity: "1", color: "white" }, 
          3: { renderer: <GameButton />, title: "Pause" , position: createVector(windowWidth - 50 , windowHeight - 40), opacity: "1", color: "white" }, 

          4: { renderer: <TestCharge />, position: null, moving: false, charge: 0.000000005, acceleration: createVector(0, 0), velocity: createVector(0, 0),  points: [], frames: 0 },
          
          5: { renderer: <Charge />, position: createVector( 50,100), selected: false, charge:  5 },
          6: { renderer: <Charge />, position: createVector(650,100), selected: false, charge: -5 }, 
        }}>

        <Slider key={"Slider"} 
          style={styles.slider} 
          minimumValue={-5} 
          maximumValue={5} 
          value={0} 
          step={1} 
          onValueChange={value => {this.Event.dispatch({ type: "Slider Moved", sliderValue: value}); this.Event.dispatch({ type: "Update Field Lines" });}} 
          />
          

        <StatusBar hidden={true} />

      </GameEngine>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#000000",
    overflow: "hidden",
  },
  slider: {
    width: windowWidth - 240, 
    height: 40, 
    position: "absolute", 
    bottom: 10, 
    left: 80, 
    zIndex: 999,
  },
});

AppRegistry.registerComponent("BestGameEver", () => BestGameEver);