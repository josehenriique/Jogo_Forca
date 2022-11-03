// Cosumindo URL
let host = $(location).attr('host')

let path = $(location).attr('pathname')
let array = path.split("/")
let path_tema = array[array.length - 1]

async function getData(){

  let response = await fetch(`https://${host}/tema/api/${path_tema}`)
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

  let scoreLocal = 1000
  let dados = await data
  let name

  let quantPalavras = Object.keys(dados.palavras).length + 1

  if (localStorage.getItem('indice_palavra') == quantPalavras.toString()){
    localStorage.setItem('indice_palavra', 1)
    localStorage.setItem('score', 0)
  }

  mudarPalavra()
  
  const space = []
  
  for(i in name){
    space.push("_")
  }
  
  const chances = 4
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
  
  
  loadingSpace()

  function mudarPalavra(){
  
    let storage = parseInt(localStorage.getItem('indice_palavra')) + 1
    console.log(storage)

    name = (dados.palavras[storage.toString()].nome).toUpperCase()
    let dica = dados.palavras[storage].dica
    let conceito = dados.palavras[storage].conceito

    loadingDica(dica)
    dicaExtra(conceito)

    localStorage.setItem('indice_palavra', storage)
  
  }

  function cadastroScore(){

    let score = parseInt(localStorage.getItem('score'))

    localStorage.setItem('score', scoreLocal + score)
    console.log('A pontuação desse rodada foi: ', score)

    data = {
      score: score
    }

    alert(JSON.stringify(data))

    return JSON.stringify(data)

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
        scoreLocal -= 100
        console.log(tentativas)
        console.log(scoreLocal)
  
      }
  
      if (tentativas > chances){      
  
        $('.btn_letters').prop('disabled', true)
        console.log("Acabou suas chances")
        cadastroScore()
        location.reload()
  
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
        console.log('Você completou a palavra')
        cadastroScore()
        setTimeout(location.reload(), 3000)
        has_line = true
      } 
    }

}

logic(getData())
