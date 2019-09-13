var name;

function init() {
  document
    .getElementById("submitName")
    .addEventListener("click", function(event) {
      name = document.getElementById("name")["value"];
      if (name.length <= 2) {
        alert("Name is too short!");
        return;
      }
      document.getElementById("myList").removeAttribute("disabled");
      document.getElementById("bday").removeAttribute("disabled");
      document.getElementById("starsignList").removeAttribute("disabled");
    });

  document.getElementById("myList").addEventListener("change", function(event) {
    if (event.target.value === "Yes") {
      document.getElementById("starsignInput").style.display = "flex";
      document.getElementById("dateInput").style.display = "none";
    } else {
      document.getElementById("starsignInput").style.display = "none";
      document.getElementById("dateInput").style.display = "flex";
    }
  });

  document.getElementById("bday").addEventListener("change", function(event) {
    let birthday = new Date(event.target.value);
    let date = birthday.getDate();
    let month = birthday.getMonth() + 1;
    let year = birthday.getFullYear();
    if (year / 1000 < 1) {
      return;
    }

    let animal;

    start = 1901;
    x = (start - year) % 12;
    if (x == 1 || x == -11) {
      animal = "Rat";
    } else if (x == 0) {
      animal = "Ox";
    } else if (x == 11 || x == -1) {
      animal = "Tiger";
    } else if (x == 10 || x == -2) {
      animal = "Rabbit";
    } else if (x == 9 || x == -3) {
      animal = "Dragon";
    } else if (x == 8 || x == -4) {
      animal = "Snake";
    } else if (x == 7 || x == -5) {
      animal = "Horse";
    } else if (x == 6 || x == -6) {
      animal = "Sheep";
    } else if (x == 5 || x == -7) {
      animal = "Monkey";
    } else if (x == 4 || x == -8) {
      animal = "Rooster";
    } else if (x == 3 || x == -9) {
      animal = "Dog";
    } else if (x == 2 || x == -10) {
      animal = "Boar";
    }

    let value;

    if ((month == 1 && date >= 21) || (month == 2 && date <= 19)) {
      value = "Aquarius";
    } else if ((month == 2 && date >= 20) || (month == 3 && date <= 20)) {
      value = "Pisces";
    } else if ((month == 3 && date >= 21) || (month == 4 && date <= 19)) {
      value = "Aries";
    } else if ((month == 4 && date >= 21) || (month == 5 && date <= 21)) {
      value = "Taurus";
    } else if ((month == 5 && date >= 22) || (month == 6 && date <= 21)) {
      value = "Gemini";
    } else if ((month == 6 && date >= 22) || (month == 7 && date <= 23)) {
      value = "Cancer";
    } else if ((month == 7 && date >= 24) || (month == 8 && date <= 23)) {
      value = "Leo";
    } else if ((month == 8 && date >= 24) || (month == 9 && date <= 23)) {
      value = "Virgo";
    } else if ((month == 9 && date >= 24) || (month == 10 && date <= 23)) {
      value = "Libra";
    } else if ((month == 10 && date >= 24) || (month == 11 && date <= 22)) {
      value = "Scorpio";
    } else if ((month == 11 && date >= 23) || (month == 12 && date <= 21)) {
      value = "Sagittarius";
    } else if ((month == 12 && date >= 22) || (month == 1 && date <= 20)) {
      value = "Capricorn";
    }

    addStarsignToPage(value);
    addAnimalToPage(animal, year);
  });

  document
    .getElementById("starsignList")
    .addEventListener("change", function(event) {
      addStarsignToPage(event.target.value);
    });
}

function addStarsignToPage(starsign) {
  let p_element = document.getElementById("starsignpara");
  let section = document.getElementById("results");
  if (p_element) {
    p_element.textContent = starsign;
  } else {
    let para = document.createElement("p");
    para.setAttribute("id", "starsignpara");
    let node = document.createTextNode(starsign);
    para.appendChild(node);
    section.appendChild(para);
    section.removeAttribute("style");
    section.classList.add("results-section");
  }
  loadDoc(starsign);
}
function addAnimalToPage(animal, year) {
    // return on false positive
    if (!animal) return;

  let img_element = document.getElementById("animalYearImg");
  let section = document.getElementById("results");
  if (img_element) {
    img_element.setAttribute("src", "Images/" + animal.toLowerCase() + ".png");
  } else {
    let figure = document.createElement("figure");
    let figcap = document.createElement("figcaption");
    let zodiacPic = document.createElement("img");

    zodiacPic.setAttribute("src", "Images/" + animal.toLowerCase() + ".png");
    zodiacPic.setAttribute("id", "animalYearImg");
    zodiacPic.setAttribute("alt", name + "'s zodiac animal, a " + animal);
    zodiacPic.classList.add("results-img");

    let figcapNode = document.createTextNode(
      "This is " +
        name +
        "'s zodiac animal, the " +
        animal +
        " for the year " +
        year
    );
    figcap.appendChild(figcapNode);

    figure.setAttribute("id", "animalFig");
    figure.appendChild(zodiacPic);
    figure.appendChild(figcap);

    section.appendChild(figure);
  }
}

function loadDoc(starsign) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let horoscope = JSON.parse(this.responseText)[starsign]["horoscope"];
      let section = document.getElementById("results");
      /*console.log(horoscope); */
      let hor_element = document.getElementById("horoscopepara");
      if (hor_element) {
        hor_element.textContent = horoscope;
      } else {
        let para = document.createElement("p");
        para.setAttribute("id", "horoscopepara");
        let node = document.createTextNode(horoscope);
        para.appendChild(node);

        // Insert before animalFig if exists
        let animalFig = document.getElementById("animalFig");
        if (animalFig) section.insertBefore(para, animalFig);
        else section.appendChild(para);
      }
    }
  };
  xhttp.open("GET", "horoscopes.json", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send();
}
