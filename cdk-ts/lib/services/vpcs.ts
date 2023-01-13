import { SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export const createVpc = (scope: Construct, appName: string) => {
  return new Vpc(scope, "VPC", {
    vpcName: `${appName}_vpc`,
    natGateways: 0,
    subnetConfiguration: [
      {
        cidrMask: 24,
        name: `${appName}_vpc`,
        subnetType: SubnetType.PUBLIC,
      },
    ],
  });
};
