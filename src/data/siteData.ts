import { Agency, Service, Branch, Review, NavLink, AboutItem, WhyChooseUs } from '@/types';

// ==============================
// Navigation Links
// ==============================
export const navLinks: NavLink[] = [
  { id: 'about', label: 'من نحن', href: '#about' },
  { id: 'agencies', label: 'وكلاؤنا', href: '#agencies' },
  { id: 'services', label: 'خدماتنا', href: '#services' },
  { id: 'products', label: 'المنتجات', href: '#products' },
  { id: 'projects', label: 'مشاريعنا', href: '#projects' },
  { id: 'testimonials', label: 'آراء العملاء', href: '#testimonials' },
  { id: 'branches', label: 'فروعنا', href: '#branches' },
  { id: 'contact', label: 'تواصل معنا', href: '#contact' },
];

// ==============================
// Agencies / Brands
// ==============================
export const agencies: Agency[] = [
  {
    id: 'schneider',
    name: 'شنايدر إلكتريك',
    nameEn: 'Schneider Electric',
    logo: '⚡',
    description: 'شنايدر إلكتريك هي شركة عالمية رائدة في مجال إدارة الطاقة والأتمتة. نقدم حلولاً مبتكرة تضمن الكفاءة والاستدامة لعملائنا في جميع القطاعات.',
    products: [
      { id: 'p1', name: 'قواطع كهربائية', image: '🔌', description: 'قواطع كهربائية عالية الجودة للحماية من التيار الزائد', category: 'حماية' },
      { id: 'p2', name: 'لوحات توزيع', image: '📦', description: 'لوحات توزيع كهربائية بمواصفات عالمية', category: 'توزيع' },
      { id: 'p3', name: 'أنظمة UPS', image: '🔋', description: 'أنظمة طاقة احتياطية لضمان استمرارية التشغيل', category: 'طاقة' },
      { id: 'p4', name: 'مفاتيح ذكية', image: '💡', description: 'مفاتيح إنارة ذكية قابلة للبرمجة', category: 'ذكي' },
    ],
    projects: [
      { id: 'pr1', title: 'مشروع مجمع تجاري المكلا', image: '🏢', description: 'تزويد وتركيب لوحات التوزيع الرئيسية', agency: 'schneider', date: '2024', location: 'المكلا' },
      { id: 'pr2', title: 'مستشفى حضرموت', image: '🏥', description: 'تركيب أنظمة UPS ولوحات الحماية', agency: 'schneider', date: '2023', location: 'المكلا' },
    ],
    reviews: [
      { id: 'r1', name: 'أحمد باعبود', avatar: '👤', role: 'مهندس كهربائي', company: 'شركة البناء الحديث', rating: 5, text: 'منتجات شنايدر من مركز حضرموت ممتازة وبأسعار منافسة، والخدمة رائعة جداً', date: '2024' },
    ],
  },
  {
    id: 'abb',
    name: 'إيه بي بي',
    nameEn: 'ABB',
    logo: '🔧',
    description: 'ABB شركة رائدة في تقنيات الطاقة والأتمتة تساعد عملاءها على تحسين أدائهم مع خفض التأثير البيئي.',
    products: [
      { id: 'p5', name: 'محركات كهربائية', image: '⚙️', description: 'محركات كهربائية عالية الكفاءة', category: 'محركات' },
      { id: 'p6', name: 'محولات تردد', image: '🔄', description: 'محولات تردد متقدمة للتحكم في السرعة', category: 'تحكم' },
      { id: 'p7', name: 'أجهزة قياس', image: '📊', description: 'أجهزة قياس وحماية دقيقة', category: 'قياس' },
    ],
    projects: [
      { id: 'pr3', title: 'محطة تحلية المياه', image: '🏭', description: 'توريد وتركيب محركات ومحولات تردد', agency: 'abb', date: '2024', location: 'الشحر' },
    ],
    reviews: [
      { id: 'r2', name: 'سالم بن محفوظ', avatar: '👤', role: 'مدير مشاريع', company: 'مؤسسة التطوير', rating: 5, text: 'تعاملنا مع مركز حضرموت في توريد منتجات ABB وكانت التجربة ممتازة', date: '2024' },
    ],
  },
  {
    id: 'legrand',
    name: 'لوغراند',
    nameEn: 'Legrand',
    logo: '🏠',
    description: 'لوغراند متخصصة في البنية التحتية الكهربائية والرقمية للمباني، توفر حلول مبتكرة للمنازل والمكاتب.',
    products: [
      { id: 'p8', name: 'مفاتيح ومآخذ', image: '🔘', description: 'مفاتيح ومآخذ كهربائية بتصاميم عصرية', category: 'تأسيسات' },
      { id: 'p9', name: 'أنظمة كابلات', image: '🔗', description: 'حلول تمديد وتنظيم الكابلات', category: 'كابلات' },
      { id: 'p10', name: 'لوحات سكنية', image: '🏡', description: 'لوحات توزيع للاستخدام السكني', category: 'سكني' },
    ],
    projects: [
      { id: 'pr4', title: 'مجمع سكني فلل الريان', image: '🏘️', description: 'تزويد كامل بمفاتيح ومآخذ لوغراند', agency: 'legrand', date: '2024', location: 'المكلا' },
    ],
    reviews: [
      { id: 'r3', name: 'عمر الكاف', avatar: '👤', role: 'مقاول', company: 'مؤسسة البناء', rating: 4, text: 'منتجات لوغراند أنيقة وعملية، والمركز يوفر كل ما نحتاجه', date: '2023' },
    ],
  },
  {
    id: 'philips',
    name: 'فيليبس',
    nameEn: 'Philips',
    logo: '💡',
    description: 'فيليبس للإنارة توفر حلول إضاءة مبتكرة وموفرة للطاقة للاستخدام المنزلي والتجاري والصناعي.',
    products: [
      { id: 'p11', name: 'إضاءة LED', image: '💡', description: 'مصابيح LED موفرة للطاقة بإضاءة مثالية', category: 'إنارة' },
      { id: 'p12', name: 'كشافات خارجية', image: '🔦', description: 'كشافات إنارة خارجية مقاومة للعوامل الجوية', category: 'خارجي' },
      { id: 'p13', name: 'إنارة ذكية', image: '📱', description: 'أنظمة إنارة ذكية قابلة للتحكم عن بعد', category: 'ذكي' },
    ],
    projects: [
      { id: 'pr5', title: 'إنارة شوارع المكلا', image: '🛣️', description: 'توريد وتركيب إنارة LED للشوارع', agency: 'philips', date: '2023', location: 'المكلا' },
    ],
    reviews: [
      { id: 'r4', name: 'خالد باحارثة', avatar: '👤', role: 'مهندس معماري', company: 'مكتب تصميم', rating: 5, text: 'إنارة فيليبس من المركز غيّرت شكل مشاريعنا بالكامل', date: '2024' },
    ],
  },
  {
    id: 'siemens',
    name: 'سيمنز',
    nameEn: 'Siemens',
    logo: '🏗️',
    description: 'سيمنز شركة عالمية رائدة في التقنية والهندسة الكهربائية، تقدم حلولاً شاملة للبنية التحتية والصناعة.',
    products: [
      { id: 'p14', name: 'أنظمة أتمتة', image: '🤖', description: 'أنظمة أتمتة صناعية متكاملة', category: 'أتمتة' },
      { id: 'p15', name: 'قواطع صناعية', image: '⚡', description: 'قواطع كهربائية للاستخدام الصناعي الثقيل', category: 'صناعي' },
    ],
    projects: [
      { id: 'pr6', title: 'مصنع الأسماك', image: '🏭', description: 'تركيب أنظمة أتمتة وتحكم', agency: 'siemens', date: '2024', location: 'الشحر' },
    ],
    reviews: [
      { id: 'r5', name: 'فهد العمودي', avatar: '👤', role: 'مدير تشغيل', company: 'مصنع الخليج', rating: 5, text: 'خدمة ممتازة ومنتجات أصلية 100%', date: '2024' },
    ],
  },
];

