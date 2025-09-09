const tips = [
  "Deepfakes often have unnatural blinking.",
  "Mouth movements may not match audio.",
  "Shadows and lighting can look inconsistent.",
  "Check video source before resharing.",
  "Faces may look overly smooth or blurry."
];

// Show random tip
document.getElementById("tip").innerText = tips[Math.floor(Math.random() * tips.length)];
// Optionally, refresh tip on popup open

// Load history
chrome.storage.local.get({ history: [] }, (data) => {
  let histHTML = "<h4>Recent Checks</h4>";
  data.history.forEach(h => {
    histHTML += `<div>${h.label} – ${Math.round(h.score * 100)}%</div>`;
  });
  document.getElementById("history").innerHTML = histHTML;
});

// Report button
document.getElementById("report").addEventListener("click", () => {
  fetch("http://localhost:5000/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: lastCheckedUrl, feedback: "wrong_result" })
  });
  alert("Thanks for your feedback! This will help improve DeepTrust.");
});

document.getElementById("bar").style.background = data.score > 0.7 ? "red" : data.score > 0.3 ? "orange" : "green";
document.getElementById("bar").style.width = `${Math.round(data.score * 100)}%`;
