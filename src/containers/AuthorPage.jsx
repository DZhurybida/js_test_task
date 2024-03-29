'use strict';

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {loadAuthors, loadBooks} from '../actions';
import BookCard from './../components/BookCard.jsx'

class AuthorPage extends Component {

    componentWillMount(){
      this.setState({
        booksLoaded:false,
        authorsLoaded: false
      });  
      this.props.loadBooks();  
      this.props.loadAuthors();
    }
  
    componentWillReceiveProps (nextProps){
      let result = {}
      if(nextProps.books)
        result = {booksLoaded: true};
      else
        result = {booksLoaded: false};
      
      if(nextProps.authors)
        result = Object.assign({}, result, {authorsLoaded: true});
      else
        result = Object.assign({}, result, {authorsLoaded: false});
      
      this.setState(result);
    }

    render() {
        const { authors, books } = this.props
        const { author_id } = this.props.params;
        const {authorsLoaded, booksLoaded} = this.state;
        let author = {};
        let Books;
        if(authorsLoaded && booksLoaded){
          author= authors.find( author => +author.id === +author_id);
          Books = author.books.map( book => {
            let book_id = book.id;
            book = books.find((book) => +book.id === +book_id)
            return (<BookCard key={book.id} data={book}/>);
          });
        }
        return (
            <div>
                 <h1>{author.name}</h1>
                 <br/>
                 <p>{author.biography}</p>
                 <br/>
                   <div className="mdl-grid">
                   {Books}
                </div>
            </div>
        );
    }
}


AuthorPage.propTypes = {
  authors: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  return {
    authors: state.authors,
    books: state.books
  }
}

export default connect(
  mapStateToProps,
  {loadAuthors, loadBooks}
)(AuthorPage)


