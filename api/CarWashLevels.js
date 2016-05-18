exports.getAll=function(req,res){
    res.type('application/json');
    
    res.status(200);
    
    res.json(state.carWashLevels);
};