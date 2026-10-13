// Prisma database seed script for historical Census 2011 and official records
// Run with: npx prisma db push && node prisma/seed.js

const seedData = {
  village: {
    name: "Naranga (नारंगा)",
    slug: "naranga",
    block: "Parihar",
    district: "Sitamarhi",
    state: "Bihar",
    pinCode: "843324",
    censusVillageCode: "219122",
    lgdCode: "101081",
    descriptionHi: "नारंगा गाँव उत्तर बिहार के सीतामढ़ी जिले के परिहार प्रखंड में स्थित है। यह भारत-नेपाल सीमा क्षेत्र के समीप स्थित ऐतिहासिक रूप से समृद्ध ग्राम है।",
    descriptionEn: "Naranga is a prominent village in Parihar Block of Sitamarhi District, Bihar 843324.",
  },
  historicalStatistics: [
    {
      metric: "Population (कुल जनसंख्या)",
      value: "25366",
      sourceName: "Census of India 2011",
      sourceUrl: "https://censusindia.gov.in",
      sourceYear: 2011,
      verificationStatus: "VERIFIED_HISTORICAL",
    },
    {
      metric: "Total Households (परिवार)",
      value: "5591",
      sourceName: "Census of India 2011",
      sourceUrl: "https://censusindia.gov.in",
      sourceYear: 2011,
      verificationStatus: "VERIFIED_HISTORICAL",
    },
    {
      metric: "Male Population (पुरुष)",
      value: "13397",
      sourceName: "Census of India 2011",
      sourceUrl: "https://censusindia.gov.in",
      sourceYear: 2011,
      verificationStatus: "VERIFIED_HISTORICAL",
    },
    {
      metric: "Female Population (महिला)",
      value: "11969",
      sourceName: "Census of India 2011",
      sourceUrl: "https://censusindia.gov.in",
      sourceYear: 2011,
      verificationStatus: "VERIFIED_HISTORICAL",
    },
    {
      metric: "Geographical Area (भौगोलिक क्षेत्रफल)",
      value: "1963",
      unit: "Hectares",
      sourceName: "District Census Handbook Sitamarhi 2011",
      sourceYear: 2011,
      verificationStatus: "VERIFIED_HISTORICAL",
    },
    {
      metric: "Sex Ratio (लिंगानुपात)",
      value: "893",
      unit: "females per 1,000 males",
      sourceName: "Census of India 2011",
      sourceYear: 2011,
      verificationStatus: "VERIFIED_HISTORICAL",
    },
  ],
  agriculture: [
    {
      recordType: "Net Sown Area (शुद्ध बुआई क्षेत्र)",
      value: 1397.0,
      unit: "Hectares",
      crop: "Paddy, Wheat, Maize",
      sourceName: "District Land Records & Agriculture Census",
      sourceYear: 2011,
      verificationStatus: "VERIFIED_HISTORICAL",
    },
    {
      recordType: "Irrigated Area (सिंचित क्षेत्र)",
      value: 51.4,
      unit: "Hectares",
      sourceName: "District Land Records",
      sourceYear: 2011,
      verificationStatus: "VERIFIED_HISTORICAL",
    },
    {
      recordType: "Unirrigated Area (असिंचित क्षेत्र)",
      value: 1345.6,
      unit: "Hectares",
      sourceName: "District Land Records",
      sourceYear: 2011,
      verificationStatus: "VERIFIED_HISTORICAL",
    },
  ],
  representatives: [
    {
      name: "भारत भूषण (Bharat Bhushan)",
      role: "मुखिया (Mukhiya)",
      panchayatName: "Naranga Uttari Gram Panchayat",
      sourceUrl: "Third-party directory listing",
      verificationStatus: "PROVISIONAL_DIRECTORY_LISTING",
      isPublished: true,
    },
  ],
};

console.log("Seeding configuration ready for PostgreSQL database sync:", seedData.village.name);
console.log("Total historical statistics records prepared:", seedData.historicalStatistics.length);
console.log("Total agriculture records prepared:", seedData.agriculture.length);
module.exports = seedData;
