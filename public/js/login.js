const loginForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#user-login").value.trim();
    
    const password = document.querySelector("#password-login").value.trim();

    if (user && password) {
        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({ username, password}),
            headers: { "Content-Type" : "application/json"},
        });

        if (response.ok) {
            document.location.replace("/layouts/main");
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector(".login-form")
    .addEventListener("submit", loginForm);