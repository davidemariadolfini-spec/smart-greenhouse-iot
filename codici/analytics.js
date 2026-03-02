const SUPABASE_URL = 'IL_TUO_URL_SUPABASE';
const SUPABASE_KEY = 'LA_TUA_CHIAVE_ANON_PUBLIC';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const N8N_WEBHOOK_URL = 'IL_TUO_WEBHOOK_URL';

let iotChart;

// --- FUNZIONE 1: CREA I DATI (Come in index.js) ---
async function startAutoGeneration() {
    // Chiama n8n per creare una nuova riga nel database
    try {
        await fetch(N8N_WEBHOOK_URL);
        // Dopo aver creato il dato, aggiorniamo il grafico per vederlo
        fetchDataAndRender();
    } catch (e) {
        console.error("Errore n8n:", e);
    }
}

// --- FUNZIONE 2: LEGGE I DATI E DISEGNA IL GRAFICO ---
async function fetchDataAndRender() {
    const { data, error } = await supabaseClient
        .from('greenhouse_stats')
        .select('*')
        .order('created_at', { ascending: false }) // Prendiamo i più recenti
        .limit(20); // Mostriamo gli ultimi 20 nel grafico

    if (error) {
        console.error("Errore Supabase:", error);
        return;
    }

    // Ribaltiamo i dati per averli cronologici da sinistra a destra
    const reversedData = data.reverse();

    const labels = reversedData.map(row => new Date(row.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    const tempDS = reversedData.map(row => row.temp);
    const humDS = reversedData.map(row => row.humidity);
    const soilDS = reversedData.map(row => row.soil_moisture);

    if (iotChart) {
        iotChart.data.labels = labels;
        iotChart.data.datasets[0].data = tempDS;
        iotChart.data.datasets[1].data = humDS;
        iotChart.data.datasets[2].data = soilDS;
        iotChart.update();
    } else {
        const ctx = document.getElementById('iotChart').getContext('2d');
        iotChart = new Chart(ctx, {
            type: 'bar', // CAMBIATO DA 'line' A 'bar'
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Temp °C',
                        data: tempDS,
                        backgroundColor: '#ff6b6b', // Colore pieno per le barre
                        borderRadius: 5 // Arrotonda gli angoli delle barre per un look moderno
                    },
                    {
                        label: 'Umidità %',
                        data: humDS,
                        backgroundColor: '#4dabf7',
                        borderRadius: 5
                    },
                    {
                        label: 'Terreno %',
                        data: soilDS,
                        backgroundColor: '#51cf66',
                        borderRadius: 5
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true, // Importante per i grafici a barre
                        ticks: { color: '#fff' },
                        grid: { color: 'rgba(255,255,255,0.1)' }
                    },
                    x: {
                        ticks: { color: '#fff' },
                        grid: { display: false }
                    }
                },
                plugins: {
                    legend: { labels: { color: '#fff' } }
                }
            }
        });
    }
}

// --- AVVIO ---

// 1. Crea un dato subito e poi ogni 5 secondi
startAutoGeneration();
setInterval(startAutoGeneration, 5000);

// Nota: fetchDataAndRender viene chiamato dentro startAutoGeneration 
// così il grafico si aggiorna esattamente dopo che n8n ha creato il dato.
