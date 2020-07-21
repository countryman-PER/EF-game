import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { Svg, Circle } from "react-native-svg";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt,faBars,faPlay,faTools, faExclamation, faArrowRight, faRedo } from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";

const buttonRadius = 25;

// library.add(faTrashAlt,faBars,faPlay,faTools);

export class GameButton extends PureComponent 
{
    
    getSvg = (title) =>
    {
        if(title == "Build")
        {
            return faTools;
        }
        if(title == "Play")
        {
            return faPlay;
        }
        if(title == "Delete")
        {
            return faTrashAlt;
        }
        if(title == "Pause")
        {
            return faBars;
        }
        if(title == "Next Level")
        {
            return faArrowRight;
        }
        if(title == "Redo")
        {
            return faRedo;
        }
        return faExclamation;
    } 

    getTransform = (title) =>
    {
        if(title == "Play")
        {
            return "top-10 shrink-7 right-1";
        }
        if(title == "Build")
        {
            return "top-10 shrink-7 right-0.5";
        }
        return "top-10 shrink-7";
    } 
    render() {
        const position = this.props.position;
        const title = this.props.title;
        const visibility = this.props.visibility;
        const color = this.props.color;
        const icon = this.getSvg(title);
        const trasnform = this.getTransform(title);
        

        return (
                <Svg style={[styles.button, {top: position.y - buttonRadius, left: position.x - buttonRadius, visibility: visibility}]} key={1}>
                    <Circle 
                        cx={buttonRadius + 1} 
                        cy={buttonRadius + 1} 
                        r ={buttonRadius - 2} 
                        fill={color} 
                        stroke="white" 
                        strokeWidth={1} 
                        key={2}
                        />


                    {/* <Path transform={this.getTransform(title)} d={this.getSvg(title)}/> */}


                    {/* <FontAwesome icon={SolidIcons.smile} /> */}

                    <FontAwesomeIcon transform={trasnform} icon={icon} size={50} color={"black"} />


                    
                </Svg>
            );
            }
}
const styles = StyleSheet.create({
    button: 
    {
        width: 50, 
        height: 50, 
        position: "absolute",
    },
  });