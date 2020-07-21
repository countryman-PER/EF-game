import { createVector } from "./physics.js";

export const levels = [
    {level: 1, testChargeStartingPosition: createVector(120, 100), 
      starPositions: [createVector(175, 85), createVector(250, 65), createVector(325, 100)],
      shapes: [
      {shape: "Rect",   x: 100, y:  50, width: 300, height: 100, type: "track"},
      {shape: "Rect",   x: 350, y:  50, width:  50, height: 100, type: "finish"}]},
    
      
    {level: 2, testChargeStartingPosition: createVector(150, 80), 
      starPositions: [createVector(150, 125), createVector(150, 150), createVector(150, 175)],
      shapes: [
      {shape: "Circle", x: 150, y: 150, radius: 125,             type: "track"},
      {shape: "Rect",   x: 125, y:  220, width:  50, height: 50, type: "finish"}
      ]},

    {level: 3, testChargeStartingPosition: createVector(140,100), 
      starPositions: [createVector(246, 103), createVector(413, 136), createVector(481, 214)],
      shapes: [
      {shape: "Circle", x: 500, y: 175, radius: 125,             type: "track"},
      {shape: "Rect",   x: 100, y:  50, width: 400, height: 100, type: "track"},
      {shape: "Rect",   x: 475, y:  240, width:  50, height: 50, type: "finish"}
      ]},


    {level: 4, testChargeStartingPosition: createVector(160,100), 
      starPositions: [createVector(279, 101), createVector(528, 138), createVector(581, 230)],
      shapes: [
      {shape: "Rect",   x: 100, y:  50, width: 400, height: 100, type: "track"},
      {shape: "Circle", x: 500, y: 175, radius:125,             type: "track"},
      {shape: "Rect",   x: 525, y: 175, width: 100, height: 125, type: "track"}, 
      {shape: "Rect",   x: 100, y: 150, width: 400, height:  50, type: "remove"},
      {shape: "Circle", x: 500, y: 175, radius: 25,              type: "remove"},
      {shape: "Rect",   x: 325, y: 175, width: 200, height: 125, type: "remove"},
      {shape: "Rect",   x: 525, y: 250, width: 100, height: 50, type: "finish"}]},


    {level: 5, testChargeStartingPosition: createVector(160,100), 
      starPositions: [createVector(314, 95), createVector(559, 173), createVector(308, 245)],
      shapes: [
      {shape: "Rect",   x: 100, y:  50, width: 400, height: 100, type: "track"},
      {shape: "Rect",   x: 100, y: 200, width: 400, height: 100, type: "track"},
      {shape: "Circle", x: 500, y: 175, radius: 125,             type: "track"}, 
      {shape: "Rect",   x: 100, y: 150, width: 400, height:  50, type: "remove"},
      {shape: "Circle", x: 500, y: 175, radius: 25,              type: "remove"},
      {shape: "Rect",   x: 100, y: 200, width:  50, height: 100, type: "finish"},]},
  ];