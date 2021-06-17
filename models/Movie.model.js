class Movie {
  constructor(title, overview, average_votes, total_votes, imag_urle, popularity, releaseDate) {
    this.title = title;
    this.overview = overview;
    this.vote_average = average_votes;
    this.vote_count = total_votes;
    this.poster_path = imag_urle;
    this.popularity = popularity;
    this.release_date = releaseDate;
  }
}

module.exports = Movie;
