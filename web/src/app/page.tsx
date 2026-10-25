import EnquiryCTA from "@/features/home/components/EnquiryCTA/EnquiryCTA";
import FeaturedProjects from "@/features/home/components/FeaturedProjects/FeaturedProjects";
import FeaturedProperties from "@/features/home/components/FeaturedProperties/FeaturedProperties";
import Hero from "@/features/home/components/Hero/Hero";
import PropertyCategories from "@/features/home/components/PropertyCategories/PropertyCategories";
import WhyAman from "@/features/home/components/WhyAman/WhyAman";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProperties />
      <WhyAman />
      <PropertyCategories />
      <FeaturedProjects />
      <EnquiryCTA />
    </main>
  );
}