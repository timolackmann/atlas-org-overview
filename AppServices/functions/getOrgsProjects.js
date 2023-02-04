exports = async function(orgs) {
  
  
  for (var i in orgs){
    console.log('get existing projects for org '+orgs[i]);
    const apiCall = await context.functions.execute('getApiTemplate', 'orgProjects', orgs[i]);
    response = await context.http.get(apiCall);
    const returnBody = EJSON.parse(response.body.text());
    var projects = [];
    returnBody.results.forEach(function (project) {
      projects.push({"name": project.name, "id":project.id});
    });
  }
  

  return projects; 
};