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
