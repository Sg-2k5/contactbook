// Add contacts form submission
const save_contacts = document.getElementById("contact-form");
const modal_overlay = document.getElementById("modal-overlay");
const add_contact_btn = document.getElementById("create-contact"); //create contact btn
const close_btn = document.getElementById("close-btn"); //close button for the delete popup
const phoneregex = /^(\+91|91|0)?[6-9]\d{9}$/;
const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const searchInput = document.getElementsByClassName("search-input")[0]; //search input
let saved_contacts = JSON.parse(localStorage.getItem("contacts")) || []; //all the contacts are stored here with contacts as key

/*open contact form function*/ function openform() {
  modal_overlay.style.display = "block";
  document.getElementsByTagName("h3")[0].innerHTML = "Create contacts";
}

/*close contact form function*/ function closeform() {
  modal_overlay.style.display = "none";
  save_contacts.reset();
  document.querySelectorAll(".error-msg").forEach((error) => error.remove());
  currentEditingId = null;
}
// Function to display error message
function showerror(input, message) {
  clearerror(input);

  const error = document.createElement("span");
  error.className = "error-msg";
  error.textContent = message;
  error.style.color = "red";
  error.style.fontSize = "10px";

  input.insertAdjacentElement("afterend", error); //Adding the red message after the input field
}

function clearerror(input) {
  //clear previously existed errors
  const parent = input.parentNode;
  if (parent) {
    const existingError = parent.querySelector(".error-msg");
    if (existingError) {
      existingError.remove();
    }
  }
}

function showToast(message) {
  //toast box notification
  const existingToast = document.querySelector(".toast");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 2500);
}

