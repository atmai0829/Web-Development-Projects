import api from "./APIClient.js";

const query = window.location.search;
let parameters = new URLSearchParams(query);
const id = parameters.get("id");

let currentUser;

api
  .getCurrentUser()
  .then((user) => {
    currentUser = user.user;
  })
  .catch((error) => {
    console.log(`${error.status}`, error);
    if (error.status === 401) {
      document.location = "./login";
    }
  });

const howlList = document.getElementById("howlList");
const howlTemplate = document.getElementById("howlTemplate");

function renderHowl(howl) {
  const howlInstance = howlTemplate.content.cloneNode(true);
  const howlElement = howlInstance.querySelector(".howl.container");

  const howlAvatar = howlElement.querySelector(".avatar");
  howlAvatar.src = howl.userInfo.avatar;

  const howlName = howlElement.querySelector(".name");
  howlName.textContent =
    howl.userInfo.first_name + " " + howl.userInfo.last_name;

  const howlTime = howlElement.querySelector(".timestamp");
  howlTime.textContent = new Date(howl.datetime).toLocaleString();

  const howlUser = howlElement.querySelector(".user");
  howlUser.textContent = `@${howl.userInfo.username}`;

  const howlMessage = howlElement.querySelector(".content");
  howlMessage.textContent = howl.text;

  howlList.prepend(howlElement);
}

api.getHowlsByUserId(id).then((howls) => {
  howls.forEach((howl) => {
    renderHowl(howl);
  });
});
const howlFollowing = document.getElementById("howlFollowing");
const followTemplate = document.getElementById("follows");

function renderFollowing(follow) {
  const followInstance = followTemplate.content.cloneNode(true);
  const followElement = followInstance.querySelector(".follows.container");

  const followAvatar = followElement.querySelector(".avatar");
  followAvatar.src = follow.userInfo.avatar;

  const nextLink = followElement.querySelector(".next");
  nextLink.href = "/howls?id=" + follow.userInfo.id;

  const followName = followElement.querySelector(".name");
  followName.textContent =
    follow.userInfo.first_name + " " + follow.userInfo.last_name;

  const followUser = followElement.querySelector(".user");
  followUser.textContent = `@${follow.userInfo.username}`;

  howlFollowing.prepend(followElement);
}

api.getFollowing(id).then((follows) => {
  follows.forEach((follow) => {
    renderFollowing(follow);
  });
});

const howlUser = document.getElementById("howlUser");
const userTemplate = document.getElementById("userTemplate");

function renderUser(user) {
  const userInstance = userTemplate.content.cloneNode(true);
  const userElement = userInstance.querySelector(".user.container");

  const followAvatar = userElement.querySelector(".avatar");
  followAvatar.src = user.avatar;

  const userName = userElement.querySelector(".name");
  userName.textContent = user.first_name + " " + user.last_name;

  const userUser = userElement.querySelector(".user");
  userUser.textContent = `@${user.username}`;
  let userPage = user.id;
  if (
    (currentUser && userPage != currentUser.id) ||
    user.id != currentUser.id
  ) {
    const userButton = document.createElement("button");
    // Following Lists
    let currentList = [];
    api.getFollowing(currentUser.id).then((follows) => {
      follows.forEach((follow) => {
        currentList.push(follow.userInfo.id);
      });

      userButton.className = "follow-button";
      if (currentList.includes(user.id)) {
        userButton.textContent = "Unfollow";
        userButton.value = "unfollow";
      } else {
        userButton.textContent = "Follow";
        userButton.value = "follow";
      }

      userButton.addEventListener("click", (e) => {
        e.preventDefault();

        if (userButton.value === "follow") {
          // Follow the user
          api
            .newFollow(id, currentUser.id)
            .then(() => {
              userButton.textContent = "Unfollow";
              userButton.value = "unfollow";
            })
            .catch((error) => {
              console.error("Error following user:", error);
            });
        } else {
          // Unfollow the user
          api
            .unFollow(id, currentUser.id)
            .then(() => {
              userButton.textContent = "Follow";
              userButton.value = "follow";
            })
            .catch((error) => {
              console.error("Error unfollowing user:", error);
            });
        }
      });
    });

    userElement.append(userButton);
  }

  howlUser.prepend(userElement);
}

api.getUserById(id).then((user) => {
  if (currentUser) {
    renderUser(user);
  } else {
    api.getCurrentUser().then((userResponse) => {
      currentUser = userResponse.user;
      renderUser(user);
    });
  }
});
