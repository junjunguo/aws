#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { Ec2SimpleStack } from "../lib/ec2-simple-stack";

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new cdk.App();
new Ec2SimpleStack(app, "Ec2SimpleStack", { env });
