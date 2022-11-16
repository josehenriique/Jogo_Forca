// Cosumindo URL
let host = $(location).attr('host')

let path = $(location).attr('pathname')
let array = path.split("/")
let path_tema = array[array.length - 1]

// Resultado
$('#result').show()
$('#next').show()
$('#next').prop('disabled', true)

$('.container').show()

// Bonecos

$('#completo').show()
$('#uma-perna').hide()
$('#sem-perna').hide()
$('#um-braco').hide()
$('#tronco').hide()
$('#cabeca').hide()

async function getData(){

  let response = await fetch(`http://${host}/tema/api/${path_tema}`)
  let data = response.json()

  return data

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

if(parseInt(localStorage.getItem('dica')) == 3) {
  $('#btn_extra').prop('disabled', true)
  $(`#dica_1`).hide()
  $(`#dica_2`).hide()
  $(`#dica_3`).hide()
}

// localStorage.removeItem('indice_palavra')

async function logic(data){

  let dados = await data
  let name

  let quantPalavras = Object.keys(dados.palavras).length + 1

  if (localStorage.getItem('indice_palavra') == quantPalavras.toString()){
    localStorage.setItem('indice_palavra', 1)
    localStorage.setItem('score', 0)
  }

  if(localStorage.getItem('indice_palavra') < quantPalavras){

    mudarPalavra()

  }
  
  const space = []
  
  for(i in name){
    space.push("_")
  }
  
  const chances = 5
  let tentativas = 0
  
  $(document).on("submit", "#form", function(e){
    e.preventDefault()
    
    const letters = []
    
    if (tentativas < chances){
      
      $('.btn_letters').on('click', function(e){
        e.preventDefault()
        
        // Pegando valor da letra
        let letter = $(this).val()
        
        letters.push(letter)
        $(this).attr('disabled', true)
        
        // Verificando a letra
        verification(letter)
        loadingSpace()
        
      })
      
    } 
    
  })

  $('#btn_extra').on('click', () => {

    let storage_dica = parseInt(localStorage.getItem('dica'))
    console.log('Storage:', storage_dica)
    let dicas, storage

    if(storage_dica < 3){
      dicas = parseInt(storage_dica) + 1

      storage = parseInt(localStorage.getItem('score'))

      $(`#dica_${dicas}`).hide()
      localStorage.setItem('score', storage - 100)
      localStorage.setItem('dica', dicas)

    }

    console.log('DICA EXTRA')
    console.log(localStorage.getItem('dica'))
    console.log(storage)

  })

  $('#next').on('click', () => {
    location.reload()
  })

  $('#result').on('click', () => {
    $('.container').hide()

    let score = localStorage.getItem('score')
    let url = $(location).attr('href')
    window.location=`${url}/${score}`

  })
  
  
  loadingSpace()

  function mudarPalavra(){
  
    let storage = parseInt(localStorage.getItem('indice_palavra'))

    if (storage == 0){
      storage = 1
    }

    console.log(storage)

    name = (dados.palavras[storage.toString()].nome).toUpperCase()
    let dica = dados.palavras[storage].dica
    let conceito = dados.palavras[storage].conceito

    loadingDica(dica)
    dicaExtra(conceito)

    storage += 1
    localStorage.setItem('indice_palavra', storage)  
  }

  function cadastroScore(pontuacao){

    let score = parseInt(localStorage.getItem('score'))

    localStorage.setItem('score', (pontuacao + score))
    alert('A pontuação desse rodada foi: ' + localStorage.getItem('score'))

    // data = {
    //   score: score
    // }

    // return JSON.stringify(data)

  }

  function puppet(tentativas){

    switch (tentativas) {
      case 0:
        $('#completo').show()
        $('#uma-perna').hide()
        $('#sem-perna').hide()
        $('#um-braco').hide()
        $('#tronco').hide()
        $('#cabeca').hide()

        return 500;

        break;
      case 1:
        $('#completo').hide()
        $('#uma-perna').show()
        $('#sem-perna').hide()
        $('#um-braco').hide()
        $('#tronco').hide()
        $('#cabeca').hide()

        return 400;

        break;
      case 2:
        $('#completo').hide()
        $('#uma-perna').hide()
        $('#sem-perna').show()
        $('#um-braco').hide()
        $('#tronco').hide()
        $('#cabeca').hide()

        return 300;

        break;
      case 3:
        $('#completo').hide()
        $('#uma-perna').hide()
        $('#sem-perna').hide()
        $('#um-braco').show()
        $('#tronco').hide()
        $('#cabeca').hide()

        return 200;

        break;
      case 4:
        $('#completo').hide()
        $('#uma-perna').hide()
        $('#sem-perna').hide()
        $('#um-braco').hide()
        $('#tronco').show()
        $('#cabeca').hide()

        return 100;

        break;
      case 5:
        $('#completo').hide()
        $('#uma-perna').hide()
        $('#sem-perna').hide()
        $('#um-braco').hide()
        $('#tronco').hide()
        $('#cabeca').show()

        return 50;

        break;

      case 6:
        $('#completo').hide()
        $('#uma-perna').hide()
        $('#sem-perna').hide()
        $('#um-braco').hide()
        $('#tronco').hide()
        $('#cabeca').show()

        return 10;

        break;
      default:
        break;
    }

  }

  function dicaExtra(conceito){

    let btn = document.getElementById('btn_extra')
    let div = document.querySelector('.conceito')

    btn.addEventListener('click', () => {

      div.innerHTML = `<p>${conceito}</p>`

    })

  }
  
  function verification(letter){
    let has_letter_in_name = false
    
    // Verificando se acertou ou errou
    for (l of name){
      
        if (letter == l){
          console.log(l)
          has_letter_in_name = true
          break
        }
        else{
          has_letter_in_name = false
        }
  
      }
  
  
      // Posicionando as letras
      if (has_letter_in_name == true){
  
        for(i in name){
          if (letter == name[i]){
            space[i] = letter
          }
        }
  
      } else {
  
        tentativas += 1
        console.log(puppet(tentativas))
        console.log(tentativas)
  
      }
  
      if (tentativas > chances){      
  
        $('.btn_letters').prop('disabled', true)
        console.log("Acabou suas chances")
        cadastroScore(puppet(tentativas))

        $('#btn_extra').prop('disabled', true)
        $('#next').prop('disabled', false)
  
      }

      verificationSpace()
  
    }
    
    function loadingSpace(){
      let space_html = []
  
      for(i of space){
        space_html += `<h1>${i}</h1>`
      }
  
      $(".space").html(space_html)
    }

    function loadingDica(dica){

      let div = document.querySelector('.dica')
      div.innerHTML = `<p>${dica}</p>`

    }

    function verificationSpace(){
      has_line = true

      for(item of space){

        if (item == "_"){
          has_line = true
          break
        } else {
          has_line = false
        }

      }

      if (has_line == false){
        
        let list_nomes = []
        
        for(item of Object.keys(dados.palavras)){
          list_nomes.push((dados.palavras[item].nome).toUpperCase())
        }
        
        if(name == list_nomes[list_nomes.length - 1]){
          $('#result').show()
          $('#next').hide()
        } 
        
        console.log('Você completou a palavra')
        cadastroScore(puppet(tentativas))
        $('#next').prop('disabled', false)
        has_line = true
      } 
    }

}

logic(getData())
