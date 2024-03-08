import { allPost } from './database.js'
import { cardGen } from './postDom.js'

export const dateGen = () => {
  const dia = Math.floor(Math.random() * 30)
  const mes = Math.floor(Math.random() * 12) + 1
  const año = 2023
  return {
    dia,
    mes,
    año
  }
}

const postsArray = await allPost()

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
  cardColumn.addEventListener('dblclick', (event) => {
    let targetNode = event.target
    if (targetNode.tagName !== 'a') event.preventDefault()
    while (targetNode) {
      if (targetNode.id) {
        console.log(targetNode.id)
        window.location.href = `./pages/post.html?id=${targetNode.id}`
        break
      }
      targetNode = targetNode.parentNode
    }
  })
}

//  const btnSubmit = document.querySelector('#submitButton')
//   const postContent = document.querySelector('#postContent')
//   const postTitle = document.querySelector('#postTitle')
//   const updateButton = document.querySelector('#updateButton')
//   const deleteButton = document.querySelector('#deleteButton')
//   const msgContent = document.querySelector('#msgContent')
//   const postPublisher = document.querySelector('#actualPosts')
//   let postHeader = document.querySelector('#postHeader')
//   let postText = document.querySelector('#postText')

//   btnSubmit.addEventListener('click', (event) => {
//     event.preventDefault()

//     firstValidation()
//   })

//   const firstValidation = () => {
//     if (postTitle.value === '' || postContent.value === '') {
//       msgContent.style.color = 'red'
//       msgContent.innerHTML = 'Llena todos los campos!'
//     } else {
//       acceptPost()
//       // publishPost(postTitle.value, postContent.value)
//       displayAllPosts()
//     }
//   }

//   const resetForm = () => {
//     // debugger
//     postTitle.value = ''
//     postContent.value = ''
//   }

//   const acceptPost = () => {
//     posts.push({
//       title: postTitle.value,
//       date: Date.now(),
//       description: postContent.value
//     })
//     localStorage.setItem('posts', JSON.stringify(posts))
//     console.log('Este es el post', posts)
//   }

//   const publishPost = (pt, pc) => {
//     const p = {}
//     p.body = pc
//     p.title = pt
//     p.reactions = 0
//     p.tags = 'mytag'
//     p.userId = 0

//     secondaryCardGen(p, 'time', user)
//     resetForm()
//   }

//   const displayAllPosts = () => {
//     postPublisher.innerHTML = ''
//     const postHeaderDiv = document.createElement('div')
//     const postContentDiv = document.createElement('div')
//     postHeaderDiv.id = 'postHeader'
//     postContentDiv.id = 'postText'
//     postPublisher.appendChild(postHeaderDiv)
//     postPublisher.appendChild(postContentDiv)

//     postHeader = postHeaderDiv
//     postText = postContentDiv

//     posts = JSON.parse(localStorage.posts)
//     console.log(posts)
//     posts.forEach((post) => {
//       publishPost(post.title, post.description)
//     })
//     // publishPost()
//   }
//   displayAllPosts()

//   updateButton.addEventListener('click', (e) => {
//     debugger
//     e.preventDefault()
//     const forEdit = this.parentElement
//     const input = document.createElement('input')
//     input.type = 'text'
//     input.value = forEdit.replaceWith(input)

//     editButton.textContent = 'save'
//   })

//   deleteButton.addEventListener('click', (e) => {
//     e.preventDefault()
//     const deleting = this.parentElement
//     postPublisher.removeChild(deleting)
//   })

//   const createButton = (postNumber) => {
//     const newBUtton = document.createElement('a')
//     newBUtton.id = 'updateButton' + postNumber
//   }
// })
