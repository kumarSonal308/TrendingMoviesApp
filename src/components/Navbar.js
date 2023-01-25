import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class banner extends Component {
    render() {
        return (
            <div style ={{display :'flex',padding:'0.5',marginLeft:'3rem',alignItems:'center'}}>
               <Link to = "/" style ={{textDecoration:'none'}}> <h1 style={{marginTop:'1.3rem', color:'#3f51b5'}}>Movies App</h1></Link>
               <Link to = "/favourites" style={{textDecoration:'none'}}><h2 style = {{marginLeft:'3rem', marginTop:'1.5rem', color:'#3f51b5'}}>Favourites</h2></Link>
               
            </div>
        )
    }
}
