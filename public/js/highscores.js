
function showHighScores(){
    document.getElementById('highScores').style.display = 'block';
}

function closeHighScores(){
    document.getElementById('highScores').style.display = 'none';
}

function getHighScores(){
    // get high scores from the DB here
    // let fakeHighScores = [
    //     {name: 'Jolly Pirate', score: 44323},
    //     {name: 'Sully Parrot', score: 40123},
    //     {name: 'One Eyed Mermaid', score: 32556},
    //     {name: 'Tentative Gamer', score: 31856},
    //     {name: 'Uncle Bob', score: 26891},
    // ];

    var httpRequest;
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        return false;
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST', '/api/runQuery');
    httpRequest.send( JSON.stringify({
        queryString: 'hello',
        name: 'Loren',
        age: 44,
    }));

    function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            alert(httpRequest.responseText);
          } else {
            alert('There was a problem with the request.');
          }
        }
    }
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
