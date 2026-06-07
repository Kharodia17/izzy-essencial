export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="w-10 h-10 border-4 border-surface-container-high border-t-primary rounded-full animate-spin" />
    </div>
  );
}
