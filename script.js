// DOM elements
const container = document.querySelector(".container");
const userInput = document.getElementById("placement");
const submitBtn = document.getElementById("generate");
const downloadBtn = document.getElementById("download-btn");
const sizeOptions = document.querySelector(".size");

// Variables
let QR_Code;
let sizeChoice = 100;


// Event listeners
sizeOptions.addEventListener("change", () => {
  sizeChoice = sizeOptions.value;
});



userInput.addEventListener("input", () => {
  if (userInput.value.trim().length < 1) {
    submitBtn.disabled = true;
    downloadBtn.href = "";
    downloadBtn.classList.add("hide");
  } else {
    submitBtn.disabled = false;
  }
});

// Functions
const inputFormatter = (value) => {
  value = value.replace(/[^a-z0-9A-Z]+/g, "");
  return value;
};

const generateQRCode = async () => {
  // Clear container
  container.innerHTML = "";

  // Generate QR code
  QR_Code = await new QRCode(container, {
    text: userInput.value,
    width: sizeChoice,
    height: sizeChoice,
  });

  // Set url for download
  const src = container.firstChild.toDataURL("image/pmg");
  downloadBtn.href = src;

  // Set download button properties
  let userValue = userInput.value;
  try {
    userValue = new URL(userValue).hostname;
  } catch (_) {
    userValue = inputFormatter(userValue);
  }
  downloadBtn.download = `${userValue}QR`;
  downloadBtn.classList.remove("hide");
};

// Initialize page
window.onload = () => {
  container.innerHTML = "";
  sizeOptions.value = sizeChoice;
  userInput.value = "";
  downloadBtn.classList.add("hide");
  submitBtn.disabled = true;
};

// Event listener for submit button
submitBtn.addEventListener("click", generateQRCode);