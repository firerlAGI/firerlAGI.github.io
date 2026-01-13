# Keyboard Interaction Business Logic Specification
**Project:** Firerlagi Portfolio
**Version:** 1.0
**Status:** Draft

## 1. Overview
To enhance the "Cyberpunk/Hacker" aesthetic and improve accessibility for power users, the website will implement a global keyboard event listener system. This allows users to navigate the site, toggle features, and trigger easter eggs without using a mouse.

## 2. Core Requirements

### 2.1 Event Handling Strategy
- **Global Listener:** Attach a `keydown` event listener to the `window` object in the main `App` component or a custom hook (`useKeyboardShortcuts`).
- **Input Guard:** The shortcuts **MUST NOT** trigger if the user is currently typing in an `<input>`, `<textarea>`, or `contenteditable` element (e.g., Contact Form or AI Assistant Chat).
  - *Implementation Logic:* Check `document.activeElement.tagName` before executing the shortcut action.

### 2.2 Visual Feedback
- When a shortcut is triggered, a small, futuristic "Toast" notification or sound effect (optional) should appear to confirm the action (e.g., "COMMAND EXECUTED: SCROLL_DOWN").

## 3. Key Mapping

| Key Combination | Action ID | Description |
| :--- | :--- | :--- |
| **Global Navigation** | | |
| `J` | `NAV_SCROLL_DOWN` | Scroll down by a defined step (Vim style). |
| `K` | `NAV_SCROLL_UP` | Scroll up by a defined step (Vim style). |
| `G` (Shift+g) | `NAV_BOTTOM` | Scroll to Footer/Contact. |
| `g` then `g` | `NAV_TOP` | Scroll to Top (Hero). |
| **Feature Toggles** | | |
| `Cmd/Ctrl + K` | `AI_OPEN` | Open/Focus the AI Assistant Input. |
| `Esc` | `UI_CLOSE` | Close any open modals (AI Chat, Image Preview). |
| `L` | `LANG_TOGGLE` | Toggle Language between EN/ZH. |
| **Easter Eggs** | | |
| `Up, Up, Down, Down...` | `KONAMI_CODE` | Trigger "Matrix Rain" overlay or glitch effect. |

## 4. Detailed Logic Flows

### 4.1 Language Toggle (`L`)
1.  **Trigger:** User presses `L`.
2.  **Condition:** `activeElement` is NOT an input.
3.  **Action:**
    - Read current language context.
    - If `en` -> Set `zh`.
    - If `zh` -> Set `en`.
4.  **Feedback:** Show brief glitch text overlay "LANG_SWITCH::ZH".

### 4.2 AI Assistant Access (`Cmd+K`)
1.  **Trigger:** User presses `Meta+K` (Mac) or `Ctrl+K` (Windows).
2.  **Condition:** None (Global override).
3.  **Action:**
    - Prevent default browser behavior (often search bar).
    - If AI Assistant is closed -> Open it.
    - Focus the input field inside the AI Assistant.

### 4.3 Vim-Style Scrolling (`J` / `K`)
1.  **Trigger:** User presses `J` or `K`.
2.  **Condition:** `activeElement` is NOT an input.
3.  **Action:**
    - `J`: `window.scrollBy({ top: 100, behavior: 'smooth' })`
    - `K`: `window.scrollBy({ top: -100, behavior: 'smooth' })`

## 5. Technical Implementation Suggestion

Create a hook `hooks/useKeyboardShortcuts.ts`:

```typescript
import { useEffect } from 'react';

export const useKeyboardShortcuts = (actions: any) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 1. Input Guard
      const target = event.target as HTMLElement;
      if (['INPUT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable) {
        if (event.key === 'Escape') target.blur(); // Allow Esc to blur input
        return;
      }

      // 2. Switch Case for Keys
      switch(event.key.toLowerCase()) {
        case 'j':
          window.scrollBy({ top: 150, behavior: 'smooth' });
          break;
        case 'k':
          window.scrollBy({ top: -150, behavior: 'smooth' });
          break;
        case 'l':
           actions.toggleLanguage();
           break;
        // ... other keys
      }
      
      // 3. Modifiers (Cmd+K)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        actions.toggleAi();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [actions]);
};
```

## 6. Future Expansion
- **Sound Effects:** Add mechanical keyboard sounds when specific shortcuts are used.
- **Konami Code:** Implement a `buffer` array to store the last 10 keystrokes to detect the sequence.
