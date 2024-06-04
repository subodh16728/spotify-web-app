import styled from "styled-components";
import { BASE_URI } from "../utils";

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  max-width: 100%;
`;

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
    color: white;
  }
`;

const Login = () => {
  return (
    <StyledLoginContainer>
      <StyledLoginButton href={`${BASE_URI}/login`}>
        Log in to Spotify
      </StyledLoginButton>
    </StyledLoginContainer>
  );
};

export default Login;
