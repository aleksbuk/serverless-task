import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getProductsList = new lambda.Function(this, 'GetProductsList', {
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'getProductsList.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, 'handlers')),
    });

    const getProductsById = new lambda.Function(this, 'GetProductsById', {
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'getProductsById.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, 'handlers')),
    });

    const api = new apigateway.RestApi(this, 'ProductsApi', {
      restApiName: 'Product Service',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    const products = api.root.addResource('products');
    products.addMethod('GET', new apigateway.LambdaIntegration(getProductsList));

    const product = products.addResource('{productId}');
    product.addMethod('GET', new apigateway.LambdaIntegration(getProductsById));

    new cdk.CfnOutput(this, 'ApiUrl', { value: api.url });
  }
}