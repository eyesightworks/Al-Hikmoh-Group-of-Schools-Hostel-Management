/* =====================================
AL HIKMOH HOSTEL MANAGEMENT SYSTEM
COMPLETE APP.JS
PART 1
LOGIN + MENU + STORAGE + DASHBOARD
===================================== */

/* =====================================
LOGIN SYSTEM
===================================== */

const PASSWORD = "easy001";

function login(){

const password =
document.getElementById(
"password"
).value.trim();

if(password === PASSWORD){

```
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
```

}else{

```
alert(
  "Incorrect Password"
);
```

}

}

function logout(){

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
function(){

```
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
```

}
);

/* =====================================
MENU SYSTEM
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

```
menu.style.display =
"none";
```

}else{

```
menu.style.display =
"block";
```

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

```
section.style.display =
"none";
```

});

const current =
document.getElementById(
sectionId
);

if(current){

```
current.style.display =
"block";
```

}

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

let reportHistory =
JSON.parse(
localStorage.getItem(
"reportHistory"
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

/* =====================================
SAVE DATA
===================================== */

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

```
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
.value.trim(),

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
```

};

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

const totalReports =
document.getElementById(
"totalReports"
);

if(totalStudents){

```
totalStudents.textContent =
students.length;
```

}

if(totalSubjects){

```
totalSubjects.textContent =
subjects.length;
```

}

if(totalReports){

```
totalReports.textContent =
reportHistory.length;
```

}

}
/* =====================================
PART 2
STUDENT MANAGEMENT
SUBJECT MANAGEMENT
===================================== */

/* =====================================
ADD STUDENT
===================================== */

function addStudent(){

const student =
createStudentObject();

if(
student.name === ""
){

```
alert(
  "Enter Student Name"
);

return;
```

}

students.push(
student
);

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

const selectIds = [

```
"studentSelect",
"noteStudent",
"activityStudent",
"progressStudent"
```

];

selectIds.forEach(id=>{

```
const select =
document.getElementById(
  id
);

if(!select) return;

select.innerHTML = "";

students.forEach(student=>{

  const option =
  document.createElement(
    "option"
  );

  option.value =
  student.id;

  option.textContent =
  `${student.name} (${student.class})`;

  select.appendChild(
    option
  );

});
```

});

loadRemoveStudents();

}

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

students.forEach(student=>{

```
const card =
document.createElement(
  "div"
);

card.className =
"student-row";

card.innerHTML = `

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
  card
);
```

});

}

/* =====================================
SEARCH STUDENTS
===================================== */

function filterStudents(){

const keyword =
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

if(!select) return;

Array
.from(select.options)
.forEach(option=>{

```
option.style.display =

option.textContent
.toLowerCase()
.includes(keyword)

? ""

: "none";
```

});

}

/* =====================================
REMOVE STUDENT LIST
===================================== */

function loadRemoveStudents(){

const select =
document.getElementById(
"removeStudentSelect"
);

if(!select) return;

const className =
document.getElementById(
"removeClass"
)?.value;

select.innerHTML = "";

students
.filter(student=>

```
!className ||

student.class ===
className
```

)
.forEach(student=>{

```
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
```

});

}

/* =====================================
REMOVE STUDENT
===================================== */

function removeStudent(){

const studentId =
Number(
document.getElementById(
"removeStudentSelect"
).value
);

students =
students.filter(student=>

```
student.id !==
studentId
```

);

saveData();

loadStudents();

updateStudentList();

updateDashboard();

alert(
"Student Removed"
);

}

/* =====================================
CLASS FILTER
===================================== */

document.addEventListener(
"change",
function(event){

```
if(
  event.target.id ===
  "removeClass"
){

  loadRemoveStudents();

}
```

}
);

/* =====================================
LOAD SUBJECTS
===================================== */

function loadSubjects(){

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

if(container){

```
container.innerHTML = "";

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

  container.appendChild(
    div
  );

});
```

}

if(subjectList){

```
subjectList.innerHTML = "";

