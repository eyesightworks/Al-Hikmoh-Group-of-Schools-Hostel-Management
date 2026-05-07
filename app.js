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
function login(){
  const pass = document.getElementById("password").value;

  if(pass === PASSWORD){
    document.getElementById("loginPage").style.display="none";
    document.getElementById("app").style.display="block";

    loadStudents();
    displayRecords();
    displaySuggestions();
  }else{
    alert("Wrong password");
  }
}


// LOGOUT
function logout(){
  location.reload();
}


// MENU
function toggleMenu(){
  const menu=document.getElementById("menu");

  menu.style.display =
  menu.style.display === "block"
  ? "none"
  : "block";
}


// SECTION
function showSection(id){

  document.getElementById("students").style.display="none";
  document.getElementById("suggestion").style.display="none";

  document.getElementById(id).style.display="block";
}


// LOAD STUDENTS
function loadStudents(){

  students.forEach(name=>{

    const option=document.createElement("option");

    option.value=name;
    option.textContent=name;

    studentSelect.appendChild(option);
  });
}


// SEARCH
function filterStudents(){

  const value=document.getElementById("search")
  .value
  .toLowerCase();

  studentSelect.innerHTML="";

  students
  .filter(s=>s.toLowerCase().includes(value))
  .forEach(s=>{

    const option=document.createElement("option");

    option.value=s;
    option.textContent=s;

    studentSelect.appendChild(option);
  });
}


// SAVE RECORD
function saveData(){

  const file=document.getElementById("image").files[0];

  const reader=new FileReader();

  reader.onload=function(){

    const record={
      name:studentSelect.value,
      academic:document.getElementById("academic").value,
      character:document.getElementById("character").value,
      respect:document.getElementById("respect").value,
      remark:document.getElementById("remark").value,
      image:reader.result || "image.jpg",
      date:new Date().toLocaleString()
    };

    let records=
    JSON.parse(localStorage.getItem("records"))
    || [];

    records.push(record);

    localStorage.setItem(
      "records",
      JSON.stringify(records)
    );

    displayRecords();
  };

  if(file){
    reader.readAsDataURL(file);
  }else{
    reader.onload();
  }
}


// DISPLAY RECORDS
function displayRecords(){

  const records=
  JSON.parse(localStorage.getItem("records"))
  || [];

  const list=document.getElementById("recordList");

  list.innerHTML="";

  records.reverse().forEach((r,index)=>{

    const div=document.createElement("div");

    div.className="record-item";

    div.innerHTML=`
      <div id="pdf-${index}">
        <img src="${r.image}">
        <h3>${r.name}</h3>

        Academic: ${r.academic}/10<br>
        Character: ${r.character}/10<br>
        Respect: ${r.respect}/10<br><br>

        Remark:<br>
        ${r.remark}<br><br>

        ${r.date}
      </div>

      <button onclick="generatePDF(${index})">
      Download PDF
      </button>

      <button onclick="sendRecordWhatsApp(${index})">
      Send PDF to WhatsApp
      </button>

      <button class="delete-btn"
      onclick="deleteRecord(${index})">
      Delete
      </button>
    `;

    list.appendChild(div);
  });
}


// DELETE
function deleteRecord(index){

  let records=
  JSON.parse(localStorage.getItem("records"))
  || [];

  records.splice(records.length-1-index,1);

  localStorage.setItem(
    "records",
    JSON.stringify(records)
  );

  displayRecords();
}


// GENERATE PDF
async function generatePDF(index){

  const { jsPDF } = window.jspdf;

  const element=document.getElementById(`pdf-${index}`);

  const canvas=
  await html2canvas(element);

  const imgData=
  canvas.toDataURL("image/png");

  const pdf=new jsPDF();

  pdf.addImage(imgData,"PNG",10,10,180,0);

  pdf.save("student-record.pdf");
}


// WHATSAPP PDF
function sendRecordWhatsApp(index){

  const message=
  "Student PDF generated. Please attach the downloaded PDF manually to WhatsApp.";

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  );
}


// MAIN WHATSAPP
function sendWhatsApp(){

  const msg=
`Al Hikmoh Group of Schools

Student: ${studentSelect.value}

Academic:
${document.getElementById("academic").value}/10

Character:
${document.getElementById("character").value}/10

Respect:
${document.getElementById("respect").value}/10

Remark:
${document.getElementById("remark").value}`;

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
  );
}


// SAVE SUGGESTION
function saveSuggestion(){

  const text=
  document.getElementById("suggestText").value;

  let suggestions=
  JSON.parse(localStorage.getItem("suggestions"))
  || [];

  suggestions.push({
    text,
    date:new Date().toLocaleString()
  });

  localStorage.setItem(
    "suggestions",
    JSON.stringify(suggestions)
  );

  displaySuggestions();
}


// DISPLAY SUGGESTIONS
function displaySuggestions(){

  const suggestions=
  JSON.parse(localStorage.getItem("suggestions"))
  || [];

  const box=
  document.getElementById("suggestList");

  box.innerHTML="";

  suggestions.reverse().forEach((s,index)=>{

    const div=document.createElement("div");

    div.className="record-item";

    div.innerHTML=`
      <div id="suggest-pdf-${index}">
        <h3>Suggestion</h3>

        ${s.text}<br><br>

        ${s.date}
      </div>

      <button onclick="generateSuggestionPDF(${index})">
      Download PDF
      </button>

      <button onclick="sendSuggestionWhatsApp()">
      Send Suggestion PDF
      </button>
    `;

    box.appendChild(div);
  });
}


// SUGGESTION PDF
async function generateSuggestionPDF(index){

  const { jsPDF } = window.jspdf;

  const element=
  document.getElementById(`suggest-pdf-${index}`);

  const canvas=
  await html2canvas(element);

  const imgData=
  canvas.toDataURL("image/png");

  const pdf=new jsPDF();

  pdf.addImage(imgData,"PNG",10,10,180,0);

  pdf.save("suggestion.pdf");
}


// SEND SUGGESTION WHATSAPP
function sendSuggestionWhatsApp(){

  const msg=
  "Suggestion PDF generated. Please attach the PDF manually to WhatsApp.";

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
  );
}
