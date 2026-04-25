'use client';

// Template stripped bare — the GlobalTransition overlay handles all route transitions.
// AnimatePresence mode="wait" was blocking rendering and causing blank frames.
export default function Template({ children }) {
  return <>{children}</>;
}
