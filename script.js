let freezeScoreboard = 0;
let player1Name, player2Name;
let currentServer = 1;
let gameScore = [0, 0];
let setScore = [0, 0];
let matchScore = [0, 0];
let faultCount = 0;
let points = ['0', '15', '30', '40', 'AD'];
let sides = ['Right Side', 'Left Side'];

function startMatch() {
    if (freezeScoreboard === 1) {
        document.querySelectorAll('button').forEach(button => button.disabled = false);
        freezeScoreboard = 0;
        currentServer = 1;
        gameScore = [0, 0];
        setScore = [0, 0];
        matchScore = [0, 0];
        faultCount = 0;
    }

    document.getElementById('scoreBoard').style.display = 'block';

    player1Name = document.getElementById("player1Name").value;
    player2Name = document.getElementById("player2Name").value;
    if (!player1Name || !player2Name) {
        alert("Please enter names for both players.");
        return;
    }
    document.getElementById("displayPlayer1Name").innerText = player1Name;
    document.getElementById("displayPlayer2Name").innerText = player2Name;
    document.getElementById("startButton").innerText = "Edit Names";
    document.getElementById("scoreButton1").innerText = "Point - " + player1Name;
    document.getElementById("scoreButton2").innerText = "Point - " + player2Name;
    document.getElementById("currentServer").innerText = currentServer === 1 ? player1Name : player2Name;
    updateScores();
}

function scorePoint(player) {
    if (!player1Name || !player2Name) {
        alert("Please enter names for both players.");
        return;
    }

    faultCount = 0;
    gameScore[player - 1] += 1;

    if (gameScore[player - 1] >= 4 && gameScore[player - 1] >= gameScore[1 - (player - 1)] + 2) {
        winGame(player);
    } else if (gameScore[player - 1] === 4 && gameScore[1 - (player - 1)] === 4) {
        gameScore = [3, 3];
    }

    if (freezeScoreboard === 0) {
        updateScores();
    }
}

function fault() {
    if (!player1Name || !player2Name) {
        alert("Please enter names for both players.");
        return;
    }      
    
    faultCount++;
    if (faultCount === 2) {
        scorePoint(currentServer === 1 ? 2 : 1);
    } else {
        document.getElementById("currentServer").innerText = (currentServer === 1 ? player1Name : player2Name) + " (1 Fault)";
    }
}

function winGame(player) {
    freezeScoreboard = 1;
    document.getElementById('nextButton').style.display = 'flex';
    document.getElementById('nextButton').innerText = "Next Game";
    document.getElementById("scoreButton1").disabled = true;
    document.getElementById("scoreButton2").disabled = true;
    document.getElementById("faultButton").disabled = true;
    
    setScore[player - 1]++;
    document.getElementById("setScore").innerText = player1Name + " | " + `${setScore[0]} - ${setScore[1]}` + " | " + player2Name;
    gameScore = [0, 0];
    currentServer = currentServer === 1 ? 2 : 1;
    if ((setScore[player - 1] >= 6 && (setScore[player - 1] - setScore[1 - (player - 1)]) >= 2) || setScore[player - 1] === 7) {
        winSet(player);
    }
}

function winSet(player) {
    document.getElementById('nextButton').innerText = "Next Set";
    matchScore[player - 1]++;
    document.getElementById("matchScore").innerText = player1Name + " | " + `${matchScore[0]} - ${matchScore[1]}` + " | " + player2Name;
    if (matchScore[player - 1] === 2) {
        alert(`${player === 1 ? player1Name : player2Name} wins the match!`);
        freezeScoreboard = 1;
        document.querySelectorAll('button').forEach(button => button.disabled = true);
        document.getElementById("startButton").disabled = false;
        document.getElementById("startButton").innerText = "Restart Match";
        document.getElementById('nextButton').style.display = 'none';
    }
    if (matchScore[player - 1] + matchScore[1 - (player - 1)] === 1) {
        currentServer = 2;
    } else {
        currentServer = 1;
    }
    setScore = [0, 0];
}

function next() {
    freezeScoreboard = 0;
    document.getElementById('nextButton').style.display = 'none';
    document.getElementById("scoreButton1").disabled = false;
    document.getElementById("scoreButton2").disabled = false;
    document.getElementById("faultButton").disabled = false;
    updateScores();
}

function updateScores() {
	document.getElementById("player1Score").innerText = `${points[gameScore[0]]}`;
	document.getElementById("player2Score").innerText = `${points[gameScore[1]]}`;
	document.getElementById("setScore").innerText = player1Name + " | " + `${setScore[0]} - ${setScore[1]}` + " | " + player2Name;
	document.getElementById("matchScore").innerText = player1Name + " | " + `${matchScore[0]} - ${matchScore[1]}` + " | " + player2Name;
	document.getElementById("currentServer").innerText = currentServer === 1 ? player1Name : player2Name;
	document.getElementById("serveSide").innerText = sides[(gameScore[0] + gameScore[1]) % 2];
}