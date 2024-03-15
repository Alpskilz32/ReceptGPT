var prevScrollpos = document.body.scrolTop;
window.onscroll = function() {
  var currentScrollPos = document.body.scrolTop;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

