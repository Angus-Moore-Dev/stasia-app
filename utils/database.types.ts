export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      dreams: {
        Row: {
          content: string
          createdAt: string
          dreamType: Database["public"]["Enums"]["dreamType"]
          id: number
          lastModified: string
          tags: string[]
          title: string
          userId: string
        }
        Insert: {
          content: string
          createdAt?: string
          dreamType: Database["public"]["Enums"]["dreamType"]
          id?: number
          lastModified?: string
          tags?: string[]
          title: string
          userId: string
        }
        Update: {
          content?: string
          createdAt?: string
          dreamType?: Database["public"]["Enums"]["dreamType"]
          id?: number
          lastModified?: string
          tags?: string[]
          title?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "dreams_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      dreamType:
        | "Positive"
        | "Neutral"
        | "Negative"
        | "Lucid Dream"
        | "Nightmare"
        | "Sleep Paralysis"
        | "Other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
