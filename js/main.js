// import { postFirstShow } from './postDom.js'
import { openPost, postNew } from './aditionals.js'
import { searchPost } from './searchfilters.js'
// import { createPost } from './createPost.js'

document.addEventListener('DOMContentLoaded', async() => {
  await postNew()
  openPost()
})
