const btnLogin = document.getElementById('loginButton');
const inpEmail = document.getElementById('inputEmail');
const inpPassword = document.getElementById('inputPassword');

async function userLogin(eMail, password) {

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

    console.log(userData);
    const token = userData.data;

    if(!token){
        alert('Unauthorized User');
    } else {
        alert('Login exitoso');
        localStorage.token = token;
    }

}

btnLogin.addEventListener('click', async () => {

    const email = inpEmail.value;
    const password = inpPassword.value;

    await userLogin(email, password);

})