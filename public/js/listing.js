const listingForm = async (event) => {
    event.preventDefault();

    const make = document.querySelector("#make").value.trim();
    const model = document.querySelector("#model").value.trim();
    const year = document.querySelector("#year").value.trim();
    const mileage = document.querySelector("#mileage").value.trim();
    const price = document.querySelector("#price").value.trim();
    const description = document.querySelector("#description").value.trim();

    if (make && model && year && mileage && price && description) {
        const response = await fetch("/api/listings", {
            method: "POST",
            body: JSON.stringify({ make, model, year, mileage, price, description }),
            headers: { "Content-Type" : "application/json"},
        });

        if (response.ok) {
            document.location.replace("login");
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector(".listing-form")
    .addEventListener("submit", listingForm);