module.exports = {
    runQuery: function(req, res){
        const db = req.app.get('db');
        let { queryString } = req.body;

        db.query(queryString)
        .then( res => {
            console.log(res);
        })
    }
}