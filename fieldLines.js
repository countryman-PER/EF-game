import React, { PureComponent } from "react";
import { Path } from "react-native-svg";

export class FieldLines extends PureComponent 
{
  
  render() {
    const fieldLinesPoints = this.props.lines;
    const opacity = this.props.opacity;
    
    return (<Path d={fieldLinesPoints} style={{opacity: opacity}} fill="none" stroke="white" key={3} /> );
  }
}
