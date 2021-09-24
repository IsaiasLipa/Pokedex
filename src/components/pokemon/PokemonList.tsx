import React, { Component } from 'react'
import PokemonInfo from './PokemonInfo'
import axios from 'axios'
import { stringify } from 'querystring'

type MyState = {
    url: string 
    pokemon:{
        name: string 
        url: string
    }[] | null
}
type MyProps={
    
}

export default class PokemonList extends Component <MyProps,MyState>{
    state: MyState={
        url: 'https://pokeapi.co/api/v2/pokemon/?limit=1118',
        pokemon: null
    }
    


async componentDidMount(){
    const res = await axios.get(this.state.url)
    this.setState({pokemon: res.data['results'] })
}

    render() {
        return (
            
            <React.Fragment>
                {this.state.pokemon ? (
                    <div className="row">
                        {this.state.pokemon.map(pokemon => (
                            <PokemonInfo
                                key={pokemon.name}
                                name={pokemon.name}
                                url={pokemon.url}
                            />
                        ))}
                    </div>
                ): (
                    <h1>Loading PokeInfo</h1>
                )}
            </React.Fragment>
        )
    }
}
