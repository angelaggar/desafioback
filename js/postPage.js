const postTitle = document.getElementById('postTitle');
const postCover = document.getElementById('postCover');
const postBody = document.getElementById('postBody');
const authorBox = document.getElementById('authorBox');

document.addEventListener('DOMContentLoaded', async () => {
  const postId = sessionStorage.getItem('postId');
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
    const post = data.message
    postTitle.innerHTML = post.title
    postCover.setAttribute('src', post.cover)
    postBody.innerHTML = post.content
  })
  .catch(error => {
    console.error('Error de solicitud:', error);
  });
});
