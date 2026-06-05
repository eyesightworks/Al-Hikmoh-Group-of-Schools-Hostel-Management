/* ==========================
   LOGIN SYSTEM
========================== */

const PASSWORD = "easy001";

function login(){

  const password =
  document.getElementById("password").value;

  if(password === PASSWORD){

    document.getElementById("loginPage")
    .style.display = "none";

    document.getElementById("app")
    .style.display = "block";

    localStorage.setItem(
      "hostelLoggedIn",
      "true"
    );

  }else{

    alert("Wrong Password");

  }

}

function logout(){

  localStorage.removeItem(
    "hostelLoggedIn"
  );

  location.reload();

}

window.onload = function(){

  if(
    localStorage.getItem(
      "hostelLoggedIn"
    ) === "true"
  ){

    document.getElementById(
      "loginPage"
    ).style.display = "none";

    document.getElementById(
      "app"
    ).style.display = "block";

  }

};

/* ==========================
   MENU
========================== */

function toggleMenu(){

  const menu =
  document.getElementById("menu");

  if(menu.style.display === "block"){

    menu.style.display = "none";

  }else{

    menu.style.display = "block";

  }

}

/* ==========================
   SECTION SWITCHING
========================== */

function showSection(sectionId){

  const sections =
  document.querySelectorAll(".section");

  sections.forEach(section=>{

    section.style.display="none";

  });

  document.getElementById(
    sectionId
  ).style.display="block";

  document.getElementById(
    "menu"
  ).style.display="none";

}

/* ==========================
   DEFAULT STUDENTS
========================== */

let students = JSON.parse(
  localStorage.getItem("students")
) || {

  "SS3":[],

  "SS2":[],

  "SS1":[
    "Adeyemi Muaz",
    "Adeboye Abdul Warith"
  ],

  "JSS3":[
    "Adejumo Habib",
    "Faroq Kazeem",
    "Abdulmalik Taiwo"
  ],

  "JSS2":[
    "Nafiu Hassan",
    "Bello Muhammed",
    "Fadlullah Jimoh"
  ],

  "JSS1":[
    "AbdulRazaq",
    "Afolabi Mustapha",
    "Adeboye Jubreel"
  ],

  "Primary 5":[],

  "Primary 4":[],

  "Primary 3":[],

  "Primary 2":[],

  "Primary 1":[]

};

/* ==========================
   DEFAULT SUBJECTS
========================== */

let subjects = JSON.parse(
  localStorage.getItem("subjects")
) || [

  "Mathematics",

  "English Language",

  "Basic Science",

  "Basic Technology",

  "Computer Studies",

  "Physical & Health Education",

  "Social Studies",

  "Civic Education",

  "History",

  "Yoruba Language",

  "Arabic Language",

  "Security Education",

  "Phonics",

  "French",

  "Islamic Religious Studies",

  "Quantitative Reasoning",

  "Verbal Reasoning",

  "Vocational Studies",

  "Agricultural Science",

  "Home Economics",

  "Creative Arts",

  "Literature",

  "Hadith",

  "Quran Memorization",

  "Tajweed"

];

localStorage.setItem(
  "students",
  JSON.stringify(students)
);

localStorage.setItem(
  "subjects",
  JSON.stringify(subjects)
);
/* ==========================
   LOAD STUDENTS
========================== */

function loadStudents(){

  const studentSelect =
  document.getElementById(
    "studentSelect"
  );

  const noteStudent =
  document.getElementById(
    "noteStudent"
  );

  const activityStudent =
  document.getElementById(
    "activityStudent"
  );

const progressStudent =
document.getElementById(
  "progressStudent"
);
   
  const removeStudentSelect =
  document.getElementById(
    "removeStudentSelect"
  );

  if(studentSelect)
  studentSelect.innerHTML="";

  if(noteStudent)
  noteStudent.innerHTML="";

  if(activityStudent)
  activityStudent.innerHTML="";

  if(removeStudentSelect)
  removeStudentSelect.innerHTML="";

  Object.keys(students)
  .forEach(className=>{

    students[className]
    .forEach(student=>{

      const option =
      document.createElement(
        "option"
      );

      option.value =
      student;

      option.textContent =
      `${student} (${className})`;

      if(studentSelect)
      studentSelect.appendChild(
        option.cloneNode(true)
      );

      if(noteStudent)
      noteStudent.appendChild(
        option.cloneNode(true)
      );

      if(activityStudent)
      activityStudent.appendChild(
        option.cloneNode(true)
      );
      if(progressStudent)
     progressStudent.appendChild(
      option.cloneNode(true)
);
    });

  });

  updateStudentList();

  updateDashboard();

}

