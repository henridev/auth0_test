import React, { useState, useEffect } from "react";

export default function Profile({ auth }) {
  const [profile, setprofile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    auth.getProfile((profile, err) => {
      if (err) throw new Error("error getting profile");
      setprofile(profile);
    });
  };

  if (!profile) return null;

  return (
    <div>
      <h1>Profile</h1>
      <p>{profile.nickname}</p>
      <img
        src={profile.picture}
        alt="profile pic"
        srcset=""
        width="100"
        height="100"
      />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
