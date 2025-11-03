"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface CSVUploaderProps {
  onUpload: (csvText: string) => void
}

export function CSVUploader({ onUpload }: CSVUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      onUpload(text)
    }
    reader.readAsText(file)

    // Reset input so the same file can be uploaded again
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex items-center gap-4">
      <input ref={fileInputRef} type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
      <Button
        onClick={() => fileInputRef.current?.click()}
        className="bg-cyan-600 hover:bg-cyan-700 flex items-center gap-2"
      >
        <Upload className="w-4 h-4" />
        Seleccionar archivo CSV
      </Button>
      <p className="text-sm text-slate-400">Formato: t;pais;tipo_aplicacion;descargas (separado por ;)</p>
    </div>
  )
}
