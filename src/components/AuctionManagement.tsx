
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
import { Plus, Edit2, Trash2, Eye, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Auction {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startingBid: number;
  currentBid: number;
  status: "Rascunho" | "Publicado" | "Em Andamento" | "Finalizado";
  category: string;
  images: string[];
  bidsCount: number;
  createdAt: string;
}

export const AuctionManagement = () => {
  const { toast } = useToast();
  const [auctions, setAuctions] = useState<Auction[]>([
    {
      id: 1,
      title: "Casa em Condomínio - São Paulo",
      description: "Linda casa com 3 quartos, 2 banheiros, garagem para 2 carros",
      startDate: "2025-01-20",
      endDate: "2025-02-20",
      startingBid: 450000,
      currentBid: 520000,
      status: "Em Andamento",
      category: "Imóveis",
      images: ["/placeholder.svg"],
      bidsCount: 15,
      createdAt: "2025-01-10"
    },
    {
      id: 2,
      title: "Apartamento Centro - Rio de Janeiro",
      description: "Apartamento de 2 quartos no centro histórico",
      startDate: "2025-01-25",
      endDate: "2025-02-25",
      startingBid: 300000,
      currentBid: 300000,
      status: "Publicado",
      category: "Imóveis",
      images: ["/placeholder.svg"],
      bidsCount: 0,
      createdAt: "2025-01-12"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAuction, setEditingAuction] = useState<Auction | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startingBid: 0,
    category: "",
    status: "Rascunho" as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAuction) {
      setAuctions(prev => prev.map(auction => 
        auction.id === editingAuction.id 
          ? { 
              ...auction, 
              ...formData
            }
          : auction
      ));
      toast({ title: "Leilão atualizado com sucesso!" });
    } else {
      const newAuction: Auction = {
        id: Date.now(),
        ...formData,
        currentBid: formData.startingBid,
        images: ["/placeholder.svg"],
        bidsCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setAuctions(prev => [...prev, newAuction]);
      toast({ title: "Leilão criado com sucesso!" });
    }

    setIsDialogOpen(false);
    setEditingAuction(null);
    setFormData({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      startingBid: 0,
      category: "",
      status: "Rascunho"
    });
  };

  const handleEdit = (auction: Auction) => {
    setEditingAuction(auction);
    setFormData({
      title: auction.title,
      description: auction.description,
      startDate: auction.startDate,
      endDate: auction.endDate,
      startingBid: auction.startingBid,
      category: auction.category,
      status: auction.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setAuctions(prev => prev.filter(auction => auction.id !== id));
    toast({ title: "Leilão removido com sucesso!" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Rascunho": return "bg-gray-500";
      case "Publicado": return "bg-blue-500";
      case "Em Andamento": return "bg-green-500";
      case "Finalizado": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Leilões</h2>
          <p className="text-gray-600">Controle todos os leilões da plataforma</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Leilão
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingAuction ? "Editar Leilão" : "Criar Novo Leilão"}
              </DialogTitle>
              <DialogDescription>
                Configure as informações do leilão abaixo.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Título do Leilão</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Casa em Condomínio - São Paulo"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descreva o item do leilão..."
                    rows={3}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Ex: Imóveis, Veículos, Arte"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="startingBid">Lance Inicial (R$)</Label>
                  <Input
                    id="startingBid"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.startingBid}
                    onChange={(e) => setFormData(prev => ({ ...prev, startingBid: Number(e.target.value) }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="startDate">Data de Início</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="endDate">Data de Término</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: "Rascunho" | "Publicado" | "Em Andamento" | "Finalizado") => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rascunho">Rascunho</SelectItem>
                      <SelectItem value="Publicado">Publicado</SelectItem>
                      <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                      <SelectItem value="Finalizado">Finalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingAuction ? "Atualizar" : "Criar"} Leilão
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
            <CardTitle className="text-lg">Total de Leilões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auctions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {auctions.filter(a => a.status === "Em Andamento").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Publicados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {auctions.filter(a => a.status === "Publicado").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Finalizados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {auctions.filter(a => a.status === "Finalizado").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auctions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Leilões Cadastrados</CardTitle>
          <CardDescription>
            Gerencie todos os leilões da plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Leilão</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Lance Atual</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data Término</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auctions.map((auction) => (
                <TableRow key={auction.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={auction.images[0]} 
                          alt={auction.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{auction.title}</div>
                        <div className="text-sm text-gray-500">{auction.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{auction.category}</TableCell>
                  <TableCell>
                    <div className="font-bold text-green-600">
                      R$ {auction.currentBid.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {auction.bidsCount} lances
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(auction.status)}>
                      {auction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(auction.endDate).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(auction)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(auction.id)}>
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
