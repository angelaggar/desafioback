document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  const authToken = localStorage.getItem("token");

  const options = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  if (postId && authToken) {
    fetch(`http://localhost:3002/post/${postId}`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetch");
        }
        return response.json();
      })
      .then((postData) => {
        document.getElementById("title").value = postData.message.title;
        document.getElementById("tags").value = postData.message.tags;
        document.getElementById("body").value = postData.message.content;

        const coverImage = document.getElementById("coverImage");
        coverImage.src = postData.message.cover;
      })
      .catch((error) => console.error("Error fetch:", error));
  } else {
    console.error("Post ID o token vacios");
  }

  document.getElementById("updateBtn").addEventListener("click", function () {
    const updateOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        title: document.getElementById("title").value,
        tags: document.getElementById("tags").value,
        content: document.getElementById("body").value,
      }),
    };

    fetch(`http://localhost:3002/post/${postId}`, updateOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating post");
        }
        return response.json();
      })
      .then((updatedData) => {
        console.log("Post updated successfully:", updatedData);
        window.location.href = "../index.html";
      })
      .catch((error) => console.error("Error updating post:", error));
  });
});
