const ipl_routes = require('./match_routes');
module.exports = function(app,db){
    ipl_routes(app,db)
}