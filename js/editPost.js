document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (postId) {
    //Token de autenticacion
    const authToken = localStorage.getItem("authToken");

    fetch(`http://localhost:3002/post/${postId}`)
      .then((response) => response.json())
      .then((postData) => {
        document.getElementById("title").value = postData.message.title;
        document.getElementById("tags").value = postData.message.tags;
        document.getElementById("body").value = postData.message.content;

        const coverImage = document.getElementById("coverImage");
        coverImage.src = postData.message.cover;
      })
      .catch((error) => console.error("Error fetching post data:", error));
  } else {
    console.error("Post ID is null");
  }

  document.getElementById("updateBtn").addEventListener("click", function () {
    const authToken = localStorage.getItem("authToken");

    fetch(`http://localhost:3002/post/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: document.getElementById("title").value,
        tags: document.getElementById("tags").value,
        content: document.getElementById("body").value,
      }),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        console.log("Post actualizado correctamente:", updatedData);
        window.location.href = "../index.html";
      })
      .catch((error) => console.error("Error al actualizar el post:", error));
  });
});
