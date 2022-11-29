exports = async function() {
  
  console.log('get existing projects');
  
  const apiCall = await context.functions.execute('getApiTemplate', 'projectList');
  response = await context.http.get(apiCall);
  const returnBody = EJSON.parse(response.body.text());
  var projects = [];
  console.log(returnBody);
  returnBody.results.forEach(function (project) {
    projects.push({"name": project.name, "id":project.id});
  });

  return projects; 
};