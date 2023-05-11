exports = async function(){
  
    console.log('initiate database configuration');
    
    const mongodb = context.services.get("mongodb-atlas");
    const auditDatabase = mongodb.db("audits");
    const auditCollection = auditDatabase.collection("reports");

    //create view for the latest report and unwind the projects array
    await auditDatabase.createCollection("latestReport", {
        viewOn: "reports",
        pipeline: [
            {$sort: {auditDate: -1}},
            {$limit: 1},
            {$unwind: "$projects"}
        ]
    });
  };