// ==============================
// About Us Items
// ==============================
export const aboutItems: AboutItem[] = [
  {
    id: 'vision',
    title: 'رؤيتنا',
    description: 'أن نكون المركز الرائد والموثوق في مجال الكهربائيات على مستوى حضرموت واليمن، ونقدم أحدث التقنيات والحلول الكهربائية بأعلى معايير الجودة العالمية.',
    icon: '👁️',
  },
  {
    id: 'mission',
    title: 'رسالتنا',
    description: 'توفير منتجات وحلول كهربائية متكاملة وعالية الجودة من أفضل العلامات التجارية العالمية، مع تقديم خدمة عملاء استثنائية ودعم فني متخصص.',
    icon: '🎯',
  },
  {
    id: 'goals',
    title: 'أهدافنا',
    description: 'التوسع في تقديم خدماتنا لتشمل جميع مناطق اليمن، وبناء شراكات استراتيجية مع كبرى الشركات العالمية، وتدريب كوادر فنية متخصصة.',
    icon: '🚀',
  },
];

export const whyChooseUs: WhyChooseUs[] = [
  { id: 'w1', title: 'منتجات أصلية', titleEn: 'Original Products', description: 'جميع منتجاتنا أصلية 100% ومستوردة مباشرة من المصنع مع ضمان شامل', descriptionEn: 'All our products are 100% original and imported directly from factories with full warranty', icon: '✅', stat: '100%', statEn: '100%' },
  { id: 'w2', title: 'وكلاء معتمدون', titleEn: 'Authorized Agents', description: 'وكلاء معتمدون لأكبر العلامات التجارية العالمية في مجال الكهربائيات', descriptionEn: 'Authorized agents for major global brands in the electrical field', icon: '🏆', stat: '5+', statEn: '5+' },
  { id: 'w3', title: 'دعم فني متخصص', titleEn: 'Specialized Technical Support', description: 'فريق دعم فني متخصص متاح لمساعدتك في اختيار وتركيب المنتجات المناسبة', descriptionEn: 'Specialized technical support team available to assist you in selecting and installing the right products', icon: '🛠️', stat: '24/7', statEn: '24/7' },
  { id: 'w4', title: 'أسعار تنافسية', titleEn: 'Competitive Prices', description: 'نقدم أفضل الأسعار في السوق مع الحفاظ على أعلى معايير الجودة', descriptionEn: 'We offer the best prices in the market while maintaining the highest quality standards', icon: '💰', stat: 'الأفضل', statEn: 'Best' },
  { id: 'w5', title: 'خبرة واسعة', titleEn: 'Extensive Experience', description: 'خبرة تمتد لسنوات في تنفيذ المشاريع الكهربائية الكبرى والصغرى', descriptionEn: 'Years of experience in executing major and minor electrical projects', icon: '📈', stat: '10+', statEn: '10+' },
  { id: 'w6', title: 'توصيل سريع', titleEn: 'Fast Delivery', description: 'خدمة توصيل سريعة لجميع مناطق حضرموت مع تغليف آمن', descriptionEn: 'Fast delivery service to all regions of Hadramout with secure packaging', icon: '🚚', stat: 'سريع', statEn: 'Fast' },
];

