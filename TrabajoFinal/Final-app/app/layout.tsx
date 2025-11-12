import './globals.css'; // Asegúrate de que esta línea esté presente
import { Inter } from 'next/font/google'; // Usa la fuente que desees
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer';
import { DataProvider } from '@/lib/data-context';

// Define la fuente (si usas Next/font)
const inter = Inter({ subsets: ['latin'] });

// Metadatos globales (importante para SEO)
export const metadata = {
  title: 'MobileMetrics Analytics | Proyección de Descargas LS',
  description: 'Simulador de descargas de aplicaciones móviles basado en modelos de regresión por Mínimos Cuadrados (LS).',
};

// Componente Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.className}>
      <body className="bg-slate-900 text-slate-200 antialiased">
        <Header />
        
        <DataProvider>
          <main>{children}</main> 
        </DataProvider>
        <Footer />
      </body>
    </html>
  );
}