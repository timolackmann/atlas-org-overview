exports = async function(orgs) {

  var projects = [];
  
  for (var i in orgs){
    console.log('get existing projects for org '+orgs[i]);
    const apiCall = await context.functions.execute('getApiTemplate', 'orgProjects', orgs[i]);
    
    console.log(apiCall.path);
    
    response = await context.http.get(apiCall);
    const returnBody = EJSON.parse(response.body.text());
    returnBody.results.forEach(function (project) {
      projects.push({"name": project.name, "id":project.id});
    });
  }
  

  return projects; 
};