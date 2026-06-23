/* =====================================
AL HIKMOH HOSTEL MANAGEMENT SYSTEM
APP.JS - PART 1
LOGIN + MENU + STORAGE
===================================== */

/* =====================================
LOGIN SYSTEM
===================================== */

const PASSWORD = "easy001";

function login() {

  const password =
    document.getElementById("password").value.trim();

  if (password === PASSWORD) {

    localStorage.setItem(
      "hostelLoggedIn",
      "true"
    );

    document.getElementById(
      "loginPage"
    ).style.display = "none";

    document.getElementById(
      "app"
    ).style.display = "block";

  } else {

    alert("Incorrect Password");

  }

}

function logout() {

  localStorage.removeItem(
    "hostelLoggedIn"
  );

  location.reload();

}

/* =====================================
AUTO LOGIN
===================================== */

window.addEventListener(
  "load",
  function () {

    if (
      localStorage.getItem(
        "hostelLoggedIn"
      ) === "true"
    ) {

      document.getElementById(
        "loginPage"
      ).style.display = "none";

      document.getElementById(
        "app"
      ).style.display = "block";

    }

  }
);

/* =====================================
MENU SYSTEM
===================================== */

function toggleMenu() {

  const menu =
    document.getElementById("menu");

  if (!menu) return;

  if (menu.style.display === "block") {

    menu.style.display = "none";

  } else {

    menu.style.display = "block";

  }

}

function showSection(sectionId) {

  document
    .querySelectorAll(".section")
    .forEach(function (section) {

      section.style.display = "none";

    });

  const current =
    document.getElementById(sectionId);

  if (current) {

    current.style.display = "block";

  }

  const menu =
    document.getElementById("menu");

  if (menu) {

    menu.style.display = "none";

  }

}

/* =====================================
LOCAL STORAGE
===================================== */

let students =
  JSON.parse(
    localStorage.getItem("students")
  );

if (!Array.isArray(students)) {

  students = [];

}

let subjects =
  JSON.parse(
    localStorage.getItem("subjects")
  );

if (!Array.isArray(subjects)) {

  subjects = [

    "Mathematics",
    "English Language",
    "Basic Science",
    "Computer Studies",
    "Social Studies",
    "Civic Education",
    "History",
    "Arabic Language",
    "French",
    "Agricultural Science"

  ];

}

let reportHistory =
  JSON.parse(
    localStorage.getItem("reportHistory")
  );

if (!Array.isArray(reportHistory)) {

  reportHistory = [];

}

/* =====================================
SAVE DATA
===================================== */

function saveData() {

  localStorage.setItem(
    "students",
    JSON.stringify(students)
  );

  localStorage.setItem(
    "subjects",
    JSON.stringify(subjects)
  );

  localStorage.setItem(
    "reportHistory",
    JSON.stringify(reportHistory)
  );

}

/* =====================================
DASHBOARD
===================================== */

function updateDashboard() {

  const totalStudents =
    document.getElementById(
      "totalStudents"
    );

  const totalSubjects =
    document.getElementById(
      "totalSubjects"
    );

  const totalReports =
    document.getElementById(
      "totalReports"
    );

  if (totalStudents) {

    totalStudents.textContent =
      students.length;

  }

  if (totalSubjects) {

    totalSubjects.textContent =
      subjects.length;

  }

  if (totalReports) {

    totalReports.textContent =
      reportHistory.length;

  }

}

/* =====================================
END OF PART 1
===================================== */
/* =====================================
APP.JS - PART 2
STUDENT MANAGEMENT
SUBJECT MANAGEMENT
===================================== */

/* =====================================
CREATE STUDENT OBJECT
===================================== */

function createStudentObject() {

  return {

    id: Date.now(),

    name:
      document.getElementById(
        "newStudentName"
      ).value.trim(),

    class:
      document.getElementById(
        "addStudentClass"
      ).value,

    age:
      document.getElementById(
        "studentAge"
      ).value,

    parentName:
      document.getElementById(
        "parentName"
      ).value.trim(),

    parentPhone:
      document.getElementById(
        "parentPhone"
      ).value.trim()

  };

}

