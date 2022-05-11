class MovieFinder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            results: [],
            error: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
    }

    handleChange(event) {
        this.setState({ searchTerm: event.target.value});
    };

    submitHandle(event) {
        event.preventDefault();
        let {searchTerm, results, error} = this.state;
        searchTerm = searchTerm.trim();
        if(!searchTerm) {
            // to check if the searchTerm on the state is empty, if its empty this condition will trigger and will have an early return.
            return;
        }

        fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=cb585ed6`)
        .then(checkResponse).then(json).then(data => {
            console.log(data);
            if(data.Response === "False") {
                throw new Error(data.Error);
            }
            if(data.Response === 'True' && data.Search) {
                this.setState({results: data.Search, error: "",});
            }
        }).catch(error => {
            this.setState({error: error.message})
            console.log(error);
        })
    };

    render() {
        const {searchTerm, results, error} = this.state;

        return(
            <div className="container">
                <div className="row overflow">
                    <div className="col-12 col-sm-6">
                        <div className="mx-auto" style={{width: '200px'}}>
                            <form className="my-5" onSubmit={this.submitHandle}>
                                        <p>Results with</p>
                                            <input className="form-control mr-sm-2" placeholder="Movie Title" type="text" value={searchTerm} onChange={this.handleChange} />
                                            <button type="submit" className="btn btn-success">Search Movie</button>
                            </form>
                        </div>
                            {( () => {
                                if(error) {
                                    return error;
                                }

                                return results.map(movie => {
                                    return <Movie key={movie.imdbID} movie={movie}/>
                                })
                            }

                            ) ()}

                    </div>
                </div>
            </div>
        )
    }
}

const checkResponse = response => {
    if(response.ok) {
        return response;
    }
    
    throw new Error('Error is either 404 or 500');
};

const json = response => response.json();

const Movie = props => {
    const {Title, Year, imdbID, Type, Poster} = props.movie;

    return(
        <div className="row">
            <div className="col-12 col-sm-6">
                <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank">
                    <img src={Poster} className="img-fluid"/>
                </a>
            </div>

            <div className="row">
                <a href={`https://www.imdb.com/title/${imdbID}/`}>
                    <h3 className="text-center">{Title}</h3>
                    <p>Type: {Type} | Year: {Year}</p>
                </a>
            </div>
           <hr />
        </div>
    )
}

const Footer = () => {
  return(
      <div className="py-2 my-4 text-center">
           <hr/>
           <span style={{color: 'white'}}>Built by:</span>
           <p><a href="https://confident-murdock-8e5bba.netlify.app/" target="_blank" rel="noopener noreferrer">Francis Artemio Landia</a><br/>2022</p>

           <p style={{position: 'relative'}}>Movie API powered by <a href="https://omdbapi.com/" target="_blank"
      rel="noopener noreferrer"> www.omdbapi.com</a></p>
      </div>
  );
};

const Navbar = () => {
    return (
        <nav className="navbar navbar-light fixed-top">
            <a className="navbar-brand" href="#">Ishoboy Movie Finder🎥</a>
        </nav>
    );
};

const Template = props => {
    return (
    <React.Fragment>
        <Navbar/>
            <div className="container py-4">
                <div className="row">
                        <div className="col-12 col-md-9">
                            <MovieFinder/>
                                {props.children}
                        </div>
                </div>
            </div>
        <Footer/>       
    </React.Fragment>
    )
}

ReactDOM.render(<Template/>, document.getElementById('root'));