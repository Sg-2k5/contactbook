// Add contacts form submission
const save_contacts = document.getElementsByClassName("contact-form")[0];
const phoneregex = /^(\+91|91|0)?[6-9]\d{9}$/;
const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let saved_contacts = JSON.parse(localStorage.getItem("contacts")) || [];
// Function to display error message
function showerror(input, errormsg) {
  if (!errormsg) {
    return;
  }

  const parent = input.parentNode;
  if (parent) {
    for (let i = 0; i < parent.children.length; i++) {
      if (parent.children[i].className === "error-msg") {
        parent.children[i].remove();
      }
    }
  }

  const error = document.createElement("span");
  error.className = "error-msg";
  error.textContent = errormsg;
  error.style.color = "red";
  error.style.fontSize = "10px";
  input.insertAdjacentElement("afterEnd", error);
}

function clearerror(input) {
  //clear existing errors
  const parent = input.parentNode;
  if (!parent) {
    return;
  }

  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].className === "error-msg") {
      parent.children[i].remove();
    }
  }
}

// Name validation
function validatename() {
  const nameinput = document.getElementById("name");
  const namevalue = nameinput.value.trim();

  if (namevalue === "") {
    showerror(nameinput, "Name cannot be empty!");
    return false;
  }
  clearerror(nameinput);
  return true;
}
// Email validation
function validateEmail() {
  const emailinput = document.getElementById("email");
  const emailvalue = emailinput.value.trim();
  if (emailvalue === "") {
    showerror(emailinput, "Email is required.");
    return false;
  } else if (!emailregex.test(emailvalue)) {
    showerror(emailinput, "Enter a valid email address.");
    return false;
  }

  clearerror(emailinput);
  return true;
}

// Phone validation
function validatephone() {
  const phoneinput = document.getElementById("phone");
  phoneinput.value = phoneinput.value.replace(/[\s-]/g, "");
  const phonevalue = phoneinput.value;

  if (phonevalue === "") {
    showerror(phoneinput, "Phone number is required.");
    return false;
  } else if (!phoneregex.test(phonevalue)) {
    showerror(phoneinput, "Enter a valid Indian phone number.");
    return false;
  }

  clearerror(phoneinput);
  return true;
}

function validateaddress() {
  //validating address
  const addressinput = document.getElementById("address");
  const addressvalue = addressinput.value.trim();
  if (addressvalue === "") {
    showerror(addressinput, "Address cannot be empty.");
    return false;
  } else if (addressvalue.length < 10) {
    showerror(addressinput, "Address must contain at least 10 characters.");
    return false;
  }

  clearerror(addressinput);
  return true;
}
document.getElementById("name").addEventListener("input", validatename); //trigger a error message when name is invalid
document.getElementById("email").addEventListener("input", validateEmail); //trigger a message when  emailis invalid
document.getElementById("phone").addEventListener("input", validatephone); //trigger a error message when mobile number input is invalid
document.getElementById("address").addEventListener("input", validateaddress); //trigger a message when address is invalid

save_contacts.addEventListener("submit", function (e) {
  e.preventDefault();
  const namevalid = validatename();
  const emailvalid = validateEmail();
  const phonevalid = validatephone();
  const addressvalid = validateaddress();
  if (namevalid && emailvalid && phonevalid && addressvalid) {
    //Checking if the input given is valid
    // All fields are valid
    // Add contact to localStorage here
    console.log("Contact is valid. Saving to localStorage...");
    const phoneInput = document.getElementById("phone");
    let phonevalue = phoneInput.value.replace(/[\s-]/g, "");
    let savedPhone = phonevalue;

    if (phonevalue.startsWith("+91") && phonevalue.length > 10) {
      savedPhone = phonevalue.slice(3);
    } else if (phonevalue.startsWith("91") && phonevalue.length > 10) {
      savedPhone = phonevalue.slice(2);
    } else if (phonevalue.startsWith("0") && phonevalue.length > 10) {
      savedPhone = phonevalue.slice(1);
    }

    let contact_details = {
      id: crypto.randomUUID(),
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: savedPhone,
      address: document.getElementById("address").value,
    };
    saved_contacts.push(contact_details);
    localStorage.setItem("contacts", JSON.stringify(saved_contacts));
    save_contacts.reset();
  } else {
    console.log("Contact is not valid. Not saving to localStorage.");
  }
});
