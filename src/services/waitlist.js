import { supabase } from '../utils/supabase';

const TABLE = 'waitlist_emails';

export async function subscribeToWaitlist(email) {
  const normalizedEmail = email.trim().toLowerCase();

  const { error } = await supabase.from(TABLE).insert({ email: normalizedEmail });

  if (!error) {
    return { ok: true, alreadyRegistered: false };
  }

  if (error.code === '23505') {
    return { ok: true, alreadyRegistered: true };
  }

  console.error('[waitlist]', error);
  return {
    ok: false,
    message:
      error.code === '42P01'
        ? 'La tabla de emails aún no está creada en Supabase. Ejecutá el script SQL del proyecto.'
        : 'No pudimos guardar tu email. Intentá de nuevo en unos segundos.',
  };
}
