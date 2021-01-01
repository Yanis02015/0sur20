var i = 0;
function openNav() {
    var a = document.getElementById("nav");
    if(i === 1){
        a.style.paddingLeft = "0px";
        a.style.paddingRight = "0px";
        a.style.width = "0px";
        i=0;
    } else{
        a.style.paddingLeft = "15px";
        a.style.width = "180px";
        i=1;
    }
  }

  function sauvgarder() {
    var a = document.getElementById("number");
    a.textContent = "0.01"
}