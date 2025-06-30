
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Gavel, Users } from "lucide-react";

const Leiloes = () => {
  const leiloes = [
    {
      id: 1,
      titulo: "Leilão de Veículos Premium",
      data: "20/12/2024",
      hora: "10:00h",
      modalidade: "Online",
      leiloeiro: "João Silva",
      totalLotes: 45,
      participantes: 120,
      valorArrecadado: "R$ 2.500.000",
      status: "Em Andamento",
      imagem: "/placeholder.svg",
      categoria: "Veículos"
    },
    {
      id: 2,
      titulo: "Leilão Judicial de Imóveis",
      data: "18/12/2024",
      hora: "14:00h",
      modalidade: "Presencial",
      leiloeiro: "Maria Santos",
      totalLotes: 12,
      participantes: 85,
      valorArrecadado: "R$ 8.700.000",
      status: "Finalizado",
      imagem: "/placeholder.svg",
      categoria: "Imóveis"
    },
    {
      id: 3,
      titulo: "Leilão de Arte e Antiguidades",
      data: "22/12/2024",
      hora: "16:00h",
      modalidade: "Híbrido",
      leiloeiro: "Carlos Oliveira",
      totalLotes: 78,
      participantes: 45,
      valorArrecadado: "R$ 350.000",
      status: "Agendado",
      imagem: "/placeholder.svg",
      categoria: "Arte"
    },
    {
      id: 4,
      titulo: "Leilão de Máquinas Industriais",
      data: "15/12/2024",
      hora: "09:00h",
      modalidade: "Online",
      leiloeiro: "Ana Paula",
      totalLotes: 23,
      participantes: 67,
      valorArrecadado: "R$ 1.200.000",
      status: "Finalizado",
      imagem: "/placeholder.svg",
      categoria: "Equipamentos"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em Andamento":
        return <Badge className="bg-green-500">Em Andamento</Badge>;
      case "Finalizado":
        return <Badge variant="secondary">Finalizado</Badge>;
      case "Agendado":
        return <Badge variant="outline">Agendado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Leilões</h1>
          <p className="text-lg text-gray-600">
            Acompanhe todos os leilões em tempo real
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {leiloes.map((leilao) => (
            <Card key={leilao.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-2">
                    {getStatusBadge(leilao.status)}
                    <Badge variant="outline">{leilao.categoria}</Badge>
                    <Badge variant="outline">{leilao.modalidade}</Badge>
                  </div>
                </div>
                <CardTitle className="text-xl">{leilao.titulo}</CardTitle>
                <CardDescription>
                  Leiloeiro: {leilao.leiloeiro}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{leilao.data} às {leilao.hora}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Gavel className="h-4 w-4" />
                    <span>{leilao.totalLotes} lotes disponíveis</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{leilao.participantes} participantes</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <div className="text-sm text-gray-600">Valor Arrecadado</div>
                  <div className="text-2xl font-bold text-cyan-600">{leilao.valorArrecadado}</div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" size="sm">
                    Ver Lotes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
      <WhatsappFloat />
    </div>
  );
};

export default Leiloes;
