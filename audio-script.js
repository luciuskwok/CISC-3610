// audio-script.js

// Whole-script strict mode
"use strict";

// Play sound
function playSound(snd) {
	//console.log("Play sound "+snd);
	if (snd != null) {
		let sndObj = new Audio("snd/"+snd+".wav");
		sndObj.play(document);
	}
}

// Set up button handlers
document.getElementById('play1').addEventListener('click', ({target}) => { playSound("boing"); });
document.getElementById('play2').addEventListener('click', ({target}) => { playSound("clink-klank"); });
document.getElementById('play3').addEventListener('click', ({target}) => { playSound("eep"); });

document.getElementById('play4').addEventListener('click', ({target}) => { playSound("quack"); });
document.getElementById('play5').addEventListener('click', ({target}) => { playSound("sosumi"); });
document.getElementById('play6').addEventListener('click', ({target}) => { playSound("uh-oh"); });

document.getElementById('play7').addEventListener('click', ({target}) => { playSound("chu-toy"); });
document.getElementById('play8').addEventListener('click', ({target}) => { playSound("indigo"); });
document.getElementById('play9').addEventListener('click', ({target}) => { playSound("monkey"); });

document.getElementById('play10').addEventListener('click', ({target}) => { playSound("moof"); });
document.getElementById('play11').addEventListener('click', ({target}) => { playSound("whit"); });


