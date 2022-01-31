import React from "react";
import Link from "next/link";
const ALink = (props) => {
  const { children, style, ...others } = props;
  return (
    <Link {...others}>
      <a style={style}>{children}</a>
    </Link>
  );
};

export default ALink;
