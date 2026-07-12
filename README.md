# 🛡️ CyberWatch

Dashboard de vulnerabilidades CVE construido con React 19, que consume la API pública de la NVD (National Vulnerability Database - NIST) para buscar, filtrar y guardar vulnerabilidades de seguridad como favoritas.

> 📸 *Capturas de pantalla disponibles próximamente — proyecto en desarrollo activo.*

## ✨ Características

- 🔍 Búsqueda de CVEs por palabra clave con auto-búsqueda (debounce) y búsqueda manual
- 🎯 Filtrado por nivel de severidad (Crítica, Alta, Media, Baja)
- 📄 Vista de detalle completa por CVE (score, descripción, fechas, vector de ataque)
- ⭐ Sistema de favoritos persistente con `localStorage`
- 🔔 Notificaciones toast de feedback al usuario
- 💀 Skeleton loading mientras cargan los datos
- 📱 Diseño responsive (mobile-first)
- ♿ Accesible: navegación por teclado, `aria-*`, foco visible

## 🛠️ Tecnologías

- **React 19** + **Vite**
- **React Router DOM** — enrutado SPA
- **React Hook Form** — gestión y validación de formularios
- **Context API** — estado global (favoritos, toasts)
- **CSS Modules** — estilos con scope local
- **NVD REST API 2.0** — fuente de datos de vulnerabilidades
- **ESLint** — calidad de código

## 🚀 Instalación

```bash
git clone https://github.com/rubenferbu/CyberWatch.git
cd cyberwatch
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173`.

### Variable de entorno opcional

Para aumentar el límite de peticiones a la NVD API (de 5 a 50 peticiones cada 30 segundos), crea un archivo `.env` en la raíz:

```
VITE_NVD_API_KEY=tu_api_key_aqui
```

Puedes solicitar una key gratuita en [nvd.nist.gov/developers/request-an-api-key](https://nvd.nist.gov/developers/request-an-api-key).

## 📜 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | Ejecuta ESLint sobre el proyecto |

## 🏗️ Arquitectura

```
src/
├── assets/          # Recursos estáticos (imágenes, iconos)
├── components/       # UI reutilizable (Card, Badge, Navbar, SearchBar, FavoriteButton...)
├── pages/            # Vistas conectadas a rutas (Home, CveDetail, Dashboard, NotFound)
├── hooks/             # Custom Hooks (useFetch, useDebounce, useFavorites, useToast)
├── context/           # Estado global (FavoritesContext, ToastContext)
├── services/          # Llamadas a la API de la NVD y normalización de datos
├── styles/            # Reset CSS y variables globales de diseño
├── utils/             # Funciones puras auxiliares
├── App.jsx            # Configuración de rutas y providers
├── main.jsx           # Punto de entrada de la aplicación
└── index.css          # Estilos globales e imports del sistema de diseño
```

### Decisiones clave

- **CSS Modules** en vez de Styled Components, por mejor rendimiento: CSS estático compilado en build time, sin overhead de runtime.
- **Capa `services/` aislada**: ningún componente hace `fetch` directamente; todas las llamadas pasan por `nvdApi.js`, que además normaliza la respuesta cruda de la NVD (con sus 3 versiones de CVSS: v2, v3.0 y v3.1, priorizando siempre la métrica marcada como `Primary`) a un formato simple y predecible.
- **Dos Contexts separados** (`Favorites`, `Toast`) en vez de uno solo, siguiendo responsabilidad única: uno gestiona datos persistentes, el otro UI transitoria.
- **`React.memo`** aplicado en `Card` y `FavoriteButton` para evitar renders innecesarios cuando el componente padre se re-renderiza por motivos ajenos a sus props.

## 🔮 Mejoras futuras

- [ ] Toggle de tema claro/oscuro
- [ ] Paginación real de resultados (actualmente limitado a 20 por búsqueda)
- [ ] Ordenamiento de favoritos por severidad/fecha (candidato a `useMemo`)
- [ ] Tests unitarios con Vitest + React Testing Library
- [ ] Exportar favoritos a PDF/CSV
- [ ] Capturas de pantalla y demo en vivo (GitHub Pages / Vercel)

## 👤 Autor

**Rubén Fernández Buzón**
- GitHub: [@rubenferbu](https://github.com/rubenferbu)
- LinkedIn: [rubenfernandezbuzon](https://linkedin.com/in/rubenfernandezbuzon)
- Email: rubenferbu@gmail.com

---

*Proyecto desarrollado como parte del bootcamp de desarrollo full-stack The Powerd.*