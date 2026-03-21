// ============================================================
//  EVENTO SOCRATE - Error 404 + Domanda Filosofica
//  Aggiungere questo file PRIMA della chiusura </body> nel HTML,
//  oppure in fondo a script.js
// ============================================================

(function() {

  // ── BANCA DOMANDE ──────────────────────────────────────────
  const DOMANDE_FILOSOFICHE = [
    { id: 1, domanda: "Cos'è la virtù?", risposte: ["La capacità di fare il bene", "L'obbedienza agli dei", "La ricchezza materiale", "Il potere sugli altri"], corretta: 0 },
    { id: 2, domanda: "Socrate affermava di sapere solo...", risposte: ["Tutto", "Niente", "Di non sapere nulla", "La verità assoluta"], corretta: 2 },
    { id: 3, domanda: "Cosa significa 'Conosci te stesso'?", risposte: ["Guarda allo specchio ogni giorno", "Rifletti sui tuoi limiti e capacità", "Impara le arti e la musica", "Segui i consigli degli altri"], corretta: 1 },
    { id: 4, domanda: "Per Socrate, chi è il filosofo?", risposte: ["Chi ama la sapienza", "Chi possiede la verità", "Chi governa la città", "Chi studia la natura"], corretta: 0 },
    { id: 5, domanda: "Qual è il metodo filosofico di Socrate?", risposte: ["La retorica", "La maieutica", "La sofistica", "La matematica"], corretta: 1 },
    { id: 6, domanda: "Con quale termine si indica il metodo del dialogo socratico?", risposte: ["Sintesi", "Analisi", "Dialettica", "Ironia"], corretta: 2 },
    { id: 7, domanda: "Cosa intendeva Socrate con 'cura dell'anima'?", risposte: ["Pregare ogni giorno", "Occuparsi della propria coscienza morale", "Evitare il dolore fisico", "Accumulare ricchezze"], corretta: 1 },
    { id: 8, domanda: "Socrate fu condannato a morte per...", risposte: ["Furto", "Empietà e corruzione dei giovani", "Tradimento militare", "Omicidio"], corretta: 1 },
    { id: 9, domanda: "Cosa bevve Socrate per eseguire la sua condanna?", risposte: ["Vino rosso", "Acqua di fonte", "Cicuta", "Miele"], corretta: 2 },
    { id: 10, domanda: "Quale allievo di Socrate scrisse i Dialoghi?", risposte: ["Aristotele", "Platone", "Senofonte", "Diogene"], corretta: 1 },
    { id: 11, domanda: "La maieutica socratica è paragonata a...", risposte: ["L'arte del falegname", "L'arte dell'ostetrica", "L'arte del guerriero", "L'arte del pittore"], corretta: 1 },
    { id: 12, domanda: "Secondo Socrate, il male è frutto di...", risposte: ["La cattiveria innata", "L'ignoranza", "Il destino", "Gli dei malvagi"], corretta: 1 },
    { id: 13, domanda: "In quale città visse Socrate?", risposte: ["Roma", "Sparta", "Atene", "Corinto"], corretta: 2 },
    { id: 14, domanda: "Cos'è la giustizia secondo Socrate?", risposte: ["Il rispetto delle leggi divine", "Dare a ciascuno ciò che merita", "La forza del più potente", "L'accordo tra cittadini"], corretta: 1 },
    { id: 15, domanda: "Cosa sosteneva Socrate riguardo all'anima dopo la morte?", risposte: ["Si dissolve nel nulla", "Si reincarna subito", "È immortale", "Diventa una stella"], corretta: 2 },
    { id: 16, domanda: "Socrate scrisse libri?", risposte: ["Sì, molti trattati", "Sì, solo un dialogo", "No, non scrisse nulla", "Sì, la Repubblica"], corretta: 2 },
    { id: 17, domanda: "Chi era il 'daimon' di Socrate?", risposte: ["Un demone malvagio", "Una voce interiore guida", "Il suo migliore amico", "Un dio dell'Olimpo"], corretta: 1 },
    { id: 18, domanda: "Cosa significa 'aporia' in filosofia?", risposte: ["Una risposta certa", "Una difficoltà senza soluzione", "Un'affermazione dogmatica", "Una legge naturale"], corretta: 1 },
    { id: 19, domanda: "Per Socrate, la felicità coincide con...", risposte: ["Il piacere fisico", "La virtù e la conoscenza", "Il potere politico", "La ricchezza"], corretta: 1 },
    { id: 20, domanda: "Qual era il mestiere del padre di Socrate?", risposte: ["Filosofo", "Scultore", "Politico", "Medico"], corretta: 1 },
    { id: 21, domanda: "Come si chiama la moglie di Socrate famosa per il suo carattere difficile?", risposte: ["Elena", "Fedra", "Santippe", "Aspasia"], corretta: 2 },
    { id: 22, domanda: "Cosa significa 'etica' nella filosofia greca?", risposte: ["Studio della politica", "Studio del costume e della condotta morale", "Studio della natura", "Studio degli dei"], corretta: 1 },
    { id: 23, domanda: "Socrate era un...", risposte: ["Sofista", "Filosofo", "Retore", "Tiranno"], corretta: 1 },
    { id: 24, domanda: "Qual è la differenza tra Socrate e i Sofisti?", risposte: ["Socrate cercava la verità, i Sofisti persuadevano per denaro", "Socrate era ricco, i Sofisti poveri", "Socrate insegnava matematica, i Sofisti fisica", "Non c'è differenza"], corretta: 0 },
    { id: 25, domanda: "Cos'è il 'bello in sé' secondo la filosofia socratica?", risposte: ["Un oggetto materiale perfetto", "L'idea universale del bello", "Un dipinto famoso", "La bellezza fisica"], corretta: 1 },
    { id: 26, domanda: "Quale opera di Platone racconta gli ultimi giorni di Socrate?", risposte: ["La Repubblica", "Il Fedone", "Il Simposio", "L'Apologia"], corretta: 1 },
    { id: 27, domanda: "Cos'è la 'doxa' in filosofia?", risposte: ["La conoscenza certa", "La gloria militare", "L'opinione comune", "Il sapere divino"], corretta: 2 },
    { id: 28, domanda: "Cosa afferma il paradosso di Socrate sulla virtù?", risposte: ["La virtù si compra", "La virtù è scienza, nessuno sbaglia volontariamente", "La virtù si eredita", "La virtù è forza fisica"], corretta: 1 },
    { id: 29, domanda: "Dove Socrate dialogava con i cittadini?", risposte: ["Nel palazzo reale", "Nell'agorà e nei ginnasi", "In un tempio segreto", "Nelle campagne"], corretta: 1 },
    { id: 30, domanda: "Cosa significa 'episteme' in greco?", risposte: ["Potere politico", "Conoscenza certa e scientifica", "Religione", "Opinione"], corretta: 1 },
    { id: 31, domanda: "Platone è discepolo di...", risposte: ["Aristotele", "Socrate", "Talete", "Eraclito"], corretta: 1 },
    { id: 32, domanda: "Aristotele è discepolo di...", risposte: ["Socrate", "Talete", "Platone", "Pitagora"], corretta: 2 },
    { id: 33, domanda: "Cos'è il logos per i Greci?", risposte: ["La legge scritta", "La ragione e il discorso", "Il destino", "La guerra"], corretta: 1 },
    { id: 34, domanda: "Cosa intendeva Eraclito con 'panta rei'?", risposte: ["Tutto è fermo", "Tutto scorre e cambia", "Tutto è fuoco", "Tutto è acqua"], corretta: 1 },
    { id: 35, domanda: "Per Parmenide, l'essere è...", risposte: ["In continuo divenire", "Uno, eterno e immutabile", "Molteplice e frammentato", "Illusorio"], corretta: 1 },
    { id: 36, domanda: "Cos'è la 'phronesis' aristotelica?", risposte: ["La saggezza pratica", "La forza fisica", "La ricchezza", "Il coraggio in guerra"], corretta: 0 },
    { id: 37, domanda: "Per Aristotele, l'uomo è...", risposte: ["Un animale solitario", "Un essere divino", "Un animale politico", "Un essere razionale e basta"], corretta: 2 },
    { id: 38, domanda: "Cosa significa 'metafisica'?", risposte: ["Fisica avanzata", "Ciò che va oltre la fisica, lo studio dell'essere", "La magia", "La medicina"], corretta: 1 },
    { id: 39, domanda: "Per Platone, dove risiedono le idee?", risposte: ["Nel cervello umano", "In un mondo ideale separato dal sensibile", "Negli dei", "Nella natura"], corretta: 1 },
    { id: 40, domanda: "Cosa descrive l'allegoria della caverna di Platone?", risposte: ["La storia di una caverna preistorica", "Il passaggio dall'ignoranza alla conoscenza", "Un mito sulla creazione del mondo", "Una storia d'amore"], corretta: 1 },
    { id: 41, domanda: "Chi è il filosofo-re per Platone?", risposte: ["Chi vince in guerra", "Chi governa guidato dalla conoscenza del Bene", "Chi è più ricco", "Chi è più anziano"], corretta: 1 },
    { id: 42, domanda: "Cosa insegna lo stoicismo?", risposte: ["Cercare il piacere a ogni costo", "Accettare ciò che non possiamo controllare e vivere secondo la ragione", "Fuggire dalla società", "Adorare la natura"], corretta: 1 },
    { id: 43, domanda: "Chi fondò l'epicureismo?", risposte: ["Socrate", "Platone", "Epicuro", "Aristotele"], corretta: 2 },
    { id: 44, domanda: "Per Epicuro, il fine della vita è...", risposte: ["La gloria militare", "L'atarassia, ossia la tranquillità dell'anima", "La ricchezza", "Il potere"], corretta: 1 },
    { id: 45, domanda: "Cos'è la 'sophrosyne'?", risposte: ["La temperanza e il controllo di sé", "La saggezza bellica", "La passione amorosa", "La conoscenza tecnica"], corretta: 0 },
    { id: 46, domanda: "Chi è Zenone di Cizio?", risposte: ["Un re macedone", "Il fondatore dello Stoicismo", "Un discepolo di Aristotele", "Un matematico"], corretta: 1 },
    { id: 47, domanda: "Cosa studia l'ontologia?", risposte: ["L'origine della vita", "L'essere in quanto essere", "I pianeti e le stelle", "Le leggi dello Stato"], corretta: 1 },
    { id: 48, domanda: "Cosa afferma il relativismo di Protagora?", risposte: ["La verità è assoluta", "L'uomo è misura di tutte le cose", "Gli dei decidono il vero", "La natura è l'unica legge"], corretta: 1 },
    { id: 49, domanda: "Cosa significa 'catarsi' in Aristotele?", risposte: ["Una purificazione delle emozioni tramite l'arte", "Un rituale religioso", "Una tecnica medica", "Un concetto politico"], corretta: 0 },
    { id: 50, domanda: "Chi sono i Presocratici?", risposte: ["Filosofi che vissero dopo Socrate", "Filosofi che cercavano il principio di tutte le cose prima di Socrate", "Gli allievi di Platone", "I fondatori della democrazia"], corretta: 1 },
    { id: 51, domanda: "Per Talete il principio di tutte le cose è...", risposte: ["Il fuoco", "L'aria", "L'acqua", "La terra"], corretta: 2 },
    { id: 52, domanda: "Per Anassimene il principio è...", risposte: ["Il fuoco", "L'aria", "L'acqua", "Il vuoto"], corretta: 1 },
    { id: 53, domanda: "Per Eraclito il principio è...", risposte: ["L'acqua", "La terra", "Il fuoco", "Il logos"], corretta: 2 },
    { id: 54, domanda: "Cos'è il 'nous' di Anassagora?", risposte: ["La materia primordiale", "L'intelletto ordinatore del cosmo", "Il destino", "La volontà degli dei"], corretta: 1 },
    { id: 55, domanda: "Democrito è noto per la teoria...", risposte: ["Del fuoco eterno", "Degli atomi", "Dell'armonia delle sfere", "Dei numeri sacri"], corretta: 1 },
    { id: 56, domanda: "Cosa sono gli atomi per Democrito?", risposte: ["Particelle divisibili e colorate", "Unità indivisibili e invisibili della materia", "Spiriti elementali", "Punti matematici"], corretta: 1 },
    { id: 57, domanda: "Cos'è la 'polis' greca?", risposte: ["Un esercito", "La città-stato greca", "Un tempio", "Una scuola di filosofia"], corretta: 1 },
    { id: 58, domanda: "Cosa insegnavano i Sofisti?", risposte: ["La geometria e l'astronomia", "L'arte della persuasione a pagamento", "La filosofia della natura", "La teologia"], corretta: 1 },
    { id: 59, domanda: "Cos'è la 'eudaimonia' aristotelica?", risposte: ["Il dolore necessario", "La prosperità e il fiorire umano", "La fama postuma", "La solitudine contemplativa"], corretta: 1 },
    { id: 60, domanda: "Per Aristotele la causa finale è...", risposte: ["Il materiale di cui è fatto qualcosa", "Lo scopo per cui qualcosa esiste", "Chi ha creato qualcosa", "La forma di qualcosa"], corretta: 1 },
    { id: 61, domanda: "Cosa studia la logica di Aristotele?", risposte: ["Le leggi della natura", "Le forme del ragionamento valido", "I movimenti dei pianeti", "Le emozioni umane"], corretta: 1 },
    { id: 62, domanda: "Cosa è un sillogismo?", risposte: ["Una figura retorica", "Un ragionamento deduttivo con premesse e conclusione", "Un poema filosofico", "Una legge matematica"], corretta: 1 },
    { id: 63, domanda: "Cos'è il 'principio di non contraddizione'?", risposte: ["Una cosa può essere vera e falsa insieme", "Una cosa non può essere e non essere nello stesso tempo", "La verità cambia sempre", "Le leggi si contraddicono"], corretta: 1 },
    { id: 64, domanda: "Chi scrisse 'La Repubblica'?", risposte: ["Aristotele", "Socrate", "Platone", "Cicerone"], corretta: 2 },
    { id: 65, domanda: "Nella Repubblica di Platone, quale classe governa?", risposte: ["I guerrieri", "I lavoratori", "I filosofi", "I sacerdoti"], corretta: 2 },
    { id: 66, domanda: "Cosa sono le 'Idee' per Platone?", risposte: ["Pensieri soggettivi", "Realtà universali immutabili e perfette", "Immagini pittoriche", "Ricordi del passato"], corretta: 1 },
    { id: 67, domanda: "Cos'è l'anamnesi platonica?", risposte: ["La perdita della memoria", "Il ricordo delle idee che l'anima ha visto prima della nascita", "Un metodo di meditazione", "Una tecnica retorica"], corretta: 1 },
    { id: 68, domanda: "Qual è il sommo Bene per Platone?", risposte: ["La bellezza fisica", "Il piacere dei sensi", "L'Idea del Bene", "La potenza militare"], corretta: 2 },
    { id: 69, domanda: "Cosa insegna il cinismo di Diogene?", risposte: ["Accumulare ricchezze", "Vivere secondo natura rifiutando le convenzioni sociali", "Obbedire allo Stato", "Studiare la matematica"], corretta: 1 },
    { id: 70, domanda: "Cosa chiese Diogene ad Alessandro Magno?", risposte: ["Oro e potere", "Di non togliergli il sole", "Un esercito", "Un libro di filosofia"], corretta: 1 },
    { id: 71, domanda: "Chi sosteneva che 'l'essere è e il non essere non è'?", risposte: ["Eraclito", "Parmenide", "Socrate", "Talete"], corretta: 1 },
    { id: 72, domanda: "Cosa sono le quattro cause di Aristotele?", risposte: ["Materiale, formale, efficiente, finale", "Logica, retorica, fisica, etica", "Terra, acqua, fuoco, aria", "Corpo, anima, mente, spirito"], corretta: 0 },
    { id: 73, domanda: "Cos'è l'etica della virtù aristotelica?", risposte: ["Seguire le regole dello Stato", "Sviluppare abitudini virtuose per fiorire come essere umano", "Evitare ogni piacere", "Obbedire agli dei"], corretta: 1 },
    { id: 74, domanda: "Il 'Simposio' di Platone parla principalmente di...", risposte: ["La guerra", "Eros e la natura dell'amore", "La politica", "La matematica"], corretta: 1 },
    { id: 75, domanda: "Cos'è la 'physis' per i Greci?", risposte: ["La legge scritta", "La natura e il principio originario del mondo", "La cultura umana", "La religione"], corretta: 1 },
    { id: 76, domanda: "Cosa afferma l'atomismo di Leucippo e Democrito?", risposte: ["Tutto è fatto di fuoco", "La realtà è composta da atomi invisibili nel vuoto", "Il mondo è un'illusione", "Tutto è uno e immutabile"], corretta: 1 },
    { id: 77, domanda: "Cosa studia l'antropologia filosofica?", risposte: ["La storia delle civiltà antiche", "La natura e l'essenza dell'essere umano", "I comportamenti animali", "Le leggi cosmiche"], corretta: 1 },
    { id: 78, domanda: "Cos'è la 'areté' greca?", risposte: ["Un difetto morale", "La disposizione alla guerra", "L'eccellenza o la virtù propria di ogni cosa", "La ricchezza materiale"], corretta: 2 },
    { id: 79, domanda: "Cosa studia la gnoseologia?", risposte: ["Le leggi politiche", "La teoria della conoscenza", "La struttura del cosmo", "La morale religiosa"], corretta: 1 },
    { id: 80, domanda: "Chi è considerato il padre della logica formale?", risposte: ["Platone", "Socrate", "Aristotele", "Pitagora"], corretta: 2 },
    { id: 81, domanda: "Cosa sostiene lo scetticismo antico?", risposte: ["La verità è raggiungibile con certezza", "Non possiamo avere certezze assolute sulla realtà", "Gli dei rivelano la verità", "La natura ci guida sempre"], corretta: 1 },
    { id: 82, domanda: "Cos'è l'epoché scettica?", risposte: ["Una affermazione decisa", "La sospensione del giudizio", "Un metodo matematico", "Una preghiera"], corretta: 1 },
    { id: 83, domanda: "Chi fondò l'Accademia di Atene?", risposte: ["Socrate", "Aristotele", "Platone", "Pitagora"], corretta: 2 },
    { id: 84, domanda: "Chi fondò il Liceo?", risposte: ["Platone", "Aristotele", "Socrate", "Epicuro"], corretta: 1 },
    { id: 85, domanda: "Cosa afferma il dualismo platonico?", risposte: ["Tutto è uno", "Esistono due realtà: il mondo sensibile e il mondo delle idee", "Il corpo e l'anima sono la stessa cosa", "La materia è l'unica realtà"], corretta: 1 },
    { id: 86, domanda: "Cosa studia la gnoseologia?", risposte: ["I limiti e le fonti della conoscenza", "Le leggi politiche", "La struttura del cosmo", "La morale religiosa"], corretta: 0 },
    { id: 87, domanda: "Cosa afferma il cogito di Cartesio?", risposte: ["Il corpo è più reale della mente", "Penso dunque sono", "Solo Dio esiste con certezza", "La natura è tutto"], corretta: 1 },
    { id: 88, domanda: "Cosa intende Kant con 'imperativo categorico'?", risposte: ["Un ordine del re", "Un principio morale universale e incondizionato", "Una legge della fisica", "Un decreto religioso"], corretta: 1 },
    { id: 89, domanda: "Cosa afferma l'empirismo di Hume?", risposte: ["La ragione è fonte di tutta la conoscenza", "Tutta la conoscenza deriva dall'esperienza sensibile", "Le idee esistono indipendentemente dai sensi", "Dio ci rivela la verità"], corretta: 1 },
    { id: 90, domanda: "Cos'è la 'cosa in sé' di Kant?", risposte: ["La realtà così come la conosciamo", "La realtà al di là della nostra possibilità di conoscenza", "Il nucleo dell'identità umana", "La materia pura"], corretta: 1 },
    { id: 91, domanda: "Cosa afferma la dialettica hegeliana?", risposte: ["La realtà è statica e immutabile", "La realtà si sviluppa attraverso tesi, antitesi e sintesi", "Solo la materia è reale", "Il pensiero e la realtà sono separati"], corretta: 1 },
    { id: 92, domanda: "Cosa afferma Nietzsche con 'Dio è morto'?", risposte: ["Gli dei greci sono scomparsi", "I valori assoluti tradizionali hanno perso autorità", "Il Dio cristiano non è mai esistito", "La natura ha ucciso la religione"], corretta: 1 },
    { id: 93, domanda: "Chi è il 'Superuomo' di Nietzsche?", risposte: ["Un eroe militare", "Chi crea nuovi valori oltre il bene e il male tradizionale", "Un essere fisicamente superiore", "Un filosofo accademico"], corretta: 1 },
    { id: 94, domanda: "Cos'è l'eterno ritorno in Nietzsche?", risposte: ["La reincarnazione dell'anima", "L'idea che tutto si ripeta all'infinito", "Il ciclo delle stagioni", "La storia che progredisce"], corretta: 1 },
    { id: 95, domanda: "Chi fondò la fenomenologia?", risposte: ["Husserl", "Heidegger", "Sartre", "Merleau-Ponty"], corretta: 0 },
    { id: 96, domanda: "Cosa afferma l'esistenzialismo?", risposte: ["L'essenza precede l'esistenza", "L'esistenza precede l'essenza, siamo ciò che scegliamo di essere", "La natura determina il destino", "Dio stabilisce il senso della vita"], corretta: 1 },
    { id: 97, domanda: "Cos'è il nichilismo?", risposte: ["La fede assoluta nel progresso", "Il rifiuto di ogni valore e significato oggettivo", "L'adorazione della natura", "Il culto dello Stato"], corretta: 1 },
    { id: 98, domanda: "Cosa afferma l'utilitarismo di Bentham?", risposte: ["Il dovere morale è assoluto", "L'azione giusta è quella che massimizza la felicità del maggior numero", "Solo la tradizione guida la morale", "La virtù è l'unico bene"], corretta: 1 },
    { id: 99, domanda: "Cosa afferma il pragmatismo?", risposte: ["La verità è eterna e immutabile", "La verità di un'idea va valutata per le sue conseguenze pratiche", "Solo la scienza rivela il vero", "La morale è relativa"], corretta: 1 },
    { id: 100, domanda: "Cosa afferma il materialismo?", risposte: ["Solo la mente è reale", "La realtà è costituita solo da materia", "Dio è il fondamento di tutto", "Le idee sono più reali degli oggetti"], corretta: 1 },
    { id: 101, domanda: "Cos'è il problema mente-corpo?", risposte: ["Come la mente interagisce con il corpo fisico", "Come il cervello produce pensieri", "La differenza tra anima e spirito", "Come si cura la depressione"], corretta: 0 },
    { id: 102, domanda: "Cosa afferma il razionalismo?", risposte: ["L'esperienza è la sola fonte di conoscenza", "La ragione è la fonte principale della conoscenza", "La fede supera la ragione", "Solo i sensi ci rivelano la verità"], corretta: 1 },
    { id: 103, domanda: "Cos'è la 'tabula rasa' di Locke?", risposte: ["La mente nasce come tavola scritta di idee innate", "La mente nasce vuota, senza idee innate", "Un metodo di meditazione", "Un principio matematico"], corretta: 1 },
    { id: 104, domanda: "Cosa studia la bioetica?", risposte: ["La biologia dei microrganismi", "Le questioni morali legate alla vita, medicina e biotecnologie", "La storia della medicina", "La filosofia della natura"], corretta: 1 },
    { id: 105, domanda: "Cosa afferma la filosofia analitica?", risposte: ["La filosofia deve essere poetica", "La filosofia deve usare l'analisi logica del linguaggio", "La metafisica è il cuore della filosofia", "La filosofia è identica alla teologia"], corretta: 1 },
    { id: 106, domanda: "Cosa intende Foucault con 'potere-sapere'?", risposte: ["Chi ha potere sa di più", "Il sapere e il potere si condizionano reciprocamente", "Il potere elimina il sapere", "Il sapere libera sempre dal potere"], corretta: 1 },
    { id: 107, domanda: "Cos'è il contratto sociale per Rousseau?", risposte: ["Un accordo commerciale tra nazioni", "Il patto fondativo della società civile tra individui liberi", "Una legge divina", "Il codice morale naturale"], corretta: 1 },
    { id: 108, domanda: "Cosa afferma Hobbes riguardo alla natura umana?", risposte: ["L'uomo è naturalmente buono", "Lo stato di natura è una guerra di tutti contro tutti", "La società è naturale nell'uomo", "Gli uomini cooperano sempre spontaneamente"], corretta: 1 },
    { id: 109, domanda: "Chi scrisse 'Così parlò Zarathustra'?", risposte: ["Schopenhauer", "Hegel", "Nietzsche", "Marx"], corretta: 2 },
    { id: 110, domanda: "Cosa afferma Marx riguardo alla storia?", risposte: ["La storia è guidata dagli dei", "La storia è la lotta di classe determinata dai rapporti di produzione", "La storia è un ciclo immutabile", "Le idee muovono la storia"], corretta: 1 },
    { id: 111, domanda: "Cos'è l'alienazione in Marx?", risposte: ["Un disturbo mentale", "Il distacco del lavoratore dal prodotto del suo lavoro", "La separazione dall'ambiente naturale", "La solitudine del filosofo"], corretta: 1 },
    { id: 112, domanda: "Cosa intende Schopenhauer con 'volontà di vivere'?", risposte: ["Il desiderio di prosperare felicemente", "Una forza cieca e irrazionale che domina tutta la realtà", "La motivazione verso il bene", "L'istinto di sopravvivenza fisico"], corretta: 1 },
    { id: 113, domanda: "Cosa intende Bergson con 'élan vital'?", risposte: ["Un impulso meccanico della materia", "Una forza vitale creativa che anima l'evoluzione", "Un concetto matematico", "L'energia elettrica nel corpo"], corretta: 1 },
    { id: 114, domanda: "Cos'è la 'teleologia'?", risposte: ["Lo studio delle cause finali e degli scopi", "Lo studio delle stelle lontane", "Lo studio dei testi sacri", "La dottrina del caso"], corretta: 0 },
    { id: 115, domanda: "Cosa studia la cosmologia antica?", risposte: ["La politica delle città", "L'origine e la struttura dell'universo", "Le malattie del corpo", "La grammatica greca"], corretta: 1 },
    { id: 116, domanda: "Per Platone l'anima ha tre parti: quale quella razionale?", risposte: ["Il ventre", "Il petto", "La testa", "Il cuore"], corretta: 2 },
    { id: 117, domanda: "Cosa intende Platone con 'mimesis'?", risposte: ["La creazione originale", "L'imitazione della realtà", "La sintesi delle idee", "La contemplazione del bello"], corretta: 1 },
    { id: 118, domanda: "Cos'è la 'contemplazione' in filosofia?", risposte: ["L'azione pratica nel mondo", "La pura attività intellettuale volta alla verità", "Il riposo fisico", "La preghiera rituale"], corretta: 1 },
    { id: 119, domanda: "Cosa intende Aristotele con 'atto' e 'potenza'?", risposte: ["Forza fisica e possibilità", "Ciò che qualcosa è e ciò che può diventare", "Il passato e il futuro", "Il bene e il male"], corretta: 1 },
    { id: 120, domanda: "Cos'è la 'sostanza prima' per Aristotele?", risposte: ["L'individuo concreto e singolare", "L'idea universale", "La materia grezza", "Il dio supremo"], corretta: 0 },
    { id: 121, domanda: "Cosa afferma il monismo?", risposte: ["La realtà è molteplice", "Tutto è riducibile a un unico principio", "Il bene e il male sono pari", "Ogni cosa ha un'anima"], corretta: 1 },
    { id: 122, domanda: "Chi è l'autore dell'Apologia di Socrate?", risposte: ["Socrate stesso", "Aristotele", "Platone", "Senofonte"], corretta: 2 },
    { id: 123, domanda: "Cosa studia la filosofia politica?", risposte: ["Il movimento dei pianeti", "I fondamenti del potere, della giustizia e dello Stato", "I comportamenti individuali", "La storia militare"], corretta: 1 },
    { id: 124, domanda: "Per Aristotele, la migliore forma di governo è...", risposte: ["La tirannide", "La democrazia pura", "La politìa, governo costituzionale moderato", "L'oligarchia"], corretta: 2 },
    { id: 125, domanda: "Cos'è la 'trascendenza' in filosofia?", risposte: ["Ciò che supera i limiti dell'esperienza sensibile", "L'immanenza nel mondo", "La perfezione fisica", "La legge della natura"], corretta: 0 },
    { id: 126, domanda: "Cosa afferma il costruttivismo sociale?", risposte: ["La realtà esiste indipendente dall'uomo", "La realtà sociale è costruita dalle interazioni e dal linguaggio umano", "Solo la matematica descrive il reale", "La biologia determina il comportamento"], corretta: 1 },
    { id: 127, domanda: "Cosa studia l'ermeneutica?", risposte: ["La teoria della guerra", "L'interpretazione dei testi e dei significati", "La fisica teorica", "La matematica"], corretta: 1 },
    { id: 128, domanda: "Cos'è il 'pharmakon' in filosofia?", risposte: ["Solo un veleno", "Un rimedio ma anche un veleno, termine ambivalente", "Un medicinale miracoloso", "Un rito religioso"], corretta: 1 },
    { id: 129, domanda: "Cosa afferma il panteismo?", risposte: ["Gli dei sono separati dal mondo", "Dio e il mondo sono la stessa cosa", "Non esistono degli", "Il mondo è illusorio"], corretta: 1 },
    { id: 130, domanda: "Chi è Heidegger?", risposte: ["Un filosofo esistenzialista dell'essere", "Un economista tedesco", "Un matematico", "Un teologo medievale"], corretta: 0 },
    { id: 131, domanda: "Cosa intende Heidegger con 'Esserci' (Dasein)?", risposte: ["L'essere di Dio", "L'essere umano come essere-nel-mondo", "La materia inanimata", "L'universo nel suo insieme"], corretta: 1 },
    { id: 132, domanda: "Cosa studia la filosofia del linguaggio?", risposte: ["Le origini delle lingue antiche", "Il rapporto tra linguaggio, pensiero e realtà", "La grammatica comparata", "La letteratura mondiale"], corretta: 1 },
    { id: 133, domanda: "Cos'è la 'doxa' in Platone?", risposte: ["La conoscenza vera", "L'opinione instabile, opposta alla vera conoscenza", "La virtù guerriera", "La fama degli eroi"], corretta: 1 },
    { id: 134, domanda: "Cosa vuol dire 'filosofia' etimologicamente?", risposte: ["Odio per la sapienza", "Amore per la sapienza", "Conoscenza degli dei", "Studio del cosmo"], corretta: 1 },
    { id: 135, domanda: "Cosa afferma il positivismo logico?", risposte: ["Ammette solo enunciati verificabili come significativi", "La fede guida la ragione", "La metafisica è la scienza suprema", "La storia è l'unica guida"], corretta: 0 },
    { id: 136, domanda: "Cosa afferma Sartre con 'l'inferno sono gli altri'?", risposte: ["Gli altri ci definiscono e limitano irrimediabilmente", "Bisogna isolarsi dalla società", "La vita in comune è impossibile", "Solo i nemici ci fanno del male"], corretta: 0 },
    { id: 137, domanda: "Chi è il principale esponente dell'esistenzialismo francese?", risposte: ["Camus", "Heidegger", "Sartre", "de Beauvoir"], corretta: 2 },
    { id: 138, domanda: "Cosa afferma il relativismo etico?", risposte: ["Esistono valori morali assoluti universali", "I valori morali variano secondo cultura e individuo", "La natura determina la morale", "Solo la ragione stabilisce il bene"], corretta: 1 },
    { id: 139, domanda: "Cos'è la 'coscienza' nella filosofia moderna?", risposte: ["Un organo del corpo", "La consapevolezza di sé e del proprio pensiero", "Un fenomeno fisico", "Il senso del dovere"], corretta: 1 },
    { id: 140, domanda: "Chi scrisse la 'Critica della Ragion Pura'?", risposte: ["Hegel", "Leibniz", "Kant", "Spinoza"], corretta: 2 },
    { id: 141, domanda: "Cosa afferma Locke riguardo ai diritti naturali?", risposte: ["Lo Stato li concede ai cittadini", "Gli individui hanno diritti naturali inalienabili come vita e libertà", "Solo il re ha diritti naturali", "I diritti si acquistano"], corretta: 1 },
    { id: 142, domanda: "Cos'è la 'res cogitans' di Cartesio?", risposte: ["La cosa materiale, il corpo", "La cosa pensante, la mente", "La realtà esterna", "Il dubbio metodico"], corretta: 1 },
    { id: 143, domanda: "Cos'è la 'res extensa' di Cartesio?", risposte: ["La mente pensante", "La sostanza materiale estesa nello spazio", "Lo spirito divino", "La percezione sensoriale"], corretta: 1 },
    { id: 144, domanda: "Cosa intende Rousseau con 'buon selvaggio'?", risposte: ["Un guerriero tribale coraggioso", "L'uomo naturale, buono prima della corruzione della civiltà", "Un santo della foresta", "Un cacciatore primitivo"], corretta: 1 },
    { id: 145, domanda: "Cosa studia la filosofia della scienza?", risposte: ["Come usare un microscopio", "I fondamenti, metodi e limiti della conoscenza scientifica", "La storia degli esperimenti", "Le equazioni fisiche"], corretta: 1 },
    { id: 146, domanda: "Cos'è la falsificabilità secondo Popper?", risposte: ["Una teoria vera non può essere falsificata mai", "Una teoria è scientifica se può essere messa alla prova ed eventualmente smentita", "Solo la matematica è vera", "Il metodo scientifico è infallibile"], corretta: 1 },
    { id: 147, domanda: "Cosa afferma la filosofia stoica riguardo alle emozioni?", risposte: ["Le emozioni vanno espresse liberamente", "Le emozioni irrazionali vanno disciplinate dalla ragione", "Le emozioni sono la guida principale", "Le emozioni sono divine"], corretta: 1 },
    { id: 148, domanda: "Cos'è la 'epoché' in Husserl?", risposte: ["Un giudizio definitivo", "La sospensione del giudizio sul mondo naturale per analizzare la coscienza", "Un rito fenomenologico", "Un metodo logico"], corretta: 1 },
    { id: 149, domanda: "Chi è Simone de Beauvoir?", risposte: ["Una filosofa esistenzialista e femminista francese", "Una poetessa romantica", "Una fisica nucleare", "Una teologa medievale"], corretta: 0 },
    { id: 150, domanda: "Cosa afferma de Beauvoir con 'non si nasce donna, lo si diventa'?", risposte: ["Il genere femminile è un dato biologico fisso", "Il femminile è una costruzione sociale e culturale, non solo biologica", "Le donne sono superiori agli uomini", "Il genere non esiste"], corretta: 1 }
  ];

  // ── STATO DELL'EVENTO ──────────────────────────────────────
  let socraticEventActive = false;
  let socraticEventTimer = null;
  // Intervallo random tra 3 e 8 minuti (in ms)
  const MIN_INTERVAL = 3 * 60 * 1000;
  const MAX_INTERVAL = 8 * 60 * 1000;

  // ── CSS DELL'EVENTO ────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    /* ===== OVERLAY ERROR 404 ===== */
    #socrate-error-overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: #0a0a0a;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      font-family: 'Courier New', monospace;
      animation: socFadeIn 0.3s ease;
    }
    @keyframes socFadeIn { from { opacity:0; } to { opacity:1; } }

    .soc-error-code {
      font-size: clamp(80px, 20vw, 180px);
      font-weight: 900;
      color: #ff2222;
      text-shadow: 0 0 40px #ff0000, 0 0 80px #ff000066;
      letter-spacing: 10px;
      animation: socGlitch 0.4s infinite;
      line-height: 1;
    }
    @keyframes socGlitch {
      0%   { transform: translate(0,0) skew(0deg); }
      20%  { transform: translate(-3px, 2px) skew(-1deg); clip-path: inset(20% 0 60% 0); }
      40%  { transform: translate(3px,-2px) skew(1deg); }
      60%  { transform: translate(-2px, 1px) skew(0.5deg); clip-path: inset(60% 0 20% 0); }
      80%  { transform: translate(2px, -1px); }
      100% { transform: translate(0,0) skew(0deg); }
    }
    .soc-error-msg {
      color: #ff4444; font-size: 22px; margin-top: 10px;
      text-shadow: 0 0 10px #ff0000;
      letter-spacing: 3px;
    }
    .soc-error-sub {
      color: #555; font-size: 13px; margin-top: 8px;
      letter-spacing: 2px;
    }

    /* ===== MODAL SOCRATE ===== */
    #socrate-modal-overlay {
      position: fixed; inset: 0; z-index: 10000;
      background: rgba(0,0,0,0.85);
      display: flex; align-items: center; justify-content: center;
      padding: 16px; box-sizing: border-box;
      animation: socFadeIn 0.4s ease;
    }
    #socrate-modal {
      background: linear-gradient(145deg, #1a0a2e, #0d1b2a);
      border: 2px solid #8a2be2;
      border-radius: 20px;
      padding: 28px 24px;
      max-width: 420px; width: 100%;
      box-shadow: 0 0 40px rgba(138,43,226,0.5), 0 0 80px rgba(138,43,226,0.2);
      text-align: center;
      animation: socSlideUp 0.4s cubic-bezier(.17,.67,.1,1);
    }
    @keyframes socSlideUp {
      from { transform: translateY(60px); opacity:0; }
      to   { transform: translateY(0); opacity:1; }
    }
    #socrate-avatar {
      width: 110px; height: 110px;
      border-radius: 50%;
      border: 3px solid #8a2be2;
      object-fit: cover;
      margin-bottom: 12px;
      box-shadow: 0 0 20px rgba(138,43,226,0.6);
    }
    #socrate-title {
      color: #e0b0ff; font-size: 20px; font-weight: 900;
      letter-spacing: 2px; margin-bottom: 4px;
    }
    #socrate-subtitle {
      color: #8a2be2; font-size: 12px; letter-spacing: 3px;
      margin-bottom: 20px; text-transform: uppercase;
    }
    #socrate-question {
      color: #ffffff; font-size: 16px; font-weight: bold;
      background: rgba(138,43,226,0.15);
      border: 1px solid rgba(138,43,226,0.4);
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 18px;
      line-height: 1.5;
    }
    #socrate-answers {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 10px; margin-bottom: 16px;
    }
    .soc-answer-btn {
      background: rgba(255,255,255,0.05);
      border: 1.5px solid rgba(138,43,226,0.5);
      border-radius: 10px;
      color: #ddd; font-size: 13px;
      padding: 12px 8px;
      cursor: pointer;
      transition: all 0.2s;
      font-weight: bold;
      line-height: 1.4;
    }
    .soc-answer-btn:hover:not(:disabled) {
      background: rgba(138,43,226,0.25);
      border-color: #8a2be2;
      color: #fff;
      transform: translateY(-2px);
    }
    .soc-answer-btn.correct {
      background: rgba(0,200,100,0.3) !important;
      border-color: #00c864 !important;
      color: #00ff80 !important;
    }
    .soc-answer-btn.wrong {
      background: rgba(220,50,50,0.3) !important;
      border-color: #ff3333 !important;
      color: #ff6666 !important;
    }
    #socrate-result {
      font-size: 15px; font-weight: bold; min-height: 22px;
      margin-bottom: 12px; transition: all 0.3s;
    }
    #socrate-result.win  { color: #00ff80; text-shadow: 0 0 10px #00ff8088; }
    #socrate-result.lose { color: #ff4444; text-shadow: 0 0 10px #ff444488; }
    #socrate-timer {
      color: #8a2be2; font-size: 13px; letter-spacing: 2px;
      margin-bottom: 14px;
    }
    #socrate-close-btn {
      background: #8a2be2; color: white;
      border: none; border-radius: 10px;
      padding: 12px 30px; font-size: 15px;
      font-weight: bold; cursor: pointer;
      display: none;
      transition: background 0.2s;
    }
    #socrate-close-btn:hover { background: #7a1fd1; }
    #socrate-stakes {
      color: #ffeb3b; font-size: 13px;
      margin-bottom: 16px;
      background: rgba(255,235,59,0.08);
      border-radius: 8px; padding: 8px;
    }
  `;
  document.head.appendChild(style);

  // ── FUNZIONE PRINCIPALE: TRIGGA L'EVENTO ──────────────────
  function triggerSocrateEvent() {
    if (socraticEventActive) return;
    socraticEventActive = true;

    // 1) Mostra Error 404
    const errorOverlay = document.createElement('div');
    errorOverlay.id = 'socrate-error-overlay';
    errorOverlay.innerHTML = `
      <div class="soc-error-code">404</div>
      <div class="soc-error-msg">PHILOSOPHICAL INTRUSION</div>
      <div class="soc-error-sub">REALTÀ NON TROVATA... UN OSPITE SI AVVICINA</div>
    `;
    document.body.appendChild(errorOverlay);

    // 2) Dopo 2.5s: rimuovi 404 e mostra Socrate
    setTimeout(() => {
      errorOverlay.remove();
      showSocrateModal();
    }, 2500);
  }

  function showSocrateModal() {
    // Pesca domanda random
    const q = DOMANDE_FILOSOFICHE[Math.floor(Math.random() * DOMANDE_FILOSOFICHE.length)];

    // Calcola posta
    const currentTokens = typeof epsteinTokens !== 'undefined' ? epsteinTokens : 0;
    const winAmount  = Math.floor(currentTokens * 0.5);
    const loseAmount = Math.floor(currentTokens * 0.5);

    // Crea overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'socrate-modal-overlay';

    // Mescola le risposte mantenendo traccia della corretta
    const shuffled = q.risposte.map((r, i) => ({ testo: r, originale: i }));
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const correctShuffledIndex = shuffled.findIndex(r => r.originale === q.corretta);

    let answered = false;
    let countdown = 30;

    modalOverlay.innerHTML = `
      <div id="socrate-modal">
        <img id="socrate-avatar" src="socrate.gif" alt="Socrate">
        <div id="socrate-title">ΣΩΚΡΑΤΗΣ</div>
        <div id="socrate-subtitle">— Socrate is questioning —</div>
        <div id="socrate-question">${q.domanda}</div>
        <div id="socrate-stakes">
          ✅ Corretto: +${winAmount} Epstein Token (+50%)<br>
          ❌ Sbagliato: -${loseAmount} Epstein Token (-50%)
        </div>
        <div id="socrate-answers">
          ${shuffled.map((r, i) => `
            <button class="soc-answer-btn" data-index="${i}" onclick="socrateAnswer(${i})">
              ${r.testo}
            </button>
          `).join('')}
        </div>
        <div id="socrate-result"></div>
        <div id="socrate-timer">⏳ Tempo rimasto: <span id="soc-countdown">30</span>s</div>
        <button id="socrate-close-btn" onclick="socrateClose()">Continua il Giro</button>
      </div>
    `;
    document.body.appendChild(modalOverlay);

    // Countdown
    const cdEl = document.getElementById('soc-countdown');
    const timerEl = document.getElementById('socrate-timer');
    const countdownInterval = setInterval(() => {
      countdown--;
      if (cdEl) cdEl.textContent = countdown;
      if (countdown <= 0) {
        clearInterval(countdownInterval);
        if (!answered) {
          answered = true;
          applyResult(false, loseAmount, correctShuffledIndex, null);
        }
      }
    }, 1000);

    // Funzione risposta (globale per onclick)
    window.socrateAnswer = function(idx) {
      if (answered) return;
      answered = true;
      clearInterval(countdownInterval);
      timerEl.style.display = 'none';
      const isCorrect = (idx === correctShuffledIndex);
      applyResult(isCorrect, isCorrect ? winAmount : loseAmount, correctShuffledIndex, idx);
    };

    function applyResult(isCorrect, amount, correctIdx, chosenIdx) {
      const btns = document.querySelectorAll('.soc-answer-btn');
      btns.forEach(b => b.disabled = true);

      // Evidenzia corretta
      if (btns[correctIdx]) btns[correctIdx].classList.add('correct');
      // Evidenzia sbagliata (se risposta sbagliata)
      if (chosenIdx !== null && chosenIdx !== correctIdx && btns[chosenIdx]) {
        btns[chosenIdx].classList.add('wrong');
      }

      const resultEl = document.getElementById('socrate-result');
      if (isCorrect) {
        if (typeof epsteinTokens !== 'undefined') epsteinTokens += amount;
        resultEl.textContent = `🏆 Corretto! +${amount} Epstein Token!`;
        resultEl.className = 'win';
      } else {
        if (typeof epsteinTokens !== 'undefined') {
          epsteinTokens = Math.max(0, epsteinTokens - amount);
        }
        const msg = chosenIdx === null ? '⏰ Tempo scaduto!' : '💀 Sbagliato!';
        resultEl.textContent = `${msg} -${amount} Epstein Token...`;
        resultEl.className = 'lose';
      }

      // Aggiorna display token se esiste la funzione
      if (typeof updateDisplay === 'function') updateDisplay();

      const closeBtn = document.getElementById('socrate-close-btn');
      if (closeBtn) closeBtn.style.display = 'inline-block';
    }

    window.socrateClose = function() {
      const overlay = document.getElementById('socrate-modal-overlay');
      if (overlay) overlay.remove();
      socraticEventActive = false;
      scheduleNextEvent();
    };
  }

  // ── SCHEDULING EVENTO ──────────────────────────────────────
  function scheduleNextEvent() {
    const delay = MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
    socraticEventTimer = setTimeout(triggerSocrateEvent, delay);
  }

  // Avvia lo scheduling all'avvio del gioco
  scheduleNextEvent();

  // Esponi per debug/test manuale
  window.triggerSocrateEvent = triggerSocrateEvent;

})();
