const { DynamoDB, Lambda } = require('aws-sdk');


exports.handler = async function (event) {
    console.log("request:", JSON.stringify(event, undefined, 2))
    
    const dynamo = new DynamoDB();
    const lambda = new Lambda();


    //update dynamo entry for 'path' with hits ++
   const params = {
        TableName: 'process.env.HIT_TABLE_NAME',
        Key: { path: { S: event.path } },
        UpdateExpression: 'Add hits :incr',
        ExpressionAttributeValues: { ':incr': { N: 1 } }
    }

    await dynamo.updateItem(params).promise();

    //call downstream function and capture response

    const resp = await lambda.invoke({
        FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
        Payload: JSON.stringify(event)
    }).promise();

    console.log('downstream response:', JSON.stringify(resp, undefined, 2));

    // return response back to upstream caller
    return JSON.parse(resp.Payload);
    

}