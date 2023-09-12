let favMovies = [];

function makeMovieDiv(movie) {
  if (movie.isEdit) {
    const div = document.createElement("div");
    div.setAttribute("class", "movie-card");

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", `edit-${movie.id}-name`);
    nameInput.setAttribute("placeholder", "Enter movie name");
    nameInput.setAttribute("id", `edit-${movie.id}-name`);
    nameInput.setAttribute("value", movie.name);

    const yearInput = document.createElement("input");
    yearInput.setAttribute("type", "number");
    yearInput.setAttribute("name", `edit-${movie.id}-year`);
    yearInput.setAttribute("placeholder", "Enter movie year");
    yearInput.setAttribute("id", `edit-${movie.id}-year`);
    yearInput.setAttribute("value", movie.year);

    const button = document.createElement("button");
    button.setAttribute("class", "update-btn");
    button.innerText = "Update movie";

    button.addEventListener("click", function () {
      const newTitle = document.querySelector(`#edit-${movie.id}-name`).value;
      const newYear = document.querySelector(`#edit-${movie.id}-year`).value;

      const toUpdateIndex = favMovies.findIndex((m) => m.id == movie.id);
      if (toUpdateIndex != -1) {
        favMovies[toUpdateIndex]["name"] = newTitle;
        favMovies[toUpdateIndex]["year"] = newYear;
        favMovies[toUpdateIndex]["isEdit"] = false;
        saveToLocalStorage();
        updateUI();
      }
    });

    div.appendChild(nameInput);
    div.appendChild(yearInput);
    div.appendChild(button);

    return div;
  } else {
    const div = document.createElement("div");
    div.setAttribute("class", "movie-card");

    const id = `movie-${movie["id"]}`;
    div.setAttribute("id", id);

    const h2 = document.createElement("h2");
    h2.innerText = movie["name"];

    const h3 = document.createElement("h3");
    h3.innerText = movie["year"];

    /* delete button*/
    const btn = document.createElement("button");
    const btnid = `button-${movie["id"]}`;
    btn.setAttribute("id", btnid);
    btn.setAttribute("class", "btn");
    btn.innerText = "Delete";
    btn.addEventListener("click", function () {
      removeMovie(movie["id"]);
    });
    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", " edit-btn");

    editBtn.innerText = "edit";
    editBtn.addEventListener("click", function () {
      editMovie(movie["id"]);
    });

    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(btn);
    div.appendChild(editBtn);

    return div;
  }
}
function appendToApp(movieDiv) {
  const app = document.querySelector("#app");
  app.appendChild(movieDiv);
}

/* add movie */

function addMovie(movie) {
  favMovies.push(movie);
  saveToLocalStorage();
  updateUI();
}
/* edit*/
function editMovie(movieId) {
  console.log("Editing ", movieId);
  const toEditIndex = favMovies.findIndex((movie) => movie.id == movieId);
  if (toEditIndex != -1) {
    favMovies[toEditIndex]["isEdit"] = true;
    updateUI();
  }
}

function removeMovie(movieId) {
  console.log("Deleting ", movieId);
  const filteredArray = favMovies.filter((movie) => movie.id != movieId);
  favMovies = filteredArray;
  saveToLocalStorage();
  updateUI();
}

function clearApp() {
  const app = document.querySelector("#app");
  app.innerHTML = "";
}
let form = document.querySelector("#add-movie-form");

function validation() {
  const name = document.querySelector("#movie-name").value;
  const year = document.querySelector("#movie-year").value;
  const date = new Date();
  let currentyear = date.getFullYear();

  if (!name) {
    alert("please enter movie name");
    return false;
  } else if (year == "" || year == null) {
    alert("please enter movie year");
    return false;
  } else if (currentyear < year) {
    alert("please enter current year");
    return false;
  }
  return true;
}

function hookForm() {
  const form = document.querySelector("#add-movie-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.querySelector("#movie-name").value;
    const year = document.querySelector("#movie-year").value;
    const movie = {
      id: new Date().getTime(),
      name: name,
      year: year,
      isEdit: false,
    };
    const formValid = validation();
    if (formValid) {
      addMovie(movie);
      form.reset();
      return;
    }
    alert("fail");
  });
}
function updateUI() {
  clearApp();
  for (let i = 0; i < favMovies.length; i++) {
    const movieDiv = makeMovieDiv(favMovies[i]);
    appendToApp(movieDiv);
  }
}
function saveToLocalStorage() {
  const str = JSON.stringify(favMovies);
  localStorage.setItem("my-movie-list", str);
}

function getFromLocalStorage() {
  const str = localStorage.getItem("my-movie-list");
  if (!str) {
    favMovies = [];
  } else {
    favMovies = JSON.parse(str);
  }
}

// function datevalid() {
//   const date = new Date();
//   let currentyear = date.getFullYear();
//   if (currentyear != year) {
//     console.log(year);
//   }
// }

getFromLocalStorage();
updateUI();
hookForm();
