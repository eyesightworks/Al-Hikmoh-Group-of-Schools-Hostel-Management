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
  ) || [];

let subjects =
  JSON.parse(
    localStorage.getItem("subjects")
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
    localStorage.getItem("reportHistory")
  ) || [];

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
