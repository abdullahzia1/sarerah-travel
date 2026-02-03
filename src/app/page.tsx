import { TrustBadges } from "@/components/home/TrustBadges";
import { Hero } from "@/components/home/Hero";
import { FeaturedTrips } from "@/components/home/FeaturedTrips";
import { WhyTravelWithUs } from "@/components/home/WhyTravelWithUs";
import { ExploreDestinations } from "@/components/home/ExploreDestinations";
import { AdventureCategories } from "@/components/home/AdventureCategories";
import { Testimonials } from "@/components/home/Testimonials";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LeadForm } from "@/components/home/LeadForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <FeaturedTrips />
      <WhyTravelWithUs />
      <ExploreDestinations />
      <AdventureCategories />
      <Testimonials />
      <HowItWorks />
      <LeadForm />
      <div className="h-20 md:hidden" aria-hidden />
    </>
  );
}
