var github = require('github-api');
var gh = new github({
    username: "gastjustin",
    password: "DEMIevil1*",
    auth: "basic"
  });
 
const util = require('util');
var org = gh.getOrganization('justin-gast');

org.getRepos(function(err, repos){
    for(var myKey in repos) {
        var repo = repos[myKey];
        console.log(repo);
        if(repo.license === null){
            try{
                //create a branch
                try{
                    gh.createBranch(newBranch="oitTest"+myKey);
                } catch(err){
                    console.log(err);
                }
                //add license
                try{
                    var editRepo = {
                        "name": repo.name,
                        "license_template": "MIT"
                    }
                    gh.updateRepository(editRepo);
                } catch(err){
                    console.log(err);
                }
                //commit and make PR
                var PRParams = {
                    "title": "Add a license to this repository",
                    "body": "This repository needs a license so let make one",
                    "head": "octocat:new-feature",
                    "base": "master"
                }
                var commit = {
                    "message": "add license to repository",
                    "committer": {
                        "name": "Justin Gast",
                        "email": "gast.justin@gmail.com"
                    },
                    "content": "bXkgbmV3IGZpbGUgY29udGVudHM="
                }
                try{
                    gh.commit(commit);
                } catch(err){
                    console.log(err);
                }
                try{
                    gh.createPullRequest(PRParams);
                } catch(err){
                    console.log(err);
                }
            }catch{
                console.log(err);
            }
        }
     }
});
