exports = async function() {
  const apiCall = await context.functions.execute('getApiTemplate', 'projectList');
  response = await context.http.get(apiCall);
  const returnBody = EJSON.parse(response.body.text());
  var projects = [];
  
  returnBody.results.forEach(function (project) {
    projects.push({"name": project.name, "id":project.id});
  });

  return projects; 
};