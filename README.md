# Bear With Me

A lively, two-sided wing-bear for people who can't say it out loud.

Hand the phone to someone you'd like to ask out. The bear does the talking first, then the phone comes back to you so you can say your piece out loud.

Built with **Expo SDK 58**, React Native, and TypeScript. No backend, no accounts, no tracking.

## How to use it

1. **Before you hand over the phone**, tap the sliders icon on the first screen and set up your details:
   - your name,
   - your phone number,
   - your Instagram handle,
   - the questions you'd like to ask,
   - the compliments you'd like to give.
2. Open the app, choose **"I'm the human asking"**, and hand it over on the first screen.
3. She reads the question and taps her own answer (**Yes** or **Not right now**).
4. The next screen tells her to hand the phone back to you.
5. When it's back in your hands, pick a question or compliment and tap **Say it out loud** — the phone speaks it for you.
6. Take the conversation from there — however she answers.

The bear is the icebreaker. The conversation after that is yours.

## Run it

From this folder:

```bash
npm install
npm start
```

Then:

- **Phone:** install **Expo Go** (the latest version, which supports SDK 58), scan the QR code in the terminal, and the app opens.
- **Android emulator:** press `a` in the Expo terminal.
- **iOS simulator (macOS):** press `i` in the Expo terminal.
- **Web preview:** `npm run web`.

> The phone and computer need to be on the same Wi-Fi network. If the QR code doesn't connect, run `npx expo start --tunnel`.

## Make it yours

Open the app and tap the small **sliders icon** in the top-right corner of the first screen.

Add:

- your name,
- your phone number,
- your Instagram handle,
- custom questions (what you'd like to ask when the phone comes back),
- custom compliments (nice things to say after her answer).

These details appear only after a **yes** and are stored locally with AsyncStorage — nothing leaves this phone.

## The flow

1. **Welcome** — a waving, blinking, boopable bear. Choose who's holding the phone: *"I'm the human asking"* or *"I'm being asked out."*
2. **Setup (owner)** — add your name, contact details, and custom lines you want to say.
3. **The question (guest)** — she reads the invitation and taps **Yes** or **Not right now**.
4. **Handoff (guest)** — the screen tells her to give the phone back to you.
5. **Response (owner)** — pick a question or compliment, then tap **Say it out loud** so the phone speaks it for you.
6. **Yes / No** — confetti and a celebrating bear for yes; a warm, zero-pressure exit for no.

## Where to edit things

| What | Where |
| --- | --- |
| Welcome / role picker | `src/screens/WelcomeScreen.tsx` |
| Owner setup (name, contact, lines) | `src/screens/SetupScreen.tsx` |
| The question (guest side) | `src/screens/QuestionScreen.tsx` |
| Handoff screen | `src/screens/HandoffScreen.tsx` |
| Owner response (lines + speak) | `src/screens/ResponseScreen.tsx` |
| Text-to-speech button | `src/components/SpeechButton.tsx` |
| Line picker (questions/compliments) | `src/components/LinePicker.tsx` |
| Bear illustration and animations | `src/components/Bear.tsx` |
| Colours and typography | `src/theme.ts` |
| Local storage (profile + custom lines) | `src/storage.ts` |
| App state machine | `App.tsx` |

Custom fonts are **Fraunces** and **Manrope**, loaded at runtime from `@expo-google-fonts/*`. The app uses `expo-speech` for the owner's spoken lines.

## Accessibility and safety

- Respects the OS **Reduce Motion** setting: animations stop, content remains.
- Haptics are best-effort and silently no-op on unsupported platforms.
- Every button has an accessibility label; screen changes are announced.
- Both answers are treated with equal care. "Not right now" never leads to a guilt trip.
- Owner details never show before a yes, and nothing leaves the device.

## Build a real app

The project is ready for EAS Build once you sign in to an Expo account:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android
```

For iPhone distribution you'll need an Apple Developer account. Change the bundle identifiers in `app.json` (`com.bearwithme.app`) before shipping.
