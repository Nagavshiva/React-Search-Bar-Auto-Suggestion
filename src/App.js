import "./styles.css";
import SearchComponent from "./SearchComponent";

export default function App() {
  const suggestionsData = [
    "React",
    "Angular",
    "Vue",
    "Svelte",
    "JavaScript",
    "TypeScript",
    "Node.js",
  ];
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <SearchComponent suggestionsData={suggestionsData} />
    </div>
  );
}
