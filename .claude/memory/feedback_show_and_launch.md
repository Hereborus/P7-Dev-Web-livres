---
name: feedback-show-and-launch
description: "Ce que l'utilisateur veut dire par \"montre moi\" et \"lance les services\""
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 96c1112c-e8c2-4b41-96f7-65544ec5a95d
---

Le phrasé n'est pas fixe, interpréter avec une marge de tolérance sur les variantes. S'applique aussi à la fermeture.

**Fermer les services** → expressions du type : "ferme les services", "stop", "coupe tout", "arrête les services"...
Action : tuer les process des ports utilisés par le projet en cours (frontend + backend), sauf si une précision demande autre chose.



**Frontend seul** → expressions du type : "montre moi", "affiche", "regarde", "voir le site", "montre le rendu", "voir à quoi ça ressemble"...
Action : lancer uniquement le service **frontend** et afficher l'UI dans le navigateur.

**Stack complète** → expressions du type : "lance les services", "démarre tout", "lance tout", "start les services", "démarre le back et le front"...
Action : lancer **backend + API** (et tout service nécessaire), puis afficher le frontend OU retourner les erreurs si quelque chose ne démarre pas.

**Why:** L'utilisateur utilise des raccourcis verbaux avec des variantes naturelles — le sens prime sur le mot exact.

**How to apply:** Ne pas demander de clarification — interpréter selon l'intention et agir directement.