/* ==========================
   SEARCH STUDENT
========================== */

function filterStudents(){

  const search =
  document.getElementById(
    "searchStudent"
  ).value.toLowerCase();

  const select =
  document.getElementById(
    "studentSelect"
  );

  const options =
  select.options;

  for(let i=0;i<options.length;i++){

    const text =
    options[i].text.toLowerCase();

    if(
      text.includes(search)
    ){

      options[i].style.display="";

    }else{

      options[i].style.display="none";

    }

  }

}

/* ==========================
   ADD STUDENT
========================== */

function addStudent(){

  const className =
  document.getElementById(
    "addStudentClass"
  ).value;

  const studentName =
  document.getElementById(
    "newStudentName"
  ).value.trim();

  if(studentName===""){

    alert(
      "Enter Student Name"
    );

    return;

  }

  students[className]
  .push(studentName);

  localStorage.setItem(
    "students",
    JSON.stringify(students)
  );

  document.getElementById(
    "newStudentName"
  ).value="";

  loadStudents();

  alert(
    "Student Added"
  );

}

/* ==========================
   REMOVE STUDENT
========================== */

function updateRemoveStudents(){

  const className =
  document.getElementById(
    "removeClass"
  ).value;

  const removeSelect =
  document.getElementById(
    "removeStudentSelect"
  );

  removeSelect.innerHTML="";

  students[className]
  .forEach(student=>{

    const option =
    document.createElement(
      "option"
    );

    option.value=student;

    option.textContent=
    student;

    removeSelect.appendChild(
      option
    );

  });

}

function removeStudent(){

  const className =
  document.getElementById(
    "removeClass"
  ).value;

  const studentName =
  document.getElementById(
    "removeStudentSelect"
  ).value;

  students[className] =
  students[className]
  .filter(
    student =>
    student !== studentName
  );

  localStorage.setItem(
    "students",
    JSON.stringify(students)
  );

  updateRemoveStudents();

  loadStudents();

  alert(
    "Student Removed"
  );

}

document.addEventListener(
  "change",
  function(e){

    if(
      e.target.id ===
      "removeClass"
    ){

      updateRemoveStudents();

    }

  }
);

/* ==========================
   STUDENT LIST
========================== */

function updateStudentList(){

  const studentList =
  document.getElementById(
    "studentList"
  );

  if(!studentList) return;

  studentList.innerHTML="";

  Object.keys(students)
  .forEach(className=>{

    const title =
    document.createElement(
      "h4"
    );

    title.textContent =
    className;

    studentList.appendChild(
      title
    );

    students[className]
    .forEach(student=>{

      const div =
      document.createElement(
        "div"
      );

      div.className =
      "student-row";

      div.textContent =
      student;

      studentList.appendChild(
        div
      );

    });

  });

}

/* ==========================
   DASHBOARD
========================== */

function updateDashboard(){

  let total = 0;

  Object.values(students)
  .forEach(classArray=>{

    total +=
    classArray.length;

  });

  const totalStudents =
  document.getElementById(
    "totalStudents"
  );

  if(totalStudents){

    totalStudents.textContent =
    total;

  }

  const totalSubjects =
  document.getElementById(
    "totalSubjects"
  );

  if(totalSubjects){

    totalSubjects.textContent =
    subjects.length;

  }

}
/* ==========================
   SUBJECT MANAGEMENT
========================== */

