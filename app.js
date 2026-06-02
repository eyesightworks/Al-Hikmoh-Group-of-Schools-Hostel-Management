/* ==========================
   LOGIN PASSWORD
========================== */

const PASSWORD = "easy001";

const phone = "2348083869454";

/* ==========================
   DEFAULT SCHOOL DATA
========================== */

const defaultSchoolData = {

  "SS3": [],

  "SS2": [
    "Abdulwasii Saad",
    "Jimoh Ridwan",
    "Abdul Wasil Mazdah"
  ],

  "SS1": [
    "Adeyemi Muaz",
    "Adeboye Abdul Warith"
  ],

  "JSS3": [
    "Adejumo Habib",
    "Faroq Kazeem",
    "Abdulmalik Taiwo"
  ],

  "JSS2": [
    "Nafiu Hassan",
    "Bello Muhammed",
    "Fadlullah Jimoh"
  ],

  "JSS1": [
    "AbdulRazaq",
    "Afolabi Mustapha",
    "Adeboye Jubreel"
  ],

  "Primary 5": [],
  "Primary 4": [],
  "Primary 3": [],
  "Primary 2": [],
  "Primary 1": []

};

/* ==========================
   LOAD LOCAL STORAGE
========================== */

let schoolData =
JSON.parse(
localStorage.getItem("schoolData")
) || defaultSchoolData;

/* ==========================
   SAVE LOCAL STORAGE
========================== */

function saveSchoolData(){

  localStorage.setItem(
    "schoolData",
    JSON.stringify(schoolData)
  );

}

/* ==========================
   LOGIN
========================== */

function login(){

  const pass =
  document.getElementById("password").value;

  if(pass === PASSWORD){

    document.getElementById(
      "loginPage"
    ).style.display = "none";

    document.getElementById(
      "app"
    ).style.display = "block";

    initializeSystem();

  }else{

    alert("Wrong Password");

  }

}

/* ==========================
   LOGOUT
========================== */

function logout(){

  location.reload();

}

/* ==========================
   TOGGLE MENU
========================== */

function toggleMenu(){

  const menu =
  document.getElementById("menu");

  menu.style.display =
  menu.style.display === "block"
  ? "none"
  : "block";

}

/* ==========================
   SHOW SECTION
========================== */

function showSection(id){

  const sections = [

    "studentReport",
    "studentNote",
    "studentActivities",
    "manageStudents"

  ];

  sections.forEach(section => {

    document.getElementById(
      section
    ).style.display = "none";

  });

  document.getElementById(
    id
  ).style.display = "block";

  document.getElementById(
    "menu"
  ).style.display = "none";

}

/* ==========================
   GET ALL STUDENTS
========================== */

function getAllStudents(){

  let allStudents = [];

  Object.keys(schoolData)
  .forEach(cls => {

    schoolData[cls]
    .forEach(student => {

      allStudents.push(
        `${student} (${cls})`
      );

    });

  });

  return allStudents;

}

/* ==========================
   LOAD STUDENTS
========================== */

function loadStudents(){

  const studentSelect =
  document.getElementById("studentSelect");

  const noteStudent =
  document.getElementById("noteStudent");

  const activityStudent =
  document.getElementById("activityStudent");

  studentSelect.innerHTML = "";
  noteStudent.innerHTML = "";
  activityStudent.innerHTML = "";

  getAllStudents()
  .forEach(student => {

    const option1 =
    document.createElement("option");

    option1.value = student;
    option1.textContent = student;

    studentSelect.appendChild(option1);

    const option2 =
    document.createElement("option");

    option2.value = student;
    option2.textContent = student;

    noteStudent.appendChild(option2);

    const option3 =
    document.createElement("option");

    option3.value = student;
    option3.textContent = student;

    activityStudent.appendChild(option3);

  });

}

/* ==========================
   SEARCH STUDENTS
========================== */

function filterStudents(){

  const value =
  document.getElementById(
    "searchStudent"
  )
  .value
  .toLowerCase();

  const select =
  document.getElementById(
    "studentSelect"
  );

  select.innerHTML = "";

  getAllStudents()

  .filter(student =>

    student
    .toLowerCase()
    .includes(value)

  )

  .forEach(student => {

    const option =
    document.createElement("option");

    option.value = student;
    option.textContent = student;

    select.appendChild(option);

  });

}

