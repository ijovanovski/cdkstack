"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdkWorkshopStack = void 0;
const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const apigw = require("aws-cdk-lib/aws-apigateway");
const hitcounter_1 = require("./hitcounter");
class CdkWorkshopStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const hello = new lambda.Function(this, 'HelloHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hello.handler'
        });
        const helloWithCounter = new hitcounter_1.HitCounter(this, 'HelloHitCounter', {
            downstream: hello
        });
        // defines an API Gateway REST API resource backed by our "hello" function.
        new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: helloWithCounter.handler
        });
    }
}
exports.CdkWorkshopStack = CdkWorkshopStack;
//   const queue = new sqs.Queue(this, 'CdkWorkshopQueue', {
//     visibilityTimeout: Duration.seconds(300)
//   });
//   const topic = new sns.Topic(this, 'CdkWorkshopTopic');
//   topic.addSubscription(new subs.SqsSubscription(queue));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RrLXdvcmtzaG9wLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2RrLXdvcmtzaG9wLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUNuQyxpREFBaUQ7QUFDakQsb0RBQW9EO0FBQ3BELDZDQUEwQztBQUUxQyxNQUFhLGdCQUFpQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzdDLFlBQVksS0FBYyxFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM1RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN0RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLGVBQWU7U0FDekIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLHVCQUFVLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQy9ELFVBQVUsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQztRQUVILDJFQUEyRTtRQUMzRSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtZQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsT0FBTztTQUNsQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFuQkQsNENBbUJDO0FBRUMsNERBQTREO0FBQzVELCtDQUErQztBQUMvQyxRQUFRO0FBRVIsMkRBQTJEO0FBRTNELDREQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBhcGlndyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgeyBIaXRDb3VudGVyIH0gZnJvbSAnLi9oaXRjb3VudGVyJztcblxuZXhwb3J0IGNsYXNzIENka1dvcmtzaG9wU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogY2RrLkFwcCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgaGVsbG8gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsICdIZWxsb0hhbmRsZXInLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmZyb21Bc3NldCgnbGFtYmRhJyksXG4gICAgICBoYW5kbGVyOiAnaGVsbG8uaGFuZGxlcidcbiAgICB9KTtcblxuICAgIGNvbnN0IGhlbGxvV2l0aENvdW50ZXIgPSBuZXcgSGl0Q291bnRlcih0aGlzLCAnSGVsbG9IaXRDb3VudGVyJywge1xuICAgICAgZG93bnN0cmVhbTogaGVsbG9cbiAgICB9KTtcblxuICAgIC8vIGRlZmluZXMgYW4gQVBJIEdhdGV3YXkgUkVTVCBBUEkgcmVzb3VyY2UgYmFja2VkIGJ5IG91ciBcImhlbGxvXCIgZnVuY3Rpb24uXG4gICAgbmV3IGFwaWd3LkxhbWJkYVJlc3RBcGkodGhpcywgJ0VuZHBvaW50Jywge1xuICAgICAgaGFuZGxlcjogaGVsbG9XaXRoQ291bnRlci5oYW5kbGVyXG4gICAgfSk7XG4gIH1cbn1cbiAgICBcbiAgLy8gICBjb25zdCBxdWV1ZSA9IG5ldyBzcXMuUXVldWUodGhpcywgJ0Nka1dvcmtzaG9wUXVldWUnLCB7XG4gIC8vICAgICB2aXNpYmlsaXR5VGltZW91dDogRHVyYXRpb24uc2Vjb25kcygzMDApXG4gIC8vICAgfSk7XG5cbiAgLy8gICBjb25zdCB0b3BpYyA9IG5ldyBzbnMuVG9waWModGhpcywgJ0Nka1dvcmtzaG9wVG9waWMnKTtcblxuICAvLyAgIHRvcGljLmFkZFN1YnNjcmlwdGlvbihuZXcgc3Vicy5TcXNTdWJzY3JpcHRpb24ocXVldWUpKTtcbiAgXG4iXX0=