import logo from "./logo.svg";
import "./App.css";
import AutoComplete from "./components/AutoComplete";

const staticData = [
  "Bimbo",
  "Bond Bread",
  "Bost's Bread",
  "Burry's",
  "Dave's Killer Bread",
  "Davidovich Bagels",
  "Entenmann's",
  "Holsum Bread",
];

function App() {
  const fetchSuggestion = async (query) => {
    const responce = await fetch(
      `https://dummyjson.com/products/search?q=${query}`
    );
    if (!responce.ok) {
      throw new Error("Network responce was not OK.");
    }
    const result = await responce?.json();
    return result?.products;
  };

  return (
    <>
      <h1>Autosuggestion / Typeahead</h1>
      <AutoComplete
        placeholder={"Enter something..."}
        // staticData={staticData}
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
