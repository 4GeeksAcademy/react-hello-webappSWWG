import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { EntityCard } from "../components/EntityCard.jsx";
export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const baseURL = store.baseURL || "https://www.swapi.tech/api/";


const[selectedId, setSelectedID] = useState(null);

  const getPeople = () => {
    fetch(baseURL + "people")
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: "set-people",   
          payload: data.results
        });
      })
      .catch(err => console.error("Fetch error:", err));
  };

  useEffect(() => {
    getPeople();
  }, []);


  return (
    <div className="text-center mt-5">
      <h1>List of Characters: </h1>
      {store.people?.map((person) => 
      {
      //  person.uid


      // 1) save the person's ID inside of home.jsx using useState and onClick 
      // 2) pass the ID from the useState to Entity Card using props
      // 3) make getInfo() fetch inside of EntityCard.jsx dyanmic using the prop
        return(
        <div key={person.uid}>
          <p>{person.name}</p>
           <button onClick={() => setSelectedId(person.uid)}>View Details</button>
        </div>
        )}
      )}

      {selectedId && <EntityCard personId={selectedId} />}
    </div>
  );
};



