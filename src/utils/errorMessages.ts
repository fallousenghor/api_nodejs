export enum ErrorMessages {
  TACHE_NOT_FOUND = "Tâche non trouvée",
  USER_NOT_FOUND = "Utilisateur non trouvé",
  BAD_REQUEST = "Requête invalide",
  INTERNAL_ERROR = "Erreur interne du serveur",
  TITRE_REQUIRED = "Le titre est requis.",
  DESCRIPTION_TYPE = "La description doit être une chaîne.",
  ETAT_ENUM = "L'état doit être ENCOURS, TERMINEE ou ANNULEE.",
  EMAIL_ALREADY_USED = "Email déjà utilisé",
  INVALID_PASSWORD = "Mot de passe incorrect",
  INVALID_TOKEN = "Token invalide",
  UNAUTHORIZED_UPDATE = "Seul le créateur peut modifier cette tâche.",
  UNAUTHORIZED_DELETE = "Seul le créateur peut supprimer cette tâche.",
}
