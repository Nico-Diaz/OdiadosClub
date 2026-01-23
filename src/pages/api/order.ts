import type { APIRoute } from 'astro';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { items } = body; // Solo recibimos los items, el total lo calculamos nosotros

    // 1. Autenticación con Google
    // Limpiamos la clave privada para evitar errores con los saltos de línea (\n)
    const privateKey = import.meta.env.GOOGLE_PRIVATE_KEY
      ? import.meta.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : undefined;

    const serviceAccountAuth = new JWT({
      email: import.meta.env.GOOGLE_CLIENT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(import.meta.env.GOOGLE_SHEET_ID, serviceAccountAuth);

    // 2. Cargar hoja
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // La primera hoja del Excel

    // 3. Crear datos del pedido
    const orderId = `OD-${Math.floor(Math.random() * 10000)}`;
    // Hora argentina
    const date = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
    
    // --- CÁLCULO DEL TOTAL (BACKEND) ---
    // Calculamos el precio aquí para que sea seguro y no llegue vacío
    const calculatedTotal = items.reduce((acc: number, item: any) => {
        return acc + (Number(item.price) * Number(item.quantity));
    }, 0);

    // Formatear la lista de productos
    const itemsDetail = items.map((i: any) => `${i.quantity}x ${i.name}`).join('\n');

    // 4. Guardar en Excel (Método Array para evitar errores de nombres)
    // Orden: Columna A, Columna B, Columna C, Columna D, Columna E
    await sheet.addRow([
      orderId,
      date,
      itemsDetail,
      `$${calculatedTotal}`, // Guardamos el total calculado
      'Pendiente'
    ]);

    // 5. Crear link de WhatsApp
    const myPhone = "5492615084928"; 
    
    // Usamos \n para los saltos de línea
    const message = 
      ` *NUEVO PEDIDO BLACKLIST* \n\n` +
      `Hola Odiados! Quiero confirmar mi orden *#${orderId}*.\n\n` +
      ` *EL MENÚ ELEGIDO:*\n` +
      `-----------------------------------\n` +
      `${itemsDetail}\n` +
      `-----------------------------------\n\n` +
      ` *TOTAL FINAL: $${calculatedTotal}*\n\n` +
      ` _Espero confirmación para enviar mi ubicación._`;

    const whatsappUrl = `https://wa.me/${myPhone}?text=${encodeURIComponent(message)}`;

    return new Response(JSON.stringify({ 
      success: true, 
      redirectUrl: whatsappUrl 
    }), { status: 200 });

  } catch (error) {
    console.error('Error Backend:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Error interno al procesar pedido' 
    }), { status: 500 });
  }
}