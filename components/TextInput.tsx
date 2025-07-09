"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TextInputProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  value: string
  error?: string
  onChange: (value: string) => void
  className?: string
}

export function TextInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  className,
}: TextInputProps) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : ""}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
