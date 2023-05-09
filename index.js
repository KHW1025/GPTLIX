// http://localhost:3001/guide

const btn_send = document.querySelector("#BtnSendMessage");
const chatMessage = document.querySelector(".chat_message");

const favorite = document.querySelector("#favorite");

const chatCon = document.querySelector(".chat_con");
const guideChat = document.querySelector(".guide_chat");
const loader = document.querySelector(".loader");
const reStart = document.querySelector(".BtnReStart");
const chatInputBox = document.querySelector(".chat_input");

// 임시
// guideChat.style.display = "none";
// chatCon.style.display = "block";

favorite.focus();

let userMessages = [];
let assistantMessages = [];

const sendMessage = async () => {
  guideChat.style.display = "none";
  loader.style.display = "flex";
  reStart.style.display = "none";
  chatInputBox.style.display = "none";

  let myFavorite = favorite.value;

  const chatInput = document.querySelector(".chat_input input");
  const chatMassageDiv = document.createElement("div");
  chatMassageDiv.classList.add("chat_message");
  chatMassageDiv.innerHTML = `<p class="myQuestion">${chatInput.value}</p>`;
  chatCon.appendChild(chatMassageDiv);

  userMessages.push(chatInput.value);
  chatInput.value = "";

  const response = await fetch(
    "https://aqybaewb5f.execute-api.ap-northeast-2.amazonaws.com/props/guide",
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        myFavorite: myFavorite,
        userMessages: userMessages,
        assistantMessages: assistantMessages,
        // 보낼애들 : let으로 지정한 변수
      }),
    }
  );

  const data = await response.json();
  // console.log(data.assistant);

  assistantMessages.push(data.assistant);
  const astrologerMessage = document.createElement("div");
  astrologerMessage.innerHTML = `<p class = "assistant">${data.assistant.replace(
    /\n/g,
    "<br/>"
  )}</p>`;
  chatCon.appendChild(astrologerMessage);

  // chatMessage.innerHTML += data.assistant.replace(/\n/g, "<br/>");
  loader.style.display = "none";
  chatCon.style.display = "block";
  chatCon.scrollTop = chatCon.scrollHeight;
  chatInputBox.style.display = "flex";
  reStart.style.display = "block";

  // chatInput.style.display = "flex";
};

const reFresh = () => {
  window.location.reload();
};

btn_send.addEventListener("click", sendMessage);

document.querySelector("#btn").addEventListener("click", sendMessage);
reStart.addEventListener("click", reFresh);
