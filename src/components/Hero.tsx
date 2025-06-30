
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Users, Award } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-cyan-50 to-orange-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Leilão em{" "}
                <span className="bg-gradient-to-r from-cyan-600 to-orange-500 bg-clip-text text-transparent">
                  Foco
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Apoio estratégico para comprar e vender em leilões. 
                Conectamos leiloeiros e arrematantes com tecnologia e expertise.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-cyan-600 hover:bg-cyan-700">
                <Link to="/cadastro">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/leiloes">Ver Leilões</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Target className="h-8 w-8 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Leilões Ativos</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-cyan-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">2.5k+</div>
                <div className="text-sm text-gray-600">Usuários</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Award className="h-8 w-8 text-orange-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Satisfação</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <img 
                src="/lovable-uploads/81ec2dab-229f-4839-9c22-6c43aeec72a6.png" 
                alt="Leilão em Foco - Logo completa" 
                className="w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