subjects.forEach(subject=>{

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
```

}

if(removeSelect){

```
removeSelect.innerHTML = "";

subjects.forEach(subject=>{

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
```

}

}

/* =====================================
ADD SUBJECT
===================================== */

function addSubject(){

const subject =
document
.getElementById(
"newSubject"
)
.value
.trim();

if(subject === ""){

```
alert(
  "Enter Subject Name"
);

return;
```

}

subjects.push(
subject
);

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

function removeSubject(){

const subject =
document.getElementById(
"removeSubjectSelect"
).value;

subjects =
subjects.filter(item=>

```
item !== subject
```

);

saveData();

loadSubjects();

updateDashboard();

}
/* =====================================
PART 3A
REPORT CALCULATION
IMAGE HANDLING
REPORT HELPERS
===================================== */

/* =====================================
REPORT IMAGE
===================================== */

let selectedImage =
"image.png";

/* =====================================
IMAGE UPLOAD
===================================== */

const studentImageInput =
document.getElementById(
"studentImage"
);

if(studentImageInput){

studentImageInput
.addEventListener(
"change",
function(event){

```
  const file =
  event.target.files[0];

  if(!file) return;

  const reader =
  new FileReader();

  reader.onload =
  function(e){

    selectedImage =
    e.target.result;

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
GET STUDENT
===================================== */

function getStudentById(id){

return students.find(
student =>

```
student.id ===
Number(id)
```

);

}

/* =====================================
GET CURRENT STUDENT
===================================== */

function getCurrentStudent(){

const id =
document.getElementById(
"studentSelect"
)?.value;

return getStudentById(
id
);

}

/* =====================================
CALCULATE REPORT
===================================== */

function calculateReport(){

const scores =
document.querySelectorAll(
".subject-score"
);

let total = 0;

scores.forEach(input=>{

```
total +=
Number(
  input.value || 0
);
```

});

const academicAverage =

scores.length

?

total /
scores.length

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

```
character +
respect +
discipline +
neatness +
punctuality
```

) / 5;

const overall =

(

```
academicAverage +
characterAverage
```

) / 2;

let grade = "F";

if(overall >= 70){

```
grade = "A";
```

}else if(overall >= 60){

```
grade = "B";
```

}else if(overall >= 50){

```
grade = "C";
```

}else if(overall >= 45){

```
grade = "D";
```

}else if(overall >= 40){

```
grade = "E";
```

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

if(academicEl){

```
academicEl.textContent =
academicAverage
.toFixed(1) + "%";
```

}

if(characterEl){

```
characterEl.textContent =
characterAverage
.toFixed(1) + "%";
```

}

if(overallEl){

```
overallEl.textContent =
overall
.toFixed(1) + "%";
```

}

if(gradeEl){

```
gradeEl.textContent =
grade;
```

}

return {

```
academicAverage,
characterAverage,
overall,
grade
```

};

}

/* =====================================
BUILD SUBJECT TABLE
===================================== */

function buildSubjectTable(){

let html = "";

document
.querySelectorAll(
".subject-score"
)
.forEach(input=>{

```
html += `

<p>

${input.dataset.subject}

:

${input.value}

</p>

`;
```

});

return html;

}

/* =====================================
POPULATE REPORT
===================================== */

function populateReportPreview(){

const student =
getCurrentStudent();

if(!student) return;

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

document.getElementById(
"reportPreviewAcademicAverage"
).textContent =

"Academic Average: " +

report.academicAverage
.toFixed(1)

* "%";

document.getElementById(
"reportPreviewCharacterAverage"
).textContent =

"Character Average: " +

report.characterAverage
.toFixed(1)

* "%";

document.getElementById(
"reportPreviewOverall"
).textContent =

"Overall Percentage: " +

report.overall
.toFixed(1)

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

document.getElementById(
"reportPreviewSubjects"
).innerHTML =

buildSubjectTable();

}

/* =====================================
AUTO CALCULATE
===================================== */

document.addEventListener(
"input",
function(){

```
calculateReport();
```

}
);
/* =====================================
PART 3B
MULTI PAGE PDF ENGINE
STUDENT REPORT PDF
===================================== */

/* =====================================
SAVE REPORT HISTORY
===================================== */

function saveReportHistoryItem(
report
){

reportHistory.push({

```
id:
Date.now(),

student:
report.student,

term:
report.term,

grade:
report.grade,

overall:
report.overall,

date:
new Date()
.toLocaleDateString()
```

});

saveData();

}

/* =====================================
MULTI PAGE PDF
PREVENT CUT REPORT
===================================== */

async function createMultiPagePDF(

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
210;

const pageHeight =
297;

const margin =
10;

const imgWidth =
pageWidth -
(margin * 2);

const imgHeight =

(
canvas.height *
imgWidth
) /
canvas.width;

let heightLeft =
imgHeight;

let position =
margin;

pdf.addImage(

```
imgData,
"PNG",
margin,
position,
imgWidth,
imgHeight
```

);

heightLeft -=
pageHeight;

while(
heightLeft > 0
){

```
position =

heightLeft -
imgHeight +
margin;

pdf.addPage();

pdf.addImage(

  imgData,
  "PNG",
  margin,
  position,
  imgWidth,
  imgHeight

);

heightLeft -=
pageHeight;
```

}

pdf.save(
fileName
);

}

/* =====================================
GENERATE STUDENT REPORT
===================================== */

async function generateStudentReportPDF(){

const student =
getCurrentStudent();

if(!student){

```
alert(
  "Select Student"
);

return;
```

}

populateReportPreview();

const report =
calculateReport();

saveReportHistoryItem({

```
student:
student.name,

term:
document.getElementById(
  "term"
).value,

grade:
report.grade,

overall:
report.overall
```

});

await createMultiPagePDF(

```
"studentReportPDF",

student.name
.replaceAll(
  " ",
  "_"
)

+

"_Report.pdf"
```

);

}

/* =====================================
SMALL IMAGE FIX
===================================== */

window.addEventListener(
"load",
function(){

```
const image =
document.getElementById(
  "reportPreviewImage"
);

if(image){

  image.style.width =
  "110px";

  image.style.height =
  "130px";

  image.style.objectFit =
  "cover";

  image.style.display =
  "block";

  image.style.margin =
  "0 auto 15px";

  image.style.borderRadius =
  "10px";

}
```

}
);
/* =====================================
PART 3C
STUDENT NOTES
ACTIVITIES
WHATSAPP
===================================== */

/* =====================================
STUDENT NOTE PDF
===================================== */

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
).selectedOptions[0]
?.textContent || "";

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

await createMultiPagePDF(

```
"studentNotePDF",

"Student_Note.pdf"
```

);

}

/* =====================================
ACTIVITY STORAGE
===================================== */

let activityQuestions =
[];

/* =====================================
ADD ACTIVITY
===================================== */

function addActivityQuestion(){

const input =
document.getElementById(
"questionInput"
);

const value =
input.value.trim();

if(value === ""){

```
return;
```

}

activityQuestions.push(
value
);

renderActivities();

input.value = "";

}

/* =====================================
RENDER ACTIVITIES
===================================== */

function renderActivities(){

const list =
document.getElementById(
"activityList"
);

if(!list) return;

list.innerHTML = "";

activityQuestions.forEach(

```
(
  activity,
  index
)=>{

  const div =
  document.createElement(
    "div"
  );

  div.className =
  "activity-item";

  div.innerHTML =

  `
  <strong>
  ${index + 1}.
  </strong>

  ${activity}
  `;

  list.appendChild(
    div
  );

}
```

);

}

/* =====================================
GENERATE ACTIVITY PDF
===================================== */

async function generateActivityPDF(){

document.getElementById(
"activityStudentPreview"
).textContent =

"Student: " +

(
document.getElementById(
"activityStudent"
)
.selectedOptions[0]
?.textContent || ""
);

document.getElementById(
"activityClassPreview"
).textContent =

"Class: " +

document.getElementById(
"activityClass"
).value;

document.getElementById(
"activitySubjectPreview"
).textContent =

"Subject: " +

document.getElementById(
"subject"
).value;

document.getElementById(
"activityTutorPreview"
).textContent =

"Tutor: " +

document.getElementById(
"tutor"
).value;

document.getElementById(
"activityFrequencyPreview"
).textContent =

"Frequency: " +

document.getElementById(
"frequency"
).value;

const preview =
document.getElementById(
"activityQuestionsPreview"
);

preview.innerHTML = "";

activityQuestions.forEach(

```
(
  question,
  index
)=>{

  const p =
  document.createElement(
    "p"
  );

  p.textContent =

  `${index + 1}. ${question}`;

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

await createMultiPagePDF(

```
"activityPDF",

"Student_Activities.pdf"
```

);

}

/* =====================================
WHATSAPP
===================================== */

function sendStudentReportWhatsApp(){

window.open(

```
"https://wa.me/",

"_blank"
```

);

}

function sendStudentNoteWhatsApp(){

window.open(

```
"https://wa.me/",

"_blank"
```

);

}

function sendActivityWhatsApp(){

window.open(

```
"https://wa.me/",

"_blank"
```

);

}

function sendProgressWhatsApp(){

window.open(

```
"https://wa.me/",

"_blank"
```

);

}
/* =====================================
PART 3D
PROGRESS REPORT
REPORT HISTORY
SYSTEM STARTUP
===================================== */

/* =====================================
PROGRESS IMAGE
===================================== */

let progressImage = "image.png";

const progressImageInput =
document.getElementById(
  "progressImage"
);

if(progressImageInput){

  progressImageInput.addEventListener(
    "change",
    function(e){

      const file =
      e.target.files[0];

      if(!file) return;

      const reader =
      new FileReader();

      reader.onload =
      function(event){

        progressImage =
        event.target.result;

        const preview =
        document.getElementById(
          "progressPreviewImage"
        );

        if(preview){

          preview.src =
          progressImage;

        }

      };

      reader.readAsDataURL(
        file
      );

    }
  );

}

/* =====================================
GENERATE PROGRESS PDF
===================================== */

async function generateProgressPDF(){

  const studentId =
  Number(
    document.getElementById(
      "progressStudent"
    ).value
  );

  const student =
  students.find(

    item =>
    item.id === studentId

  );

  if(!student){

    alert(
      "Select a student"
    );

    return;

  }

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
  (student.age || "-");

  document.getElementById(
    "progressPreviewParent"
  ).textContent =

  "Parent: " +
  (student.parentName || "-");

  document.getElementById(
    "progressPreviewPhone"
  ).textContent =

  "Phone: " +
  (student.parentPhone || "-");

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

  await createMultiPagePDF(

    "progressPDF",

    "Student_Progress.pdf"

  );

}

/* =====================================
REPORT HISTORY
===================================== */

function loadReportHistory(){

  const container =
  document.getElementById(
    "reportHistoryList"
  );

  if(!container) return;

  container.innerHTML = "";

  if(
    reportHistory.length === 0
  ){

    container.innerHTML =

    `
    <div class="pdf-card">
      No reports generated yet.
    </div>
    `;

    return;

  }

  reportHistory
  .slice()
  .reverse()
  .forEach(report=>{

    const card =
    document.createElement(
      "div"
    );

    card.className =
    "pdf-card";

    card.innerHTML =

    `
    <h3>${report.student}</h3>

    <p>
    Type:
    ${report.type}
    </p>

    <p>
    Date:
    ${report.date}
    </p>
    `;

    container.appendChild(
      card
    );

  });

}

/* =====================================
SAVE REPORT HISTORY
===================================== */

function addReportHistory(

  type,
  student

){

  reportHistory.push({

    type,

    student,

    date:
    new Date()
    .toLocaleString()

  });

  saveData();

  loadReportHistory();

  updateReportCounter();

}

/* =====================================
REPORT COUNTER
===================================== */

function updateReportCounter(){

  const totalReports =
  document.getElementById(
    "totalReports"
  );

  if(totalReports){

    totalReports.textContent =

    reportHistory.length;

  }

}

/* =====================================
AUTO SAVE REPORTS
===================================== */

const originalStudentReport =
generateStudentReportPDF;

generateStudentReportPDF =
async function(){

  await originalStudentReport();

  const studentText =

  document.getElementById(
    "studentSelect"
  )
  .selectedOptions[0]
  ?.textContent || "";

  addReportHistory(

    "Student Report",

    studentText

  );

};

const originalProgressReport =
generateProgressPDF;

generateProgressPDF =
async function(){

  await originalProgressReport();

  const studentText =

  document.getElementById(
    "progressStudent"
  )
  .selectedOptions[0]
  ?.textContent || "";

  addReportHistory(

    "Progress Report",

    studentText

  );

};

const originalNoteReport =
generateStudentNotePDF;

generateStudentNotePDF =
async function(){

  await originalNoteReport();

  const studentText =

  document.getElementById(
    "noteStudent"
  )
  .selectedOptions[0]
  ?.textContent || "";

  addReportHistory(

    "Student Note",

    studentText

  );

};

const originalActivityReport =
generateActivityPDF;

generateActivityPDF =
async function(){

  await originalActivityReport();

  const studentText =

  document.getElementById(
    "activityStudent"
  )
  .selectedOptions[0]
  ?.textContent || "";

  addReportHistory(

    "Activity Report",

    studentText

  );

};

/* =====================================
SYSTEM STARTUP
===================================== */

window.addEventListener(
  "load",
  function(){

    loadStudents();

    loadSubjects();

    loadRemoveStudents();

    calculateReport();

    loadReportHistory();

    updateReportCounter();

  }
);

/* =====================================
END OF APP.JS
===================================== */
