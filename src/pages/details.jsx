import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const folderMap = {
  people: "characters",
  planets: "planets",
  vehicles: "vehicles"
};

export const Details = () => {
  const { type, uid } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/${type}/${uid}`)
      .then(res => res.json())
      .then(data => setDetails(data.result))
      .catch(err => console.error("Error fetching details:", err));
  }, [type, uid]);

  if (!details) return <p className="text-center mt-5">Loading...</p>;

  const imageUrl = `https://starwars-visualguide.com/assets/img/${folderMap[type]}/${uid}.jpg`;

  return (
    <div className="container mt-5">
      <div className="card">
        <img
          src={imageUrl}
          className="card-img-top"
          alt={details.properties.name}
          onError={(e) =>
            (e.target.src =
              "https://starwars-visualguide.com/assets/img/big-placeholder.jpg")
          }
        />
        <div className="card-body">
          <h3 className="card-title">{details.properties.name}</h3>
          <ul className="list-group list-group-flush">
            {Object.entries(details.properties).map(([key, value]) => (
              <li className="list-group-item" key={key}>
                <strong>{key.replace("_", " ")}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
