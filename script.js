var deltaX = 0;
var deltaY = 0;
var lastX = 0;
var lastY = 0;
var previousX = 0;
var previousY = 0;

var enable = true;

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
  if (enable) {
    checkPortion(x_rotate, y_rotate);
  }
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


// png changes
function change_signature(src_number) {
  document.getElementById('front_sign').setAttribute('src', `sides/C1Signature/Front/c1-front-f${src_number}.png`)
  document.getElementById('left_sign').setAttribute('src', `sides/C1Signature/Left/c1-front-l${src_number}.png`)
  document.getElementById('bottom_sign').setAttribute('src', `sides/C1Signature/Bottom/c1-front-bt${src_number}.png`)



  document.getElementsByClassName('sign active')[0].classList.remove("active");
  document.getElementsByClassName('sign')[src_number - 1].classList.add("active");

  // document.getElementsByClassName('active')[0].classList.remove("active");



}

function change_roundel(src_number) {
  document.getElementById('front_circle').setAttribute('src', `sides/C2Roundel/Front/c2-roundel-a${src_number}.png`)

  document.getElementsByClassName('round active')[0].classList.remove("active");
  document.getElementsByClassName('round')[src_number - 1].classList.add("active");
}

function change_top(src_number) {
  document.getElementById('front_top').setAttribute('src', `sides/C3Top/Front/c3-top-f${src_number}.png`)
  document.getElementById('back_top').setAttribute('src', `sides/C3Top/Back/c3-top-b${src_number}.png`)
  document.getElementById('left_top').setAttribute('src', `sides/C3Top/Left/c3-top-l${src_number}.png`)
  document.getElementById('right_top').setAttribute('src', `sides/C3Top/Right/c3-top-r${src_number}.png`)
  document.getElementById('top_top').setAttribute('src', `sides/C3Top/Top/c3-top-t${src_number}.png`)

  document.getElementsByClassName('top_color active')[0].classList.remove("active");
  document.getElementsByClassName('top_color')[src_number - 1].classList.add("active");
}

function reset_to_front() {
  deltaX = 0;
  deltaY = 0;
  lastX = 0;
  lastY = 0;
  previousX = 0;
  previousY = 0;
  enable = true;
  rotate_front(0, 0);
  document.getElementById('btn_anim').innerHTML = "Animation: On";
  // toggle_animation();
}

function toggle_animation() {
  if (enable) {
    document.getElementById('btn_anim').innerHTML = "Animation: Off";
    document.getElementById('btn_anim').style.backgroundColor = "#4CAF50";
  } else {
    document.getElementById('btn_anim').innerHTML = "Animation: On";
    document.getElementById('btn_anim').style.backgroundColor = "teal";

  }
  enable = !enable;
}