

import { useEffect } from 'react';

export default function ErrorPage() {
  useEffect(() => {
    document.title = '404 Not Found';
    // Set the HTTP response status to 404
    const { status } = new Response(null, { status: 404 });
    window.history.replaceState({ status }, '');
  }, []);

  return (
    <>
      <h1>404 Not Found</h1>
      <p>Sorry, we could not find this page.</p>
    </>
  );
}
