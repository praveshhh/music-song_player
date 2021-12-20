const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Songs info
const songs = [
  {
    title: 'Attention',
    artist: 'Charlie Puth',
    coverPath: 'assets/images/cover1.jpg',
    discPath: 'assets/music/01 Charlie Puth - Attention.mp3',
    duration: '3:28',
  },
  {
    title: 'Saregama Karwa',
    artist: 'mix',
    coverPath: 'assets/images/cover2.jpg',
    discPath: 'assets/music/5000OldSongs.mp3',
    duration: '7:36:57',
  },
  {
    title: 'Memories',
    artist: 'Maroon5',
    coverPath: 'assets/images/cover3.jpg',
    discPath: 'assets/music/01 Maroon 5 - Memories.mp3',
    duration: '3:09',
  },
  {
    title: 'Heat Waves',
    artist: 'Glass Animals',
    coverPath: 'assets/images/cover1.jpg',
    discPath: 'assets/music/Glass Animals - Heat Waves (320).mp3',
    duration: '3:58',
  },
  {
    title: 'Perfect',
    artist: 'Ed Sheeran',
    coverPath: 'assets/images/cover2.jpg',
    discPath: 'assets/music/Ed Sheeran - Perfect (Official Music Video).mp3',
    duration: '4:23',
  },
  {
    title: 'Locked Away',
    artist: 'R city',
    coverPath: 'assets/images/cover3.jpg',
    discPath: 'assets/music/01 R. City - Locked Away.mp3',
    duration: '3:47',
  },
  {
    title: 'More Than Friends - 24kgoldn (320).mp3',
    artist: '24k Gold',
    coverPath: 'assets/images/cover1.jpg',
    discPath: 'assets/music/More Than Friends - 24kgoldn (320).mp3',
    duration: '2:54',
  },
  {
    title: 'kun faya kun',
    artist: 'AR.Rehman',
    coverPath: 'assets/images/cover2.jpg',
    discPath: 'assets/music/Rockstar – Kun Faya Kun.mp3',
    duration: '7:50',
  },
  {
    title: 'Yalgaar',
    artist: 'Michael Ramir',
    coverPath: 'assets/images/cover1.jpg',
    discPath: 'assets/music/Yalgaar.mp3',
    duration: '3:15',
  },
  {
    title: ' I Hate U',
    artist: 'SZA',
    coverPath: 'assets/images/cover2.jpg',
    discPath: 'assets/music/SZA - I Hate U.mp3',
    duration: '2:54',
  },
  {
    title: 'Udd Gaye',
    artist: 'Ritviz',
    coverPath: 'assets/images/cover1.jpg',
    discPath: 'assets/music/Udd Gaye (Bacardi House Party Sessions) - Ritviz.m4a',
    duration: '3:00',
  },
  {
    title: 'Yes or No',
    artist: 'Jass Manak',
    coverPath: 'assets/images/cover2.jpg',
    discPath: 'assets/music/Yes Or No.mp3',
    duration: '3:14',
  },
  {
    title: 'Gimme that Bottle',
    artist: 'Michael Ramir',
    coverPath: 'assets/images/cover3.jpg',
    discPath: 'assets/music/music3.mp3',
    duration: '1:54',
  },
  
];

// Load song initially








loadSong(songs[songIndex]);

// Load the given song



function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

// Toggle play and pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

// Update icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

// Update progress bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Go to previous song
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

// Go to next song
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);
