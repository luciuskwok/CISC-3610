// form-script.js

// Whole-script strict mode
"use strict";

function loadLocalStorage() {
	// Load values from LocalStorage, or use default values

	const principal = localStorage.getItem("mortgage.principal");
	const principalField = document.getElementById("principal");
	if (principal != null) {
		principalField.value = principal;
	} else {
		principalField.value = "";
	}

	const interestRate = localStorage.getItem("mortgage.interestRate");
	const rateField = document.getElementById("rate");
	if (interestRate != null) {
		rateField.value = interestRate;
	} else {
		rateField.value = "";
	}

	const startYear = localStorage.getItem("mortgage.startYear");
	const startYearField = document.getElementById("startYear");
	if (startYear != null) {
		startYearField.value = startYear;
	} else {
		startYearField.value = "2024";
	}

	const maturityYear = localStorage.getItem("mortgage.maturityYear");
	const maturityYearField = document.getElementById("maturityYear");
	if (maturityYear != null) {
		maturityYearField.value = maturityYear;
	} else {
		maturityYearField.value = "2054";
	}

	const maturityMonth = localStorage.getItem("mortgage.maturityMonth");
	const maturityMonthSelect = document.getElementById("maturityMonth");
	if (maturityMonth != null) {
		maturityMonthSelect.value = maturityMonth;
	} else {
		maturityMonth.value = 1;
	}

	const showRows = localStorage.getItem("mortgage.showRows");
	switch (showRows) {
	case 12:
		document.getElementById("showRows12").checked = true;
		break;
	case 60:
		document.getElementById("showRows60").checked = true;
		break;
	case -1:
	default:
		document.getElementById("showRowsAll").checked = true;
		break;
	}

}

function resetValues() {
	// Remove values from LocalStorage and reset field values 
	localStorage.removeItem("mortgage.principal");
	localStorage.removeItem("mortgage.interestRate");
	localStorage.removeItem("mortgage.startYear");
	localStorage.removeItem("mortgage.maturityYear");
	localStorage.removeItem("mortgage.maturityMonth");
	localStorage.removeItem("mortgage.showRows");
}

function saveFields() {
	localStorage.setItem("mortgage.principal", document.getElementById("principal").value);
	localStorage.setItem("mortgage.interestRate", document.getElementById("rate").value);
	localStorage.setItem("mortgage.startYear", document.getElementById("startYear").value);
	localStorage.setItem("mortgage.maturityYear", document.getElementById("maturityYear").value);
	localStorage.setItem("mortgage.maturityMonth", document.getElementById("maturityMonth").value);

	const showRows = getRowsToShow();
	localStorage.setItem("mortgage.showRows", showRows);

	//console.log("Saved fields. Rows = "+showRows);
}

function resetForm() {
	resetValues();
	loadLocalStorage();
	removeResultRows();
}

function getRowsToShow() {
	if (document.getElementById("showRows12").checked) return 12;
	if (document.getElementById("showRows60").checked) return 60;
	return -1;
}

