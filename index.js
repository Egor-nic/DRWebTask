const WARNING_EMAIL_TEXT = document.getElementById('warning_email_text');

const CHECKBOX = document.getElementById('mainFormCheckbox');

const SUBMIT_FORM_BUTTON = document.getElementById('submitFormButton');

const FORM = document.querySelector('#registrationFrom');

const INPUTS = document.querySelectorAll('form input:not([type="checkbox"])');

const INPUT_EMAIL = document.getElementById('email');

const INPUT_PHONE = document.getElementById('phone');

INPUT_EMAIL.addEventListener('change', (event) => {

    const value = event.target.value;

    if (value.trim()) {
        WARNING_EMAIL_TEXT.style.display = 'block';

    } else {
        WARNING_EMAIL_TEXT.style.display = 'none';
    }
});

const checkIsValidEmail = (value) => {
    console.log(value, "<------value====")
    // Регулярное выражение для проверки email
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

        console.log(errorTextId, '<--- errorTextId')
        if (!input.value.trim()) {
            EROOR_TEXT.style.display = 'block';
            input.classList.add("main_form-input-error");
        } else {
            EROOR_TEXT.style.display = 'none';
            input.classList.remove("main_form-input-error");
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

    const isCheckIsEmtyInputValue = checkIsEmtyInputValue();

    const emailInputValue = INPUT_EMAIL.value;
    const isValidEmail = checkIsValidEmail(emailInputValue);

    addErrorText();
    if (!isCheckIsEmtyInputValue) {

        if (!isValidEmail) {
            alert("Введен не корпектный email");
        } else {

            alert('the form submit')
        }
    } else {
        return
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
