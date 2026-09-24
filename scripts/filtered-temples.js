const temples = [
  { templeName: "Aba Nigeria", location: "Aba, Nigeria", dedicated: "2005, August, 7", area: 11500, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg" },
  { templeName: "Manti Utah", location: "Manti, Utah, United States", dedicated: "1888, May, 21", area: 74792, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg" },
  { templeName: "Payson Utah", location: "Payson, Utah, United States", dedicated: "2015, June, 7", area: 96630, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg" },
  { templeName: "Yigo Guam", location: "Yigo, Guam", dedicated: "2020, May, 2", area: 6861, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg" },
  { templeName: "Washington D.C.", location: "Kensington, Maryland, United States", dedicated: "1974, November, 19", area: 156558, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg" },
  { templeName: "Lima Perú", location: "Lima, Perú", dedicated: "1986, January, 10", area: 9600, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg" },
  { templeName: "Mexico City Mexico", location: "Mexico City, Mexico", dedicated: "1983, December, 2", area: 116642, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg" },
  { templeName: "Accra Ghana", location: "Accra, Ghana", dedicated: "2004, January, 11", area: 17500, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x225/accra-ghana-temple-detail-249022-2400x1200.jpg" },
  { templeName: "Salt Lake Utah", location: "Salt Lake City, Utah, United States", dedicated: "1893, April, 6", area: 253015, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/800x500/slctemple5.jpg" },
  { templeName: "Rome Italy", location: "Rome, Italy", dedicated: "2019, March, 10", area: 40900, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/800x500/4-Rome-Temple-2160935.jpg" }
];

const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#primary-nav");
const templeGrid = document.querySelector("#temple-grid");
const pageTitle = document.querySelector("#page-title");

function createTempleCard(temple) {
  const card = document.createElement("article");
  card.className = "temple-card";
  card.innerHTML = `<h2>${temple.templeName}</h2><img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy"><p><strong>Location:</strong> ${temple.location}</p><p><strong>Dedicated:</strong> ${temple.dedicated}</p><p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>`;
  return card;
}

function filterTemples(filter) {
  const filteredTemples = temples.filter((temple) => {
    const year = Number.parseInt(temple.dedicated, 10);
    if (filter === "old") return year < 1900;
    if (filter === "new") return year > 2000;
    if (filter === "large") return temple.area > 90000;
    if (filter === "small") return temple.area < 10000;
    return true;
  });
  templeGrid.replaceChildren(...filteredTemples.map(createTempleCard));
  pageTitle.textContent = filter[0].toUpperCase() + filter.slice(1);
}

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuButton.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});

navigation.addEventListener("click", (event) => {
  const link = event.target.closest("[data-filter]");
  if (!link) return;
  event.preventDefault();
  filterTemples(link.dataset.filter);
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
});

filterTemples("home");
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;