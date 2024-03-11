// audio-script.js

// Whole-script strict mode
"use strict";

// Play sound
function playSound(snd) {
	console.log("Play sound "+snd);
	if (snd != null) {
		let sndObj = document.getElementById(snd);
		sndObj.play(document);
	}
}

// Set up button handlers
document.getElementById('play1').addEventListener('click', ({target}) => { playSound("snd-boing"); });
document.getElementById('play2').addEventListener('click', ({target}) => { playSound("snd-clink-klank"); });
document.getElementById('play3').addEventListener('click', ({target}) => { playSound("snd-eep"); });

document.getElementById('play4').addEventListener('click', ({target}) => { playSound("snd-quack"); });
document.getElementById('play5').addEventListener('click', ({target}) => { playSound("snd-sosumi"); });
document.getElementById('play6').addEventListener('click', ({target}) => { playSound("snd-uh-oh"); });

document.getElementById('play7').addEventListener('click', ({target}) => { playSound("snd-chu-toy"); });
document.getElementById('play8').addEventListener('click', ({target}) => { playSound("snd-indigo"); });
document.getElementById('play9').addEventListener('click', ({target}) => { playSound("snd-monkey"); });

document.getElementById('play10').addEventListener('click', ({target}) => { playSound("snd-moof"); });
document.getElementById('play11').addEventListener('click', ({target}) => { playSound("snd-whit"); });


