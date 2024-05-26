import React, { useEffect} from 'react';
import axios from '../api/axios';
import requests from '../api/request';
import Banner from './Banner';
import styled from 'styled-components';



const Banner = () => {

  const [movie ,setMovie] = useState(null);
  const [isClicked, setisClicked] = useState(false)

  useEffect(() => {
    fetchData();
  },[])

  const fetchData = async() => {
    //현재 상영중인 영화 정보를 가져오기 (여러영화)
    const reponse = await axios.get(requests.fetchNowPlaying);
    //여러 영화 중 영화 하나의 ID를 가져오기
    const movieID = response.data.results[
      Math.floor(Math.random() * response.data.results.length)
    ].id

    //특정영화의 더 상세한 정보를 가져오기(비디오 정보도 포함)
    const { data: movieDetail } = await axios.get(`movie/${movieID}`,{
      params: { append_to_response: "videos"}
    })
    console.log('movieDetail', movieDetail);
    setMovie(movieDetail);
  }
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "...." : str;
  }
  if (!movie) {
    return (
      <div>
        loading...
      </div>
    )
  } 
  if(isClicked){
    return (
      <div
      className='banner'
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop.path}")`,
        backgroundPosition: 'top center',
        backgroundSize: 'cover'
        }}>
        <div className='banner__contents'>
          <h1 className='banner__title'>
            {movie.title || movie.name || movie.original_name}

          </h1>
          <div className='banner__buttons'>
        {movie.videos?.result(0)?.key?
        <button className='banner__button play'
        onClick={() => setisClicked(true)} >
        play
        </button>
        : null
}
      </div>
      <p className='bnner__description'>
        {truncate(movie.overview, 100)}
      </p>
      </div>
      <div className='banner--fadeBottom' />
      </div>
    )

  }
  else {
    return (
      <>
      <Container>
        <homeContainer>
        <iframe src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?control=0&autoplay=1&mute=1`}></iframe>
        </homeContainer>
      </Container>
      <button onClick={() => setisClicked(false)}>
        x
      </button>
      </>
    )


  }
}
const Iframe = styled.iframe`
width: 100%;
height: 100%;
z-index: -1;
opacity: 0.65;
border: none;
`

const Container = styled.div`
display: flex;
justify-content: container;
align-items: center;
flex-direction: column;
height: 100%;
height: 100vh;
`
const homeContainer = styled.div`
width: 100%;
height: 100%;
`

export default Banner