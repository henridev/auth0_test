import { WebAuth } from "auth0-js";

export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.requestedScopes = "openid profile email read:courses";
    this.auth0 = new WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: "token id_token",
      scope: this.requestedScopes,
    });
  }

  v;

  login = () => {
    this.auth0.authorize();
  };

  logout = () => {
    localStorage.removeItem("acces_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scopes");
    this.userProfile = null;
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      returnTo: "http://localhost:3000",
    });
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.session = authResult;
        this.history.push("/");
      } else if (err) {
        this.history.push("/");
        alert(`Error: ${err.error} check console for extra details`);
      }
    });
  };

  getProfile(cb) {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.accessToken, (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(profile, err);
    });
  }

  userHasScopes(scopes) {
    const grantedScopes = JSON.parse(
      localStorage.getItem("scopes") || ""
    ).split(" ");

    return scopes.every((scope) => grantedScopes.includes(scope));
  }

  get isAuthenticated() {
    const expires_at = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expires_at;
  }

  get accessToken() {
    const accesToken = localStorage.getItem("acces_token");
    if (!accesToken) {
      throw new Error("No access token to be found");
    } else {
      return accesToken;
    }
  }

  set session(authResult) {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    const scopes = authResult.scope || this.requestedScopes || "";

    localStorage.setItem("acces_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("scopes", JSON.stringify(scopes));
    console.log("localStorage", localStorage);
  }
}
