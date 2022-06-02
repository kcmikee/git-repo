import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Stack } from "../styles/Stack";
import { BiArrowBack } from "react-icons/bi";
import {
  GoGist as LanguageIcon,
  GoPerson as UserIcon,
  GoWatch as UpdatedIcon,
  GoFile as LicenseIcon,
  GoLock as VisibilityIcon,
} from "react-icons/go";
import { FaGithub } from "react-icons/fa";

import { useLocation, useNavigate, Navigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

function RepoDetail(props) {
  const history = useNavigate();
  const location = useLocation();
  const [issues, setIssues] = React.useState([]);
  const { data, updatedAt } = location?.state || 0;
  const {
    name,
    description,
    language,
    stargazers_count,
    forks_count,
    watchers_count,
    open_issues_count,
    license,
    owner,
    visibility,
    svn_url,
  } = data;
  React.useEffect(() => {
    if (data?.issues_url) {
      let issuedata = [];
      let url = data?.issues_url.replace("{/number}", ``);
      // console.log(url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          data.forEach((iss) => {
            issuedata.push(iss.title);
          });
          setIssues(issuedata);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [data]);

  const [graphData] = useState({
    series: [
      {
        data: [stargazers_count, forks_count, watchers_count, open_issues_count],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Stars", "Forks", "Followers", "Open Issues"],
      },
    },
  });

  if (!location.state) {
    return <Navigate to="/error" />;
  }

  return (
    <Container>
      <Header>
        Git Search <FaGithub />
      </Header>
      <Section>
        <Buttons>
          <BackButton
            onClick={() => {
              history(-1);
            }}>
            <BiArrowBack />
            Back to Results
          </BackButton>
        </Buttons>
        <NameLink href={svn_url} target="_blank" rel="noopener noreferrer">
          {name}
        </NameLink>
        <DetailMed>{description}</DetailMed>
        <DetailLink href={owner.html_url} target="_blank" rel="noopener noreferrer">
          <UserIcon />
          {owner.login}
        </DetailLink>
        <Detail>
          <LanguageIcon />
          {language ? language : "n/a"}
        </Detail>
        <Detail>
          <VisibilityIcon />
          {visibility}
        </Detail>
        <Detail>
          <LicenseIcon />
          {license ? license.name : "n/a"}
        </Detail>
        <Detail>
          <UpdatedIcon />
          {updatedAt ? updatedAt : "n/a"}
        </Detail>
      </Section>
      <Section>
        <Title>Open Issues ({issues?.length})</Title>
        <ul>
          {issues?.length > 0 ? (
            issues.map((iss, index) => (
              <li key={index}>
                <Detail>{iss}</Detail>
              </li>
            ))
          ) : (
            <li>
              <Detail>No open issue</Detail>
            </li>
          )}
        </ul>
      </Section>
      <Section>
        <ReactApexChart
          options={graphData?.options}
          series={graphData?.series}
          type="bar"
          height={350}
        />
      </Section>
    </Container>
  );
}

export default RepoDetail;

const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
    margin: 0;
  `}
`;

const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: space-between;
    background-color: ${theme.colors.secondary};
    padding: 1rem;
    color: ${theme.colors.primary};
  `}
`;

const Title = styled.h2`
  ${({ theme }) => css`
    margin-top: -0.8rem;
    font-size: 1.7rem;
    color: ${theme.colors.secondary};
  `}
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 2rem;
  margin: auto;
  gap: 1rem;
  width: 75%;
`;

const NameLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 2.25rem;
  text-decoration: none;
  color: black;
  text-decoration: underline;
`;

const DetailMed = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 1rem;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  font-size: 1rem;
`;
const DetailLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }
`;

const Buttons = styled(Stack)``;

const BackButton = styled.div`
  ${({ theme }) => css`
    width: 10rem;
    border: 2px solid ${theme.colors.secondary};
    border-radius: 10px;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${theme.colors.secondary};

    &:hover {
      background-color: ${theme.colors.tertiary};
    }
  `}
`;
