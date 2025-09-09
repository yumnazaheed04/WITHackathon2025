document.addEventListener("mouseover", (e) => {
  let target = e.target;
  if (target.tagName === "VIDEO" || target.tagName === "IMG") {
    let url = target.src;

    fetch("http://localhost:5000/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    })
      .then(res => res.json())
      .then(data => {
        // Remove existing badge if any
        let oldBadge = document.getElementById("deeptrust-badge");
        if (oldBadge) oldBadge.remove();

        let badge = document.createElement("div");
        badge.id = "deeptrust-badge";
        badge.innerHTML = `${data.label} <br/> Confidence: ${Math.round(data.score * 100)}%`;
        badge.style.position = "absolute";
        badge.style.top = "5px"; // Add some offset from the top
        badge.style.left = "5px"; // Add some offset from the left
        badge.style.background = data.score > 0.7 ? "red" : data.score > 0.3 ? "orange" : "green";
        badge.style.color = "white";
        badge.style.padding = "5px";
        badge.style.borderRadius = "6px";
        badge.style.fontSize = "12px";
        badge.style.zIndex = "99999"; // Increase z-index for visibility
        badge.style.pointerEvents = "auto"; // Allow clicking

        // Ensure parent is positioned
        const parent = target.parentElement;
        if (parent) {
          if (getComputedStyle(parent).position === "static") {
            parent.style.position = "relative";
          }
          parent.appendChild(badge);
        }

        badge.addEventListener("click", () => {
          alert(`Why flagged?\n${data.reason}\n\nTip: ${tips[Math.floor(Math.random() * tips.length)]}`);
        });

        // Save history in Chrome storage
        chrome.storage.local.get({ history: [] }, (dataStore) => {
          let history = dataStore.history;
          history.unshift({ url, label: data.label, score: data.score });
          if (history.length > 5) history.pop(); // keep last 5
          chrome.storage.local.set({ history });
        });
      });
  }
});
