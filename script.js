var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovieFinder = function (_React$Component) {
    _inherits(MovieFinder, _React$Component);

    function MovieFinder(props) {
        _classCallCheck(this, MovieFinder);

        var _this = _possibleConstructorReturn(this, (MovieFinder.__proto__ || Object.getPrototypeOf(MovieFinder)).call(this, props));

        _this.state = {
            searchTerm: '',
            results: [],
            error: ""
        };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.submitHandle = _this.submitHandle.bind(_this);
        return _this;
    }

    _createClass(MovieFinder, [{
        key: "handleChange",
        value: function handleChange(event) {
            this.setState({ searchTerm: event.target.value });
        }
    }, {
        key: "submitHandle",
        value: function submitHandle(event) {
            var _this2 = this;

            event.preventDefault();
            var _state = this.state,
                searchTerm = _state.searchTerm,
                results = _state.results,
                error = _state.error;

            searchTerm = searchTerm.trim();
            if (!searchTerm) {
                // to check if the searchTerm on the state is empty, if its empty this condition will trigger and will have an early return.
                return;
            }

            fetch("https://www.omdbapi.com/?s=" + searchTerm + "&apikey=cb585ed6").then(checkResponse).then(json).then(function (data) {
                console.log(data);
                if (data.Response === "False") {
                    throw new Error(data.Error);
                }
                if (data.Response === 'True' && data.Search) {
                    _this2.setState({ results: data.Search, error: "" });
                }
            }).catch(function (error) {
                _this2.setState({ error: error.message });
                console.log(error);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state2 = this.state,
                searchTerm = _state2.searchTerm,
                results = _state2.results,
                error = _state2.error;


            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "row overflow" },
                    React.createElement(
                        "div",
                        { className: "col-12 col-sm-6" },
                        React.createElement(
                            "div",
                            { className: "mx-auto", style: { width: '200px' } },
                            React.createElement(
                                "form",
                                { className: "my-5", onSubmit: this.submitHandle },
                                React.createElement(
                                    "p",
                                    null,
                                    "Results with"
                                ),
                                React.createElement("input", { className: "form-control mr-sm-2", placeholder: "Movie Title", type: "text", value: searchTerm, onChange: this.handleChange }),
                                React.createElement(
                                    "button",
                                    { type: "submit", className: "btn btn-success" },
                                    "Search Movie"
                                )
                            )
                        ),
                        function () {
                            if (error) {
                                return error;
                            }

                            return results.map(function (movie) {
                                return React.createElement(Movie, { key: movie.imdbID, movie: movie });
                            });
                        }()
                    )
                )
            );
        }
    }]);

    return MovieFinder;
}(React.Component);

var checkResponse = function checkResponse(response) {
    if (response.ok) {
        return response;
    }

    throw new Error('Error is either 404 or 500');
};

var json = function json(response) {
    return response.json();
};

var Movie = function Movie(props) {
    var _props$movie = props.movie,
        Title = _props$movie.Title,
        Year = _props$movie.Year,
        imdbID = _props$movie.imdbID,
        Type = _props$movie.Type,
        Poster = _props$movie.Poster;


    return React.createElement(
        "div",
        { className: "row" },
        React.createElement(
            "div",
            { className: "col-12 col-sm-6" },
            React.createElement(
                "a",
                { href: "https://www.imdb.com/title/" + imdbID + "/", target: "_blank" },
                React.createElement("img", { src: Poster, className: "img-fluid" })
            )
        ),
        React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "a",
                { href: "https://www.imdb.com/title/" + imdbID + "/" },
                React.createElement(
                    "h3",
                    { className: "text-center" },
                    Title
                ),
                React.createElement(
                    "p",
                    null,
                    "Type: ",
                    Type,
                    " | Year: ",
                    Year
                )
            )
        ),
        React.createElement("hr", null)
    );
};

var Footer = function Footer() {
    return React.createElement(
        "div",
        { className: "py-2 my-4 text-center" },
        React.createElement("hr", null),
        React.createElement(
            "span",
            { style: { color: 'white' } },
            "Built by:"
        ),
        React.createElement(
            "p",
            null,
            React.createElement(
                "a",
                { href: "https://confident-murdock-8e5bba.netlify.app/", target: "_blank", rel: "noopener noreferrer" },
                "Francis Artemio Landia"
            ),
            React.createElement("br", null),
            "2022"
        ),
        React.createElement(
            "p",
            { style: { position: 'relative' } },
            "Movie API powered by ",
            React.createElement(
                "a",
                { href: "https://omdbapi.com/", target: "_blank",
                    rel: "noopener noreferrer" },
                " www.omdbapi.com"
            )
        )
    );
};

var Navbar = function Navbar() {
    return React.createElement(
        "nav",
        { className: "navbar navbar-light fixed-top" },
        React.createElement(
            "a",
            { className: "navbar-brand", href: "#" },
            "Ishoboy Movie Finder\uD83C\uDFA5"
        )
    );
};

var Template = function Template(props) {
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(Navbar, null),
        React.createElement(
            "div",
            { className: "container py-4" },
            React.createElement(
                "div",
                { className: "row" },
                React.createElement(
                    "div",
                    { className: "col-12 col-md-9" },
                    React.createElement(MovieFinder, null),
                    props.children
                )
            )
        ),
        React.createElement(Footer, null)
    );
};

ReactDOM.render(React.createElement(Template, null), document.getElementById('root'));