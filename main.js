let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let track_index = 0;
let isPlaying = false;
let updateTimer;
let curr_track = document.createElement('audio');
let track_list = [
  {
    name: "Intentions ft Quavo",
    artist: "Justin Bieber",
    image: "https://wowplus.net/wp-content/uploads/2020/05/maxresdefault-10.jpg",
    path: "https://wowplus.net/wp-content/uploads/2020/05/Justin-Bieber-Intentions-ft.-Quavo-wowplus.net_.mp3"
  },
  {
    name: "End-of-Time",
    artist: "Alan-Walker-Ahrix",
    image: "https://wowplus.net/wp-content/uploads/2020/03/maxresdefault-2.jpg",
    path: "https://wowplus.net/wp-content/uploads/2020/03/K-391-Alan-Walker-Ahrix-End-of-Time.mp3"
  },
  {
    name: "Are You Lonely feat. ISÁK ",
    artist: "Steve Aoki & Alan Walker",
    image: "https://wowplus.net/wp-content/uploads/2019/08/maxresdefault-1.jpg",
    path: "https://wowplus.net/music1/Steve%20Aoki%20%20Alan%20Walker%20-%20Are%20You%20Lonely%20feat.%20ISA%CC%81K%20%28Official%20Video%29%20%5BUltra%20Music%5D.mp3",
  },
];

function random_bg_color() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";
  document.body.style.background = bgColor;
}
function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();
  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
loadTrack(track_index);
function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}
function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}
function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}
function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}
function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}