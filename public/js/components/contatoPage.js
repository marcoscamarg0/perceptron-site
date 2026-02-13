function renderContatoPage() {
    const el = document.getElementById('contatoPage');
    el.innerHTML = `
        <div class="page-hero">
            <div class="page-hero-inner">
                <div class="page-hero-label">
                    <div class="page-hero-label-line"></div>
                    <span class="page-hero-label-text">Fale conosco</span>
                </div>
                <h1 class="page-hero-title">Entre em<br><em>Contato</em></h1>
                <p class="page-hero-sub">Entre em contato com nossa equipe especializada em regulação e infraestrutura. Estamos prontos para apoiar seu projeto com rigor técnico e clareza.</p>
            </div>
        </div>

        <div class="contato-content">
            <div class="contato-info">
                <div class="section-label" style="margin-bottom:1rem">
                    <div class="section-label-line"></div>
                    <span class="section-label-text">Informações</span>
                </div>
                <h2 class="section-title-serif" style="margin-bottom:1.25rem">Vamos <em>conversar</em></h2>
                <p class="contato-info-desc">
                    Somos uma equipe multidisciplinar especializada em regulação, infraestrutura e gestão pública. Fale conosco para saber como podemos apoiar seu projeto ou organização.
                </p>

                <div class="contato-info-list">
                    <div class="contato-info-item">
                        <div class="contato-info-icon">
                            <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                        </div>
                        <div>
                            <div class="contato-info-label">Sede — Ribeirão Preto/SP</div>
                            <div class="contato-info-value">Av. Dr. Plínio de Castro Prado, nº 288, Sala 23<br>Paulista Office, Jardim Palma Travassos — SP, 14.091-170</div>
                        </div>
                    </div>
                    <div class="contato-info-item">
                        <div class="contato-info-icon">
                            <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                            </svg>
                        </div>
                        <div>
                            <div class="contato-info-label">Brasília/DF</div>
                            <div class="contato-info-value">SHI/S QI 7 Comércio Local, BL B, SL 201<br>Setor de Habitações Individuais — DF, 71615-720</div>
                        </div>
                    </div>
                    <div class="contato-info-item">
                        <div class="contato-info-icon">
                            <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1 3.21a2 2 0 0 1 2-1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                        </div>
                        <div>
                            <div class="contato-info-label">Telefone & WhatsApp</div>
                            <div class="contato-info-value">+55 (61) 8180-2825</div>
                        </div>
                    </div>
                    <div class="contato-info-item">
                        <div class="contato-info-icon">
                            <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect width="20" height="16" x="2" y="4" rx="2"/>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                            </svg>
                        </div>
                        <div>
                            <div class="contato-info-label">E-mail</div>
                            <div class="contato-info-value">contato@perceptron.com.br</div>
                        </div>
                    </div>
                    <div class="contato-info-item">
                        <div class="contato-info-icon">
                            <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                            </svg>
                        </div>
                        <div>
                            <div class="contato-info-label">Horário de Atendimento</div>
                            <div class="contato-info-value">Segunda a Sexta: 09h – 18h30<br>Sábados (urgências): 09h – 12h</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="contato-form">
                <h3 class="contato-form-title">Solicite uma Consulta</h3>
                <p class="contato-form-sub">Descreva sua necessidade e nossa equipe retornará em breve com as melhores soluções técnicas para o seu projeto.</p>

                <form id="contatoForm" onsubmit="submitContato(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Nome Completo *</label>
                            <input class="form-input" type="text" placeholder="Seu nome completo" required />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Empresa / Órgão</label>
                            <input class="form-input" type="text" placeholder="Nome da empresa ou órgão" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">E-mail *</label>
                            <input class="form-input" type="email" placeholder="seu@email.com.br" required />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Telefone / WhatsApp</label>
                            <input class="form-input" type="tel" placeholder="+55 (61) 90000-0000" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Área de Interesse *</label>
                        <select class="form-select" required>
                            <option value="">Selecione a área...</option>
                            <option>Gestão Pública</option>
                            <option>Setor Elétrico</option>
                            <option>Saneamento</option>
                            <option>Rodovias</option>
                            <option>Ferrovias</option>
                            <option>Mineração</option>
                            <option>Concessões e PPPs</option>
                            <option>Pareceres Técnicos</option>
                            <option>Coordenação de Projetos</option>
                            <option>Outro</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Mensagem</label>
                        <textarea class="form-textarea" placeholder="Descreva sua necessidade, projeto ou dúvida..." required></textarea>
                    </div>
                    <button type="submit" class="form-submit">Enviar Consulta</button>
                    <div class="form-success" id="formSuccess">
                        <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        Mensagem enviada! Retornaremos em breve.
                    </div>
                    <p style="font-family:var(--font-aux);font-size:.62rem;color:var(--text-muted);margin-top:.9rem;line-height:1.6;letter-spacing:.04em">
                        * Campos obrigatórios. Suas informações são tratadas com confidencialidade conforme a LGPD.
                    </p>
                </form>
            </div>
        </div>
    `;
}

function submitContato(e) {
    e.preventDefault();
    const s = document.getElementById('formSuccess');
    if (s) s.classList.add('show');
    e.target.reset();
    setTimeout(() => s?.classList.remove('show'), 6000);
}
