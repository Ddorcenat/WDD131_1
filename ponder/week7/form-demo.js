function togglePaymentDetails() {
    const theForm = document.querySelector("#checkoutForm");
    const creditCardContainer = document.getElementById("creditCardNumberContainer");
    const paypalContainer = document.getElementById("paypalUsernameContainer");

    creditCardContainer.classList.add("hide");
    paypalContainer.classList.add("hide");

    theForm.creditCardNumber.required = false;
    theForm.paypalUsername.required = false;

    if (theForm.paymentMethod.value === "creditCard") {
        creditCardContainer.classList.remove("hide");
        theForm.creditCardNumber.required = true;
    } else if (theForm.paymentMethod.value === "paypal") {
        paypalContainer.classList.remove("hide");
        theForm.paypalUsername.required = true;
    }
}

document
    .querySelector("#paymentMethod")
    .addEventListener("change", togglePaymentDetails);

function validateForm(event) {
    const theForm = event.target;
    const errors = [];
    let isValid = true;

    if (theForm.fullName.value !== "Bob") {
        isValid = false;
        errors.push("Your name is not Bob");
    }

    if (theForm.paymentMethod.value === "creditCard") {
        if (theForm.creditCardNumber.value !== "1234123412341234") {
            isValid = false;
            errors.push("Invalid Credit Card Number");
        }
    }

    if (!isValid) {
        event.preventDefault();
        showErrors(errors);
        return false;
    }
}

function showErrors(errors) {
    const errorEl = document.querySelector(".errors");
    errorEl.innerHTML = errors.map(e => `<p>${e}</p>`).join("");
}

document
    .querySelector("#checkoutForm")
    .addEventListener("submit", validateForm);
