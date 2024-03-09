async function getbyid(id) {
    const options = {
        method: 'GET',
    }
    fetch (`http://localhost:3002/user${id}`, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los datos');
        }
        return response.json();
        })
        .then(data => {
            const cardsContainer = document.getElementById('cards-container');
            data.data.forEach(post => {
                const card = document.createElement('div');
                card.classList.add('col-md-6');
                card.innerHTML = `
                    <div class="card mb-4">
                        <div class="card-body bg-light-subtle">
                            
                            <h5 class="card-title">${post.title}</h5>
                            <div class="d-flex justify-content-center">
                                <a href="#" class="btn btn-danger ms-2">Eliminar</a>
                                <a href="./newPostForm.html" id="editbutton" class="btn btn-primary ms-2">Editar</a>
                            </div>
                        </div>
                    </div>
                `;
                cardsContainer.appendChild(card);
            });
        })
    .catch(error => {
        console.error('Error de solicitud:', error);
        });

}