// Name validation
function validatename() {
  const nameinput = document.getElementById("name");
  const namevalue = nameinput.value.trim();

  if (namevalue === "") {
    showerror(nameinput, "Name cannot be empty!");
    return false;
  }
  if (/^(\d)/.test(namevalue)) {
    showerror(nameinput, "Name cannot start with number!");
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
  phoneinput.value = phoneinput.value.replace(/[\s-(a-z)]/gi, "");
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
//validating address
function validateaddress() {
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

function uniquedetails(contacts, email, phone) {
  //unique email and unique phone number
  const duplicateemail = contacts.some(
    (contact) =>
      contact.id !== currentEditingId &&
      contact.email.trim().toLowerCase() === email.toLowerCase(),
  );
  const duplicatephone = contacts.some(
    (contact) => contact.id !== currentEditingId && contact.phone === phone,
  );

  if (duplicateemail) {
    showerror(document.getElementById("email"), "Email must be unique.");
  }
  if (duplicatephone) {
    showerror(document.getElementById("phone"), "Phone number must be unique.");
  }

  return !duplicateemail && !duplicatephone;
}

document.getElementById("name").addEventListener("input", validatename); //trigger a error message when name is invalid
document.getElementById("email").addEventListener("input", validateEmail); //trigger a message when  emailis invalid
document.getElementById("phone").addEventListener("input", validatephone); //trigger a error message when mobile number input is invalid
document.getElementById("address").addEventListener("input", validateaddress); //trigger a message when address is invalid

add_contact_btn.addEventListener("click", openform);
/*closing the form aftter clicking the x icon*/
close_btn.addEventListener("click", function (e) {
  e.preventDefault();
  closeform();
});
let currentEditingId = null; //flag for edit based on id

/*operation after clicking save contacts*/
save_contacts.addEventListener("submit", function (e) {
  e.preventDefault();

  const namevalid = validatename();
  const emailvalid = validateEmail();
  const phonevalid = validatephone();
  const addressvalid = validateaddress();

  if (!namevalid || !emailvalid || !phonevalid || !addressvalid) {
    console.log("Contact is not valid. Not saving to localStorage.");
    return; //prevent saving the data when its invalid
  }

  //  phone number according to indian number rules
  const phoneInput = document
    .getElementById("phone")
    .value.replace(/[\s-]/g, "");
  let savedphone = phoneInput;

  if (phoneInput.startsWith("+91") && phoneInput.length > 10) {
    savedphone = phoneInput.slice(3);
  } else if (phoneInput.startsWith("91") && phoneInput.length > 10) {
    savedphone = phoneInput.slice(2);
  } else if (phoneInput.startsWith("0") && phoneInput.length > 10) {
    savedphone = phoneInput.slice(1);
  }

  saved_contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  const emailvalue = document.getElementById("email").value.trim();
  if (!uniquedetails(saved_contacts, emailvalue, savedphone)) {
    return; //prevent saving data when it is not unique
  }

  if (currentEditingId) {
    //  Edit the existing contact
    for (let i = 0; i < saved_contacts.length; i++) {
      if (saved_contacts[i].id === currentEditingId) {
        saved_contacts[i].name = document.getElementById("name").value.trim();
        saved_contacts[i].email = document.getElementById("email").value.trim();
        saved_contacts[i].phone = savedphone;
        saved_contacts[i].address = document
          .getElementById("address")
          .value.trim();
        break;
      }
    }
    showToast("Contact edited successfully.");
  } else {
    //  Add a new contact
    const contact_details = {
      id: crypto.randomUUID(),
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: savedphone,
      address: document.getElementById("address").value.trim(),
    };
    saved_contacts.push(contact_details);
    showToast("Contact added successfully!");
  }

  //  updated list
  localStorage.setItem("contacts", JSON.stringify(saved_contacts));
  displaycontacts(saved_contacts);
  // resetting and editing state directly
  currentEditingId = null;
  save_contacts.reset();
  document.getElementsByTagName("h3")[0].innerHTML = "Create contact";
  modal_overlay.style.display = "none";
});

function editcontact(id) {
  //edit contacts function(just opens the form with values already entered)
  currentEditingId = id;
  document.getElementsByTagName("h3")[0].innerHTML = "Edit contact";
  modal_overlay.style.display = "block";

  const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      document.getElementById("name").value = contacts[i].name;
      document.getElementById("email").value = contacts[i].email;
      document.getElementById("phone").value = contacts[i].phone;
      document.getElementById("address").value = contacts[i].address;
      break;
    }
  }
}

function displaycontacts(ListContacts) {
  let contact_main_content = document.getElementsByClassName("contact-list")[0];

  // Clear all previous content
  contact_main_content.innerHTML = "";

  let contact_display = document.createElement("ul"); //Class name for which contacts need to be added,deleted,searched,and edited in the index page
  contact_display.className = "contacts";
  // Clear previous content
  if (ListContacts.length === 0) {
    contact_display.innerHTML =
      "<center><h1>No contacts added yet</h1></center>";
    contact_main_content.appendChild(contact_display);
    return;
  }

  for (let contact of ListContacts) {
    //used crypto uuid as id for the  contact-details container
    contact_display.innerHTML += `<li class="contact-details" id="${contact.id}"><div class="topname"><input type="checkbox" class="bulk-delete" /><div class="avatar">${contact.name[0].toUpperCase()}</div>
          <div class="contact-name">${contact.name}</div></div>
          <div class="contact-email"><img
          src="https://www.svgrepo.com/show/521128/email-1.svg"
          alt="email"
          width="20"
          height="20"
        />${contact.email}</div>
          <div class="contact-phone"><img
          src="https://www.svgrepo.com/show/205094/telephone-call-telephone.svg"
          alt="phone"
          width="15"
          height="15"
        />${contact.phone}</div>
          <div class="contact-address">
          <img
          src="https://www.svgrepo.com/show/418950/address-location-map.svg"
          alt="address"
          width="15"
          height="15"/>
            ${contact.address}
          </div>
          <div class="Edit-delete-btns">
            <!--Edit and delete btns(parent container)-->
            <button class="Edit-btn" type="button" title="Edit">
             <img
          src="https://www.svgrepo.com/show/75500/edit-button.svg"
          alt="edit"
          width="15"
          height="15"/></button
            ><!--Edit button  as a child class-->
            <button class="Delete-btn" type="button" title="Delete"  >
              <img
          src="https://www.svgrepo.com/show/500199/edit-delete.svg"
          alt="delete"
          width="15"
          height="15"/></button
            ><!--Delete button in the child class-->
          </div>
        </li>`;
  }
  contact_main_content.appendChild(contact_display);
}

//Retrieving data from  the array
displaycontacts(JSON.parse(localStorage.getItem("contacts")) || []);
function deletecontact(Id) {
  //delete contact function
  // Check if confirmation box already exists
  if (document.querySelector(".confirmation-box")) {
    return;
  } //prevents multiple confirmation dialogs to be created

  // delete confirmation box asking (are you aure to delete the contact popup?)
  let deleteconfirmation = document.createElement("div");
  deleteconfirmation.className = "confirmation-box";
  deleteconfirmation.innerHTML = `
    <div>
      <p>Are you sure you want to delete this contact?</p>
      <div class="confirmation-buttons">
        <button class="yes-btn">Yes</button>
        <button class="no-btn">No</button>
      </div>
    </div>
  `;

  document.body.appendChild(deleteconfirmation);

  // yes button functionality
  deleteconfirmation
    .querySelector(".yes-btn")
    .addEventListener("click", function () {
      saved_contacts = JSON.parse(localStorage.getItem("contacts")) || [];

      // Iterate and check  whether contact match with Id
      for (let i = 0; i < saved_contacts.length; i++) {
        if (saved_contacts[i].id === Id) {
          // Check if ID matches
          saved_contacts.splice(i, 1); // Delete from array
          break; // break outof loop after deleting
        }
      }

      //  localStorage with the updated array
      localStorage.setItem("contacts", JSON.stringify(saved_contacts));
      displaycontacts(saved_contacts);

      deleteconfirmation.remove();
      showToast("Contact deleted successfully.");
    });

  // No button functionality for popup delete confirmation
  deleteconfirmation
    .querySelector(".no-btn")
    .addEventListener("click", function () {
      deleteconfirmation.remove();
    });
}

document
  .getElementsByClassName("contact-list")[0]
  .addEventListener("click", function (event) {
    //event delegation  for edit and delete
    if (event.target.closest(".Delete-btn")) {
      let contactId = event.target.closest(".contact-details").id;
      deletecontact(contactId);
    }
    if (event.target.closest(".Edit-btn")) {
      let contactId = event.target.closest(".contact-details").id;
      editcontact(contactId);
    }
  }); //performing event delegation for contact button

document
  .getElementsByClassName("contact-list")[0]
  .addEventListener("change", function (event) {
    if (!event.target.classList.contains("bulk-delete")) {
      return;
    }

    event.target.closest(".contact-details").classList.toggle(
      "selected",
      event.target.checked,
    );
  });

document
  .getElementById("bulk-delete-btn")
  .addEventListener("click", function () {
    const selectedIds = Array.from(
      document.querySelectorAll(".bulk-delete:checked"),
    ).map((checkbox) => checkbox.closest(".contact-details").id);

    if (selectedIds.length === 0) {
      showToast("Select at least one contact to delete.");
      return;
    }

    saved_contacts = saved_contacts.filter(
      (contact) => !selectedIds.includes(contact.id),
    );
    localStorage.setItem("contacts", JSON.stringify(saved_contacts));
    searchContacts();
    showToast(`${selectedIds.length} contact(s) deleted successfully.`);
  });

function searchContacts() {
  //search function
  const searchvalue = searchInput.value.toLowerCase().trim();

  const filtered = saved_contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchvalue) ||
      contact.phone.includes(searchvalue),
  );

  displaycontacts(filtered); //filtering search based on phone and name
}

// Trigger search while typing
searchInput.addEventListener("input", searchContacts);

// Trigger search when Enter is pressed
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchContacts();
  }
});
