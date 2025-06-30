
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contato = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contato</h1>
          <p className="text-lg text-gray-600">
            Entre em contato conosco. Estamos aqui para ajudar!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário de Contato */}
          <Card>
            <CardHeader>
              <CardTitle>Envie sua Mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo e retornaremos em breve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" placeholder="Seu nome completo" />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" placeholder="(11) 99999-9999" />
                  </div>
                  <div>
                    <Label htmlFor="assunto">Assunto</Label>
                    <Input id="assunto" placeholder="Assunto da mensagem" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="mensagem">Mensagem</Label>
                  <Textarea 
                    id="mensagem" 
                    placeholder="Descreva como podemos ajudá-lo..."
                    className="min-h-[120px]"
                  />
                </div>

                <Button className="w-full">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informações de Contato */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Endereço</div>
                    <div className="text-gray-600">
                      Av. Paulista, 1000 - Bela Vista<br />
                      São Paulo - SP, 01310-100
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Phone className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Telefone</div>
                    <div className="text-gray-600">(11) 3000-0000</div>
                    <div className="text-gray-600">(11) 99999-9999</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold">E-mail</div>
                    <div className="text-gray-600">contato@leilaoemfoco.com.br</div>
                    <div className="text-gray-600">suporte@leilaoemfoco.com.br</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Horário de Atendimento</div>
                    <div className="text-gray-600">
                      Segunda à Sexta: 8h às 18h<br />
                      Sábado: 8h às 12h
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Mapa - Em breve</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsappFloat />
    </div>
  );
};

export default Contato;
