import type { Locale } from "@/types";

export const locales: Locale[] = ["hy", "en"]; // ru/fr/es: schema-ready, add once translated
export const defaultLocale: Locale = "hy";

export const dictionary = {
  hy: {
    nav: {
      requestConsultation: "Խնդրել խորհրդատվություն",
    },
    hero: {
      eyebrow: "Baghdasaryan Production",
      title: "Ձեր միջոցառումը՝ պրոֆեսիոնալ կազմակերպված Հայաստանում",
      subtitle:
        "Անկախ նրանից՝ ապրում եք Հայաստանում կամ արտերկրում, մենք համակարգում ենք ձեր տոնակատարության բոլոր մանրամասները՝ սկզբից մինչև վերջ։",
      ctaPrimary: "Խնդրել խորհրդատվություն",
      ctaSecondary: "Տեսնել մեր աշխատանքները",
    },
    trust: {
      title: "Ինչու՞ ընտրել մեզ",
      remotePlanning: {
        title: "Հեռավար պլանավորում",
        body: "Կազմակերպեք ձեր միջոցառումը աշխարհի ցանկացած կետից։",
      },
      fullCoordination: {
        title: "Ամբողջական համակարգում",
        body: "Մեկ վստահելի թիմ՝ պատասխանատու բոլոր կարևոր մանրամասների համար։",
      },
      professionalExecution: {
        title: "Պրոֆեսիոնալ իրականացում",
        body: "Ձեր միջոցառումը կառավարվում է պրոֆեսիոնալ կերպով՝ Հայաստանում։",
      },
      peaceOfMind: {
        title: "Հոգեկան հանգստություն",
        body: "Դուք ժամանում եք և վայելում տոնակատարությունը, փոխարենը՝ կառավարել մատակարարներին։",
      },
    },
    process: {
      title: "Ինչպես ենք աշխատում",
      subtitle: "Հստակ, կանխատեսելի գործընթաց՝ անկախ նրանից՝ դուք գտնվում եք Հայաստանում, թե արտերկրում։",
      steps: [
        { title: "Պատմեք մեզ ձեր միջոցառման մասին", body: "Դուք ներկայացնում եք ձեր միջոցառման մանրամասները։" },
        { title: "Կառուցում ենք ծրագիրը", body: "Մեր թիմը հասկանում է ձեր պահանջները և պատրաստում է անհատականացված մոտեցում։" },
        { title: "Համակարգում ենք ամեն ինչ", body: "Կառավարում ենք անհրաժեշտ մանրամասներն ու ծառայությունները Հայաստանում։" },
        { title: "Դուք ժամանում եք և վայելում", body: "Կենտրոնացեք ձեր ընտանիքի, հյուրերի և տոնակատարության վրա։" },
      ],
    },
    diaspora: {
      title: "Ձեր միջոցառումը Հայաստանում՝ արտերկրից պլանավորված",
      body: "Հայաստանում միջոցառում պլանավորելը՝ մեկ այլ երկրից, կարիք չունի սթրեսային լինելու։ Մենք կարող ենք օգնել հեռավար համակարգել ամեն ինչ։",
    },
    consultation: {
      title: "Խնդրել խորհրդատվություն",
      intro:
        "Պատմեք մեզ ձեր միջոցառման մասին, և մեր թիմը կպատրաստի համապատասխան առաջարկ։",
      fields: {
        fullName: "Անուն Ազգանուն",
        eventType: "Միջոցառման տեսակ",
        eventLocation: "Միջոցառման վայր / հասցե",
        guestCount: "Հյուրերի քանակ",
        email: "Էլ. հասցե",
        phone: "Հեռախոսահամար",
        budget: "Մոտավոր բյուջե",
        additionalInfo: "Լրացուցիչ տեղեկություն",
        privacyConsent: "Ես համաձայն եմ իմ տվյալների մշակմանը՝ խորհրդատվության նպատակով",
      },
      submit: "Ուղարկել հարցումը",
      successTitle: "Շնորհակալություն",
      successBody: "Մենք ստացել ենք ձեր հարցումը։ Մեր թիմը շուտով կապ կհաստատի ձեզ հետ։",
    },
    footer: {
      rights: "Բոլոր իրավունքները պաշտպանված են։",
    },
    home: {
      servicesHeading: "Ծառայություններ",
      viewAllServices: "Բոլոր ծառայությունները",
      finalCtaTitle: "Պատրա՞ստ եք սկսել ձեր միջոցառման պլանավորումը",
    },
    pages: {
      services: {
        title: "Ծառայություններ",
        subtitle: "Մեկ թիմ՝ ձեր միջոցառման բոլոր բաղադրիչների համակարգման համար։",
      },
      portfolio: {
        title: "Օրինակագիր",
        empty: "Այս կատեգորիայում դեռ նախագծեր չկան։",
      },
      about: {
        title: "Մեր մասին",
        placeholder: "[Placeholder — ընկերության իրական պատմությունը կլրացվի Admin Panel-ից]",
      },
      faq: {
        title: "Հաճախ տրվող հարցեր",
      },
      contact: {
        title: "Կապ",
      },
      privacy: {
        title: "Գաղտնիության քաղաքականություն",
        placeholder: "[Placeholder — գաղտնիության քաղաքականության իրական տեքստը կավելացվի թողարկումից առաջ]",
      },
      terms: {
        title: "Պայմաններ",
        placeholder: "[Placeholder — օգտագործման պայմանների իրական տեքստը կավելացվի թողարկումից առաջ]",
      },
      serviceDetail: {
        inclusions: "Ներառված է",
      },
    },
    portfolioFilters: [
      { value: undefined, label: "Բոլորը" },
      { value: "wedding", label: "Հարսանեկան" },
      { value: "baptism", label: "Մկրտություն" },
      { value: "birthday", label: "Ծննդյան օր" },
      { value: "engagement", label: "Նշանդրություն" },
      { value: "proposal", label: "Առաջարկություն" },
      { value: "corporate", label: "Կորպորատիվ" },
      { value: "private", label: "Մասնավոր" },
    ],
  },
  en: {
    nav: {
      requestConsultation: "Request a Consultation",
    },
    hero: {
      eyebrow: "Baghdasaryan Production",
      title: "Your event, professionally organized in Armenia",
      subtitle:
        "Whether you live in Armenia or abroad, we coordinate every detail of your celebration from start to finish.",
      ctaPrimary: "Request a Consultation",
      ctaSecondary: "View Our Work",
    },
    trust: {
      title: "Why work with us",
      remotePlanning: {
        title: "Remote Planning",
        body: "Plan your event from anywhere in the world.",
      },
      fullCoordination: {
        title: "Full Coordination",
        body: "One trusted team coordinates the important details.",
      },
      professionalExecution: {
        title: "Professional Execution",
        body: "Your event is professionally managed in Armenia.",
      },
      peaceOfMind: {
        title: "Peace of Mind",
        body: "You can arrive and enjoy your event instead of managing vendors.",
      },
    },
    process: {
      title: "How it works",
      subtitle: "A clear, predictable process — whether you're in Armenia or abroad.",
      steps: [
        { title: "Tell Us About Your Event", body: "You submit your event details." },
        { title: "We Build the Plan", body: "Our team understands your requirements and prepares a customized approach." },
        { title: "We Coordinate Everything", body: "We manage the necessary event details and services in Armenia." },
        { title: "You Arrive and Enjoy", body: "Focus on your family, guests, and celebration." },
      ],
    },
    diaspora: {
      title: "Planning your event in Armenia from abroad",
      body: "Planning an event in Armenia from another country doesn't have to be stressful. We coordinate it remotely, every step of the way.",
    },
    consultation: {
      title: "Request a Consultation",
      intro:
        "Tell us about your event, and our team will prepare an appropriate response.",
      fields: {
        fullName: "Full Name",
        eventType: "Event Type",
        eventLocation: "Event Location / Address",
        guestCount: "Number of Guests",
        email: "Email Address",
        phone: "Phone Number",
        budget: "Estimated Budget",
        additionalInfo: "Additional Information",
        privacyConsent: "I agree to my information being processed for the purpose of this consultation",
      },
      submit: "Send Request",
      successTitle: "Thank you",
      successBody: "We have received your request and our team will contact you shortly.",
    },
    footer: {
      rights: "All rights reserved.",
    },
    home: {
      servicesHeading: "Services",
      viewAllServices: "All services",
      finalCtaTitle: "Ready to start planning your event?",
    },
    pages: {
      services: {
        title: "Services",
        subtitle: "One team to coordinate every part of your event.",
      },
      portfolio: {
        title: "Portfolio",
        empty: "No projects in this category yet.",
      },
      about: {
        title: "About",
        placeholder: "[Placeholder — the company's real story will be added via the Admin Panel]",
      },
      faq: {
        title: "Frequently Asked Questions",
      },
      contact: {
        title: "Contact",
      },
      privacy: {
        title: "Privacy Policy",
        placeholder: "[Placeholder — the real privacy policy text will be added before launch]",
      },
      terms: {
        title: "Terms",
        placeholder: "[Placeholder — the real terms text will be added before launch]",
      },
      serviceDetail: {
        inclusions: "What's included",
      },
    },
    portfolioFilters: [
      { value: undefined, label: "All" },
      { value: "wedding", label: "Weddings" },
      { value: "baptism", label: "Baptism" },
      { value: "birthday", label: "Birthdays" },
      { value: "engagement", label: "Engagement" },
      { value: "proposal", label: "Proposal" },
      { value: "corporate", label: "Corporate" },
      { value: "private", label: "Private" },
    ],
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionary[locale as "hy" | "en"] ?? dictionary[defaultLocale as "hy" | "en"];
}