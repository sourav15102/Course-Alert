const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const sns = new AWS.SNS();

exports.handler = async (event) => {
    const streamEvent = event.Records[0];
    if(streamEvent.eventName === 'MODIFY'){
      console.log('got till here..1');
      const newImage = streamEvent.dynamodb.NewImage;
      const oldImage = streamEvent.dynamodb.OldImage;
      const courseId = newImage.courseId.S;
      const newAvailability = parseInt(newImage.availability.N);
      const oldAvailability = parseInt(oldImage.availability.N);
      console.log('got till here..2',courseId,newAvailability,oldAvailability);
      
      if (newAvailability !== oldAvailability) {
        const courseTopic = await sns.createTopic({ Name: courseId }).promise();
        const message = `Course: ${courseId} has changed its number of seats from ${oldAvailability} to ${newAvailability}. Please visit dalonline.dal.ca/ to register for the courses.`;
        const res = await sendPushNotification(courseTopic.TopicArn, message);
        console.log('got till here..last', res);
        return {
          statusCode: 200,
          body: res
        };
      }
    }
  
};

async function sendPushNotification(topicArn, message) {
  const params = {
    Message: message,
    TopicArn: topicArn,
  };

  console.log('got till here..3', params);

  const res = await sns.publish(params).promise();
  return res;
}
