$(function () {
	var form = document.getElementById("form");
	form.onsubmit = login;
})

function login(e) {
	e.preventDefault();

	username = document.getElementById("username");
	password = document.getElementById("password");

	var u = username.value.trim();
	var p = password.value.trim();

	var data = { email: u, password: p };

	POST("register", data, (response) => {
		window.location = "admin.html"; // Redirecting to other page.
		},
		(response, message, code) => {
			document.getElementById("error").innerHTML = "Invalid username or password." + code;
		});
}