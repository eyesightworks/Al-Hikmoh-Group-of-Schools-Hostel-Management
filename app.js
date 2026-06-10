/* =====================================
   LOGIN SYSTEM
===================================== */

const PASSWORD = "easy001";

function login(){

  const password =
  document.getElementById(
    "password"
  ).value;

  if(password === PASSWORD){

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

  }else{

    alert(
      "Wrong Password"
    );

  }

}

function logout(){

  localStorage.removeItem(
    "hostelLoggedIn"
  );

  location.reload();

}

window.addEventListener(
  "load",
  function(){

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

  }
);

/* =====================================
   MENU
===================================== */

function toggleMenu(){

  const menu =
  document.getElementById(
    "menu"
  );

  if(
    menu.style.display ===
    "block"
  ){

    menu.style.display =
    "none";

  }else{

    menu.style.display =
    "block";

  }

}

function showSection(
  sectionId
){

  document
  .querySelectorAll(
    ".section"
  )
  .forEach(section=>{

    section.style.display =
    "none";

  });

  document.getElementById(
    sectionId
  ).style.display =
  "block";

  document.getElementById(
    "menu"
  ).style.display =
  "none";

}

/* =====================================
   STORAGE
===================================== */

let students =
JSON.parse(
  localStorage.getItem(
    "students"
  )
) || [];

