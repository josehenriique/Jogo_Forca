// Hide e Show

$('.ranking').hide()
$('.temas').hide()

// Carregamento
$('main').hide()

function loading(){
  
  $('.box-load').hide()
  $('main').show()
  
}

if (localStorage.getItem('indice_palavra') === null){
  localStorage.setItem('indice_palavra', 1)
}

if (localStorage.getItem('score') === null){
  localStorage.setItem('score', 0)
}

if (localStorage.getItem('dica') === null){
  localStorage.setItem('dica', 0)
}

localStorage.setItem('indice_palavra', 1)
localStorage.setItem('score', 0)
localStorage.setItem('dica', 0)

localStorage.setItem('next', false)

// Ranking

$('#ranking').on('click', () => {
  $('.ranking').show()
  $('.container').hide()
  $('.temas').hide()
})

$('#jogar').on('click', () => {
  $('.temas').show()
  $('.ranking').hide()
  $('.container').hide()
})