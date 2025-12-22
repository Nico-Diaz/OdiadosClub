import type { APIRoute } from 'astro';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { items, total } = body;

    // 1. Autenticación con Google
    // Limpiamos la clave privada para evitar errores con los saltos de línea (\n)
    const privateKey = import.meta.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

    const serviceAccountAuth = new JWT({
      email: import.meta.env.GOOGLE_CLIENT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(import.meta.env.GOOGLE_SHEET_ID, serviceAccountAuth);

    // 2. Cargar hoja
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // La primera hoja del Excel

    // 3. Crear datos
    const orderId = `OD-${Math.floor(Math.random() * 10000)}`; // ID: OD-4521
    const date = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
    
    // Convertimos la lista de items en un texto bonito
    const itemsDetail = items.map((i: any) => `${i.quantity}x ${i.name}`).join('\n');

    // 4. Guardar en Excel (Asegúrate que tu Excel tenga estas columnas en la fila 1)
    await sheet.addRow({
      ID: orderId,
      Fecha: date,
      Detalle: itemsDetail,
      Total: total,
      Estado: 'Pendiente'
    });

    // 5. Crear link de WhatsApp
    // ¡CAMBIA ESTE NÚMERO POR EL TUYO!
    const myPhone = "5491100000000"; 
    const message = `Hola Odiados! Pedido *${orderId}*.\n\n${itemsDetail}\n\n*Total: $${total}*`;
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