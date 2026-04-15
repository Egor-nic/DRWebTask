const WARNING_EMAIL_TEXT = document.getElementById('warning_email_text');

const CHECKBOX = document.getElementById('mainFormCheckbox');

const SUBMIT_FORM_BUTTON = document.getElementById('submitFormButton');

const FORM = document.querySelector('#registrationFrom');

const INPUTS = document.querySelectorAll('form input:not([type="checkbox"])');

const INPUT_EMAIL = document.getElementById('email');


INPUT_EMAIL.addEventListener('change', (event) => {

    const value = event.target.value;

    if (value.trim()) {
        WARNING_EMAIL_TEXT.style.display = 'block';

    } else {
        WARNING_EMAIL_TEXT.style.display = 'none';
    }
});

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
        } else {
            EROOR_TEXT.style.display = 'none';
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
    
    addErrorText();
    if (!isCheckIsEmtyInputValue) {
        alert('the form submit')
    } else {
        return
    }
});
