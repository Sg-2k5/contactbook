function displaycontacts() {
  let saved_contacts = JSON.parse(localStorage.getItem("contacts")) || []; //Retrieving data from  the array
  let contact_display = document.getElementsByClassName("contacts")[0]; //Class name for which contacts need to be added,deleted,searched,and edited in the index page

  // Clear previous content
  contact_display.innerHTML = "";

  if (saved_contacts.length === 0) {
    contact_display.innerHTML = "<center><h2>No contacts added yet</h2><center";
    return;
  }

  for (contact of saved_contacts) {
    contact_display.innerHTML += `<li class="contact-details" id="${contact.id}">
          <div class="contact-name">${contact.name}</div>
          <div class="contact-email">${contact.email}</div>
          <div class="contact-phone">${contact.phone}</div>
          <div class="contact-address">
            ${contact.address}
          </div>
          <div class="Edit-delete-btns">
            <!--Edit and delete btns(parent container)-->
            <button class="Edit-btn" type="button" title="Edit">
              <?xml version="1.0" encoding="utf-8"?>

              <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
              <svg
                width="10px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="style=stroke">
                  <g id="edit">
                    <path
                      id="vector (Stroke)"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.3367 16.071L3.94269 19.6888C3.9081 20.0064 4.17624 20.2746 4.49389 20.24L8.11161 19.846C8.45133 19.809 8.76823 19.6571 9.00986 19.4154L20.0011 8.42417C20.5869 7.83838 20.5869 6.88863 20.0011 6.30285L17.8798 4.18153C17.294 3.59574 16.3443 3.59574 15.7585 4.18153L4.76722 15.1728C4.52559 15.4144 4.3737 15.7313 4.3367 16.071ZM18.9405 3.12087L21.0618 5.24219C22.2334 6.41376 22.2334 8.31325 21.0618 9.48483L10.0705 20.4761C9.58725 20.9594 8.95345 21.2631 8.27401 21.3371L4.65629 21.7311C3.38571 21.8695 2.31313 20.7969 2.45151 19.5264L2.84552 15.9086C2.91952 15.2292 3.22329 14.5954 3.70656 14.1121L14.6978 3.12087C15.8694 1.94929 17.7689 1.94929 18.9405 3.12087Z"
                      fill="#000000"
                    />
                    <path
                      id="vector (Stroke)_2"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.0011 6.30285L17.8798 4.18153C17.294 3.59574 16.3443 3.59574 15.7585 4.18153L14.4857 5.45432L18.7283 9.69696L20.0011 8.42417C20.5869 7.83838 20.5869 6.88863 20.0011 6.30285ZM18.7283 11.8183L12.3644 5.45432L14.6978 3.12087C15.8694 1.94929 17.7689 1.94929 18.9405 3.12087L21.0618 5.24219C22.2334 6.41376 22.2334 8.31326 21.0618 9.48483L18.7283 11.8183Z"
                      fill="#000000"
                    />
                  </g>
                </g>
              </svg></button
            ><!--Edit button  as a child class-->
            <button class="Delete-btn" type="button" title="Delete" onclick="deletecontact('${contact.id}')" >
              <?xml version="1.0" encoding="iso-8859-1"?>
              <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
              <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
              <svg
                fill="#000000"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="10px"
                height="20px"
                viewBox="0 0 488.936 488.936"
                xml:space="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M381.16,111.948H107.376c-6.468,0-12.667,2.819-17.171,7.457c-4.504,4.649-6.934,11.014-6.738,17.477l9.323,307.69
			c0.39,12.92,10.972,23.312,23.903,23.312h20.136v-21.012c0-24.121,19.368-44.049,43.488-44.049h127.896
			c24.131,0,43.893,19.928,43.893,44.049v21.012h19.73c12.933,0,23.52-10.346,23.913-23.268l9.314-307.7
			c0.195-6.462-2.234-12.863-6.738-17.513C393.821,114.767,387.634,111.948,381.16,111.948z"
                    />
                    <path
                      d="M309.166,435.355H181.271c-6.163,0-11.915,4.383-11.915,11.516v30.969c0,6.672,5.342,11.096,11.915,11.096h127.895
			c6.323,0,11.366-4.773,11.366-11.096v-30.969C320.532,440.561,315.489,435.355,309.166,435.355z"
                    />
                    <path
                      d="M427.696,27.106C427.696,12.138,415.563,0,400.591,0H88.344C73.372,0,61.239,12.138,61.239,27.106v30.946
			c0,14.973,12.133,27.106,27.105,27.106H400.59c14.973,0,27.105-12.133,27.105-27.106L427.696,27.106L427.696,27.106z"
                    />
                  </g>
                </g>
              </svg></button
            ><!--Delete button in the child class-->
          </div>
        </li>`;
  }
}
displaycontacts();

function deletecontact(Id) {
  if (confirm("Are you sure you want to delete this contact?")) {
    let saved_contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Loop through and whether contact match with Id
    for (let i = 0; i < saved_contacts.length; i++) {
      if (saved_contacts[i].id === Id) {
        // Check if ID matches
        saved_contacts.splice(i, 1); // Delete from array
        break; // Stop after deleting
      }
    }

    //  localStorage with the new array
    localStorage.setItem("contacts", JSON.stringify(saved_contacts));

    // Remove the element from index page
    let contactElement = document.getElementById(Id);
    if (contactElement) {
      contactElement.remove();
    }
  }
}
function editcontact() {}
