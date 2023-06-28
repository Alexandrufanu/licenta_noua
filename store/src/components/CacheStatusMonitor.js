
import React, { useEffect } from 'react';

const CacheStatusMonitor = () => {

  const [isCached, setIsCached] = React.useState(false);

  useEffect(() => {
    if (window.performance) {
      const navigationEntry = window.performance.getEntriesByType('navigation')[0];

      if (navigationEntry) {
        const { transferSize, encodedBodySize } = navigationEntry;
        const isCached = transferSize === 0 && encodedBodySize === 0;

        if (isCached) {
          console.log('Page was loaded from cache.');
            setIsCached("true");
        } else {
          console.log('Page was fetched from the server.');
          setIsCached("false");
        }
      }
    }
  }, []);

  return <> WAS CACHED: {isCached} </>; // or render a component to display the cache status if desired


};

export default CacheStatusMonitor;









