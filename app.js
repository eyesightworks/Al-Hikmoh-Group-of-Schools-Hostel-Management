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

/* GENERATE STUDENT PDF */
async function generateStudentPDF(){

  const file =
  document.getElementById("imageInput")
  .files[0];

  /* IMAGE */
  if(file){

    const reader =
    new FileReader();

    reader.onload = function(e){

      document.getElementById(
      "previewImage"
      ).src = e.target.result;

    };

    reader.readAsDataURL(file);

  }

  /* TEXT */
  document.getElementById(
  "pdfStudentName"
  ).innerText =
  studentSelect.value;

  document.getElementById(
  "pdfAcademic"
  ).innerText =
  "Academic: " +
  document.getElementById("academic").value +
  "/10";

  document.getElementById(
  "pdfCharacter"
  ).innerText =
  "Character: " +
  document.getElementById("character").value +
  "/10";

  document.getElementById(
  "pdfRespect"
  ).innerText =
  "Respect: " +
  document.getElementById("respect").value +
  "/10";

  document.getElementById(
  "pdfRemark"
  ).innerText =
  "Remark: " +
  document.getElementById("remark").value;

  setTimeout(async()=>{

    const { jsPDF } = window.jspdf;

    const element =
    document.getElementById("studentPDF");

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

  },500);

}

/* SEND WHATSAPP */
function sendStudentWhatsApp(){

  const msg =
"Student PDF generated successfully. Please attach the downloaded PDF manually.";

  window.open(
`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
  );

}

/* GENERATE SUGGESTION PDF */
async function generateSuggestionPDF(){

  document.getElementById(
  "suggestionPreview"
  ).innerText =
  document.getElementById(
  "suggestText"
  ).value;

  setTimeout(async()=>{

    const { jsPDF } = window.jspdf;

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

    pdf.save("suggestion-report.pdf");

  },500);

}

/* SEND SUGGESTION */
function sendSuggestionWhatsApp(){

  const msg =
"Suggestion PDF generated successfully. Please attach the downloaded PDF manually.";

  window.open(
`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
  );

}
