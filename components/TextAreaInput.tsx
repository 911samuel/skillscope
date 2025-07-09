"use client"

import React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface TextAreaInputProps {
  id: string
  label: string
  placeholder?: string
  value: string
  error?: string
  maxLength?: number
  onChange: (value: string) => void
  className?: string
}

export function TextAreaInput({
  id,
  label,
  placeholder,
  value,
  error,
  maxLength,
  onChange,
  className,
}: TextAreaInputProps) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? "border-red-500" : ""}
        maxLength={maxLength}
      />
      <div className="flex justify-between items-center">
        <div>{error && <p className="text-sm text-destructive">{error}</p>}</div>
        {maxLength !== undefined && (
          <p className="text-sm text-muted-foreground">{value.length}/{maxLength} characters</p>
        )}
      </div>
    </div>
  )
}
