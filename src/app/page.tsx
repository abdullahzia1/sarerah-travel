import { TrustBadges } from "@/components/home/TrustBadges";
import { Hero } from "@/components/home/Hero";
import { FeaturedTrips } from "@/components/home/FeaturedTrips";
import { WhyTravelWithUs } from "@/components/home/WhyTravelWithUs";
import { ExploreDestinations } from "@/components/home/ExploreDestinations";
import { AdventureCategories } from "@/components/home/AdventureCategories";
import { Testimonials } from "@/components/home/Testimonials";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LeadForm } from "@/components/home/LeadForm";
import { getAllDestinations } from "@/data/destinations";
import { getFeaturedPackages } from "@/data/packages";
import { getRecentReviews } from "@/data/reviews";

export default async function HomePage() {
  const [destinations, featuredPackages, recentReviews] = await Promise.all([
    getAllDestinations(),
    getFeaturedPackages(6),
    getRecentReviews(6),
  ]);

  return (
    <>
      <Hero destinations={destinations} />
      <TrustBadges />
      <FeaturedTrips packages={featuredPackages} />
      <WhyTravelWithUs />
      <ExploreDestinations destinations={destinations} />
      <AdventureCategories />
      <Testimonials reviews={recentReviews} />
      <HowItWorks />
      <LeadForm />
      <div className="h-20 md:hidden" aria-hidden />
    </>
  );
}
