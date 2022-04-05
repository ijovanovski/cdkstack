"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitCounter = void 0;
const lambda = require("aws-cdk-lib/aws-lambda");
const dynamodb = require("aws-cdk-lib/aws-dynamodb");
const constructs_1 = require("constructs");
class HitCounter extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        const table = new dynamodb.Table(this, 'Hits', {
            partitionKey: { name: 'path', type: dynamodb.AttributeType.STRING }
        });
        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hitcounter.handler',
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: table.tableName
            }
        });
        console.log('props....', props);
        // grant the lambda role read/write permissions to our table
        table.grantReadWriteData(this.handler);
        // grant the lambda role invoke permissions to the downstream function
        props.downstream.grantInvoke(this.handler);
    }
}
exports.HitCounter = HitCounter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGl0Y291bnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhpdGNvdW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaURBQWlEO0FBQ2pELHFEQUFxRDtBQUNyRCwyQ0FBdUM7QUFPdkMsTUFBYSxVQUFXLFNBQVEsc0JBQVM7SUFLckMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUVoRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQzNDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFO1NBQ3RFLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUM1RCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ2pDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLG9CQUFvQjtZQUMvQixXQUFXLEVBQUU7Z0JBQ1gsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZO2dCQUN2RCxlQUFlLEVBQUUsS0FBSyxDQUFDLFNBQVM7YUFDakM7U0FDRixDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUMvQiw0REFBNEQ7UUFDNUQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2QyxzRUFBc0U7UUFDdEUsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FFSjtBQTlCRCxnQ0E4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XHJcbmltcG9ydCAqIGFzIGR5bmFtb2RiIGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBIaXRDb3VudGVyUHJvcHMge1xyXG4gIC8qKiB0aGUgZnVuY3Rpb24gZm9yIHdoaWNoIHdlIHdhbnQgdG8gY291bnQgdXJsIGhpdHMgKiovXHJcbiAgZG93bnN0cmVhbTogbGFtYmRhLklGdW5jdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEhpdENvdW50ZXIgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xyXG5cclxuICAvKiogYWxsb3dzIGFjY2Vzc2luZyB0aGUgY291bnRlciBmdW5jdGlvbiAqL1xyXG4gIHB1YmxpYyByZWFkb25seSBoYW5kbGVyOiBsYW1iZGEuRnVuY3Rpb247XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEhpdENvdW50ZXJQcm9wcykge1xyXG4gICAgXHJcbiAgICBzdXBlcihzY29wZSwgaWQpO1xyXG5cclxuICAgIGNvbnN0IHRhYmxlID0gbmV3IGR5bmFtb2RiLlRhYmxlKHRoaXMsICdIaXRzJywge1xyXG4gICAgICAgIHBhcnRpdGlvbktleTogeyBuYW1lOiAncGF0aCcsIHR5cGU6IGR5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuaGFuZGxlciA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ0hpdENvdW50ZXJIYW5kbGVyJywge1xyXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcclxuICAgICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxyXG4gICAgICAgIGhhbmRsZXI6ICdoaXRjb3VudGVyLmhhbmRsZXInLFxyXG4gICAgICBlbnZpcm9ubWVudDoge1xyXG4gICAgICAgIERPV05TVFJFQU1fRlVOQ1RJT05fTkFNRTogcHJvcHMuZG93bnN0cmVhbS5mdW5jdGlvbk5hbWUsXHJcbiAgICAgICAgSElUU19UQUJMRV9OQU1FOiB0YWJsZS50YWJsZU5hbWVcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZygncHJvcHMuLi4uJywgcHJvcHMpXHJcbiAgICAvLyBncmFudCB0aGUgbGFtYmRhIHJvbGUgcmVhZC93cml0ZSBwZXJtaXNzaW9ucyB0byBvdXIgdGFibGVcclxuICAgIHRhYmxlLmdyYW50UmVhZFdyaXRlRGF0YSh0aGlzLmhhbmRsZXIpO1xyXG5cclxuICAgIC8vIGdyYW50IHRoZSBsYW1iZGEgcm9sZSBpbnZva2UgcGVybWlzc2lvbnMgdG8gdGhlIGRvd25zdHJlYW0gZnVuY3Rpb25cclxuICAgIHByb3BzLmRvd25zdHJlYW0uZ3JhbnRJbnZva2UodGhpcy5oYW5kbGVyKTtcclxuICAgIH1cclxuICAgIFxyXG59Il19