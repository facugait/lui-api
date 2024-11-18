import { Button, Flex } from "antd";
import React from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/auth";

const Wrapper = styled.section`
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20px;
  padding: 0 24px;
  border-shadow: 0 2px 8px #f0f0f0;
`;

interface Props {
  logo: React.ReactNode;
}

export const Header: React.FC<Props> = ({ logo }) => {
  const { user, logout } = useAuth();
  return (
    Boolean(user) && (
      <Wrapper>
        <Flex className="header" align="center" justify="space-around">
          {logo}
          <StyledButton type="text" onClick={logout}>
            Logout
          </StyledButton>
        </Flex>
      </Wrapper>
    )
  );
};

const StyledButton = styled(Button)`
  margin-left: auto;
  border: 1px solid #ccc;
`;
