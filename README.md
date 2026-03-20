# Avocat-IA

Projet de site web pour un cabinet d’avocat, avec intégration de plusieurs outils d’assistance (discussion, analyse de documents, etc.).

Le projet a été initialement développé il y a quelques mois, puis repris récemment pour corriger certains points, nettoyer le code et améliorer la présentation.

---

## Objectif du projet

L’objectif était de proposer une interface simple permettant :

- de poser des questions juridiques basiques
- d’analyser des documents (PDF)
- d’obtenir une première estimation d’un dossier
- de contacter le cabinet facilement

Ce projet combine une interface web classique avec des fonctionnalités d’assistance automatisées.

---

## Stack technique

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- API d’intelligence artificielle (Google / Gemini)

---

## Fonctionnalités principales

- Assistant de discussion
- Analyse de documents PDF
- Pré-évaluation de cas
- Formulaire de contact
- Interface responsive

---

## Structure du projet

```bash
src/
  app/
    page.tsx
    layout.tsx
    actions.ts
  services/
  components/
  hooks/
  lib/