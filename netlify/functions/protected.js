import { jwtVerify, createRemoteJWKSet } from 'jose';

const AUTH0_DOMAIN = 'dev-egtfpxyws7b1h5f0.us.auth0.com';
const AUDIENCE = 'https://baja-api';
// This must match the namespace you used in the Auth0 Action
const EMAIL_CLAIM = 'https://baja-api/email'; 

const JWKS = createRemoteJWKSet(
  new URL(`https://${AUTH0_DOMAIN}/.well-known/jwks.json`)
);

export async function handler(event) {
  try {
    const authHeader = event.headers.authorization;
    if (!authHeader) return { statusCode: 401, body: 'Missing token' };

    const token = authHeader.split(' ')[1];

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://${AUTH0_DOMAIN}/`,
      audience: AUDIENCE,
    });

    // Look for the namespaced email claim we created in the Auth0 Action
    if (payload[EMAIL_CLAIM] !== 'urochesterbaja@gmail.com') {
      return { 
        statusCode: 403, 
        body: JSON.stringify({ error: 'Access Denied: Unauthorized User' }) 
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Secure data accessed!', user: payload }),
    };
  } catch (err) {
    console.error("Token error:", err.message);
    return { statusCode: 401, body: 'Invalid token' };
  }
}