/* =====================================
ADD STUDENT
===================================== */

function addStudent() {

  const student =
    createStudentObject();

  if (!student.name) {

    alert(
      "Enter Student Name"
    );

    return;

  }

  students.push(student);

  saveData();

  clearStudentForm();

  loadStudents();

  updateStudentList();

  updateDashboard();

  alert(
    "Student Added Successfully"
  );

}

/* =====================================
CLEAR STUDENT FORM
===================================== */

function clearStudentForm() {

  document.getElementById(
    "newStudentName"
  ).value = "";

  document.getElementById(
    "studentAge"
  ).value = "";

  document.getElementById(
    "parentName"
  ).value = "";

  document.getElementById(
    "parentPhone"
  ).value = "";

}

/* =====================================
LOAD STUDENTS
===================================== */

function loadStudents() {

  const selectIds = [

    "studentSelect",
    "noteStudent",
    "activityStudent",
    "progressStudent"

  ];

  selectIds.forEach(function(id) {

    const select =
      document.getElementById(id);

    if (!select) return;

    select.innerHTML = "";

    students.forEach(function(student) {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        student.id;

      option.textContent =
        student.name +
        " (" +
        student.class +
        ")";

      select.appendChild(
        option
      );

    });

  });

  loadRemoveStudents();

}

/* =====================================
UPDATE STUDENT LIST
===================================== */

function updateStudentList() {

  const container =
    document.getElementById(
      "studentList"
    );

  if (!container) return;

  container.innerHTML = "";

  students.forEach(function(student) {

    const card =
      document.createElement(
        "div"
      );

    card.className =
      "student-row";

    card.innerHTML =

      "<strong>" +
      student.name +
      "</strong><br>" +

      "Class: " +
      student.class +
      "<br>" +

      "Age: " +
      student.age +
      "<br>" +

      "Parent: " +
      student.parentName +
      "<br>" +

      "Phone: " +
      student.parentPhone;

    container.appendChild(
      card
    );

  });

}

/* =====================================
SEARCH STUDENTS
===================================== */

function filterStudents() {

  const keyword =
    document.getElementById(
      "searchStudent"
    ).value.toLowerCase();

  const select =
    document.getElementById(
      "studentSelect"
    );

  if (!select) return;

  Array.from(
    select.options
  ).forEach(function(option) {

    option.style.display =

      option.textContent
        .toLowerCase()
        .includes(keyword)

      ? ""

      : "none";

  });

}

/* =====================================
LOAD REMOVE STUDENTS
===================================== */

function loadRemoveStudents() {

  const select =
    document.getElementById(
      "removeStudentSelect"
    );

  if (!select) return;

  const className =
    document.getElementById(
      "removeClass"
    )?.value;

  select.innerHTML = "";

  students
    .filter(function(student) {

      return (
        !className ||
        student.class === className
      );

    })
    .forEach(function(student) {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        student.id;

      option.textContent =
        student.name;

      select.appendChild(
        option
      );

    });

}

/* =====================================
REMOVE STUDENT
===================================== */

function removeStudent() {

  const studentId =
    Number(
      document.getElementById(
        "removeStudentSelect"
      ).value
    );

  students =
    students.filter(function(student) {

      return (
        student.id !== studentId
      );

    });

  saveData();

  loadStudents();

  updateStudentList();

  updateDashboard();

  alert(
    "Student Removed"
  );

}

/* =====================================
REMOVE CLASS FILTER
===================================== */

document.addEventListener(
  "change",
  function(event) {

    if (
      event.target.id ===
      "removeClass"
    ) {

      loadRemoveStudents();

    }

  }
);

/* =====================================
LOAD SUBJECTS
===================================== */

