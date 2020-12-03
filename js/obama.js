let htmlBody = document.querySelector("body");

htmlBody.addEventListener("mousemove", cursorEvent);

let obama = document.getElementById("obama");

function cursorEvent(e) {
    let cursorX = e.clientX;
    let cursorY = e.clientY;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    let newObama = null;

    if(cursorX > windowWidth / 2.5 && cursorX < (windowWidth / 2.5)*1.5
       && cursorY > windowHeight / 2.5 && cursorY < (windowHeight / 2.5)*1.5 ) {
        console.log("mid");
        newObama = "#obama_center";
    }
    else if(cursorX > windowWidth / 2.5 && cursorX < (windowWidth / 2.5)*1.5
    && cursorY < windowHeight / 2) {
        newObama = "#obama_up";
    }
    else if(cursorX > windowWidth / 2.5 && cursorX < (windowWidth / 2.5)*1.5
    && cursorY > windowHeight / 2) {
        newObama = "#obama_down";
    }
    else {
        
        if(cursorX < windowWidth / 2) {
            
            if(cursorY > windowHeight / 2.5 && cursorY < (windowHeight / 2.5)*1.5) {
                newObama = "#obama_left";
            }
            else if(cursorY > windowHeight / 2.5) {
                newObama = "#obama_down_left";
            }
            else {
                newObama = "#obama_up_left";
            }
        }
        else {
            
            if(cursorY > windowHeight / 2.5 && cursorY < (windowHeight / 2.5)*1.5) {
                newObama = "#obama_right";
            }
            else if(cursorY > windowHeight / 2.5) {
                newObama = "#obama_down_right";
            }
            else {
                newObama = "#obama_up_right";
            }
        }
    }

    if (newObama) {
        // Hide all obamas
        document
            .querySelectorAll(".obama")
            .forEach(el => el.classList.add("hide"));
        // Show new obama
        document
            .querySelector(newObama)
            .classList.remove("hide");
    }
}
