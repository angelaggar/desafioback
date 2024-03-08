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
      
      await fetch('http://localhost:3002/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          gender: gender,
          password: password,
          phone: phone,
          profile_picture: profileImage
        })
      }).then(response => console.log(response))

      // if (!response.ok) {
      //   throw new Error('Error al enviar los datos al servidor')
      // }
    } catch (error) {
      console.log('Error:', error)
    }
  })
