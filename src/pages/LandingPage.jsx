
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

const content = {
  EN: {
    navAbout: "About",
    navFeatures: "Features",
    navProgramme: "Programme",
    navTeam: "Our Team",
    navVoices: "Community",
    navFaq: "FAQs",
    navJoin: "Join Us",
    backToTop: "Back to top ↑",

    heroEyebrow: "Student Mental Health & Wellbeing",
    heroTitle: "Your mental wellbeing matters.",
    heroDescription:
      "A supportive digital space where university students can learn about mental health, explore wellbeing resources, connect with peers, and discover pathways to support.",
    joinButton: "Join Our Community",
    loginButton: "Log In",
    discoverButton: "Discover MHFA Connect",

    aboutEyebrow: "About MHFA Connect",
    aboutTitle: "Making mental health support more accessible to students",
    aboutDescription:
      "University life can be exciting, but it can also bring academic pressure, financial worries, loneliness, relationship challenges, and uncertainty about the future. Students may experience emotional distress without knowing how to talk about it, where to find reliable information, or whom to approach for support.",
    aboutExtra:
      "MHFA Connect is a student-focused mental health awareness and wellbeing platform designed to help bridge that gap. It brings educational resources, AI-supported guidance, peer-support information, self-help materials, and support-directory information together in one accessible digital space.",
    aboutPurpose:
      "Our aim is to encourage open conversations about mental health, reduce stigma, strengthen mental health awareness, and help students explore appropriate support options. We want students to feel better informed, less alone, and more confident about taking steps towards their wellbeing.",
    aboutDisclaimer:
      "MHFA Connect does not diagnose mental health conditions or replace qualified mental health professionals. It is a supportive educational resource that helps users understand their options and seek appropriate help.",

    featuresEyebrow: "What You Can Explore",
    featuresTitle: "Support for your wellbeing journey",
    featuresDescription:
      "Explore features designed to help you learn, reflect, find information, and connect with support.",
    feature1Title: "AI Wellbeing Companion",
    feature1Description:
      "Explore AI-supported conversations for mental health information, wellbeing guidance, and suggestions for helpful next steps. The AI is an educational support tool, not a therapist or diagnostic service.",
    feature2Title: "Peer Counsellors",
    feature2Description:
      "Learn about peer-support opportunities and the people associated with the initiative. Peer support can encourage connection and listening, while serious or persistent concerns may require professional assistance.",
    feature3Title: "Self-Help Resources",
    feature3Description:
      "Explore practical wellbeing activities and self-help materials that may help you reflect, manage everyday stress, and build healthier routines.",
    feature4Title: "Support Directory",
    feature4Description:
      "Explore information about support services and resources so you can identify possible next steps when you need additional assistance.",
    feature5Title: "Mental Health Learning",
    feature5Description:
      "Build your understanding of mental health, emotional wellbeing, stigma, and supportive responses through educational materials and learning activities.",
    feature6Title: "Multilingual Access",
    feature6Description:
      "Switch between English and Sesotho to make the platform's information easier to access in your preferred language.",

    programmeEyebrow: "Learn and Grow",
    programmeTitle: "Build your mental health awareness",
    programmeDescription:
      "Explore learning materials that encourage mental health awareness, empathy, and supportive responses to people who may be experiencing emotional distress.",
    programmeButton: "Explore the Programme",

    teamEyebrow: "People Behind the Initiative",
    teamTitle: "Meet Our Peer Support Team",
    teamDescription:
      "Meet the people associated with the initiative and learn about their academic backgrounds.",
    teamMembers: [
      {
        name: "Thato",
        qualification: "BSc in Spiritual Care and Counselling",
        description:
          "An academic background in spiritual care and counselling, with relevance to compassionate listening, personal wellbeing, and supportive connection.",
      },
      {
        name: "Bokang",
        qualification: "BSc in Social Work",
        description:
          "An academic background in social work, with relevance to social wellbeing, human connection, and understanding support needs.",
      },
    ],
    teamNote:
      "Please confirm each person's role, consent to being featured, and relevant training before describing them as a trained peer counsellor. Academic qualifications alone do not establish professional registration or clinical credentials.",

    voicesEyebrow: "Community Voices",
    voicesTitle: "What matters to students",
    voicesDescription:
      "These illustrative examples represent topics the platform hopes to learn about. They are not real student testimonials.",
    voiceLabel: "Illustrative example",
    voices: [
      {
        title: "A welcoming space",
        quote:
          "Students need spaces where they can learn about mental health without feeling judged.",
      },
      {
        title: "Accessible information",
        quote:
          "Clear information can help students understand their options and where to seek further support.",
      },
      {
        title: "Connection matters",
        quote:
          "Feeling heard and knowing where to turn can make seeking support feel less intimidating.",
      },
    ],
    voicesNote:
      "These are placeholder examples, not quotations from actual students. Replace them with genuine feedback only after obtaining permission from the people who provide it.",

    valuesEyebrow: "Our Commitment",
    valuesTitle: "What guides MHFA Connect",
    value1Title: "Empathy",
    value1Description:
      "We encourage compassion, respectful listening, and understanding when discussing mental health.",
    value2Title: "Accessibility",
    value2Description:
      "We aim to make mental health information and support pathways easier for students to explore.",
    value3Title: "Connection",
    value3Description:
      "We recognise the value of supportive relationships, peer connection, and knowing where to find help.",

    faqEyebrow: "Frequently Asked Questions",
    faqTitle: "Questions about MHFA Connect",
    faqs: [
      {
        question: "1. What is MHFA Connect?",
        answer:
          "MHFA Connect is a student-focused mental health awareness and wellbeing platform. It brings together educational resources, AI-supported guidance, self-help materials, peer-support information, and a directory of support resources to help students explore their wellbeing options.",
      },
      {
        question: "2. Who can use MHFA Connect?",
        answer:
          "The platform is designed primarily for university students who want to learn about mental health, explore wellbeing resources, and understand where to seek support. The information is educational and does not replace individual assessment or professional care.",
      },
      {
        question: "3. How does the AI Wellbeing Companion work?",
        answer:
          "The AI Wellbeing Companion is designed to provide general mental health information, supportive guidance, and suggestions for possible next steps. AI can make mistakes and cannot diagnose conditions or replace a qualified professional. For serious, persistent, or worsening concerns, seek support from an appropriate healthcare professional.",
      },
      {
        question: "4. Is MHFA Connect a substitute for therapy or professional treatment?",
        answer:
          "No. MHFA Connect is an educational and supportive resource, not a mental health clinic. It does not diagnose conditions or replace therapy, medical advice, or professional treatment. If you need clinical support, contact a qualified mental health or healthcare professional.",
      },
      {
        question: "5. What can I find in the self-help resources?",
        answer:
          "The self-help section is intended to provide educational materials and practical wellbeing activities that may help with everyday stress, reflection, and healthy routines. These resources are not a substitute for professional care when you are experiencing significant distress.",
      },
      {
        question: "6. How can peer support help me?",
        answer:
          "Peer support can provide opportunities for connection, listening, and shared understanding. It is different from professional counselling or clinical treatment. If a concern is serious, persistent, or beyond a peer supporter's role, professional help may be needed.",
      },
      {
        question: "7. Can I use MHFA Connect in English and Sesotho?",
        answer:
          "The landing page provides English and Sesotho language options. Use the language selector to switch between them. The availability and completeness of translations may differ across individual features and resources.",
      },
      {
        question: "8. What should I do if I or someone else is in crisis?",
        answer:
          "Do not rely on the platform or its AI as an emergency service. If you or someone else is in immediate danger, contact local emergency services or seek urgent assistance from a nearby healthcare facility or trusted healthcare professional. If possible, reach out to a trusted person who can help you access support.",
      },
    ],

    safetyTitle: "Your safety matters",
    safetyDescription:
      "MHFA Connect provides educational information and wellbeing resources. It does not diagnose conditions, provide emergency response, or replace professional mental health care. If you or someone else is in immediate danger, contact local emergency services or seek urgent assistance from a healthcare provider.",

    finalTitle: "You don't have to navigate wellbeing alone.",
    finalDescription:
      "Start exploring resources, build your understanding of mental health, and discover support options that may help you take your next step.",
    finalButton: "Join MHFA Connect",

    footerDescription:
      "A student-focused initiative promoting mental health awareness, supportive connection, and wellbeing.",
    footerDisclaimer:
      "Educational information only. Not a substitute for professional mental health care.",
    authorCredit: "Designed and developed by Palesa Thetele",
  },

  ST: {
    navAbout: "Ka rona",
    navFeatures: "Dikarolo",
    navProgramme: "Lenaneo",
    navTeam: "Sehlopha sa rona",
    navVoices: "Setjhaba",
    navFaq: "Dipotso",
    navJoin: "Eba karolo",
    backToTop: "Khutlela hodimo ↑",

    heroEyebrow: "Bophelo bo botle ba kelello ba baithuti",
    heroTitle: "Bophelo ba hao ba kelello bo bohlokwa.",
    heroDescription:
      "Sebaka sa dijithale se tshehetsang baithuti ba diyunivesithi ho ithuta ka bophelo ba kelello, ho fumana mehlodi ya bophelo bo botle, ho hokahana le dithaka, le ho tseba ditsela tsa ho fumana tshehetso.",
    joinButton: "Eba karolo ya rona",
    loginButton: "Kena",
    discoverButton: "Tseba MHFA Connect",

    aboutEyebrow: "Ka MHFA Connect",
    aboutTitle: "Ho etsa hore tshehetso ya bophelo ba kelello e fumanehe ha bonolo ho baithuti",
    aboutDescription:
      "Bophelo ba yunivesithi bo ka ba monate, empa bo ka boela ba tlisa kgatello ya dithuto, mathata a ditjhelete, bodutu, mathata a dikamano, le ho se tsebe bokamoso. Baithuti ba ka ba le mathata a maikutlo ba sa tsebe hore na ba bue le mang, ba fumane tlhahisoleseding e tshepahalang hokae, kapa ba kope thuso ho mang.",
    aboutExtra:
      "MHFA Connect ke sethala sa tlhokomediso ka bophelo ba kelello le bophelo bo botle se shebaneng le baithuti. Se ikemiseditse ho kopanya mehlodi ya thuto, tataiso e thuswang ke AI, tlhahisoleseding ya tshehetso ya dithaka, mehlodi ya ho ithusa, le lenane la ditshebeletso tsa tshehetso sebakeng se le seng sa dijithale.",
    aboutPurpose:
      "Sepheo sa rona ke ho kgothaletsa dipuisano tse bulehileng ka bophelo ba kelello, ho fokotsa sekhobo, ho matlafatsa tsebo, le ho thusa baithuti ho fumana ditsela tse loketseng tsa tshehetso. Re batla hore baithuti ba be le tsebo e eketsehileng, ba se ke ba ikutlwa ba le bang, mme ba kgone ho nka mehato e tshehetsang bophelo ba bona.",
    aboutDisclaimer:
      "MHFA Connect ha e hlahlobe mafu a bophelo ba kelello ebile ha e nke sebaka sa ditsebi tse tshwanelehang. Ke mohlodi wa thuto le tshehetso o thusang batho ho utlwisisa dikgetho tsa bona le ho batla thuso e loketseng.",

    featuresEyebrow: "Seo o ka se fumanang",
    featuresTitle: "Tshehetso leetong la hao la bophelo bo botle",
    featuresDescription:
      "Fumana dikarolo tse o thusang ho ithuta, ho inahana, ho fumana tlhahisoleseding, le ho hokahana le tshehetso.",
    feature1Title: "Mothusi wa AI wa bophelo bo botle",
    feature1Description:
      "Fumana dipuisano tse thuswang ke AI bakeng sa tlhahisoleseding ya bophelo ba kelello, tataiso ya bophelo bo botle, le mehato e ka thusang. AI ke sesebediswa sa thuto le tshehetso, eseng ngaka kapa sesebediswa sa ho hlahloba mafu.",
    feature2Title: "Baeletsi ba dithaka",
    feature2Description:
      "Ithute ka menyetla ya tshehetso ya dithaka le batho ba amanang le morero. Tshehetso ya dithaka e ka kgothaletsa dikamano le ho mamelana, empa mathata a tebileng a ka hloka thuso ya setsebi.",
    feature3Title: "Mehlodi ya ho ithusa",
    feature3Description:
      "Fumana mesebetsi ya bophelo bo botle le mehlodi e ka o thusang ho inahana, ho sebetsana le kgatello ya letsatsi le letsatsi, le ho aha mekgwa e metle.",
    feature4Title: "Lenane la ditshehetso",
    feature4Description:
      "Fumana tlhahisoleseding ka ditshebeletso le mehlodi ya tshehetso ho tseba mehato eo o ka e nkang ha o hloka thuso e eketsehileng.",
    feature5Title: "Ho ithuta ka bophelo ba kelello",
    feature5Description:
      "Matlafatsa tsebo ya hao ka bophelo ba kelello, maikutlo, sekhobo, le ditsela tsa ho tshehetsa ba bang ka dithuto le mesebetsi ya ho ithuta.",
    feature6Title: "Tshebediso ya dipuo tse ngata",
    feature6Description:
      "Fetola pakeng tsa Senyesemane le Sesotho ho fumana tlhahisoleseding ya sethala ka puo eo o e ratang.",

    programmeEyebrow: "Ithute mme o hole",
    programmeTitle: "Matlafatsa tsebo ya hao ka bophelo ba kelello",
    programmeDescription:
      "Fumana dithuto tse kgothaletsang tlhokomediso ka bophelo ba kelello, kutlwelobohloko, le ditsela tsa ho tshehetsa batho ba nang le mathata a maikutlo.",
    programmeButton: "Sheba lenaneo",

    teamEyebrow: "Batho ba ka mora morero",
    teamTitle: "Kopana le sehlopha sa rona sa tshehetso ya dithaka",
    teamDescription:
      "Kopana le batho ba amanang le morero mme o ithute ka dithuto tsa bona.",
    teamMembers: [
      {
        name: "Thato",
        qualification: "BSc in Spiritual Care and Counselling",
        description:
          "O na le semelo sa dithuto tsa tlhokomelo ya moya le boeletsi, tse amanang le kutlwelobohloko, bophelo bo botle, le tshehetso.",
      },
      {
        name: "Bokang",
        qualification: "BSc in Social Work",
        description:
          "O na le semelo sa dithuto tsa social work, tse amanang le bophelo ba setjhaba, dikamano tsa batho, le ditlhoko tsa tshehetso.",
      },
    ],
    teamNote:
      "Netefatsa karolo ya motho ka mong, tumello ya hae, le thupello ya hae pele o mo hlalosa e le moeletsi ya rupetsweng. Dithuto feela ha di bolele hore motho o ngodisitswe e le setsebi sa bophelo ba kelello.",

    voicesEyebrow: "Maikutlo a setjhaba",
    voicesTitle: "Se bohlokwa ho baithuti",
    voicesDescription:
      "Mehlala ena e bontsha dihlooho tseo sethala se ka ratang ho ithuta ka tsona. Ha se dipaki tsa nnete tsa baithuti.",
    voiceLabel: "Mohlala feela",
    voices: [
      {
        title: "Sebaka se amohelang bohle",
        quote:
          "Baithuti ba hloka dibaka tseo ba ka ithutang ka bophelo ba kelello ntle le ho tshaba ho ahlolwa.",
      },
      {
        title: "Tlhahisoleseding e fumanehang ha bonolo",
        quote:
          "Tlhahisoleseding e hlakileng e ka thusa baithuti ho utlwisisa dikgetho tsa bona le moo ba ka batlang thuso.",
      },
      {
        title: "Dikamano di bohlokwa",
        quote:
          "Ho ikutlwa o mametswe le ho tseba moo o ka yang teng ho ka etsa hore ho batla tshehetso ho be bonolo.",
      },
    ],
    voicesNote:
      "Ena ke mehlala feela, eseng dipolelo tsa baithuti ba nnete. E nkele sebaka ka maikutlo a nnete ha tumello ya batho ba faneng ka ona e fumanwe.",

    valuesEyebrow: "Boitlamo ba rona",
    valuesTitle: "Se tataisang MHFA Connect",
    value1Title: "Kutlwelobohloko",
    value1Description:
      "Re kgothaletsa kutlwelobohloko, ho mamela ka tlhompho, le kutlwisiso ha ho buuwa ka bophelo ba kelello.",
    value2Title: "Phihlello",
    value2Description:
      "Re ikemiseditse ho etsa hore tlhahisoleseding le ditsela tsa tshehetso di fumanehe ha bonolo ho baithuti.",
    value3Title: "Dikamano",
    value3Description:
      "Re ananela dikamano tse tshehetsang, ho hokahana ha dithaka, le ho tseba moo thuso e fumanehang teng.",

    faqEyebrow: "Dipotso tse botswang hangata",
    faqTitle: "Dipotso ka MHFA Connect",
    faqs: [
      {
        question: "1. MHFA Connect ke eng?",
        answer:
          "MHFA Connect ke sethala sa tlhokomediso ka bophelo ba kelello le bophelo bo botle se shebaneng le baithuti. Se kopanya mehlodi ya thuto, tataiso e thuswang ke AI, mehlodi ya ho ithusa, tlhahisoleseding ya tshehetso ya dithaka, le lenane la ditshehetso.",
      },
      {
        question: "2. Ke mang ya ka sebedisang MHFA Connect?",
        answer:
          "Sethala sena se etseditswe haholo baithuti ba diyunivesithi ba batlang ho ithuta ka bophelo ba kelello, ho fumana mehlodi ya bophelo bo botle, le ho tseba moo ba ka batlang tshehetso. Tlhahisoleseding ena ke ya thuto, ha e nke sebaka sa tlhahlobo ya motho kapa tlhokomelo ya setsebi.",
      },
      {
        question: "3. Mothusi wa AI o sebetsa jwang?",
        answer:
          "Mothusi wa AI o etseditswe ho fana ka tlhahisoleseding e akaretsang ka bophelo ba kelello, tataiso e tshehetsang, le mehato e ka thusang. AI e ka etsa diphoso ebile ha e hlahlobe mafu kapa ho nka sebaka sa setsebi se tshwanelehang. Batla thuso ya setsebi ha mathata a tebile, a tswela pele, kapa a mpefala.",
      },
      {
        question: "4. Na MHFA Connect e nka sebaka sa kalafo ya ditsebi?",
        answer:
          "Tjhe. MHFA Connect ke mohlodi wa thuto le tshehetso, eseng tleliniki ya bophelo ba kelello. Ha e hlahlobe mafu ebile ha e nke sebaka sa kalafo, keletso ya bongaka, kapa tlhokomelo ya ditsebi. Ikopanye le setsebi se tshwanelehang ha o hloka thuso ya bongaka.",
      },
      {
        question: "5. Nka fumana eng mehloding ya ho ithusa?",
        answer:
          "Karolo ya ho ithusa e fana ka mehlodi ya thuto le mesebetsi ya bophelo bo botle e ka thusang ka kgatello ya letsatsi le letsatsi, ho inahana, le ho aha mekgwa e metle. Mehlodi ena ha e nke sebaka sa tlhokomelo ya setsebi ha o na le mathata a tebileng.",
      },
      {
        question: "6. Tshehetso ya dithaka e ka nthusa jwang?",
        answer:
          "Tshehetso ya dithaka e ka fana ka menyetla ya dikamano, ho mamelana, le kutlwisiso e arolelanwang. E fapane le boeletsi ba setsebi kapa kalafo. Ha bothata bo tebile, bo tswela pele, kapa bo feta karolo ya motho ya fanang ka tshehetso ya dithaka, thuso ya setsebi e ka hlokahala.",
      },
      {
        question: "7. Na nka sebedisa MHFA Connect ka Senyesemane le Sesotho?",
        answer:
          "Leqephe la qalo le fana ka dikgetho tsa Senyesemane le Sesotho. Sebedisa kgetho ya puo ho fetola puo. Diphetolelo di ka fapana ho ya ka dikarolo le mehlodi e itseng ya sethala.",
      },
      {
        question: "8. Ke etseng ha nna kapa motho e mong a le maqakabetsing?",
        answer:
          "O se ke wa itshetleha ka sethala kapa AI e le tshebeletso ya tshohanyetso. Ha wena kapa motho e mong a le kotsing hanghang, ikopanye le ditshebeletso tsa tshohanyetso kapa o batle thuso e potlakileng setsing sa bophelo kapa ho setsebi sa bophelo bo botle. Ha ho kgoneha, ikopanye le motho eo o mo tshepang ya ka o thusang ho fumana tshehetso.",
      },
    ],

    safetyTitle: "Polokeho ya hao e bohlokwa",
    safetyDescription:
      "MHFA Connect e fana ka tlhahisoleseding ya thuto le mehlodi ya bophelo bo botle. Ha e hlahlobe mafu, ha e fane ka thuso ya tshohanyetso, ebile ha e nke sebaka sa tlhokomelo ya ditsebi. Ha wena kapa motho e mong a le kotsing hanghang, ikopanye le ditshebeletso tsa tshohanyetso kapa o batle thuso e potlakileng ho mofani wa tlhokomelo ya bophelo.",

    finalTitle: "Ha o a tlameha ho tobana le mathata o le mong.",
    finalDescription:
      "Qala ka ho sheba mehlodi, matlafatsa tsebo ya hao ka bophelo ba kelello, mme o fumane ditsela tsa tshehetso tse ka o thusang ho nka mohato o latelang.",
    finalButton: "Eba karolo ya MHFA Connect",

    footerDescription:
      "Morero o shebaneng le baithuti o kgothaletsang tlhokomediso ka bophelo ba kelello, dikamano tse tshehetsang, le bophelo bo botle.",
    footerDisclaimer:
      "Tlhahisoleseding ya thuto feela. Ha e nke sebaka sa tlhokomelo ya ditsebi tsa bophelo ba kelello.",
    authorCredit: "E entswe le ho ntshetswa pele ke Palesa Thetele",
  },
};

