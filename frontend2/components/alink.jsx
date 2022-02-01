import React from "react";
import Link from "next/link";

const ALink = (props) => {
  const { children, href, style, ...others } = props;
  const SERVER_SIDE_PAGE_TRANSITION = process.env.SERVER_SIDE_PAGE_TRANSITION || false;

  if (SERVER_SIDE_PAGE_TRANSITION) {
    return (
      <a href={href} style={style}>
        {children}
      </a>
    );
  } else {
    return (
      <Link href={href} {...others}>
        <a style={style}>{children}</a>
      </Link>
    );
  }
};

export default ALink;
