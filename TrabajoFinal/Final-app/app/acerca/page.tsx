import React from 'react';
// import Link from 'next/link'; // Eliminado: Causa error de compilación
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Zap, Target, Users, FlaskConical, Handshake, Lock, Lightbulb, TrendingUp, Cpu, DollarSign } from "lucide-react";

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

// Componente para los pilares
const PillarCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <Card className="bg-slate-800/50 border-slate-700 transition duration-300 hover:shadow-cyan-500/30 hover:shadow-xl">
        <CardHeader className="flex flex-row items-center space-x-4">
            <div className="text-cyan-400">{icon}</div>
            <CardTitle className="text-xl font-bold text-slate-100">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-slate-400 text-sm">{description}</p>
        </CardContent>
    </Card>
);


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      
      <main className="container mx-auto px-4 py-16 space-y-20 max-w-7xl">
        
        {/* 1. HERO - MISIÓN E HISTORIA */}
        <section className="text-center max-w-4xl mx-auto border-b border-slate-700 pb-12">
          <h2 className="text-5xl font-extrabold text-cyan-400 mb-4 tracking-tight">
            De la Incertidumbre a la Certeza 
          </h2>
          <p className="text-xl text-slate-300 mb-6">
            En 2009, observamos cómo el boom de las aplicaciones móviles generaba una montaña de datos, pero pocos sabían cómo escalarla. Los equipos estaban a oscuras sobre por qué los usuarios se iban o qué características realmente generaban valor.
          </p>
          <p className="text-xl font-light text-slate-400 mb-8">
            MobileMetrics Analytics nació para ir más allá de las métricas superficiales. Hoy, con más de <strong>500 clientes y 16 años de experiencia</strong>, aseguramos que cada decisión sobre tu producto móvil esté <strong>100% respaldada por datos</strong>.
          </p>
          
          <a 
            href="/simulador" 
            className="inline-flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-slate-50 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-cyan-500/50 transition-all font-semibold"
          >
            <Zap className="w-5 h-5 mr-2" />
            Proyectá tu futuro con nuestro simulador
          </a>
        </section>

        {/* 1.5. CLIENTES DESTACADOS - NUEVA SECCIÓN */}
        <section className="bg-slate-800/30 py-10 rounded-xl">
            <h3 className="text-2xl font-bold text-center text-slate-100 mb-8">
                Confianza de Líderes Globales
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 px-4">
                {/* Logo Clash Royale */}
                <img 
                    src="/Clash-Royale-Logo.png" 
                    alt="Logo de Clash Royale"
                    className="h-10 sm:h-30 object-contain"
                />
                {/* Logo Clash of Clans */}
                <img 
                    src="/Clash-of-Clans-logo.png" 
                    alt="Logo de Clash Royale"
                    className="h-10 sm:h-30 object-contain"
                />
                {/* Logo ESPN */}
                <img 
                    src="/ESPN_logos.png" 
                    alt="Logo de ESPN"
                    className="h-10 sm:h-30 object-contain"
                />
                {/* Logo Fox News */}
                <img 
                    src="/Fox-News-logo.png" 
                    alt="Logo de Fox News"
                    className="h-10 sm:h-30 object-contain"
                />
            </div>
            <p className="text-center text-sm text-slate-400 mt-8 max-w-3xl mx-auto">
                Nuestro enfoque basado en datos ha sido probado en las industrias de Gaming, Medios y Noticias, donde la retención y el compromiso son críticos.
            </p>
        </section>

        {/* 2. NUESTROS PILARES */}
        <section>
            <h2 className="text-4xl font-extrabold text-center text-slate-100 mb-10 flex items-center justify-center gap-3">
                <Lightbulb className="w-8 h-8 text-cyan-400" />
                La Analítica es Nuestro ADN
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> 
                <PillarCard
                    title="Socios, No Proveedores"
                    description="Trabajamos codo a codo con tus equipos de producto, marketing y desarrollo. Tu éxito en retención, engagement y monetización es nuestra principal KPI."
                    icon={<Handshake className="w-8 h-8" />}
                />
                <PillarCard
                    title="Privacidad y Confianza"
                    description="Manejamos tu activo más valioso (los datos del usuario) con el máximo rigor. La transparencia y el cumplimiento normativo son innegociables en nuestra plataforma."
                    icon={<Lock className="w-8 h-8" />}
                />
                {/* NUEVO PILAR 1: Innovación Tecnológica (Predicción) */}
                <PillarCard
                    title="Innovación Predictiva"
                    description="Vamos más allá de la estadística descriptiva. Nuestro compromiso es usar Machine Learning y LS avanzado para ofrecer proyecciones validadas del futuro."
                    icon={<Cpu className="w-8 h-8" />}
                />
                {/* NUEVO PILAR 2: Máximo Retorno (ROI) */}
                 <PillarCard
                    title="Enfoque en el ROI"
                    description="Cada métrica y cada simulación están diseñadas para responder una pregunta clave: ¿Cómo maximizamos el retorno de tu inversión móvil?"
                    icon={<DollarSign className="w-8 h-8" />}
                />
            </div>
        </section>

        {/* 3. DIFERENCIACIÓN (WHY US) - Adaptando la sección de Tecnología */}
        <section className="mt-20">
            <h2 className="text-4xl font-extrabold text-center text-slate-100 mb-10 flex items-center justify-center gap-3">
                ¿Por qué MobileMetrics y No la Competencia?
            </h2>
            <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-xl shadow-2xl shadow-slate-900/50">
                <p className="text-lg text-slate-300 mb-8 max-w-4xl mx-auto text-center">
                    En un mundo de dashboards bonitos, MobileMetrics ofrece certeza. Nuestra diferencia radica en la <strong>ciencia predictiva</strong> aplicada directamente a tu ROI.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Lo que Ellos Hacen */}
                    <div className="space-y-4 p-6 bg-red-900/20 border-l-4 border-red-500 rounded-lg">
                        <h3 className="text-2xl font-bold text-red-400 flex items-center gap-2">
                            <Target className="w-6 h-6" /> Lo que todos hacen...
                        </h3>
                        <p className="text-slate-400">
                            Se quedan en <strong>métricas básicas</strong>: descargas totales, usuarios activos, gráficos genéricos.
                        </p>
                        <ul className="list-disc list-inside text-slate-300 space-y-2 pl-4">
                            <li>Solo muestran el pasado.</li>
                            <li>No ofrecen proyecciones confiables ni análisis financiero real.</li>
                            <li>Se limitan a la visualización sin profundidad analítica.</li>
                        </ul>
                    </div>

                    {/* Lo que Nosotros Hacemos */}
                    <div className="space-y-4 p-6 bg-cyan-900/20 border-l-4 border-cyan-500 rounded-lg">
                        <h3 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                            <FlaskConical className="w-6 h-6" /> Lo que MobileMetrics hace
                        </h3>
                        <p className="text-slate-400">
                            Entregamos <strong>proyecciones precisas</strong> y <strong>análisis financiero real</strong> para que cada decisión esté respaldada por datos.
                        </p>
                        <ul className="list-disc list-inside text-slate-300 space-y-2 pl-4">
                            <li>Desarrollamos un simulador web interactivo.</li>
                            <li>Estima descargas por país y tipo de aplicación, calcula ROI, costos y escenarios estratégicos.</li>
                            <li>Usamos <strong>modelos matemáticos validados</strong> (ajuste por mínimos cuadrados, validación estadística) para garantizar exactitud.</li>
                            <li>Contamos con una enorme cantidad de datos recolectados a lo largo de nuestra larga trayectoria para mejorar tu predicción.</li>
                        </ul>
                    </div>
                </div>
                <p className="mt-8 text-xl font-semibold text-center text-slate-200">
                    Elegirnos significa pasar de la incertidumbre a la certeza.
                </p>
            </div>
        </section>


        {/* 4. EQUIPO FUNDADOR (Mantenido y Re-enfocado) */}
        <section className="mt-20">
          <h2 className="text-4xl font-extrabold text-center text-slate-100 mb-10 flex items-center justify-center gap-3">
            <Users className="w-8 h-8 text-cyan-400" />
            Nuestros 16 Años de Experiencia
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <TeamMemberCard
              name="Dr. Bucchino Ulises"
              title="Científico de Datos, Fundador"
              focus="Experto en modelado predictivo y validación de datasets. Arquitecto del motor LS."
              icon={<FlaskConical className="w-8 h-8" />}
            />
            
            <TeamMemberCard
              name="Barbé Dante"
              title="Especialista en UX/ROI"
              focus="Enfocado en la utilidad comercial de las proyecciones y la optimización de la retención del usuario."
              icon={<Target className="w-8 h-8" />}
            />

            <TeamMemberCard
              name="Andrada Santiago"
              title="Director de Tecnología"
              focus="Responsable de la escalabilidad de la plataforma y la seguridad de los datos (16 años de rigor)."
              icon={<Zap className="w-8 h-8" />}
            />

            <TeamMemberCard
              name="Soler Tomás"
              title="Líder de Crecimiento & Marketing"
              focus="Conecta la data predictiva con estrategias de adquisición, crecimiento de usuarios y maximización del valor de vida del cliente (CLV)."
              icon={<TrendingUp className="w-8 h-8" />}
            />
          </div>
        </section>

      </main>

    </div>
  );
}