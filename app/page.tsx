"use client";
import { useState, useEffect } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const loginGoogle = () => signInWithPopup(auth, googleProvider);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black flex flex-col items-center justify-center">
        <h1 className="text-7xl font-black tracking-tighter text-emerald-400">SAÚDE PLUS</h1>
        <button 
          onClick={loginGoogle} 
          className="mt-12 bg-white text-black px-12 py-6 rounded-3xl text-2xl font-medium hover:scale-105 transition-transform"
        >
          Entrar com Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-emerald-400">Bem-vindo, {user.email}</h1>
      <button onClick={() => signOut(auth)} className="mt-8 text-red-400">Sair</button>
      <p className="mt-8 text-emerald-300">App carregado com sucesso!</p>
    </div>
  );
}
