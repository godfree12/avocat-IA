# Application Web — Cabinet d’Avocat

## Présentation

Cette application web simule l’interface d’un cabinet d’avocat moderne, avec une attention particulière portée à l’expérience utilisateur et à l’intégration d’outils interactifs.

L’objectif du projet était de concevoir une interface claire, fonctionnelle et cohérente, permettant à un utilisateur :
- de comprendre rapidement les services proposés
- d’interagir avec des outils d’assistance
- de contacter facilement le cabinet

---

## Fonctionnalités

### Interface principale
- Présentation du cabinet et de ses domaines d’expertise
- Structure claire et navigation fluide
- Design sobre et lisible

### Formulaire de contact
- Envoi de messages
- Validation des champs
- Gestion des erreurs

### Outils d’assistance

- Assistant interactif (chat)
- Analyse de documents PDF
- Pré-évaluation de cas
- Prise de rendez-vous (désactivée)

---

## Aperçu

### Interface principale
![Interface principale](./docs/hero.png)

### Outils d’assistance
![Outils](./docs/tools.png)

### Assistant interactif
![Assistant](./docs/chat.png)

---

## Test rapide

Voici un exemple de test réalisé sur l’assistant :

**Question :**  
> j’ai été témoin d’un vol, suis-je obligé de témoigner ?

**Réponse :**  
L’assistant explique que, selon les systèmes juridiques, une personne peut être amenée à témoigner et qu’une convocation officielle implique généralement une obligation légale de comparution.

Ce test montre le comportement général de l’interface et la manière dont les réponses sont structurées.

---

## Démo en ligne

Tu peux tester l’application directement ici :

https://avocat-ia-two.vercel.app/#outils-ia

---

## Stack technique

- Next.js
- React
- TypeScript
- Tailwind CSS
- ShadCN UI

---

## Structure du projet

- `src/app` : pages principales
- `components` : composants réutilisables
- `app/actions` : logique serveur
- `public` : fichiers statiques

---

## Lancer le projet en local

```bash
npm install
npm run dev
