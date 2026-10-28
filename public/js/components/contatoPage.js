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
            <p class="contato-info-desc">Somos uma equipe multidisciplinar especializada em regulação, infraestrutura e gestão pública. Fale conosco para saber como podemos apoiar seu projeto ou organização.</p>
            <div class="contato-info-list">
                <div class="contato-info-item">
                    <div class="contato-info-icon"><svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                    <div>
                        <div class="contato-info-label">Sede — Ribeirão Preto/SP</div>
                        <div class="contato-info-value">Av. Dr. Plínio de Castro Prado, nº 288, Sala 23<br>Paulista Office, Jardim Palma Travassos — SP, 14.091-170</div>
                    </div>
                </div>
                <div class="contato-info-item">
                    <div class="contato-info-icon"><svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                    <div>
                        <div class="contato-info-label">Brasília/DF</div>
                        <div class="contato-info-value">SHI/S QI 7 Comércio Local, BL B, SL 201<br>Setor de Habitações Individuais — DF, 71615-720</div>
                    </div>
                </div>
                <div class="contato-info-item">
                    <div class="contato-info-icon"><svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1 3.21a2 2 0 0 1 2-1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                    <div>
                        <div class="contato-info-label">Telefone &amp; WhatsApp</div>
                        <div class="contato-info-value">+55 (61) 8180-2825</div>
                    </div>
                </div>
                <div class="contato-info-item">
                    <div class="contato-info-icon"><svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></div>
                    <div>
                        <div class="contato-info-label">E-mail</div>
                        <div class="contato-info-value">contato@perceptronconsult.com</div>
                    </div>
                </div>
                <div class="contato-info-item">
                    <div class="contato-info-icon"><svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
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

            <!-- Formulário funcional via fetch — sem redirecionamento, sem tela branca -->
            <div id="contatoFormWrap">
                <form id="contatoForm" novalidate>
                    <!-- Campo honeypot (anti-spam): escondido do usuário, robôs preenchem -->
                    <input type="text" id="ctHoneypot" name="_honeypot" tabindex="-1" autocomplete="off"
                        style="position:absolute;opacity:0;pointer-events:none;height:0;width:0;" aria-hidden="true" />

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="ctNome">Nome Completo *</label>
                            <input class="form-input" id="ctNome" type="text" placeholder="Seu nome completo" autocomplete="name" required />
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="ctEmpresa">Empresa / Órgão</label>
                            <input class="form-input" id="ctEmpresa" type="text" placeholder="Nome da empresa ou órgão" autocomplete="organization" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="ctEmail">E-mail *</label>
                            <input class="form-input" id="ctEmail" type="email" placeholder="seu@email.com" autocomplete="email" />
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="ctTelefone">Telefone / WhatsApp</label>
                            <input class="form-input" id="ctTelefone" type="tel" placeholder="(00) 00000-0000" autocomplete="tel" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="ctArea">Área de Interesse</label>
                        <select class="form-select" id="ctArea">
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
                        <label class="form-label" for="ctMensagem">Mensagem *</label>
                        <textarea class="form-textarea" id="ctMensagem" placeholder="Descreva sua necessidade, projeto ou dúvida..." required></textarea>
                    </div>

                    <!-- Mensagem de feedback (sucesso / erro) — visível na mesma tela -->
                    <div id="contatoFeedback" class="contato-feedback" aria-live="polite" style="display:none"></div>

                    <div style="display:flex;gap:.75rem;flex-wrap:wrap;align-items:center;margin-top:1.25rem">
                        <button type="submit" class="form-submit" id="ctSubmitBtn" style="display:flex;align-items:center;justify-content:center;gap:.55rem">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                            Enviar Mensagem
                        </button>
                        <button type="button" id="ctWhatsappBtn" class="form-submit" style="display:flex;align-items:center;justify-content:center;gap:.55rem;background:transparent;border:1.5px solid #25D366;color:#25D366">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                            Enviar pelo WhatsApp
                        </button>
                    </div>
                    <p style="font-family:var(--font-aux);font-size:.62rem;color:var(--text-muted);margin-top:.9rem;line-height:1.6;letter-spacing:.04em">
                        Ao enviar, suas informações são tratadas com confidencialidade conforme a LGPD.
                    </p>
                </form>
            </div>
        </div>
    </div>`;

    // ── Envio via fetch (sem recarregar a página) ─────
    const form      = document.getElementById('contatoForm');
    const feedback  = document.getElementById('contatoFeedback');
    const submitBtn = document.getElementById('ctSubmitBtn');

    function mostrarFeedback(ok, msg) {
        feedback.style.display = 'block';
        feedback.className     = 'contato-feedback ' + (ok ? 'contato-feedback--ok' : 'contato-feedback--erro');
        feedback.textContent   = msg;
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        feedback.style.display = 'none';

        const nome     = document.getElementById('ctNome').value.trim();
        const email    = document.getElementById('ctEmail').value.trim();
        const telefone = document.getElementById('ctTelefone').value.trim();
        const empresa  = document.getElementById('ctEmpresa').value.trim();
        const area     = document.getElementById('ctArea').value;
        const mensagem = document.getElementById('ctMensagem').value.trim();
        const honeypot = document.getElementById('ctHoneypot').value;

        // Validação no frontend
        if (!nome) {
            mostrarFeedback(false, 'Por favor, informe seu nome.');
            document.getElementById('ctNome').focus();
            return;
        }
        if (!email && !telefone) {
            mostrarFeedback(false, 'Informe seu e-mail ou telefone para contato.');
            document.getElementById('ctEmail').focus();
            return;
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            mostrarFeedback(false, 'E-mail inválido.');
            document.getElementById('ctEmail').focus();
            return;
        }
        if (!mensagem) {
            mostrarFeedback(false, 'Por favor, escreva sua mensagem.');
            document.getElementById('ctMensagem').focus();
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '⏳ Enviando...';

        try {
            const resultado = await API.enviarContato({ nome, empresa, email, telefone, area, mensagem, _honeypot: honeypot });
            if (resultado.ok) {
                mostrarFeedback(true, '✅ Mensagem enviada com sucesso! Nossa equipe retornará em breve.');
                form.reset();
            } else {
                mostrarFeedback(false, resultado.error || 'Erro ao enviar. Tente novamente ou nos chame pelo WhatsApp.');
            }
        } catch (err) {
            mostrarFeedback(false, 'Erro de conexão. Verifique sua internet ou nos chame pelo WhatsApp.');
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Enviar Mensagem`;
    });

    // ── Botão WhatsApp (alternativa direta) ──────────
    document.getElementById('ctWhatsappBtn').addEventListener('click', () => {
        const nome     = document.getElementById('ctNome').value.trim();
        const empresa  = document.getElementById('ctEmpresa').value.trim();
        const area     = document.getElementById('ctArea').value;
        const mensagem = document.getElementById('ctMensagem').value.trim();

        let texto = 'Olá! Gostaria de solicitar uma consulta.\n\n';
        if (nome)     texto += 'Nome: '            + nome    + '\n';
        if (empresa)  texto += 'Empresa/Órgão: '   + empresa + '\n';
        if (area)     texto += 'Área de interesse: '+ area   + '\n';
        if (mensagem) texto += '\nMensagem:\n'      + mensagem;

        window.open('https://wa.me/556181802825?text=' + encodeURIComponent(texto), '_blank');
    });
}
