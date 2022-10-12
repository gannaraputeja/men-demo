
import React, { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"
import Axios from "axios"
import CreateNewForm from "./components/CreateNewForm"
import AnimalCard from "./components/AnimalCard"

const App = () => {
    //const animals = [{name: "Meowsalot", species: "Cat"}, {name: "Barksalot", species: "Dog"}, {name: "Purrsalot", species: "Cat"}];
    const [animals, setAnimals] = useState([]);

     // 1st arg is callback, 2nd arg is things we watch for changes, upon change callback is invoked, when emtpy react renders only 1st time.
    useEffect(() => {
        const fetchData = async () => {
            const response = await Axios.get("/api/animals");
            setAnimals(response.data);
        }
        fetchData();
    }, []);

    return (
        <div className="container">
            <p><a href="/">&laquo; Back to public homepage</a></p>
            <CreateNewForm setAnimals={setAnimals}/>
            <div className="animal-grid">
                {animals.map(animal => {
                    return <AnimalCard key={animal._id} name={animal.name} species={animal.species} photo={animal.photo} id={animal._id} setAnimals={setAnimals} />;
                })}
            </div>
        </div>
    )
}

/*
const AnimalCard = (props) => {
    return <p>Hi, my name is {props.name} and I am a {props.species}</p>
}
*/

const root = createRoot(document.querySelector("#app"));
root.render(<App />)


