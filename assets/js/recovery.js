// ============================================
// EMAIL SENDER (EmailJS - opcional, plan gratis)
// Configura los 3 valores en data/email-config.js
// ============================================
const EmailSender = {
  configured() {
    return typeof EMAIL_CONFIG !== 'undefined' && EMAIL_CONFIG &&
      EMAIL_CONFIG.serviceId && EMAIL_CONFIG.templateId && EMAIL_CONFIG.publicKey;
  },
  ensureSdk() {
    return new Promise(function (resolve, reject) {
      if (window.emailjs) return resolve();
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      s.onload = resolve;
      s.onerror = function () { reject(new Error('No se pudo cargar EmailJS')); };
      document.head.appendChild(s);
    });
  },
  async send(params) {
    if (!this.configured()) return { ok: false, reason: 'not-configured' };
    try {
      await this.ensureSdk();
      await window.emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, params, { publicKey: EMAIL_CONFIG.publicKey });
      return { ok: true };
    } catch (e) {
      return { ok: false, reason: 'error', error: e };
    }
  }
};

// ============================================
// PASSWORD RECOVERY - codigos de 6 digitos
// ============================================
const Recovery = {
  CODE_TTL_MIN: 15,
  genCode() {
    return String(Math.floor(100000 + Math.random() * 900000));
  },
  getResets() {
    try { return JSON.parse(localStorage.getItem('bookstore_recoveryCodes')) || []; }
    catch (e) { return []; }
  },
  saveResets(list) {
    localStorage.setItem('bookstore_recoveryCodes', JSON.stringify(list));
  },
  create(email, role) {
    email = String(email).trim().toLowerCase();
    const code = this.genCode();
    const now = Date.now();
    const list = this.getResets().filter(function (r) { return !(r.email === email && r.role === role); });
    list.push({ email: email, role: role, code: code, createdAt: now, expiresAt: now + this.CODE_TTL_MIN * 60000, used: false });
    this.saveResets(list);
    return code;
  },
  verify(email, role, code) {
    email = String(email).trim().toLowerCase();
    const r = this.getResets().find(function (x) { return x.email === email && x.role === role; });
    if (!r) return { ok: false, message: 'No hay una solicitud de recuperacion para ese correo.' };
    if (r.used) return { ok: false, message: 'Este codigo ya fue utilizado.' };
    if (Date.now() > r.expiresAt) return { ok: false, message: 'El codigo expiro. Solicita uno nuevo.' };
    if (String(r.code) !== String(code).trim()) return { ok: false, message: 'Codigo incorrecto.' };
    return { ok: true };
  },
  consume(email, role) {
    email = String(email).trim().toLowerCase();
    const list = this.getResets().map(function (x) {
      return (x.email === email && x.role === role) ? Object.assign({}, x, { used: true }) : x;
    });
    this.saveResets(list);
  },
  findByEmail(email, role) {
    email = String(email).trim().toLowerCase();
    if (role === 'admin') {
      return DB.getAdminUsers().find(function (u) { return String(u.email).toLowerCase() === email; }) || null;
    }
    return DB.getCustomers().find(function (c) { return String(c.email).toLowerCase() === email; }) || null;
  },
  updatePassword(email, role, newPassword) {
    email = String(email).trim().toLowerCase();
    if (role === 'admin') {
      const users = DB.getAdminUsers();
      const i = users.findIndex(function (u) { return String(u.email).toLowerCase() === email; });
      if (i === -1) return false;
      users[i].password = newPassword;
      DB.setAdminUsers(users);
      return true;
    }
    const customers = DB.getCustomers();
    const j = customers.findIndex(function (c) { return String(c.email).toLowerCase() === email; });
    if (j === -1) return false;
    customers[j].password = newPassword;
    DB.setCustomers(customers);
    return true;
  },
  async sendCode(email, role, storeName) {
    const code = this.create(email, role);
    const res = await EmailSender.send({
      to_email: email,
      email: email,
      code: code,
      store_name: storeName || 'Libreria Creativo',
      role: role
    });
    return { code: code, sent: res.ok, reason: res.reason };
  }
};
