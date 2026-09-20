// ============================================
// CONFIGURACION DE CORREO (EmailJS - plan gratis)
// 1. Crea una cuenta en https://www.emailjs.com
// 2. Email Services -> agrega un servicio -> copia el Service ID
// 3. Email Templates -> crea una plantilla con las variables:
//      {{to_email}}  {{code}}  {{store_name}}  {{role}}
//    (asunto y cuerpo usan {{code}})
// 4. Account -> General -> copia la Public Key
// 5. Pega aqui los 3 valores y guarda.
// Si quedan vacios, la recuperacion funciona en modo local:
// el codigo se muestra en pantalla en vez de enviarse.
// ============================================
const EMAIL_CONFIG = {
  serviceId: "service_ksn11s9",
  templateId: "template_7i4xpww",
  publicKey: "Xyfahr4L6K84Td8ME"
};
