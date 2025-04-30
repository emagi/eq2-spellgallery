# EQ2 Spell Visual Gallery

### Description

Helpful for identifying what spell visual id matches to the visual and sound effect.
Thumbnails will auto play in loop, only popup will contain full resolution video and audio.

### Staging/Running

Current Pages Available:
- index_dof.html - This represents the DoF January 2006 client we are using in EQ2Emu

To Run:

- Requires a local web server since CORS rejects files:/// loading.

1) Python Staging:

cd C:/github/eq2-spellgallery
python -m http.server 8000

2) NodeJS Staging:

cd C:/github/eq2-spellgallery
npx http-server -p 8000

3) Access your local web server with your web browser of choice: http://localhost:8000/index_dof.html