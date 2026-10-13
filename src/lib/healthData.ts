export interface HealthFacility {
  id: string;
  name: string;
  nameHi: string;
  facilityType: "sub_centre" | "chc" | "district_hospital" | "ayush" | "private_clinic";
  typeLabelHi: string;
  typeLabelEn: string;
  categoryTagHi: string;
  categoryTagEn: string;
  village: string;
  habitation: string;
  address: string;
  distanceFromNarangaHi: string;
  distanceFromNarangaEn: string;
  phone?: string;
  emergencyPhone?: string;
  operatingHoursHi: string;
  operatingHoursEn: string;
  servicesHi: string[];
  servicesEn: string[];
  statusSummaryHi: string;
  statusSummaryEn: string;
  verificationStatus: "verified" | "pending_verification" | "data_not_available";
  statusTextHi: string;
  statusTextEn: string;
  warningNoteHi?: string;
  warningNoteEn?: string;
  sourceUrl: string;
  sourceName: string;
  lastVerifiedAt: string;
  imageUrl?: string;
}

export const HEALTH_FACILITIES: HealthFacility[] = [
  {
    id: "aphc-naranga",
    name: "APHC / Health Sub-Centre Naranga",
    nameHi: "अतिरिक्त प्राथमिक स्वास्थ्य केंद्र (APHC) / स्वास्थ्य उप-केंद्र नारंगा",
    facilityType: "sub_centre",
    typeLabelHi: "सरकारी उप-स्वास्थ्य केंद्र",
    typeLabelEn: "Government Health Sub-Centre",
    categoryTagHi: "ग्राम स्तरीय स्वास्थ्य केंद्र",
    categoryTagEn: "Village Health Sub-Centre",
    village: "नारंगा (Naranga)",
    habitation: "नारंगा मुख्य बस्ती / संकुल",
    address: "नारंगा, प्रखंड परिहार, जिला सीतामढ़ी, पिन 843324",
    distanceFromNarangaHi: "गाँव के अंदर (स्थानीय केंद्र)",
    distanceFromNarangaEn: "Within Naranga Village",
    emergencyPhone: "102 / 108",
    operatingHoursHi: "नियमित टीकाकरण एवं ओपीडी दिवस (रोस्टर अनुसार)",
    operatingHoursEn: "Immunization & OPD Days (As per District Roster)",
    servicesHi: [
      "प्राथमिक प्राथमिक उपचार (First Aid)",
      "मातृ एवं शिशु टीकाकरण (Mission Indradhanush)",
      "ORS, जिंक एवं आवश्यक दवा वितरण",
      "गर्भवती महिलाओं की स्वास्थ्य निगरानी (ANC)",
      "आशा एवं एएनएम परामर्श सेवाएँ",
    ],
    servicesEn: [
      "First Aid & Emergency Triaging",
      "Maternal & Child Immunization",
      "ORS, Zinc & Essential Drug Disbursal",
      "Antenatal Care (ANC) Monitoring",
      "ASHA & ANM Counseling",
    ],
    statusSummaryHi: "सरकारी डायरेक्टरी अनुसार सूचीबद्ध — स्थायी चिकित्सा रोस्टर एवं स्टाफ उपस्थिति की पुष्टि प्रक्रियाधीन है।",
    statusSummaryEn: "Enlisted in state directory — operational duty roster and resident staff verification is in progress.",
    verificationStatus: "pending_verification",
    statusTextHi: "पुष्टि आवश्यक (डायरेक्टरी सूचीबद्ध)",
    statusTextEn: "Verification Required (Directory Listed)",
    sourceUrl: "https://sitamarhi.nic.in",
    sourceName: "जिला स्वास्थ्य समिति सीतामढ़ी एवं बिहार स्वास्थ्य विभाग",
    lastVerifiedAt: "2024-10-24",
  },
  {
    id: "chc-parihar",
    name: "Community Health Centre (CHC) Parihar",
    nameHi: "सामुदायिक स्वास्थ्य केंद्र (CHC) परिहार",
    facilityType: "chc",
    typeLabelHi: "प्रखंड स्तरीय सामुदायिक अस्पताल",
    typeLabelEn: "Block Community Health Centre",
    categoryTagHi: "24x7 आपातकालीन व प्रसव केंद्र",
    categoryTagEn: "24x7 Emergency & Delivery Unit",
    village: "परिहार (Parihar)",
    habitation: "परिहार प्रखंड मुख्यालय बाज़ार",
    address: "प्रखंड मुख्यालय, परिहार, जिला सीतामढ़ी 843324",
    distanceFromNarangaHi: "~8-10 किमी (नारंगा से निकटतम रेफरल CHC)",
    distanceFromNarangaEn: "~8-10 km from Naranga (Nearest Block Referral)",
    phone: "102 / 108",
    emergencyPhone: "102 / 108",
    operatingHoursHi: "24 घंटे आपातकालीन सेवा | ओपीडी: प्रातः 9:00 से दोपहर 2:00 बजे तक",
    operatingHoursEn: "24 Hours Emergency | OPD: 9:00 AM to 2:00 PM",
    servicesHi: [
      "24 घंटे आपातकालीन चिकित्सा कक्ष",
      "संस्थागत सुरक्षित प्रसव केंद्र (24x7 Maternity Ward)",
      "सामान्य बाह्य रोगी विभाग (OPD)",
      "नैदानिक पैथोलॉजी रक्त/मूत्र जाँच",
      "निःशुल्क सरकारी दवा वितरण काउंटर",
      "102 / 108 सरकारी एम्बुलेंस बेस",
    ],
    servicesEn: [
      "24x7 Emergency Treatment Ward",
      "Institutional Safe Delivery Unit",
      "General Out-Patient Department (OPD)",
      "Diagnostic Blood & Urine Lab Testing",
      "Free Essential Medicine Counter",
      "102 / 108 Ambulance Dispatch Base",
    ],
    statusSummaryHi: "प्रखंड परिहार का मुख्य सरकारी स्वास्थ्य केंद्र। चौबीसों घंटे आपातकालीन प्रसव एवं प्राथमिक चिकित्सा सुविधा उपलब्ध।",
    statusSummaryEn: "Principal government referral facility for Parihar block. 24x7 institutional maternity and emergency care.",
    verificationStatus: "verified",
    statusTextHi: "सत्यापित प्रखंड संदर्भ केंद्र",
    statusTextEn: "Verified Block Referral Center",
    sourceUrl: "https://sitamarhi.nic.in",
    sourceName: "स्वास्थ्य विभाग, बिहार सरकार एवं जिला प्रशासन सीतामढ़ी",
    lastVerifiedAt: "2024-10-24",
  },
  {
    id: "sadar-hospital-sitamarhi",
    name: "District Sadar Hospital Sitamarhi",
    nameHi: "सदर अस्पताल सीतामढ़ी (District Sadar Hospital)",
    facilityType: "district_hospital",
    typeLabelHi: "जिला स्तरीय मुख्य अस्पताल",
    typeLabelEn: "District Sadar Hospital",
    categoryTagHi: "विशेषज्ञ एवं तृतीयक स्वास्थ्य केंद्र",
    categoryTagEn: "Specialized Tertiary Referral",
    village: "सीतामढ़ी (Sitamarhi)",
    habitation: "डुमरा रोड / मुख्य प्रशासनिक शहर",
    address: "डुमरा रोड, सीतामढ़ी, बिहार 843302",
    distanceFromNarangaHi: "~41 किमी (जिला मुख्यालय)",
    distanceFromNarangaEn: "~41 km from Naranga (District HQ)",
    emergencyPhone: "102 / 112",
    operatingHoursHi: "24 घंटे आपातकालीन सेवा, ट्रामा सेंटर एवं विशेषज्ञ ओपीडी",
    operatingHoursEn: "24 Hours Emergency, Trauma Centre & Specialty OPD",
    servicesHi: [
      "24 घंटे ब्लड बैंक एवं रक्त आधान सेवा",
      "सघन शिशु चिकित्सा इकाई (SNCU) व आईसीयू",
      "डिजिटल एक्स-रे, अल्ट्रासाउंड एवं सीटी स्कैन",
      "उन्नत शल्य चिकित्सा (General & Ortho Surgery)",
      "डायलिसिस केंद्र एवं बर्न वार्ड",
      "आयुष्मान भारत PM-JAY कैशलेस डेस्क",
    ],
    servicesEn: [
      "24x7 Blood Bank & Transfusion",
      "Special Newborn Care Unit (SNCU) & ICU",
      "Digital X-Ray, Sonography & CT Scan",
      "Advanced Surgical Operation Theatres",
      "Dialysis Center & Burn Care",
      "Ayushman Bharat PM-JAY Cashless Helpdesk",
    ],
    statusSummaryHi: "सीतामढ़ी जिले का सर्वोच्च सरकारी अस्पताल। गंभीर दुर्घटनाओं, जटिल प्रसव व गहन चिकित्सा हेतु प्राथमिक रेफरल गंतव्य।",
    statusSummaryEn: "Highest-tier public healthcare institution in Sitamarhi district. Equipped with ICU, blood bank, and surgical units.",
    verificationStatus: "verified",
    statusTextHi: "सत्यापित जिला अस्पताल",
    statusTextEn: "Verified District Hospital",
    sourceUrl: "https://sitamarhi.nic.in",
    sourceName: "राष्ट्रीय स्वास्थ्य मिशन बिहार एवं सीतामढ़ी जिला प्रशासन",
    lastVerifiedAt: "2024-10-24",
  },
];

