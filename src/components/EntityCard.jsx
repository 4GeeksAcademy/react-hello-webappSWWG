import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const EntityCard = ({personId}) => {
  const { store, dispatch } = useGlobalReducer();
  const baseURL = store.baseURL || "https://www.swapi.tech/api/";
  //url to get info https://www.swapi.tech/api/people/5
  

const getInfo =()=>{
  if (!personId) return;
      fetch(baseURL+"people/"+ personId)
      .then(res=>res.json())
      .then(data=> {
          dispatch({
            type:"set-info",
            payload:data.result.properties
          });
      })
      .catch(err => console.error("Fetch error:", err));
};

useEffect(()=>{
    getInfo();

},[personId]);

if (!store.info) return <p>Loading...</p>;

  return (
    <div className="card h-100">
      <h1>Info about Character:</h1>
      <p>{nombre}'s eyes are {store.info.eye_color}</p>
      <p>Height: {store.info.height}</p>
      <p>Mass: {store.info.mass}</p>
      <p>Hair Color: {store.info.hair_color}</p>
    </div>
  );
};


  // useEffect(() => {
  //   getPeople();
  // }, []);

  // const getPeople = () => {
  //   fetch(baseURL + "people")
  //     .then(res => res.json())
  //     .then(data => {
  //       dispatch({
  //         type: "set-people",   
  //         payload: data.results
  //       });
  //     })
  //     .catch(err => console.error("Fetch error:", err));
  // };


