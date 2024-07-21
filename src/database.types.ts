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
      clan_activity_log: {
        Row: {
          clan_id: number
          created_at: string
          id: number
          message: string
          user_id: string | null
        }
        Insert: {
          clan_id: number
          created_at?: string
          id?: number
          message: string
          user_id?: string | null
        }
        Update: {
          clan_id?: number
          created_at?: string
          id?: number
          message?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clan_activity_log_clan_id_fkey"
            columns: ["clan_id"]
            isOneToOne: false
            referencedRelation: "clans"
            referencedColumns: ["clan_id"]
          },
          {
            foreignKeyName: "clan_activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      clan_members: {
        Row: {
          clan_id: number
          created_at: string
          id: number
          role: string | null
          user_id: string
        }
        Insert: {
          clan_id: number
          created_at?: string
          id?: number
          role?: string | null
          user_id: string
        }
        Update: {
          clan_id?: number
          created_at?: string
          id?: number
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clan_members_clan_id_fkey"
            columns: ["clan_id"]
            isOneToOne: false
            referencedRelation: "clans"
            referencedColumns: ["clan_id"]
          },
          {
            foreignKeyName: "clan_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      clans: {
        Row: {
          battle_status: string | null
          clan_description: string | null
          clan_health: number
          clan_id: number
          clan_logo: string | null
          clan_name: string
          created_at: string
          founder_id: string
          max_member: number | null
          required_active_score: number
        }
        Insert: {
          battle_status?: string | null
          clan_description?: string | null
          clan_health?: number
          clan_id?: number
          clan_logo?: string | null
          clan_name: string
          created_at?: string
          founder_id: string
          max_member?: number | null
          required_active_score?: number
        }
        Update: {
          battle_status?: string | null
          clan_description?: string | null
          clan_health?: number
          clan_id?: number
          clan_logo?: string | null
          clan_name?: string
          created_at?: string
          founder_id?: string
          max_member?: number | null
          required_active_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "clans_founder_id_fkey"
            columns: ["founder_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          active_score: number
          avartar_image: string | null
          clan_member_id: number | null
          coin: number
          created_at: string
          diamond: number
          energy: number
          experience: number
          id: string
          level: number
          pet_id: number | null
          username: string | null
        }
        Insert: {
          active_score?: number
          avartar_image?: string | null
          clan_member_id?: number | null
          coin?: number
          created_at?: string
          diamond?: number
          energy?: number
          experience?: number
          id?: string
          level?: number
          pet_id?: number | null
          username?: string | null
        }
        Update: {
          active_score?: number
          avartar_image?: string | null
          clan_member_id?: number | null
          coin?: number
          created_at?: string
          diamond?: number
          energy?: number
          experience?: number
          id?: string
          level?: number
          pet_id?: number | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_clan_member_id_fkey"
            columns: ["clan_member_id"]
            isOneToOne: false
            referencedRelation: "clan_members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fetch_all_clan_rankings: {
        Args: Record<PropertyKey, never>
        Returns: {
          clan_id: number
          clan_name: string
          clan_logo: string
          total_active_score: number
          rank: number
        }[]
      }
      get_random_clans: {
        Args: Record<PropertyKey, never>
        Returns: {
          battle_status: string | null
          clan_description: string | null
          clan_health: number
          clan_id: number
          clan_logo: string | null
          clan_name: string
          created_at: string
          founder_id: string
          max_member: number | null
          required_active_score: number
        }[]
      }
      get_total_active_score: {
        Args: {
          clan_id: number
        }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
