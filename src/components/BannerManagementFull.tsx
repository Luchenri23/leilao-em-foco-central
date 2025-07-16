
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
import { Plus, Edit2, Trash2, Eye, Upload, Image, AlertCircle, FileImage } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Banner {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  position: "Hero" | "Sidebar" | "Rodapé" | "Popup";
  isActive: boolean;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

interface BannerSpecs {
  position: string;
  dimensions: string;
  maxSize: string;
  formats: string[];
  notes: string;
}

const bannerSpecifications: BannerSpecs[] = [
  {
    position: "Hero (Principal da Home)",
    dimensions: "1920x600px",
    maxSize: "500KB",
    formats: ["JPG", "PNG", "WebP"],
    notes: "Imagem principal da página inicial. Resolução mínima 1200x400px para dispositivos móveis."
  },
  {
    position: "Sidebar (Lateral)",
    dimensions: "300x250px",
    maxSize: "200KB",
    formats: ["JPG", "PNG"],
    notes: "Banner lateral que aparece na barra lateral do site."
  },
  {
    position: "Rodapé",
    dimensions: "728x90px",
    maxSize: "150KB",
    formats: ["JPG", "PNG"],
    notes: "Banner horizontal no rodapé do site."
  },
  {
    position: "Popup",
    dimensions: "600x400px",
    maxSize: "300KB",
    formats: ["JPG", "PNG"],
    notes: "Banner para popup promocional. Deve ter boa legibilidade."
  }
];

export const BannerManagementFull = () => {
  const { toast } = useToast();
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 1,
      title: "Banner Principal - Leilões",
      description: "Banner principal da página inicial destacando os leilões em destaque",
      imageUrl: "/lovable-uploads/81ec2dab-229f-4839-9c22-6c43aeec72a6.png",
      linkUrl: "/leiloes",
      position: "Hero",
      isActive: true,
      priority: 1,
      createdAt: "2025-01-10",
      updatedAt: "2025-01-12"
    },
    {
      id: 2,
      title: "Promoção Cadastro",
      description: "Banner lateral incentivando novos cadastros",
      imageUrl: "/lovable-uploads/92d203d9-9d17-42d8-bb69-871f1b189ba2.png",
      linkUrl: "/cadastro",
      position: "Sidebar",
      isActive: false,
      priority: 2,
      createdAt: "2025-01-08",
      updatedAt: "2025-01-08"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    position: "Hero" as const,
    isActive: true,
    priority: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBanner) {
      setBanners(prev => prev.map(banner => 
        banner.id === editingBanner.id 
          ? { 
              ...banner, 
              ...formData,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : banner
      ));
      toast({ title: "Banner atualizado com sucesso!" });
    } else {
      const newBanner: Banner = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setBanners(prev => [...prev, newBanner]);
      toast({ title: "Banner criado com sucesso!" });
    }

    setIsDialogOpen(false);
    setEditingBanner(null);
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      linkUrl: "",
      position: "Hero",
      isActive: true,
      priority: 1
    });
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      description: banner.description,
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl,
      position: banner.position,
      isActive: banner.isActive,
      priority: banner.priority
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setBanners(prev => prev.filter(banner => banner.id !== id));
    toast({ title: "Banner removido com sucesso!" });
  };

  const toggleBannerStatus = (id: number) => {
    setBanners(prev => prev.map(banner => 
      banner.id === id 
        ? { 
            ...banner, 
            isActive: !banner.isActive,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : banner
    ));
    toast({ title: "Status do banner atualizado!" });
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case "Hero": return "bg-blue-500";
      case "Sidebar": return "bg-green-500";
      case "Rodapé": return "bg-orange-500";
      case "Popup": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simular upload - em produção, seria feito upload real
      const mockUrl = `/uploads/${file.name}`;
      setFormData(prev => ({ ...prev, imageUrl: mockUrl }));
      toast({ title: "Imagem carregada com sucesso!" });
    }
  };

  const getSelectedSpec = () => {
    return bannerSpecifications.find(spec => 
      spec.position.includes(formData.position) || 
      spec.position.toLowerCase().includes(formData.position.toLowerCase())
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Banners</h2>
          <p className="text-gray-600">Gerencie todos os banners e imagens promocionais do site</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowSpecs(true)}>
            <FileImage className="h-4 w-4 mr-2" />
            Especificações
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Banner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingBanner ? "Editar Banner" : "Criar Novo Banner"}
                </DialogTitle>
                <DialogDescription>
                  Configure as informações do banner abaixo.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="title">Título do Banner</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ex: Banner Principal - Leilões"
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Descreva o banner..."
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="position">Posição</Label>
                    <Select value={formData.position} onValueChange={(value: "Hero" | "Sidebar" | "Rodapé" | "Popup") => setFormData(prev => ({ ...prev, position: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hero">Hero (Principal)</SelectItem>
                        <SelectItem value="Sidebar">Sidebar (Lateral)</SelectItem>
                        <SelectItem value="Rodapé">Rodapé</SelectItem>
                        <SelectItem value="Popup">Popup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="priority">Prioridade</Label>
                    <Input
                      id="priority"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: Number(e.target.value) }))}
                      required
                    />
                  </div>

                  {/* Banner Specifications Alert */}
                  {getSelectedSpec() && (
                    <div className="col-span-2">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                          <div className="space-y-1">
                            <h4 className="font-medium text-blue-900">Especificações para {getSelectedSpec()?.position}</h4>
                            <div className="text-sm text-blue-700 space-y-1">
                              <p><strong>Dimensões:</strong> {getSelectedSpec()?.dimensions}</p>
                              <p><strong>Tamanho máximo:</strong> {getSelectedSpec()?.maxSize}</p>
                              <p><strong>Formatos:</strong> {getSelectedSpec()?.formats.join(", ")}</p>
                              <p><strong>Observações:</strong> {getSelectedSpec()?.notes}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="col-span-2">
                    <Label htmlFor="image">Imagem do Banner</Label>
                    <div className="space-y-2">
                      <Input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="flex space-x-2">
                        <Input
                          value={formData.imageUrl}
                          onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                          placeholder="URL da imagem ou faça upload"
                          required
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => document.getElementById('imageFile')?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      </div>
                      {formData.imageUrl && (
                        <div className="mt-2">
                          <img 
                            src={formData.imageUrl} 
                            alt="Preview" 
                            className="max-w-full h-32 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <Label htmlFor="linkUrl">Link de Destino</Label>
                    <Input
                      id="linkUrl"
                      value={formData.linkUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkUrl: e.target.value }))}
                      placeholder="/leiloes ou https://exemplo.com"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                    />
                    <Label htmlFor="isActive">Banner Ativo</Label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingBanner ? "Atualizar" : "Criar"} Banner
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Banner Specifications Dialog */}
      <Dialog open={showSpecs} onOpenChange={setShowSpecs}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Especificações Técnicas dos Banners</DialogTitle>
            <DialogDescription>
              Consulte as especificações técnicas para cada posição de banner
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {bannerSpecifications.map((spec, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{spec.position}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong>Dimensões:</strong> {spec.dimensions}
                    </div>
                    <div>
                      <strong>Tamanho máximo:</strong> {spec.maxSize}
                    </div>
                    <div>
                      <strong>Formatos aceitos:</strong> {spec.formats.join(", ")}
                    </div>
                  </div>
                  <div className="mt-2">
                    <strong>Observações:</strong> {spec.notes}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total de Banners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{banners.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {banners.filter(b => b.isActive).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Inativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {banners.filter(b => !b.isActive).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hero</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {banners.filter(b => b.position === "Hero").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Banners Cadastrados</CardTitle>
          <CardDescription>
            Gerencie todos os banners do site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Banner</TableHead>
                <TableHead>Posição</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Atualizado</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={banner.imageUrl} 
                          alt={banner.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{banner.title}</div>
                        <div className="text-sm text-gray-500">{banner.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPositionColor(banner.position)}>
                      {banner.position}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{banner.priority}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={banner.isActive}
                        onCheckedChange={() => toggleBannerStatus(banner.id)}
                      />
                      <span className="text-sm">
                        {banner.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(banner.updatedAt).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(banner)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(banner.id)}>
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
