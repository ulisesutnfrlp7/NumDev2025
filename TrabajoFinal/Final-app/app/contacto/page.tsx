"use client" // Necesario para usar hooks (como useState) y manejar el formulario

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, MapPin, Mail, Phone, Clock } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        // Lógica de envío ficticia (en un entorno real, aquí se llamaría a una API de Node.js)
        setTimeout(() => {
            console.log('Formulario enviado:', formData);
            
            // Finge un éxito
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' }); 
            setIsSubmitting(false);
            
            // Opcional: reiniciar el estado de éxito después de unos segundos
            setTimeout(() => setSubmitStatus('idle'), 5000);
            
        }, 2000); 
    };

    const StatusMessage: React.FC = () => {
        if (submitStatus === 'success') {
            return (
                <div className="p-4 bg-green-900/40 border border-green-500/50 rounded-lg text-green-300 font-medium mt-4">
                    ✅ ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
                </div>
            );
        }
        if (submitStatus === 'error') {
            return (
                <div className="p-4 bg-red-900/40 border border-red-500/50 rounded-lg text-red-300 font-medium mt-4">
                    ❌ Error al enviar. Por favor, intente directamente por correo.
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200">
            <main className="container mx-auto px-4 py-16 max-w-7xl">
                
                {/* Título Principal */}
                <header className="text-center max-w-3xl mx-auto mb-12 border-b border-slate-800 pb-8">
                    <h2 className="text-5xl font-extrabold text-cyan-400 mb-2">Hablemos de tu Crecimiento</h2>
                    <p className="text-xl text-slate-400">
                        ¿Necesitas un modelo LS a medida o tienes preguntas sobre el simulador? Nuestro equipo está listo para ayudarte.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Columna de Información*/}
                    <div className="space-y-6">
                        <Card className="bg-slate-800/50 border-slate-700 p-6 space-y-4">
                            
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-slate-200">Dirección Física</p>
                                    <p className="text-slate-400 text-sm">
                                        Edificio Madero Harbour, Juana Manso 1560, Piso 10. Puerto Madero, C1107ABN, CABA.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-slate-200">Email de Soporte</p>
                                    <p className="text-slate-400 text-sm">soporte@mobilemetrics.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-slate-200">Teléfono (Solo Citas)</p>
                                    <p className="text-slate-400 text-sm">+54 11 5263-0975</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Clock className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-slate-200">Horario</p>
                                    <p className="text-slate-400 text-sm">Lunes - Viernes: 9:00 - 18:00 (GMT-3)</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Columna de Formulario*/}
                    <div className="lg:col-span-2">
                        <Card className="bg-slate-800/50 border-slate-700">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-cyan-400">Envíanos un Mensaje Directo</CardTitle>
                                <CardDescription className="text-slate-400">
                                    Déjanos saber sobre tu aplicación, la categoría de interés (país/tipo) y el desafío a resolver.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-slate-300">Nombre</Label>
                                            <Input 
                                                id="name" 
                                                name="name"
                                                type="text" 
                                                placeholder="Tu Nombre" 
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="bg-slate-900 border-slate-600 text-slate-200"
                                                required 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-slate-300">Email</Label>
                                            <Input 
                                                id="email" 
                                                name="email"
                                                type="email" 
                                                placeholder="tu@empresa.com" 
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="bg-slate-900 border-slate-600 text-slate-200"
                                                required 
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-slate-300">Asunto</Label>
                                        <Input 
                                            id="subject" 
                                            name="subject"
                                            type="text" 
                                            placeholder="Consulta sobre Proyección LS / ROI" 
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="bg-slate-900 border-slate-600 text-slate-200"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-slate-300">Mensaje</Label>
                                        <Textarea 
                                            id="message" 
                                            name="message"
                                            placeholder="Detalla tu consulta y tus objetivos de descargas..." 
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="bg-slate-900 border-slate-600 text-slate-200"
                                            required 
                                        />
                                    </div>

                                    <Button 
                                        type="submit" 
                                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Enviando...' : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Enviar Mensaje
                                            </>
                                        )}
                                    </Button>
                                    
                                    <StatusMessage />
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </main>
            {/* El Footer se renderiza vía app/layout.tsx */}
        </div>
    );
}