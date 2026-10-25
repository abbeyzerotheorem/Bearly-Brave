import AsyncStorage from '@react-native-async-storage/async-storage';

export type Profile = {
  name: string;
  phone: string;
  instagram: string;
  // Custom lines the owner can say when the phone comes back.
  questions: string[];
  compliments: string[];
};

export const DEFAULT_QUESTIONS = [
  'So… coffee sometime?',
  'What does your perfect Saturday look like?',
  'Can I take you out for a proper drink?',
  'What’s something you’ve been meaning to try?',
  'If we grabbed coffee, what would we talk about?',
];

export const DEFAULT_COMPLIMENTS = [
  'You have great energy.',
  'I really enjoyed talking to you.',
  'You’re easier to talk to than I expected.',
  'You have a lovely smile.',
  'I’m glad I handed you the phone.',
];

export const EMPTY_PROFILE: Profile = {
  name: '',
  phone: '',
  instagram: '',
  questions: [...DEFAULT_QUESTIONS],
  compliments: [...DEFAULT_COMPLIMENTS],
};

const PROFILE_KEY = 'bear-with-me.profile.v2';

export async function loadProfile(): Promise<Profile> {
  try {
    const raw = await AsyncStorage.getItem(PROFILE_KEY);
    if (!raw) return EMPTY_PROFILE;

    const parsed = JSON.parse(raw) as Partial<Profile>;
    return {
      name: typeof parsed.name === 'string' ? parsed.name : '',
      phone: typeof parsed.phone === 'string' ? parsed.phone : '',
      instagram:
        typeof parsed.instagram === 'string' ? parsed.instagram : '',
      questions:
        Array.isArray(parsed.questions) && parsed.questions.every(
          (q) => typeof q === 'string'
        )
          ? (parsed.questions as string[])
          : [...DEFAULT_QUESTIONS],
      compliments:
        Array.isArray(parsed.compliments) &&
          parsed.compliments.every((c) => typeof c === 'string')
          ? (parsed.compliments as string[])
          : [...DEFAULT_COMPLIMENTS],
    };
  } catch {
    return EMPTY_PROFILE;
  }
}

export async function saveProfile(profile: Profile): Promise<void> {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function normaliseProfile(profile: Profile): Profile {
  return {
    name: profile.name.trim().slice(0, 24),
    phone: profile.phone.trim().slice(0, 24),
    instagram: profile.instagram
      .trim()
      .replace(/^@+/, '')
      .replace(/\s+/g, '')
      .slice(0, 30),
    questions: (profile.questions || [...DEFAULT_QUESTIONS]).map((q) =>
      q.trim().slice(0, 120)
    ),
    compliments: (profile.compliments || [...DEFAULT_COMPLIMENTS]).map((c) =>
      c.trim().slice(0, 120)
    ),
  };
}

export function phoneHref(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return `sms:${cleaned}`;
}

export function instagramHref(handle: string): string {
  return `https://instagram.com/${handle.replace(/^@+/, '')}`;
}
