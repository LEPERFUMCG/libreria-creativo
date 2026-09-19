// ============================================
// BOOKSTORE SEED DATA
// ============================================

const SEED_DATA = {
  config: {
    storeName: "LIBRERIA CREATIVO",
    storeSlogan: "Tu próxima aventura comienza aquí",
    logo: "",
    favicon: "",
    primaryColor: "#2563eb",
    secondaryColor: "#1e40af",
    accentColor: "#f59e0b",
    currency: "L.",
    currencyName: "Lempiras",
    phone: "+504 2234-5678",
    whatsapp: "+504 9988-7766",
    email: "info@libreria-creativo.com",
    address: "Boulevard Los Próceres, Frente al Parque Central",
    city: "Tegucigalpa",
    department: "Francisco Morazán",
    schedule: "Lun-Vie: 8:00 AM - 7:00 PM | Sáb: 9:00 AM - 5:00 PM",
    facebook: "https://facebook.com/libreria-creativo",
    instagram: "https://instagram.com/libreria-creativo",
    twitter: "https://twitter.com/libreria-creativo",
    mapEnabled: false,
    mapUrl: "",
    metaTitle: "LIBRERIA CREATIVO - Tu tienda de libros en línea",
    metaDescription: "Encuentra los mejores libros en LIBRERIA CREATIVO. Catálogo amplio, precios accesibles y envíos a todo el país.",
    ogImage: "",
    taxRate: 15,
    freeShippingMin: 500,
    shippingCost: 50,
    banner: {
      title: "Bienvenido a LIBRERIA CREATIVO",
      subtitle: "Descubre miles de títulos con los mejores precios",
      buttonText: "Explorar Catálogo",
      buttonLink: "cliente/catalog.html",
      image: ""
    },
    homepageSections: [
      { id: "featured", title: "Libros Destacados", visible: true, order: 1 },
      { id: "new", title: "Nuevos Libros", visible: true, order: 2 },
      { id: "bestsellers", title: "Más Vendidos", visible: true, order: 3 },
      { id: "offers", title: "Ofertas y Promociones", visible: true, order: 4 },
      { id: "categories", title: "Categorías", visible: true, order: 5 },
      { id: "authors", title: "Autores Destacados", visible: true, order: 6 }
    ]
  },

  categories: [
    { id: "cat1", name: "Ficción", slug: "ficcion", image: "", active: true, order: 1 },
    { id: "cat2", name: "No Ficción", slug: "no-ficcion", image: "", active: true, order: 2 },
    { id: "cat3", name: "Infantil", slug: "infantil", image: "", active: true, order: 3 },
    { id: "cat4", name: "Académico", slug: "academico", image: "", active: true, order: 4 },
    { id: "cat5", name: "Tecnología", slug: "tecnologia", image: "", active: true, order: 5 },
    { id: "cat6", name: "Arte y Cultura", slug: "arte-cultura", image: "", active: true, order: 6 },
    { id: "cat7", name: "Autoayuda", slug: "autoayuda", image: "", active: true, order: 7 },
    { id: "cat8", name: "Ciencias", slug: "ciencias", image: "", active: true, order: 8 }
  ],

  genres: [
    { id: "gen1", name: "Novela", active: true },
    { id: "gen2", name: "Cuento", active: true },
    { id: "gen3", name: "Poesía", active: true },
    { id: "gen4", name: "Ensayo", active: true },
    { id: "gen5", name: "Biografía", active: true },
    { id: "gen6", name: "Historia", active: true },
    { id: "gen7", name: "Fantasía", active: true },
    { id: "gen8", name: "Ciencia Ficción", active: true },
    { id: "gen9", name: "Misterio", active: true },
    { id: "gen10", name: "Romance", active: true },
    { id: "gen11", name: "Terror", active: true },
    { id: "gen12", name: "Aventura", active: true },
    { id: "gen13", name: "Educativo", active: true },
    { id: "gen14", name: "Programación", active: true },
    { id: "gen15", name: "Diseño", active: true }
  ],

  authors: [
    { id: "auth1", name: "Gabriel García Márquez", bio: "Escritor colombiano, premio Nobel de Literatura 1982. Autor de obras maestras del realismo mágico.", nationality: "Colombiana", photo: "", active: true },
    { id: "auth2", name: "Isabel Allende", bio: "Escritora chilena, una de las autoras hispanohablantes más leídas del mundo.", nationality: "Chilena", photo: "", active: true },
    { id: "auth3", name: "Mario Vargas Llosa", bio: "Escritor peruano-español, premio Nobel de Literatura 2010.", nationality: "Peruana", photo: "", active: true },
    { id: "auth4", name: "Pablo Neruda", bio: "Poeta chileno, premio Nobel de Literatura 1971.", nationality: "Chilena", photo: "", active: true },
    { id: "auth5", name: "Julio Cortázar", bio: "Escritor argentino, figura clave del boom latinoamericano.", nationality: "Argentina", photo: "", active: true },
    { id: "auth6", name: "Laura Esquivel", bio: "Escritora y guionista mexicana, autora de 'Como agua para chocolate'.", nationality: "Mexicana", photo: "", active: true },
    { id: "auth7", name: "Carlos Ruiz Zafón", bio: "Escritor español, autor de 'La Sombra del Viento'.", nationality: "Española", photo: "", active: true },
    { id: "auth8", name: "Stephen King", bio: "Escritor estadounidense de terror, suspenso y ciencia ficción.", nationality: "Estadounidense", photo: "", active: true }
  ],

  publishers: [
    { id: "pub1", name: "Editorial Sudamericana", info: "Editorial argentina fundada en 1938.", logo: "", active: true },
    { id: "pub2", name: "Alfaguara", info: "Editorial del Grupo Penguin Random House.", logo: "", active: true },
    { id: "pub3", name: "Planeta", info: "Grupo editorial español con presencia global.", logo: "", active: true },
    { id: "pub4", name: "Fondo de Cultura Económica", info: "Editorial mexicana fundada en 1934.", logo: "", active: true },
    { id: "pub5", name: "Anagrama", info: "Editorial española independiente.", logo: "", active: true },
    { id: "pub6", name: "Debolsillo", info: "Sello de bolsillo de Penguin Random House.", logo: "", active: true }
  ],

  books: [
    {
      id: "bk1", title: "Cien Años de Soledad", authorId: "auth1", publisherId: "pub1",
      isbn: "978-0307474728", description: "La obra maestra de Gabriel García Márquez que narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. Una novela fundamental del realismo mágico latinoamericano.",
      categoryId: "cat1", genreId: "gen7", price: 350, promoPrice: 299, discount: 15,
      stock: 45, sku: "BK-001", active: true, featured: true, bestseller: true,
      publicationDate: "1967-06-05", pages: 471, language: "Español",
      cover: "", createdAt: "2024-01-15"
    },
    {
      id: "bk2", title: "La Casa de los Espíritus", authorId: "auth2", publisherId: "pub2",
      isbn: "978-0553383805", description: "Una familia multigeneracional chilena, los Trueba, cuyas vidas se entrelazan con la historia política de Chile. Una novela apasionante sobre el amor, la política y el destino.",
      categoryId: "cat1", genreId: "gen7", price: 280, promoPrice: 0, discount: 0,
      stock: 32, sku: "BK-002", active: true, featured: true, bestseller: false,
      publicationDate: "1982-10-01", pages: 496, language: "Español",
      cover: "", createdAt: "2024-01-20"
    },
    {
      id: "bk3", title: "La Ciudad y los Perros", authorId: "auth3", publisherId: "pub2",
      isbn: "978-8420471839", description: "La novela que catapultó a Vargas Llosa a la fama literaria. Ambientada en un colegio militar de Lima, explora la adolescencia, la violencia y la corrupción.",
      categoryId: "cat1", genreId: "gen1", price: 250, promoPrice: 220, discount: 12,
      stock: 28, sku: "BK-003", active: true, featured: false, bestseller: true,
      publicationDate: "1963-10-01", pages: 400, language: "Español",
      cover: "", createdAt: "2024-02-01"
    },
    {
      id: "bk4", title: "Veinte Poemas de Amor", authorId: "auth4", publisherId: "pub4",
      isbn: "978-9681608392", description: "La colección de poesía más famosa de Pablo Neruda. Veinte poemas que exploran el amor, la pasión y la melancolía con una lyricalidad incomparable.",
      categoryId: "cat6", genreId: "gen3", price: 150, promoPrice: 0, discount: 0,
      stock: 60, sku: "BK-004", active: true, featured: true, bestseller: true,
      publicationDate: "1924-01-01", pages: 96, language: "Español",
      cover: "", createdAt: "2024-02-10"
    },
    {
      id: "bk5", title: "Rayuela", authorId: "auth5", publisherId: "pub4",
      isbn: "978-9684115547", description: "Una novela revolucionaria que puede leerse de múltiples maneras. Cortázar invita al lector a ser protagonista de la historia, siguiendo a Horacio Oliveira entre París y Buenos Aires.",
      categoryId: "cat1", genreId: "gen1", price: 300, promoPrice: 260, discount: 13,
      stock: 22, sku: "BK-005", active: true, featured: true, bestseller: false,
      publicationDate: "1963-06-01", pages: 635, language: "Español",
      cover: "", createdAt: "2024-02-15"
    },
    {
      id: "bk6", title: "Como Agua para Chocolate", authorId: "auth6", publisherId: "pub4",
      isbn: "978-0553383904", description: "Una novela mágica que entrelaza el amor y la cocina. Tita, la protagonista, expresa sus emociones a través de sus recetas, creando efectos mágicos en quienes las saborean.",
      categoryId: "cat1", genreId: "gen10", price: 220, promoPrice: 189, discount: 14,
      stock: 38, sku: "BK-006", active: true, featured: false, bestseller: true,
      publicationDate: "1989-01-01", pages: 304, language: "Español",
      cover: "", createdAt: "2024-03-01"
    },
    {
      id: "bk7", title: "La Sombra del Viento", authorId: "auth7", publisherId: "pub3",
      isbn: "978-8408163046", description: "En la Barcelona de posguerra, un joven descubre un libro maldito que cambiará su vida para siempre. Una novela de misterio, amor y libros dentro de libros.",
      categoryId: "cat1", genreId: "gen9", price: 320, promoPrice: 275, discount: 14,
      stock: 35, sku: "BK-007", active: true, featured: true, bestseller: true,
      publicationDate: "2001-04-01", pages: 536, language: "Español",
      cover: "", createdAt: "2024-03-10"
    },
    {
      id: "bk8", title: "El Resplandor", authorId: "auth8", publisherId: "pub6",
      isbn: "978-1501142970", description: "Jack Torrance acepta el puesto de cuidador del Hotel Overlook durante el invierno. Pronto, las fuerzas sobrenaturales del hotel amenazan su cordura y la de su familia.",
      categoryId: "cat1", genreId: "gen11", price: 280, promoPrice: 240, discount: 14,
      stock: 25, sku: "BK-008", active: true, featured: false, bestseller: true,
      publicationDate: "1977-01-28", pages: 447, language: "Español",
      cover: "", createdAt: "2024-03-15"
    },
    {
      id: "bk9", title: "Don Quijote de la Mancha", authorId: "auth1", publisherId: "pub4",
      isbn: "978-8424922566", description: "La obra cumbre de la literatura española. Las aventuras del ingenioso hidalgo y su fiel escudero Sancho Panza son un viaje inolvidable por la imaginación y la realidad.",
      categoryId: "cat1", genreId: "gen1", price: 380, promoPrice: 0, discount: 0,
      stock: 50, sku: "BK-009", active: true, featured: true, bestseller: false,
      publicationDate: "1605-01-16", pages: 863, language: "Español",
      cover: "", createdAt: "2024-01-10"
    },
    {
      id: "bk10", title: "El Principito", authorId: "auth5", publisherId: "pub6",
      isbn: "978-0156012195", description: "Un clásico atemporal sobre un pequeño príncipe que viaja por el universo, aprendiendo sobre la vida, el amor y la amistad. Una obra maestra de la literatura universal.",
      categoryId: "cat3", genreId: "gen7", price: 180, promoPrice: 149, discount: 17,
      stock: 80, sku: "BK-010", active: true, featured: true, bestseller: true,
      publicationDate: "1943-04-06", pages: 96, language: "Español",
      cover: "", createdAt: "2024-01-05"
    },
    {
      id: "bk11", title: "Programación Web Moderna", authorId: "auth3", publisherId: "pub3",
      isbn: "978-8441538979", description: "Guía completa para el desarrollo web moderno. HTML5, CSS3, JavaScript, React, Node.js y las mejores prácticas del desarrollo profesional.",
      categoryId: "cat5", genreId: "gen14", price: 450, promoPrice: 399, discount: 11,
      stock: 18, sku: "BK-011", active: true, featured: true, bestseller: false,
      publicationDate: "2023-09-15", pages: 680, language: "Español",
      cover: "", createdAt: "2024-04-01"
    },
    {
      id: "bk12", title: "Sapiens: De Animales a Dioses", authorId: "auth2", publisherId: "pub3",
      isbn: "978-8499924740", description: "Un viaje fascinante por la historia de la humanidad. Yuval Noah Harari analiza cómo Homo sapiens conquistó el mundo desde sus orígenes hasta la actualidad.",
      categoryId: "cat2", genreId: "gen6", price: 350, promoPrice: 310, discount: 11,
      stock: 40, sku: "BK-012", active: true, featured: false, bestseller: true,
      publicationDate: "2011-01-01", pages: 498, language: "Español",
      cover: "", createdAt: "2024-02-20"
    },
    {
      id: "bk13", title: "Harry Potter y la Piedra Filosofal", authorId: "auth8", publisherId: "pub6",
      isbn: "978-8478884454", description: "El inicio de la saga más mágica de la literatura. Harry descubre que es mago y comienza su aventura en el Colegio Hogwarts de Magia y Hechicería.",
      categoryId: "cat3", genreId: "gen7", price: 290, promoPrice: 250, discount: 14,
      stock: 55, sku: "BK-013", active: true, featured: true, bestseller: true,
      publicationDate: "1997-06-26", pages: 309, language: "Español",
      cover: "", createdAt: "2024-01-25"
    },
    {
      id: "bk14", title: "Historia del Arte", authorId: "auth4", publisherId: "pub4",
      isbn: "978-8437604558", description: "Un recorrido exhaustivo por la historia del arte desde las pinturas rupestres hasta el arte contemporáneo. Ampliamente ilustrado y accesible.",
      categoryId: "cat6", genreId: "gen6", price: 520, promoPrice: 0, discount: 0,
      stock: 15, sku: "BK-014", active: true, featured: false, bestseller: false,
      publicationDate: "2020-03-01", pages: 768, language: "Español",
      cover: "", createdAt: "2024-03-20"
    },
    {
      id: "bk15", title: "El Arte de la Guerra", authorId: "auth3", publisherId: "pub5",
      isbn: "978-8441410848", description: "El tratado militar más antiguo del mundo, escrito por Sun Tzu. Sus enseñanzas estratégicas siguen siendo aplicadas en los negocios y la vida cotidiana.",
      categoryId: "cat2", genreId: "gen4", price: 120, promoPrice: 99, discount: 18,
      stock: 70, sku: "BK-015", active: true, featured: false, bestseller: true,
      publicationDate: "500-01-01", pages: 80, language: "Español",
      cover: "", createdAt: "2024-01-30"
    },
    {
      id: "bk16", title: "Inteligencia Artificial: Una Guía Moderna", authorId: "auth1", publisherId: "pub3",
      isbn: "978-8441542105", description: "Introducción comprensible a la IA. Cubre machine learning, deep learning, NLP y aplicaciones prácticas con ejemplos de código.",
      categoryId: "cat5", genreId: "gen14", price: 480, promoPrice: 420, discount: 13,
      stock: 12, sku: "BK-016", active: true, featured: true, bestseller: false,
      publicationDate: "2024-01-10", pages: 520, language: "Español",
      cover: "", createdAt: "2024-04-15"
    },
    {
      id: "bk17", title: "Cocina Latinoamericana", authorId: "auth6", publisherId: "pub4",
      isbn: "978-6070725494", description: "Un recorrido gastronómico por los sabores de América Latina. Más de 200 recetas tradicionales con historias y tradiciones culinarias.",
      categoryId: "cat2", genreId: "gen4", price: 350, promoPrice: 299, discount: 15,
      stock: 20, sku: "BK-017", active: true, featured: false, bestseller: false,
      publicationDate: "2022-06-01", pages: 384, language: "Español",
      cover: "", createdAt: "2024-03-25"
    },
    {
      id: "bk18", title: "Matemáticas para Todos", authorId: "auth3", publisherId: "pub4",
      isbn: "978-9681608491", description: "Un enfoque práctico y divertido para entender las matemáticas. Ideal para estudiantes de secundaria y preparatoria.",
      categoryId: "cat4", genreId: "gen13", price: 280, promoPrice: 0, discount: 0,
      stock: 0, sku: "BK-018", active: true, featured: false, bestseller: false,
      publicationDate: "2021-08-01", pages: 420, language: "Español",
      cover: "", createdAt: "2024-02-28"
    },
    {
      id: "bk19", title: "Breve Historia del Tiempo", authorId: "auth2", publisherId: "pub5",
      isbn: "978-8484328360", description: "Stephen Hawking explora las grandes preguntas sobre el universo: ¿cómo comenzó? ¿Hacia dónde va? ¿Cuál es la naturaleza del tiempo?",
      categoryId: "cat8", genreId: "gen4", price: 260, promoPrice: 225, discount: 13,
      stock: 30, sku: "BK-019", active: true, featured: false, bestseller: true,
      publicationDate: "1988-04-01", pages: 256, language: "Español",
      cover: "", createdAt: "2024-03-05"
    },
    {
      id: "bk20", title: "El Alquimista", authorId: "auth7", publisherId: "pub5",
      isbn: "978-0062511409", description: "La historia de Santiago, un joven pastor que viaja de España a Egipto en busca de un tesoro enterrado. Una fábula sobre seguir los sueños.",
      categoryId: "cat1", genreId: "gen12", price: 200, promoPrice: 169, discount: 16,
      stock: 65, sku: "BK-020", active: true, featured: true, bestseller: true,
      publicationDate: "1988-01-01", pages: 208, language: "Español",
      cover: "", createdAt: "2024-01-12"
    }
  ],

  pages: {
    about: {
      title: "Sobre Nosotros",
      content: "<h2>Nuestra Historia</h2><p>LIBRERIA CREATIVO nació con la misión de acercar la lectura a todos. Desde nuestros inicios, nos hemos dedicado a ofrecer una selección cuidadosa de libros para todos los gustos y edades.</p><h2>Misión</h2><p>Conectar personas con historias que transforman, ofreciendo una experiencia de compra excepcional y un catálogo diverso de calidad.</p><h2>Visión</h2><p>Ser la librería de referencia en la región, reconocida por nuestra selección, servicio y compromiso con la cultura.</p>"
    },
    faq: {
      title: "Preguntas Frecuentes",
      content: "<h2>¿Cómo puedo hacer un pedido?</h2><p>Simplemente selecciona los libros que deseas, agrégalos al carrito y procede al checkout. Sigue las instrucciones en pantalla.</p><h2>¿Cuánto tarda el envío?</h2><p>Los envíos locales se realizan en 1-3 días hábiles. Los envíos nacionales pueden tardar de 3-7 días hábiles.</p><h2>¿Puedo devolver un libro?</h2><p>Sí, aceptamos devoluciones dentro de los primeros 15 días después de la compra, siempre que el libro esté en buen estado.</p>"
    },
    privacy: {
      title: "Política de Privacidad",
      content: "<p>En LIBRERIA CREATIVO valoramos tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.</p><h2>Información que Recopilamos</h2><p>Nombre, correo electrónico, teléfono, dirección de envío e historial de compras.</p><h2>Uso de la Información</h2><p>Utilizamos tu información para procesar pedidos, mejorar nuestro servicio y enviarte actualizaciones relevantes.</p>"
    },
    terms: {
      title: "Términos y Condiciones",
      content: "<p>Al utilizar nuestro sitio web, aceptas los siguientes términos y condiciones.</p><h2>Uso del Sitio</h2><p>El sitio está destinado para uso personal y no comercial.</p><h2>Precios</h2><p>Todos los precios están en la moneda local e incluyen impuestos a menos que se indique lo contrario.</p>"
    },
    shipping: {
      title: "Información de Envíos",
      content: "<h2>Métodos de Envío</h2><p><strong>Envío Local:</strong> 1-3 días hábiles</p><p><strong>Envío Nacional:</strong> 3-7 días hábiles</p><p><strong>Recogida en Tienda:</strong> Disponible de lunes a sábado</p><h2>Costos de Envío</h2><p>El costo se calcula según la zona de destino. Envío gratis en compras mayores a L.500.</p>"
    },
    returns: {
      title: "Política de Cambios y Devoluciones",
      content: "<h2>Devoluciones</h2><p>Aceptamos devoluciones dentro de los primeros 15 días naturales después de la compra.</p><h2>Requisitos</h2><p>El libro debe estar en su estado original, sin daños y con su empaque.</p><h2>Proceso</h2><p>Contáctanos por WhatsApp o correo electrónico con tu número de pedido para iniciar el proceso.</p>"
    }
  },

  shippingZones: [
    { id: "sz1", name: "Tegucigalpa", type: "fixed", cost: 50, active: true },
    { id: "sz2", name: "San Pedro Sula", type: "fixed", cost: 80, active: true },
    { id: "sz3", name: "Otras Ciudades", type: "fixed", cost: 120, active: true },
    { id: "sz4", name: "Zonas Rurales", type: "variable", cost: 150, active: true }
  ],

  paymentMethods: [
    { id: "pm1", name: "Pago Contra Entrega", description: "Paga al recibir tu pedido", active: true },
    { id: "pm2", name: "Transferencia Bancaria", description: "Realiza una transferencia a nuestra cuenta", active: true },
    { id: "pm3", name: "Depósito Bancario", description: "Realiza un depósito en cualquier sucursal", active: true },
    { id: "pm4", name: "Pago en Tienda", description: "Paga al recoger en nuestra tienda", active: true }
  ],

  deliveryMethods: [
    { id: "dm1", name: "Envío a Domicilio", description: "Recibe tu pedido en la puerta de tu casa", active: true },
    { id: "dm2", name: "Recogida en Tienda", description: "Recoge gratis en nuestra tienda", active: true }
  ],

  promotions: [
    {
      id: "promo1", name: "Descuento de Temporada", type: "percentage", value: 15,
      startDate: "2024-01-01", endDate: "2026-12-31", minPurchase: 200,
      usageLimit: 100, usedCount: 23, active: true, code: "TEMPORADA15",
      appliesTo: "all", productIds: [], categoryIds: []
    },
    {
      id: "promo2", name: "2x1 en Infantiles", type: "fixed", value: 50,
      startDate: "2024-06-01", endDate: "2026-12-31", minPurchase: 0,
      usageLimit: 50, usedCount: 12, active: true, code: "INFANTIL2X1",
      appliesTo: "category", productIds: [], categoryIds: ["cat3"]
    }
  ],

  adminUsers: [
    {
      id: "admin1", name: "Administrador General", email: "admin@libreria-creativo.com",
      role: "superadmin", active: true, password: "pass123",
      permissions: ["all"]
    },
    {
      id: "admin2", name: "María López", email: "maria@libreria-creativo.com",
      role: "admin", active: true, password: "pass123",
      permissions: ["books", "orders", "customers", "inventory", "categories", "homepage"]
    },
    {
      id: "admin3", name: "Carlos Rivera", email: "carlos@libreria-creativo.com",
      role: "inventory", active: true, password: "pass123",
      permissions: ["books", "inventory", "categories"]
    }
  ],

  customers: [
    {
      id: "cust1", name: "Ana Martínez", email: "ana@email.com", phone: "9988-1122",
      whatsapp: "9988-1122", password: "pass123", active: true,
      addresses: [{ id: "addr1", name: "Casa", address: "Col. Los Robles, 3ra Ave", city: "Tegucigalpa", department: "Francisco Morazán", reference: "Frente a pulpería", default: true }],
      createdAt: "2024-02-15"
    },
    {
      id: "cust2", name: "Roberto Díaz", email: "roberto@email.com", phone: "8877-3344",
      whatsapp: "8877-3344", password: "pass123", active: true,
      addresses: [{ id: "addr2", name: "Oficina", address: "Blvd. Morazán, Edif. 5", city: "San Pedro Sula", department: "Cortés", reference: "Junto a banco Atlántida", default: true }],
      createdAt: "2024-03-10"
    }
  ],

  orders: [
    {
      id: "ord1", customerId: "cust1", items: [
        { bookId: "bk1", quantity: 1, price: 299 },
        { bookId: "bk4", quantity: 2, price: 150 }
      ],
      subtotal: 599, shipping: 50, discount: 0, total: 649,
      status: "delivered", paymentMethod: "pm1", deliveryMethod: "dm1",
      shippingAddress: { address: "Col. Los Robles, 3ra Ave", city: "Tegucigalpa", department: "Francisco Morazán", reference: "Frente a pulpería" },
      notes: "", adminNotes: "", createdAt: "2024-03-20", updatedAt: "2024-03-23"
    },
    {
      id: "ord2", customerId: "cust2", items: [
        { bookId: "bk7", quantity: 1, price: 275 },
        { bookId: "bk12", quantity: 1, price: 310 }
      ],
      subtotal: 585, shipping: 80, discount: 0, total: 665,
      status: "confirmed", paymentMethod: "pm2", deliveryMethod: "dm1",
      shippingAddress: { address: "Blvd. Morazán, Edif. 5", city: "San Pedro Sula", department: "Cortés", reference: "Junto a banco Atlántida" },
      notes: "Envío urgente por favor", adminNotes: "", createdAt: "2024-04-01", updatedAt: "2024-04-01"
    },
    {
      id: "ord3", customerId: "cust1", items: [
        { bookId: "bk11", quantity: 1, price: 399 },
        { bookId: "bk16", quantity: 1, price: 420 }
      ],
      subtotal: 819, shipping: 50, discount: 0, total: 869,
      status: "preparing", paymentMethod: "pm4", deliveryMethod: "dm2",
      shippingAddress: { address: "Col. Los Robles, 3ra Ave", city: "Tegucigalpa", department: "Francisco Morazán", reference: "" },
      notes: "", adminNotes: "Cliente VIP", createdAt: "2024-04-05", updatedAt: "2024-04-05"
    }
  ],

  contactMessages: [
    {
      id: "msg1", name: "Pedro Suárez", email: "pedro@email.com",
      phone: "7766-5544", subject: "Consulta sobre envíos",
      message: "¿Realizan envíos a Comayagua? ¿Cuál sería el costo?",
      status: "unread", createdAt: "2024-04-03"
    }
  ],

  inventory: [
    { id: "inv1", bookId: "bk1", type: "initial", quantity: 50, previousStock: 0, newStock: 50, note: "Stock inicial", userId: "admin1", createdAt: "2024-01-15" },
    { id: "inv2", bookId: "bk1", type: "sale", quantity: -5, previousStock: 50, newStock: 45, note: "Venta", userId: "admin1", createdAt: "2024-03-20" },
    { id: "inv3", bookId: "bk10", type: "initial", quantity: 100, previousStock: 0, newStock: 100, note: "Stock inicial", userId: "admin1", createdAt: "2024-01-05" },
    { id: "inv4", bookId: "bk10", type: "sale", quantity: -20, previousStock: 100, newStock: 80, note: "Ventas del mes", userId: "admin2", createdAt: "2024-03-25" },
    { id: "inv5", bookId: "bk18", type: "initial", quantity: 25, previousStock: 0, newStock: 25, note: "Stock inicial", userId: "admin1", createdAt: "2024-02-28" },
    { id: "inv6", bookId: "bk18", type: "sale", quantity: -25, previousStock: 25, newStock: 0, note: "Agotado por ventas", userId: "admin3", createdAt: "2024-04-02" }
  ],

  notifications: [
    { id: "notif1", type: "new_order", message: "Nuevo pedido #ORD-003 recibido", read: false, createdAt: "2024-04-05" },
    { id: "notif2", type: "low_stock", message: "Stock bajo: Inteligencia Artificial (12 unidades)", read: false, createdAt: "2024-04-04" },
    { id: "notif3", type: "out_of_stock", message: "Agotado: Matemáticas para Todos", read: true, createdAt: "2024-04-02" },
    { id: "notif4", type: "new_customer", message: "Nuevo cliente registrado: Roberto Díaz", read: true, createdAt: "2024-03-10" },
    { id: "notif5", type: "contact", message: "Nuevo mensaje de contacto de Pedro Suárez", read: false, createdAt: "2024-04-03" }
  ]
};

