// src/constants.js

export const LANGS = {
  EN: {
    privacy: '100% ANONYMOUS & SECURE',
    h1: 'Mental Health First Aid',
    p: 'Get immediate triage, access regional helplines, or speak with trained peers.',
    qa1: 'AI Triage Chat', qa1s: 'Instant anonymous guidance',
    qa2: 'Self-Help Modules', qa2s: 'Downloadable guides',
    qa3: 'Support Directory', qa3s: 'Campus & national helplines',
    qa4: 'Peer Support', qa4s: 'Talk to trained peers',
    greeting: "Hi there 👋 I'm here to listen. What's on your mind today?",
    peerTitle: 'Peer Support Network', peerSub: 'Connect with trained peer counsellors',
    selfHelpTitle: 'Self-Help Resources', selfHelpSub: 'Download guides for coping strategies',
    findSupportTitle: 'Find Support', findSupportSub: 'Helplines and resources available to you',
    settingsTitle: 'Settings', privacySec: 'Privacy & Security',
    pinLock: 'App PIN Lock', pinSub: 'Require a PIN to open the app',
    setPinBtn: 'Set PIN', dangerZone: 'This will log you out of your current session.',
    logoutBtn: 'Logout', downloadBtn: 'Download',
    startPeerChat: 'Start Chat', cancel: 'Cancel', savePin: 'Save PIN',
    pinModalTitle: 'Set Your 4-Digit PIN', pinModalSub: 'This will be required to open the app.',
    modules: {
      anxiety: { title: 'Managing Anxiety', desc: 'Techniques for grounding and breathing exercises.', content: 'MANAGING ANXIETY\n1. Grounding 5-4-3-2-1\n2. Box Breathing' },
      depression: { title: 'Coping with Low Mood', desc: 'Strategies for behavioral activation.', content: 'COPING WITH LOW MOOD\n\n1. Behavioral Activation' }
    },
    peers: {
      kila: { specialty: 'Academic Stress & Burnout' },
      amina: { specialty: 'Anxiety & Social Support' }
    },
    directory: {
      campus: { title: 'Campus Counselling Center', desc: 'Free and confidential counseling services.' },
      national: { title: 'National Helpline', desc: '24/7 crisis support line.' }
    }
  },

  SW: {
    privacy: '100% SIO YA KUTAMBULIKA NA SALAMA',
    h1: 'Huduma ya Kwanza ya Afya ya Akili',
    p: 'Pata msaada wa haraka, fikia nambari za dharura, au zungumza na wenzako.',
    qa1: 'Soga ya AI', qa1s: 'Mwongozo wa papo hapo',
    qa2: 'Rasilimali za Kujisaidia', qa2s: 'Miongozo inayopakuliwa',
    qa3: 'Orodha ya Msaada', qa3s: 'Nambari za chuo na kitaifa',
    qa4: 'Msaada wa Wenzangu', qa4s: 'Zungumza na wanafunzi wenzako',
    greeting: "Karibu. Niko hapa kusikiza. Nini kimekuwa mawazo yako leo?",
    peerTitle: 'Mtandao wa Msaada wa Wenzako', peerSub: 'Ungana na washauri wenzako waliofundishwa',
    selfHelpTitle: 'Rasilimali za Kujisaidia', selfHelpSub: 'Pakua miongozo ya mikakati ya kukabiliana',
    findSupportTitle: 'Tafuta Msaada', findSupportSub: 'Nambari za msaada na rasilimali zinazopatikana',
    settingsTitle: 'Mipangilio', privacySec: 'Faragha na Usalama',
    pinLock: 'Kufunga kwa PIN', pinSub: 'Hutaji PIN ili kufungua programu',
    setPinBtn: 'Weka PIN', dangerZone: 'Hii itakutoka kwenye kikao chako cha sasa.',
    logoutBtn: 'Toka', downloadBtn: 'Pakua',
    startPeerChat: 'Anza Mazungumzo', cancel: 'Ghairi', savePin: 'Hifadhi PIN',
    pinModalTitle: 'Weka PIN yako ya tarakimu 4', pinModalSub: 'Hii itahitajika kufungua programu.',
    modules: {
      anxiety: { title: 'Kudhibiti Wasiwasi', desc: 'Mbinu za kutuliza na mazoezi ya kupumua.', content: 'KUDHIBITI WASIWASI\n1. Njia ya 5-4-3-2-1' },
      depression: { title: 'Kukabiliana na Huzuni', desc: 'Mikakati ya kuboresha hali.', content: 'KUKABILIANA NA HUZUNI\n1. Anza na vitu vidogo' }
    },
    peers: {
      kila: { specialty: 'Msongo wa Masomo na Kuchoka' },
      amina: { specialty: 'Wasiwasi na Msaada wa Kijamii' }
    },
    directory: {
      campus: { title: 'Kituo cha Ushauri cha Chuo', desc: 'Huduma za ushauri za siri na bure.' },
      national: { title: 'Mstari wa Kitaifa wa Msaada', desc: 'Mstari wa dharura wa masaa 24/7.' }
    }
  },

  SG: {
    privacy: '100% NI SIRI NA SALAMA SANA',
    h1: 'MHFA: Msaada wa Kwanza kwa Akili',
    p: 'Pata help haraka, piga nambari za dharura, ama ongea na wasee wamesomea.',
    qa1: 'AI Chat ya Kusaidia', qa1s: 'Msaada wa papo hapo bila kujulikana',
    qa2: 'Vitu za Kujisaidia', qa2s: 'Guides unadownload',
    qa3: 'Orodha ya Msaada', qa3s: 'Nambari za chuo na Kenya mzima',
    qa4: 'Msaada wa Wenyewe', qa4s: 'Ongea na peer wako',
    greeting: "Sasa bro/sis 👋 Niko hapa kuskiza. Ni nini imekushika leo?",
    peerTitle: 'Team ya Wasee wa Kusaidia', peerSub: 'Ungana na wasee wamesomea kusaidia',
    selfHelpTitle: 'Vitu za Kujisaidia', selfHelpSub: 'Download vitu za kukupatia nguvu',
    findSupportTitle: 'Pata Msaada', findSupportSub: 'Nambari na vitu zitakusaidia',
    settingsTitle: 'Settings', privacySec: 'Siri na Usalama',
    pinLock: 'Funga na PIN', pinSub: 'Utawekanga PIN kufungua app',
    setPinBtn: 'Weka PIN', dangerZone: 'Hii itakutoboa kwa session yako.',
    logoutBtn: 'Toka', downloadBtn: 'Download',
    startPeerChat: 'Anza Kuongea', cancel: 'Wacha', savePin: 'Save PIN',
    pinModalTitle: 'Weka PIN yako ya nambari 4', pinModalSub: 'Itabidi uiweke kila ukifungua app.',
    modules: {
      anxiety: { title: 'Kudeal na Wasiwasi', desc: 'Mbinu za kupoa na kupumua vizuri.', content: 'KUDEAL NA WASIWASI\n1. Jaribu 5-4-3-2-1 grounding\n2. Pumua: ingiza 4sec, shika 4sec, toa 4sec' },
      depression: { title: 'Ukiwa Down', desc: 'Vitu za kufanya ukiwa na huzuni.', content: 'UKIWA DOWN\n\n1. Fanya kitu kidogo kila siku\n2. Ongea na mtu' }
    },
    peers: {
      kila: { specialty: 'Msongo ya Masomo na Kuchoka' },
      amina: { specialty: 'Wasiwasi na Vitu za Kijamii' }
    },
    directory: {
      campus: { title: 'Office ya Counselling Chuo', desc: 'Ni free na ni siri. Enda ukiongee.' },
      national: { title: 'Nambari ya Dharura Kenya', desc: 'Wako 24/7 kukusaidia. Piga 1196' }
    }
  }
};

export const SELF_HELP_MODULES = [
  { id: 'anxiety', title: 'Managing Anxiety', type: 'PDF Guide', size: '2.1MB', content: 'MANAGING ANXIETY\n1. Grounding 5-4-3-2-1\n2. Box Breathing' },
  { id: 'depression', title: 'Coping with Low Mood', type: 'PDF Guide', size: '1.8MB', content: 'COPING WITH LOW MOOD\n\n1. Behavioral Activation' }
];

export const PEER_COUNSELLORS = [
  { id: 'kila', alias: 'Peer Helper Kila', status: 'Online', rating: '4.9★', specialty: 'Academic Stress & Burnout' },
  { id: 'amina', alias: 'Peer Helper Amina', status: 'Online', rating: '5.0★', specialty: 'Anxiety & Social Support' }
];

export const SUPPORT_DIRECTORY = [
  { id: 'campus', title: 'Campus Counselling Center', badge: 'On-Campus', badgeClass: 'on-campus', contact: 'Tel: 020-1234567', hours: 'Mon-Fri 8AM-5PM' },
  { id: 'national', title: 'National Helpline', badge: '24/7', badgeClass: 'hotline', contact: 'Call: 1196 or 0800 720 080', hours: 'Available 24/7' }
];