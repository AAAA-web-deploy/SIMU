type IconProps = {
  className?: string;
};

export function XSocialIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14.7 10.3 22.4 1.5h-1.8l-6.7 7.6L8.2 1.5H1.6l8.1 11.5L1.6 22.5h1.8l7.1-8.1 5.7 8.1h6.6l-8.1-12.2Zm-2.5 2.9-.8-1.2-6.6-9.2h2.8l5.3 7.5.8 1.2 6.9 9.7h-2.8l-5.6-8Z"
      />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M21.8 4.3 18.6 20c-.2 1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.2.3-.5.5-.9.5l.3-4.7 8.6-7.8c.4-.3-.1-.5-.6-.2L6.9 14.3l-4.6-1.4c-1-.3-1-.9.2-1.4L20.2 3.2c.8-.3 1.6.2 1.6 1.1Z"
      />
    </svg>
  );
}
