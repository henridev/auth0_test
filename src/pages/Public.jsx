import React, { useState, useEffect } from "react";

export default function Public() {
  const [state, setstate] = useState(null);

  useEffect(() => {
    fetch(`/public`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Network response is NOT OK");
        return response.json();
      })
      .then((response) => {
        console.log("response", response);
        setstate({ msg: response.msg });
      })
      .catch((err) => {
        console.log("err", err);
        setstate({ err: err });
      });
  }, []);

  if (!state) return <p>loading...</p>;
  return <div>{state.msg}</div>;
}
