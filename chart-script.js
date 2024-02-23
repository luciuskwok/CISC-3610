// chart-script.js

// Functions
function drawBar(ctx, x, y, w, h, title, qty, color) {
	// Draw colored bar
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
	
	// Text
	const lineHeight = 24;
	x += 16;
	y += 28;
	ctx.textAlign = "left";
	ctx.font = "24px Arial";
	ctx.fillStyle = "black";
	ctx.fillText(qty, x, y);
	y += lineHeight;
	ctx.fillText(title, x, y);
}

// == Main Script ==

// JSON array for fruit
var fruit = [
	{name:"Apple",   quantity:20,  color:"#FF5040"},
	{name:"Orange",  quantity:10,  color:"#FFA020"},
	{name:"Banana",  quantity:15,  color:"#EEEE00"},
	{name:"Kiwi",    quantity: 5,  color:"#A0FFA0"},
	{name:"Blueberry",quantity:5,  color:"#A0A0FF"},
	{name:"Grapes",  quantity:10,  color:"#FF80FF"},
];

// Get canvas and drawing context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvas_w = canvas.width;
const canvas_h = canvas.height;
const max_qty = 20;
const bar_h = canvas_h / fruit.length;

console.log("loop");
for (let i = 0; i < fruit.length; i++) {
	let y = bar_h * i;
	let w = fruit[i].quantity / max_qty * canvas_w;
	drawBar(ctx, 0, y, w, bar_h, fruit[i].name, fruit[i].quantity, fruit[i].color);
}

