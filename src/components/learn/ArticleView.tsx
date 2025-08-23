import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, BookOpen, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useArticles } from '@/hooks/useArticles';

interface ArticleViewProps {
  articleId?: string;
  onBack: () => void;
}

export default function ArticleView({ articleId, onBack }: ArticleViewProps) {
  const { getArticleById, updateViewCount } = useArticles();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(!!articleId);

  useEffect(() => {
    if (articleId) {
      loadArticle();
    }
  }, [articleId]);

  const loadArticle = async () => {
    if (!articleId) return;
    
    try {
      setLoading(true);
      const articleData = await getArticleById(articleId);
      setArticle(articleData);
      // Update view count
      await updateViewCount(articleId);
    } catch (error) {
      console.error('Error loading article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>
        <div className="text-center py-8">Loading article...</div>
      </div>
    );
  }

  // If no articleId provided or article not found, show sample article
  if (!articleId || !article) {
    return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
              Sample Content
            </Badge>
            <Badge variant="secondary">Demo</Badge>
          </div>
          
          <h1 className="text-4xl font-bold">Sample Article: Getting Started</h1>
          
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Sample content</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>Demo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            What You'll Learn
          </h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Essential equipment for your first grow setup
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Understanding the cannabis growth cycle
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Basic environmental requirements
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Common beginner mistakes to avoid
            </li>
          </ul>
        </div>

        <Alert className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Legal Notice:</strong> Cannabis cultivation laws vary by location. Always check your local and federal laws before starting any grow operation.
          </AlertDescription>
        </Alert>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Introduction</h2>
          <p className="mb-4">
            Starting your first cannabis grow can feel overwhelming, but with the right knowledge and preparation, 
            you'll be well on your way to producing high-quality medicine. This comprehensive guide will walk you 
            through everything you need to know to get started successfully.
          </p>
          <p className="mb-4">
            Cannabis cultivation is both an art and a science. Understanding the plant's biological needs, 
            environmental requirements, and growth patterns is crucial for success. With over two decades of 
            horticultural experience, we'll share proven techniques that work for beginners and experts alike.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Essential Equipment Checklist</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lighting System</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>LED Grow Lights:</strong> 30-50W per square foot</li>
                  <li><strong>Full Spectrum:</strong> 3000K-6500K color temperature</li>
                  <li><strong>Timer:</strong> For automated light cycles</li>
                  <li><strong>Hanging Hardware:</strong> Adjustable rope ratchets</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Environmental Control</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>Ventilation Fan:</strong> 4-6" inline fan</li>
                  <li><strong>Carbon Filter:</strong> For odor control</li>
                  <li><strong>Circulation Fans:</strong> 2-3 small fans</li>
                  <li><strong>Thermometer/Hygrometer:</strong> Digital with min/max</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Alert className="mb-6">
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              <strong>Pro Tip:</strong> Invest in quality equipment from the start. Cheap lights and fans often fail 
              and can damage your plants. Quality gear pays for itself in better yields and reliability.
            </AlertDescription>
          </Alert>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Understanding the Growth Cycle</h2>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Seedling Stage (1-3 weeks)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  During the seedling stage, your plants are most vulnerable. They require:
                </p>
                <ul className="space-y-1 text-sm ml-4">
                  <li>• <strong>Temperature:</strong> 68-77°F (20-25°C)</li>
                  <li>• <strong>Humidity:</strong> 65-75% RH</li>
                  <li>• <strong>Light:</strong> 18-24 hours per day</li>
                  <li>• <strong>Watering:</strong> Light misting, keep soil barely moist</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-600">Vegetative Stage (3-16 weeks)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  The vegetative stage is when plants develop their structure and size:
                </p>
                <ul className="space-y-1 text-sm ml-4">
                  <li>• <strong>Temperature:</strong> 70-85°F (21-29°C)</li>
                  <li>• <strong>Humidity:</strong> 40-70% RH</li>
                  <li>• <strong>Light:</strong> 18 hours on, 6 hours off</li>
                  <li>• <strong>Nutrients:</strong> Higher nitrogen (N) ratios</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-600">Flowering Stage (7-11 weeks)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-3">
                  The flowering stage is when buds develop and mature:
                </p>
                <ul className="space-y-1 text-sm ml-4">
                  <li>• <strong>Temperature:</strong> 65-80°F (18-26°C)</li>
                  <li>• <strong>Humidity:</strong> 40-50% RH (lower toward harvest)</li>
                  <li>• <strong>Light:</strong> 12 hours on, 12 hours off</li>
                  <li>• <strong>Nutrients:</strong> Higher phosphorus (P) and potassium (K)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Environmental Requirements</h2>
          
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">VPD (Vapor Pressure Deficit) - Advanced Concept</h3>
            <p className="mb-3">
              VPD is the difference between the moisture in the air and how much moisture the air can hold 
              at a given temperature. It's the driving force behind plant transpiration and nutrient uptake.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Seedling:</strong> 0.4-0.8 kPa
              </div>
              <div>
                <strong>Vegetative:</strong> 0.8-1.2 kPa
              </div>
              <div>
                <strong>Flowering:</strong> 1.0-1.5 kPa
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Common Beginner Mistakes</h2>
          
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Overwatering:</strong> The #1 killer of cannabis plants. Water only when the top inch 
                of soil is dry. Cannabis roots need oxygen, and waterlogged soil prevents this.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Nutrient Burn:</strong> "Less is more" with nutrients, especially for beginners. 
                Start with 1/4 strength nutrients and gradually increase based on plant response.
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Light Burn:</strong> Powerful lights too close can bleach leaves. Maintain proper 
                distance: LED (12-24"), HPS (18-36") depending on wattage.
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Your First Grow Timeline</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold">Week 1-2: Germination & Seedling</h4>
                <p className="text-sm text-muted-foreground">Germinate seeds, transplant to starter pots, focus on humidity and gentle lighting</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold">Week 3-8: Vegetative Growth</h4>
                <p className="text-sm text-muted-foreground">18/6 light schedule, training techniques, regular feeding with grow nutrients</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold">Week 9-17: Flowering</h4>
                <p className="text-sm text-muted-foreground">Switch to 12/12, bloom nutrients, monitor trichomes, prepare for harvest</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold">Week 18+: Harvest & Cure</h4>
                <p className="text-sm text-muted-foreground">Harvest at proper trichome development, dry for 7-14 days, cure for 2-8 weeks</p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        <section>
          <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
          <p className="mb-4">
            Now that you understand the basics, continue your education with these advanced topics:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="cursor-pointer hover:shadow-elevated transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Understanding Cannabis Life Cycles</CardTitle>
                <p className="text-sm text-muted-foreground">Deep dive into plant biology and growth phases</p>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:shadow-elevated transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Choosing Your Growing Medium</CardTitle>
                <p className="text-sm text-muted-foreground">Soil, coco, hydroponic systems compared</p>
              </CardHeader>
            </Card>
          </div>
        </section>
      </div>
    </div>
    );
  }

  // Render real article from Supabase
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Articles
        </Button>
        
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
              Published
            </Badge>
            {(article.tags || []).slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="secondary">{tag}</Badge>
            ))}
          </div>
          
          <h1 className="text-4xl font-bold">{article.title}</h1>
          
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{article.reading_time || 5} min read</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{article.category}</span>
            </div>
          </div>
        </div>
      </div>

      {article.featured_image_url && (
        <div className="mb-8">
          <img 
            src={article.featured_image_url} 
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      {article.excerpt && (
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Article Summary
          </h2>
          <p className="text-sm">{article.excerpt}</p>
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
      </div>

      <Separator className="my-8" />

      <div className="text-center text-muted-foreground">
        <p>Published on {new Date(article.published_at || article.created_at).toLocaleDateString()}</p>
        <p>{article.view_count || 0} views</p>
      </div>
    </div>
  );
}