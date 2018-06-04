
function showHighScores(){
    document.getElementById('highScores').style.display = 'block';
}

function closeHighScores(){
    document.getElementById('highScores').style.display = 'none';
}

function displayUsername(){
    var username = document.getElementById('username').value;
    document.getElementById('usernameDisplay').innerText = username;
}

// runs on page load, and also when user updates the value
function updateObstaclePreference(e){
    var obstaclePreference = document.getElementById('obstaclePreference');
    window.obstaclePreference = obstaclePreference.value;
}
updateObstaclePreference();

function getHighScores(){    
    $.get('/api/getHighScores')
    .done( res => {
        let highScores = res;
        window.highScores = highScores;

        let tableBody = document.getElementById('highScoresTableBody');
        tableBody.innerHTML = `                    
            <tr>
                <th colspan="2" style="text-align: center;">High Scores</th>
            </tr>
            <tr>
                <th>Score</th>
                <th>Name</th>
            </tr>`

        highScores.forEach( obj => {
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
    })
}

getHighScores();

