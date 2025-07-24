import { useState } from 'react';
import { Search, Book, Lightbulb, Shield, Droplets, Thermometer, Bug, Calendar, AlertTriangle } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-muted';
    }
  };

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
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="all">All Topics</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.name.split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {categories.map((category) => {
                const Icon = category.icon;
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
                        {category.articles.length} articles available
                      </p>
                      <div className="space-y-2">
                        {category.articles.slice(0, 2).map((article, idx) => (
                          <div key={idx} className="text-sm">
                            <div className="font-medium truncate">{article.title}</div>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className={getDifficultyColor(article.difficulty)}>
                                {article.difficulty}
                              </Badge>
                              <span className="text-xs text-muted-foreground self-center">{article.readTime}</span>
                            </div>
                          </div>
                        ))}
                        {category.articles.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{category.articles.length - 2} more articles
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-3 rounded-lg ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                    <p className="text-muted-foreground">{category.articles.length} articles in this category</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Articles Grid */}
        {(selectedCategory === 'all' || searchQuery) && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {searchQuery ? `Search Results (${filteredArticles.length})` : 'All Articles'}
              </h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article, idx) => (
                <Card key={idx} className="cursor-pointer hover:shadow-elevated transition-shadow">
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

        {/* Category-specific articles */}
        {selectedCategory !== 'all' && !searchQuery && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.find(cat => cat.id === selectedCategory)?.articles.map((article, idx) => (
              <Card key={idx} className="cursor-pointer hover:shadow-elevated transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base leading-snug">{article.title}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{article.readTime}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className={getDifficultyColor(article.difficulty)}>
                      {article.difficulty}
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
        )}
      </div>
    </div>
  );
}