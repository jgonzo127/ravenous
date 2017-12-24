import React from 'react';
import './searchBar.css';

const sortByOptions = {
    "Best Match" : 'best_match',
    "Highest Rated" : 'rating',
    "Most Reviewed" : 'review_count'
};

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            term : '',
            location: '',
            sortBy: 'best_match'
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    getSortByClass = (sortByOption) => {
        return ( this.state.sortBy === sortByOption ) ? 'active' : '';
    }
    
    handleSortByChange = (sortByOption) => {
        this.setState({
            sortBy : sortByOption
        });
    }

    handleTermChange = (event) => {
        this.setState({
            term: event.target.value
        });
    }

    handleLocationChange = (event) => {
        this.setState({
            location: event.target.value
        });
    }

    renderSortByOptions() {
        return Object.keys( sortByOptions ).map(option => {
            let sortByOptionValue = sortByOptions[option];
            return <li key={sortByOptionValue} keyname={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind( this, sortByOptionValue)}>{option}</li>;
        });
    }

    handleSearch(event) {
        this.props.searchYelp(this.state.term,this.state.location,this.state.sortBy);
        event.preventDefault();
    }

    handleSubmit(event) {
        if( event.key === 'Enter' && this.state.term !== '' && this.state.location !== '' ) {
            this.props.searchYelp(this.state.term,this.state.location,this.state.sortBy);
        }
    }

    render() {
        return(
            <div className="SearchBar">
            <div className="SearchBar-sort-options">
              <ul>
                {this.renderSortByOptions()}
              </ul>
            </div>
            <div className="SearchBar-fields">
              <input onKeyPress={this.handleSubmit} placeholder="Search Businesses" onChange={this.handleTermChange}/>
              <input onKeyPress={this.handleSubmit} placeholder="Where?" onChange={this.handleLocationChange} />
            </div>
            <div className="SearchBar-submit">
              <a className={( '' === this.state.term || '' === this.state.location ) ? 'disabled' : ''} onClick={this.handleSearch}>Let's Go</a>
            </div>
          </div>
        );
    }
}

export default SearchBar;