// import { postFirstShow } from './postDom.js'
import { openPost, postNew } from './aditionals.js'
import { searchPost } from './searchfilters.js'
// import { createPost } from './createPost.js'

document.addEventListener('DOMContentLoaded', async() => {
  await postNew()
  openPost()

  /**
   * Login Logic
   */
  const btnLogin = document.getElementById('loginButton');
  const btnCreateAccount = document.getElementById('createAccountButton');
  const loggedDiv = document.getElementById('loggedBoxNav');

  if(localStorage.token){
    btnLogin.classList.add('display-none');
    btnCreateAccount.classList.add('display-none');
  } else {
    loggedDiv.classList.add('display-none');
  }

})
