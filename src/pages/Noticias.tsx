
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";

const Noticias = () => {
  const noticias = [
    {
      id: 1,
      titulo: "Leilão de Veículos da Receita Federal Arrecada R$ 15 Milhões",
      resumo: "Grande movimentação no último leilão realizado pela Receita Federal com mais de 500 veículos disponibilizados.",
      data: "15 de Dezembro, 2024",
      autor: "Redação Leilão em Foco",
      categoria: "Leilões Públicos",
      imagem: "/placeholder.svg"
    },
    {
      id: 2,
      titulo: "Novas Regulamentações Para Leilões Online Entram em Vigor",
      resumo: "Governo federal estabelece novas diretrizes para modernizar o processo de leilões eletrônicos no país.",
      data: "12 de Dezembro, 2024",
      autor: "Dr. Carlos Silva",
      categoria: "Legislação",
      imagem: "/placeholder.svg"
    },
    {
      id: 3,
      titulo: "Mercado Imobiliário: Leilões Crescem 25% em 2024",
      resumo: "Análise do setor mostra crescimento significativo nos leilões de imóveis durante este ano.",
      data: "08 de Dezembro, 2024",
      autor: "Ana Paula Santos",
      categoria: "Mercado Imobiliário",
      imagem: "/placeholder.svg"
    },
    {
      id: 4,
      titulo: "Dicas Para Iniciantes: Como Participar do Seu Primeiro Leilão",
      resumo: "Guia completo com orientações essenciais para quem está começando no mundo dos leilões.",
      data: "05 de Dezembro, 2024",
      autor: "Roberto Oliveira",
      categoria: "Educacional",
      imagem: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Notícias</h1>
          <p className="text-lg text-gray-600">
            Fique por dentro das últimas novidades do mundo dos leilões
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {noticias.map((noticia) => (
            <Card key={noticia.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{noticia.categoria}</Badge>
                </div>
                <CardTitle className="text-xl hover:text-cyan-600 transition-colors">
                  {noticia.titulo}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {noticia.resumo}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {noticia.data}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {noticia.autor}
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

export default Noticias;