let subjects =
JSON.parse(
  localStorage.getItem(
    "subjects"
  )
) || [

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

let reportHistory =
JSON.parse(
  localStorage.getItem(
    "reportHistory"
  )
) || [];

saveData();

function saveData(){

  localStorage.setItem(
    "students",
    JSON.stringify(
      students
    )
  );

  localStorage.setItem(
    "subjects",
    JSON.stringify(
      subjects
    )
  );

  localStorage.setItem(
    "reportHistory",
    JSON.stringify(
      reportHistory
    )
  );

}

/* =====================================
   STUDENT MODEL

   {
      id,
      name,
      class,
      age,
      parentName,
      parentPhone
   }

===================================== */

function createStudentObject(){

  return {

    id:
    Date.now(),

    name:
    document
    .getElementById(
      "newStudentName"
    )
    .value.trim(),

    class:
    document
    .getElementById(
      "addStudentClass"
    )
    .value,

    age:
    document
    .getElementById(
      "studentAge"
    )
    .value,

    parentName:
    document
    .getElementById(
      "parentName"
    )
    .value.trim(),

    parentPhone:
    document
    .getElementById(
      "parentPhone"
    )
    .value.trim()

  };

}

/* =====================================
   ADD STUDENT
===================================== */

function addStudent(){

  const student =
  createStudentObject();

  if(
    !student.name
  ){

    alert(
      "Enter Student Name"
    );

    return;

  }

  students.push(
    student
  );

  saveData();

  loadStudents();

  clearStudentForm();

  alert(
    "Student Added"
  );

}

/* =====================================
   CLEAR FORM
===================================== */

function clearStudentForm(){

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

function loadStudents(){

  const selects = [

    "studentSelect",
    "noteStudent",
    "activityStudent",
    "progressStudent"

  ];

  selects.forEach(id=>{

    const select =
    document.getElementById(
      id
    );

    if(!select) return;

    select.innerHTML = "";

    students.forEach(
      student=>{

        const option =
        document.createElement(
          "option"
        );

        option.value =
        student.id;

        option.textContent =
        `${student.name}
        (${student.class})`;

        select.appendChild(
          option
        );

      }
    );

  });

  loadRemoveStudents();

  updateStudentList();

  updateDashboard();

}

/* =====================================
   REMOVE STUDENTS
===================================== */

function loadRemoveStudents(){

  const className =
  document.getElementById(
    "removeClass"
  )?.value;

  const select =
  document.getElementById(
    "removeStudentSelect"
  );

  if(!select) return;

  select.innerHTML = "";

  students
  .filter(student=>

    !className ||
    student.class ===
    className

  )
  .forEach(student=>{

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

function removeStudent(){

  const id =
  Number(
    document.getElementById(
      "removeStudentSelect"
    ).value
  );

  students =
  students.filter(
    student=>

    student.id !== id

  );

  saveData();

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

      loadRemoveStudents();

    }

  }
);

/* =====================================
   STUDENT LIST
===================================== */

function updateStudentList(){

  const container =
  document.getElementById(
    "studentList"
  );

  if(!container) return;

  container.innerHTML = "";

  students.forEach(
    student=>{

      const div =
      document.createElement(
        "div"
      );

      div.className =
      "student-row";

      div.innerHTML = `

      <strong>
      ${student.name}
      </strong>

      <br>

      Class:
      ${student.class}

      <br>

      Age:
      ${student.age}

      <br>

      Parent:
      ${student.parentName}

      <br>

      Phone:
      ${student.parentPhone}

      `;

      container.appendChild(
        div
      );

    }
  );

}

/* =====================================
   SEARCH STUDENTS
===================================== */

function filterStudents(){

  const search =
  document
  .getElementById(
    "searchStudent"
  )
  .value
  .toLowerCase();

  const select =
  document.getElementById(
    "studentSelect"
  );

  Array
  .from(
    select.options
  )
  .forEach(option=>{

    option.style.display =

    option.textContent
    .toLowerCase()
    .includes(search)

    ? ""

    : "none";

  });

}

/* =====================================
   DASHBOARD
===================================== */

function updateDashboard(){

  const totalStudents =
  document.getElementById(
    "totalStudents"
  );

  const totalSubjects =
  document.getElementById(
    "totalSubjects"
  );

  if(totalStudents){

    totalStudents.textContent =
    students.length;

  }

  if(totalSubjects){

    totalSubjects.textContent =
    subjects.length;

  }

}
/* =====================================
   SUBJECT MANAGEMENT
===================================== */

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

    subjectContainer.innerHTML = "";

    subjects.forEach(subject=>{

      const div =
      document.createElement(
        "div"
      );

      div.className =
      "subject-item";

      div.innerHTML = `

      <label>
      ${subject}
      </label>

      <input
      type="number"
      min="0"
      max="100"
      value="0"
      class="subject-score"
      data-subject="${subject}">

      `;

      subjectContainer
      .appendChild(div);

    });

  }

  if(subjectList){

    subjectList.innerHTML = "";

    subjects.forEach(subject=>{

      const row =
      document.createElement(
        "div"
      );

      row.className =
      "subject-row";

      row.textContent =
      subject;

      subjectList
      .appendChild(row);

    });

  }

  if(removeSubjectSelect){

    removeSubjectSelect
    .innerHTML = "";

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

function addSubject(){

  const subject =
  document.getElementById(
    "newSubject"
  )
  .value
  .trim();

  if(!subject){

    alert(
      "Enter Subject Name"
    );

    return;

  }

  if(
    subjects.includes(
      subject
    )
  ){

    alert(
      "Subject Already Exists"
    );

    return;

  }

  subjects.push(
    subject
  );

  saveData();

  loadSubjects();

  document.getElementById(
    "newSubject"
  ).value = "";

}

function removeSubject(){

  const subject =
  document.getElementById(
    "removeSubjectSelect"
  ).value;

  subjects =
  subjects.filter(
    item=>
    item !== subject
  );

  saveData();

  loadSubjects();

}

/* =====================================
   STUDENT LOOKUP
===================================== */

function getStudentById(
  id
){

  return students.find(
    student=>

    Number(student.id)
    ===
    Number(id)

  );

}

/* =====================================
   REPORT CALCULATOR
===================================== */

function calculateReport(){

  const scores =
  document.querySelectorAll(
    ".subject-score"
  );

  let total = 0;

  scores.forEach(input=>{

    total +=
    Number(
      input.value || 0
    );

  });

  const average =

  scores.length

  ?

  total /
  scores.length

  :

  0;

  let grade = "F";

  if(
    average >= 70
  ){

    grade = "A";

  }
  else if(
    average >= 60
  ){

    grade = "B";

  }
  else if(
    average >= 50
  ){

    grade = "C";

  }
  else if(
    average >= 45
  ){

    grade = "D";

  }
  else if(
    average >= 40
  ){

    grade = "E";

  }

  const academic =
  document.getElementById(
    "academicAverage"
  );

  const overall =
  document.getElementById(
    "overallPercentage"
  );

  const gradeText =
  document.getElementById(
    "grade"
  );

  if(academic){

    academic.textContent =
    average.toFixed(1)
    + "%";

  }

  if(overall){

    overall.textContent =
    average.toFixed(1)
    + "%";

  }

  if(gradeText){

    gradeText.textContent =
    grade;

  }

  return {

    average,
    grade

  };

}

document.addEventListener(
  "input",
  function(){

    calculateReport();

  }
);

/* =====================================
   REPORT HISTORY
===================================== */

function saveReportHistory(
  reportType,
  studentName
){

  reportHistory.unshift({

    id:
    Date.now(),

    reportType,

    studentName,

    date:
    new Date()
    .toLocaleString()

  });

  saveData();

  loadReportHistory();

}

function loadReportHistory(){

  const container =
  document.getElementById(
    "reportHistoryList"
  );

  if(!container) return;

  container.innerHTML = "";

  reportHistory.forEach(
    item=>{

      const card =
      document.createElement(
        "div"
      );

      card.className =
      "report-history-card";

      card.innerHTML = `

      <h4>
      ${item.studentName}
      </h4>

      <p>
      ${item.reportType}
      </p>

      <small>
      ${item.date}
      </small>

      `;

      container.appendChild(
        card
      );

    }
  );

}

/* =====================================
   MULTI PAGE PDF
===================================== */

async function exportElementToPDF(
  elementId,
  fileName
){

  const element =
  document.getElementById(
    elementId
  );

  const canvas =
  await html2canvas(
    element,
    {
      scale:2,
      useCORS:true
    }
  );

  const imgData =
  canvas.toDataURL(
    "image/png"
  );

  const {
    jsPDF
  } = window.jspdf;

  const pdf =
  new jsPDF(
    "p",
    "mm",
    "a4"
  );

  const pageWidth =
  190;

  const pageHeight =
  297;

  const imgHeight =

  canvas.height *
  pageWidth /

  canvas.width;

  let heightLeft =
  imgHeight;

  let position =
  0;

  pdf.addImage(

    imgData,

    "PNG",

    10,

    position,

    pageWidth,

    imgHeight

  );

  heightLeft -=
  pageHeight;

  while(
    heightLeft > 0
  ){

    position =
    heightLeft -
    imgHeight;

    pdf.addPage();

    pdf.addImage(

      imgData,

      "PNG",

      10,

      position,

      pageWidth,

      imgHeight

    );

    heightLeft -=
    pageHeight;

  }

  pdf.save(
    fileName
  );

}
/* =====================================
STUDENT IMAGE
===================================== */

let selectedImage = "image.png";

const studentImageInput =
document.getElementById(
"studentImage"
);

if(studentImageInput){

studentImageInput
.addEventListener(
"change",
function(e){

```
  const file =
  e.target.files[0];

  if(!file) return;

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
```

);

}

/* =====================================
STUDENT REPORT
===================================== */

async function generateStudentReportPDF(){

const studentId =
document.getElementById(
"studentSelect"
).value;

const student =
getStudentById(
studentId
);

if(!student){

```
alert(
  "Select Student"
);

return;
```

}

const report =
calculateReport();

document.getElementById(
"reportPreviewName"
).textContent =
student.name;

document.getElementById(
"reportPreviewClass"
).textContent =
"Class: " +
student.class;

document.getElementById(
"reportPreviewAge"
).textContent =
"Age: " +
student.age;

document.getElementById(
"reportPreviewParent"
).textContent =
"Parent: " +
student.parentName;

document.getElementById(
"reportPreviewPhone"
).textContent =
"Phone: " +
student.parentPhone;

document.getElementById(
"reportPreviewTerm"
).textContent =
document.getElementById(
"term"
).value;

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

```
const row =
document.createElement(
  "div"
);

row.className =
"subject-row-preview";

row.innerHTML = `

<span class="subject-name">
${input.dataset.subject}
</span>

<span class="subject-score">
${input.value}
</span>

`;

subjectPreview
.appendChild(
  row
);
```

});

document.getElementById(
"reportPreviewAcademicAverage"
).textContent =
"Average: " +
report.average.toFixed(1)

* "%";

document.getElementById(
"reportPreviewGrade"
).textContent =
"Grade: " +
report.grade;

document.getElementById(
"reportPreviewRemark"
).textContent =
document.getElementById(
"remark"
).value;

document.getElementById(
"reportPreviewDate"
).textContent =
new Date()
.toLocaleDateString();

await exportElementToPDF(

```
"studentReportPDF",

student.name +
"-report.pdf"
```

);

saveReportHistory(
"Academic Report",
student.name
);

}

/* =====================================
STUDENT NOTE
===================================== */

async function generateStudentNotePDF(){

const studentId =
document.getElementById(
"noteStudent"
).value;

const student =
getStudentById(
studentId
);

document.getElementById(
"notePreviewTitle"
).textContent =
document.getElementById(
"noteTitle"
).value;

document.getElementById(
"notePreviewStudent"
).textContent =
student
? student.name
: "";

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

await exportElementToPDF(

```
"studentNotePDF",

"student-note.pdf"
```

);

saveReportHistory(
"Student Note",
student?.name || ""
);

}

/* =====================================
ACTIVITIES
===================================== */

let activityQuestions = [];

function addActivityQuestion(){

const question =
document.getElementById(
"questionInput"
).value.trim();

if(!question) return;

activityQuestions.push(
question
);

const item =
document.createElement(
"div"
);

item.className =
"activity-item";

item.textContent =
question;

document
.getElementById(
"activityList"
)
.appendChild(
item
);

document.getElementById(
"questionInput"
).value = "";

}

async function generateActivityPDF(){

const studentId =
document.getElementById(
"activityStudent"
).value;

const student =
getStudentById(
studentId
);

document.getElementById(
"activityStudentPreview"
).textContent =
student
? student.name
: "";

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
(item,index)=>{

```
  const p =
  document.createElement(
    "p"
  );

  p.textContent =
  (index+1)
  + ". "
  + item;

  preview.appendChild(
    p
  );

}
```

);

document.getElementById(
"activityDatePreview"
).textContent =
new Date()
.toLocaleDateString();

await exportElementToPDF(

```
"activityPDF",

"student-activities.pdf"
```

);

saveReportHistory(
"Activity Report",
student?.name || ""
);

}

/* =====================================
PROGRESS REPORT
===================================== */

let progressImage =
"image.png";

const progressInput =
document.getElementById(
"progressImage"
);

if(progressInput){

progressInput
.addEventListener(
"change",
function(e){

```
  const file =
  e.target.files[0];

  if(!file) return;

  const reader =
  new FileReader();

  reader.onload =
  function(event){

    progressImage =
    event.target.result;

    document
    .getElementById(
      "progressPreviewImage"
    )
    .src =
    progressImage;

  };

  reader.readAsDataURL(
    file
  );

}
```

);

}

async function generateProgressPDF(){

const studentId =
document.getElementById(
"progressStudent"
).value;

const student =
getStudentById(
studentId
);

if(student){

```
document.getElementById(
  "progressPreviewStudent"
).textContent =
student.name;

document.getElementById(
  "progressPreviewClass"
).textContent =
"Class: " +
student.class;

document.getElementById(
  "progressPreviewAge"
).textContent =
"Age: " +
student.age;

document.getElementById(
  "progressPreviewParent"
).textContent =
"Parent: " +
student.parentName;

document.getElementById(
  "progressPreviewPhone"
).textContent =
"Phone: " +
student.parentPhone;
```

}

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
document.getElementById(
"initialAssessment"
).value;

document.getElementById(
"progressPreviewCurrent"
).textContent =
document.getElementById(
"currentAssessment"
).value;

document.getElementById(
"progressPreviewAchievements"
).textContent =
document.getElementById(
"achievements"
).value;

document.getElementById(
"progressPreviewImprovement"
).textContent =
document.getElementById(
"improvementAreas"
).value;

document.getElementById(
"progressPreviewTeacher"
).textContent =
document.getElementById(
"teacherComment"
).value;

document.getElementById(
"progressPreviewHostel"
).textContent =
document.getElementById(
"hostelComment"
).value;

document.getElementById(
"progressPreviewDate"
).textContent =
new Date()
.toLocaleDateString();

await exportElementToPDF(

```
"progressPDF",

"student-progress.pdf"
```

);

saveReportHistory(
"Progress Report",
student?.name || ""
);

}

/* =====================================
WHATSAPP
===================================== */

function sendStudentReportWhatsApp(){

window.open(
"https://wa.me/",
"_blank"
);

}

function sendStudentNoteWhatsApp(){

window.open(
"https://wa.me/",
"_blank"
);

}

function sendActivityWhatsApp(){

window.open(
"https://wa.me/",
"_blank"
);

}

function sendProgressWhatsApp(){

window.open(
"https://wa.me/",
"_blank"
);

}

/* =====================================
INITIAL LOAD
===================================== */

window.addEventListener(
"load",
function(){

```
loadStudents();

loadSubjects();

loadReportHistory();

calculateReport();
```

}
);