function calculateMortgagePayments() {
	saveFields();

	// Reset results display
	setSpanText("monthlyPayment", "$-.--");
	removeResultRows();

	// Get parameters
	let bal = document.getElementById("principal").value * 100; // value in pennies
	let r = document.getElementById("rate").value / (12 * 100); // rate per month
	let startYear = document.getElementById("startYear").value;
	let matureYear = document.getElementById("maturityYear").value;
	let matureMonth = document.getElementById("maturityMonth").value;
	let sr = getRowsToShow();

	// Validate parameters
	let parametersValid = true;
	if (startYear == "" || startYear == 0 || matureYear == "" || matureYear == 0) {
		parametersValid = false;
	}
	if (!parametersValid) {
		// Show error info
		return;
	} 

	// Calculate parameters
	let n = (matureYear - startYear) * 12; // number of payments
	let rPowN = Math.pow(1 + r, n);
	let monthly = bal * (r * rPowN) / (rPowN - 1);
	console.log("    Calc: monthly="+monthly+", n="+n+", r^n="+rPowN);

	// Display monthly payment amount
	setSpanText("monthlyPayment", "$"+formatAsCurrency(monthly));

	// Limit number of payments shown
	if (sr > 0) {
		n = n < sr ? n : sr;
	}

	// Display monthly payment rows
	const container = document.getElementById("resultsContainer");
	let year = parseInt(startYear);
	let month = parseInt(matureMonth) + 1;
	
	// Start on the month after the maturity month
	if (month > 12) {
		month = 1;
		year++;
	}

	// Loop through each monthly payment
	for (let i = 1; i <= n; i++) {
		let date = month+"/1/"+(year%100);
		let int = Math.round(bal * r);
		let pri = monthly - int;
		bal = bal - pri;

		container.appendChild(createRow(i, date, formatAsCurrency(int), 
			formatAsCurrency(pri), formatAsCurrency(bal)));
		
		// Increment date to next month
		month++;
		if (month > 12) {
			month = 1;
			year++;
		}
	}
}

function createColumn(text, width) {
	const col = document.createElement("div");
	col.className = "col-"+width+" text-center";
	col.appendChild(document.createTextNode(text));
	return col;
}

function createRow(index, date, interest, principal, balance) {
	// Create a <div> for a row
	
	// Add a new row for the task
	const rowElement = document.createElement("div");
	rowElement.className = "row";
	rowElement.id = "row"+index;
	
	rowElement.appendChild(createColumn(index, 1));
	rowElement.appendChild(createColumn(date, 2));
	rowElement.appendChild(createColumn(interest, 3));
	rowElement.appendChild(createColumn(principal, 3));
	rowElement.appendChild(createColumn(balance, 3));

	return rowElement;
}

function removeResultRows() {
	// Remove any non-placeholder rows from container
	const container = document.getElementById("resultsContainer");
	let toRemove = new Array();
	for (const child of container.children) {
		if (!child.id.endsWith("HeaderRow")) toRemove.push(child);
	}
	for (const child of toRemove) container.removeChild(child);
}

function setSpanText(elementId, text) {
	const span = document.getElementById(elementId);
	while (span.firstChild) {
		span.removeChild(span.firstChild);
	}
	span.appendChild(document.createTextNode(text));
}

function formatAsCurrency(valueInCents) {
	const x = parseInt(valueInCents);
	const cents = Math.floor(x % 100);
	const ones = Math.floor((x / 100) % 1000);
	const thousands = Math.floor((x / 100_000) % 1000);
	const millions = Math.floor(x / 100_000_000);

	let s = ones.toString()+"."+cents.toString().padStart(2, "0");
	if (thousands > 0) {
		s = s.padStart(6, "0");
		s = thousands.toString()+","+s;
	}
	if (millions > 0) {
		s = s.padStart(10, "0");
		s = millions.toString()+","+s;
	}
	return s;
}

function fieldsDidChange() {
	saveFields();
}


/* !- Main script */

// Set up button handlers
document.getElementById('resetButton').addEventListener('click', ({target}) => { resetForm(); });
document.getElementById('calculateButton').addEventListener('click', ({target}) => { calculateMortgagePayments(); });

// Set up field change handlers
document.getElementById('principal').addEventListener('change', event => { fieldsDidChange(); });
document.getElementById('rate').addEventListener('change', event => { fieldsDidChange(); });
document.getElementById('startYear').addEventListener('change', event => { fieldsDidChange(); });
document.getElementById('maturityYear').addEventListener('change', event => { fieldsDidChange(); });
document.getElementById('maturityMonth').addEventListener('change', event => { fieldsDidChange(); });
document.getElementById('showRows12').addEventListener('change', event => { fieldsDidChange(); });
document.getElementById('showRows60').addEventListener('change', event => { fieldsDidChange(); });
document.getElementById('showRowsAll').addEventListener('change', event => { fieldsDidChange(); });

// Load values from LocalStorage
loadLocalStorage();

/* End of main script */
