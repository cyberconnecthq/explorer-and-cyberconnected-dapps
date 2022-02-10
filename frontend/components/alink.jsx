import React from "react";
import Link from "next/link";

const ALink = (props) => {
  const { children, href, style, ...others } = props;
  const SERVER_SIDE_PAGE_TRANSITION =
    process.env.SERVER_SIDE_PAGE_TRANSITION || false;
  style = { ...style, cursor: "pointer" };

  if (SERVER_SIDE_PAGE_TRANSITION) {
    return (
      <a href={href} style={style}>
        {children}
      </a>
    );
  } else {
    return (
      <Link href={href} {...others}>
        <div className="a" style={style}>
          {children}
        </div>
      </Link>
    );
  }
};

export default ALink;
