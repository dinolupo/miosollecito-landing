import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const source = formData.get('source') as string || 'unknown';

    // Validazione email
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Email non valida' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Log per debugging (in produzione useresti un database)
    console.log(`Nuova iscrizione beta: ${email} da ${source}`);

    // Qui potresti:
    // 1. Salvare in database (Supabase, PlanetScale, etc.)
    // 2. Inviare email di notifica (SendGrid, Resend, etc.)
    // 3. Aggiungere a mailing list (Mailchimp, ConvertKit, etc.)

    // Per ora simuliamo successo
    const timestamp = new Date().toISOString();
    
    // In futuro: invia email di notifica
    // await sendNotificationEmail(email, source, timestamp);

    // Redirect alla pagina grazie
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/grazie'
      }
    });

  } catch (error) {
    console.error('Errore signup:', error);
    
    return new Response(JSON.stringify({ error: 'Errore interno' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