function loadSubjects(){

  const subjectContainer =
  document.getElementById(
    "subjectContainer"
  );

  const subjectList =
  document.getElementById(
    "subjectList"
  );

  const removeSubjectSelect =
  document.getElementById(
    "removeSubjectSelect"
  );

  if(subjectContainer){

    subjectContainer.innerHTML="";

    subjects.forEach(subject=>{

      const div =
      document.createElement("div");

      div.className =
      "subject-item";

      div.innerHTML=`

      <label>${subject}</label>

      <input
      type="number"
      class="subject-score"
      data-subject="${subject}"
      min="0"
      max="100"
      value="0">

      `;

      subjectContainer
      .appendChild(div);

    });

  }

  if(subjectList){

    subjectList.innerHTML="";

    subjects.forEach(subject=>{

      const div =
      document.createElement("div");

      div.className =
      "subject-row";

      div.textContent =
      subject;

      subjectList
      .appendChild(div);

    });

  }

  if(removeSubjectSelect){

    removeSubjectSelect.innerHTML="";

    subjects.forEach(subject=>{

      const option =
      document.createElement(
        "option"
      );

      option.value =
      subject;

      option.textContent =
      subject;

      removeSubjectSelect
      .appendChild(option);

    });

  }

  updateDashboard();

}

/* ==========================
   ADD SUBJECT
========================== */

function addSubject(){

  const subject =
  document.getElementById(
    "newSubject"
  ).value.trim();

  if(subject===""){

    alert(
      "Enter Subject Name"
    );

    return;

  }

  subjects.push(subject);

  localStorage.setItem(
    "subjects",
    JSON.stringify(subjects)
  );

  document.getElementById(
    "newSubject"
  ).value="";

  loadSubjects();

  alert(
    "Subject Added"
  );

}

/* ==========================
   REMOVE SUBJECT
========================== */

function removeSubject(){

  const subject =
  document.getElementById(
    "removeSubjectSelect"
  ).value;

  subjects =
  subjects.filter(
    item => item !== subject
  );

  localStorage.setItem(
    "subjects",
    JSON.stringify(subjects)
  );

  loadSubjects();

  alert(
    "Subject Removed"
  );

}

/* ==========================
   CALCULATE REPORT
========================== */

