TURN THIS {import React, { useState, useEffect, useRef } from 'react';
import {
  FaSearch,
  FaChevronRight,
  FaChevronDown,
  FaVolumeUp,
  FaVolumeOff,
} from 'react-icons/fa';
 // Adjust if needed
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';
// -------------------------------------------------------------------------------------------
// 1) Your language list
// -------------------------------------------------------------------------------------------
const languages = [
  { code: 'af-ZA', name: 'Afrikaans (South Africa)' },
  { code: 'am-ET', name: 'Amharic (Ethiopia)' },
  { code: 'ar-AE', name: 'Arabic (United Arab Emirates)' },
  { code: 'ar-BH', name: 'Arabic (Bahrain)' },
  { code: 'ar-DZ', name: 'Arabic (Algeria)' },
  { code: 'ar-EG', name: 'Arabic (Egypt)' },
  { code: 'ar-IQ', name: 'Arabic (Iraq)' },
  { code: 'ar-JO', name: 'Arabic (Jordan)' },
  { code: 'ar-KW', name: 'Arabic (Kuwait)' },
  { code: 'ar-LB', name: 'Arabic (Lebanon)' },
  { code: 'ar-MA', name: 'Arabic (Morocco)' },
  { code: 'ar-OM', name: 'Arabic (Oman)' },
  { code: 'ar-QA', name: 'Arabic (Qatar)' },
  { code: 'ar-SA', name: 'Arabic (Saudi Arabia)' },
  { code: 'ar-TN', name: 'Arabic (Tunisia)' },
  { code: 'ar-YE', name: 'Arabic (Yemen)' },
  { code: 'bg-BG', name: 'Bulgarian (Bulgaria)' },
  { code: 'bn-BD', name: 'Bengali (Bangladesh)' },
  { code: 'bn-IN', name: 'Bengali (India)' },
  { code: 'ca-ES', name: 'Catalan (Spain)' },
  { code: 'cs-CZ', name: 'Czech (Czech Republic)' },
  { code: 'da-DK', name: 'Danish (Denmark)' },
  { code: 'de-DE', name: 'German (Germany)' },
  { code: 'el-GR', name: 'Greek (Greece)' },
  { code: 'en-AU', name: 'English (Australia)' },
  { code: 'en-CA', name: 'English (Canada)' },
  { code: 'en-GB', name: 'English (United Kingdom)' },
  { code: 'en-GH', name: 'English (Ghana)' },
  { code: 'en-HK', name: 'English (Hong Kong)' },
  { code: 'en-IN', name: 'English (India)' },
  { code: 'en-IE', name: 'English (Ireland)' },
  { code: 'en-KE', name: 'English (Kenya)' },
  { code: 'en-NG', name: 'English (Nigeria)' },
  { code: 'en-NZ', name: 'English (New Zealand)' },
  { code: 'en-PH', name: 'English (Philippines)' },
  { code: 'en-SG', name: 'English (Singapore)' },
  { code: 'en-TZ', name: 'English (Tanzania)' },
  { code: 'en-US', name: 'English (United States)' },
  { code: 'en-ZA', name: 'English (South Africa)' },
  { code: 'es-AR', name: 'Spanish (Argentina)' },
  { code: 'es-BO', name: 'Spanish (Bolivia)' },
  { code: 'es-CL', name: 'Spanish (Chile)' },
  { code: 'es-CO', name: 'Spanish (Colombia)' },
  { code: 'es-CR', name: 'Spanish (Costa Rica)' },
  { code: 'es-CU', name: 'Spanish (Cuba)' },
  { code: 'es-DO', name: 'Spanish (Dominican Republic)' },
  { code: 'es-EC', name: 'Spanish (Ecuador)' },
  { code: 'es-ES', name: 'Spanish (Spain)' },
  { code: 'es-GT', name: 'Spanish (Guatemala)' },
  { code: 'es-HN', name: 'Spanish (Honduras)' },
  { code: 'es-MX', name: 'Spanish (Mexico)' },
  { code: 'es-NI', name: 'Spanish (Nicaragua)' },
  { code: 'es-PA', name: 'Spanish (Panama)' },
  { code: 'es-PE', name: 'Spanish (Peru)' },
  { code: 'es-PR', name: 'Spanish (Puerto Rico)' },
  { code: 'es-PY', name: 'Spanish (Paraguay)' },
  { code: 'es-SV', name: 'Spanish (El Salvador)' },
  { code: 'es-US', name: 'Spanish (United States)' },
  { code: 'es-UY', name: 'Spanish (Uruguay)' },
  { code: 'es-VE', name: 'Spanish (Venezuela)' },
  { code: 'et-EE', name: 'Estonian (Estonia)' },
  { code: 'fa-IR', name: 'Persian (Iran)' },
  { code: 'fi-FI', name: 'Finnish (Finland)' },
  { code: 'fil-PH', name: 'Filipino (Philippines)' },
  { code: 'fr-BE', name: 'French (Belgium)' },
  { code: 'fr-CA', name: 'French (Canada)' },
  { code: 'fr-FR', name: 'French (France)' },
  { code: 'fr-CH', name: 'French (Switzerland)' },
  { code: 'ga-IE', name: 'Irish (Ireland)' },
  { code: 'gu-IN', name: 'Gujarati (India)' },
  { code: 'he-IL', name: 'Hebrew (Israel)' },
  { code: 'hi-IN', name: 'Hindi (India)' },
  { code: 'hr-HR', name: 'Croatian (Croatia)' },
  { code: 'hu-HU', name: 'Hungarian (Hungary)' },
  { code: 'id-ID', name: 'Indonesian (Indonesia)' },
  { code: 'it-IT', name: 'Italian (Italy)' },
  { code: 'ja-JP', name: 'Japanese (Japan)' },
  { code: 'jv-ID', name: 'Javanese (Indonesia)' },
  { code: 'kn-IN', name: 'Kannada (India)' },
  { code: 'km-KH', name: 'Khmer (Cambodia)' },
  { code: 'ko-KR', name: 'Korean (South Korea)' },
  { code: 'lo-LA', name: 'Lao (Laos)' },
  { code: 'lv-LV', name: 'Latvian (Latvia)' },
  { code: 'ml-IN', name: 'Malayalam (India)' },
  { code: 'mr-IN', name: 'Marathi (India)' },
  { code: 'ms-MY', name: 'Malay (Malaysia)' },
  { code: 'my-MM', name: 'Burmese (Myanmar)' },
  { code: 'nb-NO', name: 'Norwegian (Norway)' },
  { code: 'ne-NP', name: 'Nepali (Nepal)' },
  { code: 'nl-NL', name: 'Dutch (Netherlands)' },
  { code: 'pl-PL', name: 'Polish (Poland)' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'pt-PT', name: 'Portuguese (Portugal)' },
  { code: 'ro-RO', name: 'Romanian (Romania)' },
  { code: 'ru-RU', name: 'Russian (Russia)' },
  { code: 'si-LK', name: 'Sinhala (Sri Lanka)' },
  { code: 'sk-SK', name: 'Slovak (Slovakia)' },
  { code: 'sl-SI', name: 'Slovenian (Slovenia)' },
  { code: 'sr-RS', name: 'Serbian (Serbia)' },
  { code: 'su-ID', name: 'Sundanese (Indonesia)' },
  { code: 'sv-SE', name: 'Swedish (Sweden)' },
  { code: 'sw-KE', name: 'Swahili (Kenya)' },
  { code: 'sw-TZ', name: 'Swahili (Tanzania)' },
  { code: 'ta-IN', name: 'Tamil (India)' },
  { code: 'ta-LK', name: 'Tamil (Sri Lanka)' },
  { code: 'ta-MY', name: 'Tamil (Malaysia)' },
  { code: 'ta-SG', name: 'Tamil (Singapore)' },
  { code: 'te-IN', name: 'Telugu (India)' },
  { code: 'th-TH', name: 'Thai (Thailand)' },
  { code: 'tr-TR', name: 'Turkish (Turkey)' },
  { code: 'uk-UA', name: 'Ukrainian (Ukraine)' },
  { code: 'ur-IN', name: 'Urdu (India)' },
  { code: 'ur-PK', name: 'Urdu (Pakistan)' },
  { code: 'vi-VN', name: 'Vietnamese (Vietnam)' },
  { code: 'zh-CN', name: 'Chinese (Simplified, China)' },
  { code: 'zh-HK', name: 'Chinese (Traditional, Hong Kong)' },
  { code: 'zh-TW', name: 'Chinese (Traditional, Taiwan)' },
  { code: 'zu-ZA', name: 'Zulu (South Africa)' },
];


// Default voices (adapt these to match your TTS setup)
const defaultVoices = languages.reduce((acc, lang) => {
  acc[lang.code] = `${lang.code}-Standard-A`;
  return acc;
}, {});
defaultVoices.default = 'en-US-Wavenet-D';

// -------------------------------------------------------------------------------------------
// 2) Utility functions
// -------------------------------------------------------------------------------------------
/** Simple text highlight for search terms. */
function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Convert base64 to Blob for audio usage
 */
function b64toBlob(b64Data, contentType = '') {
  const sliceSize = 1024;
  const byteCharacters = atob(b64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = [];

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);
    const bytes = new Array(end - begin);

    for (let offset = begin, i = 0; offset < end; ++offset, ++i) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays.push(new Uint8Array(bytes));
  }
  return new Blob(byteArrays, { type: contentType });
}

