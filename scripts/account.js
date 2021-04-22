function edit() {
	var user = getUser();
	var span = document.getElementsByClassName("close")[0];
	var modal = document.getElementById("myModal");
	modal.style.display = "block";

	document.getElementById("firstName").value = user.firstName;
	document.getElementById("lastName").value = user.lastName;
	document.getElementById("password").value = user.password;

	span.onclick = function () {
		modal.style.display = "none";
	};

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};

	submit.onclick = function () {
		if (
			document.getElementById("firstName").value.localeCompare("") == 0 ||
			document.getElementById("lastName").value.localeCompare("") == 0 ||
			document.getElementById("password").value.localeCompare("") == 0
		) {
			descriptionHeader.innerText = "One or more fields is blank";
		} else {
			descriptionHeader.innerText = "";
			setUserInfo(
				document.getElementById("firstName").value,
				document.getElementById("lastName").value,
				document.getElementById("password").value
			);
			modal.style.display = "none";
		}
	};
}

function setCard() {
	if (localStorage.getItem("userLogin") == null) {
		return false;
	}
	var user = getUser();
	$("#name").text("Name: " + user.firstName + " " + user.lastName);
	$("#emailAddress").text("Email: " + user.email);
}

function setReservation() {
	var reservationsContainer = document.getElementById("reservationContainer");
	if (localStorage.getItem("userLogin") == null) {
		return false;
	}
	Url =
		"https://kam.azurewebsites.net/api/reservations/user/" +
		localStorage.getItem("userLogin");
	var result = null;

	$.ajax({
		url: Url,
		type: "get",
		dataType: "html",
		async: false,
		success: function (data) {
			result = data;
		},
	});
	var json = JSON.parse(result);
	var reservations = json[0];
	if (reservations === undefined || reservations.length == 0) {
		$("#reservation").text("No Reservations");
		return;
	}
	console.log(reservations);
	for (let i = 0; i < reservations.length; i++) {
		let h3 = document.createElement("h3");
		let h4 = document.createElement("h4");
		h3.style = "text-align: center";
		h3.style = "padding: 10px";
		h3.innerText = "ReservationId: " + reservations[i].reservationId;
		let checkIn = new Date(reservations[i].checkIn);
		let checkOut = new Date(reservations[i].checkOut);
		h4.style = "line-height: 2";
		h4.innerText =
			"Check in Date: " +
			formatFullDate(checkIn) +
			" \n" +
			"Check out Date: " +
			formatFullDate(checkOut) +
			"\n Total cost: $" +
			reservations[i].totalCost;
		reservationContainer.appendChild(h3);
		reservationsContainer.appendChild(h4);
		reservationsContainer.appendChild(document.createElement("br"));
	}
}

function getUser() {
	if (localStorage.getItem("userLogin") == null) {
		return null;
	}
	Url =
		"https://kam.azurewebsites.net/api/users/" +
		localStorage.getItem("userLogin");
	var result = null;

	$.ajax({
		url: Url,
		type: "get",
		dataType: "html",
		async: false,
		success: function (data) {
			result = data;
		},
	});
	var json = JSON.parse(result);
	var user = json[0];
	return user;
}

function setUserInfo(firstName, lastName, password) {
	const url =
		"https://kam.azurewebsites.net/api/users/" +
		localStorage.getItem("userLogin");
	var user = {
		firstName: firstName,
		lastName: lastName,
		email: localStorage.getItem("userLogin"),
		password: password,
	};
	$.ajax({
		url: url,
		type: "PUT",
		data: user,
		dataType: "json",
		success: function (result) {},
	});
	var text = user.firstName + " " + user.lastName + " | Sign Out";
	$("#userName").text(text);
	$("#name").text("Name: " + user.firstName + " " + user.lastName);
	$("#emailAddress").text("Email: " + user.email);
}

// convert the full date to a locale date string and format it with leading 0s where necessary
function formatFullDate(date) {
	let str = date.toLocaleDateString().split("/");
	return formatDate(str[0]) + "/" + formatDate(str[1]) + "/" + str[2];
}

// format with leading zeros where necessary
function formatDate(date) {
	if (date.length < 2) {
		return "0" + date;
	} else {
		return date;
	}
}
setCard();
setReservation();
