const movie = document.getElementById('movie')
const seatCount = document.getElementById('seat-count')
const cost = document.getElementById('cost')
const container = document.querySelector('.container')
let selectedMovie = movie.value
let selectedSeatsIndex = []

init()
movie.addEventListener('change', (e) => {
  saveData()
  updateResult()
})

container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected')
  }

  setSelectedSeatsIndex()
  saveData()
  updateResult()
})

function init() {
  loadData()
  updateUI()
  updateResult()
}

function saveData() {
  localStorage.setItem('selectedMovie', movie.value)
  localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex))
}

function loadData() {
  selectedMovie = localStorage.getItem('selectedMovie')
  selectedSeatsIndex = JSON.parse(localStorage.getItem('selectedSeats'))
}

function updateUI() {
  movie.value = selectedMovie

  const seats = getSeats()
  seats.forEach((seat, index) => {
    if (selectedSeatsIndex.indexOf(index) !== -1) {
      seat.classList.add('selected')
    }
  })
}

function updateResult() {
  const selectedSeatCount = getSelectedSeats().length
  seatCount.innerHTML = selectedSeatCount
  cost.innerHTML = selectedSeatCount * +movie.value
}

function setSelectedSeatsIndex() {
  selectedSeatsIndex = []
  const seatsArr = [...getSeats()]
  const selectedSeats = getSelectedSeats()
  selectedSeats.forEach((seat) => {
    const index = seatsArr.indexOf(seat)
    if (index !== -1) {
      selectedSeatsIndex.push(index)
    }
  })
}

function getSelectedSeats() {
  return document.querySelectorAll('.row .selected:not(.occupied)')
}

function getSeats() {
  return document.querySelectorAll('.row .seat')
}
