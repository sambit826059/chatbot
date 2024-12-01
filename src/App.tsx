import { useState } from "react"
import axios from "axios"

function App() {
  const [ response, setResponse ] = useState("Hi there! How can I be helpful to you ?");
  const [ value, setValue ] = useState("");
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setValue(e.target.value);
  }
  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:3000/chatbot", {
      question: value
    });
    setResponse(response.data)
  };

  return (
    <div className="container">
      <div>
        <input type="text" 
          value={value}
          onChange={onChange}
         />
      </div>
      <div>
        <button onClick={handleSubmit}>Click me for answers!</button>
      </div>
      <div>
        <p>Chatbot: {response}</p>
      </div>
    </div>
    
  );
}

export default App;