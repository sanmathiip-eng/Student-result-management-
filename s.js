// ====== Initialize ======
let results = JSON.parse(localStorage.getItem("results")) || [];

// ====== Show Section ======
function showSection(section) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(section).classList.add("active");
  renderTable(); // render table when switching to admin
}

// ====== Add Result ======
function addResult() {
  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const marks = document.getElementById("marks").value.trim();
  const total = document.getElementById("total").value.trim();

  if (!name || !roll || !subject || !marks || !total) {
    alert("Please fill all fields!");
    return;
  }

  const newResult = {
    name: name,
    roll: roll,
    subject: subject,
    marks: parseInt(marks),
    total: parseInt(total)
  };

  results.push(newResult);
  localStorage.setItem("results", JSON.stringify(results));
  alert("Result added successfully!");

  // Clear inputs
  document.getElementById("name").value = "";
  document.getElementById("roll").value = "";
  document.getElementById("subject").value = "";
  document.getElementById("marks").value = "";
  document.getElementById("total").value = "";

  renderTable();
}

// ====== Render All Results in Admin ======
function renderTable() {
  const tableBody = document.getElementById("resultsBody");
  if (!tableBody) return;

  tableBody.innerHTML = "";
  results.forEach((r, index) => {
    const row = `<tr>
      <td>${r.roll}</td>
      <td>${r.name}</td>
      <td>${r.subject}</td>
      <td>${r.marks}</td>
      <td>${r.total}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}

// ====== Search Result for Student ======
function searchResult() {
  const rollSearch = document.getElementById("searchRoll").value.trim().toLowerCase();
  const tableBody = document.getElementById("studentBody");
  tableBody.innerHTML = "";

  if (!rollSearch) {
    alert("Enter Roll Number to search!");
    return;
  }

  const filtered = results.filter(r => r.roll.toLowerCase() === rollSearch);
  if (filtered.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="message">No result found for Roll No ${rollSearch}</td></tr>`;
    return;
  }

  let totalMarks = 0, totalMax = 0;

  filtered.forEach(r => {
    totalMarks += r.marks;
    totalMax += r.total;
    const row = `<tr>
      <td>${r.roll}</td>
      <td>${r.name}</td>
      <td>${r.subject}</td>
      <td>${r.marks}</td>
      <td>${r.total}</td>
    </tr>`;
    tableBody.innerHTML += row;
  });

  const percentage = ((totalMarks / totalMax) * 100).toFixed(2);
  let grade = "";
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B+";
  else if (percentage >= 60) grade = "B";
  else if (percentage >= 50) grade = "C";
  else grade = "F";

  const summaryRow = `<tr class="message">
    <td colspan="3"><strong>Total:</strong></td>
    <td><strong>${totalMarks}</strong></td>
    <td><strong>${totalMax}</strong></td>
  </tr>
  <tr class="message">
    <td colspan="5"><strong>Percentage:</strong> ${percentage}% | <strong>Grade:</strong> ${grade}</td>
  </tr>`;

  tableBody.innerHTML += summaryRow;
}