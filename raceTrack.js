import React, { PureComponent } from "react";
import { Circle, Rect } from "react-native-svg";

import { levels } from "./levels.js";



export class Track extends PureComponent 
{
  getShapeColor = (shape, gameMode) =>
  {
    if (shape.type == "track")
    {
      if (gameMode == "Build") return "grey"; 
      if (gameMode == "Play")  return "white"; 
      return "red";
    }
    else if(shape.type == "remove")
    {
      if (gameMode == "Build") return "#37474F"; 
      if (gameMode == "Play")  return "black"; 
      return "red";
    }
    else if(shape.type == "finish")
    {
      if (gameMode == "Build") return "white"; 
      if (gameMode == "Play")  return "grey"; 
    }
    else
    {
      return "yellow";
    }
  }

  createLevel = (shapes, gameMode) =>
  {
    let track = [];
    let key = 0;

    shapes.forEach(shape => {
      key++;
      let x = shape.x;
      let y = shape.y;
      let fillColor = this.getShapeColor(shape, gameMode);
      let strokeColor = "none";
      let strokeWidth = 1;
      

      
      if (shape.shape == "Circle")
      {
        track.push(<Circle cx={ x } cy={ y } fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} key={key} r={shape.radius} />);
      }
      else if (shape.shape == "Rect")
      {
        track.push(<Rect  x={ x }  y={ y }   fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} key={key} width={shape.width} height={shape.height} />);
      }
      else
      {
        console.error("Not valid track shape");
      }
    });

    return track;
  }


  render() {
    const level = this.props.level;
    const gameMode = this.props.gameMode;

    return this.createLevel(levels[level - 1].shapes, gameMode);
  }
}
