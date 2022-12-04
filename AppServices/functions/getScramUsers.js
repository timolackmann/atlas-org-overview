exports = async function(projectId) {
  const apiCall = await context.functions.execute('getApiTemplate','userList',projectId);
  response = await context.http.get(apiCall);
  const returnBody = EJSON.parse(response.body.text());
  var scramUsers = [];
  var ldapUsers = [];

//return users by ldap and scram users
  
  returnBody.results.forEach(function (user) {
    if (user.awsIAMType == "NONE" && user.ldapAuthType == "NONE" && user.x509Type == "NONE" && !user.username.startsWith('mongodb-realm'))
    scramUsers.push({"username": user.username});
    if (user.ldapAuthType == "USER" || user.ldapAuthType == "GROUP") 
    ldapUsers.push({"username":user.username});
  });

  return {"scram":scramUsers,"ldap":ldapUsers}; 
};