function MHFAConnectLogo({ light = false }) {
  return (
    <a
      href="#top"
      aria-label="MHFA Connect - back to top"
      className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary focus-visible:ring-offset-2"
    >
      <svg
        viewBox="0 0 64 64"
        role="img"
        aria-label="MHFA Connect heart and heartbeat logo"
        className="h-12 w-12 shrink-0"
      >
        <rect width="64" height="64" rx="19" fill="#E4F4EF" />
        <path
          d="M32 49S10 36 10 22C10 11 24 7 32 19C40 7 54 11 54 22C54 36 32 49 32 49Z"
          fill="#187B70"
        />
        <path
          d="M16 30H25L30 22L36 39L41 30H48"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span
        className={`text-xl font-extrabold tracking-tight ${
          light ? "text-white" : "text-mhfa-primary"
        }`}
      >
        MHFA Connect
      </span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-mhfa-primary">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold leading-tight text-mhfa-text sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-mhfa-muted">
          {description}
        </p>
      )}
    </div>
  );
}

function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-mhfa-light rounded-mhfa border border-mhfa-light bg-white px-5">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const answerId = `faq-answer-${index}`;

        return (
          <div key={faq.question} className="py-1">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-mhfa-text outline-none transition hover:text-mhfa-primary focus-visible:ring-2 focus-visible:ring-mhfa-primary focus-visible:ring-offset-2"
              >
                <span>{faq.question}</span>
                <span aria-hidden="true" className="shrink-0 text-xl">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>

            {isOpen && (
              <div
                id={answerId}
                role="region"
                aria-label={faq.question}
                className="pb-5 pr-6 leading-7 text-mhfa-muted"
              >
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function LandingPage() {
  const { lang } = useLanguage();
  const t = content[lang] || content.EN;

  const navigation = [
    { label: t.navAbout, href: "#about" },
    { label: t.navFeatures, href: "#features" },
    { label: t.navProgramme, href: "#wellbeing-learning" },
    { label: t.navTeam, href: "#peer-support-team" },
    { label: t.navVoices, href: "#community-voices" },
    { label: t.navFaq, href: "#faq" },
  ];

  const features = [
    { title: t.feature1Title, description: t.feature1Description, icon: "♡" },
    { title: t.feature2Title, description: t.feature2Description, icon: "◎" },
    { title: t.feature3Title, description: t.feature3Description, icon: "✧" },
    { title: t.feature4Title, description: t.feature4Description, icon: "↗" },
    { title: t.feature5Title, description: t.feature5Description, icon: "⌘" },
    { title: t.feature6Title, description: t.feature6Description, icon: "文" },
  ];

  const values = [
    { title: t.value1Title, description: t.value1Description },
    { title: t.value2Title, description: t.value2Description },
    { title: t.value3Title, description: t.value3Description },
  ];

  return (
    <main 
     id="top"
    className="min-h-screen bg-mhfa-background">
    
{/* Skip link: first interactive element on the page */}
<a
  href="#hero-content"
  className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-mhfa-primary focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-mhfa-primary focus:ring-offset-2"
>
  Skip to main content
</a>

      {/* Header and navigation */}
      <header className="border-b border-mhfa-light bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <MHFAConnectLogo />
          <LanguageSwitcher />
        </div>

        <nav
          aria-label="Main page navigation"
          className="mx-auto max-w-7xl px-4 pb-4 sm:px-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-mhfa-muted transition hover:bg-mhfa-background hover:text-mhfa-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary"
              >
                {item.label}
              </a>
            ))}

            <Link
              to="/join"
              className="rounded-full bg-mhfa-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary focus-visible:ring-offset-2"
            >
              {t.navJoin}
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section
      id="hero-content"
      tabIndex="-1"
      className="scroll-mt-8 px-5 py-20 text-center sm:px-8 sm:py-28"
      >
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-mhfa-primary">
            {t.heroEyebrow}
          </p>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            {t.heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-mhfa-muted sm:text-lg">
            {t.heroDescription}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              to="/join"
              className="rounded-full bg-mhfa-primary px-6 py-3 font-semibold text-white shadow-mhfa transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary focus-visible:ring-offset-2"
            >
              {t.joinButton}
            </Link>

            <Link
              to="/login"
              className="rounded-full border border-mhfa-primary px-6 py-3 font-semibold text-mhfa-primary transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary focus-visible:ring-offset-2"
            >
              {t.loginButton}
            </Link>

            <a
              href="#about"
              className="rounded-full px-6 py-3 font-semibold text-mhfa-text transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary focus-visible:ring-offset-2"
            >
              {t.discoverButton}
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="scroll-mt-8 bg-white px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={t.aboutEyebrow}
            title={t.aboutTitle}
          />

          <div className="mx-auto max-w-4xl space-y-5 leading-8 text-mhfa-muted">
            <p>{t.aboutDescription}</p>
            <p>{t.aboutExtra}</p>
            <p>{t.aboutPurpose}</p>

            <div className="rounded-mhfa border border-mhfa-light bg-mhfa-background p-5">
              <p className="font-semibold text-mhfa-text">
                {t.aboutDisclaimer}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={t.featuresEyebrow}
            title={t.featuresTitle}
            description={t.featuresDescription}
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-mhfa border border-mhfa-light bg-white p-6 shadow-mhfa transition hover:-translate-y-1"
              >
                <div
                  aria-hidden="true"
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-mhfa-background text-2xl font-bold text-mhfa-primary"
                >
                  {feature.icon}
                </div>

                <h3 className="text-lg font-bold">{feature.title}</h3>

                <p className="mt-3 leading-7 text-mhfa-muted">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Programme */}
      <section
        id="wellbeing-learning"
        className="scroll-mt-8 bg-mhfa-dark px-5 py-16 text-white sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-mhfa-light">
            {t.programmeEyebrow}
          </p>

          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            {t.programmeTitle}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/80">
            {t.programmeDescription}
          </p>

          <Link
            to="/programmes/student-wellbeing"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-mhfa-dark transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-mhfa-dark"
          >
            {t.programmeButton}
          </Link>
        </div>
      </section>

      {/* Peer support team */}
      <section
        id="peer-support-team"
        className="scroll-mt-8 bg-white px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={t.teamEyebrow}
            title={t.teamTitle}
            description={t.teamDescription}
          />

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {t.teamMembers.map((member) => (
              <article
                key={member.name}
                className="rounded-mhfa border border-mhfa-light bg-mhfa-background p-7"
              >
                <div
                  aria-hidden="true"
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-mhfa-primary text-xl font-bold text-white"
                >
                  {member.name.charAt(0)}
                </div>

                <h3 className="text-xl font-bold">{member.name}</h3>

                <p className="mt-2 font-semibold text-mhfa-primary">
                  {member.qualification}
                </p>

                <p className="mt-4 leading-7 text-mhfa-muted">
                  {member.description}
                </p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-4xl text-sm leading-6 text-mhfa-muted">
            {t.teamNote}
          </p>
        </div>
      </section>

      {/* Community voices */}
      <section
        id="community-voices"
        className="scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={t.voicesEyebrow}
            title={t.voicesTitle}
            description={t.voicesDescription}
          />

          <div className="grid gap-5 md:grid-cols-3">
            {t.voices.map((voice) => (
              <article
                key={voice.title}
                className="rounded-mhfa border border-mhfa-light bg-white p-6 shadow-mhfa"
              >
                <span className="inline-flex rounded-full bg-mhfa-background px-3 py-1 text-xs font-semibold text-mhfa-primary">
                  {t.voiceLabel}
                </span>

                <h3 className="mt-5 text-lg font-bold">{voice.title}</h3>

                <blockquote className="mt-3 leading-7 text-mhfa-muted">
                  “{voice.quote}”
                </blockquote>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-mhfa-muted">
            {t.voicesNote}
          </p>
        </div>
      </section>

      {/* Our commitment */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={t.valuesEyebrow}
            title={t.valuesTitle}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-mhfa bg-mhfa-background p-6 text-center"
              >
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="mt-3 leading-7 text-mhfa-muted">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Eight FAQs */}
      <section
        id="faq"
        className="scroll-mt-8 px-5 py-16 sm:px-8 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow={t.faqEyebrow}
            title={t.faqTitle}
          />

          <FAQAccordion faqs={t.faqs} />
        </div>
      </section>

      {/* Safety notice */}
      <section className="px-5 pb-10 sm:px-8">
        <div className="mx-auto max-w-5xl rounded-mhfa border border-mhfa-light bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold">{t.safetyTitle}</h2>
          <p className="mt-3 leading-7 text-mhfa-muted">
            {t.safetyDescription}
          </p>
        </div>
      </section>

      {/* Final call to action */}
      <section className="bg-mhfa-background px-5 py-16 text-center sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            {t.finalTitle}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-mhfa-muted">
            {t.finalDescription}
          </p>

          <Link
            to="/join"
            className="mt-8 inline-flex rounded-full bg-mhfa-primary px-7 py-3 font-semibold text-white shadow-mhfa transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mhfa-primary focus-visible:ring-offset-2"
          >
            {t.finalButton}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mhfa-dark px-5 py-10 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl">
              <MHFAConnectLogo light />

              <p className="mt-4 leading-7 text-white/75">
                {t.footerDescription}
              </p>

              <p className="mt-3 text-sm leading-6 text-white/60">
                {t.footerDisclaimer}
              </p>
            </div>

            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/80">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="rounded-sm hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}

                <li>
                  <Link
                    to="/join"
                    className="rounded-sm hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {t.navJoin}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/20 pt-6 sm:flex-row sm:items-center">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} MHFA Connect
            </p>

            <a
              href="https://www.linkedin.com/in/palesa-thetele-4b6246276/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/80 underline decoration-white/40 underline-offset-4 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t.authorCredit}
            </a>

            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {t.backToTop}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
