const selectWrapper = document.querySelector(".wrapper_select");
const selectButton = document.querySelector(".select_button");
const buttonValues = document.querySelector(".pseudo_value");
const listbox = document.querySelector('.select_list [role="listbox"]');
const options = document.querySelectorAll(
    '.select_list [role="listbox"] [role="option"]'
);

let selectOpen = false;

selectButton.addEventListener("click", (event) => {
    toggleVisibiliteSelect(event);
    focusNextListOption();
});

selectButton.addEventListener("keydown", (event) => {
    toggleVisibiliteSelect(event);
});

selectButton.addEventListener("mouseover", (event) => {
    addStyleOptionSelected(event.target);
});

options.forEach((option) => {
    option.addEventListener("click", (event) => {
        addStyleOptionSelected(event.target);
        selectOpen = false;
        toggleSelect(selectOpen);
    });

    option.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "Enter":
                event.target.click();
                return;

            case "Escape":
                selectOpen = false;
                toggleSelect(selectOpen);
                return;

            case "ArrowDown":
                event.preventDefault();
                focusNextListOption("down");
                return;

            case "ArrowUp":
                event.preventDefault();
                focusNextListOption("up");
                return;

            default:
                return;
        }
    });
});

selectWrapper.addEventListener("focusout", (event) => {
    if (
        event.relatedTarget === null ||
        event.relatedTarget.classList[0] != "option"
    ) {
        selectOpen = false;
        toggleSelect(selectOpen);
    }
    event.preventDefault();
});

const toggleVisibiliteSelect = (event) => {
    if (event.key === "Enter" || event.type === "click") {
        selectOpen = true;
        toggleSelect(selectOpen);
        event.preventDefault();
    } else if (event.key === "Escape") {
        selectOpen = false;
        toggleSelect(selectOpen);
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        focusNextListOption("down");
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        focusNextListOption("up");
    }
};

const toggleSelect = (open) => {
    if (open) {
        listbox.style.display = "block";
        selectButton.setAttribute("aria-expanded", true);
    } else {
        listbox.style.display = "none";
        selectButton.setAttribute("aria-expanded", false);
    }
};

let nextId = 0;
const focusNextListOption = (direction) => {
    const activeElementId = document.activeElement.id;

    if (activeElementId === "select_button") {
        options[nextId].focus();
        addStyleOptionSelected(options[nextId]);
    } else {
        const currentElementId = parseInt(document.activeElement.id.split("-")[1]);
        nextId = direction === "down" ? currentElementId + 1 : currentElementId - 1;
        if (options.length != "" && nextId >= 0 && nextId <= options.length - 1) {
            options[nextId].focus();
            addStyleOptionSelected(options[nextId]);
        } else {
            return;
        }
    }
};

const removeSelected = (value) => {
    options.forEach((option) => {
        if (option.innerText != value) option.classList.remove("option-selected");
    });
};

const addStyleOptionSelected = (target) => {
    target.classList.add("option-selected");
    removeSelected(target.innerText);
    buttonValues.innerText = target.innerText;
};
