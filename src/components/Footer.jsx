export default function Footer() {
  return (
    <footer className="bg-surface-container-highest dark:bg-surface-dim full-width relative border-t border-outline-variant/20">
      <div className="flex flex-col items-center gap-stack-md py-stack-lg w-full px-margin-mobile text-center">
        <div className="font-headline-lg text-headline-lg text-on-surface tracking-tighter">MI GUSTO</div>

        <div className="flex gap-stack-md">
          <a
            className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all"
            href="#"
          >
            Privacy
          </a>
          <a
            className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all"
            href="#"
          >
            Terms
          </a>
          <a
            className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all"
            href="#"
          >
            Contact
          </a>
        </div>

        <p className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant mt-stack-md">
          © 2024 MI GUSTO. UN GUSTO HECHO RITUAL.
        </p>
      </div>
    </footer>
  );
}
