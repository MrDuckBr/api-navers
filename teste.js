var jsonObj = {
    members: 
           {
            host: "hostName",
            viewers: 
            {
                
            }
        }
}

var i;

for(i=4; i<=8; i++){
    var newUser = "user" + i;
    var newValue = "value" + i;
    jsonObj.members.viewers[newUser] = newValue ;

}

console.log(jsonObj);