import { z } from 'zod';
import { ErrorMessages } from '../utils/errorMessages';

export const TacheSchema = z.object({
  titre: z.string().min(1, ErrorMessages.TITRE_REQUIRED),
  description: z.string({ message: ErrorMessages.DESCRIPTION_TYPE }).optional().nullable(),
  etat: z.enum(['ENCOURS', 'TERMINEE', 'ANNULEE'], { message: ErrorMessages.ETAT_ENUM }).optional(),
});

export function validateTache(data: unknown) {
  return TacheSchema.safeParse(data);
}
