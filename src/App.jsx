import { useState } from 'react';
import PersonDataForm from './PersonDataForm';
import ScrapeForm from './ScrapeForm';
import './App.css';

function App() {
  const [handle, setHandle] = useState('');
  const [personData, setPersonData] = useState(null); // New state to store scraped data

  const handleScrapeData = async (inputHandle) => {
    setHandle(inputHandle);
    const scrapeResponse = await fetch(`/scrape/${inputHandle}`);
    const data = await scrapeResponse.json();
    setPersonData(data);
    return data;
  };

  const handleGeneratePDF = async (editedData) => {
    try {
      const pdfResponse = await fetch(`/generate/${handle}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData), // Use the possibly edited data
      });

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
    }
  };

  return (
    <div className="App">
      <h1>Linkedin to CV Generator</h1>
      {<ScrapeForm onScrape={handleScrapeData} />}
      {personData && (
        <PersonDataForm
          initialData={personData}
          onGeneratePDF={handleGeneratePDF}
          handle={handle}
        />
      )}
    </div>
  );
}

export default App;
