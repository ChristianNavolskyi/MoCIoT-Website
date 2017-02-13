if (window.DeviceMotionEvent) {
  window.addEventListener("devicemotion", handleDeviceMotion, true);
} else {
  alert("Es tut mir Leid, aber Ihr Gerät unterstützt diesen Sensor nicht.");
}

var max = 0;

function handleDeviceMotion(event) {
  var text = document.getElementById("scalingText");
  var fontSize = text.style.fontSize;

  var deviceAcceleration = event.accelerationIncludingGravity;
  var x = deviceAcceleration.x;
  var y = deviceAcceleration.y;
  var z = deviceAcceleration.z;

  var vectorValue = Math.cbrt(x*x + y*y + z*z);
  var array = loadArray();
  var sumArray = addAndStore(array, vectorValue);
  var average = getAverage(sumArray);

  if (average > 30) {
    fontSize = "30px";
  } else if (average > 1) {
    fontSize = "20px";
  } else {
    fontSize = "10px";
  }
}

function getAverage (array) {
  return array.reduce(function(a, b) {return a + b}) / array.length;
}

function addAndStore (array, number) {
  var length = array.length;
  if (length >= 50) {
    array.shift();
  }
  array.push(number);

  saveArray(array);

  return array;
}

function loadArray() {
  var array = localStorage.getItem("sumArray");
  if (array === null || array.length === 0) {
    var newArray = [0];
    localStorage.setItem("sumArray", JSON.stringify(newArray));
    return loadArray();
  } else {
    if (array) {
        return JSON.parse(array);
    }
  }
}

function saveArray(array) {
  localStorage.setItem("sumArray", JSON.stringify(array));
}

function clearStorage() {
  localStorage.removeItem("sumArray");
}