/* ==========================
   ADD STUDENT
========================== */

function addStudent(){

  const cls =
  document.getElementById(
    "addStudentClass"
  ).value;

  const name =
  document.getElementById(
    "newStudentName"
  ).value.trim();

  if(name === ""){

    alert("Enter Student Name");

    return;

  }

  schoolData[cls].push(name);

  saveSchoolData();

  loadStudents();

  displayStudents();

  document.getElementById(
    "newStudentName"
  ).value = "";

  alert("Student Added");

}

/* ==========================
   LOAD REMOVE STUDENTS
========================== */

function loadRemoveStudents(){

  const cls =
  document.getElementById(
    "removeClass"
  ).value;

  const select =
  document.getElementById(
    "removeStudentSelect"
  );

  select.innerHTML = "";

  schoolData[cls]
  .forEach(student => {

    const option =
    document.createElement("option");

    option.value = student;
    option.textContent = student;

    select.appendChild(option);

  });

}

/* ==========================
   REMOVE STUDENT
========================== */

function removeStudent(){

  const cls =
  document.getElementById(
    "removeClass"
  ).value;

  const student =
  document.getElementById(
    "removeStudentSelect"
  ).value;

  schoolData[cls] =
  schoolData[cls].filter(

    name => name !== student

  );

  saveSchoolData();

  loadStudents();

  loadRemoveStudents();

  displayStudents();

  alert("Student Removed");

}

/* ==========================
   DISPLAY STUDENTS
========================== */

function displayStudents(){

  const container =
  document.getElementById(
    "studentList"
  );

  container.innerHTML = "";

  Object.keys(schoolData)
  .forEach(cls => {

    const title =
    document.createElement("h4");

    title.textContent = cls;

    container.appendChild(title);

    schoolData[cls]
    .forEach(student => {

      const row =
      document.createElement("div");

      row.className =
      "student-row";

      row.textContent =
      student;

      container.appendChild(row);

    });

  });

}

/* ==========================
   INITIALIZE SYSTEM
========================== */

function initializeSystem(){

  loadStudents();

  displayStudents();

  loadRemoveStudents();

  document
  .getElementById("removeClass")
  .addEventListener(
    "change",
    loadRemoveStudents
  );

}
/* ==========================
   IMAGE PREVIEW
========================== */

const studentImage =
document.getElementById(
  "studentImage"
);

if(studentImage){

  studentImage.addEventListener(
    "change",
    function(event){

      const file =
      event.target.files[0];

      if(!file) return;

      const reader =
      new FileReader();

      reader.onload =
      function(e){

        document.getElementById(
          "reportPreviewImage"
        ).src =
        e.target.result;

      };

      reader.readAsDataURL(file);

    }
  );

}

/* ==========================
   STUDENT REPORT PDF
========================== */

async function generateStudentReportPDF(){

  document.getElementById(
    "reportPreviewName"
  ).innerText =
  document.getElementById(
    "studentSelect"
  ).value;

  document.getElementById(
    "reportPreviewAcademic"
  ).innerText =
  "Academic: " +
  document.getElementById(
    "academic"
  ).value +
  "/10";

  document.getElementById(
    "reportPreviewCharacter"
  ).innerText =
  "Character: " +
  document.getElementById(
    "character"
  ).value +
  "/10";

  document.getElementById(
    "reportPreviewRespect"
  ).innerText =
  "Respect: " +
  document.getElementById(
    "respect"
  ).value +
  "/10";

  document.getElementById(
    "reportPreviewRemark"
  ).innerText =
  "Remark: " +
  document.getElementById(
    "remark"
  ).value;

  document.getElementById(
    "reportPreviewDate"
  ).innerText =
  new Date().toLocaleString();

  const element =
  document.getElementById(
    "studentReportPDF"
  );

  const canvas =
  await html2canvas(
    element
  );

  const imgData =
  canvas.toDataURL(
    "image/png"
  );

  const { jsPDF } =
  window.jspdf;

  const pdf =
  new jsPDF();

  pdf.addImage(
    imgData,
    "PNG",
    10,
    10,
    190,
    0
  );

  pdf.save(
    "student-report.pdf"
  );

}

