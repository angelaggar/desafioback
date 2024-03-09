const btnSignOut = document.getElementById('signOutButton');

btnSignOut.addEventListener('click', () => {

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.replace('/');

})