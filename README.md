#  Odiados Club - Blacklist Menu

> **"Hamburguesas canceladas, censuradas y deliciosas."**

Este proyecto es una Landing Page y Menú Digital interactivo para una hamburguesería con estética **Grunge / Underground**. No es solo una carta estática; incluye un sistema de carrito de compras en tiempo real y un backend serverless que registra pedidos en Google Sheets y redirige a WhatsApp.


##  Características

- **Diseño UI/UX Temático:** Estética "Blacklist" con tipografías góticas/display, texturas y paleta de colores agresiva (Rojo/Negro).
- **Mobile First:** Diseño optimizado para celulares (restricción visual a 900px en escritorio).
- **Carrito de Compras (State Management):** Gestión de estado global utilizando **Nano Stores** para persistencia de datos ligera.
- **Backend Integration:** API Endpoint en Astro (`SSR`) que conecta con **Google Sheets** para usarlo como base de datos.
- **WhatsApp Checkout:** Generación automática de mensajes pre-llenados con el detalle del pedido.

##  Tech Stack

- **Framework:** [Astro 5.0](https://astro.build/) (Server Side Rendering habilitado).
- **Lenguaje:** TypeScript.
- **Estilos:** CSS Variables (Custom Properties) & Fonts personalizadas.
- **Estado:** [Nano Stores](https://github.com/nanostores/nanostores).
- **Database/API:** Google Sheets API + `google-auth-library`.
- **Adapter:** Node.js.

##  Estructura del Proyecto

```bash
src/
├── components/
│   ├── menu/        # Tarjetas de productos y lógica de UI
│   ├── ui/          # Carrito flotante (FloatingCart) y badges
│   └── layout/      # Header y Footer
├── data/            # Datos estáticos del menú (JSON/TS)
├── layouts/         # Layout principal con restricciones CSS
├── pages/
│   ├── api/         # Endpoints de servidor (Google Sheets Logic)
│   └── index.astro  # Página principal
├── store/           # Lógica del carrito (Nano Stores)
└── styles/          # Variables CSS globales y fuentes
