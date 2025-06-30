
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Award, Shield } from "lucide-react";

const QuemSomos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quem Somos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Somos especialistas em apoio estratégico para comprar e vender em leilões, 
            conectando leiloeiros e arrematantes com tecnologia e expertise.
          </p>
        </div>

        {/* Nossa História */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Nossa História</h2>
          <div className="max-w-4xl mx-auto text-gray-600 space-y-4">
            <p>
              Fundada em 2020, a <strong>Leilão em Foco</strong> nasceu da necessidade de democratizar 
              o acesso aos leilões no Brasil, oferecendo tecnologia avançada e consultoria especializada 
              para todos os participantes do mercado.
            </p>
            <p>
              Com uma equipe experiente e apaixonada pelo setor de leilões, desenvolvemos soluções 
              inovadoras que facilitam tanto para quem compra quanto para quem vende em leilões, 
              garantindo transparência, segurança e eficiência em todos os processos.
            </p>
          </div>
        </div>

        {/* Nossos Valores */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nossos Valores</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle className="text-xl">Transparência</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Operamos com total transparência em todos os processos e informações.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle className="text-xl">Precisão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Oferecemos informações precisas e análises detalhadas para melhores decisões.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle className="text-xl">Parceria</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Construímos relacionamentos duradouros baseados na confiança mútua.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-cyan-600" />
                </div>
                <CardTitle className="text-xl">Excelência</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Buscamos constantemente a excelência em todos os serviços oferecidos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Nossa Missão */}
        <div className="bg-cyan-50 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Missão</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Facilitar e otimizar a participação em leilões através de tecnologia avançada, 
              consultoria especializada e informações precisas, proporcionando as melhores 
              oportunidades tanto para arrematantes quanto para leiloeiros.
            </p>
          </div>
        </div>

        {/* Números */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Leilão em Foco em Números</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-cyan-600 mb-2">500+</div>
              <div className="text-gray-600">Leilões Acompanhados</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-cyan-600 mb-2">2,000+</div>
              <div className="text-gray-600">Clientes Atendidos</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-cyan-600 mb-2">150+</div>
              <div className="text-gray-600">Leiloeiros Parceiros</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl font-bold text-cyan-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfação dos Clientes</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsappFloat />
    </div>
  );
};

export default QuemSomos;
