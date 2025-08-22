export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          action: string | null
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          timestamp: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          action?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          timestamp?: string
          title: string
          type: string
          user_id: string
        }
        Update: {
          action?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          timestamp?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_published: boolean | null
          published_at: string | null
          reading_time: number | null
          tags: string[] | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_published?: boolean | null
          published_at?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: []
      }
      build_components: {
        Row: {
          affiliate_url: string | null
          brand: string
          category: string
          compatibility: string[] | null
          created_at: string
          description: string
          dimensions: Json
          id: string
          image_url: string | null
          is_custom: boolean | null
          name: string
          power_consumption: number | null
          price: number
          rating: number | null
          review_count: number | null
          specifications: Json | null
          updated_at: string
          user_id: string | null
          weight: number | null
        }
        Insert: {
          affiliate_url?: string | null
          brand: string
          category: string
          compatibility?: string[] | null
          created_at?: string
          description: string
          dimensions: Json
          id?: string
          image_url?: string | null
          is_custom?: boolean | null
          name: string
          power_consumption?: number | null
          price: number
          rating?: number | null
          review_count?: number | null
          specifications?: Json | null
          updated_at?: string
          user_id?: string | null
          weight?: number | null
        }
        Update: {
          affiliate_url?: string | null
          brand?: string
          category?: string
          compatibility?: string[] | null
          created_at?: string
          description?: string
          dimensions?: Json
          id?: string
          image_url?: string | null
          is_custom?: boolean | null
          name?: string
          power_consumption?: number | null
          price?: number
          rating?: number | null
          review_count?: number | null
          specifications?: Json | null
          updated_at?: string
          user_id?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      build_configuration_components: {
        Row: {
          build_component_id: string
          build_configuration_id: string
          created_at: string
          id: string
          quantity: number
        }
        Insert: {
          build_component_id: string
          build_configuration_id: string
          created_at?: string
          id?: string
          quantity?: number
        }
        Update: {
          build_component_id?: string
          build_configuration_id?: string
          created_at?: string
          id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "build_configuration_components_build_component_id_fkey"
            columns: ["build_component_id"]
            isOneToOne: false
            referencedRelation: "build_components"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "build_configuration_components_build_configuration_id_fkey"
            columns: ["build_configuration_id"]
            isOneToOne: false
            referencedRelation: "build_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      build_configurations: {
        Row: {
          created_at: string
          description: string | null
          estimated_monthly_cost: number | null
          id: string
          is_public: boolean | null
          name: string
          space_requirements: Json
          tags: string[] | null
          total_cost: number | null
          total_power_consumption: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          estimated_monthly_cost?: number | null
          id?: string
          is_public?: boolean | null
          name: string
          space_requirements: Json
          tags?: string[] | null
          total_cost?: number | null
          total_power_consumption?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          estimated_monthly_cost?: number | null
          id?: string
          is_public?: boolean | null
          name?: string
          space_requirements?: Json
          tags?: string[] | null
          total_cost?: number | null
          total_power_consumption?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      environment_data: {
        Row: {
          co2: number | null
          created_at: string
          grow_cycle_id: string | null
          grow_log_id: string | null
          humidity: number
          id: string
          is_manual_entry: boolean
          light_intensity: number | null
          ph: number | null
          tds: number | null
          temperature: number
          timestamp: string
          user_id: string
          water_temp: number | null
        }
        Insert: {
          co2?: number | null
          created_at?: string
          grow_cycle_id?: string | null
          grow_log_id?: string | null
          humidity: number
          id?: string
          is_manual_entry?: boolean
          light_intensity?: number | null
          ph?: number | null
          tds?: number | null
          temperature: number
          timestamp?: string
          user_id: string
          water_temp?: number | null
        }
        Update: {
          co2?: number | null
          created_at?: string
          grow_cycle_id?: string | null
          grow_log_id?: string | null
          humidity?: number
          id?: string
          is_manual_entry?: boolean
          light_intensity?: number | null
          ph?: number | null
          tds?: number | null
          temperature?: number
          timestamp?: string
          user_id?: string
          water_temp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "environment_data_grow_cycle_id_fkey"
            columns: ["grow_cycle_id"]
            isOneToOne: false
            referencedRelation: "grow_cycles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "environment_data_grow_log_id_fkey"
            columns: ["grow_log_id"]
            isOneToOne: false
            referencedRelation: "grow_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      grow_cycles: {
        Row: {
          created_at: string
          current_day: number | null
          current_stage: string
          end_date: string | null
          expected_stage_duration: number
          id: string
          medium: string
          name: string
          notes: string | null
          plant_count: number
          stage_start_date: string
          start_date: string
          status: string
          strain_id: string | null
          total_yield: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_day?: number | null
          current_stage: string
          end_date?: string | null
          expected_stage_duration: number
          id?: string
          medium: string
          name: string
          notes?: string | null
          plant_count?: number
          stage_start_date: string
          start_date: string
          status?: string
          strain_id?: string | null
          total_yield?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_day?: number | null
          current_stage?: string
          end_date?: string | null
          expected_stage_duration?: number
          id?: string
          medium?: string
          name?: string
          notes?: string | null
          plant_count?: number
          stage_start_date?: string
          start_date?: string
          status?: string
          strain_id?: string | null
          total_yield?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "grow_cycles_strain_id_fkey"
            columns: ["strain_id"]
            isOneToOne: false
            referencedRelation: "strains"
            referencedColumns: ["id"]
          },
        ]
      }
      grow_logs: {
        Row: {
          actions: string[] | null
          created_at: string
          date: string
          day_in_stage: number
          grow_cycle_id: string
          grow_stage: string
          height: number | null
          id: string
          issues: string[] | null
          notes: string
          photos: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          actions?: string[] | null
          created_at?: string
          date: string
          day_in_stage: number
          grow_cycle_id: string
          grow_stage: string
          height?: number | null
          id?: string
          issues?: string[] | null
          notes: string
          photos?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          actions?: string[] | null
          created_at?: string
          date?: string
          day_in_stage?: number
          grow_cycle_id?: string
          grow_stage?: string
          height?: number | null
          id?: string
          issues?: string[] | null
          notes?: string
          photos?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "grow_logs_grow_cycle_id_fkey"
            columns: ["grow_cycle_id"]
            isOneToOne: false
            referencedRelation: "grow_cycles"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrient_logs: {
        Row: {
          actual_ppm: number | null
          amount: number
          created_at: string
          date: string
          grow_cycle_id: string | null
          grow_log_id: string | null
          id: string
          notes: string | null
          nutrient_type: string
          ph_after: number
          ph_before: number
          target_ppm: number
          unit: string
          user_id: string
        }
        Insert: {
          actual_ppm?: number | null
          amount: number
          created_at?: string
          date: string
          grow_cycle_id?: string | null
          grow_log_id?: string | null
          id?: string
          notes?: string | null
          nutrient_type: string
          ph_after: number
          ph_before: number
          target_ppm: number
          unit: string
          user_id: string
        }
        Update: {
          actual_ppm?: number | null
          amount?: number
          created_at?: string
          date?: string
          grow_cycle_id?: string | null
          grow_log_id?: string | null
          id?: string
          notes?: string | null
          nutrient_type?: string
          ph_after?: number
          ph_before?: number
          target_ppm?: number
          unit?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nutrient_logs_grow_cycle_id_fkey"
            columns: ["grow_cycle_id"]
            isOneToOne: false
            referencedRelation: "grow_cycles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "nutrient_logs_grow_log_id_fkey"
            columns: ["grow_log_id"]
            isOneToOne: false
            referencedRelation: "grow_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      strains: {
        Row: {
          cbd_content: string | null
          created_at: string
          expected_yield: string | null
          flowering_time: number | null
          growth_pattern: string | null
          id: string
          name: string
          notes: string | null
          thc_content: string | null
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cbd_content?: string | null
          created_at?: string
          expected_yield?: string | null
          flowering_time?: number | null
          growth_pattern?: string | null
          id?: string
          name: string
          notes?: string | null
          thc_content?: string | null
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cbd_content?: string | null
          created_at?: string
          expected_yield?: string | null
          flowering_time?: number | null
          growth_pattern?: string | null
          id?: string
          name?: string
          notes?: string | null
          thc_content?: string | null
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
