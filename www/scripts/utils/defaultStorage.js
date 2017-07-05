export var localData = {
  initialized: true,
  activation: true,
  blacklist: '(stackoverflow.com|github.com|code.google.com|developer.*.com|duolingo.com)',
  savedPatterns: JSON.stringify([[["en","English"],["de","German"],"70",true,"Yandex",0]]),
  sourceLanguage: "en",
  targetLanguage: "de",
  translatedWordStyle: 'font-style: inherit;\ncolor: rgba(255,153,0,1);\nbackground-color: rgba(256, 100, 50, 0);',
  userBlacklistedWords: '(this|that)',
  translationProbability: 15,
  minimumSourceWordLength: 3,
  ngramMin: 1,
  ngramMax: 1,
  userDefinedTranslations: '{"the":"the", "a":"a"}',
  translatorService: "Yandex",
  yandexTranslatorApiKey: "trnsl.1.1.20170301T064510Z.618c32666dedf402.2c755f626e7174efe9612ee5031f6732860825f0",
  googleTranslatorApiKey: '',
  bingTranslatorApiKey: {clientId: '', clientSecret: ''},
  playbackOptions: '{"volume": 1.0, "rate": 1.0, "voiceName": "Google US English", "pitch": 0.5 }',
  // format: {word1: E/N/H, word2: E/N/H}
  // E -> easy, N -> normal, H -> hard
  difficultyBuckets: '{}',
  learntWords:'()',
  savedTranslations: '{}',
  userDefinedOnly: false,
  doNotTranslate: false,
  stats: {'totalWordsTranslated': 0, 'translatorWiseWordCount': JSON.stringify([{'J': {}}, {'M': {}}]) },
  toggleFrequency: '{}',
  activationFrequency: '{}',
  activationToggles: 3,
  wordToggles: 20,
  autoBlacklist: true,
  translatedWordsForQuiz: '{}',
  oneWordTranslation: false,
  logMessages: JSON.stringify([]),

};