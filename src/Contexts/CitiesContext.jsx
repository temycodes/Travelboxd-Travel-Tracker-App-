import { createContext, useReducer, useEffect, useContext, useCallback } from "react";

const URL = "https://68efc8b1b06cc802829ebafb.mockapi.io/v1/";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  currentCityId: null,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "error":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error();
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();
        const cities = Array.isArray(data[0]?.cities) ? data[0].cities : data;

        dispatch({ type: "cities/loaded", payload: cities });
      } catch {
        dispatch({ type: "error", payload: "There was an error pulling the data" });
      }
    }
    fetchCities();
  }, []);

  //
  const getCity = useCallback(
    async (id) => {
      if (id === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${URL}/cities/${id}`);
        const data = await res.json();

        // ✅ FIX: handle if API still wraps data inside cities
        const city = data?.cities ? data.cities[0] : data;

        dispatch({ type: "city/loaded", payload: city });
      } catch {
        dispatch({ type: "error", payload: "There was an error pulling the city data" });
      }
    },
    [currentCity]
  );

  //

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "error", payload: "There was an error, failed to add the city" });
    }
  }

  //

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({ type: "error", payload: "There was an error failed to delete the city" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("CitiesContext used outside provider");
  return context;
}
export { CitiesProvider, useCities };
