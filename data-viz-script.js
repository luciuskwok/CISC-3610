// data-viz-script.js

const chart1Ctx = document.getElementById('chart1');

new Chart(chart1Ctx, {
	type: 'bar',
	data: {
		labels: ["Rent", "Groceries", "Entertainment", "Dining Out", "Repairs", "Travel", "Insurance"],
		datasets: [{
			label: "Lucius Kwok's Dollars",
			backgroundColor: ["#d94522", "#1fee24","#9344bb","#ebb300","#c45850", "#99ff63", "#ffb8b8"],
			data: [734.12, 568.75, 392.51, 271.53, 187.81, 180.43, 158.91],
			borderWidth: 1
		}]
	},
	options: {
		indexAxis: 'y',
	}
});

const chart2Ctx = document.getElementById('chart2');

new Chart(chart2Ctx, {
	type: 'doughnut',
	data: {
		labels: ["Lucius Kwok's Rent", "Groceries", "Entertainment", "Dining Out", "Repairs", "Travel", "Insurance"],
		datasets: [{
			label: "Lucius Kwok's Dollars",
			backgroundColor: ["#dc0059", "#f723de","#801dbc","#6f36ed","#5160bd", "#58a8fe", "#3dd9fa"],
			data: [734.12, 568.75, 392.51, 271.53, 187.81, 180.43, 158.91],
			borderWidth: 1
		}]
	},
	options: {
	}
});
