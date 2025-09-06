import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Book, BookOpen, Lightbulb, Shield, Droplets, Thermometer, Bug, Calendar, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Navigation } from '@/components/layout/Navigation';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ArticleView from '@/components/learn/ArticleView';
import { useArticles } from '@/hooks/useArticles';

const categories = [
  {
    id: 'basics',
    name: 'Growing Basics',
    icon: Book,
    color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    articles: [
      { title: 'Getting Started: Your First Grow', difficulty: 'Beginner', readTime: '8 min', tags: ['Setup', 'Basics'] },
      { title: 'Understanding Cannabis Life Cycles', difficulty: 'Beginner', readTime: '6 min', tags: ['Biology', 'Timeline'] },
      { title: 'Choosing Your Growing Medium', difficulty: 'Intermediate', readTime: '12 min', tags: ['Soil', 'Hydro'] },
      { title: 'Indoor vs Outdoor Growing', difficulty: 'Beginner', readTime: '10 min', tags: ['Setup', 'Environment'] },
    ]
  },
  {
    id: 'environment',
    name: 'Environment & Climate',
    icon: Thermometer,
    color: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    articles: [
      { title: 'Temperature and Humidity Control', difficulty: 'Intermediate', readTime: '15 min', tags: ['Climate', 'Control'] },
      { title: 'Lighting: LED vs HPS vs CMH', difficulty: 'Advanced', readTime: '20 min', tags: ['Lighting', 'Equipment'] },
      { title: 'Ventilation and Air Circulation', difficulty: 'Intermediate', readTime: '12 min', tags: ['Ventilation', 'Airflow'] },
      { title: 'Managing VPD (Vapor Pressure Deficit)', difficulty: 'Advanced', readTime: '18 min', tags: ['VPD', 'Advanced'] },
    ]
  },
  {
    id: 'nutrients',
    name: 'Nutrients & Feeding',
    icon: Droplets,
    color: 'bg-green-500/10 text-green-500 border-green-500/20',
    articles: [
      { title: 'NPK Ratios: What Plants Need When', difficulty: 'Intermediate', readTime: '14 min', tags: ['NPK', 'Feeding'] },
      { title: 'pH and EC/PPM Management', difficulty: 'Intermediate', readTime: '16 min', tags: ['pH', 'Water'] },
      { title: 'Organic vs Synthetic Nutrients', difficulty: 'Beginner', readTime: '10 min', tags: ['Organic', 'Synthetic'] },
      { title: 'Reading Nutrient Deficiencies', difficulty: 'Advanced', readTime: '22 min', tags: ['Deficiency', 'Diagnosis'] },
    ]
  },
  {
    id: 'problems',
    name: 'Common Problems',
    icon: AlertTriangle,
    color: 'bg-red-500/10 text-red-500 border-red-500/20',
    articles: [
      { title: 'Identifying and Treating Nutrient Burn', difficulty: 'Intermediate', readTime: '12 min', tags: ['Problems', 'Nutrients'] },
      { title: 'Common Pests and How to Deal With Them', difficulty: 'Intermediate', readTime: '18 min', tags: ['Pests', 'Treatment'] },
      { title: 'Light Burn vs Heat Stress', difficulty: 'Intermediate', readTime: '10 min', tags: ['Lighting', 'Stress'] },
      { title: 'Overwatering vs Underwatering', difficulty: 'Beginner', readTime: '8 min', tags: ['Watering', 'Problems'] },
    ]
  },
  {
    id: 'techniques',
    name: 'Advanced Techniques',
    icon: Lightbulb,
    color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    articles: [
      { title: 'LST, HST, and Training Methods', difficulty: 'Advanced', readTime: '25 min', tags: ['Training', 'Yield'] },
      { title: 'SCROG (Screen of Green) Setup', difficulty: 'Advanced', readTime: '20 min', tags: ['SCROG', 'Training'] },
      { title: 'Mainlining and Manifolding', difficulty: 'Advanced', readTime: '22 min', tags: ['Training', 'Structure'] },
      { title: 'When and How to Defoliate', difficulty: 'Advanced', readTime: '15 min', tags: ['Defoliation', 'Maintenance'] },
    ]
  },
  {
    id: 'harvest',
    name: 'Harvest & Curing',
    icon: Calendar,
    color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    articles: [
      { title: 'When to Harvest: Trichome Inspection', difficulty: 'Intermediate', readTime: '12 min', tags: ['Harvest', 'Timing'] },
      { title: 'Proper Drying Techniques', difficulty: 'Intermediate', readTime: '14 min', tags: ['Drying', 'Process'] },
      { title: 'Curing for Maximum Potency and Flavor', difficulty: 'Intermediate', readTime: '16 min', tags: ['Curing', 'Quality'] },
      { title: 'Storage: Keeping Your Harvest Fresh', difficulty: 'Beginner', readTime: '8 min', tags: ['Storage', 'Preservation'] },
    ]
  }
];

const allArticles = categories.flatMap(cat => 
  cat.articles.map(article => ({ ...article, category: cat.name, categoryId: cat.id }))
);

