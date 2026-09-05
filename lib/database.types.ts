export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          headline: string
          bio: string | null
          profile_image_url: string | null
          date_of_birth: string
          email: string
          phone: string | null
          location: string | null
          resume_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          headline: string
          bio?: string | null
          profile_image_url?: string | null
          date_of_birth: string
          email: string
          phone?: string | null
          location?: string | null
          resume_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          headline?: string
          bio?: string | null
          profile_image_url?: string | null
          date_of_birth?: string
          email?: string
          phone?: string | null
          location?: string | null
          resume_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      education: {
        Row: {
          id: string
          institution: string
          degree: string
          field_of_study: string
          start_date: string
          end_date: string | null
          grade: string | null
          location: string | null
          description: string | null
          logo_url: string | null
          display_order: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          institution: string
          degree: string
          field_of_study: string
          start_date: string
          end_date?: string | null
          grade?: string | null
          location?: string | null
          description?: string | null
          logo_url?: string | null
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          institution?: string
          degree?: string
          field_of_study?: string
          start_date?: string
          end_date?: string | null
          grade?: string | null
          location?: string | null
          description?: string | null
          logo_url?: string | null
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          id: string
          name: string
          category: 'Programming Languages' | 'AI/ML' | 'Data Science' | 'Deep Learning' | 'Web Development' | 'Databases' | 'Cloud' | 'Tools'
          proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
          display_order: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: 'Programming Languages' | 'AI/ML' | 'Data Science' | 'Deep Learning' | 'Web Development' | 'Databases' | 'Cloud' | 'Tools'
          proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: 'Programming Languages' | 'AI/ML' | 'Data Science' | 'Deep Learning' | 'Web Development' | 'Databases' | 'Cloud' | 'Tools'
          proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          slug: string
          featured: boolean
          image_url: string | null
          technologies: string[]
          github_url: string | null
          live_url: string | null
          start_date: string | null
          end_date: string | null
          content: string | null
          display_order: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          slug: string
          featured?: boolean
          image_url?: string | null
          technologies?: string[]
          github_url?: string | null
          live_url?: string | null
          start_date?: string | null
          end_date?: string | null
          content?: string | null
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          slug?: string
          featured?: boolean
          image_url?: string | null
          technologies?: string[]
          github_url?: string | null
          live_url?: string | null
          start_date?: string | null
          end_date?: string | null
          content?: string | null
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      experience: {
        Row: {
          id: string
          title: string
          company: string
          location: string | null
          start_date: string
          end_date: string | null
          description: string | null
          company_logo_url: string | null
          display_order: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          location?: string | null
          start_date: string
          end_date?: string | null
          description?: string | null
          company_logo_url?: string | null
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          location?: string | null
          start_date?: string
          end_date?: string | null
          description?: string | null
          company_logo_url?: string | null
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          id: string
          title: string
          issuer: string
          issue_date: string
          expiry_date: string | null
          credential_url: string | null
          credential_id: string | null
          certificate_image_url: string | null
          description: string | null
          display_order: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          issuer: string
          issue_date: string
          expiry_date?: string | null
          credential_url?: string | null
          credential_id?: string | null
          certificate_image_url?: string | null
          description?: string | null
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          issuer?: string
          issue_date?: string
          expiry_date?: string | null
          credential_url?: string | null
          credential_id?: string | null
          certificate_image_url?: string | null
          description?: string | null
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      achievements: {
        Row: {
          id: string
          title: string
          description: string
          achievement_date: string
          icon_url: string | null
          category: string | null
          display_order: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          achievement_date: string
          icon_url?: string | null
          category?: string | null
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          achievement_date?: string
          icon_url?: string | null
          category?: string | null
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      social_links: {
        Row: {
          id: string
          platform: string
          url: string
          icon: string | null
          display_order: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          platform: string
          url: string
          icon?: string | null
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          platform?: string
          url?: string
          icon?: string | null
          display_order?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
