export interface SliderSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  isActive: boolean;
}

export interface CmsGoal {
  id: string;
  title: string;
  description: string;
  icon: string;
  stat?: string;
  category: 'رؤية ورسالة' | 'لماذا تختارنا' | 'هدف استراتيجي';
}

export interface CmsAgency {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  description: string;
  isFeatured: boolean;
}

export interface CmsService {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface CmsTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
  isApproved: boolean;
}

export interface MainContentConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  aboutTitle: string;
  aboutText: string;
  visionText: string;
  missionText: string;
  yearsExperience: string;
}

export interface GeneralServiceConfig {
  title: string;
  subtitle: string;
  guaranteeText: string;
  supportCoverage: string;
}

export interface BranchesInfoConfig {
  introTitle: string;
  introSubtitle: string;
  customerHotline: string;
  workingDays: string;
}

export interface ContactInfoConfig {
  phoneMain: string;
  phoneSales: string;
  whatsapp: string;
  email: string;
  hqAddress: string;
  googleMapsUrl: string;
  workingHours: string;
  facebookUrl: string;
  instagramUrl: string;
}

// Mock initial data
export const initialSlides: SliderSlide[] = [
  {
    id: 'slide-1',
    badge: '⚡ الوكيل المعتمد لـ شنايدر و ABB',
    title: 'حلول وتجهيزات كهربائية متكاملة في حضرموت',
    subtitle: 'نوفر أحدث القواطع واللوحات الكهربائية وأنظمة الطاقة بأعلى معايير الجودة العالمية.',
    ctaText: 'استكشف منتجاتنا',
    ctaLink: '#products',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    isActive: true,
  },
  {
    id: 'slide-2',
    badge: '☀️ أنظمة طاقة شمسية ذكية',
    title: 'استمرارية الطاقة وكفاءة عالية لمشروعك',
    subtitle: 'تصميم وتنفيذ أنظمة الطاقة الشمسية والمحولات الهجينة بأيادي هندسية خبيرة.',
    ctaText: 'اطلب استشارة مجانية',
    ctaLink: '#contact',
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
    isActive: true,
  },
  {
    id: 'slide-3',
    badge: '💡 إضاءة LED موفرة للطاقة من فيليبس',
    title: 'أنظمة إنارة فاخرة للمباني والمشاريع الكبرى',
    subtitle: 'أحدث كشافات الإنارة الخارجية والداخلية الموفرة للطاقة 100%.',
    ctaText: 'عرض مشاريعنا',
    ctaLink: '#projects',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    isActive: true,
  },
];

export const initialCmsGoals: CmsGoal[] = [
  {
    id: 'goal-1',
    title: 'منتجات أصلية 100%',
    description: 'جميع المنتجات مستوردة مباشرة من المصانع العالمية مع ضمان معتمد.',
    icon: '✅',
    stat: '100%',
    category: 'لماذا تختارنا',
  },
  {
    id: 'goal-2',
    title: 'وكلاء معتمدون',
    description: 'وكلاء حصريون ومعتمدون لأكبر العلامات التجارية الكهربائية العالمية.',
    icon: '🏆',
    stat: '5+',
    category: 'لماذا تختارنا',
  },
  {
    id: 'goal-3',
    title: 'دعم فني متخصص',
    description: 'فريق هندسي متخصص للاستشارات والتركيبات الميدانية والصيانة.',
    icon: '🛠️',
    stat: '24/7',
    category: 'لماذا تختارنا',
  },
  {
    id: 'goal-4',
    title: 'الريادة الكهربائية في حضرموت',
    description: 'أن نكون الخيار الأول الموثوق لكافة المشاريع السكنية والصناعية والتجارية.',
    icon: '🎯',
    category: 'هدف استراتيجي',
  },
];

export const initialCmsAgencies: CmsAgency[] = [
  {
    id: 'schneider',
    name: 'شنايدر إلكتريك',
    nameEn: 'Schneider Electric',
    logo: '⚡',
    description: 'شركة عالمية رائدة في إدارة الطاقة والقواطع والأتمتة الكهربائية.',
    isFeatured: true,
  },
  {
    id: 'abb',
    name: 'إيه بي بي',
    nameEn: 'ABB Industrial',
    logo: '🔧',
    description: 'رائدة تقنيات محركات ومحولات التردد والأتمتة الصناعية.',
    isFeatured: true,
  },
  {
    id: 'legrand',
    name: 'لوغراند',
    nameEn: 'Legrand Smart Wiring',
    logo: '🏠',
    description: 'متخصصة في البنية التحتية الديكورية والمفاتيح والمآخذ الذكية.',
    isFeatured: true,
  },
  {
    id: 'philips',
    name: 'فيليبس للإنارة',
    nameEn: 'Philips Lighting',
    logo: '💡',
    description: 'حلول إنارة LED عصرية للمنازل والإنارة العامة والكشافات.',
    isFeatured: true,
  },
  {
    id: 'siemens',
    name: 'سيمنز',
    nameEn: 'Siemens Automation',
    logo: '🏗️',
    description: 'أنظمة أتمتة صناعية وقواطع كهربائية للاستخدامات الثقيلة.',
    isFeatured: true,
  },
];

