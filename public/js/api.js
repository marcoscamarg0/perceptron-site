const API = {
    async getNoticias() {
        try {
            const r = await fetch(`${CONFIG.API_URL}/noticias`);
            return r.ok ? await r.json() : [];
        } catch { return []; }
    },
    async createNoticia(data) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/noticias`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return r.ok ? await r.json() : null;
        } catch { return null; }
    },
    async updateNoticia(id, data) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/noticias/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return r.ok ? await r.json() : null;
        } catch { return null; }
    },
    async deleteNoticia(id) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/noticias/${id}`, { method: 'DELETE' });
            return r.ok;
        } catch { return false; }
    },
    async getEquipe() {
        try {
            const r = await fetch(`${CONFIG.API_URL}/equipe`);
            return r.ok ? await r.json() : [];
        } catch { return []; }
    },
    async createMembro(data) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/equipe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return r.ok ? await r.json() : null;
        } catch { return null; }
    },
    async deleteMembro(id) {
        try {
            const r = await fetch(`${CONFIG.API_URL}/equipe/${id}`, { method: 'DELETE' });
            return r.ok;
        } catch { return false; }
    }
};
