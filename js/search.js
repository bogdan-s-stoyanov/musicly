let currentGenre = "All";
let currentSort = "";

function renderSongs(songArray) {
  const songsList = document.getElementById("songsList");
  songsList.innerHTML = "";

  if (songArray.length === 0) {
    songsList.innerHTML = `<p class="no-results-v2">No songs found.</p>`;
    return;
  }

  songArray.forEach(song => {
    const songItem = document.createElement("div");
    songItem.className = "song-item-v2";

    songItem.innerHTML = `
      <div class="song-left-v2">
        <img src="${song.image}" alt="${song.title}" class="song-cover-v2">
        <div class="song-info-v2">
          <h3 class="song-name-v2">${song.title}</h3>
          <p class="song-artist-v2">${song.artist}</p>
        </div>
      </div>

      <div class="song-controls-v2">
        <button 
          class="song-btn-v2 play-btn"
          data-audio="${song.audio}"
          data-title="${song.title}"
          data-artist="${song.artist}"
        >▶</button>

        <button class="song-btn-v2" onclick="addToLibrary(${song.id})">＋</button>
      </div>
    `;

    songsList.appendChild(songItem);
  });

  document.querySelectorAll(".play-btn").forEach(button => {
    button.addEventListener("click", () => {
      playSong(
        button.dataset.audio,
        button.dataset.title,
        button.dataset.artist
      );
    });
  });
}


function playSong(audioPath, songTitle, songArtist) {
  const player = document.getElementById("audioPlayer");
  const info = document.getElementById("searchStickyPlayerInfo");

  player.src = audioPath;
  info.textContent = `${songTitle} - ${songArtist}`;
  player.play();
}

function addToLibrary(songId) {
  const selectedSong = songs.find(song => song.id === songId);
  if (!selectedSong) return;

  let library = JSON.parse(localStorage.getItem("library")) || [];
  const alreadyExists = library.some(song => song.id === selectedSong.id);

  if (alreadyExists) {
    alert(`${selectedSong.title} is already in your library.`);
    return;
  }

  library.push(selectedSong);
  localStorage.setItem("library", JSON.stringify(library));
  alert(`${selectedSong.title} added to library!`);
}

function filterByGenre(genre) {
  currentGenre = genre;
  document.getElementById("filterMenu").classList.add("hidden-menu");
  applyFilters();
}

function sortSongs(type) {
  currentSort = type;
  document.getElementById("sortMenu").classList.add("hidden-menu");
  applyFilters();
}

function applyFilters() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();

  let filteredSongs = songs.filter(song => {
    const matchesSearch =
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.genre.toLowerCase().includes(query);

    const matchesGenre =
      currentGenre === "All" || song.genre === currentGenre;

    return matchesSearch && matchesGenre;
  });

  if (currentSort === "title") {
    filteredSongs.sort((a, b) => a.title.localeCompare(b.title));
  } else if (currentSort === "artist") {
    filteredSongs.sort((a, b) => a.artist.localeCompare(b.artist));
  } else if (currentSort === "genre") {
    filteredSongs.sort((a, b) => a.genre.localeCompare(b.genre));
  }

  renderSongs(filteredSongs);
}

function toggleFilterMenu() {
  document.getElementById("filterMenu").classList.toggle("hidden-menu");
  document.getElementById("sortMenu").classList.add("hidden-menu");
}

function toggleSortMenu() {
  document.getElementById("sortMenu").classList.toggle("hidden-menu");
  document.getElementById("filterMenu").classList.add("hidden-menu");
}

document.addEventListener("DOMContentLoaded", () => {
  renderSongs(songs);

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", applyFilters);
});