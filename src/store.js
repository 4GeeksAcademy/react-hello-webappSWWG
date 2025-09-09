export const initialStore = () => ({
  baseURL: "https://www.swapi.tech/api/",
  people: [],     
  favorites: [],
  info: {}, 
});

export default function storeReducer(store, action = {}) {
  switch(action.type) {
    case "set-info":
      return{...store,info: action.payload};
    case "set-people":
      return { ...store, people: action.payload };
    case "add-favorite":
      return { ...store, favorites: [...store.favorites, action.payload] };
    case "remove-favorite":
      return { 
        ...store, 
        favorites: store.favorites.filter(
          fav => fav.uid !== action.payload.uid
        )
      };
    default:
      return store;
  }
}
