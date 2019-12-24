var deltaX = 0;
var deltaY = 0;
var lastX = 0;
var lastY = 0;
function rotateCube(distanceY, distanceX) {
  if (distanceY === void 0) {distanceY = 0;}
  if (distanceX === void 0) {distanceX = 0;}
  document.getElementById('cube').style.transform = "rotateY(" + distanceY + "deg) rotateX(" + distanceX + "deg)";
  lastX = distanceX;
  lastY = distanceY;
}
var hammertime = new Hammer(document.querySelector('.container'));
hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammertime.on('pan', function (ev) {
  rotateCube(ev.deltaX / 2 + deltaX, -ev.deltaY / 2 + deltaY);
});
hammertime.on('panend', function (ev) {
  deltaX = lastY;
  deltaY = lastX;
});