import { goalData } from "../types/recommend";
export interface RecCardProps {
  status: string;
}
export interface RecFilter {
  filter: string;
  setFilter: (value: string) => void;
}
