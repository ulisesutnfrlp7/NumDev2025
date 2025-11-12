import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TrendingUp, FlaskConical, Target, Clock, Users } from 'lucide-react';

// =================================================================
// Componentes de Sección
// (Se recomienda moverlos a components/Sections/ para modularidad)
// =================================================================

// Sección Principal (Hero)
const HeroSection: React.FC = () => (
    <section className="py-24 md:py-36 bg-slate-900 overflow-hidden relative border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 mb-6 leading-tight">
                El Futuro de tus Descargas, <span className="text-cyan-400">Proyectado por Data Science</span>.
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
                Transformamos la analítica retrospectiva en planificación prospectiva. Conozca la precisión de nuestro modelo de Mínimos Cuadrados (LS) para sus 6 clústeres de mercado.
            </p>
            {/* El atributo passHref y legacyBehavior son buenas prácticas al envolver componentes con Link */}
            <Link href="/simulador">
                <Button 
                    className="h-auto px-10 py-4 text-lg font-bold rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition duration-300 transform hover:scale-105 shadow-xl shadow-cyan-900/50"
                >
                    <TrendingUp className="w-5 h-5 mr-3" />
                    Acceder al Simulador Predictivo
                </Button>
            </Link>
        </div>
        {/* Elemento de fondo sutil con gradiente */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient-wave" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#0e7490', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <path fill="url(#gradient-wave)" fillOpacity="0.3" d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,192C672,203,768,213,864,213.3C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>
        </div>
    </section>
);

// Tarjeta de Característica Reutilizable
const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 text-center transform hover:scale-[1.02] transition duration-300 hover:border-cyan-500/50 shadow-lg">
        <div className="text-cyan-400 w-12 h-12 mx-auto mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-slate-100">{title}</h3>
        <p className="text-slate-400">{description}</p>
    </div>
);

// Sección de Propuesta de Valor
const FeaturesSection: React.FC = () => (
    <section id="valores" className="py-20 md:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-100 mb-16">
                Modelado Preciso. Decisión Confiable.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={<FlaskConical className="w-full h-full" />} 
                    title="Precisión Científica (LS)"
                    description="El modelo de Mínimos Cuadrados minimiza el error cuadrático, ofreciendo una proyección de crecimiento estable y científicamente validada."
                />
                <FeatureCard 
                    icon={<Target className="w-full h-full" />} 
                    title="Análisis por Clústeres (6X)"
                    description="Segmentamos en 3 Países y 2 Tipos de App, calibrando los coeficientes LS para reflejar las dinámicas de mercado específicas."
                />
                <FeatureCard 
                    icon={<Clock className="w-full h-full" />} 
                    title="Tiempo para el Éxito"
                    description="Estime con precisión el horizonte temporal necesario para alcanzar hitos críticos como 100K descargas y optimizar su estrategia."
                />
            </div>
        </div>
    </section>
);

// =================================================================
// Componente Principal: HomePage (app/page.tsx)
// =================================================================

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-900 antialiased">
            
            <main>
                <HeroSection />
                <FeaturesSection />
            </main>

            {/* Footer básico (asumiendo que no está en el layout global) */}
            <footer className="bg-slate-900 border-t border-slate-700 py-6 text-center text-slate-500">
                <p>&copy; {new Date().getFullYear()} MobileMetrics Analytics. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default HomePage;