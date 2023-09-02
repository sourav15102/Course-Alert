const index = require('./index.js');

const event = {
    "Records": [
      {
        "eventID": "c81e728d9d4c2f636f067f89cc14862c",
        "eventName": "MODIFY",
        "eventVersion": "1.1",
        "eventSource": "aws:dynamodb",
        "awsRegion": "us-east-1",
        "dynamodb": {
          "Keys": {
            "Id": {
              "N": "101"
            }
          },
          "NewImage": {
            "courseId": {
              "S": "CSCI5902"
            },
            "availability": {
              "N": "10"
            }
          },
          "OldImage": {
            "courseId": {
              "S": "CSCI5902"
            },
            "availability": {
              "N": "20"
            }
          },
          "ApproximateCreationDateTime": 1428537600,
          "SequenceNumber": "4421584500000000017450439092",
          "SizeBytes": 59,
          "StreamViewType": "NEW_AND_OLD_IMAGES"
        },
        "eventSourceARN": "arn:aws:dynamodb:us-east-1:123456789012:table/ExampleTableWithStream/stream/2015-06-27T00:48:05.899"
      }
    ]
  };

index.handler(event);