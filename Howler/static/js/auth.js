import api from "./APIClient.js";

function displayUserInHeader(user) {
  let link = document.createElement("a");
  link.href = "#";
  link.innerHTML = "Log Out";
  link.addEventListener("click", (e) => {
    e.preventDefault();
    logOut();
  });

  document.getElementById("user").textContent = `@${user.username} `;
  document.getElementById("user").appendChild(document.createElement("br"));
  document.getElementById("user").appendChild(link);

  let profilePicture = document.getElementById("currentAvatar");
  profilePicture.src = `${user.avatar}`;
  profilePicture.style.cursor = "pointer";

  let linkToProfile = document.createElement("a");
  linkToProfile.href = "/howls?id=" + user.id;
  link.addEventListener("click", (e) => {
    e.preventDefault();
  });

  linkToProfile.appendChild(profilePicture);
  document.getElementById("header-right").appendChild(linkToProfile);
}

api
  .getCurrentUser()
  .then((user) => {
    displayUserInHeader(user.user);
  })
  .catch((error) => {
    console.log(`${error.status}`, error);
    if (error.status == 401) {
      document.location = "./login";
    }
  });

function logOut() {
  api.logOut().then(() => {
    document.location = "./login";
  });
}
