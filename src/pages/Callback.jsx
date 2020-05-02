import React, { useEffect } from "react";

export default function Callback(props) {
  useEffect(() => {
    console.log("props.location.hash", props.location.hash);
    if (/access_token|id_token|error/.test(props.location.hash)) {
      props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callbaclk url");
    }
  });
  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
}