/**
 * Combine section.content + each subsection (subtitle + text)
 * into a single string. Also track boundaries so we know
 * where each subsection’s text range begins and ends.
 */
function combineSectionAndSubsections(section) {
  const combinedParts = [];

  // Main section content
  combinedParts.push({
    chunkType: 'sectionContent',
    text: section.content,
    subsectionId: null,
  });

  // Subsections (subtitle + text)
  section.subsections?.forEach((sub) => {
    combinedParts.push({
      chunkType: 'subsectionContent',
      text: `${sub.subtitle}.\n${sub.text}`,
      subsectionId: sub.id,
    });
  });

  let combinedText = '';
  let boundaries = [];
  let cumulativeWordCount = 0;

  combinedParts.forEach((part) => {
    const words = part.text.trim().split(/\s+/).filter(Boolean);
    const startIndex = cumulativeWordCount;
    const endIndex = startIndex + words.length - 1;

    boundaries.push({
      subsectionId: part.subsectionId,
      startIndex,
      endIndex,
    });

    cumulativeWordCount += words.length;
    combinedText += part.text + '\n\n';
  });

  return {
    combinedText,
    boundaries,    // array of { subsectionId, startIndex, endIndex }
    totalWords: cumulativeWordCount,
  };
}

// -------------------------------------------------------------------------------------------
// 3) The component
// -------------------------------------------------------------------------------------------
const PrivacyPolicy = ({ userLanguage, isLoggedIn }) => {
  // Track the user’s current language
  const [currentLanguage, setCurrentLanguage] = useState(userLanguage || 'en-US');
  // Text-based search within the policy
  const [searchQuery, setSearchQuery] = useState('');
  // Track which subsections are expanded
  const [expandedSections, setExpandedSections] = useState({});
  // The <audio> ref
  const audioRef = useRef(new Audio());
  // Which section is currently being read
  const [playingSection, setPlayingSection] = useState(null);
  // The highlight map: { [sectionId]: { [wordIndex]: true/false } }
  const [wordHighlights, setWordHighlights] = useState({});
  // The “Currently Reading” display
  const [spokenWords, setSpokenWords] = useState([]);
  // Store the boundaries data for each section: { [sectionId]: { boundaries, totalWords, combinedText } }
  const [sectionBoundariesMap, setSectionBoundariesMap] = useState({});

  // -----------------------------------------------------------------------------------------
  // 3A) Policy sections (placeholder text from your example)
  // -----------------------------------------------------------------------------------------
  const policySections = [
    {
      title: 'Filedocr Privacy Statement',
      id: 'intro',
      content: `
        Last Updated: December 06, 2024
       
        Your privacy is important to us at filedocr. This integrated privacy statement explains
        what personal data filedocr collects, how we use it, and the purposes behind our data
        processing activities. By using filedocr services, websites, applications, or software
        (collectively, "Services and Software"), you agree to the terms of this statement.
       
        Please review the entire policy and any product-specific details provided. If you have
        any questions, contact us using the details at the end of this statement.
      `,
      subsections: []
    },
    {
      title: 'Personal Data We Collect',
      id: 'personal-data',
      content: `
        filedocr collects data from you through our interactions with you and through your
        use of our Services and Software. This includes:
      `,
      subsections: [
        {
          subtitle: 'Types of Information',
          id: 'types-info',
          text: `
            We may collect:
            - Identifiers and Contact Information: Name, email address,
              telephone number, country, billing and payment information.
            - Device and Usage Data: IP address, browser type, device identifiers,
              crash logs, and navigation patterns within our Services and Software.
            - Content Data: Documents, images, files, messages, and any other
              information you upload or create using filedocr Services and Software.
            - Preferences and Settings: Choices you make regarding personalization,
              cookies, marketing communications, and other features.
          `
        },
        {
          subtitle: 'Sources of Data',
          id: 'sources-data',
          text: `
            We obtain personal data:
            - Directly from you, when you register, purchase a subscription,
              or interact with customer support.
            - Automatically, when you navigate our sites or apps, or use
              our online features and sync your content.
            - From third parties and publicly available sources to supplement
              our records and improve our Services and Software.
          `
        }
      ]
    },
    {
      title: 'How We Use Personal Data',
      id: 'how-use',
      content: `
        filedocr uses the collected data to:
        - Provide and improve our Services and Software.
        - Personalize experiences, deliver relevant content, and make recommendations.
        - Operate our business, develop our products, conduct research, detect and prevent
          fraudulent or abusive use, and ensure legal compliance.
      `,
      subsections: [
        {
          subtitle: 'Operational and Improvement Purposes',
          id: 'operational-improve',
          text: `
            We may analyze your interactions, usage patterns, and files (if you enable
            relevant features) to enhance performance, reliability, and user experience.
            This may include automated processing (e.g., machine learning) or limited
            human review to improve our AI models and product features.
          `
        },
        {
          subtitle: 'Marketing and Communications',
          id: 'marketing',
          text: `
            We use personal data to send you information about filedocr products,
            special offers, surveys, and events. You can opt out of direct marketing
            at any time by adjusting your preferences or following the instructions
            provided in our communications.
          `
        }
      ]
    },
    {
      title: 'Reasons We Share Personal Data',
      id: 'reasons-share',
      content: `
        filedocr shares personal data:
        - With your consent or at your direction.
        - To complete transactions, provide requested products, or carry out
          contractual obligations.
        - With trusted third-party processors who work on our behalf (e.g.,
          payment processors, analytics providers, data storage partners).
        - To comply with applicable law, respond to legal process, protect
          the rights and property of filedocr and its customers, or ensure
          personal safety and security.
      `,
      subsections: []
    },
    {
      title: 'Cookies and Similar Technologies',
      id: 'cookies-tech',
      content: `
        filedocr uses cookies, web beacons, and similar technologies to store
        preferences, enable sign-in, combat fraud, analyze performance, and
        provide interest-based advertising. You can control cookies through
        your browser settings. By using our websites or apps, you consent
        to the use of cookies as described in our cookies policy.
      `,
      subsections: []
    },
    {
      title: 'Data Transfers and Compliance',
      id: 'transfers',
      content: `
        filedocr operates globally and may transfer personal data across
        national borders. We comply with applicable laws governing these
        data transfers and apply appropriate measures, such as standard
        contractual clauses, to help protect your information.
      `,
      subsections: [
        {
          subtitle: 'International Frameworks',
          id: 'international',
          text: `
            filedocr may rely on frameworks such as the EU-U.S. Data Privacy
            Framework to ensure adequate protection for cross-border data
            transfers. If you have questions or unresolved privacy concerns,
            you may contact a third-party dispute resolution provider at no charge.
          `
        }
      ]
    },
    {
      title: 'Your Rights and Choices',
      id: 'rights-choices',
      content: `
        You have the right to access, correct, or delete your personal data.
        Depending on your location, you may have additional rights such as
        objecting to or restricting processing, or requesting data portability.
        You can manage your preferences, opt out of marketing, or request
        deletion of your account.
      `,
      subsections: [
        {
          subtitle: 'Exercising Your Rights',
          id: 'exercising-rights',
          text: `
            Use our account settings or contact us directly to exercise
            your rights. If you have unresolved concerns, you can contact
            your local data protection authority.
          `
        }
      ]
    },
    {
      title: 'Children’s Privacy',
      id: 'children',
      content: `
        filedocr’s Services and Software are not intended for children
        under the age of 13, except where permitted by law with verifiable
        parental consent. If we learn that we have collected personal
        information from a child without proper consent, we will take
        steps to delete it.
      `,
      subsections: []
    },
    {
      title: 'Changes and Contact Information',
      id: 'changes-contact',
      content: `
        filedocr may update this privacy statement to reflect changes
        in our practices, technology, or legal obligations. We will
        provide notice of material updates and obtain consent if required
        by law.
  
  
        If you have questions or concerns about this policy, please
        contact us via our privacy inquiry form or reach out to our
        Data Protection Officer at the address provided on our website.
      `,
      subsections: []
    }
  ];
  

  // -----------------------------------------------------------------------------------------
  // 3B) On mount, set up user/system language if needed
  // -----------------------------------------------------------------------------------------
  useEffect(() => {
    if (isLoggedIn && userLanguage) {
      setCurrentLanguage(userLanguage);
    } else if (currentLanguage === 'auto') {
      const systemLang = navigator.language || 'en-US';
      setCurrentLanguage(systemLang);
    }
  }, [isLoggedIn, userLanguage, currentLanguage]);

  // -----------------------------------------------------------------------------------------
  // 3C) Table of contents
  // -----------------------------------------------------------------------------------------
  const toc = policySections.map((sec) => ({
    title: sec.title,
    id: sec.id,
  }));

  // -----------------------------------------------------------------------------------------
  // 3D) Filter the policy sections by search query
  // -----------------------------------------------------------------------------------------
  const displayedPolicy = policySections
    .map((section) => {
      if (!searchQuery) return section;

      const matchedInTitle = section.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchedInContent = section.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchedSubsections = (section.subsections || []).filter(
        (sub) =>
          sub.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.text.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (matchedInTitle || matchedInContent || matchedSubsections.length > 0) {
        return {
          ...section,
          subsections: matchedSubsections,
        };
      }
      return null;
    })
    .filter(Boolean);

  // -----------------------------------------------------------------------------------------
  // 4) Audio Handling
  // -----------------------------------------------------------------------------------------

  // Helper to stop/reset audio
  function stopAudio() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.removeEventListener('timeupdate', onApproxTimeUpdate);
    audioRef.current.removeEventListener('ended', onAudioEnded);
    setPlayingSection(null);
    setWordHighlights({});
    setSpokenWords([]);
  }

  /**
   * Called when user toggles reading for an entire section
   */
  async function handleToggleAudio(section) {
    const sectionId = section.id;

    // If this section is currently playing, stop it
    if (playingSection === sectionId) {
      stopAudio();
      return;
    }

    // Stop any currently playing audio
    stopAudio();
    setPlayingSection(sectionId);

    // 1) Combine text
    const { combinedText, boundaries, totalWords } = combineSectionAndSubsections(section);

    // 2) Request TTS from your backend (no timepoints)
    const selectedVoice = defaultVoices[currentLanguage] || defaultVoices.default;
    let audioUrl;

    try {
      const res = await fetch(`https://sorrybriannah.filedocr/tts/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ text: combinedText, voice: selectedVoice }),
        
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('TTS request failed:', errorText);
        setPlayingSection(null);
        return;
      }

      const data = await res.json();
      if (data.audioBase64) {
        audioUrl = URL.createObjectURL(b64toBlob(data.audioBase64, 'audio/mpeg'));
      } else if (data.audioUrl) {
        audioUrl = data.audioUrl;
      } else {
        console.error('No audio data in response');
        setPlayingSection(null);
        return;
      }
    } catch (err) {
      console.error('TTS request error:', err);
      setPlayingSection(null);
      return;
    }

    // 3) Setup for approximate highlight
    setSectionBoundariesMap((prev) => ({
      ...prev,
      [sectionId]: { boundaries, totalWords, combinedText },
    }));

    // 4) Load and play audio
    audioRef.current.src = audioUrl;
    audioRef.current.onloadedmetadata = () => {
      audioRef.current.play();
    };

    audioRef.current.addEventListener('timeupdate', onApproxTimeUpdate);
    audioRef.current.addEventListener('ended', onAudioEnded);
  }

  /**
   * Approximate highlighting by checking currentTime vs duration.
   */
  function onApproxTimeUpdate() {
    if (!audioRef.current || !playingSection) return;

    const currentSectionData = sectionBoundariesMap[playingSection];
    if (!currentSectionData) return;

    const { boundaries, totalWords, combinedText } = currentSectionData;
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;

    const fraction = duration ? currentTime / duration : 0;
    // Approx how many words have been read
    const approxWordsRead = Math.floor(fraction * totalWords);

    // 1) Create a highlight map up to approxWordsRead
    const highlightObj = {};
    for (let i = 0; i < approxWordsRead; i++) {
      highlightObj[i] = true;
    }
    setWordHighlights({ [playingSection]: highlightObj });

    // 2) Auto-expand subsections if we enter their range
    boundaries.forEach((boundary) => {
      if (
        boundary.subsectionId &&
        approxWordsRead >= boundary.startIndex &&
        approxWordsRead <= boundary.endIndex
      ) {
        setExpandedSections((prev) => ({ ...prev, [boundary.subsectionId]: true }));
      }
    });

    // 3) “Currently Reading” if you want to display it
    const wordsArray = combinedText.trim().split(/\s+/).filter(Boolean);
    const spoken = wordsArray.slice(0, approxWordsRead);
    setSpokenWords(spoken);
  }

  /**
   * When audio ends
   */
  function onAudioEnded() {
    stopAudio();
  }

  // -----------------------------------------------------------------------------------------
  // 5) Rendering Helpers
  // -----------------------------------------------------------------------------------------

  /**
   * Render main section content with approximate highlight
   * (No offset for main content, since it starts at 0.)
   */
  function renderSectionContent(section) {
    const sectionId = section.id;
    const sectionHighlightMap = wordHighlights[sectionId] || {};
    // Split the main content into words
    const mainWords = section.content.trim().split(/\s+/).filter(Boolean);

    return (
      <p>
        {mainWords.map((word, i) => {
          const isHighlighted = !!sectionHighlightMap[i];
          return (
            <span
              key={`${sectionId}-main-${i}`}
              style={{ backgroundColor: isHighlighted ? 'yellow' : 'transparent' }}
            >
              {word}{' '}
            </span>
          );
        })}
      </p>
    );
  }

  /**
   * Render subsection text with offset from boundaries
   */
  function renderSubsectionText(section, subsection) {
    const sectionId = section.id;
    const sectionHighlightMap = wordHighlights[sectionId] || {};

    const currentSectionData = sectionBoundariesMap[sectionId];
    if (!currentSectionData) {
      // If we haven't requested TTS yet, no highlight data:
      return <p>{subsection.text}</p>;
    }
    const { boundaries } = currentSectionData;
    // Find the boundary for this subsection
    const boundary = boundaries.find((b) => b.subsectionId === subsection.id);
    if (!boundary) {
      // Fallback if we can’t find it
      return <p>{subsection.text}</p>;
    }

    const offset = boundary.startIndex;
    const subWords = subsection.text.trim().split(/\s+/).filter(Boolean);

    return (
      <p>
        {subWords.map((word, i) => {
          const isHighlighted = !!sectionHighlightMap[i + offset];
          return (
            <span
              key={`${subsection.id}-${i}`}
              style={{ backgroundColor: isHighlighted ? 'yellow' : 'transparent' }}
            >
              {word}{' '}
            </span>
          );
        })}
      </p>
    );
  }

  // -----------------------------------------------------------------------------------------
  // 6) Final JSX Return
  // -----------------------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row md:max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-full md:w-64 p-4 bg-white border-r border-gray-200">
          <header className="mb-4">
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Privacy Policy</h1>
          </header>
          
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search in policy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-2 top-3 text-gray-400" />
            </div>
  
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Language:</label>
              <select
                id="language-select"
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
                <option value="auto">Auto-detect</option>
              </select>
            </div>
          </div>
  
          <nav className="mt-4">
            <h2 className="text-sm font-semibold text-gray-600 mb-2">Contents</h2>
            <ul className="space-y-2">
              {toc.map((sec) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById(sec.id);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="block px-2 py-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  >
                    {sec.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

        </aside>
  
        {/* Main Content */}
        <main className="flex-1 p-6 max-w-3xl mx-auto">
          {displayedPolicy.map((section) => {
            const sectionId = section.id;
            const isPlaying = playingSection === sectionId;
            return (
              <section key={sectionId} className="mb-8">
                <header 
                  id={sectionId}
                  className="sticky top-0 bg-white py-4 border-b border-gray-200"
                >
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <button
                      onClick={() => handleToggleAudio(section)}
                      className="p-2 hover:text-blue-600 transition-colors"
                      aria-label="Read this section aloud"
                    >
                      {isPlaying ? <FaVolumeOff /> : <FaVolumeUp />}
                    </button>
                    <span
                      className="flex-1"
                      dangerouslySetInnerHTML={{
                        __html: highlightText(section.title, searchQuery),
                      }}
                    />
                  </h2>
                </header>
  
                <div className="mt-4 prose text-gray-600">
                  {renderSectionContent(section)}
                </div>
  
                {section.subsections?.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {section.subsections.map((sub) => {
                      const isExpanded = expandedSections[sub.id] || false;
                      return (
                        <article key={sub.id} className="border rounded-lg">
                          <header 
                            id={sub.id}
                            className="p-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() =>
                              setExpandedSections((prev) => ({
                                ...prev,
                                [sub.id]: !isExpanded,
                              }))
                            }
                          >
                            <div className="flex items-center gap-2">
                              <button
                                className="p-1 hover:bg-gray-200 rounded"
                                aria-expanded={isExpanded}
                              >
                                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
                              </button>
                              <span
                                className="flex-1"
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(sub.subtitle, searchQuery),
                                }}
                              />
                            </div>
                          </header>
                          {isExpanded && (
                            <div className="p-4 pt-2 ml-8 border-t border-gray-100">
                              {renderSubsectionText(section, sub)}
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
  
          {displayedPolicy.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No sections match your search terms.</p>
            </div>
          )}
  
          {spokenWords.length > 0 && (
            <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200">
              <h4 className="text-sm font-semibold mb-2">Currently Reading:</h4>
              <p className="text-sm text-gray-600 max-w-xs">{spokenWords.join(' ')}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};      
export default PrivacyPolicy;} TO ABSOLUTE HTML AND RETURN FULL CODE
