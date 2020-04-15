const video = document.getElementById('video')
const playPauseButton = document.getElementById('play-pause')
const stopButton = document.getElementById('stop')
const progress = document.getElementById('progress')
const pointer = document.getElementById('pointer')
const timestamp = document.getElementById('timestamp')
const progressRect = progress.getBoundingClientRect()

video.controls = false

playPauseButton.addEventListener('click', updateVideoStatus)
stopButton.addEventListener('click', resetVideoStatus)
video.addEventListener('timeupdate', updateTimeStamp)
video.addEventListener('timeupdate', updatePointerPosition)
progress.addEventListener('click', setPointerPosition)

function updateVideoStatus() {
  video.paused ? video.play() : video.pause()
  updatePlayPauseButton()
}

function resetVideoStatus() {
  video.pause()
  video.currentTime = 0
  pointer.style.left = '0px'
  updatePlayPauseButton()
}

function updatePlayPauseButton() {
  if (video.paused) {
    playPauseButton.firstElementChild.classList.replace('fa-pause', 'fa-play')
  } else {
    playPauseButton.firstElementChild.classList.replace('fa-play', 'fa-pause')
  }
}

function updateTimeStamp() {
  let minutes = Math.floor(video.currentTime / 60)
  let seconds = Math.floor(video.currentTime - minutes * 60)
  let minuteValue
  let secondValue

  if (minutes < 10) {
    minuteValue = '0' + minutes
  } else {
    minuteValue = minutes
  }

  if (seconds < 10) {
    secondValue = '0' + seconds
  } else {
    secondValue = seconds
  }

  let mediaTime = minuteValue + ':' + secondValue
  timestamp.textContent = mediaTime
  if (video.currentTime == video.duration) resetVideoStatus()
}

function setPointerPosition(e) {
  pointer.style.left = `${e.clientX - progressRect.left}px`
  setVideoStatus()
}

function setVideoStatus() {
  video.currentTime =
    (Math.floor(video.duration) * parseInt(pointer.style.left)) /
    Math.floor(progressRect.width)
}

function updatePointerPosition() {
  pointer.style.left = `${
    (Math.floor(progressRect.width) * video.currentTime) /
      Math.floor(video.duration) -
    10
  }px`
}
