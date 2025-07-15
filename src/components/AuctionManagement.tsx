
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
import { Calendar, Clock, MapPin, Plus, Edit2, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Auction {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: "Rascunho" | "Publicado" | "Em Andamento" | "Finalizado";
  auctioneer: string;
  totalLots: number;
  estimatedValue: number;
}

export const AuctionManagement = () => {
  const { toast } = useToast();
  const [auctions, setAuctions] = useState<Auction[]>([
    {
      id: 1,
      title: "Leilão de Veículos - São Paulo",
      description: "Mais de 200 veículos diversos, incluindo carros, motos e caminhões.",
      date: "2025-01-15",
      time: "14:00",
      location: "São Paulo - SP",
      status: "Publicado",
      auctioneer: "Leiloeiro São Paulo LTDA",
      totalLots: 215,
      estimatedValue: 2500000
    },
    {
      id: 2,
      title: "Leilão de Imóveis - Rio de Janeiro",
      description: "Apartamentos, casas e terrenos em diversas regiões do Rio de Janeiro.",
      date: "2025-01-20",
      time: "10:00",
      location: "Rio de Janeiro - RJ",
      status: "Rascunho",
      auctioneer: "RJ Leilões",
      totalLots: 45,
      estimatedValue: 15000000
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAuction, setEditingAuction] = useState<Auction | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    status: "Rascunho" as const,
    auctioneer: "",
    estimatedValue: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAuction) {
      setAuctions(prev => prev.map(auction => 
        auction.id === editingAuction.id 
          ? { ...auction, ...formData, totalLots: auction.totalLots }
          : auction
      ));
      toast({ title: "Leilão atualizado com sucesso!" });
    } else {
      const newAuction: Auction = {
        id: Date.now(),
        ...formData,
        totalLots: 0
      };
      setAuctions(prev => [...prev, newAuction]);
      toast({ title: "Leilão criado com sucesso!" });
    }

    setIsDialogOpen(false);
    setEditingAuction(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      status: "Rascunho",
      auctioneer: "",
      estimatedValue: 0
    });
  };

  const handleEdit = (auction: Auction) => {
    setEditingAuction(auction);
    setFormData({
      title: auction.title,
      description: auction.description,
      date: auction.date,
      time: auction.time,
      location: auction.location,
      status: auction.status,
      auctioneer: auction.auctioneer,
      estimatedValue: auction.estimatedValue
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setAuctions(prev => prev.filter(auction => auction.id !== id));
    toast({ title: "Leilão removido com sucesso!" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Publicado": return "bg-green-500";
      case "Em Andamento": return "bg-blue-500";
      case "Finalizado": return "bg-gray-500";
      default: return "bg-yellow-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Gerenciar Leilões</h2>
          <p className="text-gray-600">Cadastre e gerencie todos os leilões da plataforma</p>
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
                Preencha as informações do leilão abaixo.
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
                    placeholder="Ex: Leilão de Veículos - São Paulo"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descreva o leilão..."
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Local</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Ex: São Paulo - SP"
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
                      <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                      <SelectItem value="Finalizado">Finalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="auctioneer">Leiloeiro</Label>
                  <Input
                    id="auctioneer"
                    value={formData.auctioneer}
                    onChange={(e) => setFormData(prev => ({ ...prev, auctioneer: e.target.value }))}
                    placeholder="Nome do leiloeiro"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="estimatedValue">Valor Estimado (R$)</Label>
                  <Input
                    id="estimatedValue"
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedValue: Number(e.target.value) }))}
                    placeholder="0"
                    required
                  />
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

      <Card>
        <CardHeader>
          <CardTitle>Leilões Cadastrados</CardTitle>
          <CardDescription>
            Total de {auctions.length} leilões cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Lotes</TableHead>
                <TableHead>Valor Est.</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auctions.map((auction) => (
                <TableRow key={auction.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{auction.title}</div>
                      <div className="text-sm text-gray-500">{auction.auctioneer}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        {new Date(auction.date).toLocaleDateString('pt-BR')} às {auction.time}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{auction.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(auction.status)}>
                      {auction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{auction.totalLots}</TableCell>
                  <TableCell>
                    R$ {auction.estimatedValue.toLocaleString('pt-BR')}
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
