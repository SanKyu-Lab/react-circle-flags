export default function AppBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-noise opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-30">
        <div
          className="absolute w-3 h-3 rounded-full bg-(--flag-blue) animate-orbit"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute w-2 h-2 rounded-full bg-(--flag-red) animate-orbit"
          style={{ animationDelay: '-5s', animationDuration: '15s' }}
        />
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-(--flag-gold) animate-orbit"
          style={{ animationDelay: '-10s', animationDuration: '18s' }}
        />
      </div>
    </>
  )
}
