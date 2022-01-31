import { NextRequest, NextResponse } from "next/server";
import useWLogin from "../providers/signin-provider";

const middleware = (req, ev) => {
  const { pathname } = req.nextUrl;
  /*
  if (pathname != "/") {
    return NextResponse.redirect("/");
  }*/
  return NextResponse.next();
};

export default middleware;
//const os = req.ua.os.name;
//return NextResponse.rewrite(`/${os}`);
//return new Response('Hello,== world!');
