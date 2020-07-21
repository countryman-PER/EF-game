import React, { PureComponent } from "react";
import { AppRegistry, StyleSheet, StatusBar, Dimensions } from "react-native";
import Slider from "react-native-slider";
import * as ScreenOrientation from 'expo-screen-orientation';

import { GameEngine } from "react-native-game-engine";
import { MoveCharges, MoveTestCharge, FinishPopUp, StarsCollection, TimeAndAttempts } from "./systems";

import { createVector } from "./physics.js";
import { TestCharge } from "./testCharge.js";
import { Charge } from "./charge.js";
import { Star } from "./star.js";
import { Background } from "./background.js";
import { GameButton } from "./gameButton.js";
import { LevelText } from "./levelText.js";

// try
// {
//   ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
// }
// catch
// {
//   console.log("can rotate");
  
// }


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class BestGameEver extends PureComponent {
  constructor() {
    super();
    this.Event = null;
    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }

  

  render() {
    return (
      
      <GameEngine
        key={"Game Engine"}
        ref={(ref) => { this.Event = ref; }}
        style={styles.container}
        systems={[MoveCharges, MoveTestCharge, FinishPopUp, StarsCollection, TimeAndAttempts]}
        entities={{
          // // The two modes are "Build" or "Play"
          // // The <Background /> has both the track and feildlines in it
          0: { renderer: <Background />, fieldLinesPoints: null, gameMode: "Play", level: 1, class: "Background"}, 
          

          1: { renderer: <GameButton />, title: "Delete", type: "Game", position: createVector(       30       , windowHeight - 30), opacity: "1", color: "white", class: "GameButton" }, 
          2: { renderer: <GameButton />, title: "Build" , type: "Game", position: createVector(windowWidth - 90, windowHeight - 30), opacity: "1", color: "white", class: "GameButton" }, 
          3: { renderer: <GameButton />, title: "Pause" , type: "Game", position: createVector(windowWidth - 30, windowHeight - 30), opacity: "1", color: "white", class: "GameButton" }, 

          4: { renderer: <LevelText />, title: "Time Elapsed", position: createVector(windowWidth - 90,  0), text: "Pause", class: "LevelText" }, 
          5: { renderer: <LevelText />, title: "Attempts",     position: createVector(windowWidth - 90, 20), text: "Pause", class: "LevelText" }, 

          6: { renderer: <Star />, position: createVector(0, 0), collected: false, class: "Star" },
          7: { renderer: <Star />, position: createVector(0, 0), collected: false, class: "Star" },
          8: { renderer: <Star />, position: createVector(0, 0), collected: false, class: "Star" },

          9: { renderer: <TestCharge />, position: createVector(10,10), moving: false, charge: 0.000000005, acceleration: createVector(0, 0), velocity: createVector(0, 0),  points: [], frames: 0, class: "TestCharge" },
          
          10: { renderer: <Charge />, position: createVector( 50,100), selected: false, charge:  5, class: "Charge" },
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
    width: windowWidth - 200, 
    height: 40, 
    position: "absolute", 
    bottom: 5, 
    left: 70, 
    zIndex: 999,
  },
});

AppRegistry.registerComponent("BestGameEver", () => BestGameEver);