function calculateReport(){

  const scoreInputs =
  document.querySelectorAll(
    ".subject-score"
  );

  let academicTotal = 0;

  scoreInputs.forEach(input=>{

    academicTotal +=
    Number(input.value || 0);

  });

  const academicAverage =
  scoreInputs.length > 0
  ? academicTotal /
    scoreInputs.length
  : 0;

  const character =
  Number(
    document.getElementById(
      "character"
    ).value || 0
  );

  const respect =
  Number(
    document.getElementById(
      "respect"
    ).value || 0
  );

  const discipline =
  Number(
    document.getElementById(
      "discipline"
    ).value || 0
  );

  const neatness =
  Number(
    document.getElementById(
      "neatness"
    ).value || 0
  );

  const punctuality =
  Number(
    document.getElementById(
      "punctuality"
    ).value || 0
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

  if(overall >= 70){

    grade = "A";

  }else if(overall >= 60){

    grade = "B";

  }else if(overall >= 50){

    grade = "C";

  }else if(overall >= 45){

    grade = "D";

  }else if(overall >= 40){

    grade = "E";

  }

  document.getElementById(
    "academicAverage"
  ).textContent =
  academicAverage.toFixed(1)
  + "%";

  document.getElementById(
    "characterAverage"
  ).textContent =
  characterAverage.toFixed(1)
  + "%";

  document.getElementById(
    "overallPercentage"
  ).textContent =
  overall.toFixed(1)
  + "%";

  document.getElementById(
    "grade"
  ).textContent =
  grade;

  return {

    academicAverage,
    characterAverage,
    overall,
    grade

  };

}

/* ==========================
   AUTO CALCULATE
========================== */

document.addEventListener(
  "input",
  function(){

    calculateReport();

  }
);

/* ==========================
   INITIAL LOAD
========================== */

window.addEventListener(
  "load",
  function(){

    loadStudents();

    loadSubjects();

    updateRemoveStudents();

    calculateReport();

  }
);
/* ==========================
   STUDENT IMAGE PREVIEW
========================== */

let selectedImage = "image.png";

const studentImageInput =
document.getElementById(
  "studentImage"
);

if(studentImageInput){

  studentImageInput.addEventListener(
    "change",
    function(e){

      const file =
      e.target.files[0];

      if(file){

        const reader =
        new FileReader();

        reader.onload =
        function(event){

          selectedImage =
          event.target.result;

          const preview =
          document.getElementById(
            "reportPreviewImage"
          );

          if(preview){

            preview.src =
            selectedImage;

          }

        };

        reader.readAsDataURL(
          file
        );

      }

    }
  );

}

/* ==========================
   STUDENT REPORT PDF
========================== */

async function generateStudentReportPDF(){

  const report =
  calculateReport();

  const student =
  document.getElementById(
    "studentSelect"
  ).value;

  const term =
  document.getElementById(
    "term"
  ).value;

  const remark =
  document.getElementById(
    "remark"
  ).value;

  document.getElementById(
    "reportPreviewName"
  ).textContent =
  student;

  document.getElementById(
    "reportPreviewTerm"
  ).textContent =
  term;

  document.getElementById(
    "reportPreviewAcademicAverage"
  ).textContent =
  "Academic Average: "
  + report.academicAverage
  .toFixed(1) + "%";

  document.getElementById(
    "reportPreviewCharacterAverage"
  ).textContent =
  "Character Average: "
  + report.characterAverage
  .toFixed(1) + "%";

  document.getElementById(
    "reportPreviewOverall"
  ).textContent =
  "Overall Percentage: "
  + report.overall
  .toFixed(1) + "%";

  document.getElementById(
    "reportPreviewGrade"
  ).textContent =
  "Grade: "
  + report.grade;

  document.getElementById(
    "reportPreviewRemark"
  ).textContent =
  remark;

  document.getElementById(
    "reportPreviewDate"
  ).textContent =
  new Date()
  .toLocaleDateString();

  const subjectPreview =
  document.getElementById(
    "reportPreviewSubjects"
  );

  subjectPreview.innerHTML = "";

  document
  .querySelectorAll(
    ".subject-score"
  )
  .forEach(input=>{

    const p =
    document.createElement(
      "p"
    );

    p.textContent =
    input.dataset.subject +
    " : " +
    input.value;

    subjectPreview
    .appendChild(p);

  });

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
    student +
    "-report.pdf"
  );

}

/* ==========================
   STUDENT NOTE PDF
========================== */

