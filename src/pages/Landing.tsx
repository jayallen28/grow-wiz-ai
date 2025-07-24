import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowRight, Zap, Brain, Shield, Gauge, Users, BookOpen, Bell, Wrench, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/grow-hero.jpg';
import BuildPlannerPreview from '@/components/build-planner/BuildPlannerPreview';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-sm">GT</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                GrowTracker
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#products" className="text-muted-foreground hover:text-foreground transition-colors">Products</a>
              <a href="#education" className="text-muted-foreground hover:text-foreground transition-colors">Learn</a>
              <a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">Community</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-muted-foreground">Sign In</Button>
              <Button variant="glow">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Bell className="w-3 h-3 mr-1" />
                  Coming Soon
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  The Future of{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Smart Growing
                  </span>{' '}
                  is Almost Here
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  We're building the ultimate ecosystem for home growers - from planning your setup 
                  to harvesting your success. Be the first to know when we launch.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <Input 
                    placeholder="Enter your email for early access"
                    className="flex-1"
                  />
                  <Button variant="glow" className="group">
                    Get Notified
                    <Bell className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Join <span className="font-semibold text-cannabis-primary">2,847</span> growers already on the waitlist
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/40">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cannabis-primary">Q1 2025</div>
                  <div className="text-sm text-muted-foreground">Launch Date</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cannabis-primary">$199</div>
                  <div className="text-sm text-muted-foreground">Early Bird Price</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cannabis-primary">2.8k</div>
                  <div className="text-sm text-muted-foreground">Waitlist</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-primary rounded-2xl opacity-20 blur-xl"></div>
              <img 
                src={heroImage} 
                alt="Professional indoor cannabis growing setup" 
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-accent/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">
              What We're{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Building</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A complete ecosystem that takes you from planning your first grow to 
              mastering advanced techniques - all in one platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Build Planner</h3>
              <p className="text-muted-foreground">
                Plan your perfect grow setup with our PC Part Picker-style configurator. 
                Calculate costs, power usage, and compatibility - all in one place.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Educational Hub</h3>
              <p className="text-muted-foreground">
                Access cutting-edge grow guides, Arduino tutorials, and research data 
                that you won't find anywhere else.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Gauge className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Arduino Automation</h3>
              <p className="text-muted-foreground">
                Professional monitoring hardware with real-time sensors, automated responses, 
                and seamless dashboard integration.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Plan Your{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Perfect Setup</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start planning today with our build configurator. Design your grow room, 
              calculate costs, and get ready for launch day.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <BuildPlannerPreview />

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Why Start Planning Now?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calculator className="w-5 h-5 text-cannabis-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Smart Budget Planning</h4>
                    <p className="text-muted-foreground text-sm">
                      See real costs, power usage, and ROI calculations before you spend a dime.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-cannabis-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Community Recommendations</h4>
                    <p className="text-muted-foreground text-sm">
                      Get build suggestions from thousands of successful growers in our community.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-5 h-5 text-cannabis-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Educational Integration</h4>
                    <p className="text-muted-foreground text-sm">
                      Each component comes with tutorials, setup guides, and optimization tips.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Preview */}
      <section id="education" className="py-20 bg-accent/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Educational Content{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Coming Soon</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're creating the most comprehensive growing education platform. From beginner guides 
              to advanced Arduino customization - everything you need to succeed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
              <Badge variant="secondary" className="mb-3">Coming Q1 2025</Badge>
              <h3 className="text-lg font-semibold mb-3">Complete Grow Guides</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Step-by-step instructions for every growth stage, strain-specific guides, 
                and troubleshooting for common issues.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
              <Badge variant="secondary" className="mb-3">In Development</Badge>
              <h3 className="text-lg font-semibold mb-3">Arduino Tutorials</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Build and customize your own monitoring systems with detailed video 
                walkthroughs and open-source code.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
              <Badge variant="secondary" className="mb-3">Research Hub</Badge>
              <h3 className="text-lg font-semibold mb-3">Cutting-Edge Data</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Latest research findings, growing optimization techniques, and 
                community-contributed data insights.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Be Part of the{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Growing Revolution
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Join the waitlist and get exclusive early access, special pricing, and help shape 
              the future of smart growing technology.
            </p>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email address"
                  className="flex-1"
                />
                <Button size="lg" variant="glow" className="group">
                  Join Waitlist
                  <Bell className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Early bird pricing: Save 33% when we launch
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 bg-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-background font-bold text-sm">GT</span>
                </div>
                <span className="text-xl font-bold">GrowTracker</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering growers with intelligent automation and cutting-edge education.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Pro Kit</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Sensors</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Accessories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Grow Guides</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tutorials</a></li>
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
              © 2024 GrowTracker. Made with 🌱 for the growing community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;