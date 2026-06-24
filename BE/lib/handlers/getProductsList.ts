import { APIGatewayProxyHandler } from 'aws-lambda';
import { products } from './products';

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('getProductsList lambda triggered', JSON.stringify(event));

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
    body: JSON.stringify(products),
  };
};