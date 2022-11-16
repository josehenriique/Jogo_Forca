// Hide and Show
$('#tick_name').hide()
$('#tick_last_name').hide()

// Carregamento
$('.container').hide()

function loading(){
  
  $('.box-load').hide()
  $('.container').show()
  
}

if (localStorage.getItem('next') == null){
  localStorage.setItem('next', false)
}

$('#send').on('click', () => {
  localStorage.setItem('next', true)
})

$('#next').on('click', () => {
  localStorage.setItem('next', false)
})

if (localStorage.getItem('next') == 'false'){
  $('#send').prop('disabled', false)
  $('#next').prop('disabled', true)
} else {
  $('#send').prop('disabled', true)
  $('#next').prop('disabled', false)
}

// Border input

$('#name').on('change', () => {
  $('#name').css('border-color', "#64C661")
  $('#tick_name').show()
})

$('#last_name').on('change', () => {
  $('#last_name').css('border-color', "#64C661")
  $('#tick_last_name').show()
})

// Tick Circle