// ==============================
// Services
// ==============================
export const services: Service[] = [
  {
    id: 's1',
    title: 'توريد المعدات الكهربائية',
    description: 'توريد كافة المعدات والمستلزمات الكهربائية من أفضل العلامات التجارية العالمية',
    icon: '📦',
    features: ['قواطع كهربائية', 'لوحات توزيع', 'كابلات ومواسير', 'مفاتيح ومآخذ'],
  },
  {
    id: 's2',
    title: 'تنفيذ المشاريع الكهربائية',
    description: 'تنفيذ المشاريع الكهربائية الكبرى والصغرى بأيدي فنية متخصصة',
    icon: '⚡',
    features: ['مشاريع سكنية', 'مشاريع تجارية', 'مشاريع صناعية', 'مشاريع حكومية'],
  },
  {
    id: 's3',
    title: 'أنظمة الطاقة الشمسية',
    description: 'تصميم وتركيب أنظمة الطاقة الشمسية للمنازل والمنشآت التجارية',
    icon: '☀️',
    features: ['ألواح شمسية', 'إنفرترات', 'بطاريات', 'أنظمة متكاملة'],
  },
  {
    id: 's4',
    title: 'أنظمة الإنارة',
    description: 'تصميم وتنفيذ أنظمة الإنارة الداخلية والخارجية بأحدث تقنيات LED',
    icon: '💡',
    features: ['إنارة داخلية', 'إنارة خارجية', 'إنارة ديكورية', 'إنارة ذكية'],
  },
  {
    id: 's5',
    title: 'الصيانة والدعم الفني',
    description: 'خدمات صيانة دورية وطارئة للأنظمة الكهربائية مع دعم فني على مدار الساعة',
    icon: '🔧',
    features: ['صيانة وقائية', 'صيانة طارئة', 'فحص دوري', 'تقارير فنية'],
  },
  {
    id: 's6',
    title: 'الاستشارات الكهربائية',
    description: 'تقديم استشارات فنية متخصصة لمساعدتك في اختيار الحلول الكهربائية المثلى',
    icon: '📋',
    features: ['دراسات جدوى', 'تصميم أنظمة', 'مراجعة مخططات', 'توصيات فنية'],
  },
];

