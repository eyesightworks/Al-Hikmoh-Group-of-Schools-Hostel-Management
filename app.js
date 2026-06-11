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
