export const PLAN_LEVEL = {
  esencial: 1,
  plus: 2,
  premium: 3,
  luxe: 4,
};

export const formatMoney = (amount) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(amount);

export const PLANS = {
  boda: [
    {
      id: "esencial",
      name: "Esencial",
      price: 400,
      number: "01",
      tagline: "La esencia de tu celebración",
      description:
        "Todo lo necesario para compartir su gran día con un diseño hecho especialmente para ustedes.",
      featured: false,
      inheritedFrom: null,
      features: [
        "Diseño totalmente personalizado",
        "Fotografía de portada",
        "Música de fondo personalizada",
        "Información de los padres",
        "Fecha, hora y ubicación con Google Maps",
        "Código de vestimenta",
        "Itinerario del evento",
        "Confirmación de asistencia por WhatsApp",
      ],
      note: "Ideal para una invitación elegante y funcional.",
    },
    {
      id: "plus",
      name: "Plus",
      price: 650,
      number: "02",
      tagline: "Más detalles, más emoción",
      description:
        "Una experiencia con música y detalles que hacen más especial cada momento.",
      featured: true,
      badge: "Recomendado",
      inheritedFrom: "Esencial",
      features: [
        "Mesa de regalos o datos para obsequios",
        "Cuenta regresiva",
        "Confirmación por WhatsApp o Excel",
        "Imagen Final",
      ],
      note: "Se elige una modalidad de confirmación.",
    },
    {
      id: "premium",
      name: "Premium",
      price: 950,
      number: "03",
      tagline: "Recuerdos para compartir",
      description:
        "Una invitación completa que integra fotografías y recuerdos de su celebración.",
      featured: false,
      inheritedFrom: "Plus",
      features: [
        "Galería o carrusel de fotografías",
        "Álbum compartido de invitados",
        "Confirmación por WhatsApp, Excel o ambas",
      ],
      note: "Puedes utilizar ambas modalidades de confirmación.",
    },
    {
      id: "luxe",
      name: "Luxe",
      price: 1450,
      number: "04",
      tagline: "Una experiencia extraordinaria",
      description:
        "Personalización avanzada para sorprender a sus invitados desde el primer momento.",
      featured: false,
      inheritedFrom: "Premium",
      features: [
        "Sobre interactivo personalizado",
        "Encuesta interactiva",
        "Generador de invitaciones individuales",
        "Nombre personalizado de cada invitado",
        "Número de pases asignados",
        "Confirmación con límite de pases",
      ],
      note: "Control personalizado de invitados y pases.",
    },
  ],

  xv: [
    {
      id: "esencial",
      name: "Esencial",
      price: 400,
      number: "01",
      tagline: "El comienzo de una celebración especial",
      description:
        "Una invitación personalizada para anunciar unos XV años inolvidables.",
      featured: false,
      inheritedFrom: null,
      features: [
        "Diseño totalmente personalizado",
        "Portada con fotografía y nombre de la quinceañera",
        "Música de fondo personalizada",
        "Información de padres y padrinos",
        "Fecha, hora y ubicación con Google Maps",
        "Código de vestimenta",
        "Itinerario del evento",
        "Confirmación de asistencia por WhatsApp",
      ],
      note: "Ideal para compartir todos los detalles de sus XV años.",
    },
    {
      id: "plus",
      name: "Plus",
      price: 650,
      number: "02",
      tagline: "Cada detalle cuenta",
      description:
        "Una invitación con música y detalles especiales para la quinceañera.",
      featured: true,
      badge: "Recomendado",
      inheritedFrom: "Esencial",
      features: [
        "Cuenta regresiva",
        "Mesa de regalos, depósito o lluvia de sobres",
        "Foto final o Frase final",
        "Confirmación por WhatsApp o Excel",
      ],
      note: "Se elige una modalidad de confirmación.",
    },
    {
      id: "premium",
      name: "Premium",
      price: 900,
      number: "03",
      tagline: "Recuerdos que permanecen",
      description:
        "Una experiencia especial para compartir fotografías y recuerdos de los XV años.",
      featured: false,
      inheritedFrom: "Plus",
      features: [
        "Galería o carrusel de fotografías",
        "Confirmación por WhatsApp, Excel o ambas",
      ],
      note: "Una invitación para disfrutar antes y después de la celebración.",
    },
    {
      id: "luxe",
      name: "Luxe",
      price: 1200,
      number: "04",
      tagline: "Una entrada inolvidable",
      description:
        "Una experiencia exclusiva con sobre interactivo e invitaciones personalizadas para cada invitado.",
      featured: false,
      inheritedFrom: "Premium",
      features: [
        "Sobre interactivo personalizado",
        "Álbum compartido de invitados",
        "Generador de invitaciones individuales",
        "Nombre personalizado de cada invitado o familia",
        "Número de pases asignados",
        "Confirmación con límite de pases",
      ],
      note: "Control personalizado de invitados y pases.",
    },
  ],
};

