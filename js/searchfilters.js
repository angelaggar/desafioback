import { cardGen } from './postDom.js'
import { postNew } from './aditionals.js'

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
      cardColumn.innerHTML = '';
      
      postList.forEach((item) => {
        const title = item.title.toLowerCase();
        const words = title.split(/[ ,]+/);
        
        const matches = inputValue.some(word => words.includes(word));
        
        if (matches) {
          cardGen(item);
        }
      });
    })
    .catch(error => {
      console.error('Error de solicitud:', error)
    })
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
  const options = {
    method: 'GET',
  }
  fetch ('http://localhost:3002/post', options)
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al obtener los datos');
      }
      return response.json();
      })
      .then(data => {
        const postList = data.data
        cardColumn.innerHTML = ''
        const randomOrder = () => Math.random() - 0.5
        postList.sort(randomOrder).forEach(post => {
          cardGen(post)
        });
      })
  .catch(error => {
      console.error('Error de solicitud:', error);
      })
}

relevant.addEventListener('click', async () => {
  cardColumn.innerHTML = ''
  relevantPage()  
})

// ////////////////// FUNCION PARA TOP PAGE, MUESTRA LOS POST CON MAS COMENTARIOS
// export const topPage = () => {
//   const topPosts = []
//   const comments = postList
//     .map((item) => item.comment)
//     .sort((a, b) => (a > b ? -1 : 1))
//   console.log(comments)
//   let totalCom = comments[0]
//   while (totalCom >= 0) {
//     if (totalCom < 0) break
//     const clasify = () => {
//       const comments = postList.filter((post) => post.comment === totalCom)
//       topPosts.push(comments)
//     }
//     clasify()
//     totalCom -= 1
//   }
//   return topPosts.flat()
// }

top.addEventListener('click', () => {
  cardColumn.innerHTML = ''
  postNew()
})

// /////////////// FUNCION PARA LATEST, MUESTRA LOS POSTS MAS RECIENTES

const latestPage = async() => {
  const options = {
    method: 'GET',
  }
  fetch ('http://localhost:3002/post', options)
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al obtener los datos');
      }
      return response.json();
      })
      .then(data => {
        data.data.reverse().forEach(post => {
          cardGen(post)
        });
      })
  .catch(error => {
      console.error('Error de solicitud:', error);
      })
  
}

latest.addEventListener('click', () => {
  cardColumn.innerHTML = ''
  latestPage()
})