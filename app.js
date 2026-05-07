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

const studentSelect =
document.getElementById("student");

/* LOGIN */
function login(){

  const pass =
  document.getElementById("password").value;

  if(pass === PASSWORD){

    document.getElementById("loginPage")
    .style.display = "none";

    document.getElementById("app")
    .style.display = "block";

    loadStudents();

  }else{

    alert("Wrong Password");

  }

}

/* LOGOUT */
function logout(){

  location.reload();

}

/* MENU */
function toggleMenu(){

  const menu =
  document.getElementById("menu");

  menu.style.display =
  menu.style.display === "block"
  ? "none"
  : "block";

}

/* SECTION */
function showSection(id){

  document.getElementById("students")
  .style.display = "none";

  document.getElementById("suggestion")
  .style.display = "none";

  document.getElementById(id)
  .style.display = "block";

}

/* LOAD STUDENTS */
function loadStudents(){

  students.forEach(name=>{

    const option =
    document.createElement("option");

    option.value = name;

    option.textContent = name;

    studentSelect.appendChild(option);

  });

}

/* SEARCH */
function filterStudents(){

  const value =
  document.getElementById("search")
  .value
  .toLowerCase();

  studentSelect.innerHTML = "";

  students
  .filter(student =>
    student.toLowerCase().includes(value)
  )
  .forEach(student=>{

    const option =
    document.createElement("option");

    option.value = student;

    option.textContent = student;

    studentSelect.appendChild(option);

  });

}

/* PREVIEW IMAGE */
document
.getElementById("imageInput")
.addEventListener("change",function(e){

  const file = e.target.files[0];

  if(file){

    const reader =
    new FileReader();

    reader.onload = function(event){

      document
      .getElementById("previewImage")
      .src = event.target.result;

    };

    reader.readAsDataURL(file);

  }

});

/* GENERATE STUDENT PDF */
async function generatePDF(){

  document
  .getElementById("previewName")
  .innerText =
  studentSelect.value;

  document
  .getElementById("previewAcademic")
  .innerText =
  "Academic: "
  + document.getElementById("academic").value
  + "/10";

  document
  .getElementById("previewCharacter")
  .innerText =
  "Character: "
  + document.getElementById("character").value
  + "/10";

  document
  .getElementById("previewRespect")
  .innerText =
  "Respect: "
  + document.getElementById("respect").value
  + "/10";

  document
  .getElementById("previewRemark")
  .innerText =
  "Remark: "
  + document.getElementById("remark").value;

  document
  .getElementById("previewDate")
  .innerText =
  new Date().toLocaleString();

  const { jsPDF } =
  window.jspdf;

  const element =
  document.getElementById("pdfContent");

  const canvas =
  await html2canvas(element);

  const image =
  canvas.toDataURL("image/png");

  const pdf =
  new jsPDF();

  pdf.addImage(
    image,
    "PNG",
    10,
    10,
    180,
    0
  );

  pdf.save("student-report.pdf");

}

/* WHATSAPP */
function sendWhatsApp(){

  const msg =
  "Student PDF generated successfully. Please attach the downloaded PDF manually.";

  window.open(
`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
  );

}

/* SUGGESTION PDF */
async function generateSuggestionPDF(){

  document
  .getElementById("suggestionPreview")
  .innerText =
  document.getElementById("suggestText").value;

  document
  .getElementById("suggestionDate")
  .innerText =
  new Date().toLocaleString();

  const { jsPDF } =
  window.jspdf;

  const element =
  document.getElementById("suggestionPDF");

  const canvas =
  await html2canvas(element);

  const image =
  canvas.toDataURL("image/png");

  const pdf =
  new jsPDF();

  pdf.addImage(
    image,
    "PNG",
    10,
    10,
    180,
    0
  );

  pdf.save("suggestion.pdf");

}

/* SEND SUGGESTION */
function sendSuggestionWhatsApp(){

  const msg =
  "Suggestion PDF generated successfully. Please attach the PDF manually.";

  window.open(
`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
  );

}
