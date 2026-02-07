import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Truck, 
  GraduationCap, 
  DollarSign, 
  Shield, 
  Video, 
  ChevronDown,
  Heart,
  Users,
  Building2,
  Mail,
  ExternalLink,
  Sparkles,
  Bot,
  FileText,
  Zap,
  ArrowRight,
  Menu,
  X,
  Moon,
  Sun,
  Cat,
  Rocket,
  CheckCircle2,
  MapPin,
  Send
} from "lucide-react";
import heroImage from "@assets/generated_images/vet_examining_cat_in_mobile_clinic.png";

function useInView(ref: React.RefObject<HTMLElement>, threshold = 0.1) {
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  
  return inView;
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(saved === "dark" || (!saved && prefersDark));
  }, []);
  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsDark(!isDark)}
      data-testid="button-theme-toggle"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

const GOFUNDME_URL = "https://gofund.me/76d814215";

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const navItems = [
    { label: "The Crisis", href: "#crisis" },
    { label: "How It Works", href: "#pillars" },
    { label: "The Money", href: "#financial" },
    { label: "Tech Tools", href: "#tools" },
    { label: "Join Us", href: "#join" },
  ];
  
  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 h-16">
          <a 
            href="#" 
            className="flex items-center gap-2 font-serif font-bold text-xl"
            data-testid="link-logo"
          >
            <Cat className="h-6 w-6 text-primary" />
            <span className={isScrolled ? "text-foreground" : "text-white"}>
              Vet Van Fleet
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors hover-elevate ${
                  isScrolled 
                    ? "text-foreground hover:text-primary" 
                    : "text-white/90 hover:text-white"
                }`}
                data-testid={`link-nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {item.label}
              </button>
            ))}
            <a
              href={GOFUNDME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 ml-2 px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors"
              data-testid="link-donate-nav"
            >
              <Heart className="h-4 w-4 fill-current" />
              Donate
            </a>
            <ThemeToggle />
          </div>
          
          <div className="md:hidden flex items-center gap-2">
            <a
              href={GOFUNDME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors"
              data-testid="link-donate-mobile"
            >
              <Heart className="h-3.5 w-3.5 fill-current" />
              Donate
            </a>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={isScrolled ? "" : "text-white"}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="block w-full text-left px-4 py-3 text-foreground font-medium rounded-md hover-elevate"
                data-testid={`link-mobile-nav-${item.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {item.label}
              </button>
            ))}
            <a
              href={GOFUNDME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full px-4 py-3 text-emerald-600 dark:text-emerald-400 font-bold rounded-md hover-elevate"
              data-testid="link-donate-menu"
            >
              <Heart className="h-5 w-5 fill-current" />
              Donate
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section 
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <Badge 
          variant="outline" 
          className="mb-6 border-white/30 text-white bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm"
        >
          Not a charity. A platform.
        </Badge>
        
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
          Free Vet Care for All Cats.
          <br />
          <span className="text-primary">Everywhere.</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-white/80 font-medium mb-4 max-w-3xl mx-auto">
          We don't want your money. We want theirs.
        </p>
        
        <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">
          Reverse-engineering the billionaire playbook—tax loopholes, grants, corporate write-offs—to fund animal welfare. One van at a time.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="min-w-[180px] text-lg"
            onClick={() => document.querySelector("#pillars")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="button-how-it-works"
          >
            How It Works
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="min-w-[180px] text-lg border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20"
            onClick={() => document.querySelector("#join")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="button-join-movement"
          >
            Join the Movement
          </Button>
        </div>
        
        <a
          href={GOFUNDME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg transition-colors shadow-lg"
          data-testid="link-donate-hero"
        >
          <Heart className="h-5 w-5 fill-current" />
          Donate
        </a>
        
        <button 
          onClick={() => document.querySelector("#crisis")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
          data-testid="button-scroll-down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}

function CrisisSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>);
  
  return (
    <section 
      id="crisis" 
      ref={ref}
      className="py-24 md:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">The Problem</Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            The System Is Broken
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Two interconnected crises are destroying veterinary care as we know it.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <Card 
            className={`relative overflow-visible transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <CardHeader className="pb-4">
              <Badge variant="destructive" className="w-fit mb-2">Crisis A</Badge>
              <CardTitle className="font-serif text-2xl">Workforce Burnout</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-8">
                Veterinary students face massive debt and disjointed training requirements, leading to mental health crises across the profession.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="font-serif text-5xl md:text-6xl font-bold text-destructive mb-2">
                    66%
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Burnout Rate
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    of vet professionals experience severe burnout
                  </p>
                </div>
                <div className="text-center">
                  <div className="font-serif text-5xl md:text-6xl font-bold text-destructive mb-2">
                    $180K+
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Student Debt
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    average debt for graduating vets
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`relative overflow-visible transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <CardHeader className="pb-4">
              <Badge variant="destructive" className="w-fit mb-2">Crisis B</Badge>
              <CardTitle className="font-serif text-2xl">Care Deserts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-8">
                Rural and low-income urban areas lack access to veterinary care, leaving millions of pets without basic medical attention.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="font-serif text-5xl md:text-6xl font-bold text-destructive mb-2">
                    90%
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Vet Decline
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    loss of large animal vets since WWII
                  </p>
                </div>
                <div className="text-center">
                  <div className="font-serif text-5xl md:text-6xl font-bold text-destructive mb-2">
                    Millions
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                    Access Gap
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    pets in underserved areas
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function StrategicPillarsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>);
  
  const pillars = [
    {
      icon: <Truck className="h-8 w-8" />,
      iconSecondary: <GraduationCap className="h-4 w-4" />,
      title: "Mobile Teaching Hospital",
      description: "Turning vans into mobile clinical rotation sites that solve the externship crisis.",
      details: "Universities pay the program to train students in required specialties—Small Animal, Rural/Farm, Shelter Medicine—in a single rotation. Students get centralized training, we get free skilled labor.",
      color: "text-primary",
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      iconSecondary: <Building2 className="h-4 w-4" />,
      title: "Corporate 'Triple Dip'",
      description: "Leveraging corporate hunger for marketing and tax benefits to fund operations.",
      details: "IRS Section 162 marketing write-offs, Section 170(e)(3) inventory donations, and customer acquisition through adoption kits. They get tax breaks and customers; we get free supplies.",
      color: "text-chart-1",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      iconSecondary: <Heart className="h-4 w-4" />,
      title: "Public Health Infrastructure",
      description: "Reclassifying veterinary care as essential community health services.",
      details: "Access FEMA disaster relief funds, USDA veterinary services grants, and local health department funding for zoonotic disease prevention in low-income zones.",
      color: "text-chart-2",
    },
    {
      icon: <Video className="h-8 w-8" />,
      iconSecondary: <Sparkles className="h-4 w-4" />,
      title: "Media Monetization",
      description: "Operating as a media company first to generate sustainable revenue.",
      details: "Livestreaming rescues on Amazon Live for affiliate revenue, viral TikTok content, and gamified 'FOMO' giving during live broadcasts. 94% of Gen Z believe companies must address social issues.",
      color: "text-chart-3",
    },
  ];
  
  return (
    <section 
      id="pillars" 
      ref={ref}
      className="py-24 md:py-32 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">The System Hack</Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Four Strategic Pillars
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not asking for donations. We're building a self-sustaining machine.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <Card 
              key={pillar.title}
              className={`group hover-elevate transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-muted ${pillar.color}`}>
                    {pillar.icon}
                  </div>
                  <div className={`p-2 rounded-md bg-muted/50 ${pillar.color} opacity-60`}>
                    {pillar.iconSecondary}
                  </div>
                </div>
                <CardTitle className="font-serif text-xl">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{pillar.description}</p>
                <p className="text-sm text-muted-foreground/80 border-l-2 border-primary/30 pl-4">
                  {pillar.details}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinancialSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>);
  
  const taxCredits = [
    {
      name: "Work Opportunity Tax Credit",
      code: "WOTC",
      benefit: "Up to $9,600",
      description: "Per hire of veterans, long-term unemployed, or SNAP recipients",
    },
    {
      name: "New Markets Tax Credit",
      code: "NMTC",
      benefit: "39%",
      description: "Tax credit attracting private investment in distressed areas",
    },
  ];
  
  const fundingVehicles = [
    {
      name: "Donor Advised Funds",
      amount: "$250B+",
      description: "In assets waiting to be deployed—we pitch specific, high-impact projects",
    },
    {
      name: "Fiscal Sponsorship",
      amount: "Instant",
      description: "Accept grants immediately while local chapters incorporate",
    },
  ];
  
  return (
    <section 
      id="financial" 
      ref={ref}
      className="py-24 md:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">The Money</Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Financial Architecture
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Following the money—and redirecting it to where it's needed.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div 
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h3 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-primary" />
              Tax Credits
            </h3>
            <div className="space-y-4">
              {taxCredits.map((credit) => (
                <Card key={credit.code} className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <Badge variant="outline" className="mb-2">{credit.code}</Badge>
                        <h4 className="font-semibold text-foreground">{credit.name}</h4>
                      </div>
                      <div className="font-serif text-2xl font-bold text-primary whitespace-nowrap">
                        {credit.benefit}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{credit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div 
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <h3 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3">
              <Building2 className="h-6 w-6 text-primary" />
              Funding Vehicles
            </h3>
            <div className="space-y-4">
              {fundingVehicles.map((vehicle) => (
                <Card key={vehicle.name} className="hover-elevate">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h4 className="font-semibold text-foreground">{vehicle.name}</h4>
                      <div className="font-serif text-2xl font-bold text-chart-1 whitespace-nowrap">
                        {vehicle.amount}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{vehicle.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>);
  
  const steps = [
    {
      step: 1,
      title: "Get the Spark Kit",
      description: "Open-source legal, branding, and operational templates to start your chapter",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      step: 2,
      title: "Secure Local Partners",
      description: "Connect with vet schools, corporate sponsors, and local health departments",
      icon: <Users className="h-6 w-6" />,
    },
    {
      step: 3,
      title: "Launch Your Van",
      description: "Deploy mobile units through Van Couchsurfing or acquire your own",
      icon: <Truck className="h-6 w-6" />,
    },
    {
      step: 4,
      title: "Amplify & Scale",
      description: "Run campaigns amplified by national media reach and grow your impact",
      icon: <Zap className="h-6 w-6" />,
    },
  ];
  
  return (
    <section 
      id="timeline" 
      ref={ref}
      className="py-24 md:py-32 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">The Path</Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A decentralized federation model anyone can join.
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div 
                key={item.step}
                className={`relative transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground mb-6 shadow-lg">
                    {item.icon}
                  </div>
                  <div className="font-serif font-bold text-lg mb-2">
                    Step {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TechToolsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>);
  
  const tools = [
    {
      name: "The Strategy Bot",
      description: "Uses LLMs to analyze potential corporate partners and generate custom tax-loophole pitches.",
      icon: <Bot className="h-8 w-8" />,
      accent: "border-chart-1",
    },
    {
      name: "The Bureaucracy Translator",
      description: "Translates simple needs ('gas money') into grant-eligible bureaucratic language ('fiscal allocation for logistical continuity').",
      icon: <FileText className="h-8 w-8" />,
      accent: "border-chart-2",
    },
    {
      name: "Viral Hook Generator",
      description: "Instantly generates clickbait headlines and scripts from field reports to maximize algorithmic reach.",
      icon: <Sparkles className="h-8 w-8" />,
      accent: "border-chart-3",
    },
  ];
  
  return (
    <section 
      id="tools" 
      ref={ref}
      className="py-24 md:py-32 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Tech Stack</Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for Scale
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered tools that automate the hard parts.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tools.map((tool, index) => (
            <Card 
              key={tool.name}
              className={`hover-elevate border-t-4 ${tool.accent} transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="p-3 rounded-lg bg-muted w-fit text-foreground mb-4">
                  {tool.icon}
                </div>
                <CardTitle className="font-mono text-lg">{tool.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const signupFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  location: z.string().optional(),
  interest: z.string().min(1, "Please select how you want to help"),
  message: z.string().optional(),
  wantsSparkKit: z.boolean().default(false),
  wantsNewsletter: z.boolean().default(true),
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

function JoinSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>);
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      interest: "",
      message: "",
      wantsSparkKit: false,
      wantsNewsletter: true,
    },
  });
  
  const signupMutation = useMutation({
    mutationFn: async (data: SignupFormValues) => {
      const response = await apiRequest("POST", "/api/signups", data);
      return response;
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "You're in!",
        description: "We'll be in touch soon. Welcome to the movement.",
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: SignupFormValues) => {
    signupMutation.mutate(data);
  };

  const interestOptions = [
    { value: "start-chapter", label: "Start a chapter in my area" },
    { value: "volunteer", label: "Volunteer with an existing van" },
    { value: "vet-student", label: "I'm a vet student seeking rotations" },
    { value: "corporate-partner", label: "Corporate partnership opportunity" },
    { value: "donate-van", label: "I have a van/vehicle to donate" },
    { value: "media", label: "Media/press inquiry" },
    { value: "other", label: "Other" },
  ];
  
  return (
    <section 
      id="join" 
      ref={ref}
      className="py-24 md:py-32 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Rocket className="h-3 w-3 mr-1" />
            We're Just Getting Started
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Join the Movement
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're building this from the ground up. No vans yet—just a vision, a plan, and people like you ready to make it happen.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div 
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h3 className="font-serif text-2xl font-bold mb-6">Why Join Now?</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Be a Founding Member</h4>
                  <p className="text-muted-foreground text-sm">
                    Shape the direction of Vet Van Fleet from day one. Early supporters get a seat at the table.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Launch in Your City</h4>
                  <p className="text-muted-foreground text-sm">
                    Want to bring a van to your area? Tell us where you are and we'll prioritize based on demand.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Get the Spark Kit</h4>
                  <p className="text-muted-foreground text-sm">
                    Free templates, legal docs, and operational playbooks to start your own chapter.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Stay in the Loop</h4>
                  <p className="text-muted-foreground text-sm">
                    Get updates on progress, launch announcements, and ways to help.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-background rounded-lg border border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Questions?</strong> Email us directly at{" "}
                <a 
                  href="mailto:founders@vetvanfleet.org" 
                  className="text-primary hover:underline"
                  data-testid="link-email-contact"
                >
                  founders@vetvanfleet.org
                </a>
              </p>
            </div>
          </div>
          
          <div 
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {submitted ? (
              <Card className="text-center py-12">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    Welcome to the Fleet!
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We've received your info and will be in touch soon. In the meantime, spread the word—the more people who join, the faster we can launch.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSubmitted(false)}
                    data-testid="button-submit-another"
                  >
                    Submit Another Response
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">Sign Up</CardTitle>
                  <CardDescription>
                    Tell us who you are and how you want to help.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your name" 
                                  {...field}
                                  data-testid="input-name" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="you@example.com" 
                                  {...field}
                                  data-testid="input-email" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="City, State or Country" 
                                {...field}
                                data-testid="input-location" 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="interest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>How do you want to help? *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-interest">
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {interestOptions.map((option) => (
                                  <SelectItem 
                                    key={option.value} 
                                    value={option.value}
                                    data-testid={`option-${option.value}`}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Anything else?</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us more about yourself, your skills, or your ideas..."
                                className="min-h-[100px]"
                                {...field}
                                data-testid="textarea-message"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="wantsSparkKit"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  data-testid="checkbox-spark-kit"
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Send me the Spark Kit when it's ready
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="wantsNewsletter"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  data-testid="checkbox-newsletter"
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Keep me updated on progress and launches
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={signupMutation.isPending}
                        data-testid="button-submit-signup"
                      >
                        {signupMutation.isPending ? (
                          "Submitting..."
                        ) : (
                          <>
                            Join the Movement
                            <Send className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Cat className="h-6 w-6 text-primary" />
              <span className="font-serif font-bold text-xl">Vet Van Fleet</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Free vet care for all cats. Everywhere. One van at a time. We're not a charity—we're a platform for change.
            </p>
            <Badge variant="outline" className="text-xs">
              501(c)(3) Pending
            </Badge>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#crisis" className="hover:text-foreground transition-colors">The Crisis</a></li>
              <li><a href="#pillars" className="hover:text-foreground transition-colors">How It Works</a></li>
              <li><a href="#financial" className="hover:text-foreground transition-colors">Financial Model</a></li>
              <li><a href="#tools" className="hover:text-foreground transition-colors">Tech Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#join" className="hover:text-foreground transition-colors">Join the Movement</a></li>
              <li><a href="mailto:founders@vetvanfleet.org" className="hover:text-foreground transition-colors">Contact Us</a></li>
              <li>
                <a 
                  href="https://vetvanfleet.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  VetVanFleet.com <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Vet Van Fleet. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive" /> for cats everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <CrisisSection />
        <StrategicPillarsSection />
        <FinancialSection />
        <TimelineSection />
        <TechToolsSection />
        <JoinSection />
      </main>
      <Footer />
    </div>
  );
}
