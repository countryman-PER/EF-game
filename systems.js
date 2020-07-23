import React from "react";
import { Dimensions, Alert } from "react-native";
import { Vector, createVector, netForceAtPosition, checkCollision, pointCollideWith, circleCollideWith} from "./physics.js";
import { Charge } from "./charge.js";
import { GameButton } from "./gameButton.js";
import { FinishScreen } from "./finishScreen.js";
import { levels } from "./levels.js";




const fieldLinesPerCoulomb = 4;
const chargeRadius = 20;
const testChargeRadius = 5;
const buttonRadius = 20;
const starRadius = 10;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let levelTime = 0;
let levelAttempts = 1;
let finished = false;




function objectLength(object) 
{
  let length = 0;
  for(let key in object) 
  {
    if(object.hasOwnProperty(key)) 
    {
      ++length;
    }
  }

  return length;
}


function filterEntitiesFor(nameToFilterFor, entities)
{
  entities = Object.values(entities);

  let filteredItems = entities.filter((entity) => {
    if(entity.renderer != undefined)
    {
      // Cannot access renderer properties when publish in Expo
      //return entity.renderer.type.name == nameToFilterFor;
      return entity.class == nameToFilterFor;
    }
  });


  return filteredItems;
}


function checkTrackCollisions(entities)
{
  let level = entities[0].level;
  let testCharges = filterEntitiesFor("TestCharge", entities);

  testCharges.forEach(testCharge => 
    {
    let moving;

    levels[level - 1].shapes.forEach(shape => 
    {

      let shapeOne, shapeTwo;

      shapeOne = {shape: "Circle", position: testCharge.position, radius: testChargeRadius};
      
      if (shape.shape == "Rect")
      {
        shapeTwo = {shape: shape.shape, position: createVector(shape.x, shape.y), width: shape.width, height: shape.height};
      }
      if (shape.shape == "Circle")
      {
        shapeTwo = {shape: shape.shape, position: createVector(shape.x, shape.y), radius: shape.radius};
      }
      

      if (checkCollision(shapeOne, shapeTwo) && !finished) 
      {
        if (shape.type == "track") 
        { 
          moving = true; 
        }
        else if (shape.type == "finish") 
        {
          moving = false;
          finished = true;
          //console.log("finished");
        }
        else 
        { 
          moving = false; 
        }
      }
      
    });
    testCharge.moving = moving;
    
  });

  
}

function checkStarCollisions(entities)
{
  let stars = filterEntitiesFor("Star", entities);
  let testCharges = filterEntitiesFor("TestCharge", entities);

  testCharges.forEach(testCharge => 
    {
      let collected;
      stars.forEach(star => 
      {
        collected = star.collected
      
        let shapeOne, shapeTwo;

        shapeOne = {shape: "Circle", position: testCharge.position, radius: testChargeRadius};
        shapeTwo = {shape: "Circle", position: star.position, radius: starRadius};
        

        if (checkCollision(shapeOne, shapeTwo) && !star.collected) 
        {
          
          collected = true; 
          //console.log("collected");
        }
        star.collected = collected;
      });
      
    
    
  });

  
}

function calculateFieldLines(entities)
{
  let charges = filterEntitiesFor("Charge", entities);

  let allFieldLines = "";

    charges.forEach(charge => {

      
      let penPosition;
      let fieldLine = "M 0,0 ";

      if (charge.charge > 0)
      {
        let numberOfLines = fieldLinesPerCoulomb * charge.charge;
        
        for (let a = 0; a < numberOfLines + 1; a++) 
        {
          let chargeRadius = createVector(11, 10);
          penPosition = chargeRadius.rotate((360 / numberOfLines) * a).add(charge.position);
          

          fieldLine += "M" + penPosition.x + "," + penPosition.y;

          for (let i = 0; i < 80; i++) 
          {
            let netForce = netForceAtPosition(penPosition, charges);
            
            let netForceUnitVector = netForce.setMag(10);

            penPosition = penPosition.add(netForceUnitVector);

            fieldLine +=  "l" + netForceUnitVector.x + "," + netForceUnitVector.y; 
          }

        }  

      }
      allFieldLines += fieldLine;
    });

    return allFieldLines;
}





function resetTestCharges(entities, movingBoolean)
{
  let testCharges = filterEntitiesFor("TestCharge", entities);

  testCharges.forEach(testCharge => 
  {
    let startingPosition = levels[entities[0].level - 1].testChargeStartingPosition;

    testCharge.position = startingPosition;
    testCharge.velocity = createVector(0, 0);
    testCharge.acceleration = createVector(0, 0);
    testCharge.points = [];
    testCharge.frames = 0;
    testCharge.moving = movingBoolean;
  });

}




