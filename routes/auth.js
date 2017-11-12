/**
 * Created by janghunlee on 2017. 11. 12..
 */

module.exports = auth;

function auth(app , randomString , userModel) {
    app.post('/auth/register',(req,res)=>{
        "use strict";
        var data = req.body;

        userModel.find({"id":data.id,"password":data.password},(err,model)=>{
            if(err) throw err;

            if(model.length == 0){
                res.send(400, "user already exist");
            }
            else{
                data.token = randomString.generate();

                var saveUser = new userModel(data);
                saveUser.save((err,model)=>{
                    if(err) throw err;

                    req.session.token = data.token;

                    res.send(200);
                });
            }
        });
    });

    app.post('/auth/login',(req,res)=>{
        "use strict";
        var data = req.body;

        userModel.find({"id":data.id,"password":data.password},(err,model)=>{
            if(err) throw err;

            if(model.length == 0){
                res.send(404,"user not found");
            }
            else{
                req.session.token = model[0]["token"];
                res.send(200);
            }
        });
    });
}