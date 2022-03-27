const list = document.getElementById("list");
const search = document.getElementById("searchField");
const searchScroll = document.getElementById("scroll");
const img = document.createElement("img");
let teachers;
let newTeachers;
list.style.display = "none";
searchScroll.style.display = "none";
img.style.display = "none";

fetch("http://hp-api.herokuapp.com/api/characters/staff")
  .then((response) => response.json())
  .then((result) => {
    teachers = result;
    list.innerHTML = "";
    for (i = 0; i < result.length; i++) {}
  });

search.addEventListener("input", function () {
  newTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(search.value.toLowerCase())
  );
  list.innerHTML = "";
  for (i = 0; i < newTeachers.length; i++) {
    img.setAttribute("src", newTeachers[i].image);
    img.setAttribute("id", "profilePic");
    document.getElementById("two").appendChild(img);
    list.innerHTML +=
      "<li>" +
      "Name: " +
      newTeachers[i].name +
      "<br>" +
      "House: " +
      newTeachers[i].house +
      "<br>" +
      "Birthday: " +
      newTeachers[i].dateOfBirth +
      "</li>";
    if (search.value.length > 0 && newTeachers.length < 2) {
      list.style.display = "block";
      searchScroll.style.display = "block";
      img.style.display = "block";
    } else if (search.value.length < 1 && newTeachers.length > 2) {
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

for (i = 0; i < splitText.length; i++) {
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
        data: [3, 1, 4, 1],
        backgroundColor: ["darkgreen", "orange", "darkred", "darkblue"],
      },
    ],
  },
});

button.addEventListener("click", function () {
  const key = search.value;
  console.log(key);
  if (key) {
    localStorage.setItem(key, JSON.stringify({ newTeachers }));
  }
  /*for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    three.innerHTML += `${key}:<br>`;
  }*/
  console.log(localStorage);
});
