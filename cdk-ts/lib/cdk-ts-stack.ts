import { Duration, Stack, StackProps, aws_ec2 as ec2 } from 'aws-cdk-lib';
import { Vpc, SecurityGroup, AmazonLinuxImage, SubnetType } from "aws-cdk-lib/aws-ec2"
import { Construct } from 'constructs';

export class CdkTsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const appName = "my_app"

    const vpc = new Vpc(this, "VPC", {
      natGateways: 0,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: `${appName}_vpc`,
          subnetType: SubnetType.PUBLIC
        }
      ]
    })

    const sg = new SecurityGroup(this, "SecurityGroup", {
      vpc,
      description: "Allow ssh",
      allowAllOutbound: true,
      securityGroupName: `${appName}_sg`
    })

    sg.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(22), "Allow ssh access")

    // todo: ...

  }
}
