---
title: "Mistrzostwo Markdown: Edycja z Kotkiem 🐾"
date: "2026-03-01"
description: "Kompletny przewodnik po formatowaniu treści z wykorzystaniem multimediów, list i zaawansowanego kodu."
tags: ["programming", "webdev", "cats"]
---

# Witaj w Świecie Markdown! 🚀

Markdown to lekki język znaczników, który pozwala na tworzenie sformatowanego tekstu. Ten post służy jako **wzorzec** do testowania Twoich nowych stylów CSS.

---

## 1. Typografia i Formaty Tekstu

W Markdown możesz bardzo szybko nadać tekstowi odpowiedni charakter:

* **Pogrubienie** dla podkreślenia ważnych terminów.
* *Kursywa* dla wtrąceń lub cytatów.
* ~~Przekreślenie~~, jeśli zmienisz zdanie.
* `Kod w linii` (backticks) wygląda teraz czysto dzięki resetowi tła wewnątrz bloków `pre`.

> [!TIP]
> **Blok cytatu (Blockquote):** Wygląda bardzo profesjonalnie dzięki pionowej linii `border-l-4` zdefiniowanej w Twoim SCSS.

---

## 2. Multimedia i Obrazy 📸

Oto obiecana sekcja z Twoim kotkiem. Dzięki klasom w `article`, obrazki automatycznie dopasują się do szerokości tekstu.

![Mój ulubiony kot programista](/media/meme.jpg)

*Podpis: Kotek czuwający nad jakością Twojego kodu.*

---

## 3. Organizacja Treści (Listy)

Twoje listy mają teraz poprawne kropki i numery dzięki stylom `list-disc` i `list-decimal`.

### Lista zadań (Checklista)
- [x] Naprawić "paski" pod kodem
- [x] Dodać zdjęcie kotka 🐈
- [ ] Zaparzyć kolejną kawę ☕

### Lista nienumerowana
* Frontend (Angular 21)
* Backend (Node.js)
* Design (Catppuccin Theme)

---

## 4. Kod i Technologia

Blok kodu poniżej nie powinien mieć już dziwnych podkreśleń pod każdą linią, ponieważ zresetowaliśmy tło dla `code` wewnątrz `pre`.

```typescript
// Przykładowa funkcja witająca użytkownika
export const welcomeUser = (name: string): string => {
  const hours = new Date().getHours();
  const greeting = hours < 12 ? 'Dzień dobry' : 'Dobry wieczór';

  return `${greeting}, ${name}! Miło Cię widzieć na moim blogu.`;
};

console.log(welcomeUser('User'));
