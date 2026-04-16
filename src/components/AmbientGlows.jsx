export default function AmbientGlows({ theme, isDark }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000">
      <div className={`absolute top-[-10%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] ${isDark ? 'bg-violet-600' : 'bg-blue-400'} ${theme.glow} blur-[120px] rounded-full`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] ${isDark ? 'bg-fuchsia-600' : 'bg-indigo-300'} ${theme.glow} blur-[120px] rounded-full`} />
    </div>
  );
}
