function renderAreasSection() {
    const el = document.getElementById('areasSection');
    const areas = [
        {
            num: '01',
            title: 'Gestão Pública',
            desc: 'Atuamos em gestão pública voltada a governos e municípios, com foco em fortalecer a saúde financeira e elevar a capacidade de investimento e entrega de infraestrutura. Apoiamos diagnósticos, planos de ação, melhoria de arrecadação e governança de resultados.',
            icon: `<svg class="area-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
        },
        {
            num: '02',
            title: 'Setor Elétrico',
            desc: 'Análises regulatórias e econômico-financeiras, apoiando decisões sobre tarifas, incentivos, eficiência e qualidade do serviço, com monitoramento por indicadores para fortalecer escolhas técnicas em ambientes de alta complexidade regulatória.',
            icon: `<svg class="area-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
        },
        {
            num: '03',
            title: 'Saneamento',
            desc: 'Estudos e apoio técnico para sustentabilidade econômico-financeira, metas e indicadores, estruturação e gestão de contratos, incluindo análises tarifárias e de equilíbrio contratual.',
            icon: `<svg class="area-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`
        },
        {
            num: '04',
            title: 'Rodovias',
            desc: 'Apoio a concessões rodoviárias e gestão de ativos com análises de CAPEX, OPEX, tráfego e níveis de serviço, além de modelos e painéis para operação e governança contratual, orientando decisões em estruturação e reequilíbrios.',
            icon: `<svg class="area-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M3 17l4-10h10l4 10"/><path d="M7 17h10"/><path d="M9 12h6"/></svg>`
        },
        {
            num: '05',
            title: 'Iluminação Pública',
            desc: 'Oferecemos soluções em iluminação pública municipal, incluindo modernização de redes, eficiência energética e gestão inteligente de iluminação. Nossa equipe trabalha para melhorar a segurança e a qualidade de vida nas cidades.',
            icon: `<svg class="area-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9 18h6M10 22h4M12 2v1M12 6a6 6 0 0 1 6 6c0 2.5-1.5 4.5-3 6H9c-1.5-1.5-3-3.5-3-6a6 6 0 0 1 6-6z"/></svg>`
        },
        {
            num: '06',
            title: 'Mineração',
            desc: 'Análises de governança regulatória, riscos e conformidade, apoiando decisões e estratégias em um setor sensível a requisitos institucionais, socioambientais e de integridade, organizando premissas e cenários para reduzir incerteza.',
            icon: `<svg class="area-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="2" x2="12" y2="22"/><polyline points="2 8.5 12 15 22 8.5"/></svg>`
        },
        {
            num: '07',
            title: 'Concessões e PPPs',
            desc: 'Apoio do desenho do projeto à gestão do contrato, com modelagem econômico-financeira, matriz de riscos, mecanismos de remuneração e indicadores, buscando contratos executáveis com governança clara e previsibilidade.',
            icon: `<svg class="area-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`
        },
        {
            num: '08',
            title: 'Pareceres & Coordenação',
            desc: 'Pareceres técnicos estruturados com análise fundamentada e recomendação objetiva para subsidiar decisões administrativas e regulatórias. Coordenação técnica de projetos complexos com governança, cronograma e acompanhamento de resultados.',
            icon: `<svg class="area-icon" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`
        }
    ];

    el.innerHTML = `
        <div class="areas-section" id="areasSection">
            <div class="section-container">
                <div class="section-header-row">
                    <div>
                        <div class="section-label">
                            <div class="section-label-line"></div>
                            <span class="section-label-text">Especialidades</span>
                        </div>
                        <h2 class="section-title-serif">Áreas de<br><em>Atuação</em></h2>
                    </div>
                    <p class="section-desc">
                        Atuamos com rigor técnico, clareza e compromisso com resultados, transformando complexidade em decisões seguras e aplicáveis no setor de infraestrutura.
                    </p>
                </div>

                <div class="areas-grid">
                    ${areas.map(a => `
                        <div class="area-card">
                            <div class="area-num">${a.num}</div>
                            ${a.icon}
                            <h3 class="area-title">${a.title}</h3>
                            <p class="area-desc">${a.desc}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="areas-quote-block">
                    <div class="areas-quote-line"></div>
                    <blockquote class="areas-quote">
                        "Na Perceptron, a busca pela excelência orienta cada entrega, do diagnóstico à recomendação final. Atuamos com rigor técnico, clareza e compromisso com resultados."
                    </blockquote>
                    <div class="areas-quote-author">Perceptron Consultoria — Nossa Missão</div>
                </div>

                <div class="areas-numbers-bar">
                    <div class="number-stat">
                        <div class="number-stat-value">+20</div>
                        <div class="number-stat-label">Anos de Experiência</div>
                    </div>
                    <div class="number-stat">
                        <div class="number-stat-value">9+</div>
                        <div class="number-stat-label">Áreas de Atuação</div>
                    </div>
                    <div class="number-stat">
                        <div class="number-stat-value">+5</div>
                        <div class="number-stat-label">Consultores</div>
                    </div>
                    <div class="number-stat">
                        <div class="number-stat-value">2</div>
                        <div class="number-stat-label">Escritórios no Brasil</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}
