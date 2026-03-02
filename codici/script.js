const N8N_WEBHOOK_URL = 'IL_TUO_WEBHOOK_URL';

// Questa funzione viene eseguita non appena il file JS viene caricato
async function startAutoUpdate() {
  console.log("Sistema avviato: Creazione parametri in corso...");

  // Eseguiamo la prima chiamata immediatamente
  fetchLiveTwinData();

  // Poi impostiamo l'intervallo ogni 5 secondi
  setInterval(fetchLiveTwinData, 5000);
}

async function fetchLiveTwinData() {
  try {
    const response = await fetch(N8N_WEBHOOK_URL);

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();

    // Aggiorna l'interfaccia utente (HTML)
    if (document.getElementById('temp')) document.getElementById('temp').innerText = data.temp;
    if (document.getElementById('humidity')) document.getElementById('humidity').innerText = data.humidity;
    if (document.getElementById('moisture')) document.getElementById('moisture').innerText = data.soil_moisture;
    if (document.getElementById('status')) document.getElementById('status').innerText = "Live: Connesso";

  } catch (error) {
    console.error("Errore connessione:", error);
    if (document.getElementById('status')) document.getElementById('status').innerText = "Errore: n8n non risponde";
  }
}

// Avvio automatico
startAutoUpdate();
