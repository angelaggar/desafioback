import { cardGen } from './postDom.js'

export const postNew = async () => {
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
        data.data.forEach(post => {
          cardGen(post)
        });
      })
  .catch(error => {
      console.error('Error de solicitud:', error);
      })
}


export const openPost = () => {
  const cardColumn = document.getElementById('cardColumn')
  // const cardContainer = document.querySelector('div[name="cardContainer"]')
  cardColumn.addEventListener('dblclick', (event) => {
    let targetNode = event.target
    if (targetNode.tagName !== 'a') event.preventDefault()
    while (targetNode) {
      if (targetNode.id) {
        const postId = targetNode.id;
        localStorage.setItem('postId', postId)
        window.location.href = `./pages/post.html?id=${postId}`
        break
      }
      targetNode = targetNode.parentNode
    }
  })
}
