import type { Social } from "@/lib/site-data";

type IconProps = { className?: string };

export function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M21.94 4.3 18.6 20.04c-.25 1.11-.91 1.39-1.85.86l-5.1-3.76-2.46 2.37c-.27.27-.5.5-1.02.5l.36-5.2 9.46-8.55c.41-.36-.09-.57-.64-.2L5.08 13.06.97 11.77c-1.13-.35-1.15-1.13.24-1.67l19.6-7.55c.94-.34 1.76.2 1.13 1.75Z" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  );
}

export function VkIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.2 17.27c-5.45 0-8.55-3.73-8.68-9.94h2.73c.09 4.56 2.1 6.49 3.7 6.89V7.33h2.57v3.95c1.58-.17 3.24-1.97 3.8-3.95h2.57c-.43 2.43-2.22 4.23-3.5 4.97 1.28.6 3.31 2.17 4.09 4.97h-2.83c-.6-1.88-2.11-3.34-4.13-3.54v3.54h-.32Z" />
    </svg>
  );
}

export function DiscordIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.32 4.37A19.8 19.8 0 0 0 15.45 3l-.24.45a18.3 18.3 0 0 1 4.32 1.4 16.7 16.7 0 0 0-14.94 0 18.3 18.3 0 0 1 4.32-1.4L8.55 3a19.8 19.8 0 0 0-4.87 1.37C.6 9.05-.2 13.6.2 18.08a19.9 19.9 0 0 0 6.07 3.06l.49-.67c-.92-.34-1.78-.76-2.55-1.28l.21-.16c4.9 2.27 10.2 2.27 15.04 0l.21.16c-.77.52-1.63.94-2.55 1.28l.49.67a19.9 19.9 0 0 0 6.07-3.06c.5-5.2-.82-9.71-3.36-13.71ZM8.02 15.33c-1.2 0-2.18-1.1-2.18-2.45 0-1.34.96-2.45 2.18-2.45 1.22 0 2.2 1.11 2.18 2.45 0 1.35-.96 2.45-2.18 2.45Zm8.07 0c-1.2 0-2.18-1.1-2.18-2.45 0-1.34.96-2.45 2.18-2.45 1.22 0 2.2 1.11 2.18 2.45 0 1.35-.96 2.45-2.18 2.45Z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}

export const socialIconMap: Record<
  Social["icon"],
  (props: IconProps) => React.ReactElement
> = {
  github: GithubIcon,
  telegram: TelegramIcon,
  youtube: YoutubeIcon,
  vk: VkIcon,
  discord: DiscordIcon,
  mail: MailIcon,
};
