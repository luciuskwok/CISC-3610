// cartoon-script.js

// Constants
const tree_fill_color = "#06eb11"; // HSL(123, 96%, 32%)
const tree_stroke_color = "#036308"; 
const trunk_fill_color = "#ad5809";
const trunk_stroke_color = "#633103";
const grid_stroke_color = "#024405";

// Globals
var frameCounter = 0;

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

function drawTree(ctx) {
	// Draw trunk
	ctx.fillStyle = trunk_fill_color;
	ctx.strokeStyle = trunk_stroke_color;
	drawCenteredRect(ctx, 0, 0, 10, 50);
	
	// Draw tree leaves
	ctx.fillStyle = tree_fill_color;
	ctx.strokeStyle = tree_stroke_color;
	ctx.beginPath();
	addCenteredTriangle(ctx, 0, -110, 40, 40);
	addCenteredTriangle(ctx, 0, -80 , 60, 60);
	addCenteredTriangle(ctx, 0, -50, 80, 80);
	ctx.fill();
	ctx.stroke();
}

function drawStaticBackground(ctx) {
	// Draw background
	// - Sky
	const skyGradient = ctx.createLinearGradient(0, 0, 0, 240);
	skyGradient.addColorStop(0, "#3844FF");
	skyGradient.addColorStop(1, "#BAAAFF");
	ctx.fillStyle = skyGradient;
	ctx.fillRect(0, 0, 640, 240);

	// - Ground
	const groundGradient = ctx.createLinearGradient(0, 240, 0, 480);
	groundGradient.addColorStop(0, "#04780A");
	groundGradient.addColorStop(1, "#11AA11");
	ctx.fillStyle = groundGradient;
	ctx.fillRect(0, 240, 640, 240);

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
}

function drawGrid(ctx, offset) {
	// Line attributes
	ctx.lineWidth = 2;
	ctx.strokeStyle = grid_stroke_color;

	// Lines in z-axis
	ctx.beginPath();
	for (let x = 0; x < 320 * 8; x += 128) {
		ctx.moveTo(320 + x, 480);
		ctx.lineTo(320, 240);
		ctx.lineTo(320 - x, 480);
	}
	ctx.stroke();

	// Lines in x-axis
	ctx.beginPath();
	let z0 = offset % 1.0;
	for (let z = z0; z <= 32; z += 0.5) {
		let y = 240 / z;	
		ctx.moveTo(0, 240 + y);
		ctx.lineTo(640, 240 + y);
	}
	ctx.stroke();
}

function drawCabin(ctx) {
	// Draw cabin
	ctx.fillStyle = "#884400";
	ctx.strokeStyle = "#221100";
	ctx.lineJoin = "round";
	ctx.lineWidth = "3.0";
	// - Box
	drawCenteredRect(ctx, 0, 0, 144, 96);
	// - Roof
	ctx.beginPath();
	addCenteredTriangle(ctx, 0, -68, 172, 40);
	ctx.fill();
	ctx.stroke();
	// - Door
	ctx.fillStyle = "#442200";
	drawCenteredRect(ctx, 0, 16, 32, 64);
	// - Windows
	drawCenteredRect(ctx, -44, 0, 24, 24);
	drawCenteredRect(ctx, 44, 0, 24, 24);	
}

function drawTitle(ctx, text) {
	ctx.textAlign = "center";
	ctx.font = "24px Georgia";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(text, 320, 48);
}

function renderFrame() {
	// Get canvas and drawing context
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");
	const offset = (frameCounter % 120.0) / 120.0;

	drawStaticBackground(ctx);

	drawGrid(ctx, 1.0 - offset);

	// - Trees
	const cx = 320;
	const cy = 240;
	const pw = 320;
	const ph = 120;
	for (let z = 20 - offset; z > 0; z--) {
		const x = pw / z;
		const y = ph / z;
		let scale = 3 / z;

		ctx.save();
		ctx.translate(cx+x, cy+y);
		ctx.scale(scale, scale);
		drawTree(ctx);
		ctx.restore();

		ctx.save();
		ctx.translate(cx-x, cy+y);
		ctx.scale(scale, scale);
		drawTree(ctx);
		ctx.restore();
	}

	// Draw cabin
	ctx.save();
	ctx.translate(cx, cy);
	ctx.scale(0.5, 0.5);
	drawCabin(ctx);
	ctx.restore();

	// Text
	drawTitle(ctx, "Cabin in the Woods");
}

function renderLoop() {
	renderFrame();
	frameCounter++;

	// Schedule the next frame
	window.setTimeout(renderLoop, 1000.0/60.0);	
}

// == Main Script ==

// Kick off rendering
renderLoop();

