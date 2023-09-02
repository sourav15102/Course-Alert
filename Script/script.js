const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const data = [
  { courseId: 'CSCI5409', title: 'Adv. Cloud', availability: 45 },
  { courseId: 'CSCI5410', title: 'Serverless', availability: 30 },
  { courseId: 'CSCI5902', title: 'Cloud Architecture', availability: 35 },
  { courseId: 'CSC5308', title: 'Adv. Software Development', availability: 40 }
];

const params = {
  RequestItems: {
    'CourseList': data.map(item => ({
      PutRequest: {
        Item: item
      }
    }))
  }
};

dynamodb.batchWrite(params, (err, data) => {
  if (err) {
    console.error('Error uploading data:', err);
  } else {
    console.log('Data uploaded successfully:', data);
  }
});
