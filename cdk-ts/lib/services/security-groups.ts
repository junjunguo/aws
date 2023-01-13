import { Peer, Port, SecurityGroup, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export const createSg = (scope: Construct, appName: string, vpc: Vpc) => {
  const sg = new SecurityGroup(scope, "SecurityGroup", {
    vpc,
    description: "Allow ssh",
    allowAllOutbound: true,
    securityGroupName: `${appName}_sg`,
  });

  sg.addIngressRule(Peer.anyIpv4(), Port.tcp(22), "Allow ssh access");
  
  return sg;
};
