const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const handler = async (event) => {
  try {
    const tableName = event.tableName;

    const scanParams = {
      TableName: tableName
    };
    console.log(scanParams);

    const scanResult = await dynamoDB.scan(scanParams).promise();

    const result = scanResult.Items.map(item => ({
      id: item.courseId,
      title: item.title,
      availability: item.availability,
    }));

    return {
      statusCode: 200,
      body: result
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error
    };
  }
};


module.exports = {
    handler: handler
};
