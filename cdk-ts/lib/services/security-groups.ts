import { Peer, Port, SecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export const createSg = (
  scope: Construct, namePrefix: string, vpc: Vpc,
  description = "Allow ssh",
  allowIngressPort = 22,
  allowAllOutbound = true
  ) => {
  const sg = new SecurityGroup(scope, "SecurityGroup", {
    vpc,
    description,
    allowAllOutbound,
    securityGroupName: `${namePrefix}_sg`,
  });

  sg.addIngressRule(Peer.anyIpv4(), Port.tcp(allowIngressPort), description);
  
  return sg;
};
