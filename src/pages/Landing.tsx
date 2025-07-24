import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Brain, Shield, Gauge, Users, BookOpen } from 'lucide-react';
import heroImage from '@/assets/grow-hero.jpg';

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
                  <Zap className="w-3 h-3 mr-1" />
                  Smart Automation
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Grow Better Plants with{' '}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Smart Technology
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Transform your indoor growing with our Arduino-powered monitoring system and intelligent dashboard. 
                  No more guesswork, no more failed grows.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="glow" className="group">
                  Start Growing Smarter
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline">
                  View Products
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/40">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cannabis-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cannabis-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cannabis-primary">5k+</div>
                  <div className="text-sm text-muted-foreground">Growers</div>
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
              Everything You Need to{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Succeed</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our complete ecosystem combines cutting-edge hardware with intelligent software 
              to make growing as simple as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Gauge className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-muted-foreground">
                Track pH, TDS, temperature, humidity, CO₂, and light levels with precision sensors 
                that never sleep.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                Get intelligent recommendations based on your data patterns and growing history 
                for optimal results.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:shadow-glow transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Protection</h3>
              <p className="text-muted-foreground">
                Instant alerts and automated responses protect your plants from environmental 
                threats before damage occurs.
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
              Hardware That{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Just Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional-grade monitoring and control systems in a plug-and-play package.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card className="p-6 border-border/50">
                <h3 className="text-xl font-semibold mb-4">GrowTracker Pro Kit</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cannabis-primary rounded-full mr-3"></div>
                    Arduino-based controller with WiFi connectivity
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cannabis-primary rounded-full mr-3"></div>
                    pH, TDS, temperature, humidity, and CO₂ sensors
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cannabis-primary rounded-full mr-3"></div>
                    3D-printed weatherproof enclosure
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-cannabis-primary rounded-full mr-3"></div>
                    Complete setup guide and community support
                  </li>
                </ul>
                <div className="flex items-center justify-between pt-6 border-t border-border/40 mt-6">
                  <div>
                    <span className="text-2xl font-bold">$299</span>
                    <span className="text-muted-foreground ml-1">USD</span>
                  </div>
                  <Button variant="cannabis">Pre-order Now</Button>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Why Choose Our Hardware?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-cannabis-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Community-Driven Design</h4>
                    <p className="text-muted-foreground text-sm">
                      Built by growers, for growers. Every feature comes from real-world experience.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <BookOpen className="w-5 h-5 text-cannabis-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Open Source & Customizable</h4>
                    <p className="text-muted-foreground text-sm">
                      All code and designs are open source. Modify and expand as much as you want.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-cannabis-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Plug & Play Setup</h4>
                    <p className="text-muted-foreground text-sm">
                      No soldering required. Connect sensors, power on, and start growing in minutes.
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
              Learn from the{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Best</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access cutting-edge growing knowledge, tutorials, and research that you won't find anywhere else.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
              <h3 className="text-lg font-semibold mb-3">Complete Grow Guides</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Step-by-step instructions for every growth stage, from seed to harvest.
              </p>
              <Button variant="outline" size="sm">Explore Guides</Button>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
              <h3 className="text-lg font-semibold mb-3">DIY Tutorials</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Build your own monitoring systems with detailed video walkthroughs.
              </p>
              <Button variant="outline" size="sm">Watch Videos</Button>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
              <h3 className="text-lg font-semibold mb-3">Research & Data</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Latest research findings and data-driven growing optimization techniques.
              </p>
              <Button variant="outline" size="sm">Read Research</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Ready to{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Transform
              </span>{' '}
              Your Growing?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of growers who've discovered the power of data-driven cultivation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="glow" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                View Demo
              </Button>
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