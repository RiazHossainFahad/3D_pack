var deltaX = 0;
var deltaY = 0;
var lastX = 0;
var lastY = 0;
function rotateCube(distanceY, distanceX) {
  document.getElementById('cube').style.transition = "transform 0s";

  if (distanceY === void 0) {distanceY = 0;}
  if (distanceX === void 0) {distanceX = 0;}
  document.getElementById('cube').style.transform = "rotateY(" + distanceY + "deg) rotateX(" + distanceX + "deg)";
   lastX = distanceX % 360;
   lastY = distanceY % 360;
   console.log("In", lastX, lastY);
}
var hammertime = new Hammer(document.querySelector('.container'));
hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammertime.on('pan', function (ev) {
  console.log("start", deltaX, deltaY);

  let xdeg = Math.atan(ev.deltaX) * (180/Math.PI);
  let ydeg = Math.atan(ev.deltaY) * (180/Math.PI);
  //console.log("Y: " + ydeg, round90(ydeg), ev.deltaY)
  //console.log("X: " + ev.deltaX%360)
  // console.log(ev.deltaX / 2 + deltaX);
  rotateCube(ev.deltaX / 2 + deltaX, -ev.deltaY / 2 + deltaY);
});
hammertime.on('panend', function (ev) {
  
/**Initial step after swipe */
  //  deltaX = lastY = 0;
  //  deltaY = lastX = 0;
  // let xdeg = Math.atan(deltaX) * (180/Math.PI);
  // let ydeg = Math.atan(deltaY) * (180/Math.PI);
  
  /**Initial step after swipe  */
  // rotateCube(0,0);

  // document.getElementById('cube').style.transform = "rotateY(" + 0 + "deg) rotateX(" + 0 + "deg)";
  // document.getElementById('cube').style.transition = "transform 3s";
  // console.log(round90(ydeg))

  // Rotate
  let x_rotate = ev.deltaX % 360;
  console.log("X: " + x_rotate);

  checkPortion(x_rotate);

  deltaX = lastY;
  deltaY = lastX;
  console.log("End", deltaX, deltaY);
});

function round90(deg){
  return Math.round(deg/90);
  // return deg < 0 ? (Math.floor(deg/90)*90) : (Math.ceil(deg/90)*90);
}


function checkPortion(x_deg){
  if(x_deg >-360  && x_deg <=-270 || x_deg >270  && x_deg <=360 ){
    rotate_back();
  }
  else if(x_deg >-270  && x_deg <=-90){
    rotate_right();
  }
  else if (x_deg >-90 && x_deg <=90) {
    rotate_front();
  }
  else if (x_deg >90 && x_deg <=270) {
    rotate_left();
  }
  else{
    rotate_front();
  }
  document.getElementById('cube').style.transition = "transform 3s";

}

// 6 panes
// according X Axis
function rotate_front(){
  rotateCube(0,0);
}

function rotate_top(){
  rotateCube(0,-90);
}
function rotate_bottom(){
  rotateCube(0,90);
}

// according Y Axis
function rotate_left(){
  rotateCube(90,0);
}
function rotate_right(){
  rotateCube(-90,0);
}
function rotate_back(){
  rotateCube(180,0);
}