import { Stack, StackProps, aws_s3 } from "aws-cdk-lib";
import { Construct } from "constructs";
import { createVpc } from "./services/vpcs";
import { createSg } from "./services/security-groups";
import * as codebuild from "@aws-cdk/aws-codebuild";

export class DevopsGithubCodebuildS3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const appName = "s3web";

    const vpc = createVpc(this, appName);
    const sg = createSg(this, appName, vpc);

    const bucket = new aws_s3.Bucket(this, `${appName}_spa_s3`, {
      bucketName: `${appName}_spa_s3`,
      autoDeleteObjects: true,
      enforceSSL: true,
      // blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
      publicReadAccess: true,
    });

    bucket.grantPublicAccess

    const project = new codebuild.Project(this, `${appName}_project`, {
      buildSpec: codebuild.BuildSpec.fromObject({
        version: "0.2",
      }),
      artifacts: codebuild.Artifacts.s3({
        bucket: aws_s3.Bucket,
      }),
    });
  }
}
