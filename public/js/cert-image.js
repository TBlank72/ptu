function drawCPT() {
  var ctx = document.getElementById('MyCertification').getContext('2d');
  var name = document.getElementById('trainer-name');
  var verify_id = document.getElementById('verify_id');
  var img = new Image();
  img.onload = function(){
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img,0,0,994,769);
    ctx.font = "48px Coolvetica";
    ctx.fillStyle = "#00203F";
    ctx.textAlign = "center";
    ctx.fillText(name.value, 497, 340);
    ctx.font = "28px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(verify_id.value, 147, 743);
    ctx.save();
  };
  img.src = '/images/cpt_cert.png';
}

function drawCMT() {
  var ctx = document.getElementById('MyCertification').getContext('2d');
  var name = document.getElementById('trainer-name');
  var verify_id = document.getElementById('verify_id');
  var img = new Image();
  img.onload = function(){
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img,0,0,994,769);
    ctx.font = "48px Coolvetica";
    ctx.fillStyle = "#00203F";
    ctx.textAlign = "center";
    ctx.fillText(name.value, 497, 340);
    ctx.font = "28px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(verify_id.value, 147, 743);
    ctx.save();
  };
  img.src = '/images/cmt_cert.png';
}

function drawCNS() {
  var ctx = document.getElementById('MyCertification').getContext('2d');
  var name = document.getElementById('trainer-name');
  var verify_id = document.getElementById('verify_id');
  var img = new Image();
  img.onload = function(){
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img,0,0,994,769);
    ctx.font = "48px Coolvetica";
    ctx.fillStyle = "#00203F";
    ctx.textAlign = "center";
    ctx.fillText(name.value, 497, 340);
    ctx.font = "28px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(verify_id.value, 147, 743);
    ctx.save();
  };
  img.src = '/images/cns_cert.png';
}
