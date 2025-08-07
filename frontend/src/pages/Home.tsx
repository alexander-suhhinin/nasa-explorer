import Hero from '../components/Hero';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-gray-800 text-white flex flex-col">
      <section className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
        <Hero />
        <button
          className="mt-10 px-8 py-4 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => navigate('/dashboard')}
        >
          🚀 Explore the Dashboard →
        </button>
      </section>
      <footer className="py-4 text-center text-sm text-slate-400">
        Powered by NASA Open APIs. This is a demo project.
      </footer>
    </main>
  );
}
