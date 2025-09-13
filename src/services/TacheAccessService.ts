import { prisma } from '../config/db';

export class TacheAccessService {
  // Invite un utilisateur par email à collaborer sur une tâche
  async inviteUserToTache(tacheId: number, email: string): Promise<void> {
    await prisma.tacheInvite.create({
      data: { tacheId, email }
    });
  }

  // Vérifie si l'utilisateur (par id ou email) a accès à la tâche
  async userCanEditTache(tacheId: number, userId: number, userEmail: string): Promise<boolean> {
    // Vérifie si c'est le créateur
    const tache = await prisma.tache.findUnique({ where: { id: tacheId } });
    if (tache?.userId === userId) return true;
    // Vérifie si l'email est invité
    const invite = await prisma.tacheInvite.findFirst({ where: { tacheId, email: userEmail } });
    return !!invite;
  }

  // Liste des emails invités pour une tâche
  async getInvitedEmails(tacheId: number): Promise<string[]> {
    const invites = await prisma.tacheInvite.findMany({ where: { tacheId } });
    return invites.map(i => i.email);
  }
}
