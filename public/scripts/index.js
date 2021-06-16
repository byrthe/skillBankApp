// FRONT END FILE TO INTERACT WITH THE DOM


// accordion function
function accordize (target, one) {
    // (A) GET TARGET CONTAINER
    target = document.getElementById(target);
    target.classList.add("awrap");
    
    // (B) ATTACH CLICK TO OPEN DRAWER
    if (typeof one != "boolean") { one = false; }
    let head = target.getElementsByClassName("ahead");
  
    // (B1) ONLY ONE DRAWER CAN OPEN AT A TIME
    if (one) {
      for (let h of head) {
        h.addEventListener("click", function(){
          for (let e of head) { 
            if (e != this) { e.classList.remove("open");  }
            else { this.classList.toggle("open"); }
          }
        });
      }
    }
    
    // (B2) ALL DRAWERS CAN OPEN/CLOSE
    else {
      for (let h of head) {
        h.addEventListener("click", function(){
          this.classList.toggle("open");
        });
      }
    }
  }