export const EXTRAS = [
  {
    id: "musica",
    titulo: "Música personalizada",
    precio: 80,
    descripcion:
      "Acompaña tu invitación con una canción especial durante la experiencia.",
    includedFrom: 2,
    category: "Experiencia",
  },
  {
    id: "mesa-regalos",
    titulo: "Mesa de regalos",
    precio: 80,
    descripcion:
      "Agrega tiendas de regalos, lluvia de sobres o información para obsequios.",
    includedFrom: 2,
    category: "Información",
  },
  {
    id: "cuenta-regresiva",
    titulo: "Cuenta regresiva",
    precio: 80,
    descripcion:
      "Muestra los días, horas y minutos que faltan para la celebración.",
    includedFrom: 2,
    category: "Experiencia",
  },
  {
    id: "galeria",
    titulo: "Galería de fotografías",
    precio: 150,
    descripcion:
      "Presenta tus fotografías favoritas en un carrusel elegante y adaptable.",
    includedFrom: 3,
    category: "Fotografías",
  },
  {
    id: "album",
    titulo: "Álbum compartido",
    precio: 200,
    descripcion:
      "Tus invitados podrán compartir fotografías de la celebración desde la invitación.",
    includedFrom: 3,
    category: "Fotografías",
  },
  {
    id: "encuesta",
    titulo: "Encuesta interactiva",
    precio: 150,
    descripcion:
      "Un juego de preguntas para descubrir cuánto conocen tus invitados a los novios.",
    includedFrom: 4,
    category: "Interactividad",
    availableFor: ["boda"],
  },
  {
    id: "sobre",
    titulo: "Sobre interactivo",
    precio: 250,
    descripcion:
      "Una apertura animada y personalizada para presentar tu invitación.",
    includedFrom: 4,
    category: "Experiencia",
  },
  {
    id: "control-invitados",
    titulo: "Invitaciones personalizadas y control de pases",
    precio: 350,
    descripcion:
      "Generador de enlaces individuales con nombre, pases asignados y límite de confirmación.",
    includedFrom: 4,
    category: "Invitados",
  },
  {
    id: "qr-general",
    titulo: "Código QR general",
    precio: 50,
    descripcion:
      "Un único código QR para compartir la invitación. No requiere control de invitados.",
    includedFrom: null,
    category: "Invitación",
  },
  {
    id: "qr",
    titulo: "Código QR personalizado por invitado",
    precio: 250,
    descripcion:
      "Un QR único por invitado o familia, vinculado a su nombre y pases asignados.",
    includedFrom: null,
    requires: "control-invitados",
    category: "Invitados",
  },
  {
    id: "bilingue",
    titulo: "Invitación bilingüe",
    precio: 300,
    descripcion: "Permite consultar la invitación en español o inglés.",
    includedFrom: null,
    category: "Personalización",
  },
  {
    id: "evento-adicional",
    titulo: "Ceremonia adicional",
    precio: 200,
    descripcion: "Incorpora otra ceremonia o sede dentro de la celebración.",
    includedFrom: null,
    category: "Información",
  },
  {
    id: "version-impresa",
    titulo: "Versión para imprimir",
    precio: 50,
    descripcion:
      "Recibe una versión estática de tu invitación preparada para impresión.",
    includedFrom: null,
    category: "Personalización",
  },
  {
    id: "hospedaje",
    titulo: "Recomendaciones de hospedaje",
    precio: 80,
    descripcion: "Agrega opciones de hospedaje y enlaces de ubicación.",
    includedFrom: null,
    category: "Información",
  },
  {
    id: "menu",
    titulo: "Selección de menú",
    precio: 200,
    descripcion:
      "Permite indicar preferencias de menú durante la confirmación.",
    includedFrom: null,
    category: "Invitados",
  },
  {
    id: "sugerencia-musica",
    titulo: "Sugerencias musicales",
    precio: 70,
    descripcion: "Permite a tus invitados proponer canciones para la fiesta.",
    includedFrom: null,
    category: "Interactividad",
  },
];

export const isIncluded = (extra, level) =>
  extra.includedFrom !== null && level >= extra.includedFrom;

export const isAvailable = (extra, eventType) =>
  !extra.availableFor || extra.availableFor.includes(eventType);

export function normalizeExtras(items = [], level = 0, eventType = "boda") {
  const ids = new Set(
    items
      .map((item) => item.id)
      .filter((id) => EXTRAS.some((extra) => extra.id === id)),
  );

  for (const extra of EXTRAS) {
    if (!isAvailable(extra, eventType) || isIncluded(extra, level)) {
      ids.delete(extra.id);
    }
  }

  if (ids.has("qr") && level < 4) {
    ids.add("control-invitados");
  }

  return EXTRAS.filter(
    (extra) =>
      ids.has(extra.id) &&
      isAvailable(extra, eventType) &&
      !isIncluded(extra, level),
  );
}
