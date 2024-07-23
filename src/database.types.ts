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
      activity_type: {
        Row: {
          activity: string
          activity_image: string | null
          created_at: string
          id: number
        }
        Insert: {
          activity: string
          activity_image?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          activity?: string
          activity_image?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
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
      clan_war: {
        Row: {
          clan_1: number | null
          clan_1_health: number
          clan_2: number | null
          clan_2_health: number
          created_at: string
          defeat_clan_id: number | null
          end_time: string
          id: number
          status: boolean | null
          winner_clan_id: number | null
        }
        Insert: {
          clan_1?: number | null
          clan_1_health: number
          clan_2?: number | null
          clan_2_health: number
          created_at?: string
          defeat_clan_id?: number | null
          end_time: string
          id?: number
          status?: boolean | null
          winner_clan_id?: number | null
        }
        Update: {
          clan_1?: number | null
          clan_1_health?: number
          clan_2?: number | null
          clan_2_health?: number
          created_at?: string
          defeat_clan_id?: number | null
          end_time?: string
          id?: number
          status?: boolean | null
          winner_clan_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clan_war_clan_1_fkey"
            columns: ["clan_1"]
            isOneToOne: false
            referencedRelation: "clans"
            referencedColumns: ["clan_id"]
          },
          {
            foreignKeyName: "clan_war_clan_2_fkey"
            columns: ["clan_2"]
            isOneToOne: false
            referencedRelation: "clans"
            referencedColumns: ["clan_id"]
          },
          {
            foreignKeyName: "clan_war_defeat_clan_id_fkey"
            columns: ["defeat_clan_id"]
            isOneToOne: false
            referencedRelation: "clans"
            referencedColumns: ["clan_id"]
          },
          {
            foreignKeyName: "clan_war_winner_clan_id_fkey"
            columns: ["winner_clan_id"]
            isOneToOne: false
            referencedRelation: "clans"
            referencedColumns: ["clan_id"]
          },
        ]
      }
      clan_war_details: {
        Row: {
          action: string | null
          clan_id: number | null
          clan_war_id: number | null
          contribute: number | null
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          action?: string | null
          clan_id?: number | null
          clan_war_id?: number | null
          contribute?: number | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          action?: string | null
          clan_id?: number | null
          clan_war_id?: number | null
          contribute?: number | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clan_war_details_clan_id_fkey"
            columns: ["clan_id"]
            isOneToOne: false
            referencedRelation: "clans"
            referencedColumns: ["clan_id"]
          },
          {
            foreignKeyName: "clan_war_details_clan_war_id_fkey"
            columns: ["clan_war_id"]
            isOneToOne: false
            referencedRelation: "clan_war"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clan_war_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
      user_activities: {
        Row: {
          active_score: number
          activity_description: string | null
          activity_title: string | null
          activity_type_id: number | null
          created_at: string
          distance: number | null
          duration: string | null
          id: number
          user_id: string
        }
        Insert: {
          active_score?: number
          activity_description?: string | null
          activity_title?: string | null
          activity_type_id?: number | null
          created_at?: string
          distance?: number | null
          duration?: string | null
          id?: number
          user_id: string
        }
        Update: {
          active_score?: number
          activity_description?: string | null
          activity_title?: string | null
          activity_type_id?: number | null
          created_at?: string
          distance?: number | null
          duration?: string | null
          id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_activities_activity_type_id_fkey"
            columns: ["activity_type_id"]
            isOneToOne: false
            referencedRelation: "activity_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_activities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          active_score: number
          avatar_image: string | null
          clan_id: number | null
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
          avatar_image?: string | null
          clan_id?: number | null
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
          avatar_image?: string | null
          clan_id?: number | null
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
      pair_clans_for_battle: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_clan_war_status: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_user_activity_scores: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