/* ==========================
   STUDENT NOTE PDF
========================== */

async function generateStudentNotePDF(){

  document.getElementById(
    "notePreviewTitle"
  ).innerText =
  document.getElementById(
    "noteTitle"
  ).value;

  document.getElementById(
    "notePreviewStudent"
  ).innerText =
  "Student: " +
  document.getElementById(
    "noteStudent"
  ).value;

  document.getElementById(
    "notePreviewText"
  ).innerText =
  document.getElementById(
    "noteText"
  ).value;

  document.getElementById(
    "notePreviewDate"
  ).innerText =
  new Date().toLocaleString();

  const element =
  document.getElementById(
    "studentNotePDF"
  );

  const canvas =
  await html2canvas(
    element
  );

  const imgData =
  canvas.toDataURL(
    "image/png"
  );

  const { jsPDF } =
  window.jspdf;

  const pdf =
  new jsPDF();

  pdf.addImage(
    imgData,
    "PNG",
    10,
    10,
    190,
    0
  );

  pdf.save(
    "student-note.pdf"
  );

}

/* ==========================
   STUDENT ACTIVITIES
========================== */

let activities = [];

/* ==========================
   ADD ACTIVITY QUESTION
========================== */

function addActivityQuestion(){

  const input =
  document.getElementById(
    "questionInput"
  );

  const value =
  input.value.trim();

  if(value === ""){

    alert(
      "Enter a question or activity"
    );

    return;

  }

  activities.push(
    value
  );

  renderActivities();

  input.value = "";

}

/* ==========================
   DISPLAY ACTIVITIES
========================== */

function renderActivities(){

  const container =
  document.getElementById(
    "activityList"
  );

  container.innerHTML = "";

  activities.forEach(
    (question,index)=>{

      const div =
      document.createElement(
        "div"
      );

      div.className =
      "activity-item";

      div.innerHTML =
      "<strong>" +
      (index + 1) +
      ".</strong> " +
      question;

      container.appendChild(
        div
      );

    }
  );

}

/* ==========================
   ACTIVITIES PDF
========================== */

async function generateActivityPDF(){

  document.getElementById(
    "activityStudentPreview"
  ).innerText =
  "Student: " +
  document.getElementById(
    "activityStudent"
  ).value;

  document.getElementById(
    "activityClassPreview"
  ).innerText =
  "Class: " +
  document.getElementById(
    "activityClass"
  ).value;

  document.getElementById(
    "activitySubjectPreview"
  ).innerText =
  "Subject: " +
  document.getElementById(
    "subject"
  ).value;

  document.getElementById(
    "activityTutorPreview"
  ).innerText =
  "Tutor: " +
  document.getElementById(
    "tutor"
  ).value;

  document.getElementById(
    "activityFrequencyPreview"
  ).innerText =
  "Frequency: " +
  document.getElementById(
    "frequency"
  ).value;

  const preview =
  document.getElementById(
    "activityQuestionsPreview"
  );

  preview.innerHTML = "";

  activities.forEach(
    (question,index)=>{

      const p =
      document.createElement(
        "p"
      );

      p.innerText =
      (index + 1) +
      ". " +
      question;

      preview.appendChild(
        p
      );

    }
  );

  document.getElementById(
    "activityDatePreview"
  ).innerText =
  new Date().toLocaleString();

  const element =
  document.getElementById(
    "activityPDF"
  );

  const canvas =
  await html2canvas(
    element
  );

  const imgData =
  canvas.toDataURL(
    "image/png"
  );

  const { jsPDF } =
  window.jspdf;

  const pdf =
  new jsPDF();

  pdf.addImage(
    imgData,
    "PNG",
    10,
    10,
    190,
    0
  );

  pdf.save(
    "student-activities.pdf"
  );

}

/* ==========================
   WHATSAPP
========================== */

function sendStudentReportWhatsApp(){

  const msg =
  "Student Report PDF generated successfully. Attach the downloaded PDF manually.";

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
  );

}

function sendStudentNoteWhatsApp(){

  const msg =
  "Student Note PDF generated successfully. Attach the downloaded PDF manually.";

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
  );

}

function sendActivityWhatsApp(){

  const msg =
  "Student Activities PDF generated successfully. Attach the downloaded PDF manually.";

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
  );

}
