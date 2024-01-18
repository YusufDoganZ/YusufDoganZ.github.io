console.clear();

const { gsap } = window;

const cursorOuter = document.querySelector(".cursor--large");
const cursorInner = document.querySelector(".cursor--small");
let isStuck = false;
let mouse = {
	x: -100,
	y: -100,
};

// Just in case you need to scroll
let scrollHeight = 0;
window.addEventListener('scroll', function(e) {
	scrollHeight = window.scrollY
})

let cursorOuterOriginalState = {
	width: cursorOuter.getBoundingClientRect().width,
	height: cursorOuter.getBoundingClientRect().height,
};
const buttons = document.querySelectorAll("main button");

buttons.forEach((button) => {
	button.addEventListener("pointerenter", handleMouseEnter);
	button.addEventListener("pointerleave", handleMouseLeave);
});

document.body.addEventListener("pointermove", updateCursorPosition);
document.body.addEventListener("pointerdown", () => {
	gsap.to(cursorInner, 0.15, {
		scale: 2,
	});
});
document.body.addEventListener("pointerup", () => {
	gsap.to(cursorInner, 0.15, {
		scale: 1,
	});
});

document.addEventListener('DOMContentLoaded', function() {
  var buttons = document.querySelectorAll('button');

  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      var link = this.dataset.link;
      if (link) {
        window.open(link);
      }
    });
  });
});

var playButton = document.getElementById("playButton");
var playIcon = document.getElementById("playIcon");
var audio = document.getElementById("music");

playButton.addEventListener("click", function() {
  if (audio.paused) {
    audio.play();
    playButton.classList.add("active");
  } else {
    audio.pause();
    playButton.classList.remove("active");
  }
});

function updateCursorPosition(e) {
	mouse.x = e.pageX;
	mouse.y = e.pageY;
}

function updateCursor() {
	gsap.set(cursorInner, {
		x: mouse.x,
		y: mouse.y,
	});

	if (!isStuck) {
		gsap.to(cursorOuter, {
			duration: 0.15,
			x: mouse.x - cursorOuterOriginalState.width/2,
			y: mouse.y - cursorOuterOriginalState.height/2,
		});
	}

	requestAnimationFrame(updateCursor);
}

updateCursor();

function handleMouseEnter(e) {
	isStuck = true;
	const targetBox = e.currentTarget.getBoundingClientRect();
	gsap.to(cursorOuter, 0.2, {
		x: targetBox.left, 
		y: targetBox.top + scrollHeight,
		width: targetBox.width,
		height: targetBox.width,
		borderRadius: 0,
		backgroundColor: "rgba(255, 255, 255, 0.1)",
	});
}

function handleMouseLeave(e) {
	isStuck = false;
	gsap.to(cursorOuter, 0.2, {
		width: cursorOuterOriginalState.width,
		height: cursorOuterOriginalState.width,
		borderRadius: "50%",
		backgroundColor: "transparent",
	});
}

function updateClock() {
    const now = new Date();
    const options = { timeZone: 'Africa/Cairo', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedTime = now.toLocaleTimeString('en-US', options);
    const clockElement = document.getElementById('clock');
    clockElement.textContent = formattedTime;
}


setInterval(updateClock, 1000);


window.onload = updateClock;


const buttonStart = document.querySelector('.button-start');



const Flex = document.querySelector('.Flex');


document.addEventListener("DOMContentLoaded", function () {
    const music = document.querySelector(".music");
    const buttonStart = document.querySelector('.button-start');
    const Flex = document.querySelector('.Flex');
    const backgroundVideo1 = document.getElementById('background-video-1');
    const backgroundVideo2 = document.getElementById('background-video-2');
    const backgroundVideo3 = document.getElementById('background-video-3');
    const backgroundVideo4 = document.getElementById('background-video-4');


    backgroundVideo2.style.display = 'none';
    backgroundVideo3.style.display = 'none';
    backgroundVideo4.style.display = 'none';

    buttonStart.addEventListener("click", function () {
        if (music.paused) {
            music.play();
            playButton.innerHTML = "";
            Flex.style.opacity = '0';
            setTimeout(() => {
              Flex.style.display = 'none';
            }, 1000);
            backgroundVideo1.play();
        } else {
            music.pause();
            playButton.innerHTML = "Play Music";
        }
    });


    backgroundVideo1.addEventListener("ended", function () {

        backgroundVideo1.style.display = 'none';
        backgroundVideo2.style.display = 'block';


        backgroundVideo2.play();
    });


backgroundVideo2.addEventListener("ended", function () {

    backgroundVideo2.style.display = 'none';
    backgroundVideo3.style.display = 'block';

    backgroundVideo3.play();
});



    backgroundVideo3.addEventListener("ended", function () {

        backgroundVideo3.style.display = 'none';
        backgroundVideo4.style.display = 'block';


        backgroundVideo4.play();
    });


    backgroundVideo4.addEventListener("ended", function () {

        backgroundVideo1.style.display = 'block';
        backgroundVideo2.style.display = 'none';
        backgroundVideo3.style.display = 'none';
        backgroundVideo4.style.display = 'none';

        backgroundVideo1.play();
    });
});
