function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function recognizeSong() {
  const rawInput = document.getElementById("lyricsInput").value.trim();
  const resultBox = document.getElementById("recognizerResult");
  const formCard = document.getElementById("recognizerFormCard");

  if (!rawInput) {
    showRecognizerMessage("Please enter some lyrics first.");
    return;
  }

  const normalizedInput = normalizeText(rawInput);

  let foundSong = null;

  for (const song of songs) {
    try {
      const response = await fetch(song.lyricsFile);

      if (!response.ok) {
        continue;
      }

      const lyrics = await response.text();
      const normalizedLyrics = normalizeText(lyrics);

      if (normalizedLyrics.includes(normalizedInput)) {
        foundSong = song;
        break;
      }
    } catch (error) {
      console.error("Could not load:", song.lyricsFile, error);
    }
  }

  formCard.classList.add("hidden-result");
  resultBox.classList.remove("hidden-result");

  if (foundSong) {
    resultBox.innerHTML = `
      <div class="recognized-song-card">
        <img src="${foundSong.image}" alt="${foundSong.title}" class="recognized-song-image">
        <h2 class="recognized-song-title">${foundSong.title}</h2>
        <p class="recognized-song-artist">${foundSong.artist}</p>

        <div class="recognizer-actions recognizer-result-actions">
          <button class="recognizer-back-btn" onclick="resetRecognizer()">Try Again</button>
          <a href="app.html" class="recognizer-btn">Go Home</a>
        </div>
      </div>
    `;
  } else {
    resultBox.innerHTML = `
      <div class="recognizer-message">
        No matching song was found.
        <div class="recognizer-actions recognizer-result-actions">
          <button class="recognizer-back-btn" onclick="resetRecognizer()">Try Again</button>
        </div>
      </div>
    `;
  }
}

function showRecognizerMessage(message) {
  const resultBox = document.getElementById("recognizerResult");
  resultBox.classList.remove("hidden-result");
  resultBox.innerHTML = `
    <div class="recognizer-message">
      ${message}
    </div>
  `;
}

function resetRecognizer() {
  const formCard = document.getElementById("recognizerFormCard");
  const resultBox = document.getElementById("recognizerResult");
  const input = document.getElementById("lyricsInput");

  input.value = "";
  resultBox.classList.add("hidden-result");
  resultBox.innerHTML = "";
  formCard.classList.remove("hidden-result");
  input.focus();
}