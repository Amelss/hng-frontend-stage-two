/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import axios from 'axios'

export default function Card() {
  const [movieData, setMovieData] = useState([]);

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular",
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzcyZWUwZDRlYzAyZWVmNDNkY2UzNjBmN2I4NDllYyIsInN1YiI6IjY0ZmVmYmVkNmEyMjI3MDBjM2I1NTA4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IX4vZfe67rCcFewb07NpXRc7CVIE8o56Oj8xnQAm1nA",
    },
  };

  const getMovie = async () => {
    await axios
        .request(options)
        .then(function (res) {
           
        setMovieData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMovie();
  }, []);

//     const handleClick = (e) => {
//         e.preventDefault()
//         getMovie()
//   } 
    
    
    return (
      <div>
        <div className="flex justify-between items-center p-3">
          <h1 className="text-3xl font-bold tracking-wide md:mt-10">Featured Movie</h1>
          <div className="flex items-center">
            <h4 className="text-movieRed md:text-lg">See more</h4>
            <img src="./src/assets/chevron-right.png" alt="chevron right" className="w-4" />
          </div>
          
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 pt-10  px-3">
          {movieData.map((movie, index) => (
            <div key={index}>
              <div className="card " data-testid="movie-card">
                <img
                  src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="Movie Poster"
                  className="w-full"
                  data-testid="movie-poster"
                />
                <h4
                  className="text-xs text-gray-400 mt-2 font-bold"
                  data-testid="movie-release-date"
                >
                  USA, {movie.release_date}
                </h4>
                <h1 className="font-bold mt-2" data-testid="movie-title">
                  {movie.title}
                </h1>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <img
                      src="./src/assets/imdb.png"
                      alt="imdb logo"
                      className="w-6"
                    />
                    <p className="text-xs ml-2">
                      {movie.vote_average * 10} / 100
                    </p>
                  </div>

                  <div className="flex items-center">
                    <img
                      src="./src/assets/tomato.png"
                      alt="rotten tomatoes logo"
                      className="w-4"
                    />
                    <p className="text-xs ml-2 ">{movie.vote_average * 10}%</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
