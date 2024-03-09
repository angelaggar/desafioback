const signUpForm = document.getElementById('signUpForm');
  signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    try {
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const gender = document.querySelector('input[name="gender"]:checked').value;
      const phone = document.getElementById('phone').value;
      const profileImage = document.getElementById('profileImage').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      let body = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          gender: gender,
          password: password,
          phone: phone,
          profile_picture: profileImage
      }

      const response = await fetch('http://localhost:3002/user/', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const userData = await response.json();

      window.location.replace('/pages/loginForm.html');

    } catch (error) {
      console.log('Error:', error)
    }
  })
