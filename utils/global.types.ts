import { Database } from "./database.types";

export type Dream = Database['public']['Tables']['dreams']['Row'];

export type DreamRating = Database['public']['Enums']['dreamType'];