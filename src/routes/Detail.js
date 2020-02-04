import React from "react";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      language
      rating
      medium_cover_image
      description_intro
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  position: relative;
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Suggestions = styled.div`
  position: absolute;
  overflow-y: hidden;
  top: 874px;
  left: 0%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
  width: 100%;
  height: 10%;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    overflow: visible;
  }
`;

const Suggestion = styled.div`
  width: 80%;
  left: 0%;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    overflow: visible;
    transform: translate(0px, -300px);
  }
`;
export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, { variables: { id } });
  console.log(data);
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading..." : data.movie.title}</Title>
        <Subtitle>
          {data?.movie?.language}·★{data?.movie?.rating}
        </Subtitle>
        <Description>{data?.movie?.description_intro}</Description>
      </Column>
      <Poster bg={data?.movie?.medium_cover_image} />
      <Suggestions>
        {data?.suggestions?.map(s => (
          <Suggestion>
            <Movie key={s.id} id={s.id} bg={s.medium_cover_image}></Movie>
          </Suggestion>
        ))}
      </Suggestions>
    </Container>
  );
};