async function generateStudentNotePDF(){

  document.getElementById(
    "notePreviewTitle"
  ).textContent =
  document.getElementById(
    "noteTitle"
  ).value;

  document.getElementById(
    "notePreviewStudent"
  ).textContent =
  document.getElementById(
    "noteStudent"
  ).value;

  document.getElementById(
    "notePreviewCategory"
  ).textContent =
  document.getElementById(
    "noteCategory"
  ).value;

  document.getElementById(
    "notePreviewText"
  ).textContent =
  document.getElementById(
    "noteText"
  ).value;

  document.getElementById(
    "notePreviewDate"
  ).textContent =
  new Date()
  .toLocaleDateString();

  const canvas =
  await html2canvas(
    document.getElementById(
      "studentNotePDF"
    )
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
   ACTIVITY QUESTIONS
========================== */

let activityQuestions = [];

function addActivityQuestion(){

  const question =
  document.getElementById(
    "questionInput"
  ).value;

  if(question==="") return;

  activityQuestions.push(
    question
  );

  const list =
  document.getElementById(
    "activityList"
  );

  const div =
  document.createElement(
    "div"
  );

  div.className =
  "activity-item";

  div.textContent =
  question;

  list.appendChild(
    div
  );

  document.getElementById(
    "questionInput"
  ).value = "";

}

/* ==========================
   ACTIVITY PDF
========================== */

async function generateActivityPDF(){

  document.getElementById(
    "activityStudentPreview"
  ).textContent =
  document.getElementById(
    "activityStudent"
  ).value;

  document.getElementById(
    "activityClassPreview"
  ).textContent =
  document.getElementById(
    "activityClass"
  ).value;

  document.getElementById(
    "activitySubjectPreview"
  ).textContent =
  document.getElementById(
    "subject"
  ).value;

  document.getElementById(
    "activityTutorPreview"
  ).textContent =
  document.getElementById(
    "tutor"
  ).value;

  document.getElementById(
    "activityFrequencyPreview"
  ).textContent =
  document.getElementById(
    "frequency"
  ).value;

  const preview =
  document.getElementById(
    "activityQuestionsPreview"
  );

  preview.innerHTML = "";

  activityQuestions.forEach(
    (q,index)=>{

      const p =
      document.createElement(
        "p"
      );

      p.textContent =
      (index+1)
      + ". "
      + q;

      preview.appendChild(
        p
      );

    }
  );

  document.getElementById(
    "activityDatePreview"
  ).textContent =
  new Date()
  .toLocaleDateString();

  const canvas =
  await html2canvas(
    document.getElementById(
      "activityPDF"
    )
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

  window.open(
    "https://wa.me/2348083869454",
    "_blank"
  );

}

function sendStudentNoteWhatsApp(){

  window.open(
    "https://wa.me/2348083869454",
    "_blank"
  );

}

function sendActivityWhatsApp(){

  window.open(
    "https://wa.me/2348083869454",
    "_blank"
  );

}
/* ==========================
   STUDENT PROGRESS RECORD
========================== */

let progressImage = "image.png";

const progressInput =
document.getElementById(
  "progressImage"
);

if(progressInput){

  progressInput.addEventListener(
    "change",
    function(e){

      const file =
      e.target.files[0];

      if(file){

        const reader =
        new FileReader();

        reader.onload =
        function(event){

          progressImage =
          event.target.result;

          document.getElementById(
            "progressPreviewImage"
          ).src =
          progressImage;

        };

        reader.readAsDataURL(
          file
        );

      }

    }
  );

}
async function generateProgressPDF(){

  document.getElementById(
    "progressPreviewStudent"
  ).textContent =
  document.getElementById(
    "progressStudent"
  ).value;

  document.getElementById(
    "progressPreviewJoined"
  ).textContent =
  "Date Joined: " +
  document.getElementById(
    "dateJoined"
  ).value;

  document.getElementById(
    "progressPreviewInitial"
  ).textContent =
  "Initial Assessment: " +
  document.getElementById(
    "initialAssessment"
  ).value;

  document.getElementById(
    "progressPreviewCurrent"
  ).textContent =
  "Current Assessment: " +
  document.getElementById(
    "currentAssessment"
  ).value;

  document.getElementById(
    "progressPreviewAchievements"
  ).textContent =
  "Achievements: " +
  document.getElementById(
    "achievements"
  ).value;

  document.getElementById(
    "progressPreviewImprovement"
  ).textContent =
  "Areas For Improvement: " +
  document.getElementById(
    "improvementAreas"
  ).value;

  document.getElementById(
    "progressPreviewTeacher"
  ).textContent =
  "Teacher Comment: " +
  document.getElementById(
    "teacherComment"
  ).value;

  document.getElementById(
    "progressPreviewHostel"
  ).textContent =
  "Hostel Master Comment: " +
  document.getElementById(
    "hostelComment"
  ).value;

  document.getElementById(
    "progressPreviewDate"
  ).textContent =
  new Date()
  .toLocaleDateString();

  const canvas =
  await html2canvas(
    document.getElementById(
      "progressPDF"
    )
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
    "student-progress.pdf"
  );

}
function sendProgressWhatsApp(){

  window.open(
    "https://wa.me/2348083869454",
    "_blank"
  );

}

