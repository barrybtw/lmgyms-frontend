import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = (Req: Request) => {
  let toreturn: { name: string; value: string }[] = [];
  cookies()
    .getAll()
    .forEach((cookie) => {
      console.log(cookie);
      toreturn.push({ name: cookie.name, value: cookie.value });
    });
  return NextResponse.json({ cookies: toreturn });
};
