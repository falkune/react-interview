import React from 'react'
import Card from './components/Card'
import Select from "./components/Select";
import { movies$ } from './Movies/movies';
import './App.css'

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      movies: [],
      categories: [],
      paginationStart: 0,
      paginationEnd: 4
    };
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentDidMount () {
    movies$.then(data => {
      this.setState({
        movies: data,
        categories: [...new Set(data.map(entry=>entry.category)).values()]
      })
    })
  }

  deleteHandler (id) {
    this.setState({
      movies: this.state.movies.filter(movie => movie.id !== id),
    },()=>{
      this.state.categories = [...new Set(this.state.movies.map(entry=>entry.category)).values()]
    });
  }

  navigateToPrev = () => {
    if(this.state.paginationStart > 0){
      this.setState({
        paginationStart: this.state.paginationStart -4,
        paginationEnd: this.state.paginationEnd -4
      })
    }
  }

  navigateToNext = () => {
    if(this.state.paginationEnd < this.state.movies.length){
      this.setState({
        paginationStart: this.state.paginationStart +4,
        paginationEnd: this.state.paginationEnd +4
      })
    }
  }

  render () {
    const { movies, paginationStart, paginationEnd } = this.state;
    return (
      <div className='container'>
        <div id="select">
          <Select categories={this.state.categories} ></Select>
        </div>
        <div className='row  flex-container'>
          {movies.slice(paginationStart, paginationEnd).map(movie => {
            return (
              <Card
                onDelete={this.deleteHandler}
                key={movie.id}
                {...movie}
              />
            )
          })}
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={this.navigateToPrev}>précédent</button>
          <button className="btn btn-primary" onClick={this.navigateToNext}>suivant</button>
        </div>
      </div>
    )
  }
}

export default App
