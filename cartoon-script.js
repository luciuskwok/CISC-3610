// cartoon-script.js

// Functions
function drawCenteredRect(ctx, x, y, w, h) {
	ctx.fillRect(x - w / 2, y - h / 2, w, h);
	ctx.strokeRect(x - w / 2, y - h / 2, w, h);
}

function addCenteredTriangle(ctx, x, y, w, h) {
	ctx.moveTo(x, y - h / 2);
	ctx.lineTo(x + w / 2, y + h / 2);
	ctx.lineTo(x - w / 2, y + h / 2);
	ctx.closePath();
}

function drawTree(ctx, x, y, scale) {
	ctx.fillStyle = "#442200";
	ctx.strokeStyle = "#221100";
	drawCenteredRect(ctx, x, y - scale / 8, scale * 3 / 32, scale / 4);
	ctx.fillStyle = "#006A11";
	ctx.strokeStyle = "#0E5A09";
	ctx.beginPath();
	addCenteredTriangle(ctx, x, y - scale / 2, scale, scale / 2);
	addCenteredTriangle(ctx, x, y - scale * 3 / 4 , scale * 7/8, scale / 2);
	addCenteredTriangle(ctx, x, y - scale, scale * 6/8, scale / 2);
	ctx.fill();
	ctx.stroke();
}


// == Main Script ==

// Get canvas and drawing context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Draw background
// - Sky
const skyGradient = ctx.createLinearGradient(0, 0, 0, 240);
skyGradient.addColorStop(0, "#3844FF");
skyGradient.addColorStop(1, "#BAAAFF");
ctx.fillStyle = skyGradient;
ctx.fillRect(0, 0, 640, 240);

const groundGradient = ctx.createLinearGradient(0, 240, 0, 480);
groundGradient.addColorStop(0, "#21781A");
groundGradient.addColorStop(1, "#11AA11");
ctx.fillStyle = groundGradient;
ctx.fillRect(0, 240, 640, 240);

// Draw background objects
// - Sun
ctx.fillStyle = "#FFFF00";
ctx.beginPath();
ctx.arc(64, 64, 48, 0, 2 * Math.PI);
ctx.fill();

// - Moon
ctx.fillStyle = "#EEEEFF";
ctx.beginPath();
ctx.arc(640 - 64, 64, 48, 0.5 * Math.PI, 1.5 * Math.PI);
ctx.quadraticCurveTo(640 - 100, 64, 640 - 64, 64 + 48);
ctx.fill();

// - Clouds

// - Mountains

// - Trees
for (let z = 20; z > 0; z--) {
	let x = 320 / (z / 4);
	let y = 32 / (z / 4);
	let scale = 480 / z;
	drawTree(ctx, 320 + x, 240 + y, scale);
	drawTree(ctx, 320 - x, 240 + y, scale);
}

// Draw cabin

// Text
ctx.textAlign = "center";
ctx.font = "24px Georgia";
ctx.fillStyle = "#FFFFFF";
ctx.fillText("Cabin in the Woods", 320, 48);

