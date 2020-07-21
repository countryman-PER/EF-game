//import { moveTestCharge } from "./systems";

export default class Vector 
{
    constructor(x, y) 
    {
      this.x = x || 0;
      this.y = y || 0;
    }

    mag() 
    {
        return createVector(this.x, 0).getDistance(createVector(0, this.y));
    }
    mult(factor) 
    {
        return createVector(this.x * factor, this.y * factor);
    }
    div(factor) 
    {
        return createVector(this.x / factor, this.y / factor);
    }
    add(point) 
    {
        return createVector(this.x + point.x, this.y + point.y);
    }
    sub(point) 
    {
        return createVector(this.x - point.x, this.y - point.y);
    }
    angleBetween(point) 
    {
        let deltaX = point.x - this.x;
        let deltaY = point.y - this.y;
        let angle = Math.atan(deltaY / deltaX)
        if (this.x < point.x)
        {
            angle += Math.PI;
        }
        return angle;
    }
    getDistance(point) 
    {
        let deltaX = this.x - point.x;
        let deltaY = this.y - point.y;
        let distance = Math.hypot(deltaX,deltaY);
        return distance;
    }
    angle() 
    {
        let x = this.x;
        let y = this.y;
        let angle = Math.atan(y / x)
        // if (this.x < point.x)
        // {
        //     angle += Math.PI;
        // }
        return angle;
    }
    rotate(angle)
    {
        let desiredAngle = radians(angle);
        let newX = this.x * Math.cos(desiredAngle) - this.y * Math.sin(desiredAngle);
        let newY = this.x * Math.sin(desiredAngle) + this.y * Math.cos(desiredAngle);
        let rotatedVector = createVector(Math.round(newX), Math.round(newY))
        return rotatedVector;
    }
    setMag(desiredMag)
    {
        let mag = this.mag();
        let unitVector = this.div(mag);
        let newMag = unitVector.mult(desiredMag);

        return newMag;
    }
    round()
    {
        let xComponent = Math.round(this.x);
        let yComponent = Math.round(this.y);
        return createVector(xComponent, yComponent);
    }
}



export function createVector(x, y) 
{
    return new Vector(x, y);
}
export function radians(angle)
{
    return angle * (Math.PI / 180);
}
export function degrees(angle)
{
    return angle * (180 / Math.PI);
}

export function pointCollideWith(point, shape)
{
    if (shape.shape == "Rect")
    {
        if (point.position.x > shape.x && point.position.x < shape.x + shape.width && point.position.y > shape.y && point.position.y < shape.y + shape.height) 
        {
          return true;
        }
    }
    if (shape.shape == "Circle")
    {
        let shapePosition = createVector(shape.x, shape.y);
        let pointToShapeDistance = shapePosition.getDistance(point.position);

        if (pointToShapeDistance < shape.radius) 
        {
          return true;
        }

    }
    return false;
}

export function circleCollideWith(circle, shape)
{
    if (shape.shape == "Rect")
    {
        if (circle.position.x - circle.radius > shape.x && circle.position.x + circle.radius < shape.x + shape.width && circle.position.y - circle.radius > shape.y && circle.position.y + circle.radius < shape.y + shape.height) 
        {
          return true;
        }
    }
    if (shape.shape == "Circle")
    {
        let shapePosition = createVector(shape.x, shape.y);
        let circleToShapeDistance = shapePosition.getDistance(circle.position);

        if (circleToShapeDistance < shape.radius - circle.radius) 
        {
          return true;
        }

    }
    return false;
}

export function checkCollision(shapeOne, shapeTwo)
{
    let shapeOnePosition = createVector(shapeOne.position.x, shapeOne.position.y);
    let shapeTwoPosition = createVector(shapeTwo.position.x, shapeTwo.position.y);

    if (shapeOne.shape == "Point")
    {
        if (shapeTwo.shape == "Circle")
        {
            let pointToCircleDistance = shapeOnePosition.getDistance(shapeTwoPosition);

            if (pointToCircleDistance < shapeTwo.radius) 
            {
                return true;
            }
            return false;
        }
        if (shapeTwo.shape == "Rect")
        {
            if (shapeOnePosition.x >= shapeTwoPosition.x && 
                shapeOnePosition.x <= shapeTwoPosition.x + shapeTwo.width && 
                shapeOnePosition.y >= shapeTwoPosition.y && 
                shapeOnePosition.y <= shapeTwoPosition.y + shapeTwo.height) 
            {
                return true;
            }
            return false;
        }
        console.error("Shape not defined");
        return false;
    }

    if (shapeOne.shape == "Circle")
    {
        if (shapeTwo.shape == "Circle")
        {
            let circleToCircleDistance = shapeOnePosition.getDistance(shapeTwoPosition);
            //console.log(circleToCircleDistance);
            
            if (circleToCircleDistance < shapeTwo.radius ) 
            {
                return true;
            }
            return false;
        }
        if (shapeTwo.shape == "Rect")
        {
            if (shapeOnePosition.x - shapeOne.radius > shapeTwoPosition.x && 
                shapeOnePosition.x + shapeOne.radius < shapeTwoPosition.x + shapeTwo.width && 
                shapeOnePosition.y - shapeOne.radius > shapeTwoPosition.y && 
                shapeOnePosition.y + shapeOne.radius < shapeTwoPosition.y + shapeTwo.height) 
            { 
                return true;
            }
            return false;
        }
        console.error("Shape not defined");
        return false;
    }
}



export function netForceAtPosition(position, charges)
{
    let netForce = createVector(0, 0);
    
    charges.forEach(charge => {
  
        //F = KQ / (r^2)
        //let k = 1000;
        let k = 8.99 * Math.pow(10,9);
        let kq = charge.charge  * k;
        let r = position.getDistance(charge.position);
        if (r < 20)
        {
            r = 20;
        }
        let rSquared = Math.pow(r,2);
        //      F = KQ / (r^2)
        let force = kq / rSquared;
    
        let theta = position.angleBetween(charge.position);
        let forceX = force * Math.cos(theta);
        let forceY = force * Math.sin(theta);
            
        netForce.x += forceX;
        netForce.y += forceY;
           
    });
    
    
    return netForce;    
}

