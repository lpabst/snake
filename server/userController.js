const userController = {
    getHighScores: function(req, res){
        const db = req.app.get('db');

        db.getHighScores()
        .then( result => {
            return res.status(200).send(result);
        })
        .catch( err => console.log(err) )
    },

    newHighScore: function(req, res){
        const db = req.app.get('db');
        let { name, score } = req.body;
        
        db.newHighScore([name, score])
        .then( result => {
            res.status(200).send(result);

            db.cleanHighScores()
            .then(done => {})
            .catch(err => {})
        })
        .catch( err => console.log(err) )
        

        
    }
}

module.exports = userController;
