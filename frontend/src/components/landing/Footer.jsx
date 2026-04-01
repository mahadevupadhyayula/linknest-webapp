export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 text-sm text-slate-500 sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} LinkNest. All rights reserved.</p>
        <p>Designed for teams that value focused goals and meaningful engagement.</p>
      </div>
    </footer>
  );
}