function initializeData() {
  if (!localStorage.getItem('bookstore_initialized')) {
    localStorage.setItem('bookstore_config', JSON.stringify(SEED_DATA.config));
    localStorage.setItem('bookstore_categories', JSON.stringify(SEED_DATA.categories));
    localStorage.setItem('bookstore_genres', JSON.stringify(SEED_DATA.genres));
    localStorage.setItem('bookstore_authors', JSON.stringify(SEED_DATA.authors));
    localStorage.setItem('bookstore_publishers', JSON.stringify(SEED_DATA.publishers));
    localStorage.setItem('bookstore_books', JSON.stringify(SEED_DATA.books));
    localStorage.setItem('bookstore_pages', JSON.stringify(SEED_DATA.pages));
    localStorage.setItem('bookstore_shippingZones', JSON.stringify(SEED_DATA.shippingZones));
    localStorage.setItem('bookstore_paymentMethods', JSON.stringify(SEED_DATA.paymentMethods));
    localStorage.setItem('bookstore_deliveryMethods', JSON.stringify(SEED_DATA.deliveryMethods));
    localStorage.setItem('bookstore_promotions', JSON.stringify(SEED_DATA.promotions));
    localStorage.setItem('bookstore_adminUsers', JSON.stringify(SEED_DATA.adminUsers));
    localStorage.setItem('bookstore_customers', JSON.stringify(SEED_DATA.customers));
    localStorage.setItem('bookstore_orders', JSON.stringify(SEED_DATA.orders));
    localStorage.setItem('bookstore_contactMessages', JSON.stringify(SEED_DATA.contactMessages));
    localStorage.setItem('bookstore_inventory', JSON.stringify(SEED_DATA.inventory));
    localStorage.setItem('bookstore_notifications', JSON.stringify(SEED_DATA.notifications));
    localStorage.setItem('bookstore_initialized', 'true');
  }
}

function getData(key) {
  const data = localStorage.getItem('bookstore_' + key);
  return data ? JSON.parse(data) : null;
}

function setData(key, value) {
  localStorage.setItem('bookstore_' + key, JSON.stringify(value));
  if (typeof Cloud !== 'undefined' && Cloud.enabled()) Cloud.onLocalWrite(key);
}

function resetData() {
  localStorage.clear();
  initializeData();
}
