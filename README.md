# Perig Gouanvic - Page d'accueil

Page d'accueil personnelle présentant mes projets de recherche indépendante.

## Structure

Ce site utilise le template [Academic Project Page](https://github.com/eliahuhorwitz/Academic-project-page-template) avec Bulma CSS.

## Fichiers manquants à copier

Pour finaliser le site, copiez ces fichiers depuis `social-jailbreak/docs/static/` vers `static/` :

### Depuis le dépôt social-jailbreak

```bash
# Clone si nécessaire
git clone https://github.com/PerigGouanvic/social-jailbreak.git
cd social-jailbreak/docs/static

# Copie vers periggouanvic.github.io
cp css/bulma.min.css ../../../periggouanvic.github.io/static/css/
cp css/fontawesome.all.min.css ../../../periggouanvic.github.io/static/css/

# Créer le dossier js
mkdir -p ../../../periggouanvic.github.io/static/js
cp js/fontawesome.all.min.js ../../../periggouanvic.github.io/static/js/

# Créer le dossier images avec un favicon générique
mkdir -p ../../../periggouanvic.github.io/static/images
cp images/favicon.ico ../../../periggouanvic.github.io/static/images/

# Commit et push
cd ../../../periggouanvic.github.io
git add static/
git commit -m "Ajout des assets static (CSS, JS, images)"
git push
```

### Alternative : Téléchargement direct

Téléchargez manuellement depuis GitHub :
- [bulma.min.css](https://github.com/PerigGouanvic/social-jailbreak/raw/main/docs/static/css/bulma.min.css)
- [fontawesome.all.min.css](https://github.com/PerigGouanvic/social-jailbreak/raw/main/docs/static/css/fontawesome.all.min.css) 
- [fontawesome.all.min.js](https://github.com/PerigGouanvic/social-jailbreak/raw/main/docs/static/js/fontawesome.all.min.js)
- [favicon.ico](https://github.com/PerigGouanvic/social-jailbreak/raw/main/docs/static/images/favicon.ico)

Puis uploadez-les dans les dossiers correspondants de ce dépôt.

## Projets présentés

### Projets publiés
- **Social Jailbreak** - Architecture pour l'agrégation décentralisée des médias sociaux
- **The .ada Format** - Format de document adapté et accessible
- **Toward a Social AI** - Re-humaniser les humanoïdes
- **Right to Physiological Integrity** - Droits physiologiques mesurables

### Projets à paraître
- Agent Janus
- JP³ (Jogging in Place at your own Pace in your own Place)
- LACUNA
- Biochemistry Research

## Contact

- **Email** : perig.gouanvic@gmail.com
- **GitHub** : [@PerigGouanvic](https://github.com/PerigGouanvic)

## Licence

Ce site utilise le template Academic Project Page sous licence MIT. Le contenu est sous licence CC BY-SA 4.0.
