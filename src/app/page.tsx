import { VillageHero } from "@/components/VillageHero";
import { PlacesCarousel } from "@/components/PlacesCarousel";
import { VillageStatistics } from "@/components/VillageStatistics";
import { PanchayatPreview } from "@/components/PanchayatPreview";
import { AgriculturePreview } from "@/components/AgriculturePreview";
import { EducationPreview } from "@/components/EducationPreview";
import { HealthcarePreview } from "@/components/HealthcarePreview";
import { WeatherSection } from "@/components/WeatherSection";
import { LocalServicesGrid } from "@/components/LocalServicesGrid";
import { PeoplePreview } from "@/components/PeoplePreview";
import { CultureSection } from "@/components/CultureSection";
import { VillageNotices } from "@/components/VillageNotices";
import { VillageMap } from "@/components/VillageMap";
import { GovernmentSchemes } from "@/components/GovernmentSchemes";
import { CommunityContribution } from "@/components/CommunityContribution";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full -mt-28">
      {/* 1. Hero Section */}
      <VillageHero />

      {/* 2. Five-Image Places Carousel */}
      <PlacesCarousel />

      {/* 3. Village Statistics (Census 2011 Verified) */}
      <VillageStatistics />

      {/* 4. Panchayat Leadership & Representatives */}
      <PanchayatPreview />

      {/* 5. Dedicated Agriculture & Farmers Section */}
      <AgriculturePreview />

      {/* 6. Education & Schools Section */}
      <EducationPreview />

      {/* 7. Healthcare & Emergency Facilities */}
      <HealthcarePreview />

      {/* 8. Weather & Agricultural Climate */}
      <WeatherSection />

      {/* 9. Local Businesses & Services Grid */}
      <LocalServicesGrid />

      {/* 10. People & Achievers Section */}
      <PeoplePreview />

      {/* 11. Culture, Festivals & Traditions */}
      <CultureSection />

      {/* 12. Notices Board */}
      <VillageNotices />

      {/* 13. Village Map & Geography */}
      <VillageMap />

      {/* 14. Government Schemes & Citizen Services */}
      <GovernmentSchemes />

      {/* 15. Community Contribution & Co-Building */}
      <CommunityContribution />
    </div>
  );
}
