import { Stack, StackProps } from "aws-cdk-lib";
import {
  AmazonLinuxImage,
  AmazonLinuxCpuType,
  AmazonLinuxGeneration,
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
} from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { createVpc } from "./services/vpcs";
import { createSg } from "./services/security-groups";

export class Ec2SimpleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const appName = "my_app";

    const vpc = createVpc(this, appName);

    const sg = createSg(this, appName, vpc);

    const aim = new AmazonLinuxImage({
      cpuType: AmazonLinuxCpuType.X86_64,
      generation: AmazonLinuxGeneration.AMAZON_LINUX_2,
    });

    const instance = new Instance(this, "Instance", { 
      instanceName: `${appName}_ec2`,
      vpc,
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
      machineImage: aim,
      securityGroup: sg,
    });
  }
}
