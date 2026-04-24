let currentLibraryGenre = "All";
let currentLibrarySort = "";

function getLibrarySongs() {
  return JSON.parse(localStorage.getItem("library")) || [];
}

function saveLibrarySongs(library) {
  localStorage.setItem("library", JSON.stringify(library));
}

function renderLibrarySongs(songArray) {
  const librarySongsList = document.getElementById("librarySongsList");
  librarySongsList.innerHTML = "";

  if (songArray.length === 0) {
    librarySongsList.innerHTML = `<p class="no-results-v2">Your library is empty.</p>`;
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
          class="song-btn-v2 play-library-btn"
          data-audio="${song.audio}"
          data-title="${song.title}"
          data-artist="${song.artist}"
        >▶</button>

        <button
          class="song-btn-v2 delete-library-btn"
          data-id="${song.id}"
        >🗑</button>
      </div>
    `;

    librarySongsList.appendChild(songItem);
  });

  document.querySelectorAll(".play-library-btn").forEach(button => {
    button.addEventListener("click", () => {
      playLibrarySong(
        button.dataset.audio,
        button.dataset.title,
        button.dataset.artist
      );
    });
  });

  document.querySelectorAll(".delete-library-btn").forEach(button => {
    button.addEventListener("click", () => {
      removeFromLibrary(Number(button.dataset.id));
    });
  });
}

function playLibrarySong(audioPath, songTitle, songArtist) {
  const player = document.getElementById("libraryAudioPlayer");
  const info = document.getElementById("libraryStickyPlayerInfo");

  player.src = audioPath;
  info.textContent = `${songTitle} - ${songArtist}`;
  player.play();
}

function removeFromLibrary(songId) {
  let library = getLibrarySongs();
  library = library.filter(song => song.id !== songId);
  saveLibrarySongs(library);
  applyLibraryFilters();
}

function filterLibraryByGenre(genre) {
  currentLibraryGenre = genre;
  document.getElementById("libraryFilterMenu").classList.add("hidden-menu");
  applyLibraryFilters();
}

function sortLibrarySongs(type) {
  currentLibrarySort = type;
  document.getElementById("librarySortMenu").classList.add("hidden-menu");
  applyLibraryFilters();
}

function applyLibraryFilters() {
  const query = document.getElementById("librarySearchInput").value.toLowerCase().trim();

  let library = getLibrarySongs();

  let filteredSongs = library.filter(song => {
    const matchesSearch =
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.genre.toLowerCase().includes(query);

    const matchesGenre =
      currentLibraryGenre === "All" || song.genre === currentLibraryGenre;

    return matchesSearch && matchesGenre;
  });

  if (currentLibrarySort === "title") {
    filteredSongs.sort((a, b) => a.title.localeCompare(b.title));
  } else if (currentLibrarySort === "artist") {
    filteredSongs.sort((a, b) => a.artist.localeCompare(b.artist));
  } else if (currentLibrarySort === "genre") {
    filteredSongs.sort((a, b) => a.genre.localeCompare(b.genre));
  }

  renderLibrarySongs(filteredSongs);
}

function toggleLibraryFilterMenu() {
  document.getElementById("libraryFilterMenu").classList.toggle("hidden-menu");
  document.getElementById("librarySortMenu").classList.add("hidden-menu");
}

function toggleLibrarySortMenu() {
  document.getElementById("librarySortMenu").classList.toggle("hidden-menu");
  document.getElementById("libraryFilterMenu").classList.add("hidden-menu");
}

document.addEventListener("DOMContentLoaded", () => {
  applyLibraryFilters();

  const searchInput = document.getElementById("librarySearchInput");
  searchInput.addEventListener("input", applyLibraryFilters);
});