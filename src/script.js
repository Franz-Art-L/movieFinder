class MovieFinder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: "",
            results: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.setState({ searchTerm: event.target.value });
    }

    handleChange(event) {
        event.preventDefault();
    }

    render() {
        const { searchTerm, results } = this.state;

        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={this.handleSubmit} className="form-inline my-4">
                            <input type="text" onChange={this.handleChange} className="form-control mr-sm-2" placeholder="Frozen" value={searchTerm} />
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </form>
                        {results.map(movie => {
                            return null;
                        })}
                    </div>
                </div>
            </div>
        )
    }
};

const Footer = () => {
  return(
      <div className="py-2 my-4 text-center">
           <span>ReactJs practice by:</span>
           <p><a href="https://confident-murdock-8e5bba.netlify.app/" target="_blank" rel="noopener noreferrer">Francis Artemio Landia</a><br />2022</p>
      </div>
  );
};

ReactDOM.render(<MovieFinder/>, document.getElementById('root'));
ReactDOM.render(<Footer/>, document.getElementById('footer'));