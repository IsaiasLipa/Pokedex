import React, { Component } from 'react'
import axios from 'axios'
import { RouteComponentProps } from 'react-router-dom';
import { Set } from 'typescript';

type MyState = {
    name: string
    pokemonIndex: string 
    imageUrl: string 
    types: string[]
    description : string 
    stats: {
        hp: number
        attack: number
        defense: number 
        speed: number 
        specialAttack: number 
        specialDefense: number 
    }
    height: number 
    weight: number 
    eggGroup: string 
    abilities: Array<any> 
    genderRatioMale: string 
    genderRatioFemale: string 
    evs: string 
    hatchSteps: string 
}

interface MyProps extends RouteComponentProps<{pokemonIndex : string}>{


}

export default class Pokemom extends Component <MyProps,MyState>{

    state: MyState={

    name: "",
    pokemonIndex: "", 
    imageUrl:"", 
    types :[],
    description:"", 
    stats: {
        hp: 0,
        attack:0,
        defense:0, 
        speed: 0,
        specialAttack: 0, 
        specialDefense: 0, 
    },
    height: 0,
    weight: 0, 
    eggGroup: "", 
    abilities: [], 
    genderRatioMale: "", 
    genderRatioFemale: "", 
    evs: "",
    hatchSteps: "" 

    }

    async componentDidMount() {
        const{pokemonIndex} = this.props.match.params

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`

        const pokemonRes = await axios.get(pokemonUrl)
        const pokemonstats: Array<any> = pokemonRes.data.stats
        const pokemontypes: Array<any> = pokemonRes.data.types
        const pokemonabilites: Array<any> = pokemonRes.data.abilities;
        let hp:number = 0
        let attack:number= 0
        let defense:number= 0
        let speed:number= 0
        let specialAttack:number= 0
        let specialDefense: number= 0

        pokemonstats.map(stat => {
            switch(stat.stat.name){
                case "hp":
                    hp = stat['base_stat']
                    break;
                case "attack":
                    attack = stat['base_stat']
                    break;
                case "defense":
                    defense = stat['base_stat']
                    break;
                case "speed":
                    speed = stat['base_stat']
                    break;
                case "special-attack":
                    specialAttack = stat['base_stat']
                    break;
                case "special-defense":
                    specialDefense = stat['base_stat']
                    break;
            }
        })

        const height: number = Math.round((pokemonRes.data.height *0.328084 + 0.0001)*100)/100;
        const weight: number = Math.round((pokemonRes.data.height *0.220462 + 0.0001)*100)/100;
        
        const types = pokemontypes.map(type => type.type.name);

        const abilities = pokemonabilites.map(ability => {
            return ability.ability.name;
        });

        const eves = pokemonstats.filter(stat => {
            if (stat.effort > 0) {
                return true;
            } else{
                return false;
            }
        }).map(stat => {
            return  `${stat.effort} ${stat.stat.name}`
        })
        .join(" , ");

        let pokemon_species = await axios.get(pokemonSpeciesUrl)

        
        // let flavor_text_entries: Array<any> = pokemon_species.data.flavor_text_extries
        // const decription = flavor_text_entries.map(flavor => {
        //     if (flavor.language.name === 'en'){
        //         return flavor.flavor_text;
                
        //     }
        // })
        

        this.setState({
            name: pokemonRes.data.name,
            pokemonIndex: pokemonIndex, 
            imageUrl:pokemonRes.data.sprites.front_default, 
            types :types,
            description:"", 
            stats: {
                hp: hp,
                attack:attack,
                defense:defense, 
                speed: speed,
                specialAttack: specialAttack, 
                specialDefense: specialDefense, 
            },
            height: height,
            weight: weight, 
            eggGroup: "", 
            abilities: abilities, 
            genderRatioMale: "", 
            genderRatioFemale: "", 
            evs: eves,
            hatchSteps: "" 
        })

    }
    render() {
        return (
            <div className="col">
                <div className="card"> 
                    <div className="card-header">
                        <div className="row"> 
                            <div className="col-5"> 
                                <h5> 
                                    {this.state.pokemonIndex}
                                </h5>
                            </div>
                            <div className="col-7">
                                <div className="float-right">
                                    Type:
                                    {this.state.types.map(type => (
                                        <span key={type} className="badge badge-pill badge-dark text-dark">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body bg-light">
                        <div className="row align-items-center">
                            <div className="col-md-3">
                                <img src= {this.state.imageUrl} className="card-img-top rounded mx-auto mt-2"></img>
                            </div>
                            <div className="col-md-9">
                                <h4 className="mx-auto text-capitalize">
                                    {this.state.name}
                                </h4>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3"> HP</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress-bar" role="progressbar" style={{width: `${this.state.stats.hp}%`}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                            <small>{this.state.stats.hp}</small>
                                        </div>    
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3"> Attack</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress-bar" role="progressbar" style={{width: `${this.state.stats.attack}%`}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                            <small>{this.state.stats.attack}</small>
                                        </div>    
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3"> Defense</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress-bar" role="progressbar" style={{width: `${this.state.stats.defense}%`}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                            <small>{this.state.stats.defense}</small>
                                        </div>    
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3"> Speed</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress-bar" role="progressbar" style={{width: `${this.state.stats.speed}%`}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                            <small>{this.state.stats.speed}</small>
                                        </div>    
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3"> Special Attack</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress-bar" role="progressbar" style={{width: `${this.state.stats.specialAttack}%`}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                            <small>{this.state.stats.specialAttack}</small>
                                        </div>    
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 col-md-3"> Special Defense</div>
                                    <div className="col-12 col-md-9">
                                        <div className="progress-bar" role="progressbar" style={{width: `${this.state.stats.specialDefense}%`}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                            <small>{this.state.stats.specialDefense}</small>
                                        </div>    
                                    </div>
                                </div>
                            </div>

                            {/* <div className="row mt-1"> TODO 
                                <div className="col">
                                    <p>{this.state.description}</p>
                                </div>
                            </div> */}

                            <div className="card-body">
                                <h5 className="card-title text-center"> Profile </h5>
                                <div className= "row">
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h6 className="float-right"> Height:</h6>
                                            </div>
                                            <div className="col-md-6"> 
                                                <h6 className="float-left">
                                                {this.state.height}ft.
                                                </h6>
                                            </div> 
                                            <div className="col-md-6">
                                                <h6 className="float-right"> Weight:</h6>
                                            </div>
                                            <div className="col-md-6"> 
                                                <h6 className="float-left">
                                                {this.state.weight}ft.
                                                </h6>
                                            </div> 
                                            
                                                <div className="col-md-6">
                                                    <h6 className="float-right"> Abilities:</h6>
                                                </div>
                                                <div className="col-md-6"> 
                                                    <h6 className="float-left">
                                                    {this.state.abilities}
                                                    </h6>
                                                </div> 
                                            
                                            
                                                <div className="col-md-6">
                                                    <h6 className="float-right"> EVs:</h6>
                                                </div>
                                                <div className="col-md-6"> 
                                                    <h6 className="float-left text-capitalize">
                                                    {this.state.evs}
                                                    </h6>
                                                </div> 
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    
                
            </div>
        )
    }
}
