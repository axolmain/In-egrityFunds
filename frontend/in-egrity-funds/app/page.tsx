import HomeHero from '@/components/HomeHero';
import FullSection from '@/components/sections/FullSection';
import LeftSection from '@/components/sections/LeftSection';
import RightSection from '@/components/sections/RightSection';
import CustomerTestimonials from '@/components/customerTestimonials/CustomerTestimonials';

import {
  fullSectionContent,
  rightSectionContent,
  leftSectionContent,
  rightSectionContent2,
} from '@/content/homeContent';

export default function Home() {
  return (
    <main>
      <HomeHero />
      <FullSection content={fullSectionContent} />
      <RightSection
        content={rightSectionContent}
        image='finance-phone'
        imageAlt='phone and papers'
      />
      <LeftSection
        content={leftSectionContent}
        image='guy-with-card'
        imageAlt='guy with card'
      />
      <RightSection
        content={rightSectionContent2}
        image='finance-papers'
        imageAlt='Finance papers'
      />
      <CustomerTestimonials />
    </main>
  );
}
