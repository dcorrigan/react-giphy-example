var SearchBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    handleQueryChange: function(e) {
        this.setState({query: e.target.value});
    },
    constructSearch: function() {
        return this.props.url + '?q=' + this.state.query + '&limit=3' + '&api_key=' + this.props.api;
    },
    updateSearchData: function() {
        var search = this.constructSearch();
        $.ajax({
            url: search,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                this.setState({data: data.data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(search, status, err.toString());
            }.bind(this),
        });
    },
    handleSubmit: function(e) {
        e.preventDefault();
        if (!this.state.query) {
            return;
        }
        this.updateSearchData();
    },
    render: function() {
        return (
            <div className="SearchDiv">
                <form className="searchBox" onSubmit={this.handleSubmit}>
                    <input 
                    className="u-full-width" 
                    type="text" 
                    placeholder="type a query"
                    onChange={this.handleQueryChange}
                    />
                    <input type="submit" value="Find" />
                </form>
                <ResultsList data={this.state.data} />
            </div>
        );
    }
});

var ResultsList = React.createClass({
    render: function() {
        var resultNodes = this.props.data.map(function(res) {
          return (
            <Result url={res.embed_url} key={res.id}/>
          );
        });
        return (
            <ul className="resultsList">
            {resultNodes}
            </ul>
        );
    }
})

var Result = React.createClass({
    render: function() {
        var url = this.props.url;
        return (
            <li className="result">
                <iframe src={url} height="200" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
            </li>
        );
    }
});

ReactDOM.render(
    <SearchBox 
        url="http://api.giphy.com/v1/gifs/search" api="dc6zaTOxFJmzC" />,
    document.getElementById('search')
);
