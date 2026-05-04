const PASSWORD = "easy001";
const phone = "2348083869454";

const students = [
  "Abdulwasii Saad (SS2)",
  "Jimoh Ridwan (SS2)",
  "Abdul Wasil Mazdah (SS2)",
  "Adeyemi Muaz (SS1)",
  "Adeboye Abdul Warith (SS1)",
  "Adejumo Habib (JSS3)",
  "Faroq Kazeem (JSS3)",
  "Abdulmalik Taiwo (JSS3)",
  "Nafiu Hassan (JSS2)",
  "Bello Muhammed (JSS2)",
  "Fadlullah Jimoh (JSS2)",
  "AbdulRazaq (JSS1)",
  "Afolabi Mustapha (JSS1)",
  "Adeboye Jubreel (JSS1)"
];

const studentSelect = document.getElementById("student");

// LOGIN
function login() {
  const pass = document.getElementById("password").value;
  if (pass === PASSWORD) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("app").style.display = "block";
    loadStudents();
    displayRecords();
    displaySuggestions();
  } else {
    alert("Wrong password");
  }
}

function logout() {
  location.reload();
}

// MENU
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function showSection(section) {
  document.getElementById("students").style.display = "none";
  document.getElementById("suggestion").style.display = "none";
  document.getElementById(section).style.display = "block";
}

// LOAD STUDENTS
function loadStudents() {
  students.forEach(name => {
    let opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    studentSelect.appendChild(opt);
  });
}

// SEARCH
function filterStudents() {
  const val = document.getElementById("search").value.toLowerCase();
  studentSelect.innerHTML = "";

  students.filter(s => s.toLowerCase().includes(val))
    .forEach(s => {
      let opt = document.createElement("option");
      opt.value = s;
      opt.textContent = s;
      studentSelect.appendChild(opt);
    });
}

// SAVE RECORD
function saveData() {
  const file = document.getElementById("image").files[0];

  let reader = new FileReader();
  reader.onload = function () {
    const record = {
      name: studentSelect.value,
      academic: document.getElementById("academic").value,
      character: document.getElementById("character").value,
      respect: document.getElementById("respect").value,
      remark: document.getElementById("remark").value,
      image: reader.result || "image.jpg",
      date: new Date().toLocaleString()
    };

    let records = JSON.parse(localStorage.getItem("records")) || [];
    records.push(record);
    localStorage.setItem("records", JSON.stringify(records));

    displayRecords();
  };

  if (file) reader.readAsDataURL(file);
  else reader.onload();
}

// DISPLAY RECORDS
function displayRecords() {
  const records = JSON.parse(localStorage.getItem("records")) || [];
  const list = document.getElementById("recordList");
  list.innerHTML = "";

  records.reverse().forEach((r, i) => {
    let div = document.createElement("div");
    div.className = "record-item";
    div.innerHTML = `
      <img src="${r.image}">
      <b>${r.name}</b><br>
      Academic: ${r.academic} |
      Character: ${r.character} |
      Respect: ${r.respect}<br>
      ${r.remark}<br>
      <small>${r.date}</small><br>
      <button class="delete-btn" onclick="deleteRecord(${i})">Delete</button>
    `;
    list.appendChild(div);
  });
}

// DELETE
function deleteRecord(index) {
  let records = JSON.parse(localStorage.getItem("records")) || [];
  records.splice(records.length - 1 - index, 1);
  localStorage.setItem("records", JSON.stringify(records));
  displayRecords();
}

// WHATSAPP
function sendWhatsApp() {
  const msg = `Al Hikmoh Group of Schools

Student: ${studentSelect.value}
Academic: ${document.getElementById("academic").value}/10
Character: ${document.getElementById("character").value}/10
Respect: ${document.getElementById("respect").value}/10
Remark: ${document.getElementById("remark").value}`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
}

// SUGGESTION
function saveSuggestion() {
  let text = document.getElementById("suggestText").value;

  let suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
  suggestions.push({ text, date: new Date().toLocaleString() });

  localStorage.setItem("suggestions", JSON.stringify(suggestions));
  displaySuggestions();
}

function displaySuggestions() {
  let suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
  let box = document.getElementById("suggestList");
  box.innerHTML = "";

  suggestions.reverse().forEach(s => {
    let div = document.createElement("div");
    div.className = "record-item";
    div.innerHTML = `${s.text}<br><small>${s.date}</small>`;
    box.appendChild(div);
  });
}
