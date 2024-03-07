const createPost = async () => {
  const USER_ENDPOINT = 'http://localhost:3002/post/'

  const submit = document.getElementById('submitBtn')
  const POST_ENDPOINT = 'http://localhost:3002/post/'
  submit.addEventListener('submit', (event) => {
    event.preventDefault()
    const title = document.getElementById('title').value
    const tags = document.getElementById('tags').value
    const body = document.getElementById('body').value
    const cover = document.getElementById('cover').value

    fetch(POST_ENDPOINT, {

    })
    // window.location.href = '../index.html'
  })
}

createPost()
