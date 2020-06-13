import React from 'react'
import DeleteBtn from './Button';

class Card extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      likes: props.likes,
      dislikes: props.dislikes,
      liked: false,
      disliked: false
    }
  }

  like(){
    if(this.state.liked === false && this.state.disliked === false){
      this.setState(prev=>{
        return {
          likes: prev.likes + 1,
          liked: true
        }
      })
    }
    if(this.state.liked === false && this.state.disliked === true){
      this.setState(prev=>{
        return {
          likes: prev.likes + 1,
          dislikes: prev.dislikes - 1,
          liked: true,
          disliked: false
        }
      })
    }
  }
  dislike() {
    if(this.state.disliked === false && this.state.liked === false){
      this.setState(prev=>{
        return {
          dislikes: prev.dislikes + 1,
          disliked: true
        }
      })
    }
    if(this.state.disliked === false && this.state.liked === true){
      this.setState(prev=>{
        return {
          likes: prev.likes - 1,
          dislikes: prev.dislikes + 1,
          liked: false,
          disliked: true
        }
      })
    }
  }

  render () {
    return (
      <div className='col-sm-10 col-md-5 col-lg-6' id="item">
        <div className='card'>
          <DeleteBtn class="btn btn--delete" click={this.props.onDelete.bind(this,this.props.id)}>✗</DeleteBtn>
          <h1 className='card__title'>{this.props.title}</h1>
          <p className="card__subtitle" >
            {this.props.category}
          </p>

          <div className='card__footer'>
            <div>
              <span className="like" onClick={this.like.bind(this)}><i className="far fa-thumbs-up"></i></span> {this.state.likes} Likes
            </div>
            <div>
              <span className="dislike" onClick={this.dislike.bind(this)}><i className="far fa-thumbs-down"></i></span> {this.state.dislikes} Dislikes
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card
