// Carregamento
$('main').hide()

function loading(){
  
  $('.box-load').hide()
  $('main').show()
  
}

// Hide e Show - Fieldset

let atual_fs, next_fs, prev_fs;

$('.next').on('click', function(){
  atual_fs = $(this).parent()
  next_fs = $(this).parent().next()

  atual_fs.hide(800)
  next_fs.show(800)
})

$('.prev').on('click', function(){
  atual_fs = $(this).parent()
  prev_fs = $(this).parent().prev()

  atual_fs.hide(800)
  prev_fs.show(800)
})

$('#formulario .next, #formulario .prev').on('click', function(){
  return false
})