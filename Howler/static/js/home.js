import HTTPClient from "./HTTPClient.js";
import APIClient from "./APIClient.js";

const howlList = document.getElementById("howlList");
const howlTemplate = document.getElementById("howlTemplate");

function renderHowl(howl) {
  const howlInstance = howlTemplate.content.cloneNode(true);
  const howlElement = howlInstance.querySelector(".howl.container");

  const howlAvatar = howlElement.querySelector(".avatar");
  howlAvatar.src = howl.userInfo.avatar;

  const nextLink = howlElement.querySelector(".next");
  nextLink.href = "/howls?id=" + howl.userInfo.id;

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

HTTPClient.get("./api/users/current/howls").then((howls) => {
  howls.forEach((howl) => {
    renderHowl(howl);
  });
});

const howlInput = document.querySelector("#howlInput textarea");
const howlButton = document.getElementById("howlButton");

howlButton.addEventListener("click", (e) => {
  if (howlInput.value === "") {
    return;
  }
  const data = {
    message: howlInput.value,
  };
  HTTPClient.post("./api/howls", data).then((howl) => {
    renderHowl(howl);
    howlInput.value = "";
  });
});
