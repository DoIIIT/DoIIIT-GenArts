// reference: http://www.instructables.com/id/Javascript-robotics-and-browser-based-Arduino-cont/

var app = require("http").createServer(handler),
    io = require("socket.io").listen(app),
    fs = require("fs")
    five = require("johnny-five"),
    board, sensor;

board = new five.Board();

board.on("ready", function() {
  sensor = new five.Sensor({
    pin: "A0",
    freq: 500
    // threshold: 300
  });

  // var light = new five.Sensor({
  //   pin: "A0",
  //   freq: 500,
  //   thrshold: 5
  // });

  sensor.on("data", function(){
      console.log( this.value );
  });

  // GLOBAL.sensor = sensor;

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

io.sockets.on("connection", function(socket) {
  socket.emit("news", { hello: "world"});

  if(board.isReady) {
    sensor.on("data", function(){
      socket.emit("sensor", { raw: this.raw });
    });
  }

  socket.on("led", function( data) {
      console.log(data);
  });

})
