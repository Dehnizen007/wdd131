const temperature = 27;
const windSpeed = 10;

function calculateWindChill(temperature, windSpeed) {
  return 13.12 + (0.6215 * temperature) - (11.37 * windSpeed ** 0.16) + (0.3965 * temperature * windSpeed ** 0.16);
}

const windChill = temperature <= 10 && windSpeed > 4.8
  ? `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`
  : "N/A";

document.querySelector("#wind-chill").textContent = windChill;
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;