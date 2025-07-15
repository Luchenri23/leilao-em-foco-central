
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";

const QuemSomos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary-blue">
            Quem Somos
          </h1>
          
          <div className="prose max-w-none">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-primary-blue">
                Nossa História
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                O Leilão em Foco nasceu da necessidade de conectar leiloeiros e arrematantes 
                através de uma plataforma moderna e confiável. Com anos de experiência no 
                mercado de leilões, nossa equipe desenvolveu uma solução completa que oferece 
                transparência, segurança e facilidade para todos os envolvidos.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-primary-blue">
                Nossa Missão
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Democratizar o acesso aos leilões, oferecendo uma plataforma tecnológica 
                que conecta pessoas e oportunidades, sempre com foco na transparência, 
                segurança e excelência no atendimento.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-primary-blue">
                Nossa Visão
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Ser a principal referência em leilões online no Brasil, reconhecida pela 
                inovação tecnológica, confiabilidade e pela capacidade de gerar 
                oportunidades únicas para nossos usuários.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-primary-blue">
                Nossos Valores
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Transparência em todos os processos</li>
                <li>Segurança e confiabilidade</li>
                <li>Inovação tecnológica constante</li>
                <li>Excelência no atendimento</li>
                <li>Compromisso com resultados</li>
                <li>Ética e responsabilidade</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4">
                Por que escolher o Leilão em Foco?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Experiência Comprovada</h3>
                  <p className="text-sm opacity-90">
                    Anos de atuação no mercado de leilões com milhares de negócios realizados.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tecnologia Avançada</h3>
                  <p className="text-sm opacity-90">
                    Plataforma moderna e intuitiva, desenvolvida para facilitar sua experiência.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Suporte Especializado</h3>
                  <p className="text-sm opacity-90">
                    Equipe especializada pronta para auxiliar em todas as etapas do processo.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Segurança Garantida</h3>
                  <p className="text-sm opacity-90">
                    Processos seguros e transparentes para proteger seus investimentos.
                  </p>
                </div>
              </div>
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
