
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit2, Trash2, Eye, FileText, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Content {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  type: "Página" | "Notícia" | "Edital";
  status: "Rascunho" | "Publicado";
  publishDate: string;
  author: string;
  seoTitle: string;
  seoDescription: string;
  featuredImage: string;
  createdAt: string;
  updatedAt: string;
}

export const ContentManagementFull = () => {
  const { toast } = useToast();
  const [contents, setContents] = useState<Content[]>([
    {
      id: 1,
      title: "Como Participar de Leilões Online",
      slug: "como-participar-leiloes-online",
      content: "Guia completo sobre como participar de leilões online...",
      excerpt: "Aprenda o passo a passo para participar de leilões online",
      type: "Página",
      status: "Publicado",
      publishDate: "2025-01-10",
      author: "Admin",
      seoTitle: "Como Participar de Leilões Online - Guia Completo",
      seoDescription: "Guia completo para participar de leilões online com segurança",
      featuredImage: "/placeholder.svg",
      createdAt: "2025-01-10",
      updatedAt: "2025-01-12"
    },
    {
      id: 2,
      title: "Edital - Leilão de Imóveis Janeiro 2025",
      slug: "edital-leilao-imoveis-janeiro-2025",
      content: "Edital oficial do leilão de imóveis...",
      excerpt: "Confira o edital completo do leilão de imóveis",
      type: "Edital",
      status: "Publicado",
      publishDate: "2025-01-15",
      author: "Admin",
      seoTitle: "Edital Leilão de Imóveis Janeiro 2025",
      seoDescription: "Edital oficial do leilão de imóveis de janeiro 2025",
      featuredImage: "/placeholder.svg",
      createdAt: "2025-01-08",
      updatedAt: "2025-01-08"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    type: "Página" as const,
    status: "Rascunho" as const,
    publishDate: "",
    seoTitle: "",
    seoDescription: "",
    featuredImage: ""
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const slug = formData.slug || generateSlug(formData.title);
    
    if (editingContent) {
      setContents(prev => prev.map(content => 
        content.id === editingContent.id 
          ? { 
              ...content, 
              ...formData,
              slug,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : content
      ));
      toast({ title: "Conteúdo atualizado com sucesso!" });
    } else {
      const newContent: Content = {
        id: Date.now(),
        ...formData,
        slug,
        author: "Admin",
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setContents(prev => [...prev, newContent]);
      toast({ title: "Conteúdo criado com sucesso!" });
    }

    setIsDialogOpen(false);
    setEditingContent(null);
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      type: "Página",
      status: "Rascunho",
      publishDate: "",
      seoTitle: "",
      seoDescription: "",
      featuredImage: ""
    });
  };

  const handleEdit = (content: Content) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      slug: content.slug,
      content: content.content,
      excerpt: content.excerpt,
      type: content.type,
      status: content.status,
      publishDate: content.publishDate,
      seoTitle: content.seoTitle,
      seoDescription: content.seoDescription,
      featuredImage: content.featuredImage
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setContents(prev => prev.filter(content => content.id !== id));
    toast({ title: "Conteúdo removido com sucesso!" });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Página": return "bg-blue-500";
      case "Notícia": return "bg-green-500";
      case "Edital": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Publicado": return "bg-green-500";
      case "Rascunho": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Conteúdo</h2>
          <p className="text-gray-600">Gerencie páginas, notícias e editais do site</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Conteúdo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingContent ? "Editar Conteúdo" : "Criar Novo Conteúdo"}
              </DialogTitle>
              <DialogDescription>
                Configure as informações do conteúdo abaixo.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setFormData(prev => ({ 
                        ...prev, 
                        title,
                        slug: generateSlug(title),
                        seoTitle: title
                      }));
                    }}
                    placeholder="Digite o título do conteúdo"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-do-conteudo"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Tipo de Conteúdo</Label>
                  <Select value={formData.type} onValueChange={(value: "Página" | "Notícia" | "Edital") => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Página">Página</SelectItem>
                      <SelectItem value="Notícia">Notícia</SelectItem>
                      <SelectItem value="Edital">Edital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: "Rascunho" | "Publicado") => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rascunho">Rascunho</SelectItem>
                      <SelectItem value="Publicado">Publicado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="publishDate">Data de Publicação</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="excerpt">Resumo</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Breve descrição do conteúdo..."
                    rows={2}
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Digite o conteúdo completo..."
                    rows={8}
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="featuredImage">Imagem Destacada (URL)</Label>
                  <Input
                    id="featuredImage"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="URL da imagem destacada"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="seoTitle">Título SEO</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder="Título otimizado para SEO"
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="seoDescription">Descrição SEO</Label>
                  <Textarea
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                    placeholder="Descrição otimizada para SEO (máx. 160 caracteres)"
                    rows={2}
                    maxLength={160}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingContent ? "Atualizar" : "Criar"} Conteúdo
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total de Conteúdos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Publicados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {contents.filter(c => c.status === "Publicado").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Rascunhos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {contents.filter(c => c.status === "Rascunho").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Páginas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {contents.filter(c => c.type === "Página").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Table */}
      <Card>
        <CardHeader>
          <CardTitle>Conteúdos Cadastrados</CardTitle>
          <CardDescription>
            Gerencie todos os conteúdos do site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Conteúdo</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Publicação</TableHead>
                <TableHead>Atualizado</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{content.title}</div>
                      <div className="text-sm text-gray-500">/{content.slug}</div>
                      <div className="text-sm text-gray-400">{content.excerpt}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(content.type)}>
                      {content.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(content.status)}>
                      {content.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {content.publishDate ? new Date(content.publishDate).toLocaleDateString('pt-BR') : '-'}
                  </TableCell>
                  <TableCell>
                    {new Date(content.updatedAt).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(content)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(content.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
