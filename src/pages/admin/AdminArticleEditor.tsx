import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Plus, 
  X, 
  Image, 
  Link,
  FileText,
  Calendar,
  Tag,
  User
} from "lucide-react";
import { useArticles } from "@/hooks/useArticles";
import { useToast } from "@/hooks/use-toast";
import { ImageUploadWithCompression } from "@/components/admin/ImageUploadWithCompression";
import MDEditor from '@uiw/react-md-editor';

const articleCategories = [
  "Growing Basics",
  "Environment & Climate", 
  "Nutrients & Feeding",
  "Common Problems",
  "Advanced Techniques",
  "Harvest & Curing",
  "Equipment Reviews",
  "Strain Guides"
];

const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  featured_image_url: z.string().url().optional().or(z.literal("")),
  is_published: z.boolean().default(false),
  reading_time: z.number().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  focus_keywords: z.string().optional(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

export default function AdminArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createArticle, updateArticle, getArticleById } = useArticles();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [newTag, setNewTag] = useState("");

  const isEditing = !!id;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
    reset
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      category: "",
      tags: [],
      featured_image_url: "",
      is_published: false,
      reading_time: undefined,
      meta_title: "",
      meta_description: "",
      focus_keywords: "",
    },
  });

  const watchedContent = watch("content");
  const watchedTags = watch("tags") || [];
  const watchedTitle = watch("title");

  // Auto-calculate reading time based on content
  useEffect(() => {
    if (watchedContent) {
      const wordsPerMinute = 200;
      const wordCount = watchedContent.trim().split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);
      setValue("reading_time", readingTime);
    }
  }, [watchedContent, setValue]);

  // Auto-generate meta title from title
  useEffect(() => {
    if (watchedTitle && !watch("meta_title")) {
      setValue("meta_title", watchedTitle);
    }
  }, [watchedTitle, setValue, watch]);

  useEffect(() => {
    if (isEditing && id) {
      loadArticle();
    }
  }, [id, isEditing]);

  const loadArticle = async () => {
    try {
      setIsLoading(true);
      const article = await getArticleById(id!);
      reset({
        title: article.title,
        content: article.content,
        excerpt: article.excerpt || "",
        category: article.category,
        tags: article.tags || [],
        featured_image_url: article.featured_image_url || "",
        is_published: article.is_published,
        reading_time: article.reading_time || undefined,
        meta_title: article.title, // Default to title if no meta_title
        meta_description: article.excerpt || "",
        focus_keywords: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load article",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ArticleFormData) => {
    try {
      setIsLoading(true);
      
      const articleData = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        category: data.category,
        tags: data.tags?.filter(tag => tag.trim() !== "") || [],
        featured_image_url: data.featured_image_url,
        is_published: data.is_published,
        reading_time: data.reading_time,
      };

      if (isEditing && id) {
        await updateArticle(id, articleData);
        toast({
          title: "Success",
          description: "Article updated successfully",
        });
      } else {
        await createArticle(articleData);
        toast({
          title: "Success",
          description: "Article created successfully",
        });
      }
      
      navigate("/admin/articles");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save article",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !watchedTags.includes(newTag.trim())) {
      const updatedTags = [...watchedTags, newTag.trim()];
      setValue("tags", updatedTags, { shouldDirty: true });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = watchedTags.filter(tag => tag !== tagToRemove);
    setValue("tags", updatedTags, { shouldDirty: true });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/articles")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {isEditing ? "Edit Article" : "Create New Article"}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? "Update article content and metadata" : "Create engaging content for your audience"}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button 
            onClick={handleSubmit(onSubmit)} 
            disabled={isLoading || !isDirty}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : "Save Article"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content" className="gap-2">
            <FileText className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="metadata" className="gap-2">
            <Tag className="h-4 w-4" />
            Metadata
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Link className="h-4 w-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="publishing" className="gap-2">
            <Calendar className="h-4 w-4" />
            Publishing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter article title..."
                      className="mt-2"
                    />
                  )}
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Controller
                  name="excerpt"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Brief description of the article..."
                      className="mt-2"
                      rows={3}
                    />
                  )}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <div className="mt-2">
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <MDEditor
                        value={field.value}
                        onChange={(value) => field.onChange(value || "")}
                        data-color-mode="light"
                        height={500}
                        preview="edit"
                        visibleDragbar={false}
                        textareaProps={{
                          placeholder: "Write your article content here using Markdown...",
                          style: { fontSize: 14, lineHeight: 1.5 }
                        }}
                      />
                    )}
                  />
                </div>
                {errors.content && (
                  <p className="text-sm text-destructive mt-1">{errors.content.message}</p>
                )}
              </div>

              <div>
                <Label>Featured Image</Label>
                <div className="mt-2">
                  <ImageUploadWithCompression
                    currentImageUrl={watch("featured_image_url")}
                    onImageUploaded={(url) => setValue("featured_image_url", url, { shouldDirty: true })}
                    disabled={isLoading}
                  />
                </div>
                {watch("featured_image_url") && (
                  <div className="mt-2">
                    <Label className="text-xs text-muted-foreground">Image URL</Label>
                    <Controller
                      name="featured_image_url"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="https://example.com/image.jpg"
                          className="mt-1 text-xs"
                          readOnly
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {articleCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-sm text-destructive mt-1">{errors.category.message}</p>
                )}
              </div>

              <div>
                <Label>Tags</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <Button type="button" onClick={addTag} variant="outline" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {watchedTags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTag(tag)}
                          className="h-auto p-0 hover:bg-transparent"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="reading_time">Reading Time (minutes)</Label>
                <Controller
                  name="reading_time"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Auto-calculated"
                      className="mt-2"
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta_title">Meta Title</Label>
                <Controller
                  name="meta_title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="SEO-optimized title (60 chars max)"
                      className="mt-2"
                      maxLength={60}
                    />
                  )}
                />
              </div>

              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Controller
                  name="meta_description"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="SEO description (160 chars max)"
                      className="mt-2"
                      rows={3}
                      maxLength={160}
                    />
                  )}
                />
              </div>

              <div>
                <Label htmlFor="focus_keywords">Focus Keywords</Label>
                <Controller
                  name="focus_keywords"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="main keyword, secondary keyword"
                      className="mt-2"
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publishing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="is_published">Publish Article</Label>
                  <p className="text-sm text-muted-foreground">
                    Make this article visible to the public
                  </p>
                </div>
                <Controller
                  name="is_published"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}