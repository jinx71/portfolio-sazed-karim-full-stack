// Ambient colour field: three slowly drifting blurred blobs plus a panning
// gradient wash. Purely decorative, so it's aria-hidden and respects
// reduced-motion via the global CSS rule that neutralises animations.
export default function AnimatedBackground() {
  return (
    <div aria-hidden className='pointer-events-none fixed inset-0 -z-10 overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-paper via-paper to-paper-2' />
      <div className='absolute -left-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-indigo to-fuchsia opacity-20 blur-3xl animate-float' />
      <div
        className='absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-teal to-emerald opacity-20 blur-3xl animate-float'
        style={{ animationDelay: '2.5s' }}
      />
      <div
        className='absolute bottom-0 left-1/3 h-[24rem] w-[24rem] rounded-full bg-gradient-to-br from-pink to-amber opacity-20 blur-3xl animate-float'
        style={{ animationDelay: '5s' }}
      />
    </div>
  );
}
