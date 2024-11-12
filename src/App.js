import { useCallback } from "react";
import "./App.css";
import AutoComplete from "./components/AutoComplete";

function App() {
  // const abortController = new AbortController();

  // const fetchSuggestion = async (query) => {
  //   try {
  //     const responce = await fetch(
  //       `https://dummyjson.com/products/search?q=${query}`,
  //       { signal: abortController.signal }
  //     );
  //     if (responce.ok) {
  //       const result = await responce?.json();

  //       return result?.products;
  //     } else {
  //       throw new Error("Network responce was not OK.");
  //     }
  //   } catch (error) {
  //     if (signal.aborted) {
  //       abortController.abort();
  //       console.error(error);
  //     }
  //   }
  // };

  let abortController = null;

  const fetchSuggestion = useCallback(async (query) => {
    if (abortController) {
      abortController.abort();
    }

    abortController = new AbortController();

    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}`,
        { signal: abortController.signal }
      );

      if (response.ok) {
        const result = await response.json();
        return result?.products || [];
      } else {
        throw new Error("Network response was not OK.");
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Request was aborted");
      } else {
        console.log(err.message || "An error occurred");
      }
    }
  }, []);

  return (
    <>
      <h1>Autosuggestion / Typeahead</h1>
      <AutoComplete
        placeholder={"Enter something..."}
        fetchList={fetchSuggestion}
        dataKey={"title"}
        customeLoading={<>Loading...</>}
        onSelect={(res) => console.log(res)}
        onChange={(input) => {}}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customeStyles={{}}
      />
    </>
  );
}

export default App;
