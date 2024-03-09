const btnSignOut = document.getElementById('signOutButton');

btnSignOut.addEventListener('click', () => {

    localStorage.removeItem('token');
    window.location.replace('/');

})