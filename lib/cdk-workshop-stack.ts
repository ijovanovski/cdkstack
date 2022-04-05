import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { HitCounter } from './hitcounter';
import { WorkshopPipelineStack } from './pipeline-stack';



export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const app = new cdk.App();
    new WorkshopPipelineStack(app, 'CdkWorkshopPipelineStack');
    

    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler'
    });

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloWithCounter.handler
    });






  }
}
    
  //   const queue = new sqs.Queue(this, 'CdkWorkshopQueue', {
  //     visibilityTimeout: Duration.seconds(300)
  //   });

  //   const topic = new sns.Topic(this, 'CdkWorkshopTopic');

  //   topic.addSubscription(new subs.SqsSubscription(queue));
  
