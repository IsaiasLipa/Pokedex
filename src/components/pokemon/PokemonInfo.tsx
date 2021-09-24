import React, { Component } from 'react'
import {Link} from 'react-router-dom'


type MyState ={
    name: string
    url: string
    pokemonIndex: string
}

type MyProps = {
    key: string 
    name: string 
    url: string 
}
export default class PokemonInfo extends Component <MyProps,MyState>{

    state: MyState={
        name: this.props.name,
        url: this.props.url,
        pokemonIndex: this.props.url.split('/')[this.props.url.split('/').length -2]
    }

    render() {
        
        return (
            <div className= 'col-md-3 col-sm-6 mb-5'>
                
                <div className="card">
                <Link to={`pokemon/${this.state.pokemonIndex}`}> 
                    <div className="card-header">
                        <h1>{this.state.name}</h1>
                        <a>{this.state.pokemonIndex}</a>
                        
                    </div>
                </Link>  
                </div>
                
            </div>
            
        )
    }
}