function loadSubjects() {

  const container =
    document.getElementById(
      "subjectContainer"
    );

  const subjectList =
    document.getElementById(
      "subjectList"
    );

  const removeSelect =
    document.getElementById(
      "removeSubjectSelect"
    );

  if (container) {

    container.innerHTML = "";

    subjects.forEach(function(subject) {

      const div =
        document.createElement(
          "div"
        );

      div.className =
        "subject-item";

      div.innerHTML =

        "<label>" +
        subject +
        "</label>" +

        '<input type="number" class="subject-score" value="0" min="0" max="100" data-subject="' +
        subject +
        '">';

      container.appendChild(
        div
      );

    });

  }

  if (subjectList) {

    subjectList.innerHTML = "";

    subjects.forEach(function(subject) {

      const div =
        document.createElement(
          "div"
        );

      div.className =
        "subject-row";

      div.textContent =
        subject;

      subjectList.appendChild(
        div
      );

    });

  }

  if (removeSelect) {

    removeSelect.innerHTML = "";

    subjects.forEach(function(subject) {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        subject;

      option.textContent =
        subject;

      removeSelect.appendChild(
        option
      );

    });

  }

}

/* =====================================
ADD SUBJECT
===================================== */

function addSubject() {

  const subject =
    document.getElementById(
      "newSubject"
    ).value.trim();

  if (!subject) {

    alert(
      "Enter Subject Name"
    );

    return;

  }

  subjects.push(subject);

  saveData();

  loadSubjects();

  updateDashboard();

  document.getElementById(
    "newSubject"
  ).value = "";

}

/* =====================================
REMOVE SUBJECT
===================================== */

function removeSubject() {

  const subject =
    document.getElementById(
      "removeSubjectSelect"
    ).value;

  subjects =
    subjects.filter(function(item) {

      return item !== subject;

    });

  saveData();

  loadSubjects();

  updateDashboard();

}

/* =====================================
END OF PART 2
===================================== */
/* =====================================
APP.JS - PART 3A
REPORT CALCULATION
IMAGE HANDLING
===================================== */

/* =====================================
REPORT IMAGE
===================================== */

let selectedImage = "image.png";

/* =====================================
IMAGE UPLOAD
===================================== */

const studentImageInput =
  document.getElementById(
    "studentImage"
  );

if (studentImageInput) {

  studentImageInput.addEventListener(
    "change",
    function(event) {

      const file =
        event.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onload =
        function(e) {

          selectedImage =
            e.target.result;

          const preview =
            document.getElementById(
              "reportPreviewImage"
            );

          if (preview) {

            preview.src =
              selectedImage;

          }

        };

      reader.readAsDataURL(
        file
      );

    }
  );

}

/* =====================================
GET STUDENT BY ID
===================================== */

function getStudentById(id) {

  return students.find(
    function(student) {

      return (
        student.id === Number(id)
      );

    }
  );

}

/* =====================================
CURRENT STUDENT
===================================== */

function getCurrentStudent() {

  const select =
    document.getElementById(
      "studentSelect"
    );

  if (!select) return null;

  return getStudentById(
    select.value
  );

}

/* =====================================
CALCULATE REPORT
===================================== */

function calculateReport() {

  const scores =
    document.querySelectorAll(
      ".subject-score"
    );

  let total = 0;

  scores.forEach(function(input) {

    total += Number(
      input.value || 0
    );

  });

  const academicAverage =

    scores.length > 0

    ?

    total / scores.length

    :

    0;

  const character =
    Number(
      document.getElementById(
        "character"
      )?.value || 0
    );

  const respect =
    Number(
      document.getElementById(
        "respect"
      )?.value || 0
    );

  const discipline =
    Number(
      document.getElementById(
        "discipline"
      )?.value || 0
    );

  const neatness =
    Number(
      document.getElementById(
        "neatness"
      )?.value || 0
    );

  const punctuality =
    Number(
      document.getElementById(
        "punctuality"
      )?.value || 0
    );

  const characterAverage =

    (
      character +
      respect +
      discipline +
      neatness +
      punctuality
    ) / 5;

  const overall =

    (
      academicAverage +
      characterAverage
    ) / 2;

  let grade = "F";

  if (overall >= 70) {

    grade = "A";

  } else if (overall >= 60) {

    grade = "B";

  } else if (overall >= 50) {

    grade = "C";

  } else if (overall >= 45) {

    grade = "D";

  } else if (overall >= 40) {

    grade = "E";

  }

  const academicEl =
    document.getElementById(
      "academicAverage"
    );

  const characterEl =
    document.getElementById(
      "characterAverage"
    );

  const overallEl =
    document.getElementById(
      "overallPercentage"
    );

  const gradeEl =
    document.getElementById(
      "grade"
    );

  if (academicEl) {

    academicEl.textContent =
      academicAverage.toFixed(1) + "%";

  }

  if (characterEl) {

    characterEl.textContent =
      characterAverage.toFixed(1) + "%";

  }

  if (overallEl) {

    overallEl.textContent =
      overall.toFixed(1) + "%";

  }

  if (gradeEl) {

    gradeEl.textContent =
      grade;

  }

  return {

    academicAverage,
    characterAverage,
    overall,
    grade

  };

}

