import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

const GET = withApiAuthRequired(async function GET(req) {
  const res = new NextResponse();
  const { user } : any = await getSession(req, res);
  console.log(user)
  return NextResponse.json({ user: user }, res);
});

export { GET };