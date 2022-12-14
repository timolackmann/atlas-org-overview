exports = async function(){
  
  console.log('start audit');
  
  const mongodb = context.services.get("mongodb-atlas");
  const auditCollection = mongodb.db("audits").collection("reports");  
  var projects = await context.functions.execute('getProjects');
  
    for (var project of projects){
      project.clusters = await context.functions.execute('getClusters',project.id);
      project['clusterCount'] = project.clusters.length;
      project.users = await context.functions.execute('getScramUsers',project.id);
      //project.ldapEnabled = await context.functions.execute('getLdapStatus',project.id);
    }

   const auditReport = {
    "auditDate": Date.now(),
    "projects": projects
    }

    auditCollection.insertOne(auditReport); 
    return 'report created';

};