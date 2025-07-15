
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit2, Trash2, Eye, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentItem {
  id: number;
  title: string;
  slug: string;
  type: "Página" | "Notícia" | "Edital";
  content: string;
  excerpt: string;
  status: "Rascunho" | "Publicado";
  author: string;
  createdAt: string;
  updatedAt: string;
}

export const ContentManagementFull = () => {
  const { toast } = useToast();
  const [contents, setContents] = useState<ContentItem[]>([
    {
      id: 1,
      title: "Sobre a Leilão em Foco",
      slug: "quem-somos",
      type: "Página",
      content: "Conteúdo completo da página Quem Somos...",
      excerpt: "Conhece nossa empresa e nossa missão no mercado de leilões.",
      status: "Publicado",
      author: "Admin",
      createdAt: "2025-01-10",
      updatedAt: "2025-01-12"
    },
    {
      id: 2,
      title: "Nova Lei dos Leilões Aprovada",
      slug: "nova-lei-leiloes-2025",
      type: "Notícia",
      content: "O Congresso aprovou uma nova legislação...",
      excerpt: "Mudanças importantes na legislação de leilões para 2025.",
      status: "Publicado",
      author: "Editor",
      createdAt: "2025-01-08",
      updatedAt: "2025-01-08"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    type: "Página" as const,
    content: "",
    excerpt: "",
    status: "Rascunho" as const
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

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: editingContent ? prev.slug : generateSlug(title)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingContent) {
      setContents(prev => prev.map(content => 
        content.id === editingContent.id 
          ? { 
              ...content, 
              ...formData,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : content
      ));
      toast({ title: "Conteúdo atualizado com sucesso!" });
    } else {
      const newContent: ContentItem = {
        id: Date.now(),
        ...formData,
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
      type: "Página",
      content: "",
      excerpt: "",
      status: "Rascunho"
    });
  };

  const handleEdit = (content: ContentItem) => {
    setEditingContent(content);
    setFormData({
      title: content.title,
      slug: content.slug,
      type: content.type,
      content: content.content,
      excerpt: content.excerpt,
      status: content.status
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
    return status === "Publicado" ? "bg-green-500" : "bg-yellow-500";
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
                Preencha as informações do conteúdo abaixo.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Ex: Nova funcionalidade do sistema"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-amigavel"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={formData.type} onValueChange={(value: any) => setFormData(prev => ({ ...prev, type: value }))}>
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
                
                <div className="col-span-2">
                  <Label htmlFor="excerpt">Resumo</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Breve descrição do conteúdo..."
                    rows={3}
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Conteúdo completo..."
                    rows={10}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rascunho">Rascunho</SelectItem>
                      <SelectItem value="Publicado">Publicado</SelectItem>
                    </SelectContent>
                  </Select>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            <div className="text-2xl font-bold text-yellow-600">
              {contents.filter(c => c.status === "Rascunho").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conteúdos Cadastrados</CardTitle>
          <CardDescription>
            Gerencie todo o conteúdo do site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Atualizado</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{content.title}</div>
                      <div className="text-sm text-gray-500">/{content.slug}</div>
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
                  <TableCell>{content.author}</TableCell>
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
