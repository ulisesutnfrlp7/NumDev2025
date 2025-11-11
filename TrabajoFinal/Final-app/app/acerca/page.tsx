import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Target, Users, FlaskConical } from "lucide-react";

// Este componente no necesita "use client" ya que no usa hooks (a menos que añadas interactividad)

// Componente de perfil de equipo reutilizable
const TeamMemberCard: React.FC<{ name: string; title: string; focus: string; icon: React.ReactNode }> = ({ name, title, focus, icon }) => (
    <Card className="bg-slate-800/50 border-slate-700 text-center transition duration-300 hover:border-cyan-500/50">
        <CardContent className="pt-6">
            {/* Icono del rol */}
            <div className="mx-auto bg-slate-700/50 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-cyan-400">
                {icon}
            </div>
            <h4 className="text-xl font-bold text-slate-100">{name}</h4>
            <p className="text-sm text-cyan-400 mb-2">{title}</p>
            <p className="text-sm text-slate-400">{focus}</p>
        </CardContent>
    </Card>
);

export default function AboutPage() {
  return (
    // Usa la clase 'min-h-screen' para asegurar que el contenido ocupe toda la altura.
    <div className="min-h-screen bg-slate-900 text-slate-200">
      
      <main className="container mx-auto px-4 py-16 space-y-16 max-w-7xl">
        
        {/* 1. HERO - MISIÓN Y VISIÓN */}
        <section className="text-center max-w-4xl mx-auto border-b border-slate-700 pb-12">
          <h2 className="text-5xl font-extrabold text-cyan-400 mb-4">
            Impulsando el Futuro Móvil
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Nuestra misión es transformar la **analítica móvil** de un reporte retrospectivo a una herramienta de **planificación prospectiva** validada. Ayudamos a tomar decisiones de inversión y desarrollo con la confianza de la ciencia de datos.
          </p>
          <Link href="/simulador" passHref>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-lg px-8 py-6">
              <Zap className="w-5 h-5 mr-2" />
              Acceder a nuestro Simulador
            </Button>
          </Link>
        </section>

        {/* 2. NUESTRA TECNOLOGÍA / MODELO */}
        <section>
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-cyan-400 flex items-center gap-2">
                <FlaskConical className="w-6 h-6" /> Nuestro Modelo Científico: LS y Clústeres
              </CardTitle>
              <CardDescription className="text-slate-400">
                La precisión es el resultado de la segmentación rigurosa y el rigor matemático.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6 pt-4">
              <div>
                <h4 className="text-xl font-semibold text-slate-100 mb-2">Regresión por Mínimos Cuadrados (LS)</h4>
                <p className="text-slate-400">
                  Utilizamos un modelo de regresión LS, **el estándar de oro** para estimaciones lineales, optimizado para **minimizar el error cuadrático**. Esto garantiza proyecciones de crecimiento estables y confiables en el tiempo.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-slate-100 mb-2">Análisis de Clústeres Segmentados (País x Tipo)</h4>
                <p className="text-slate-400">
                  Nuestro modelo calibra los coeficientes LS de forma independiente para **6 clústeres únicos** (3 Países $\times$ 2 Tipos de Aplicación). Esta segmentación asegura que las proyecciones reflejen las dinámicas y las tasas de adopción de cada nicho.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 3. EQUIPO FUNDADOR (Ficticio) */}
        <section>
          <h2 className="text-4xl font-extrabold text-center text-slate-100 mb-10 flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-cyan-400" />
            El Equipo Detrás del Algoritmo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <TeamMemberCard
              name="Dr. Elias Vance"
              title="CEO & Lead Data Scientist"
              focus="Experto en modelado predictivo y validación de datasets. Arquitecto del motor LS."
              icon={<FlaskConical className="w-8 h-8" />}
            />
            
            <TeamMemberCard
              name="Ava Sharma"
              title="Chief Product Officer (CPO)"
              focus="Especialista en estrategia móvil y ROI. Enfocada en la utilidad comercial de las proyecciones."
              icon={<Target className="w-8 h-8" />}
            />

            <TeamMemberCard
              name="Ben Carter"
              title="Chief Technology Officer (CTO)"
              focus="Responsable de la escalabilidad de la plataforma Next.js/Node.js y la seguridad de la data."
              icon={<Zap className="w-8 h-8" />}
            />

          </div>
        </section>

      </main>

      {/* El Footer se renderiza a través de app/layout.tsx */}
    </div>
  );
}