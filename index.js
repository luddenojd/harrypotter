const list = document.getElementById("list");
const search = document.getElementById("searchField");
const searchScroll = document.getElementById("scroll");
const img = document.createElement("img");
let students;
let newStudents;
list.style.display = "none";
searchScroll.style.display = "none";
img.style.display = "none";

fetch("http://hp-api.herokuapp.com/api/characters/students")
  .then((response) => response.json())
  .then((result) => {
    students = result;
    list.innerHTML = "";

    for (let i = 0; i < result.length; i++) {}
  });

const chart = new Chart(document.querySelector("canvas").getContext("2d"), {
  type: "doughnut",
  options: {
    responsive: false,
    plugins: {
      legend: {
        labels: {
          boxWidth: 0,
          color: "white",
          font: {
            weight: "bold",
          },
        },
      },
    },
  },

  data: {
    labels: ["Slytherin", "Hufflepuff", "Gryffindor", "Ravenclaw"],
    datasets: [
      {
        label: "Houses",
        data: [19, 12, 24, 15],
        backgroundColor: ["darkgreen", "orange", "darkred", "darkblue"],
      },
    ],
  },
});

search.addEventListener("input", function () {
  newStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.value.toLowerCase())
  );
  list.innerHTML = "";
  for (let i = 0; i < newStudents.length; i++) {
    img.setAttribute("src", newStudents[i].image);
    img.setAttribute("id", "profilePic");
    document.getElementById("two").appendChild(img);
    list.innerHTML +=
      "<li>" +
      "Name: " +
      newStudents[i].name +
      "<br>" +
      "House: " +
      newStudents[i].house +
      "<br>" +
      "Birthday: " +
      newStudents[i].dateOfBirth +
      "</li>";
    if (search.value.length > 0 && newStudents.length < 2) {
      list.style.display = "block";
      searchScroll.style.display = "block";
      img.style.display = "block";
    } else if (search.value.length < 1 && newStudents.length > 2) {
      list.style.display = "none";
      searchScroll.style.display = "none";
      img.style.display = "none";
    } else if (search.value.length > 0) {
      list.style.display = "none";
      searchScroll.style.display = "none";
      img.style.display = "none";
    }
  }
});

const text = document.getElementById("rolling");
const strText = text.textContent;
const splitText = strText.split("");
text.textContent = "";

for (let i = 0; i < splitText.length; i++) {
  text.innerHTML += "<span>" + splitText[i] + "</span>";
}

let char = 0;
let timer = setInterval(onTick, 150);

function onTick() {
  const span = text.querySelectorAll("span")[char];
  span.classList.add("fade");
  char++;
  if (char === splitText.length) {
    complete();
    return;
  }
}

function complete() {
  clearInterval(timer);
  timer = null;
}

button.addEventListener("click", function () {
  const key = search.value;
  console.log(key);
  if (key) {
    localStorage.setItem(key, JSON.stringify({ newStudents }));
  }
  /*for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    three.innerHTML += `${key}:<br>`;
  }*/
  console.log(localStorage);
});
