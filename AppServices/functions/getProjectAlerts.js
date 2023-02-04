exports = async function(projectId) {
  
  console.log('get project alerts');
  const apiCall = await context.functions.execute('getApiTemplate','getAlerts',projectId);
  response = await context.http.get(apiCall);
  const returnBody = EJSON.parse(response.body.text());
  var alerts = [];
  
  
  returnBody.results.forEach(function (alert) {
    alerts.push({
      "eventTypeName": alert.eventTypeName, 
      "created":alert.created, 
      "status":alert.status,
      "groupId":alert.groupId
    });
  });

  return alerts; 
};