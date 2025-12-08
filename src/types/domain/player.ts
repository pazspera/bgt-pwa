export interface Player {
  id: string,
  name: string
  createdAt: string,
}

// Type used for creating new users
export type NewPlayer = Omit<Player, "id" | "createdAt">

// Type used for editing player with PATCH
// Partial makes all properties optional
// Pick selects the id so the player can always be identified
export type UpdatedPlayer = Partial<NewPlayer> & Pick<Player, "id">;