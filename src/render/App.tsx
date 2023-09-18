import React from "react"
import {Counter} from "./features/counter/Counter";
import { useGetPokemonByNameQuery } from './services/pokemon'

export const App = () => {

    const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')

    return <>
        <Counter/>
        {error ? (
            <>Oh no, there was an error</>
        ) : isLoading ? (
            <>Loading...</>
        ) : data ? (
            <>
                <h3>{data.species.name}</h3>
                <img src={data.sprites.front_shiny} alt={data.species.name} />
            </>
        ) : null}
    </>
}