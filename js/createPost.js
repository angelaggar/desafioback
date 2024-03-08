const createPost = async () => {
  const submit = document.getElementById('submitBtn')
  const POST_ENDPOINT = 'http://localhost:3002/post/'
  submit.addEventListener('submit', async (event) => {
    event.preventDefault()
    const inpTitle = document.getElementById('title').value
    const inpTags = document.getElementById('tags').value
    const inpContent = document.getElementById('body').value
    const inpCover = document.getElementById('cover').value
    const token = localStorage.getItem('token')

    fetch(POST_ENDPOINT, {
      method: 'Post',
      body: {
        title: inpTitle,
        tags: inpTags,
        content: inpContent,
        cover: inpCover
      },
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    // window.location.href = '../index.html'
  })
}

createPost()