export interface HealthScheme {
  id: string;
  nameHi: string;
  nameEn: string;
  categoryHi: string;
  categoryEn: string;
  descriptionHi: string;
  descriptionEn: string;
  eligibilityHi: string;
  eligibilityEn: string;
  officialUrl: string;
  portalName: string;
}

export const HEALTH_SCHEMES: HealthScheme[] = [
  {
    id: "pm-jay",
    nameHi: "आयुष्मान भारत — PM-JAY (Pradhan Mantri Jan Arogya Yojana)",
    nameEn: "Ayushman Bharat — PM-JAY",
    categoryHi: "राष्ट्रीय स्वास्थ्य सुरक्षा",
    categoryEn: "National Health Protection",
    descriptionHi: "पात्र परिवारों को प्रति वर्ष ₹5 लाख तक का निःशुल्क कैशलेस अस्पताल उपचार। सूचिबद्ध सरकारी व निजी अस्पतालों में इनडोर इलाज की पूर्ण सुविधा।",
    descriptionEn: "Cashless secondary and tertiary hospitalization cover up to ₹5 Lakh per eligible family per year across empaneled hospitals.",
    eligibilityHi: "SECC 2011 सूची में शामिल परिवार, राष्ट्रीय खाद्य सुरक्षा (राशन कार्ड) धारक एवं 70 वर्ष से अधिक आयु के वरिष्ठ नागरिक।",
    eligibilityEn: "Families identified in SECC 2011, active ration card holders, and senior citizens aged 70+.",
    officialUrl: "https://nha.gov.in",
    portalName: "nha.gov.in",
  },
  {
    id: "aarogya-mandir",
    nameHi: "आयुष्मान आरोग्य मंदिर (Ayushman Arogya Mandir)",
    nameEn: "Ayushman Arogya Mandir",
    categoryHi: "प्राथमिक स्वास्थ्य देखभाल",
    categoryEn: "Comprehensive Primary Care",
    descriptionHi: "उपकेंद्र स्तर पर व्यापक प्राथमिक स्वास्थ्य सेवाएँ, 14 आवश्यक नैदानिक प्रयोगशाला जाँचें, निःशुल्क दवा वितरण और ई-संजीवनी टेली-परामर्श।",
    descriptionEn: "Comprehensive Primary Health Care (CPHC), essential medicines, 14 point-of-care diagnostics, and e-Sanjeevani tele-consultation.",
    eligibilityHi: "गाँव के सभी निवासी, निःशुल्क प्राथमिक स्वास्थ्य परीक्षण व दवाइयाँ।",
    eligibilityEn: "All village residents, universal free access to basic diagnostics and essential drugs.",
    officialUrl: "https://mohfw.gov.in",
    portalName: "mohfw.gov.in",
  },
  {
    id: "jsy-jssk",
    nameHi: "जननी सुरक्षा योजना एवं JSSK (Janani Shishu Suraksha Karyakram)",
    nameEn: "Janani Suraksha Yojana & JSSK",
    categoryHi: "मातृ-शिशु सुरक्षा",
    categoryEn: "Maternal & Child Health",
    descriptionHi: "सरकारी अस्पताल में सुरक्षित संस्थागत प्रसव कराने पर ग्रामीण महिलाओं को ₹1400 की वित्तीय सहायता तथा निःशुल्क दवा, भोजन, वाहन व सी-सेक्शन।",
    descriptionEn: "Direct financial assistance of ₹1400 for institutional delivery in public facilities with completely free drugs, diagnostics, and transport.",
    eligibilityHi: "सभी गर्भवती महिलाएँ जो सरकारी स्वास्थ्य केंद्र (CHC परिहार आदि) में संस्थागत प्रसव कराती हैं।",
    eligibilityEn: "All pregnant women delivering at public health facilities.",
    officialUrl: "https://state.bihar.gov.in",
    portalName: "state.bihar.gov.in",
  },
  {
    id: "nhm-immunization",
    nameHi: "राष्ट्रीय स्वास्थ्य मिशन — मिशन इंद्रधनुष संपूर्ण टीकाकरण",
    nameEn: "National Health Mission — Mission Indradhanush",
    categoryHi: "बाल स्वास्थ्य एवं पोषण",
    categoryEn: "Child Health & Immunization",
    descriptionHi: "शिशुओं को 12 जानलेवा बीमारियों से बचाने हेतु संपूर्ण निःशुल्क टीकाकरण, विटामिन-ए और एनीमिया मुक्त भारत अभियान के तहत दवाइयाँ।",
    descriptionEn: "Free universal immunization against 12 life-threatening diseases, Vitamin A supplementation, and Anemia Mukt Bharat outreach.",
    eligibilityHi: "जन्म से लेकर 5 वर्ष तक के सभी बच्चे एवं गर्भवती माताएँ।",
    eligibilityEn: "All infants and children up to 5 years, along with expectant mothers.",
    officialUrl: "https://mohfw.gov.in",
    portalName: "mohfw.gov.in",
  },
  {
    id: "kanya-utthan-health",
    nameHi: "मुख्यमंत्री कन्या उत्थान योजना (स्वास्थ्य एवं टीकाकरण किश्त)",
    nameEn: "Mukhyamantri Kanya Utthan Yojana",
    categoryHi: "बालिका कल्याण संबल",
    categoryEn: "Girl Child Health Incentive",
    descriptionHi: "बालिका जन्म पर प्रोत्साहन राशि एवं 1 वर्ष पूर्ण होने पर संपूर्ण टीकाकरण उपरांत किश्तों में प्रत्यक्ष बैंक अंतरण (DBT) सहायता।",
    descriptionEn: "Direct financial transfer upon birth of a girl child and completion of full 1-year immunization schedule.",
    eligibilityHi: "बिहार की मूल निवासी बालिकाएँ, सरकारी आँगनबाड़ी व स्वास्थ्य केंद्र में पंजीकृत।",
    eligibilityEn: "Resident girls of Bihar enrolled through local Anganwadi/HSC network.",
    officialUrl: "https://state.bihar.gov.in",
    portalName: "state.bihar.gov.in",
  },
  {
    id: "ors-zinc-control",
    nameHi: "सुरक्षित जल एवं डायरिया नियंत्रण अभियान (ORS-Zinc)",
    nameEn: "Safe Water & Diarrhea Control Initiative",
    categoryHi: "जलजनित रोग निवारण",
    categoryEn: "Waterborne Disease Prevention",
    descriptionHi: "दस्त एवं डिहाइड्रेशन से बाल सुरक्षा हेतु आशा कार्यकर्ताओं के माध्यम से घर-घर निःशुल्क ओआरएस पैकेट एवं जिंक की गोलियों का वितरण।",
    descriptionEn: "Free door-to-door distribution of ORS sachets and Zinc tablets through ASHA workers to prevent childhood dehydration.",
    eligibilityHi: "गाँव के सभी परिवार, विशेषकर 5 वर्ष से कम आयु के बच्चों वाले घर।",
    eligibilityEn: "All households with children under five years.",
    officialUrl: "https://state.bihar.gov.in",
    portalName: "state.bihar.gov.in",
  },
];

