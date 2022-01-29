import React from "react";
import Link from "next/link";
import { Default } from "./styles/default";

const PageNotFound = () => {
  return (
    <Default>
      <h1>Sorry, that page doesn&apos;t exist!</h1>
      <p>
        Why not try a <Link href={"/explore"} >search</Link> to find something
        else?
      </p>
    </Default>
  );
};

export default PageNotFound;
