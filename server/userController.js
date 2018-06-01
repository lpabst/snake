module.exports = {
    runQuery: function(req, res){
        const db = req.app.get('db');
        let { whichQuery, queryArray } = req.body;
        
        db[whichQuery](queryArray)
        .then( result => {
            console.log(result);
            return res.status(200).send(result)
        })
        .catch( err => console.log(err) )
    }
}

