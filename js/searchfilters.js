import { cardGen } from './postDom.js'

const cardColumn = document.getElementById('cardColumn')

const searchInput = document.getElementById('searchInput')
const searchButton = document.getElementById('searchButton')
const relevant = document.getElementById('relevant')
const latest = document.getElementById('latest')
const top = document.getElementById('top')

// ///////////////// FUNCION PARA EL BOTON DE BUSQUEDA
export const searchPost = async () => {
  const inputValue = searchInput.value.toLowerCase().split(/[ ,]+/)
  const options = {
    method: 'GET',
  }

  fetch('http://localhost:3002/post', options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener los datos');
      }
      return response.json();
    })
    .then(data => {
      const postList = data.data
      // Limpiar el contenido actual del cardColumn
      cardColumn.innerHTML = '';
      
      postList.forEach((item) => {
        const title = item.title.toLowerCase();
        const words = title.split(/[ ,]+/);
        
        // Comprobar si alguna palabra de la búsqueda está presente en el título
        const matches = inputValue.some(word => words.includes(word));
        
        if (matches) {
          // Si hay coincidencia, generar una tarjeta y agregarla al cardColumn
          cardGen(item);
        }
      });
    })
    .catch(error => {
      console.error('Error de solicitud:', error);
    });
}

searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchPost();
  }
});

searchButton.addEventListener('click', () => {
  searchPost();
});

// //////////////////// FUNCION PARA RELEVANT PAGE, MUESTRA LOS POSTS CON MAS REACCIONES
export const relevantPage = () => {
  const relevants = []
  const reaction = postList
    .map((item) => item.reactions)
    .sort()
    .reverse() // busca el num de react mas grande
  let reactNum = reaction[0]
  while (reactNum >= 0) {
    if (reactNum < 0) break
    const clasify = () => {
      const posts = postList.filter((post) => post.reactions === reactNum)
      relevants.push(posts)
    }
    clasify()
    reactNum -= 1
  }
  return relevants.flat()
}

relevant.addEventListener('click', () => {
  cardColumn.innerHTML = ''
  const relevants = relevantPage()
  relevants.forEach((item) => cardGen(item))
})

// ////////////////// FUNCION PARA TOP PAGE, MUESTRA LOS POST CON MAS COMENTARIOS
export const topPage = () => {
  const topPosts = []
  const comments = postList
    .map((item) => item.comment)
    .sort((a, b) => (a > b ? -1 : 1))
  console.log(comments)
  let totalCom = comments[0]
  while (totalCom >= 0) {
    if (totalCom < 0) break
    const clasify = () => {
      const comments = postList.filter((post) => post.comment === totalCom)
      topPosts.push(comments)
    }
    clasify()
    totalCom -= 1
  }
  return topPosts.flat()
}

top.addEventListener('click', () => {
  cardColumn.innerHTML = ''
  const topPosts = topPage()
  topPosts.forEach((item) => cardGen(item))
})

// /////////////// FUNCION PARA LATEST, MUESTRA LOS POSTS MAS RECIENTES

const compareDate = () => {
  
}

