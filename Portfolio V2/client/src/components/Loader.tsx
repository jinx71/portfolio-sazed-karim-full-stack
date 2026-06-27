// Lightweight inline loader with a colourful spinner.
export default function Loader({ label = 'Loading' }: { label?: string }) {
  return (
    <div className='flex flex-col items-center justify-center gap-4 py-24'>
      <span className='h-10 w-10 rounded-full border-4 border-line border-t-violet animate-spin' />
      <p className='font-mono text-xs uppercase tracking-[0.16em] text-muted'>{label}…</p>
    </div>
  );
}
