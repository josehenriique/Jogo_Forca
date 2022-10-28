// Cosumindo URL
let host = $(location).attr('host')

let path = $(location).attr('pathname')
let array = path.split("/")
let path_tema = array[array.length - 1]

async function getData(){

  let response = await fetch(`http://${host}/tema/api/${path_tema}`)
  let data = response.json()

  return data

}

// if (localStorage.getItem('indice_palavra') != '1'){
//   localStorage.setItem('indice_palavra', 1)
// }

async function logic(data){

  let dados = await data
  let name

  if (localStorage.getItem('indice_palavra') == '4'){
    localStorage.setItem('indice_palavra', 1)
  }
  
  function mudarPalavra(){
  
    storage = localStorage.getItem('indice_palavra')
    console.log(storage)

    name = dados.palavras[storage].nome
    let indice = parseInt(storage) + 1
    console.log(indice)
    localStorage.setItem('indice_palavra', indice)
  
  }
  
  mudarPalavra()
  
  const space = []
  const score = 0
  
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
  
  
  loadingSpace()
  
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
        console.log(tentativas)
  
      }
  
      if (tentativas > chances){      
  
        $('.btn_letters').prop('disabled', true)
        console.log("Acabou suas chances")
        location.reload()
  
      }
  
    }
    
    function loadingSpace(){
      let space_html = []
  
      for(i of space){
        space_html += `<h1>${i}</h1>`
      }
  
      $(".space").html(space_html)
    }

}

logic(getData())
