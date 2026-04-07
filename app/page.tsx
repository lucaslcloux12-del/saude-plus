"use client";
import { useState, useEffect } from "react";
import { auth, googleProvider, db } from "@/lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(0);
  const [title, setTitle] = useState("");
  const [titleHistory, setTitleHistory] = useState<string[]>([]);
  const [dailyMissions, setDailyMissions] = useState<any[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        const userDoc = doc(db, "users", u.uid);
        onSnapshot(userDoc, (snap) => {
          if (snap.exists()) {
            const data = snap.data();
            setXp(data.xp || 0);
            setLevel(data.level || 0);
            setTitle(data.title || "Iniciante");
            setTitleHistory(data.titleHistory || []);
            setPhotos(data.photos || []);
          }
        });
      }
    });
  }, []);

  const loginGoogle = () => signInWithPopup(auth, googleProvider);

  const addXp = async (amount: number) => {
    if (!user) return;
    const newXp = xp + amount;
    const newLevel = Math.floor(newXp / 100);
    const newTitle = calculateTitle(newLevel);

    await setDoc(doc(db, "users", user.uid), {
      xp: newXp,
      level: newLevel,
      title: newTitle,
      titleHistory: [...titleHistory, newTitle],
      photos: photos,
    }, { merge: true });
  };

  const calculateTitle = (lvl: number) => {
    if (lvl < 5) return "Iniciante";
    if (lvl < 15) return "Tanquinho em Formação";
    if (lvl < 30) return "Abdômen Definido";
    if (lvl < 50) return "Atleta Fitness";
    if (lvl < 70) return "Rosto Magro";
    return "Deus Grego";
  };

  useEffect(() => {
    setDailyMissions([
      { text: "Treinar abdominal 20 min", xp: 150 },
      { text: "Beber 3 litros de água", xp: 80 },
    ]);
  }, []);

  const takePhoto = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const newPhotos = [...photos, reader.result as string];
        setPhotos(newPhotos);
        if (user) setDoc(doc(db, "users", user.uid), { photos: newPhotos }, { merge: true });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black flex flex-col items-center justify-center">
        <h1 className="text-7xl font-black tracking-tighter text-emerald-400">SAÚDE PLUS</h1>
        <button onClick={loginGoogle} className="mt-12 bg-white text-black px-12 py-6 rounded-3xl text-2xl font-medium hover:scale-105 transition-transform">Entrar com Google</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="p-6 flex justify-between items-center border-b border-emerald-500/20">
        <h1 className="text-3xl font-bold text-emerald-400">Saúde Plus</h1>
        <button onClick={() => signOut(auth)} className="text-emerald-400 text-sm">Sair</button>
      </div>

      <div className="p-6">
        <div className="bg-zinc-900 rounded-3xl p-6">
          <div className="flex justify-between text-sm text-emerald-300">
            <span>Nível {level}</span>
            <span>{title}</span>
          </div>
          <div className="mt-4 h-2 bg-zinc-800 rounded-full">
            <div className="h-2 bg-emerald-400 rounded-full w-3/4 transition-all"></div>
          </div>
          <p className="text-xs mt-2 text-emerald-200">{xp} XP</p>
        </div>
      </div>

      <div className="px-6">
        <button onClick={takePhoto} className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 rounded-3xl text-xl font-medium transition-all">Registrar Glow Up (Câmera)</button>
      </div>

      <div className="px-6 mt-8">
        <h2 className="text-emerald-400 text-lg mb-4">Galeria de Glow Up</h2>
        <div className="grid grid-cols-3 gap-3">
          {photos.map((photo, i) => (
            <img key={i} src={photo} className="rounded-2xl aspect-square object-cover" />
          ))}
        </div>
      </div>

      <div className="px-6 mt-10">
        <h2 className="text-emerald-400 text-lg mb-4">Missões Diárias</h2>
        {dailyMissions.map((mission, i) => (
          <div key={i} className="bg-zinc-900 rounded-3xl p-6 mb-4 flex justify-between items-center">
            <span>{mission.text}</span>
            <button onClick={() => addXp(mission.xp)} className="bg-emerald-600 px-6 py-2 rounded-2xl text-sm">+{mission.xp} XP</button>
          </div>
        ))}
      </div>

      {/* SEPARAÇÃO CLARA PARA CADA MÚSCULO */}
      <div className="px-6 mt-10">
        <h2 className="text-emerald-400 text-lg mb-6">Treinos por Músculo</h2>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-medium mb-3">Abdominal - Tanquinho</h3>
            <button onClick={() => router.push("/treinos/abdominal")} className="w-full bg-zinc-900 hover:bg-emerald-900 p-8 rounded-3xl text-left transition-all">Treinar abdominal</button>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">Peito Definido</h3>
            <button onClick={() => router.push("/treinos/peito")} className="w-full bg-zinc-900 hover:bg-emerald-900 p-8 rounded-3xl text-left transition-all">Treinar peito</button>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">Coxas e Pernas</h3>
            <button onClick={() => router.push("/treinos/coxas")} className="w-full bg-zinc-900 hover:bg-emerald-900 p-8 rounded-3xl text-left transition-all">Treinar coxas</button>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">Canela e Panturrilha</h3>
            <button onClick={() => router.push("/treinos/canela")} className="w-full bg-zinc-900 hover:bg-emerald-900 p-8 rounded-3xl text-left transition-all">Treinar canela</button>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">Rosto Magro - Murchar a cara</h3>
            <button onClick={() => router.push("/treinos/rosto")} className="w-full bg-zinc-900 hover:bg-emerald-900 p-8 rounded-3xl text-left transition-all">Exercícios faciais</button>
          </div>

          <div>
            <h3 className="text-xl font-medium mb-3">Emagrecimento Geral</h3>
            <button onClick={() => router.push("/treinos/emagrecimento")} className="w-full bg-zinc-900 hover:bg-emerald-900 p-8 rounded-3xl text-left transition-all">Métodos de emagrecimento total</button>
          </div>
        </div>
      </div>
    </div>
  );
}
