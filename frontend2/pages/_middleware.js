import { NextRequest, NextResponse } from 'next/server'

const middleware =  (req, ev) => {
  //const os = req.ua.os.name;
  //return NextResponse.rewrite(`/${os}`);

  //return new Response('Hello,== world!');
  return NextResponse.next()
};

export default middleware;