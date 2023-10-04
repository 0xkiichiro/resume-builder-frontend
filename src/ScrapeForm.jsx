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
    <form onSubmit={handleScrape} className="scrape-form">
      <label>
        LinkedIn Handle:
        <input
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          disabled={isLoading}
        />
      </label>
      <button type="submit" disabled={isLoading}>
        Scrape Data
      </button>
    </form>
  );
}

export default ScrapeForm;
