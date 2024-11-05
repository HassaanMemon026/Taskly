document.addEventListener("DOMContentLoaded", function() {
    let title = document.getElementById("title");
    let desc = document.getElementById("desc");
    let submit = document.getElementById("submit");
  
    function toAddInLocalStorage() {
      let tValue = title.value;
      let dValue = desc.value;
      if (tValue && dValue) {
        localStorage.setItem(tValue, dValue);
        title.value = "";
        desc.value = "";
        toShowInTable();
      } else {
        alert("Please fill in both Title and Description.");
      }
    }
  
    submit.addEventListener('click', toAddInLocalStorage);
  
    function toShowInTable() {
      let tableBody = document.querySelector("tbody");
      tableBody.innerHTML = ""; // Clear existing rows
      let tnum = 0;
      for (let i = 0; i < localStorage.length; i++) {
        tnum++;
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        let rowHTML = `
          <tr class="main-row">
            <th scope="row">${tnum}</th>
            <td>${key}</td>
            <td>${value}</td>
            <td>
              <input class="form-check-input" type="checkbox" value="">
            </td>
          </tr>
          <tr class="detail-row">
            <td colspan="4">
              <div class="hidden-buttons">
                <span class="edit-buttons">
                  <button class="edit-btn btn btn-secondary btn-sm">Edit</button>
                  <button class="delete-btn btn btn-danger btn-sm">Delete</button>
                </span>
              </div>
            </td>
          </tr>
        `;
        tableBody.innerHTML += rowHTML; // Add rows to the table
      }
      addRowClickEvents(); // Add click events to the rows
    }
  
    function addRowClickEvents() {
      let rows = document.querySelectorAll("tbody tr.main-row"); // Get all main rows in the table body
      rows.forEach(row => { // Loop through each main row
        row.addEventListener('click', function (e) { // Add click event listener to the main row
          if (e.target.className !== 'form-check-input' && !e.target.classList.contains('edit-btn') && !e.target.classList.contains('delete-btn')) {
            row.classList.toggle('row-selected'); // Toggle 'row-selected' class
            let detailRow = row.nextElementSibling;
            if (row.classList.contains('row-selected')) {
              detailRow.style.display = 'table-row';
              setTimeout(() => {
                detailRow.style.height = '70px'; // Adjusted height for larger sliding effect
                detailRow.querySelector('.hidden-buttons').style.display = 'flex';
                detailRow.querySelector('.hidden-buttons').style.opacity = '1';
              }, 0);
            } else {
              detailRow.querySelector('.hidden-buttons').style.opacity = '0';
              setTimeout(() => {
                detailRow.style.height = '0';
                detailRow.style.display = 'none';
                detailRow.querySelector('.hidden-buttons').style.display = 'none';
              }, 500); // Match transition duration with CSS
            }
          }
        });
  
        // Edit button event listener
        row.nextElementSibling.querySelector('.edit-btn').addEventListener('click', function () {
          let key = row.cells[1].innerText;
          let value = row.cells[2].innerText;
          title.value = key;
          desc.value = value;
          localStorage.removeItem(key); // Remove item from local storage
          toShowInTable(); // Update the table
        });
  
        // Delete button event listener
        row.nextElementSibling.querySelector('.delete-btn').addEventListener('click', function () {
          let key = row.cells[1].innerText;
          localStorage.removeItem(key); // Remove item from local storage
          toShowInTable(); // Update the table
        });
      });
    }
  
    toShowInTable(); // Show table rows on page load
  })