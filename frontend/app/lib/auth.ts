import { getSession as getAuth0Session } from '@auth0/nextjs-auth0';

// Configuration Auth0 côté serveur
export async function getSession() {
  try {
    return await getAuth0Session();
  } catch (error) {
    console.error('Auth0 session error:', error);
    return null;
  }
}

export async function getUser() {
  const session = await getSession();
  return session?.user || null;
}