export default function Learn() {
  const navigate = useNavigate();
  const { id: articleId } = useParams();
  const { articles, loading, fetchPublishedArticles } = useArticles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [publishedArticles, setPublishedArticles] = useState<any[]>([]);

  useEffect(() => {
    const loadPublishedArticles = async () => {
      try {
        const published = await fetchPublishedArticles();
        setPublishedArticles(published);
      } catch (error) {
        console.error('Failed to load published articles:', error);
      }
    };
    loadPublishedArticles();
  }, [fetchPublishedArticles]);

  // Get unique categories from published articles
  const getAvailableCategories = () => {
    const publishedCategories = new Set(publishedArticles.map(article => article.category));
    return categories.filter(category => publishedCategories.has(category.name));
  };

  const availableCategories = getAvailableCategories();

  // Filter real articles from Supabase
  const filteredRealArticles = publishedArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (article.tags || []).some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    // Fix category matching - compare article.category directly with category names
    const matchesCategory = selectedCategory === 'all' || 
                           article.category === getCategoryNameById(selectedCategory) ||
                           categories.some(cat => cat.id === selectedCategory && cat.name === article.category);
    return matchesSearch && matchesCategory;
  });

  // Filter mock articles for categories
  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryNameById = (id: string) => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : '';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-muted';
    }
  };

  if (articleId) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ArticleView articleId={articleId} onBack={() => navigate('/learn')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Growing Knowledge Base
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Learn everything you need to know about growing cannabis, from basic setup to advanced techniques.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search articles, topics, or techniques..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className={`grid w-full mb-8 ${availableCategories.length > 0 ? `grid-cols-${Math.min(availableCategories.length + 1, 7)}` : 'grid-cols-1'}`}>
            <TabsTrigger value="all">All Topics</TabsTrigger>
            {availableCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            {availableCategories.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                {availableCategories.map((category) => {
                  const Icon = category.icon;
                  const categoryArticles = publishedArticles.filter(article => article.category === category.name);
                  return (
                    <Card 
                      key={category.id} 
                      className="cursor-pointer hover:shadow-elevated transition-shadow"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${category.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          {category.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">
                          {categoryArticles.length} article{categoryArticles.length !== 1 ? 's' : ''} available
                        </p>
                        <div className="space-y-2">
                          {categoryArticles.slice(0, 2).map((article, idx) => (
                            <div key={idx} className="text-sm">
                              <div className="font-medium truncate">{article.title}</div>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                                  Published
                                </Badge>
                                <span className="text-xs text-muted-foreground self-center">{article.reading_time || 5} min</span>
                              </div>
                            </div>
                          ))}
                          {categoryArticles.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{categoryArticles.length - 2} more article{categoryArticles.length - 2 !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Articles Available Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Articles are being prepared and will be published soon. Check back later for growing guides, tips, and tutorials.
                </p>
              </div>
            )}
          </TabsContent>

          {availableCategories.map((category) => {
            const categoryArticles = publishedArticles.filter(article => article.category === category.name);
            return (
              <TabsContent key={category.id} value={category.id}>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 rounded-lg ${category.color}`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{category.name}</h2>
                      <p className="text-muted-foreground">{categoryArticles.length} article{categoryArticles.length !== 1 ? 's' : ''} in this category</p>
                    </div>
                  </div>
                </div>
                
                {categoryArticles.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {categoryArticles.map((article) => (
                      <Card 
                        key={article.id} 
                        className="cursor-pointer hover:shadow-elevated transition-shadow"
                        onClick={() => navigate(`/learn/article/${article.id}`)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-base leading-snug">{article.title}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{article.reading_time || 5} min</span>
                            <span>•</span>
                            <span>{article.category}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                              Published
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {(article.tags || []).slice(0, 3).map((tag: string, tagIdx: number) => (
                              <Badge key={tagIdx} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          {article.excerpt && (
                            <div className="text-sm text-muted-foreground line-clamp-2 prose prose-sm dark:prose-invert max-w-none">
                              <ReactMarkdown>{article.excerpt}</ReactMarkdown>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Articles in {category.name} Yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Articles for this category are being prepared and will be published soon.
                    </p>
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Real Articles from Supabase */}
        {(selectedCategory === 'all' || searchQuery) && filteredRealArticles.length > 0 && (
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {searchQuery ? `Articles (${filteredRealArticles.length})` : 'Published Articles'}
              </h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRealArticles.map((article) => (
                <Card 
                  key={article.id} 
                  className="cursor-pointer hover:shadow-elevated transition-shadow"
                  onClick={() => navigate(`/learn/article/${article.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-snug">{article.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{article.reading_time || 5} min</span>
                      <span>•</span>
                      <span>{article.category}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                        Published
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(article.tags || []).slice(0, 3).map((tag: string, tagIdx: number) => (
                        <Badge key={tagIdx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {article.excerpt && (
                      <div className="text-sm text-muted-foreground mt-2 line-clamp-2 prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>{article.excerpt}</ReactMarkdown>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Show sample content only if no real articles exist and we're searching */}
        {searchQuery && filteredRealArticles.length === 0 && filteredArticles.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Sample Content ({filteredArticles.length})
              </h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article, idx) => (
                <Card 
                  key={idx} 
                  className="cursor-pointer hover:shadow-elevated transition-shadow opacity-75"
                  onClick={() => navigate('/learn/sample')}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base leading-snug">{article.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{article.readTime}</span>
                      <span>•</span>
                      <span>{article.category}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className={getDifficultyColor(article.difficulty)}>
                        {article.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Sample
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag, tagIdx) => (
                        <Badge key={tagIdx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty state when no real articles match search */}
        {searchQuery && filteredRealArticles.length === 0 && filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Articles Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              No articles match your search query "{searchQuery}". Try different keywords or browse our categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}