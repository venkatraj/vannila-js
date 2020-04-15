class CustomVideoPlayer {
  config = {
    video: 'video1',
    playPauseButton: 'play-pause2',
    stopButton: 'stop',
    progress: 'progress',
    pointer: 'pointer',
    timestamp: 'timestamp',
  }

  constructor(config) {
    if (config instanceof Object) {
      this.config = Object.assign(this.config, config)
      console.log(this.config)
    } else {
      this.config.video = config
    }
    this.video = document.getElementById(this.config.video)
    this.playPauseButton = document.getElementById(this.config.playPauseButton)
    this.stopButton = document.getElementById(this.config.stopButton)
    this.progress = document.getElementById(this.config.progress)
    this.pointer = document.getElementById(this.config.pointer)
    this.timestamp = document.getElementById(this.config.timestamp)
    this.progressRect = this.progress.getBoundingClientRect()
    this.video.controls = false
    this.updateVideoStatus = this.updateVideoStatus.bind(this)
    this.resetVideoStatus = this.resetVideoStatus.bind(this)
    this.updateTimeStamp = this.updateTimeStamp.bind(this)
    this.updatePointerPosition = this.updatePointerPosition.bind(this)
    this.setPointerPosition = this.setPointerPosition.bind(this)
    this.addEventListeners = this.addEventListeners.bind(this)
    this.addEventListeners()
  }

  addEventListeners() {
    this.playPauseButton.addEventListener('click', this.updateVideoStatus)
    this.stopButton.addEventListener('click', this.resetVideoStatus)
    this.video.addEventListener('timeupdate', this.updateTimeStamp)
    this.video.addEventListener('timeupdate', this.updatePointerPosition)
    this.progress.addEventListener('click', this.setPointerPosition)
  }

  updateVideoStatus() {
    this.video.paused ? this.video.play() : this.video.pause()
    this.updatePlayPauseButton()
  }

  resetVideoStatus() {
    this.video.pause()
    this.video.currentTime = 0
    this.pointer.style.left = '0px'
    this.updatePlayPauseButton()
  }

  updatePlayPauseButton() {
    if (this.video.paused) {
      this.playPauseButton.firstElementChild.classList.replace(
        'fa-pause',
        'fa-play'
      )
    } else {
      this.playPauseButton.firstElementChild.classList.replace(
        'fa-play',
        'fa-pause'
      )
    }
  }

  updateTimeStamp() {
    let minutes = Math.floor(this.video.currentTime / 60)
    let seconds = Math.floor(this.video.currentTime - minutes * 60)
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
    this.timestamp.textContent = mediaTime
    if (this.video.currentTime == this.video.duration) this.resetVideoStatus()
  }

  setPointerPosition(e) {
    this.pointer.style.left = `${e.clientX - this.progressRect.left}px`
    this.setVideoStatus()
  }

  setVideoStatus() {
    this.video.currentTime =
      (Math.floor(this.video.duration) * parseInt(this.pointer.style.left)) /
      Math.floor(this.progressRect.width)
  }

  updatePointerPosition() {
    this.pointer.style.left = `${
      (Math.floor(this.progressRect.width) * this.video.currentTime) /
        Math.floor(this.video.duration) -
      10
    }px`
  }
}

new CustomVideoPlayer({ video: 'video', playPauseButton: 'play-pause' })
