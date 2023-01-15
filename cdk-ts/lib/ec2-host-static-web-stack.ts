import { Stack, StackProps } from "aws-cdk-lib";
import {
  AmazonLinuxImage,
  AmazonLinuxCpuType,
  AmazonLinuxGeneration,
  Instance,
  InstanceClass,
  InstanceSize,
  InstanceType,
  Peer,
  Port,
} from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";
import { createVpc } from "./services/vpcs";
import { createSg } from "./services/security-groups";

const startScripts = `
sudo yum update -y
sudo yum install -y httpd.x86_64
sudo systemctl start httpd.service
sudo systemctl enable httpd.service
wget https://github.com/poemcn/poemcn.github.io/archive/refs/heads/main.zip
sudo rm -rf /var/www/html/*
unzip main.zip -d /var/www/html/
sudo cp -r /var/www/html/poemcn.github.io-main/* /var/www/html/
sudo rm -r poemcn.github.io-main
`;

export class Ec2HostStaticWebStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const appName = "poemcn.github.io";

    const vpc = createVpc(this, appName);

    const httpSg = createSg(this, `${appName}_http`, vpc, "Allow http", 80);
    httpSg.addIngressRule(Peer.anyIpv4(), Port.tcp(443));

    const aim = new AmazonLinuxImage({
      cpuType: AmazonLinuxCpuType.X86_64,
      generation: AmazonLinuxGeneration.AMAZON_LINUX_2,
    });

    const instance = new Instance(this, "Instance", {
      instanceName: `${appName}_ec2`,
      vpc,
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
      machineImage: aim,
      securityGroup: httpSg,
    });

    instance.addUserData(startScripts);
  }
}