export const initialCmsServices: CmsService[] = [
  {
    id: 'serv-1',
    title: 'توريد المعدات الكهربائية الجملة والتجزئة',
    description: 'توفير وتوريد كافة القواطع واللوحات والكابلات من أرقى الماركات.',
    icon: '📦',
    features: ['قواطع ثلاثية وأحادية', 'لوحات توزيع رئيسية', 'تمديدات ومواسير مقاومة'],
  },
  {
    id: 'serv-2',
    title: 'تصميم وتنفيذ أنظمة الطاقة الشمسية',
    description: 'حلول الطاقة المتجددة الهجينة وتصميم المنظومات السكنية والتجارية.',
    icon: '☀️',
    features: ['ألواح مونو عالية الكفاءة', 'محولات إنفرتر هجينة', 'بطاريات ليثيوم وعادية'],
  },
  {
    id: 'serv-3',
    title: 'حلول أنظمة الإنارة LED الذكية',
    description: 'تصميم وتوزيع الإضاءات الديكورية والخارجية للشوارع والفنادق.',
    icon: '💡',
    features: ['كشافات خارجية مقاومة للمياه', 'إضاءات مخفية وديكورية', 'أنظمة تحكم بالريموت واللمس'],
  },
  {
    id: 'serv-4',
    title: 'الصيانة الهندسية والدعم الفني',
    description: 'فريق صيانة هندسي جاهز للمتابعة الدورية وفحص الحماية الكهربائية.',
    icon: '🔧',
    features: ['صيانة وقائية دورية', 'فحص الأحمال والمحولات', 'تقارير السلامة المعتمدة'],
  },
];

export const initialCmsTestimonials: CmsTestimonial[] = [
  {
    id: 'test-1',
    name: 'محمد بن سلمان العمودي',
    role: 'مدير عام',
    company: 'مجموعة العمودي للمقاولات',
    rating: 5,
    text: 'تعاملنا مع مركز حضرموت الحديث في عدة مشاريع وكانت النتائج مبهرة. منتجات أصلية وخدمة احترافية ودعم فني ممتاز.',
    date: '2024-05-10',
    avatar: '👤',
    isApproved: true,
  },
  {
    id: 'test-2',
    name: 'المهندس عبدالله باحنان',
    role: 'مهندس استشاري',
    company: 'مكتب الإبداع الهندسي',
    rating: 5,
    text: 'المركز يوفر كل ما نحتاجه من معدات كهربائية بجودة عالية. الأسعار منافسة والتوصيل سريع في المكلا وسيئون.',
    date: '2024-06-15',
    avatar: '👨‍💼',
    isApproved: true,
  },
  {
    id: 'test-3',
    name: 'سعيد بارحمة',
    role: 'مقاول كهربائي',
    company: 'مؤسسة النور للكهرباء',
    rating: 4,
    text: 'من أفضل المراكز في حضرموت. المنتجات أصلية ومضمونة، والفريق الفني محترف ومتعاون جداً.',
    date: '2024-04-20',
    avatar: '👤',
    isApproved: true,
  },
];

export const initialMainContent: MainContentConfig = {
  heroTitle: 'مركز حضرموت الحديث للكهربائيات | HMEC',
  heroSubtitle: 'وكلاء معتمدون لأكبر العلامات التجارية العالمية في مجالات الكهرباء والطاقة والإنارة.',
  heroBadge: 'المركز الأول في حضرموت',
  aboutTitle: 'عن مركز حضرموت الحديث',
  aboutText: 'تأسس مركز حضرموت الحديث للكهربائيات ليكون الصرح الرائد في توفير كافة الحلول والمستلزمات الكهربائية الأصلية للمشاريع السكنية والتجارية والصناعية بجميع مدن المحافظة.',
  visionText: 'أن نكون المركز الرائد والموثوق في مجال الكهربائيات والحلول المتجددة في حضرموت واليمن.',
  missionText: 'توفير منتجات كهربائية عالية الجودة من العلامات التجارية العالمية مع خدمات استشارية وفنية متميزة.',
  yearsExperience: '10+ سنوات خبرة',
};

export const initialGeneralService: GeneralServiceConfig = {
  title: 'خدمات كهربائية متكاملة أعلى مستويات الجودة',
  subtitle: 'نقدم لك باقة كاملة من الخدمات الهندسية والتوريد المباشر من وكالاتنا العالمية.',
  guaranteeText: 'ضمان رسمي 100% على كافة المنتجات والتوريدات',
  supportCoverage: 'تغطية شاملة لجميع مناطق ومدن حضرموت',
};

export const initialBranchesInfo: BranchesInfoConfig = {
  introTitle: 'شبكة فروعنا ومنافذ البيع في حضرموت',
  introSubtitle: 'يسعدنا استقبالكم في فروعنا المتخصصة بالمكلا وسيئون والشحر لخدمتكم وتلبية طلباتكم.',
  customerHotline: '+967 05 302211',
  workingDays: 'من السبت إلى الخميس: 8:00 صباحاً - 9:00 مساءً',
};

export const initialContactInfo: ContactInfoConfig = {
  phoneMain: '+967 05 302211',
  phoneSales: '+967 771 234 567',
  whatsapp: '+967 771 234 567',
  email: 'info@hmec-ye.com',
  hqAddress: 'المكلا - شارع البنوك - مقابل بنك اليمن والكويت',
  googleMapsUrl: 'https://maps.google.com',
  workingHours: '8:00 صباحاً - 9:00 مساءً',
  facebookUrl: 'https://facebook.com/hmec',
  instagramUrl: 'https://instagram.com/hmec',
};
