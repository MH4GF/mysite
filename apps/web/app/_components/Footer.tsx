export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={`${className} flex border-t border-zinc-200 p-4 dark:border-zinc-600`}>
      <p className="text-xs leading-5 text-zinc-500 dark:text-zinc-400">
        &copy; 2024 Hirotaka Miyagi, All rights reserved.
      </p>
    </footer>
  );
};