/* =====================================
AUTO CALCULATE
===================================== */

document.addEventListener(
  "input",
  function() {

    calculateReport();

  }
);

/* =====================================
END OF PART 3A
===================================== */
/* =====================================
APP.JS - PART 3B
REPORT PDF
===================================== */

/* =====================================
BUILD SUBJECT LIST
===================================== */

function buildSubjectTable() {

  let html = "";

  const scores =
    document.querySelectorAll(
      ".subject-score"
    );

  scores.forEach(function(input) {

    html +=
      "<p><strong>" +
      input.dataset.subject +
      ":</strong> " +
      input.value +
      "</p>";

  });

  return html;

}

/* =====================================
POPULATE REPORT PREVIEW
===================================== */

function populateReportPreview() {

  const student = getCurrentStudent();

  if (!student) {
    alert("Select a student");
    return false;
  }

  const report = calculateReport();

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value;
    }
  }

  // Student details
  setText("reportPreviewName", student.name);
  setText("reportPreviewClass", "Class: " + student.class);
  setText("reportPreviewAge", "Age: " + student.age);
  setText("reportPreviewParent", "Parent: " + student.parentName);
  setText("reportPreviewPhone", "Phone: " + student.parentPhone);

  // Term
  const term = document.getElementById("term");
  setText(
    "reportPreviewTerm",
    "Term: " + (term ? term.value : "")
  );

  // Summary
  setText(
    "reportPreviewAcademicAverage",
    "Academic Average: " +
      report.academicAverage.toFixed(1) +
      "%"
  );

  setText(
    "reportPreviewCharacterAverage",
    "Character Average: " +
      report.characterAverage.toFixed(1) +
      "%"
  );

  setText(
    "reportPreviewOverall",
    "Overall: " +
      report.overall.toFixed(1) +
      "%"
  );

  setText(
    "reportPreviewGrade",
    "Grade: " + report.grade
  );

  // Hostel Master Remark
  const remark =
    document.getElementById("remark");

  setText(
    "reportPreviewRemark",
    remark ? remark.value : ""
  );

  // Date
  setText(
    "reportPreviewDate",
    "Generated: " +
      new Date().toLocaleDateString()
  );

  // Behaviour Assessment
  const behaviour =
    document.getElementById(
      "behaviourSummary"
    );

  if (behaviour) {

    const character =
      document.getElementById("character")?.value || 0;

    const respect =
      document.getElementById("respect")?.value || 0;

    const discipline =
      document.getElementById("discipline")?.value || 0;

    const neatness =
      document.getElementById("neatness")?.value || 0;

    const punctuality =
      document.getElementById("punctuality")?.value || 0;

    behaviour.innerHTML =
      "<p>Character: " + character + "</p>" +
      "<p>Respect: " + respect + "</p>" +
      "<p>Discipline: " + discipline + "</p>" +
      "<p>Neatness: " + neatness + "</p>" +
      "<p>Punctuality: " + punctuality + "</p>";
  }

  // Subjects table
  const table =
    document.getElementById(
      "reportPreviewSubjects"
    );

  if (table) {
    table.innerHTML =
      buildSubjectTable();
  }

  return true;

}
/* =====================================
CREATE MULTI PAGE PDF
===================================== */

