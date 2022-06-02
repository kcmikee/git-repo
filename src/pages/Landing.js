import React from "react";
import styled, { css } from "styled-components";
import SearchBar from "../Reuseables/SearchBar";
import { GoMarkGithub as GithubIcon } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Stack } from "../styles/Stack";

function Landing() {
  const navigate = useNavigate();
  const routeChange = (input) => {
    let path = `/search/${input}`;
    navigate(path);
  };

  return (
    <Container id="Filters">
      <Wrapper>
        <Title>
          Git Search
          <GithubIcon />
        </Title>
        <SearchBar placeholder="Search for repository..." onSubmit={routeChange} />
      </Wrapper>
    </Container>
  );
}

export default Landing;

const Container = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary};
    color: ${theme.colors.primary};
  `}
`;

const Wrapper = styled(Stack)`
  height: 100vh;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled(Stack)`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.title};
    gap: 1rem;
    padding-bottom: 40px;
  `}
`;
