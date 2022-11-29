exports = async function(projectId) {
    
    console.log("get LDAP status");
    const apiCall = await context.functions.execute('getApiTemplate','ldapConfig',projectId);
    response = await context.http.get(apiCall);
    const returnBody = EJSON.parse(response.body.text());
    console.dir(returnBody);
    return returnBody.ldap.authenticationEnabled; 
  };