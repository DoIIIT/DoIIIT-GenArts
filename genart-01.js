var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  var led = new five.Led(13);

  led.strobe();

  // led.stop();
  // One hacky way of interactive debugging
  // 1. node-debug genart-01.js
  // 2. In the browser, run the script until board.on is loaded
  // 3. Set a breakpoint at whereever you want, e.g., led.strobe()
  // 4. Store the variable you want to interactively control to GLOBAL, e.g.,
  //    GLOBAL.led = led;
  // 5. Continue the debugger. Now you can access the led from GLOBAL.led. For
  //    example, you could run GLOBAL.led.stop();
})
