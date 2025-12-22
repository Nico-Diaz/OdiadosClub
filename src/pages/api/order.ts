import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  // 1. Recibimos los datos del frontend
  const body = await request.json();
  const { items } = body;

  // 2. Aquí iría la lógica "real" (guardar en base de datos, enviar email, etc.)
  // Por ahora, simularemos un proceso de backend:
  console.log("--------------------------------");
  console.log(" NUEVO PEDIDO RECIBIDO ");
  console.log(items);
  console.log("--------------------------------");

  // Simulamos un pequeño delay como si procesara el pago
  await new Promise(resolve => setTimeout(resolve, 1000));

  const orderId = Math.floor(Math.random() * 10000);

  // 3. Respondemos al frontend
  return new Response(JSON.stringify({
    success: true,
    message: "Pedido procesado correctamente",
    orderId: orderId
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}