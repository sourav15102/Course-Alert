const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const sns = new AWS.SNS();

exports.handler = async (event) => {
  try {
    const { courseId, email } = event;

    const topicArn = await createTopicIfNotExists(courseId);

    await subscribeEmailToTopic(topicArn, email);

    return {
      statusCode: 200,
      body: JSON.stringify(`Email ${email} subscribed to topic ${courseId}.`),
    };
  } catch (error) {
    console.error('Error subscribing email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error subscribing email.'),
    };
  }
};

async function createTopicIfNotExists(courseId) {
  try {
    const topicName = courseId; // Use the courseId as the topic name
    const createTopicResult = await sns.createTopic({ Name: topicName }).promise();
    return createTopicResult.TopicArn;
  } catch (error) {
    console.error('Error creating topic:', error);
    throw error;
  }
}

async function subscribeEmailToTopic(topicArn, email) {
  try {
    await sns.subscribe({
      TopicArn: topicArn,
      Protocol: 'email',
      Endpoint: email,
    }).promise();
  } catch (error) {
    console.error('Error subscribing email to topic:', error);
    throw error;
  }
}
