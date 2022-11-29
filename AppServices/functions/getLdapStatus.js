exports = async function(projectId) {
    const apiCall = await context.functions.execute('getApiTemplate','ldapConfig',projectId);
    response = await context.http.get(apiCall);
    const returnBody = EJSON.parse(response.body.text());
    console.log(returnBody);
    return returnBody.ldap.authenticationEnabled; 
  };