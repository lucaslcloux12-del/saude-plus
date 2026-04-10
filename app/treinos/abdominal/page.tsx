"use client";
import { useRouter } from "next/navigation";

export default function Abdominal() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <button onClick={() => router.back()} className="mb-6 text-emerald-400">← Voltar</button>
      
      <h1 className="text-4xl font-bold text-emerald-400 mb-8">Abdominal - Tanquinho</h1>
      
      <div className="bg-zinc-900 rounded-3xl p-6 mb-8">
        <h2 className="text-xl mb-4">Vídeo principal</h2>
        <iframe 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/5L2f3b8z0kE" 
          title="Treino abdominal" 
          frameBorder="0" 
          allowFullScreen
          className="rounded-2xl"
        ></iframe>
      </div>

      <div className="space-y-6">
        <div className="bg-zinc-900 rounded-3xl p-6">
          <h3 className="font-medium">Exercício 1: Prancha</h3>
          <p className="text-emerald-300 text-sm mt-2">3 séries de 30 segundos</p>
        </div>
        <div className="bg-zinc-900 rounded-3xl p-6">
          <h3 className="font-medium">Exercício 2: Abdominal crunch</h3>
          <p className="text-emerald-300 text-sm mt-2">4 séries de 15 repetições</p>
        </div>
      </div>
    </div>
  );
}
