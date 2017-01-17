if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", deviceOrientationListener);
} else {
  alert("Es tut mir Leid, aber Ihr Gerät unterstützt diesen Sensor nicht.");
}

function deviceOrientationListener(event) {
  var compassCanvas = document.getElementById("aligningCompass");
  var compassContext = compassCanvas.getContext("2d");
  compassCanvasHalfWidth = compassCanvas.width / 2;
  compassCanvasHalfHeight = compassCanvas.height / 2;

  var img = new Image();
  img.src = "../res/compass.svg"
  halfWidth = img.naturalWidth / 2;
  haltHeight = img.naturalHeight / 2;

  compassContext.clearRect(0, 0, compassCavas.width, compassCanvas.height);
  compassContext.translate(compassCanvasHalfWidth, compassCanvasHalfHeight);
  compassContext.rotate(Math.Round(event.alpha));
  compassContext.translate(-compassCanvasHalfWidth, -compassCanvasHalfHeight);
  compassContext.drawImage(img, compassCanvasHalfWidth - halfWidth, compassCanvasHalfHeight - haltHeight);


  var textCanvas = document.getElementById("aligningText");
  var textContext = textCanvas.getContext("2d");

  textContext.clearRect(0, 0, textCanvas.width, textCanvas.height);
  textContext.fillStyle = "#FF7777";
  textContext.font = "14px Verdana";
  textContext.rotate(Math.Round(event.alpha));
  textContext.fillText("Alpha: " + Math.Round(event.alpha), 10, 20);
}