function resetStars(entities)
{
  let stars = filterEntitiesFor("Star", entities);

  stars.forEach(star => 
  {
    star.collected = false;
  });
}





function removeEntity(remove, entities)
{
  let entitiesArray = Object.values(entities);

  let found = entitiesArray.find(entity => entity == remove);
  let index = entitiesArray.indexOf(found);

  entities[index] = { };
}

/**********************************************************
 * this is where selecting, moving and removing charges 
 * is handled 
 * button clicks are also handled here 
***********************************************************/
const MoveCharges = (entities, { touches, events }) => {
  let charges = filterEntitiesFor("Charge", entities);
  let testCharges = filterEntitiesFor("TestCharge", entities);
  let background = entities[0];
  let buttons = filterEntitiesFor("GameButton", entities);


  events.filter(event => event.type == "Slider Moved").forEach(slider =>
  {
    let sliderValue = slider.sliderValue;
    charges.filter(charge => charge.selected).forEach(selectedCharge =>
    {
      selectedCharge.charge = sliderValue;
    });
  })


  // this is where selecting a charge and clicking buttons is handled 
  touches.filter(touch => touch.type === "start").forEach(touch => 
  {    

    let chargeSelected = false;
    let touchPosition = createVector(touch.event.pageX, touch.event.pageY);

	//Alert.alert("touch position: " + Math.round(touchPosition.x) + ", " + Math.round(touchPosition.y));
	//Alert.alert("Title of entitity 2:" + entities[2].title);
    

    charges.forEach(charge =>
    {
      let chargeToTouchDistance = touchPosition.getDistance(charge.position) - 10;
      
      if(chargeToTouchDistance < chargeRadius && !chargeSelected && background.gameMode == "Build")
      {
        charge.selected = true;
        chargeSelected = true; 
      }
      else
      {
        charge.selected = false;
      }
    });

    let buttonClicked = false;
    // Array.some( ) checks if any item in the array fits the condition after the "=>". If so, it returns true.
    // The ! flips this so the if statement is true if none of the charges were selected
    if (!charges.some(charge => charge.selected))
    {
      buttons.forEach(button =>
      {
        let title = button.title;
        let buttonToTouchDistance = touchPosition.getDistance(button.position) - 10;

        
        if(buttonToTouchDistance < buttonRadius)
        {
          buttonClicked = true;
          
          if (title == "Play") 
          {
            background.gameMode = "Play";
            button.title = "Build";

            resetTestCharges(entities, true);
          }
          else if (title == "Build") 
          {
            background.gameMode = "Build";
            button.title = "Play";
            levelAttempts++;

            resetStars(entities);
            resetTestCharges(entities, false);
          }


          if (title == "Redo") 
          {
            let finishScreens = filterEntitiesFor("FinishScreen", entities);
              
            resetTestCharges(entities, false);
            background.gameMode = "Build";

            let entitiesArray = Object.values(entities);
            let found = buttons.find(button => button.title == "Build" || button.title == "Play");
            let index = entitiesArray.indexOf(found);
            entities[index].title = "Play";

            resetStars(entities);
              
            removeEntity(finishScreens[0], entities);

            buttons.forEach(gameButton => {
              if(gameButton.type == "finish")
              {
                removeEntity(gameButton, entities);
              }
            });

            charges.forEach(charge => 
            {
              removeEntity(charge, entities);
            });

            levelAttempts = 1;
            levelTime = 0;
              
              
            finished = false;
          }





          if (title == "Next Level") 
          {        
            if(levels.length > entities[0].level)
            {    
              background.level++;

              levelAttempts = 1;
              levelTime = 0;

              let finishScreens = filterEntitiesFor("FinishScreen", entities);
              
              resetTestCharges(entities, true);
              resetStars(entities);
              
              removeEntity(finishScreens[0], entities);

              buttons.forEach(gameButton => 
              {
                if(gameButton.type == "finish")
                {
                  removeEntity(gameButton, entities);
                }
              });

              charges.forEach(charge => 
              {
                removeEntity(charge, entities);
              });

              finished = false;

            }
            
          }
          
        }

        if(title == "Delete" && background.gameMode == "Build")
        {
          button.visiblity = "visible";  
                
        }
        else if (title == "Delete" && background.gameMode == "Play")
        {
          button.visiblity = "hidden";      

        }
        
      });

      if (!buttonClicked && background.gameMode == "Build")
      {
        
        entities[objectLength(entities)] = { 
          renderer: <Charge />,
  	  class: "Charge",
          position: createVector(touch.event.pageX, touch.event.pageY), 
          selected: true, 
          charge: 0};
          
      }


      
      
    } 
  });


  // this is where the moving and removal of test charges is handled 
  touches.filter(touch => touch.type === "move").forEach(touch => 
  {
    let selectedCharge = charges.find(charge => charge.selected);

    if (selectedCharge != undefined)
    {
      let touchPosition = createVector(touch.event.pageX, touch.event.pageY);
      let deleteButton = buttons.filter(button => button.title == "Delete")[0];

      selectedCharge.position = touchPosition;
        
      let distanceToDeleteButton = touchPosition.getDistance(deleteButton.position);
        
      if(distanceToDeleteButton < buttonRadius)
      {
        removeEntity(selectedCharge, entities);    
      }
    }


    return entities;
  });

  if (background.gameMode == "Build")
  {
    background.fieldLinesPoints = calculateFieldLines(entities);
  }
  


  return entities;
};


