import { useState } from 'react';

function ScrapeForm({ onScrape }) {
  const [handle, setHandle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleScrape = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await onScrape(handle);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to scrape data:', error);
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleScrape}
      className="scrape-form"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <label>LinkedIn Handle:</label>
      <div
        style={{
          width: '100%',
          height: '3rem',
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          disabled={isLoading}
          style={{ width: '80%' }}
        />
        <button type="submit" disabled={isLoading}>
          Scrape Data
        </button>
      </div>
    </form>
  );
}

export default ScrapeForm;
