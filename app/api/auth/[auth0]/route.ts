import { createUser } from "@/lib/actions";
import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";

const afterCallback = async (req: NextApiRequest, session: any, state: any) => {
  if (!session) return;

  const response = await createUser({
    sid: session.user.sub,
    productsList: [],
  });
  if (response) {
    console.log("New user created");
  }

  return session;
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
});
