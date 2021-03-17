import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import {API_URL, API_KEY, IMAGE_URL} from '../../config/keys';
import MainImage from './MainImage';
import {Row} from 'reactstrap';
import GridCard from './GridCard';
import Favorite from './Favorite';

function MovieDetail(props) {

    const movieId = props.match.params.Id;
    const [Movie, setMovie] = useState([]);
    const [Crews, setCrews] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);

    useEffect(() => {

        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setMovie(response);

            fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setCrews(response.cast)
            })
        })
    }, [])

    const handleClick = () => {
        setActorToggle(!ActorToggle);
    }

    return (
        <>
            <div>
                {Movie &&
                    <MainImage image={`${IMAGE_URL}original${Movie.backdrop_path && Movie.backdrop_path}`}
                    title={Movie.original_title} text={Movie.overview} />
                }
            </div>

            <div style={{ width: '95%', margin: '1rem auto'}}>
                {/* basic info */}
                <div className="row mb-4">
                    <div className=" col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div className="h2"> Movie Information</div>
                    </div>
                    <div className="d-none d-sm-block col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div className="float-right">
                            <Favorite userFrom= {localStorage.getItem('userId')} movieId={movieId} movieInfo={Movie} />
                        </div>
                    </div>
                    <div className="d-block d-sm-none col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center">
                    </div>
                </div>

                {/* movie info part */}
                <div className="row">
                    <div className="d-none d-sm-block col-3">
                    <div className="d-none d-sm-block">
                        <img className="img-rounded img-responsive" style={{height:'295px'}} src={Movie.poster_path && `${IMAGE_URL}w500${Movie.poster_path}`} />
                    </div>
                    </div>
                    <table class="col table table-hover table-responsive-xs">
                        <tbody>
                        <tr>
                            <td className="font-weight-bolder">Title</td>
                            <td className="">{Movie.title}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bolder">Release Date</td>
                            <td className="">{Movie.release_date}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bolder">Revenue</td>
                            <td className="">${Movie.revenue}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bolder">Runtime</td>
                            <td className="">{Movie.runtime} Minutes</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bolder">Rating</td>
                            <td><div className="fa fa-imdb fa-lg"></div> {Movie.vote_average}/10 ({Movie.vote_count} Votes)</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bolder">Status</td>
                            <td className="">{Movie.status}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {/* actor button */}
                <div className="text-center mt-2">
                    <button className="btn btn-primary" onClick={handleClick}> View Actors</button>
                </div>

                {/* actors grid */}
                {ActorToggle &&
                <Row>
                    {Crews && Crews.map((crew, index) => (
                        <React.Fragment key={index}>
                            {crew.profile_path &&
                            <GridCard 
                                actor={crew.name} character={crew.character} image={`${IMAGE_URL}original${crew.profile_path}`}
                            />}
                        </React.Fragment>
                    ))}
                </Row>}
            </div>
        </>
    )
}

export default MovieDetail;