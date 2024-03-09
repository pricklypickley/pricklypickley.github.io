const socket = io('https://smoothie-webserve-git.glitch.me/');
var tnum = 0;
var [m0, m1, m2, m3, m4, m5, m6, m7, m8, m9] = ["", "", "", "", "", "", "", "", "", ""]
var roomKey = "";
function login() {
  var verify = false
  var email = document.getElementById("email").value
  var password = document.getElementById("password").value
  if (email == null || email == "" || password == null || password == "") {
    document.getElementById("alerts").innerHTML = "Please enter the username or password. Can’t be blank or empty !!!";
    setInterval(function() {
      document.getElementById("loginAlert").innerHTML = "";
    }, 3000)
  }
  else {
    verify = true
  }
  if (verify) {
    if (localStorage.getItem("ID") != null) {
      localStorage.setItem('ID', id);
    };
    if (localStorage.getItem("roomKey") != null) {
      roomKey = localStorage.getItem("roomKey");
      $("#keyInput").val(roomKey)
    };
    document.getElementById("hider").style.display = 'block';
    document.getElementById("loginForm").style.display = 'none';
  }
}
function roomKeySubmit(event) {
  event.preventDefault();
  roomKey = document.getElementById('keyInput').value;
  localStorage.setItem('roomKey', roomKey);
}
document.getElementById('keyForm').addEventListener('submit', roomKeySubmit);
function messageSubmit(event) {
  event.preventDefault();
  message = document.getElementById('messageimp').value;
  document.getElementById('messageimp').value = ""
  socket.emit('message', { roomKey: roomKey, message: message })
  switch(tnum) {
    case 0:
      m0 = message;
      $("#m0").text(m0);
      tnum++;
      break
    case 1:
      m1 = message;
      $("#m1").text(m1);
      tnum++;
      break
    case 2:
      m2 = message;
      $("#m2").text(m2);
      tnum++;
      break
    case 3:
      m3 = message;
      $("#m3").text(m3);
      tnum++;
      break
    case 4:
      m4 = message;
      $("#m4").text(m4);
      tnum++;
      break
    case 5:
      m5 = message;
      $("#m5").text(m5);
      tnum++;
      break
    case 6:
      m6 = message;
      $("#m6").text(m6);
      tnum++;
      break
    case 7:
      m7 = message;
      $("#m7").text(m7);
      tnum++;
      break
    case 8:
      m8 = message;
      $("#m8").text(m8);
      tnum++;
      break
    case 9:
      m9 = message;
      $("#m9").text(m9);
      tnum++;
      break
    case 10:
      m0 = m1;
      m1 = m2;
      m2 = m3;
      m3 = m4;
      m4 = m5;
      m5 = m6;
      m6 = m7;
      m7 = m8;
      m8 = m9;
      m9 = message;
      $("#m0").text(m0);
      $("#m1").text(m1);
      $("#m2").text(m2);
      $("#m3").text(m3);
      $("#m4").text(m4);
      $("#m5").text(m5);
      $("#m6").text(m6);
      $("#m7").text(m7);
      $("#m8").text(m8);
      $("#m9").text(m9);
      break
  } 
}
document.getElementById('messageForm').addEventListener('submit', messageSubmit);
socket.on("chatUpdate", (data) => {
  message = data.message;
  if (data.roomKey == roomKey) {
    console.log("roomKey match")
  switch(tnum) {
    case 0:
      m0 = message;
      $("#m0").text(m0);
      tnum++;
      break
    case 1:
      m1 = message;
      $("#m1").text(m1);
      tnum++;
      break
    case 2:
      m2 = message;
      $("#m2").text(m2);
      tnum++;
      break
    case 3:
      m3 = message;
      $("#m3").text(m3);
      tnum++;
      break
    case 4:
      m4 = message;
      $("#m4").text(m4);
      tnum++;
      break
    case 5:
      m5 = message;
      $("#m5").text(m5);
      tnum++;
      break
    case 6:
      m6 = message;
      $("#m6").text(m6);
      tnum++;
      break
    case 7:
      m7 = message;
      $("#m7").text(m7);
      tnum++;
      break
    case 8:
      m8 = message;
      $("#m8").text(m8);
      tnum++;
      break
    case 9:
      m9 = message;
      $("#m9").text(m9);
      tnum++;
      break
    case 10:
      m0 = m1;
      m1 = m2;
      m2 = m3;
      m3 = m4;
      m4 = m5;
      m5 = m6;
      m6 = m7;
      m7 = m8;
      m8 = m9;
      m9 = message;
      $("#m0").text(m0);
      $("#m1").text(m1);
      $("#m2").text(m2);
      $("#m3").text(m3);
      $("#m4").text(m4);
      $("#m5").text(m5);
      $("#m6").text(m6);
      $("#m7").text(m7);
      $("#m8").text(m8);
      $("#m9").text(m9);
      break
  } 
  }
})
const video = document.getElementById('videoElement');
const otherVideo = document.getElementById('otherVideo');
function activateCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      socket.emit("camera", navigator.mediaDevices.getUserMedia({ audio: true, video: true }));
    })
    .catch(error => {
      console.error('Error accessing the camera:', error);
    });
  socket.on('stream', function(stream) {
    otherVideo.srcObject = stream;
    console.log(stream)
  });
}
function deactivateCamera() {
  video.srcObject = null;
}