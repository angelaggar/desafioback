const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault()

  const inpTitle = document.getElementById('title').value
  const inpTags = document.getElementById('tags').value
  const inpContent = document.getElementById('body').value
  const inpCover = document.getElementById('cover').value
  const token = localStorage.getItem('token')

  try {
    if (!inpTitle || !inpTags || !inpContent || !inpCover) {
      alert('All the fields must to be filled.')
      return;
    }

    if (!token) {
      alert('This action requires login')
      return;
    }

    const response = await fetch('http://localhost:3002/post/', {
      method: 'POST',
      body: JSON.stringify({
        title: inpTitle,
        tags: inpTags,
        content: inpContent,
        cover: inpCover
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 201) {
      alert('Post successfully submitted!')
      window.location.href = '../index.html'
    }

  } catch (error) {
    console.error(error)
  }
});


