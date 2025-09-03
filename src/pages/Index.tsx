import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowRight, 
  Zap, 
  Brain, 
  Shield, 
  Gauge, 
  Users, 
  BookOpen, 
  Bell, 
  Wrench, 
  Calculator,
  DollarSign,
  BarChart3,
  Leaf,
  CheckCircle,
  Star,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEmailSubscriptions } from '@/hooks/useEmailSubscriptions';

const Index = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { subscribe, loading } = useEmailSubscriptions();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !loading) {
      const success = await subscribe(email);
      if (success) {
        setIsSubscribed(true);
        setTimeout(() => setIsSubscribed(false), 3000);
        setEmail('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-background" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Optimal Grows
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-muted-foreground" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button variant="default" className="bg-gradient-primary hover:opacity-90" asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-radial"></div>
        <div className="absolute inset-0 bg-gradient-tech opacity-30"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Grow Smarter,{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Not Harder
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Stop micromanaging your grow. Our tool automates planning, tracking, and setup—so you can 
                <span className="text-foreground font-medium"> do less and grow more</span> (with fewer dead plants).
              </p>
            </div>
            
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email"
                placeholder="Enter your email for early access"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12 text-lg"
                required
              />
              <Button 
                type="submit" 
                size="lg" 
                className="h-12 px-8 bg-gradient-primary hover:opacity-90 text-lg font-semibold"
                disabled={isSubscribed || loading}
              >
                {isSubscribed ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Added!
                  </>
                ) : (
                  <>
                    👉 Join Early Access
                  </>
                )}
              </Button>
            </form>

            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border/40 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Free at Launch</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2.8k+</div>
                <div className="text-sm text-muted-foreground">On Waitlist</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Q1</div>
                <div className="text-sm text-muted-foreground">2025 Launch</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Growing indoors <span className="text-destructive">isn't easy</span>
            </h2>
            
            <div className="text-left max-w-2xl mx-auto space-y-6">
              <p className="text-xl text-muted-foreground">You're juggling:</p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span className="text-lg">Dozens of equipment choices</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span className="text-lg">Rising electricity costs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span className="text-lg">Endless notes and spreadsheets</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span className="text-lg">And the heartbreak of losing plants when something slips through the cracks</span>
                </div>
              </div>
              
              <p className="text-xl text-muted-foreground pt-6">
                Even with the best effort, most growers waste money, time, and too many plants 
                just trying to keep up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold">
              That's why we built{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Optimal Grows
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground">
              The first AI-powered grow planner and tracker designed to take the busywork off your hands.
            </p>

            <div className="text-left max-w-2xl mx-auto space-y-6 pt-8">
              <p className="text-xl font-medium">With our tool, you can:</p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                  <span className="text-lg">Plan your grow in minutes (no more gear guesswork)</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                  <span className="text-lg">See total costs and power use upfront</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                  <span className="text-lg">Get daily grow tracking automated—no more missed notes</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                  <span className="text-lg">Receive real-time recommendations to prevent problems before they kill your plants</span>
                </div>
              </div>
              
              <p className="text-2xl font-bold text-center pt-8 bg-gradient-primary bg-clip-text text-transparent">
                Less micromanaging. More harvesting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Why Choose{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Optimal Grows</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-3">💸 Save Money</h3>
              <p className="text-muted-foreground">
                Stop buying gear you don't need. Build your setup right the first time.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-3">⚡ Save Energy</h3>
              <p className="text-muted-foreground">
                Know exactly what your grow will cost to run—before you plug it in.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-3">📊 Stay Organized</h3>
              <p className="text-muted-foreground">
                Your grow log, reminders, and harvest notes—automatically tracked.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-3">🌱 Grow With Confidence</h3>
              <p className="text-muted-foreground">
                Get fewer surprises, healthier plants, and bigger yields.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Tested in{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Real Grows</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've tested Optimal Grows in real-world grows and partnered with trusted brands 
              to make sure it works in practice—not just on paper.
            </p>

            <div className="bg-card/50 border border-border/50 rounded-2xl p-8 mt-12">
              <div className="flex items-center justify-center space-x-4 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-lg italic text-muted-foreground mb-4">
                "Coming soon - testimonials and brand partnerships at launch"
              </p>
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                Beta Testing in Progress
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Offer */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Be one of the first to use{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Optimal Grows
              </span>
            </h2>

            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-success" />
                <span className="text-xl">100% free at launch</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-success" />
                <span className="text-xl">Exclusive early access perks</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-success" />
                <span className="text-xl">Direct input into shaping the future of the tool</span>
              </div>
            </div>

            <p className="text-xl text-muted-foreground">
              Join today—because every week you wait is another week of wasted time, money, and plants.
            </p>

            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input 
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 text-lg"
                required
              />
              <Button 
                type="submit" 
                size="lg" 
                className="h-14 px-8 bg-gradient-primary hover:opacity-90 text-lg font-semibold"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Added!
                  </>
                ) : (
                  <>
                    👉 Join Early Access
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-card/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-background" />
                </div>
                <span className="text-xl font-bold">Optimal Grows</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering growers with AI-powered automation and cutting-edge planning tools.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Build Planner</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Grow Tracker</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">AI Recommendations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Grow Guides</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Equipment Reviews</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Research</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/40 mt-12 pt-8 text-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Optimal Grows. Made with 🌱 for the growing community.
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border/40 p-4 z-40">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-semibold">"Do less. Grow more. Save plants."</p>
            <p className="text-sm text-muted-foreground">Early access spots are limited. Don't miss your chance.</p>
          </div>
          <form onSubmit={handleEmailSubmit} className="flex gap-2">
            <Input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-48"
              required
            />
            <Button 
              type="submit" 
              className="bg-gradient-primary hover:opacity-90 whitespace-nowrap"
              disabled={isSubscribed}
            >
              {isSubscribed ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Added!
                </>
              ) : (
                <>
                  👉 Join Early Access
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
