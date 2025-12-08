export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer
      className={`${className} flex flex-col border-zinc-200 border-t p-4 dark:border-zinc-600`}
    >
      <div className="bg-red-500 text-white text-2xl font-bold p-4 mb-2">
        DEBUG: VRT SHOULD FAIL
      </div>
      <p className="text-xs text-zinc-500 leading-5 dark:text-zinc-400">
        &copy; 2024 Hirotaka Miyagi, All rights reserved.
      </p>
    </footer>
  );
};
