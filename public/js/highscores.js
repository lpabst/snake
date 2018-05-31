
function getHighScores(){
    // get high scores from the DB here
    let fakeHighScores = [
        {name: 'Jolly Pirate', score: 44323},
        {name: 'Sully Parrot', score: 40123},
        {name: 'One Eyed Mermaid', score: 32556},
        {name: 'Tentative Gamer', score: 31856},
        {name: 'Uncle Bob', score: 26891},
    ];

    return fakeHighScores;
}

function showHighScores(){
    document.getElementById('highScores').style.display = 'block';
}

function closeHighScores(){
    document.getElementById('highScores').style.display = 'none';
}

let highScores = getHighScores();

highScores.forEach( obj => {
    let tableBody = document.getElementById('highScoresTableBody')
    
    let tr = document.createElement('tr');
    tr.innerHTML = ''
    +'<td>'
        + obj.score
    + '</td>'
    + '<td>'
        + obj.name
    + '</td>'

    tableBody.appendChild(tr);
})
