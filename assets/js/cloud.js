// ============================================
// CLOUD SYNC - Supabase persistence + real-time
// Keeps the sync DB.* API working while syncing to the cloud.
// If not configured, the site falls back to localStorage only.
// ============================================
const Cloud = {
  url: ((typeof CLOUD_CONFIG !== 'undefined' && CLOUD_CONFIG.url) || '').replace(/\/+$/, ''),
  anonKey: (typeof CLOUD_CONFIG !== 'undefined' && CLOUD_CONFIG.anonKey) || '',
  table: 'store_data',
  pollTimer: null,
  flushTimer: null,
  dirty: {},

  enabled() {
    return !!(this.url && this.anonKey);
  },

  headers(extra) {
    const h = {
      apikey: this.anonKey,
      Authorization: 'Bearer ' + this.anonKey,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    if (extra) Object.assign(h, extra);
    return h;
  },

  async init() {
    if (!this.enabled()) return;
    try {
      const rows = await this.loadAll();
      if (!rows) return;
      const map = {};
      rows.forEach(r => { map[r.key] = r.value; });
      if (!map.books) {
        await this.seedAll();
      } else {
        Object.keys(map).forEach(k => this.applyRemote(k, map[k]));
      }
      this.startPoll();
    } catch (e) {
      console.warn('[Cloud] init fallback a local:', e.message || e);
    }
  },

  async loadAll() {
    const resp = await fetch(this.url + '/rest/v1/' + this.table + '?select=key,value', {
      headers: this.headers()
    });
    if (!resp.ok) return null;
    return resp.json();
  },

  async upsertRows(payload) {
    const resp = await fetch(this.url + '/rest/v1/' + this.table + '?on_conflict=key', {
      method: 'POST',
      headers: this.headers({ Prefer: 'resolution=merge-duplicates,return=minimal' }),
      body: JSON.stringify(payload)
    });
    if (!resp.ok) throw new Error('upsert ' + resp.status);
  },

  async seedAll() {
    const payload = Object.keys(SEED_DATA).map(k => ({ key: k, value: SEED_DATA[k] }));
    await this.upsertRows(payload);
    payload.forEach(p => localStorage.setItem('bookstore_' + p.key, JSON.stringify(p.value)));
  },

  applyRemote(key, value) {
    if (!key || value === null || value === undefined) return;
    if (this.dirty[key]) return;
    if (typeof value === 'string') {
      try { value = JSON.parse(value); } catch (e) { /* conservar texto plano */ }
    }
    const cur = localStorage.getItem('bookstore_' + key);
    try {
      const np = JSON.stringify(value);
      if (cur !== np) {
        localStorage.setItem('bookstore_' + key, np);
        this.emit(key);
      }
    } catch (e) { /* silent */ }
  },

  onLocalWrite(key) {
    if (!this.enabled()) return;
    this.dirty[key] = Date.now();
    clearTimeout(this.flushTimer);
    const self = this;
    this.flushTimer = setTimeout(() => self.flush(), 400);
  },

  async flush() {
    if (!this.enabled()) return;
    const keys = Object.keys(this.dirty);
    if (!keys.length) return;
    const payload = [];
    keys.forEach(k => {
      const raw = localStorage.getItem('bookstore_' + k);
      if (raw !== null) {
        try {
          let v = JSON.parse(raw);
          if (typeof v === 'string') { try { v = JSON.parse(v); } catch (e) {} }
          payload.push({ key: k, value: v });
        } catch (e) { /* silent */ }
      }
    });
    if (!payload.length) return;
    try {
      await this.upsertRows(payload);
      keys.forEach(k => delete this.dirty[k]);
    } catch (e) {
      console.warn('[Cloud] push fallido, reintentara:', e.message || e);
    }
  },

  isDirty(key) {
    return !!this.dirty[key];
  },

  startPoll() {
    const self = this;
    const tick = function () {
      setTimeout(async function () {
        if (!self._polling) {
          self._polling = true;
          try {
            const rows = await self.loadAll();
            if (rows) rows.forEach(r => self.applyRemote(r.key, r.value));
          } catch (e) { /* silent */ }
          self._polling = false;
        }
        tick();
      }, 6000);
    };
    tick();
  },

  emit(key) {
    try { window.dispatchEvent(new CustomEvent('bookstore-updated', { detail: key })); }
    catch (e) { /* silent */ }
  }
};

// Kick-off (async; no bloquea el resto)
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () { Cloud.init(); });
}