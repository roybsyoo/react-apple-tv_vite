import './Row.css'
import axios from '../api/axios';
import { useCallback, useEffect, useState } from 'react';

const Row = ({ title, id, fetchUrl }) => {

    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const [movieSelected, setmovieSelected] = useState();

    const handleClick = (movie) => {
        setModalOpen(true);
    }

    const fetchMovieData = useCallback(async () => {
        const response = await axios.get(fetchUrl);
        setMovies(response.data.results);
    }, [fetchUrl])

    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData])

    return (
        <div>
            <h2>title</h2>
            <div className='slider'>
                <div className='slider__arrow-left'>
                    <span className='arrow'
                    onClick={
                        () => {
                            document.getElementById(id).scrollLeft -= window.innerWidth -80;
                        }
                    }>
                        {"<"}
                    </span>
                </div>
                <div id={id} className='row__posters'>
                    {movies.map((movie) => (
                        <img
                        key={movies.id}
                        className='row__poster'
                        src={`https:/image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.name}
                        onClick={() => handleClick(movie)}
                        />
                    
                    ))}
                </div>
                <div className='slider__arrows-right'>
                <span className='arrow'
                onClick={() => {
                    document.getElementById(id).scrollLeft += window.innerWidth -80;
                }}>
                {">"}
                </span>
                </div>

            </div>
             {modalOpen ?
                <movieModal {...movieSelected}/>
            : null}
            </div>
           
            
                )
            }


export default Row