async function createMultiPagePDF(elementId, fileName) {

  const element = document.getElementById(elementId);

  if (!element) {
    alert("Preview not found");
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new window.jspdf.jsPDF(
    "p",
    "mm",
    "a4"
  );

  const pageWidth = 210;
  const pageHeight = 297;

  const margin = 10;

  const imgWidth = pageWidth - (margin * 2);
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = margin;

  pdf.addImage(
    imgData,
    "PNG",
    margin,
    position,
    imgWidth,
    imgHeight
  );

  heightLeft -= (pageHeight - margin * 2);

  while (heightLeft > 0) {

    position = heightLeft - imgHeight + margin;

    pdf.addPage();

    pdf.addImage(
      imgData,
      "PNG",
      margin,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= (pageHeight - margin * 2);

  }

  pdf.save(fileName);

}
/* =====================================
GENERATE STUDENT REPORT PDF
===================================== */

async function generateStudentReportPDF() {

  const ok =
    populateReportPreview();

  if (!ok) {

    return;

  }

  const student =
    getCurrentStudent();

  await createMultiPagePDF(

    "studentReportPDF",

    student.name +
    "_Report.pdf"

  );

}
/* =====================================
APP.JS - PART 3C
STUDENT NOTE
ACTIVITIES
WHATSAPP
===================================== */

/* =====================================
STUDENT NOTE PDF
===================================== */

async function generateStudentNotePDF() {

  const title =
    document.getElementById("noteTitle");

  const student =
    document.getElementById("noteStudent");

  const category =
    document.getElementById("noteCategory");

  const text =
    document.getElementById("noteText");

  if (document.getElementById("notePreviewTitle")) {
    document.getElementById("notePreviewTitle").textContent =
      title ? title.value : "";
  }

  if (document.getElementById("notePreviewStudent")) {
    document.getElementById("notePreviewStudent").textContent =
      student && student.selectedOptions.length
        ? student.selectedOptions[0].textContent
        : "";
  }

  if (document.getElementById("notePreviewCategory")) {
    document.getElementById("notePreviewCategory").textContent =
      category ? category.value : "";
  }

  if (document.getElementById("notePreviewText")) {
    document.getElementById("notePreviewText").textContent =
      text ? text.value : "";
  }

  if (document.getElementById("notePreviewDate")) {
    document.getElementById("notePreviewDate").textContent =
      new Date().toLocaleDateString();
  }

  await createMultiPagePDF(
    "studentNotePDF",
    "Student_Note.pdf"
  );

}

/* =====================================
ACTIVITY STORAGE
===================================== */

let activityQuestions = [];

/* =====================================
ADD ACTIVITY QUESTION
===================================== */

function addActivityQuestion() {

  const input =
    document.getElementById("questionInput");

  if (!input) {
    return;
  }

  const value =
    input.value.trim();

  if (value === "") {
    return;
  }

  activityQuestions.push(value);

  input.value = "";

  renderActivities();

}

/* =====================================
RENDER ACTIVITY LIST
===================================== */

function renderActivities() {

  const list =
    document.getElementById("activityList");

  if (!list) {
    return;
  }

  list.innerHTML = "";

  activityQuestions.forEach(function (question, index) {

    const div =
      document.createElement("div");

    div.className =
      "activity-item";

    div.textContent =
      (index + 1) + ". " + question;

    list.appendChild(div);

  });

}

/* =====================================
GENERATE ACTIVITY PDF
===================================== */

async function generateActivityPDF() {

  const student =
    document.getElementById("activityStudent");

  const preview =
    document.getElementById("activityQuestionsPreview");

  if (document.getElementById("activityStudentPreview")) {

    document.getElementById(
      "activityStudentPreview"
    ).textContent =
      student &&
      student.selectedOptions.length
        ? student.selectedOptions[0].textContent
        : "";

  }

  if (preview) {

    preview.innerHTML = "";

    activityQuestions.forEach(function (question, index) {

      const p =
        document.createElement("p");

      p.textContent =
        (index + 1) + ". " + question;

      preview.appendChild(p);

    });

  }

  if (document.getElementById("activityDatePreview")) {

    document.getElementById(
      "activityDatePreview"
    ).textContent =
      new Date().toLocaleDateString();

  }

  await createMultiPagePDF(
    "activityPDF",
    "Student_Activities.pdf"
  );

}

/* =====================================
WHATSAPP PLACEHOLDERS
===================================== */

function sendStudentReportWhatsApp() {

  window.open(
    "https://wa.me/",
    "_blank"
  );

}

function sendStudentNoteWhatsApp() {

  window.open(
    "https://wa.me/",
    "_blank"
  );

}

function sendActivityWhatsApp() {

  window.open(
    "https://wa.me/",
    "_blank"
  );

}

function sendProgressWhatsApp() {

  window.open(
    "https://wa.me/",
    "_blank"
  );

}

/* =====================================
END OF PART 3C
===================================== */
/* =====================================
APP.JS - PART 3D
PROGRESS REPORT
REPORT HISTORY
STARTUP
===================================== */

/* =====================================
GENERATE PROGRESS PDF
===================================== */

async function generateProgressPDF() {

  const student = getCurrentStudent();

  if (!student) {
    alert("Please select a student.");
    return;
  }

  document.getElementById("progressPreviewStudent").textContent =
    student.name;

  document.getElementById("progressPreviewClass").textContent =
    student.class;

  document.getElementById("progressPreviewAge").textContent =
    student.age;

  document.getElementById("progressPreviewParent").textContent =
    student.parentName;

  document.getElementById("progressPreviewPhone").textContent =
    student.parentPhone;

  document.getElementById("progressPreviewJoined").textContent =
    document.getElementById("joinedDate")?.value || "";

  document.getElementById("progressPreviewInitial").textContent =
    document.getElementById("initialPerformance")?.value || "";

  document.getElementById("progressPreviewCurrent").textContent =
    document.getElementById("currentPerformance")?.value || "";

  document.getElementById("progressPreviewAchievements").textContent =
    document.getElementById("achievements")?.value || "";

  document.getElementById("progressPreviewImprovement").textContent =
    document.getElementById("improvementAreas")?.value || "";

  document.getElementById("progressPreviewTeacher").textContent =
    document.getElementById("teacherComment")?.value || "";

  document.getElementById("progressPreviewHostel").textContent =
    document.getElementById("hostelComment")?.value || "";

  document.getElementById("progressPreviewDate").textContent =
    new Date().toLocaleDateString();

  await createMultiPagePDF(
    "progressPDF",
    student.name + "_Progress.pdf"
  );

}
/* =====================================
REPORT HISTORY
===================================== */

function loadReportHistory() {

  const container =
    document.getElementById(
      "reportHistoryList"
    );

  if (!container) {
    return;
  }

  container.innerHTML = "";

  if (reportHistory.length === 0) {

    container.innerHTML =
      "<p>No reports generated yet.</p>";

    return;

  }

  reportHistory
    .slice()
    .reverse()
    .forEach(function(item) {

      const div =
        document.createElement("div");

      div.className =
        "pdf-card";

      div.innerHTML =
        "<strong>" +
        item.type +
        "</strong><br>" +
        item.student +
        "<br>" +
        item.date;

      container.appendChild(div);

    });

}

/* =====================================
ADD REPORT HISTORY
===================================== */

function addReportHistory(type, student) {

  reportHistory.push({

    type: type,

    student: student,

    date:
      new Date().toLocaleString()

  });

  saveData();

  updateDashboard();

  loadReportHistory();

}

/* =====================================
SYSTEM STARTUP
===================================== */

window.addEventListener(
  "load",
  function() {

    loadStudents();

    loadSubjects();

    updateStudentList();

    updateDashboard();

    loadReportHistory();

  }
);

/* =====================================
END OF PART 3D
===================================== */
