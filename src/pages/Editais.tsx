
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, FileText, Download } from "lucide-react";

const Editais = () => {
  const editais = [
    {
      id: 1,
      numero: "001/2024",
      titulo: "Leilão de Veículos Apreendidos - DETRAN/SP",
      modalidade: "Eletrônico",
      dataLeilao: "20/12/2024 - 10:00h",
      local: "Portal de Leilões - www.leiloeseletrónicos.com.br",
      leiloeiro: "João Silva - JUCESP 123",
      situacao: "Aberto",
      valorMinimo: "R$ 5.000,00",
      categoria: "Veículos"
    },
    {
      id: 2,
      numero: "002/2024",
      titulo: "Leilão de Imóveis da União",
      modalidade: "Presencial",
      dataLeilao: "18/12/2024 - 14:00h",
      local: "Auditório Central - Rua das Flores, 123 - SP",
      leiloeiro: "Maria Santos - JUCESP 456",
      situacao: "Aberto",
      valorMinimo: "R$ 150.000,00",
      categoria: "Imóveis"
    },
    {
      id: 3,
      numero: "003/2024",
      titulo: "Leilão de Equipamentos Industriais",
      modalidade: "Híbrido",
      dataLeilao: "22/12/2024 - 09:00h",
      local: "Galpão Industrial + Online",
      leiloeiro: "Carlos Oliveira - JUCESP 789",
      situacao: "Em Breve",
      valorMinimo: "R$ 25.000,00",
      categoria: "Equipamentos"
    }
  ];

  const getBadgeVariant = (situacao: string) => {
    switch (situacao) {
      case "Aberto":
        return "default";
      case "Em Breve":
        return "secondary";
      case "Encerrado":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Editais</h1>
          <p className="text-lg text-gray-600">
            Confira todos os editais de leilões disponíveis
          </p>
        </div>

        <div className="grid gap-6">
          {editais.map((edital) => (
            <Card key={edital.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getBadgeVariant(edital.situacao)}>
                        {edital.situacao}
                      </Badge>
                      <Badge variant="outline">{edital.categoria}</Badge>
                      <Badge variant="outline">{edital.modalidade}</Badge>
                    </div>
                    <CardTitle className="text-xl text-gray-900">
                      Edital Nº {edital.numero} - {edital.titulo}
                    </CardTitle>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span><strong>Data do Leilão:</strong> {edital.dataLeilao}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span><strong>Local:</strong> {edital.local}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="h-4 w-4" />
                      <span><strong>Leiloeiro:</strong> {edital.leiloeiro}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-gray-600">
                      <strong>Valor Mínimo:</strong> {edital.valorMinimo}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm">
                        Ver Detalhes
                      </Button>
                      <Button variant="outline" size="sm">
                        Ver Lotes
                      </Button>
                    </div>
                  </div>
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

export default Editais;
