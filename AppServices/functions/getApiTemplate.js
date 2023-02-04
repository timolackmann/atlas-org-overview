exports = function(purpose,id=""){


  console.log('get API request template');
  
  // Get stored credentials...
  const username = context.values.get("AtlasPublicKey");
  const password = context.values.get("AtlasPrivateKey");
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
      resourcePath = "api/atlas/v1.0/"+ id + "/groups";
    default:
      return {'err':'missing purpose'};
  }
  
  console.log(path);
  return { 
    scheme: 'https', 
    host: 'cloud.mongodb.com', 
    path: resourcePath, 
    username: username, 
    password: password,
    digestAuth:true
  };
};