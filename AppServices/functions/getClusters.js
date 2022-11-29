exports = async function(projectId) {
  const apiCall = await context.functions.execute('getApiTemplate','clusterList',projectId);
  response = await context.http.get(apiCall);
  const returnBody = EJSON.parse(response.body.text());
  var clusters = [];
  
  returnBody.results.forEach(function (cluster) {
    clusters.push({
      "name": cluster.name, 
      "id":cluster.id, 
      "size":cluster.providerSettings.instanceSizeName, 
      "clusterType":cluster.clusterType,
      "cloudProvider": cluster.providerSettings.providerName,
      "diskSize": cluster.diskSizeGB,
      "autoScaling": cluster.autoScaling,
      "backupConfiguration": {
        "enabled": cluster.backupEnabled,
        "pitEnabled": cluster.pitEnabled
      },
      "mongodbMajorVersion": cluster.mongoDBMajorVersion,
      "paused": cluster.paused
    });
  });

  return clusters; 
};