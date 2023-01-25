import React, { Component } from 'react'
// import { movies } from './getmovies'
import axios from 'axios'

export default class Movies extends Component {

    constructor(){
        super();
        this.state={
            hover : '',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }

    async componentDidMount(){
        //side effects
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5d9e83e0ec9df654c0a8c9699910552a&language=en-US&page=${this.state.currPage}`);
        let data = res.data ;
        // console.log(data);
        this.setState({
            movies:[...data.results]
        })
        console.log('mounting done');
    }
    
    changeMovies = async()=>{
        console.log('Change Movies called');
        console.log(this.state.currPage);
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5d9e83e0ec9df654c0a8c9699910552a&language=en-US&page=${this.state.currPage}`);
        let data = res.data ;
        // console.log(data);
        this.setState({
            movies:[...data.results]
        })
    }

    handleRight =()=>{
       let temparr=[]
       for(let i=1 ;i<=this.state.parr.length+1 ; i++){
        temparr.push(i);
       }
       
       this.setState({
        parr:[...temparr],
        currPage: this.state.currPage+1 
       },this.changeMovies)
    }

    handleleft= ()=>{
        if(this.state.currPage!==1){
            this.setState({
                currPage : this.state.currPage-1 
            },this.changeMovies)

        }
    }

    handleclick=(value)=>{
          if(value!==this.state.currPage){
            this.setState({
                currPage:value
            },this.changeMovies)
          }
    }
    
    handleFavourites=(movie)=>{
          let oldData = JSON.parse(localStorage.getItem('movies-app') ||  "[]")
          if(this.state.favourites.includes(movie.id)){
               oldData  = oldData.filter((m)=>m.id!=movie.id);
          }
          else{
            oldData.push(movie);
          }

          // DATA in localbase is tored as a string

          localStorage.setItem("movies-app",JSON.stringify(oldData));
          // SET ITEM IS synchronus

          console.log(oldData);
          this.handleFavouritesStates();
    }
    handleFavouritesStates=()=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp]
        })

    }

    render() {
        // console.log('render');
        // let movie = movies.results;
        return (

            <>
                {
                    this.state.movies.length === 0 ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <div>
                            <h3 className='text-center'>Trending</h3>
                            <div className="movies-list">
                                {
                                    this.state.movies.map((movieobj) => (
                                        <div className="card movies-card" onMouseEnter={()=>this.setState({hover: movieobj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                                            <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} className="card-img-top movies-img" alt={movieobj.title} />
                                            {/* <div className="card-body"> */}
                                            <h5 className="card-title movies-title">{movieobj.original_title}</h5>
                                            {/* <p className="card-text movies-text">{movieobj.overview}</p> */}
                                            <div className="button-wrapper" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                                                {
                                                    this.state.hover === movieobj.id &&
                                                    <a className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieobj)}> 
                                                    {this.state.favourites.includes(movieobj.id)?"Remove from favourites":"Add to favourites"}</a>
                                                }
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            {/* pagination */}
                            <div style ={{display:'flex',justifyContent:'center', alignItems:'center', cursor:'pointer'}}>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">

                                     <li class="page-item"><a class="page-link " onClick={this.handleleft}>Previous</a></li>

                                     {
                                        this.state.parr.map((value)=>(

                                            <li class="page-item"><a class="page-link " onClick={()=>this.handleclick(value)} >{value}</a></li>
                                        ))
                                     }

                                     <li class="page-item"><a class="page-link " onClick={this.handleRight} >Next</a></li>

                                   </ul>
                                </nav>
                            </div>

                        </div>

                }
            </>

        )
    }
}
