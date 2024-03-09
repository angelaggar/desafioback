console.log("Hola mundo");
const options = {
  method: "GET",
};

fetch(`http://localhost:3002/post`, options)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al obtener los datos");
    }
    return response.json();
  })
  .then((data) => {
    const cardsContainer = document.getElementById("cards-container");
    data.data.forEach((post) => {
      const card = document.createElement("div");
      card.classList.add("col-md-6");
      card.innerHTML = `
                <div class="card mb-4">
                    <div class="card-body bg-light-subtle">
                        <h5 class="card-title">${post.title}</h5>
                        <div class="d-flex justify-content-center">
                            <a id="delete-${post._id}" href="#" class="btn btn-danger ms-2">Eliminar</a>
                            <a id="edit-${post._id}" href="#" class="btn btn-primary ms-2">Editar</a>
                        </div>
                    </div>
                </div>
            `;
      cardsContainer.appendChild(card);

      //Boton de editar
      const editButton = document.getElementById(`edit-${post._id}`);
      editButton.addEventListener("click", () => {
        redirectToEditPage(post._id);

        //Boton de delete
        const deleteButton = document.getElementById(`delete-${post._id}`);
        deleteButton.addEventListener("click", () => {
          deletePost(post._id);
        });
      });
    });
  })
  .catch((error) => {
    console.error("Error de solicitud:", error);
  });

function redirectToEditPage(postId) {
  window.location.href = `../pages/editPostForm.html?id=${postId}`;
}

function deletePost(postId) {
  //   if (confirm("Seguro de que quieres eliminar este post?")) {
  //     const authToken = localStorage.getItem("token");
  //     const deleteOptions = {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     };

  fetch(`http://localhost:3002/post/${postId}`, deleteOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al eliminar el post");
      }
      return response.json();
    })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error al eliminar el post:", error);
    });
}
// }
