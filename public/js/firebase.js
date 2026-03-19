// ── FIREBASE CONFIG ──────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBxyK6jGFHaNawNa51wMjiaLuZZ3o9jdjc",
    authDomain: "perceptron-f3aec.firebaseapp.com",
    projectId: "perceptron-f3aec",
    storageBucket: "perceptron-f3aec.firebasestorage.app",
    messagingSenderId: "41217594725",
    appId: "1:41217594725:web:929cd5699c76508c69fd8c",
    measurementId: "G-4EYG7XBD2M"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

// ── DADOS FIXOS (seed inicial) ───────────────────────
const EQUIPE_SEED = [
    { id:'1', name:'Igor Andrey Roselli',     role:'Especialista em Regulação',              bio:'Graduado em Gestão Pública pelo IFB e graduando em Direito pelo UniCEUB. Pós-graduando em Direito e Regulação do Setor Elétrico. Experiência na ANEEL e ANM.',                                                                                            specialty:'Regulação · Setor Elétrico · Mineração',               imageKey:'igor'    },
    { id:'2', name:'Rodrigo Alex Roselli',    role:'Engenheiro Civil — Infraestrutura',       bio:'Engenheiro Civil pela USP. Consultor com mais de 15 anos de experiência em concessões rodoviárias e engenharia de infraestrutura, com atuação em implantação, conservação e gestão contratual.',                                                           specialty:'Rodovias · Concessões · Infraestrutura',                imageKey:'rodrigo' },
    { id:'3', name:'Marcos Vinicius Roselli', role:'Engenheiro Mecânico — Gestão Pública',    bio:'Engenheiro Mecânico e Mestre pela UNIFEI. Experiência em gestão pública municipal, financeira, saúde e gestão territorial censitária.',                                                                                                                    specialty:'Gestão Pública · Saneamento · Financeiro',              imageKey:'marcos'  },
    { id:'4', name:'Renato Henrique Roselli', role:'Engenheiro Civil — Projetos',             bio:'Engenheiro Civil pela EESC-USP. Consultor com mais de 17 anos de experiência em análise de tráfego, coordenação de projetos executivos, estruturas e usinas hidrelétricas.',                                                                              specialty:'Projetos Executivos · Tráfego · Estruturas',            imageKey:'renato'  },
    { id:'5', name:'Luísa Simei',             role:'Engenheira Eletricista — Setor Elétrico', bio:'Engenheira Eletricista pela UnB. Pós-graduada em Gestão de Riscos na Comercialização de Energia pela USP. Experiência na ANEEL, CCEE e em consultorias especializadas no mercado de energia.',                                                           specialty:'Regulação · Comercialização de Energia · Gestão de Riscos', imageKey:'luisa' }
];

const NOTICIAS_SEED = [
    { id:'1', title:'Marco Legal do Saneamento: desafios e oportunidades para municípios',               summary:'A Lei 14.026/2020 impõe novas exigências de universalização, equilíbrio tarifário e governança contratual. Entenda como estruturar contratos sustentáveis e mitigar riscos na prestação dos serviços.',                                                              date:'08/02/2025', tag:'Saneamento',    imageUrl:'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80' },
    { id:'2', title:'Revisões tarifárias no setor elétrico: o papel da análise regulatória',             summary:'Processos de revisão tarifária periódica exigem análise técnica robusta e monitoramento por indicadores. A assimetria de informação entre regulador e regulado pode ser reduzida com dados bem estruturados.',                                                        date:'01/02/2025', tag:'Setor Elétrico', imageUrl:'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80' },
    { id:'3', title:'Concessões rodoviárias: como garantir governança e previsibilidade contratual',     summary:'A gestão eficiente de concessões rodoviárias requer monitoramento contínuo de CAPEX, OPEX, tráfego e níveis de serviço. Modelos e painéis de dados são fundamentais para decisões em fiscalização.',                                                                date:'25/01/2025', tag:'Rodovias',       imageUrl:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80' },
    { id:'4', title:'Gestão pública municipal: como melhorar arrecadação e capacidade de investimento',  summary:'Diagnósticos estruturados e planos de ação orientados por indicadores permitem que municípios melhorem a saúde financeira e ampliem a capacidade de entrega de infraestrutura e serviços.',                                                                          date:'15/01/2025', tag:'Gestão Pública', imageUrl:'' },
    { id:'5', title:'PPPs e concessões: do modelo ao contrato executável',                               summary:'A estruturação de PPPs e concessões envolve modelagem econômico-financeira, matriz de riscos e mecanismos de remuneração adequados. Contratos bem desenhados reduzem disputas e aumentam a previsibilidade.',                                                        date:'10/01/2025', tag:'Concessões',     imageUrl:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80' }
];

// ── API FIRESTORE ─────────────────────────────────────
window.FirebaseDB = {

    async seedIfEmpty() {
        const eq = await getDocs(collection(db, 'equipe'));
        if (eq.empty) {
            for (const m of EQUIPE_SEED) await setDoc(doc(db, 'equipe', m.id), m);
            console.log('✅ Equipe seed inserida');
        }
        const nt = await getDocs(collection(db, 'noticias'));
        if (nt.empty) {
            for (const n of NOTICIAS_SEED) await setDoc(doc(db, 'noticias', n.id), n);
            console.log('✅ Notícias seed inseridas');
        }
    },

    // EQUIPE
    async getEquipe() {
        const snap = await getDocs(collection(db, 'equipe'));
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    async saveEquipeMembro(id, data) {
        await setDoc(doc(db, 'equipe', id), data, { merge: true });
    },
    async deleteEquipeMembro(id) {
        await deleteDoc(doc(db, 'equipe', id));
    },

    // NOTICIAS
    async getNoticias() {
        const snap = await getDocs(collection(db, 'noticias'));
        return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    async saveNoticia(id, data) {
        await setDoc(doc(db, 'noticias', id), data, { merge: true });
    },
    async deleteNoticia(id) {
        await deleteDoc(doc(db, 'noticias', id));
    },

    // Listener em tempo real para equipe
    onEquipeChange(callback) {
        return onSnapshot(collection(db, 'equipe'), snap => {
            callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });
    },

    // Listener em tempo real para noticias
    onNoticiasChange(callback) {
        return onSnapshot(collection(db, 'noticias'), snap => {
            callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        });
    }
};
