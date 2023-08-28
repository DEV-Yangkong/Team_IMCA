import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
          }}
          onFailure={(err) => {
            console.log(err);
          }}
        ></GoogleLogin>
      </GoogleOAuthProvider>
    </>
  );
};
export default GoogleLoginButton;
