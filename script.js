var deltaX = 0;
var deltaY = 0;
var lastX = 0;
var lastY = 0;
var previousX = 0;
var previousY = 0;

function rotateCube(distanceY, distanceX) {
  document.getElementById('cube').style.transition = "transform 0s";

  if (distanceY === void 0) {
    distanceY = 0;
  }
  if (distanceX === void 0) {
    distanceX = 0;
  }
  document.getElementById('cube').style.transform = "rotateY(" + distanceY + "deg) rotateX(" + distanceX + "deg)";
  lastX = distanceX;
  lastY = distanceY;
}
var hammertime = new Hammer(document.querySelector('.container'));
hammertime.get('pan').set({
  direction: Hammer.DIRECTION_ALL
});
hammertime.on('pan', function (ev) {

  let x_rotate = (ev.deltaX + previousX) % 720;
  let y_rotate = (ev.deltaY + lastX) % 720;

  // console.log("X: " + x_rotate + " previousX: " + previousX);
  console.log("End X: " + x_rotate + " End Y: " + y_rotate);

  rotateCube(ev.deltaX / 2 + deltaX, -ev.deltaY / 2 + deltaY);
});
hammertime.on('panend', function (ev) {

  let x_rotate = (ev.deltaX + previousX) % 720;
  let y_rotate = (ev.deltaY + lastX) % 720;

  console.log("End X: " + x_rotate + " End Y: " + y_rotate);
  checkPortion(x_rotate, y_rotate);
  deltaX = lastY;
  deltaY = lastX;
  previousX = x_rotate;
  previousY = y_rotate;

});



function checkPortion(x_deg, y_deg) {
  if (y_deg > 70 && y_deg <= 140) {
    rotate_top()
  } else if (y_deg > -140 && y_deg <= -70) {
    rotate_bottom()
  } else if (x_deg > -460 && x_deg <= -280 || x_deg > 280 && x_deg <= 460) {
    rotate_back();
  } else if (x_deg > -280 && x_deg <= -100 || x_deg > 460 && x_deg <= 640) {
    rotate_right();
  } else if (x_deg > -100 && x_deg <= 100 || x_deg > -720 && x_deg <= -720 || x_deg > 640 && x_deg <= 720) {
    rotate_front();
  } else if (x_deg > -640 && x_deg <= -460 || x_deg > 100 && x_deg <= 280) {
    rotate_left();
  } else {
    rotate_front();
  }
  document.getElementById('cube').style.transition = "transform 3s";

}

// 6 panes
// according X Axis
function rotate_front() {
  rotateCube(0, 0);
}

function rotate_top() {
  rotateCube(0, -90);
}

function rotate_bottom() {
  rotateCube(0, 90);
}

// according Y Axis
function rotate_left() {
  rotateCube(90, 0);
}

function rotate_right() {
  rotateCube(-90, 0);
}

function rotate_back() {
  rotateCube(180, 0);
}