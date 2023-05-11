exports = async function(){
  
  console.log('start audit');
  
  const mongodb = context.services.get("mongodb-atlas");
  const auditCollection = mongodb.db("audits").collection("reports");
  const orgs = context.values.get("orgList");

// this is currently not in use and will be relevant for cross-org overviews
  if (orgs != undefined && orgs.length > 0){
    for (var i in orgs){
      var projects = await context.functions.execute('getOrgsProjects', orgs);
    }
  }else{
    var projects = await context.functions.execute('getProjects');
  }  
  
  for (var project of projects){
    project.clusters = await context.functions.execute('getClusters',project.id);
    project['clusterCount'] = project.clusters.length;
    
    //this section can be enabled to audit the existing scram database users
    //project.users = await context.functions.execute('getScramUsers',project.id);
    
    project.alerts = await context.functions.execute('getProjectAlerts', project.id);
    //project.ldapEnabled = await context.functions.execute('getLdapStatus',project.id);
  }

   const auditReport = {
    "auditDate": Date.now(),
    "projects": projects
    }

    auditCollection.insertOne(auditReport); 
    return 'report created';

};