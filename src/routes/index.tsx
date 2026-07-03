import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { bestsellers, categories, CATEGORY_IMAGES, CATEGORY_BLURBS } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import { TrustBadges } from "@/components/site/TrustBadges";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import slidePetriImg from "@/assets/slide-petri-dishes.png";
import slideWomanImg from "@/assets/slide-woman.png";
import slidePinkImg from "@/assets/slide-pink-bottles.png";

const HERO_SLIDES = [
  {
    tagline: "All Concentrations Available",
    title: "From Beginners to Experts, We've Got You Covered",
    description: "Gentle, advanced, and everything in between—find your perfect Tretinoin match.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: slidePetriImg,
    bgClass: "bg-[#F4F7F5]",
    textClass: "text-foreground",
    btnBgClass: "bg-primary hover:bg-primary/95 text-primary-foreground",
  },
  {
    tagline: "Global Shipping",
    title: "Skincare Confidence Delivered Globally",
    description: "Premium Tretinoin products, shipped securely to your doorstep, no matter where you are.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: slideWomanImg,
    bgClass: "bg-[#F7EFE5]",
    textClass: "text-foreground",
    btnBgClass: "bg-primary hover:bg-primary/95 text-primary-foreground",
  },
  {
    tagline: "Buy Tretinoin",
    title: "Your Ultimate Destination for Tretinoin",
    description: "Discover dermatologist-approved solutions for acne, anti-aging, and hyperpigmentation.",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    image: slidePinkImg,
    bgClass: "bg-[#FBF0F3]",
    textClass: "text-foreground",
    btnBgClass: "bg-primary hover:bg-primary/95 text-primary-foreground",
  },
];

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-play: advance every 4 s, pause on hover
  useEffect(() => {
    if (!api || isHovered) return;
    const timer = setInterval(() => {
      api.scrollNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [api, isHovered]);

  return (
    <>
      {/* Hero Swiper */}
      <section
        className="relative w-full overflow-hidden pt-6 pb-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 md:-ml-6 py-4">
            {HERO_SLIDES.map((slide, index) => (
              <CarouselItem
                key={index}
                className="pl-3 md:pl-6 basis-[90%] md:basis-[80%] lg:basis-[74%] transition-all duration-300"
              >
                <div
                  className={`overflow-hidden rounded-3xl ${slide.bgClass} ${slide.textClass} flex flex-col md:flex-row items-stretch min-h-[420px] md:min-h-[480px] border border-border/40 shadow-sm`}
                >
                  {/* Text Container */}
                  <div className="flex-1 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
                    <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary w-fit">
                      {slide.tagline}
                    </span>
                    <h2 className="mt-4 text-2xl font-medium leading-[1.1] tracking-tight sm:text-3xl md:text-4xl lg:text-5xl font-display">
                      {slide.title}
                    </h2>
                    <p className="mt-4 max-w-md text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="mt-6 md:mt-8">
                      <Link
                        to={slide.buttonLink}
                        className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] ${slide.btnBgClass}`}
                      >
                        {slide.buttonText} <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>

                  {/* Image Container */}
                  <div className="flex-1 relative min-h-[220px] sm:min-h-[280px] md:min-h-full overflow-hidden order-1 md:order-2">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          {/* Navigation Controls */}
          <CarouselPrevious className="absolute left-6 sm:left-8 md:left-16 lg:left-24 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-foreground border border-border/60 hover:text-foreground h-10 w-10 shadow-md z-20 transition-transform hover:scale-105" />
          <CarouselNext className="absolute right-6 sm:right-8 md:right-16 lg:right-24 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-foreground border border-border/60 hover:text-foreground h-10 w-10 shadow-md z-20 transition-transform hover:scale-105" />
        </Carousel>

        {/* Dots Indicator */}
        <div className="mt-2 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === current ? "bg-primary w-5" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Marquee Banner */}
      <section className="w-full overflow-hidden bg-[#0A0D0C] text-white py-3 border-y border-white/5">
        <div className="animate-marquee flex gap-12 text-[11px] font-semibold uppercase tracking-[0.18em] select-none">
          <div className="flex items-center gap-12">
            <span>Free Shipping On Orders Over £150</span>
            <span className="text-[#82C3D3]">•</span>
            <span>Discreet Packaging</span>
            <span className="text-[#82C3D3]">•</span>
            <span>100% Genuine Retinoids</span>
            <span className="text-[#82C3D3]">•</span>
            <span>Dermatologist Approved</span>
            <span className="text-[#82C3D3]">•</span>
          </div>
          <div className="flex items-center gap-12" aria-hidden="true">
            <span>Free Shipping On Orders Over £150</span>
            <span className="text-[#82C3D3]">•</span>
            <span>Discreet Packaging</span>
            <span className="text-[#82C3D3]">•</span>
            <span>100% Genuine Retinoids</span>
            <span className="text-[#82C3D3]">•</span>
            <span>Dermatologist Approved</span>
            <span className="text-[#82C3D3]">•</span>
          </div>
          <div className="flex items-center gap-12" aria-hidden="true">
            <span>Free Shipping On Orders Over £150</span>
            <span className="text-[#82C3D3]">•</span>
            <span>Discreet Packaging</span>
            <span className="text-[#82C3D3]">•</span>
            <span>100% Genuine Retinoids</span>
            <span className="text-[#82C3D3]">•</span>
            <span>Dermatologist Approved</span>
            <span className="text-[#82C3D3]">•</span>
          </div>
          <div className="flex items-center gap-12" aria-hidden="true">
            <span>Free Shipping On Orders Over £150</span>
            <span className="text-[#82C3D3]">•</span>
            <span>Discreet Packaging</span>
            <span className="text-[#82C3D3]">•</span>
            <span>100% Genuine Retinoids</span>
            <span className="text-[#82C3D3]">•</span>
            <span>Dermatologist Approved</span>
            <span className="text-[#82C3D3]">•</span>
          </div>
        </div>
      </section>


      {/* Trust row */}
      <section className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
          <TrustBadges compact />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Shop by category</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Every formulation curated by concern — from renewal to lightening to lash growth.
            </p>
          </div>
          <Link to="/categories" className="hidden text-sm font-medium text-primary hover:underline md:block">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-card"
            >
              <div className="aspect-[4/5] overflow-hidden bg-secondary/40">
                <img
                  src={CATEGORY_IMAGES[c.slug]}
                  alt={c.name}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold tracking-tight md:text-base">{c.name}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {CATEGORY_BLURBS[c.slug]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">Bestsellers</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The formulations customers keep coming back to.
            </p>
          </div>
          <Link to="/shop" className="hidden text-sm font-medium text-primary hover:underline md:block">
            Shop all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {bestsellers.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promise strip */}
      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="rounded-2xl bg-primary px-8 py-14 text-primary-foreground md:px-14">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
              The BuyTretinoin promise
            </h2>
            <p className="mt-3 text-sm opacity-90 md:text-base">
              Every product is sourced direct, sealed, and shipped from our dispensary in
              tamper-evident packaging. If it doesn't arrive as described, we replace it — no forms,
              no fuss.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background/90"
            >
              How we ship <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
