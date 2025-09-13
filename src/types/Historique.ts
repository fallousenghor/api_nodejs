export interface CreateHistoriqueDto {
  action: string;
  userId: number;
  tacheId: number;
}

export interface UpdateHistoriqueDto {
  action?: string;
  userId?: number;
  tacheId?: number;
}

export interface Historique extends CreateHistoriqueDto {
  id: number;
  dateAction: Date;
}