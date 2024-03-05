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

	console.log("Saved fields. Rows = "+showRows);
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
	console.log("Calculate mortgage payments.");
	saveFields();
	removeResultRows();

}

function removeResultRows() {

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
