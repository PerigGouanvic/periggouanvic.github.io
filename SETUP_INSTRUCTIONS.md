# Instructions de configuration finale

## Fichiers à copier depuis social-jailbreak

Pour finaliser la configuration de cette page, tu dois copier les fichiers static depuis le dépôt **social-jailbreak**.

### Méthode recommandée : Clonage local et copie

```bash
# 1. Clone les deux dépôts (si ce n'est pas déjà fait)
git clone https://github.com/PerigGouanvic/social-jailbreak.git
git clone https://github.com/PerigGouanvic/periggouanvic.github.io.git

# 2. Copie les fichiers static
cp -r social-jailbreak/docs/static/* periggouanvic.github.io/static/

# 3. Commit et push
cd periggouanvic.github.io
git add static/
git commit -m "Ajout des fichiers static (CSS, JS, images)"
git push
```

### Structure des fichiers à copier

Depuis `social-jailbreak/docs/static/` vers `periggouanvic.github.io/static/`:

```
static/
├── css/
│   ├── bulma.min.css
│   ├── bulma-carousel.min.css
│   ├── bulma-slider.min.css
│   ├── fontawesome.all.min.css
│   └── index.css
├── js/
│   ├── bulma-carousel.min.js
│   ├── bulma-slider.min.js
│   ├── fontawesome.all.min.js
│   └── index.js
└── images/
    └── favicon.ico (placeholder générique pour le moment)
```

### Alternative : Téléchargement direct

Si tu préfères télécharger directement depuis GitHub :

1. Va sur https://github.com/PerigGouanvic/social-jailbreak/tree/main/docs/static
2. Télécharge chaque dossier (css, js, images)
3. Upload-les dans ton dépôt periggouanvic.github.io/static/

## Fichiers créés

✓ `index.html` - Page d'accueil complète avec tous tes projets
✓ `static/css/.gitkeep` - Structure de dossier initialisée

## Prochaines étapes

1. Copier les fichiers static (voir ci-dessus)
2. Remplacer le placeholder de la section "À propos" dans `index.html`
3. Ajouter un favicon personnalisé dans `static/images/favicon.ico`
4. (Optionnel) Ajouter une image preview pour Open Graph dans `static/images/`

## Test

Une fois les fichiers copiés, ta page sera accessible à :
https://periggouanvic.github.io/

## Notes

- L'email est masqué avec inversion des lettres (moc.liamg@civnauog.girep) et se révèle au clic
- Les sections alternent entre fond blanc et fond gris clair (class `hero is-light`)
- Le template est identique à celui de social-jailbreak, social-AI, ada-format
- Tous les liens vers tes projets publiés sont actifs
