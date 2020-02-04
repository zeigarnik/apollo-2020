import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 380px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  border-radius: 7px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 25px 38px rgba(0, 0, 0, 0.3), 0 23px 24px rgba(0, 0, 0, 0.22);
  }
`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  weight: 100%;
  background-size: cover;
  background-position: center center;
`;

export default ({ id, bg }) => (
  <Container>
    <Link to={`/${id}`}>
      <Poster bg={bg} />
    </Link>
  </Container>
);
