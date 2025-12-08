export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={`${className} flex border-zinc-200 border-t p-4 dark:border-zinc-600`}>
      <p className="text-xs text-zinc-500 leading-5 dark:text-zinc-400">
        &copy; 2024 Hirotaka Miyagi, All rights reserved.
      </p>
    </footer>
  );
};
