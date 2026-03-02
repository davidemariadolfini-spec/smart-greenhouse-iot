🌿 Smart Greenhouse IoT Dashboard Un ecosistema IoT completo per il monitoraggio di una serra intelligente. Il progetto simula la raccolta di dati ambientali in tempo reale, li archivia su un database cloud e li visualizza tramite una dashboard interattiva con analisi storica e grafici dinamici.

🚀 Panoramica del Progetto Il sistema dimostra l'integrazione tra un frontend moderno e un'infrastruttura backend "Low-Code". Utilizza n8n per la logica di automazione e Supabase come database relazionale, simulando il comportamento di sensori fisici tramite espressioni JavaScript.

🛠 Tech Stack

Frontend: HTML5, CSS3 (Glassmorphism UI), JavaScript (ES6).

Backend & Automation: n8n (Gestione Webhook e Logica).

Database: Supabase (PostgreSQL).

Visualizzazione Dati: Chart.js per i grafici a barre dello storico.

Hosting: Antigravity.

📂 Struttura File Principali index.html & script.js: Gestiscono la visualizzazione in tempo reale. Il sistema utilizza un setInterval per mantenere i dati freschi (ogni 5 secondi) senza ricaricare la pagina.

analytics.html & analytics.js: Interrogano il database Supabase per recuperare gli ultimi 20 record, ordinandoli cronologicamente per popolare il grafico a barre.

style.css: Utilizza tecniche di Glassmorphism per un'interfaccia moderna, con uno sfondo dinamico e filtri blur sugli elementi della dashboard.

schema.sql: Contiene lo schema della tabella per creare il database con i tipi di dati corretti (int8, float8, ecc.).

🧪 Simulazione Dati (n8n Logic) Per simulare sensori reali, il nodo Supabase in n8n utilizza queste espressioni JavaScript per generare valori dinamici a ogni chiamata:

Temperatura (°C): Range 22-27°C con un decimale. {{ (22 + Math.random() * 5).toFixed(1) }}

Umidità (%): Range 40-60% (valore intero). {{ Math.floor(40 + Math.random() * 20) }}

Umidità Terreno (%): Range 60-75% (valore intero). {{ Math.floor(60 + Math.random() * 15) }}

📸 Screenshots

Live Dashboard - dashboard.jpg
Interfaccia con aggiornamento automatico dei dati live.

Analisi Storica (Analytics) - grafico.jpg
Grafico a barre dinamico con i trend degli ultimi 20 inserimenti.

Backend Workflow (n8n) - n8n.jpg
Il flusso logico: Webhook → Supabase (Create Row) → Response.

Database Structure (Supabase) - supabase.jpg
Log dei dati salvati correttamente nella tabella greenhouse_stats.

⚙️ Architettura e Funzionamento Polling: Il Frontend interroga il Webhook di n8n ogni 5 secondi tramite setInterval.

Processing: n8n riceve la chiamata, genera i dati casuali e crea una nuova riga su Supabase.

Feedback: n8n restituisce i dati al Frontend per l'aggiornamento della UI.

Analytics: La pagina delle statistiche recupera i dati da Supabase e li visualizza con Chart.js.

📝 Come Configurare il Progetto Database: Importa il file SQL presente nel repository su Supabase per configurare la tabella.

n8n: Configura un workflow con i nodi Webhook (GET), Supabase (Create Row) e Respond to Webhook.

Frontend: Inserisci le tue chiavi personali nei file .js:

JavaScript const SUPABASE_URL = "IL_TUO_URL_SUPABASE"; const SUPABASE_KEY = "LA_TUA_CHIAVE_ANON_PUBLIC"; const N8N_WEBHOOK_URL = "IL_TUO_WEBHOOK_URL";

Sviluppato con passione per l'integrazione IoT e Cloud.
