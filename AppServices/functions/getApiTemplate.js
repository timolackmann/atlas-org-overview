exports = function(purpose,id=""){


  console.log('get API request template');
  console.log(purpose);
  // Get stored credentials...
  const username = context.values.get("publicKey");
  const password = context.values.get("privateKey");
  var resourcePath = '';
  
  //build path based on purpose
  switch(purpose) {
    case 'clusterList':
      resourcePath = "api/atlas/v1.0/groups/"+ id + "/clusters";
      break;
    case 'userList':
      resourcePath = "api/atlas/v1.0/groups/"+ id + "/databaseUsers";
      break;
    case 'projectList':
      resourcePath = "api/atlas/v1.0/groups/";
      break;
    case 'ldapConfig':
      resourcePath = "api/atlas/v1.0/groups/"+ id + "/userSecurity";
      break;
    case 'orgProjects':
      resourcePath = "api/atlas/v1.0/orgs/"+ id + "/groups";
      break;
    case 'getAlerts':
      resourcePath = "api/atlas/v1.0/groups/"+ id + "/alerts";
      break;
    default:
      return {'err':'missing purpose'};
  }
  
  return { 
    scheme: 'https', 
    host: 'cloud.mongodb.com', 
    path: resourcePath, 
    username: username, 
    password: password,
    digestAuth:true
  };
};