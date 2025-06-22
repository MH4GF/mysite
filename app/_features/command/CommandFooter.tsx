export const CommandFooter = () => {
  return (
    <div className="flex justify-end text-xs px-2 py-3 text-muted-foreground gap-2">
      <span>Actions</span>
      <span className="inline-flex gap-1">
        <kbd className="px-1 bg-muted rounded-xs">⌘</kbd>
        <kbd className="px-1 bg-muted rounded-xs">K</kbd>
      </span>
    </div>
  );
};
