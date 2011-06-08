Stutter = function(id) {

  var canvas     = document.getElementById(id);
  var ctx        = canvas.getContext('2d');
  var width      = canvas.width  = canvas.offsetWidth;
  var height     = canvas.height = canvas.offsetHeight;
  var color      = { background: '#EEE', ball: '#111' };
  var size       = 20;
  var x          = 50;
  var y          = 50;
  var dx         = 0.1;
  var dy         = 0.1;
  var maxx       = width  - size;
  var maxy       = height - size;
  var timestamp  = function() { return Date.now(); }

  var render = function() {
    ctx.fillStyle = color.background;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = color.ball;
    ctx.fillRect(x, y, size, size);
  };

  var update = function(dt) {

    x = x + (dx * dt);
    y = y + (dy * dt);

    if ((dx < 0) && (x <= 0))
      dx = -dx;
    else if ((dx > 0) && (x >= maxx))
      dx = -dx;

    if ((dy < 0) && (y <= 0))
      dy = -dy;
    else if ((dy > 0) && (y >= maxy))
      dy = -dy;

  };

  var last = timestamp();
  var frame = function(now) {
    update(now - last);
    render();
    last = now;
    requestAnimationFrame(frame, canvas);
  };
  requestAnimationFrame(frame, canvas);

//=================
// USE setInterval:
//
//  var last = now = timestamp();
//  var step = 1000/60;
//  var frame = function() {
//    now = timestamp();
//    update(now - last);
//    render();
//    last = now;
//  };
//  setInterval(frame, step);

//================
// USE setTimeout:
//
//  var last = now = timestamp();
//  var step = 1000/60;
//  var frame = function() {
//    now = timestamp();
//    update(now - last);
//    render();
//    last = now;
//    setTimeout(frame, step);
//  }
//  setTimeout(frame, step);

};

if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  window.requestAnimationFrame = window.webkitRequestAnimationFrame || 
                                 window.mozRequestAnimationFrame    || 
                                 window.oRequestAnimationFrame      || 
                                 window.msRequestAnimationFrame     || 
                                 function(callback, element) {
                                   window.setTimeout(function() { callback(Date.now()); }, 1000 / 60);
                                 }
}


