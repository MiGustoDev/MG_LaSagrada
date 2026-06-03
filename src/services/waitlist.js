import { isSupabaseConfigured, supabase } from '../utils/supabase';

const TABLE = 'waitlist_emails';
const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

export async function subscribeToWaitlist(email) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return { ok: false, message: 'Ingresá un email válido (ejemplo@dominio.com).' };
  }

  if (!isSupabaseConfigured || !supabase) {
    return {
      ok: false,
      message: 'El sitio no está configurado para guardar emails. Contactá al equipo.',
    };
  }

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
        ? 'La tabla de emails aún no está creada. Ejecutá supabase_setup.sql en Supabase.'
        : error.code === '23514'
          ? 'Ingresá un email válido (ejemplo@dominio.com).'
          : error.code === '42501'
            ? 'Sin permiso para guardar. Ejecutá supabase_setup.sql en Supabase.'
            : 'No pudimos guardar tu email. Intentá de nuevo en unos segundos.',
  };
}
