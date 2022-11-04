// DOM Elements
const mainPhotographer = document.getElementById("main-photographer");
const form = document.forms.contact;
const modal = document.getElementById("contact_modal");
const modalCloseBtn = document.querySelector(".close-modal");
const modalOpenBtn = document.querySelector("#btn_open_modal");
const allInput = Array.prototype.slice.call(document.querySelectorAll("input"));
allInput.splice(3, 1, document.querySelector("#request"));

function displayModal() {
    mainPhotographer.setAttribute("aria-hidden", "true");
    mainPhotographer.className = "no-scroll";

    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "block";

    form.elements.first.focus();
}

function closeModal() {
    const modalOpenBtn = document.querySelector("#btn_open_modal");
    mainPhotographer.setAttribute("aria-hidden", "false");
    mainPhotographer.classList.remove("no-scroll");

    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
    modalOpenBtn.focus();
    hideThanks();
    form.reset();
}

//show thanks message and add class disabled of elements formData
const showThanks = () => {
    document.querySelectorAll(".formData").forEach((element) => {
        element.classList.add("disabled");
    });
    document.querySelector(".thanks").style.display = "block";
    document.querySelector("#btnSubmit").style.display = "none";
};

const hideThanks = () => {
    document.querySelectorAll(".formData").forEach((element) => {
        element.classList.remove("disabled");
    });
    document.querySelector(".thanks").style.display = "none";
    document.querySelector("#btnSubmit").style.display = "block";
};

const validateSubmit = (event) => {
    const validations = ["first", "last", "email", "request"];

    for (let validation of validations) {
        validate(validation);
    }
    if (
        validateFirstAndLast(validations[0]) &&
        validateFirstAndLast(validations[1]) &&
        validateEmail() &&
        validateRequest()
    ) {
        const body = [];
        for (let validation of validations) {
            body.push({ [validation]: form.elements[validation].value });
        }
        showThanks();
        form.reset();
        console.log(body);
    }
    event.preventDefault();
};

const toggleErrorMessages = (element, etat) => {
    element.setAttribute("aria-invalid", etat);
    element.parentNode.dataset.visible = etat;
};

//The first name and the last name field has a minimum of 2 characters / is not empty.
const validateFirstAndLast = (inputId) => {
    const patern = /^[^\s][a-zA-Z '.-]{2,}/;
    const word = /^[a-zA-Z '.-]*$/;
    const element = form.elements[inputId];
    if (element.value.length >= 2) {
        if (!patern.test(element.value)) {
            element.parentNode.dataset.error = `Notre système est incapable de traiter les ${element === "first" ? "prénoms" : "noms"
                } qui commence par 2 fois ${element.value.trim()[0] === undefined
                    ? "espace"
                    : element.value.trim()[0]
                }`;
            toggleErrorMessages(element, true);
            return false;
        } else if (!word.test(element.value)) {
            element.parentNode.dataset.error = `Votre ${element === "first" ? "prénom" : "nom"
                } doit être écrit sans accent et seulement avec les caractères (' . -). Desolé pour la gêne occasionné`;
            toggleErrorMessages(element, true);
            return false;
        }
        toggleErrorMessages(element, false);
        return true;
    } else {
        element.parentNode.dataset.error = "doit contenir plus de 2 caractéres";
        toggleErrorMessages(element, true);
        return false;
    }
};

//validate adding email by regex.
const validateEmail = () => {
    const email = form.elements.email;
    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return isEmail.test(email.value)
        ? (toggleErrorMessages(email, false), true)
        : (toggleErrorMessages(email, true), false);
};

const validateRequest = () => {
    const request = form.elements.request;
    return request.value.length < 5
        ? (toggleErrorMessages(request, true), false)
        : (toggleErrorMessages(request, false), true);
};

//wait for the document to load
document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", validateSubmit);
    //add blur, focus and click on all input elements
    allInput.forEach((input) => {
        input.addEventListener(
            "blur",
            (e) => {
                validate(e.currentTarget.id);
            },
            false
        );
        form.addEventListener(
            "focus",
            () => {
                toggleErrorMessages(input, false);
            },
            false
        );
    });
    document.addEventListener("keydown", (event) => {
        if (
            modal.attributes["aria-hidden"].value === "false" &&
            event.key === "Enter"
        ) {
            validateSubmit(event);
        }
        if (
            event.key === "Escape" &&
            modal.attributes["aria-hidden"].value === "false"
        ) {
            closeModal();
        }
    });
});

//switch fonction for valide values input
const validate = (input) => {
    switch (input) {
        case "first":
            return validateFirstAndLast(input);
        case "last":
            return validateFirstAndLast(input);
        case "email":
            return validateEmail();
        case "request":
            return validateRequest();
        default:
            console.log(`${input} n'existe pas`);
    }
};
