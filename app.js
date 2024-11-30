const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()-_+=/[]{}|';

const btn = document.getElementById("btn");
const passwordGenerate = document.getElementById("password");
const test = document.getElementById("test");
const strength = document.getElementById("strength");
const strengthValue = document.getElementById("strengthValue");
const range = document.getElementById("range");
const copy = document.getElementById("copy");
const lengthValue = document.getElementById("lengthValue");

// Initialize the strength value
strengthValue.value = "";

// Generate a random password on page load
window.addEventListener("DOMContentLoaded", () => {
  randomPassword();
  updateLengthValue();
});

// Generate password on button click
btn.addEventListener("click", function (e) {
  e.preventDefault();
  passwordGenerator();
});

// Update the displayed length value when the slider is moved
range.addEventListener("input", updateLengthValue);

// Copy password to clipboard
copy.addEventListener("click", function () {
  passwordGenerate.select();
  document.execCommand("copy");
  alert("Copied the text: " + passwordGenerate.value);
});

function passwordGenerator() {
  const addNumbers = document.getElementById("numbers").checked;
  const addSymbols = document.getElementById("symbols").checked;
  const addLowercase = document.getElementById("lowercase").checked;
  const addUppercase = document.getElementById("uppercase").checked;

  if (!addNumbers && !addSymbols && !addUppercase && !addLowercase) {
    alert("Debes seleccionar al menos un caracter para generar una contraseña");
    return;
  }

  let charset = "";
  if (addNumbers) charset += numbers;
  if (addSymbols) charset += symbols;
  if (addLowercase) charset += lowercase;
  if (addUppercase) charset += uppercase;

  let password = "";
  for (let i = 0; i < range.value; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  passwordGenerate.value = password;
  passwordTest(range.value, addNumbers, addSymbols, addUppercase, addLowercase);
}

function passwordTest(length, addNumbers, addSymbols, addUppercase, addLowercase) {
  if (length < 8) {
    test.textContent = "La contraseña debería tener al menos 8 dígitos";
    strength.textContent = "Muy débil";
    strengthValue.value = "10";
  } else if (!addNumbers) {
    test.textContent = "La contraseña debería tener al menos un número";
    strength.textContent = "Débil";
    strengthValue.value = "30";
  } else if (!addSymbols) {
    test.textContent = "La contraseña debería tener al menos un símbolo";
    strength.textContent = "Débil";
    strengthValue.value = "30";
  } else if (!addUppercase) {
    test.textContent = "La contraseña debería tener al menos una letra mayúscula";
    strength.textContent = "Débil";
    strengthValue.value = "30";
  } else if (!addLowercase) {
    test.textContent = "La contraseña debería tener al menos una letra minúscula";
    strength.textContent = "Débil";
    strengthValue.value = "30";
  } else if (length > 15) {
    test.textContent = "Contraseña segura";
    strength.textContent = "Extremadamente fuerte (Intenta no olvidarla)";
    strengthValue.value = "100";
  } else {
    test.textContent = "Contraseña segura";
    strength.textContent = "Fuerte";
    strengthValue.value = "90";
  }
}

function randomPassword() {
  const randomLength = Math.floor(Math.random() * (30 - 8 + 1) + 8);
  const charset = symbols + numbers + lowercase + uppercase;

  let password = "";
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  passwordGenerate.value = password;
}

function updateLengthValue() {
  lengthValue.textContent = range.value;
}


