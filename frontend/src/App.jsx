import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000")
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px", fontSize: "20px" }}>
      <h1>Frontend + Backend Test</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;