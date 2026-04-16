const WARNING_EMAIL_TEXT = document.getElementById('warningEmailText');

const CHECKBOX = document.getElementById('agreementCheckbox');

const SUBMIT_FORM_BUTTON = document.getElementById('submitFormButton');

const FORM = document.querySelector('#registrationForm');

const INPUTS = document.querySelectorAll('form input:not([type="checkbox"])');

const INPUT_EMAIL = document.getElementById('email');

const INPUT_PHONE = document.getElementById('phone');

const POPUP = document.getElementById('errorPopup');

const POPUP_CLOSE_BUTTON = document.querySelector('.popup__close-button');

const POPUP_AGREE_BUTTON = document.querySelector('.popup__agree-button');

const PAGE = document.querySelector('.page');

let isSubmitting = false;

const openPopup = () => {
    POPUP.classList.remove('is-hidden');
    PAGE.classList.add('page--popup-open');
};

const closePopup = () => {
    POPUP.classList.add('is-hidden');
    PAGE.classList.remove('page--popup-open');
};

INPUT_EMAIL.addEventListener('change', (event) => {

    const value = event.target.value;

    if (value.trim()) {
        WARNING_EMAIL_TEXT.style.display = 'block';

    } else {
        WARNING_EMAIL_TEXT.style.display = 'none';
    }
});

const checkIsValidEmail = (value) => {
    const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (emailRegExp.test(value)) {
        return true;
    } else {
        return false;

    }

}

CHECKBOX.addEventListener('change', () => {

    const isChecked = CHECKBOX.checked;

    if (isChecked) {
        SUBMIT_FORM_BUTTON.removeAttribute("disabled");
    } else {
        SUBMIT_FORM_BUTTON.disabled = true;
    }
});

const addErrorText = () => {

    for (const input of INPUTS) {

        const errorTextId = input.id;
        const EROOR_TEXT = document.getElementById(`${errorTextId}-error`);

        if (!input.value.trim()) {
            EROOR_TEXT.style.display = 'block';
            input.classList.add("form__input--error");
        } else {
            EROOR_TEXT.style.display = 'none';
            input.classList.remove("form__input--error");
        }
    }
};

const checkIsEmtyInputValue = () => {
    for (const input of INPUTS) {
        if (!input.value.trim()) {
            return true;
        }
    }
    return false;
};

FORM.addEventListener('submit', (event) => {
    event.preventDefault();

    if (isSubmitting) {
        return;
    }

    const isCheckIsEmtyInputValue = checkIsEmtyInputValue();

    const emailInputValue = INPUT_EMAIL.value;
    const isValidEmail = checkIsValidEmail(emailInputValue);

    addErrorText();
    if (!isCheckIsEmtyInputValue) {

        if (!isValidEmail) {
            alert("Введен некорректный email");
        } else {
            isSubmitting = true;
            SUBMIT_FORM_BUTTON.disabled = true;

            setTimeout(() => {
                openPopup();
                isSubmitting = false;
                SUBMIT_FORM_BUTTON.disabled = !CHECKBOX.checked;
            }, 1200);
        }
    } else {
        return;
    }
});

INPUT_PHONE.addEventListener('input', (event) => {

    let value = event.target.value.replace(/\D/g, ''); // Только цифры

    if (!value) {
        event.target.value = ''; // Позволяем очистить поле полностью
        return;
    }

    if (value.startsWith('8')) {
        value = '7' + value.slice(1);
    }
    else if (!value.startsWith('7')) {
        value = '7' + value;
    }

    value = value.slice(0, 11); // Ограничение 11 цифр
    event.target.value = '+' + value;

});

POPUP_CLOSE_BUTTON.addEventListener('click', closePopup);
POPUP_AGREE_BUTTON.addEventListener('click', closePopup);

POPUP.addEventListener('click', (event) => {
    if (event.target === POPUP) {
        closePopup();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !POPUP.classList.contains('is-hidden')) {
        closePopup();
    }
});