export interface HealthAwarenessTopic {
  id: string;
  iconName: string;
  titleHi: string;
  titleEn: string;
  descHi: string;
  descEn: string;
  guidelinesHi: string[];
  guidelinesEn: string[];
}

export const HEALTH_AWARENESS_TOPICS: HealthAwarenessTopic[] = [
  {
    id: "clean-water",
    iconName: "water",
    titleHi: "स्वच्छ पेयजल एवं स्वच्छता",
    titleEn: "Clean Drinking Water & Sanitation",
    descHi: "दूषित पानी से हैजा, टाइफाइड और पीलिया का गंभीर खतरा रहता है। हमेशा स्वच्छ नल या उबले हुए पानी का सेवन करें।",
    descEn: "Contaminated water can cause cholera, typhoid, and hepatitis. Always consume boiled or safe tap water.",
    guidelinesHi: [
      "पीने का पानी हमेशा ढककर रखें और साफ बर्तन का उपयोग करें।",
      "बाढ़ या बारिश के बाद कुओं/चापाकलों के पास ब्लीचिंग पाउडर का छिड़काव करें।",
      "दस्त होने पर तुरंत ओआरएस (ORS) घोल पिलाएँ।",
    ],
    guidelinesEn: [
      "Keep drinking water covered and use clean handling utensils.",
      "Disinfect tubewells and surroundings with bleaching powder post-floods.",
      "Administer ORS immediately upon onset of loose motions.",
    ],
  },
  {
    id: "maternal-child",
    iconName: "family_restroom",
    titleHi: "मातृ एवं शिशु स्वास्थ्य",
    titleEn: "Maternal & Child Health",
    descHi: "गर्भावस्था के दौरान कम से कम 4 बार एएनसी (ANC) स्वास्थ्य जाँच कराएं। सुरक्षित प्रसव केवल सरकारी अस्पताल में कराएं।",
    descEn: "Ensure at least 4 Antenatal Checkups (ANC) during pregnancy. Plan institutional delivery in hospital.",
    guidelinesHi: [
      "आयरन एवं फोलिक एसिड (IFA) की 180 गोलियों का नियमित सेवन करें।",
      "नवजात शिशु को जन्म के तुरंत बाद पहले 6 महीने केवल माँ का दूध ही दें।",
      "संस्थागत प्रसव हेतु 102 नंबर पर पहले से संपर्क रखें।",
    ],
    guidelinesEn: [
      "Consume iron & folic acid tablets regularly during pregnancy.",
      "Practice exclusive breastfeeding for the first 6 months.",
      "Keep 102 ambulance helpline accessible for transport to CHC.",
    ],
  },
  {
    id: "immunization",
    iconName: "medication",
    titleHi: "नियमित संपूर्ण टीकाकरण",
    titleEn: "Universal Immunization",
    descHi: "टीकाकरण बच्चे का पहला और सबसे मजबूत सुरक्षा कवच है। ग्राम आँगनबाड़ी व उपकेंद्र सत्र में सभी टीके लगवाएँ।",
    descEn: "Immunization protects against life-threatening childhood illnesses. Complete all scheduled vaccines on time.",
    guidelinesHi: [
      "बीसीजी, पोलियो, पेंटावेलेंट, रोटावायरस व एमआर (MR) टीके अनिवार्य हैं।",
      "टीकाकरण कार्ड (MCH Card) सुरक्षित रखें।",
      "हर बुधवार/शुक्रवार ग्राम स्वास्थ्य स्वच्छता एवं पोषण दिवस (VHSND) पर जाएँ।",
    ],
    guidelinesEn: [
      "Timely BCG, Polio, Pentavalent, Rotavirus and MR shots are mandatory.",
      "Preserve the Maternal & Child Health (MCH) tracking card safely.",
      "Participate in Village Health Sanitation and Nutrition Day (VHSND) sessions.",
    ],
  },
  {
    id: "vector-borne",
    iconName: "pest_control",
    titleHi: "मौसमी बीमारियों (मलेरिया व डेंगू) से बचाव",
    titleEn: "Vector-Borne Diseases Prevention",
    descHi: "घरों और जलस्रोतों के पास गंदा पानी जमा न होने दें। रात में सोते समय मच्छरदानी का नियमित उपयोग करें।",
    descEn: "Prevent stagnant water accumulation around dwellings. Always sleep under insecticide-treated mosquito nets.",
    guidelinesHi: [
      "कूलर, पुराने बर्तनों व गड्ढों में जलजमाव न होने दें।",
      "बुखार आने पर खुद से एस्पिरिन या अन्य दवा न लें।",
      "तीव्र बुखार, कंपकंपी या सिरदर्द होने पर तुरंत CHC परिहार में रक्त जाँच कराएं।",
    ],
    guidelinesEn: [
      "Empty standing water from buckets, tires, and pits weekly.",
      "Avoid self-medication during unexplained fevers.",
      "Visit CHC Parihar immediately for diagnostic blood smears.",
    ],
  },
  {
    id: "nutrition",
    iconName: "nutrition",
    titleHi: "पोषण एवं संतुलित आहार",
    titleEn: "Nutrition & Balanced Diet",
    descHi: "स्थानीय स्तर पर उपलब्ध पौष्टिक खाद्य पदार्थ एनीमिया और कुपोषण को दूर भगाने का सबसे सस्ता व सुलभ उपाय हैं।",
    descEn: "Locally grown seasonal produce offers the most effective defence against malnutrition and anemia.",
    guidelinesHi: [
      "हरी पत्तेदार सब्जियाँ, सहजन (मुनगा), दालें और मौसमी फल आहार में शामिल करें।",
      "किशोरियों एवं महिलाओं में खून की कमी की जाँच कराएं।",
      "आँगनबाड़ी केंद्र से पूरक पोषाहार (THR) प्राप्त करें।",
    ],
    guidelinesEn: [
      "Include drumstick (moringa), leafy greens, lentils, and seasonal fruits.",
      "Screen adolescent girls and mothers for hemoglobin levels.",
      "Collect Take-Home Ration (THR) supplementary nutrition from Anganwadi.",
    ],
  },
  {
    id: "hygiene",
    iconName: "clean_hands",
    titleHi: "हाथों की स्वच्छता एवं आदतें",
    titleEn: "Personal Hygiene & Sanitation",
    descHi: "शौच के बाद और भोजन पकाने/खाने से पहले साबुन से हाथ धोना कई गंभीर बीमारियों से 50% तक बचाव करता है।",
    descEn: "Handwashing with soap before meals and after sanitation prevents up to 50% of gastrointestinal infections.",
    guidelinesHi: [
      "साबुन से कम से कम 20 सेकंड तक दोनों हाथों को अच्छी तरह रगड़ें।",
      "नाखून साफ रखें और खुले में शौच से बचें।",
      "कचरे का सुरक्षित निपटान करें और नालियों की सफाई रखें।",
    ],
    guidelinesEn: [
      "Scrub hands with soap and water thoroughly for at least 20 seconds.",
      "Trim nails regularly and avoid open defecation.",
      "Dispose household garbage safely away from drinking sources.",
    ],
  },
];
