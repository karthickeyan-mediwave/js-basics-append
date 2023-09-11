let favMovies = [
  {
    id: "1",
    name: "VTV",
    year: "2020",
  },
  {
    id: "2",
    name: "Jawan",
    year: "2023",
  },
  {
    id: "3",
    name: "Thupakki",
    year: "2023",
  },
  {
    id: "4",
    name: "kathi",
    year: "2023",
  },
  {
    id: "5",
    name: "Asuran",
    year: "2023",
  },
  {
    id: "6",
    name: "Aruvi",
    year: "2023",
  },
  {
    id: "7",
    name: "Dada",
    year: "2023",
  },
  {
    id: "8",
    name: "Maveeran",
    year: "2023",
  },
  {
    id: "9",
    name: "Baheera",
    year: "2023",
  },
];

function makeMovieDiv(movie) {
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
    div.remove();
  });

  div.appendChild(h2);
  div.appendChild(h3);
  div.appendChild(btn);

  return div;
}

function appendToApp(movieDiv) {
  const app = document.querySelector("#app");
  app.appendChild(movieDiv);
}

for (let i = 0; i < favMovies.length; i++) {
  const movieDiv = makeMovieDiv(favMovies[i]);
  appendToApp(movieDiv);
}
