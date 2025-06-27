document.addEventListener('deviceready', async function () {
  if (typeof nodejs === 'undefined') {
    const msg = 'Errore: plugin nodejs-mobile-cordova non caricato!';
    console.error(msg);
    document.getElementById('output').textContent = msg;
    return;
  }

  try {
    await nodejs.start('main.js');
    console.log('Node.js avviato, inizio a testare il server...');

    const maxRetries = 20;
    const delayMs = 300;
    let attempts = 0;

    function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function tryFetch() {
      attempts++;
      try {
        const res = await fetch('http://127.0.0.1:3000', { mode: 'cors', cache: 'no-store' });
        console.log('Status:', res.status, res.statusText);
        if (!res.ok) {
          throw new Error(`Risposta non OK: ${res.status} ${res.statusText}`);
        }
        const text = await res.text();
        console.log('Fetch riuscito:', text);
        document.getElementById('output').textContent = text;
      } catch (err) {
        console.warn(`Tentativo ${attempts} fallito:`, err);
        if (attempts < maxRetries) {
          await wait(delayMs);
          return tryFetch();
        } else {
          const errMsg = `Load failed dopo ${attempts} tentativi: ${err.message}`;
          console.error(errMsg);
          document.getElementById('output').textContent = errMsg;
        }
      }
    }

    tryFetch();

  } catch (err) {
    const msg = `Errore durante l'avvio di Node.js: ${err.message}`;
    console.error(msg);
    document.getElementById('output').textContent = msg;
  }
}, false);
