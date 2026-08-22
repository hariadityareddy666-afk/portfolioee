export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="animate-blob absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-indigo/25 blur-[140px]" />
      <div
        className="animate-blob absolute -right-32 top-1/4 h-[32rem] w-[32rem] rounded-full bg-cyan/20 blur-[130px]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="animate-blob absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-[150px]"
        style={{ animationDelay: "-14s" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background" />
    </div>
  );
}
