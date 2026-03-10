import {
  generateMusicItemUsingInnerHTML,
  generateMusicItemUsingTemplate,
  getAllMusics,
} from './utils.js';

const drawerButton = document.querySelector('#drawer-button');
const drawerNavigation = document.querySelector('#navList');

// Get By Id
const musicList = document.getElementById('musicList');

// Get
const musicListContainer = document.querySelector('#musicList');


// musicList.parentElement.removeChild(musicList);

function setupDrawer() {
  drawerButton.addEventListener('click', () => {
    drawerNavigation.classList.toggle('open');
  });

  document.body.addEventListener('click', (event) => {
    if (!drawerNavigation.contains(event.target) && !drawerButton.contains(event.target)) {
      drawerNavigation.classList.remove('open');
    }
  });
}

function populateMusicWithTemplate(musics) {
  musicList.replaceChildren();
  const element = musics.map(generateMusicItemUsingTemplate);
  musicList.append(...element);
}

function populateMusicWithInnerHTML(musics) {
  const element = musics.map(generateMusicItemUsingInnerHTML);
  musicList.innerHTML = element.join('');
}

function stopOtherAudio(currentAudio) {
  const listOfAudioElement = document.querySelectorAll('audio');

  listOfAudioElement.forEach((audioElement) => {
    if (currentAudio !== audioElement) {
      audioElement.pause();
    }
  });
}

function setupOnlyOneAudioIsPlaying() {
  const listOfAudioElement = document.querySelectorAll('audio');

  listOfAudioElement.forEach((audioElement) => {
    audioElement.addEventListener('play', (event) => {
      const currentAudio = event.currentTarget;
      stopOtherAudio(currentAudio);
    });
  });
}

function init() {
  setupDrawer();

  // Lakukan get musics dan render ke DOM di sini
  const musics = getAllMusics();

  if (!musicList || !musicListContainer) {
    return;
  }

  populateMusicWithTemplate(musics);

  // populateMusicWithInnerHTML()

  setupOnlyOneAudioIsPlaying();
}

init();