// this is where all test charge movement, starting positions and collisions are handled
const MoveTestCharge = (entities, { touches, events }) => {
  let charges = filterEntitiesFor("Charge", entities);
  let testCharges = filterEntitiesFor("TestCharge", entities);
  
  testCharges.forEach(testCharge => {


    // this sets the starting position of the test charge to whatever it is in the level.js file for the specific level
    if(testCharge.position == null)
    {
      testCharge.position = levels[entities[0].level - 1].testChargeStartingPosition;
    }

    // if the game mode is play and the level isn't finished, this moves the test charge
    if (entities[0].gameMode == "Play" && !finished)
    {
      // checks for collisions between the test charge and the track and stops the test charge when it is off the track
      // sets testCharge.moving to false if the testCharge is out of the track
      checkTrackCollisions(entities);

      if(testCharge.moving)
      {
        let velocity = testCharge.velocity;
        let position = testCharge.position;
        let netForce = netForceAtPosition(position, charges);
        
        
        // F  = qE
        // ma = qE
        // a  = (qE)/m
        // m would be 1

        //         acceleration = (E*q)/1
        testCharge.acceleration = netForce.mult(testCharge.charge);
        testCharge.velocity = velocity.add(testCharge.acceleration);
        testCharge.position = position.add(testCharge.velocity);
        testCharge.frames++;

        // adds dots that trail the testCharge as it moves
        if (testCharge.frames % 10 == 0)
        {
          testCharge.points.push(testCharge.position);        
        }
      }

    }
  });
  
  return entities;
};


const FinishPopUp = (entities, { touches, events }) => {
  let finishScreens = filterEntitiesFor("FinishScreen", entities);
  let stars = filterEntitiesFor("Star", entities);
  if (finished && finishScreens.length == 0)
  {
    let numberofStars = 0;

    stars.forEach(star => 
      {
        if (star.collected) {
          numberofStars++;
        }
      })

    entities[objectLength(entities)] = { 
      renderer: <FinishScreen  />,
      class: "FinishScreen",
      level: entities[0].level,
      stars: numberofStars,
      time: Math.round(levelTime) + "s",
      attempts: levelAttempts,
      score: Math.round((numberofStars + 1) * 999 / (levelTime + levelAttempts))};

    
      entities[objectLength(entities)] = { 
        renderer: <GameButton />,
	class: "GameButton",
        title: "Redo",
        type: "finish",
        position: createVector(windowWidth/2 - 100, windowHeight * 0.75), 
        visibility: "visible",
        color: "white"};

      entities[objectLength(entities)] = { 
        renderer: <GameButton />,
	class: "GameButton",
        title: "Pause",
        type: "finish",
        position: createVector(windowWidth/2 , windowHeight * 0.75), 
        visibility: "visible",
        color: "white"};

      entities[objectLength(entities)] = { 
        renderer: <GameButton />,
	class: "GameButton",
        title: "Next Level",
        type: "finish",
        position: createVector(windowWidth/2 + 100, windowHeight * 0.75), 
        visibility: "visible",
        color: "white"};
    
      

      //console.log("showing finish screen");

  }
  
  return entities;
};


const StarsCollection = (entities, { touches, events }) => {
  
  let stars = filterEntitiesFor("Star", entities);
  
  for (let i = 0; i < stars.length; i++) 
  {
    stars[i].position = levels[entities[0].level - 1].starPositions[i];
    
  }

  stars.forEach(star => 
  {
    checkStarCollisions(entities);
  });

  return entities;
};






const TimeAndAttempts = (entities, { time }) => {
  
  
  if (!finished)
  {
    levelTime += (time.delta/1000)
  }
  let levelTexts = filterEntitiesFor("LevelText", entities);
  
  levelTexts.forEach(levelText => {
    if (levelText.title == "Time Elapsed") 
    {
      levelText.text = "Time: " + Math.round(levelTime) + " s";
    }

    if (levelText.title == "Attempts") 
    {
      levelText.text = "Tries: " + levelAttempts;
    }
  })

  

  return entities;
};

export { MoveCharges, MoveTestCharge, FinishPopUp, StarsCollection, TimeAndAttempts };


// icphysics
// ic14850
