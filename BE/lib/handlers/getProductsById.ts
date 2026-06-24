import { APIGatewayProxyHandler } from 'aws-lambda';
import { products } from './products';

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('getProductsById lambda triggered', JSON.stringify(event));

  const { productId } = event.pathParameters ?? {};
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
      body: JSON.stringify({ message: 'Product not found' }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET',
    },
    body: JSON.stringify(product),
  };
};