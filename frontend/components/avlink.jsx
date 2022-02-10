import React from "react";
import Link from "next/link";

const AVLink = (props) => {
  const { children, style, ...others } = props;
  return (
    <div className="a" style={style} {...others}>
      {children}
    </div>
  );
};

export default AVLink;
