import { useState } from 'react';
import './App.css';

function App() {
  const [handle, setHandle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      // First, scrape the data
      const scrapeResponse = await fetch(`/scrape/${handle}`);
      const personData = await scrapeResponse.json();
      console.log('Scrape response:', scrapeResponse);
      console.log('Person data:', personData);

      // Then, send the data to generate the PDF
      const pdfResponse = await fetch(`/generate/${handle}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData),
      });

      // Assuming the Flask API sends the PDF as a blob
      const blob = await pdfResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${handle}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Failed to generate PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h2>Enter LinkedIn Handle</h2>
      <form onSubmit={handleSubmit}>
        <label>
          LinkedIn Handle:
          <input
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            disabled={isLoading}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          Generate PDF
        </button>
      </form>
    </div>
  );
}

export default App;
