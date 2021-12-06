// this class describes the properties of a single cloud.
class Cloud {
    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
      constructor(){
        this.x = random(0,width);
        this.y = random(0,height);
        this.size = random(50,100);
        this.xSpeed = random(-2,2);
        this.ySpeed = random(-1,1.5);
      }
    
    // setting the particle in motion.
      moveCloud() {
        if(this.x < 0 || this.x > width)
          this.xSpeed*=-1;
        if(this.y < 0)
          this.ySpeed*=-1;
        if(this.y > height)
          this.ySpeed*=0;
        this.x+=this.xSpeed;
        this.y+=this.ySpeed;
      }
    
    // this function creates the connections(lines)
    // between particles which are less than a certain distance apart
      joinClouds(clouds) {
        clouds.forEach(element =>{
          let dis = dist(this.x,this.y,element.x,element.y);
          if(dis<85) {
            noStroke();
            line(this.x,this.y,element.x,element.y);
            ellipse(this.x, this.y, this.size);
            ellipse(element.x, element.y, this.size);
            ellipse(this.x, element.y, this.size);
            ellipse(element.x, this.y, this.size);
          }
        });
      }
    }