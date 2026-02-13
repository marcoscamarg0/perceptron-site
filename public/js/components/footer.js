function renderFooter() {
    const el = document.getElementById('footer');
    el.innerHTML = `
        <div class="footer-inner">
            <div>
                <div class="footer-logo-wrap">
                    <img src="/logo.png" alt="Perceptron Consultoria" class="footer-logo-img" />
                </div>
                <p class="footer-desc">
                    Consultoria especializada em regulação e infraestrutura. Apoio técnico e estratégico para serviços públicos, concessões e projetos de infraestrutura.
                </p>
                <div class="footer-social">
                    <div class="footer-social-btn" title="LinkedIn">
                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                            <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                        </svg>
                    </div>
                    <div class="footer-social-btn" title="Instagram">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                    </div>
                    <div class="footer-social-btn" title="WhatsApp">
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                        </svg>
                    </div>
                </div>
            </div>

            <div>
                <div class="footer-col-title">Navegação</div>
                <div class="footer-links">
                    <button class="footer-link" onclick="Navigation.go('home')">Início</button>
                    <button class="footer-link" onclick="Navigation.go('sobre')">Quem Somos</button>
                    <button class="footer-link" onclick="Navigation.go('noticias')">Notícias & Artigos</button>
                    <button class="footer-link" onclick="Navigation.go('contato')">Contato</button>
                </div>
            </div>

            <div>
                <div class="footer-col-title">Áreas de Atuação</div>
                <div class="footer-links">
                    <button class="footer-link">Gestão Pública</button>
                    <button class="footer-link">Setor Elétrico</button>
                    <button class="footer-link">Saneamento</button>
                    <button class="footer-link">Rodovias & Ferrovias</button>
                    <button class="footer-link">Concessões e PPPs</button>
                    <button class="footer-link">Mineração</button>
                </div>
            </div>

            <div>
                <div class="footer-col-title">Sede — Ribeirão Preto/SP</div>
                <div class="footer-contact-list">
                    <div class="footer-contact-item">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        Av. Dr. Plínio de Castro Prado, 288, Sala 23 — SP
                    </div>
                    <div class="footer-contact-item">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        SHI/S QI 7, BL B, SL 201 — Brasília/DF
                    </div>
                    <div class="footer-contact-item">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 12 19.79 19.79 0 0 1 1 3.21a2 2 0 0 1 2-1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        +55 (61) 8180-2825
                    </div>
                    <div class="footer-contact-item">
                        <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect width="20" height="16" x="2" y="4" rx="2"/>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                        contato@perceptron.com.br
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <span class="footer-copy">© ${new Date().getFullYear()} Perceptron Consultoria. Todos os direitos reservados.</span>
            <span class="footer-copy">Regulação & Infraestrutura · Ribeirão Preto/SP e Brasília/DF</span>
        </div>
    `;
}
