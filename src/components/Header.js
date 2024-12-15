export default function Header({ title }) {
  return (
    <header className="bg-orange-500 text-white py-4 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
    </header>
  );
}
