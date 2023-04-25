// 코드를 작성해 주세요

// 모달 가져와서 display를 none으로 바꿔주기
const modal = document.querySelector(".modal");

// 모달 안보이게 하기
modal.addEventListener("click", function (e) {
	modal.style.display = "none";
});

// 사람 점수판, 점수
const pScore = document.querySelector(".countA");
let countP = 0;
// 컴퓨터 점수판, 점수
const cScore = document.querySelector(".countB");
let countC = 0;

// 가위바위보의 승자를 정해주는 함수
const whoWin = function (player, computer) {
	let winner = "";

	let p = "player";
	let c = "computer";

	if (player === "scissors") {
		if (computer === "paper") {
			countP += 1;
			winner = p;
		} else if (computer === "rock") {
			countC += 1;
			winner = c;
		}
	} else if (player === "rock") {
		if (computer === "scissors") {
			countP += 1;
			winner = p;
		} else if (computer === "paper") {
			countC += 1;
			winner = c;
		}
	} else if (player === "paper") {
		if (computer === "rock") {
			countP += 1;
			winner = p;
		} else if (computer === "scissors") {
			countC += 1;
			winner = c;
		}
	}

	pScore.innerText = countP;
	cScore.innerText = countC;

	return winner;
};

// 이벤트 함수 만들기
// 이벤트 함수에 추가 파라미터 + 이벤트 인자까지 사용하는 방법
const pickHand = (hand) => (e) => {
	console.log(e.target);

	// 버튼 비활성화 (중복 클릭 방지)
	document.querySelectorAll("button").forEach((button) => {
		button.disabled = true;
	});

  // 가위바위보
  let userPick = hand

  const picks = ["scissors" , "rock", "paper"]

  // 이미지 소스 바꿔줄 태그
  const comImg = document.querySelector("#player2-img")
  const playerImg = document.querySelector("#player1-img")
  
  // 사용자가 선택한 버튼으로 이미지 바꿔주기
  playerImg.src = `./img/${userPick}.png`

  // 0.1 마다 컴퓨터 이미지 순서대로 바꾸기
  let i = 0
  const imgChange = function() {
    i = (i + 1) % 3 // 0, 1, 2
    comImg.src = `./img/${picks[i]}.png`
  }

  // 인터벌 함수로 실행 (실행할 함수, 밀리초 단위)
  const timerId = setInterval(imgChange, 100)
  // 이 함수를 중단시켜야 하기 때문에 ID를 저장

  // 3초 후에 사진 바꾸기 중단하고 승부를 내면 된다.
  setTimeout(function() {
    // 인터벌 함수 중단
    clearInterval(timerId)

    // 컴퓨터의 손을 랜덤으로 정해주면 된다.
    let comPick = picks[Math.floor(Math.random() * 3)] // 0 1 2
    comImg.src = `./img/${comPick}.png`

    let winner = whoWin(userPick, comPick)

    // 승자를 정했으니 모달로 알려주기
    const modalContent = document.querySelector(".modal-content")
    modalContent.innerText = winner ? `승자는 ${winner} 입니다.` : "비겼습니다."

    // modal 의 display 속성을 바꿔서 화면에 표시
    modal.style.display = "flex"

    // 다시 게임 진행 할수 있도록 disable false 원상복구
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = false
    })

  }, 3000)

};

document
	.querySelector("#scissors-button")
	.addEventListener("click", pickHand("scissors"));
document
	.querySelector("#rock-button")
	.addEventListener("click", pickHand("rock"));
document
	.querySelector("#paper-button")
	.addEventListener("click", pickHand("paper"));
