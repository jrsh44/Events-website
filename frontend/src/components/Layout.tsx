import { Outlet } from "react-router-dom";
import styled from "styled-components";

export const AuthLayout = () => (
  <ContentWrapper>
    <Wrapper>
      <Outlet />
    </Wrapper>
  </ContentWrapper>
);

export const MainLayout = () => (
  <Wrapper>
    <Outlet />
  </Wrapper>
);

const ContentWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 40px;
  gap: 40px;
  overflow-y: auto;
`;
