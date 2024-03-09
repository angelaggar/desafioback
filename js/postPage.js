const postTitle = document.getElementById('postTitle');
const postCover = document.getElementById('postCover');
const postBody = document.getElementById('postBody');
const authorBox = document.getElementById('authorBox');
const userName = document.getElementById('userName')
const forimage = document.getElementById('forimage')
const aside = document.getElementById('asidecontainer')

document.addEventListener('DOMContentLoaded', async () => {
  const postId = localStorage.getItem('postId');
  console.log(postId);

  await fetch (`http://localhost:3002/post/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    return response.json();
  })
  .then(data => {
    const post = data.message;
    const author = post.user;
    console.log(author);
    postTitle.innerHTML = post.title;
    postCover.setAttribute('src', post.cover);
    postBody.innerHTML = post.content;

    // Realiza la segunda solicitud fetch aquí, utilizando el valor de author
    return fetch(`http://localhost:3002/user/${author}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los datos del autor');
    }
    return response.json();
  })
  .then(authorData => {
    const user = authorData.message
    userName.innerHTML = user.first_name
    forimage.innerHTML = `
    <img id="authorPicture" src="${user.profile_picture}" class="card-img-top rounded-circle" style="width: 35px;" alt="...">
    <h5 id="userName" class="card-text p-2">${user.first_name}</h5>
    `
    aside.innerHTML = `
    <img src="${user.profile_picture}" class="card-img-top rounded-circle" style="width: 50px;" alt="...">
    <div class="d-flex flex-column ps-3">
                    <h5 class="card-text">${user.first_name + ' ' + user.last_name}</h5>
                    <p class="fs-6 fw-light m-0">17 años</p>
                </div>
    `

  
  })
  .catch(error => {
    console.error('Error de solicitud:', error);
  });

  window.addEventListener('beforeunload', () => {
    localStorage.removeItem('postId');
  });
});



// async function getbyid(id) {
//   const options = {
//       method: 'GET',
//   }
//   await fetch (`http://localhost:3002/user${id}`, options)
//   .then(response => {
//       if (!response.ok) {
//           throw new Error('Error al obtener los datos');
//       }
//       return response.json();
//       })
//   .then (data => {
//       const user =data.message
//       userName.innerHTML = user.first_name 
//           })
              
//   .catch(error => {
//       console.error('Error de solicitud:', error);
//       });
//     }

//     await getbyid(author)