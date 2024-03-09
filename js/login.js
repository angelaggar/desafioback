const btnLogin = document.getElementById('loginButton');
const inpEmail = document.getElementById('inputEmail');
const inpPassword = document.getElementById('inputPassword');
const lblWarnData = document.getElementById('warnEnterData');

async function userLogin(eMail, password) {

  console.log('Entre')

    try {
      
      let body = {
        email: `${eMail}`,
        password: `${password}`
      }
  
      const response = await fetch('http://localhost:3002/user/login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const userData = await response.json();
      const token = userData.data.token;
      const userId = userData.data.userId;
  
      if(!token){
        lblWarnData.textContent = 'Email and Password are incorrect. Try Again!!!'
        lblWarnData.classList.remove('d-none');
      } else {
          localStorage.token = token;
          localStorage.userId = userId;
          window.location.replace('/');
      }

    } catch (error) {

      console.log(error);
      
    }


}

btnLogin.addEventListener('click', async () => {

    const email = inpEmail.value;
    const password = inpPassword.value;

    if(email === '' || password === '') {

      lblWarnData.textContent = 'User and Password are required'
      lblWarnData.classList.remove('d-none');

    }
    else await userLogin(email, password);

})