// ==============================
// Testimonials
// ==============================
export const testimonials: Review[] = [
  {
    id: 't1',
    name: 'محمد بن سلمان العمودي',
    avatar: '👤',
    role: 'مدير عام',
    company: 'مجموعة العمودي للمقاولات',
    rating: 5,
    text: 'تعاملنا مع مركز حضرموت الحديث في عدة مشاريع وكانت النتائج مبهرة. منتجات أصلية وخدمة احترافية ودعم فني ممتاز.',
    date: '2024',
  },
  {
    id: 't2',
    name: 'عبدالله باحنان',
    avatar: '👤',
    role: 'مهندس كهربائي',
    company: 'مكتب الإبداع الهندسي',
    rating: 5,
    text: 'المركز يوفر كل ما نحتاجه من معدات كهربائية بجودة عالية. الأسعار منافسة والتوصيل سريع. أنصح الجميع بالتعامل معهم.',
    date: '2024',
  },
  {
    id: 't3',
    name: 'سعيد بارحمة',
    avatar: '👤',
    role: 'مقاول كهربائي',
    company: 'مؤسسة النور للكهرباء',
    rating: 4,
    text: 'من أفضل المراكز في حضرموت. المنتجات أصلية ومضمونة، والفريق الفني محترف ومتعاون جداً.',
    date: '2023',
  },
  {
    id: 't4',
    name: 'أحمد بامحسون',
    avatar: '👤',
    role: 'صاحب مشروع',
    company: 'فندق السلام',
    rating: 5,
    text: 'نفذوا لنا مشروع الإنارة الكاملة للفندق بأحدث تقنيات LED. النتيجة فاقت التوقعات والتوفير في الطاقة ملحوظ.',
    date: '2024',
  },
  {
    id: 't5',
    name: 'ياسر بلفقيه',
    avatar: '👤',
    role: 'مدير مشتريات',
    company: 'شركة الساحل للتجارة',
    rating: 5,
    text: 'شراكة ناجحة مع مركز حضرموت. يوفرون لنا المنتجات في الوقت المطلوب وبالمواصفات المطلوبة تماماً.',
    date: '2024',
  },
];

// ==============================
// Branches
// ==============================
export const branches: Branch[] = [
  {
    id: 'b1',
    name: 'الفرع الرئيسي - المكلا',
    address: 'شارع الستين، المكلا، حضرموت، اليمن',
    phone: '+967 5 000 000',
    email: 'info@hmec.ye',
    workingHours: 'السبت - الخميس: 8 صباحاً - 10 مساءً',
    image: '🏪',
  },
  {
    id: 'b2',
    name: 'فرع الشحر',
    address: 'الشارع العام، الشحر، حضرموت، اليمن',
    phone: '+967 5 111 111',
    email: 'shihr@hmec.ye',
    workingHours: 'السبت - الخميس: 8 صباحاً - 9 مساءً',
    image: '🏬',
  },
  {
    id: 'b3',
    name: 'فرع سيئون',
    address: 'شارع الحرية، سيئون، حضرموت، اليمن',
    phone: '+967 5 222 222',
    email: 'sayun@hmec.ye',
    workingHours: 'السبت - الخميس: 8 صباحاً - 9 مساءً',
    image: '🏫',
  },
];

// ==============================
// Chatbot Responses
// ==============================
export const chatbotResponses: Record<string, string> = {
  'المنتجات': 'نوفر منتجات من أفضل العلامات التجارية العالمية مثل شنايدر، ABB، لوغراند، فيليبس، وسيمنز. تشمل: قواطع كهربائية، لوحات توزيع، كابلات، مفاتيح ومآخذ، إنارة LED، وأنظمة طاقة شمسية. 🔌',
  'الخدمات': 'نقدم خدمات متكاملة تشمل: توريد المعدات الكهربائية، تنفيذ المشاريع، تركيب أنظمة الطاقة الشمسية، تصميم أنظمة الإنارة، الصيانة والدعم الفني، والاستشارات الكهربائية. ⚡',
  'الأسعار': 'أسعارنا تنافسية وتعتمد على نوع المنتج والكمية. تواصل معنا للحصول على عرض سعر مخصص لاحتياجاتك. يمكنك الاتصال على: +967 5 000 000 💰',
  'الفروع': 'لدينا 3 فروع في حضرموت: الفرع الرئيسي في المكلا (شارع الستين)، فرع الشحر، وفرع سيئون. جميع الفروع تعمل من السبت إلى الخميس. 📍',
  'الضمان': 'جميع منتجاتنا أصلية 100% وتأتي مع ضمان من الشركة المصنعة. مدة الضمان تختلف حسب المنتج وتتراوح بين سنة وثلاث سنوات. ✅',
  'التوصيل': 'نوفر خدمة توصيل لجميع مناطق حضرموت. التوصيل مجاني للطلبات الكبيرة. تواصل معنا لمعرفة التفاصيل. 🚚',
  'الوكالات': 'نحن وكلاء معتمدون لـ: شنايدر إلكتريك، ABB، لوغراند، فيليبس، وسيمنز. جميع المنتجات أصلية ومستوردة مباشرة. 🏆',
  'default': 'أهلاً بك! 😊 أنا المساعد الآلي لمركز حضرموت الحديث للكهربائيات. يمكنني مساعدتك في الاستفسار عن المنتجات، الخدمات، الأسعار، الفروع، الضمان، والتوصيل. كيف يمكنني مساعدتك؟',
};

export const quickReplies = [
  'المنتجات',
  'الخدمات',
  'الأسعار',
  'الفروع',
  'الضمان',
  'التوصيل',
  'الوكالات',
];
