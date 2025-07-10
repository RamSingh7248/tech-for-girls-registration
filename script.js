// === Initial Share Count ===
let shareCount = Number(localStorage.getItem("shareCount")) || 0;

// === DOM Elements ===
const form = document.getElementById('registrationForm');
const whatsappBtn = document.getElementById('whatsappBtn');
const shareCountDisplay = document.getElementById('shareCount');
const submitBtn = document.getElementById('submitBtn');
const thankYou = document.getElementById('thankYouMessage');

// === Prevent Resubmission ===
const isSubmitted = localStorage.getItem("submitted");
if (isSubmitted) {
  form.style.display = "none";
  thankYou.style.display = "block";
} else {
  shareCountDisplay.innerText = `Click count: ${shareCount}/5`;
}

// === WhatsApp Share Button ===
whatsappBtn.addEventListener('click', () => {
  if (shareCount < 5) {
    shareCount++;
    localStorage.setItem("shareCount", shareCount);

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL, "_blank");

    shareCountDisplay.innerText = `Click count: ${shareCount}/5`;

    if (shareCount === 5) {
      alert("✅ Sharing complete. You can now submit the form.");
    }
  } else {
    alert("✅ You’ve already shared 5 times.");
  }
});

// === Form Submission ===
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (shareCount < 5) {
    alert("❌ Please share 5 times before submitting the form.");
    return;
  }

  submitBtn.disabled = true;

  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const college = document.getElementById('college').value.trim();
  const screenshotFile = document.getElementById('screenshot').files[0];
  const screenshotName = screenshotFile ? screenshotFile.name : "Not uploaded";

  const formData = new URLSearchParams();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", screenshotName);

  const uploadURL = "https://script.google.com/macros/s/AKfycbwk9IW526h7oyaDNSzAGAI92p3LianUGMS9UppelEvAFm6Cq8A8C4mzDWll4tp_tWEg/exec";

  try {
    await fetch(uploadURL, {
      method: "POST",
      body: formData
    });

    localStorage.setItem("submitted", true);
    localStorage.removeItem("shareCount");

    form.reset();
    form.style.display = "none";
    thankYou.style.display = "block";
  } catch (error) {
    console.error("Submission error:", error);
    alert("❌ Error submitting the form. Please try again.");
    submitBtn.disabled = false;
  }
});
