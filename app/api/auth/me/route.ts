import { env } from '@/lib/server/env';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const GET = async (Req: Request) => {
  let toreturn: { name: string; value: string }[] = [];
  cookies()
    .getAll()
    .forEach((cookie) => {
      console.log(cookie);
      toreturn.push({ name: cookie.name, value: cookie.value });
    });

  const actualapi = await fetch('http://0.0.0.0:5454/user/me').then((res) =>
    res.json(),
  );
  return NextResponse.json({ cookies: toreturn, response: actualapi });
};
