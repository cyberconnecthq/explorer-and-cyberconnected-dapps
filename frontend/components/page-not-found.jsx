import React from "react";
import ALink from "./alink";
import { Default } from "./styles/default";

const PageNotFound = () => {
  return (
    <Default>
      <h1>Sorry, that page doesn&apos;t exist!</h1>
      <p>
        Why not try a <ALink href={"/explore"} >search</ALink> to find something
        else?
      </p>
    </Default>
  );
};

export default PageNotFound;
