
function showHighScores(){
    document.getElementById('highScores').style.display = 'block';
}

function closeHighScores(){
    document.getElementById('highScores').style.display = 'none';
}

function getHighScores(){    
    $.post('/api/runQuery', {
        whichQuery: 'getHighScores',
        queryArray: []
    })
    .done( res => {
        let highScores = res;
        
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
    })
}

