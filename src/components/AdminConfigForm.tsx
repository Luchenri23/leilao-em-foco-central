
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Image, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export const AdminConfigForm = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState({
    siteName: "Leilão em Foco",
    siteDescription: "Plataforma completa de leilões online",
    contactEmail: "contato@leilaoemfoco.com.br",
    supportEmail: "suporte@leilaoemfoco.com.br",
    whatsapp: "(11) 99999-9999",
    address: "Rua das Flores, 123 - São Paulo/SP",
    bannerTitle: "Participe dos Melhores Leilões",
    bannerSubtitle: "Encontre oportunidades únicas em nossa plataforma",
    servicesEmail: "servicos@leilaoemfoco.com.br",
    // Redes Sociais
    facebookUrl: "https://facebook.com/leilaoemfoco",
    instagramUrl: "https://instagram.com/leilaoemfoco",
    linkedinUrl: "https://linkedin.com/company/leilaoemfoco",
    twitterUrl: "https://twitter.com/leilaoemfoco",
    socialMediaEnabled: {
      facebook: true,
      instagram: true,
      linkedin: true,
      twitter: false
    }
  });

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "As configurações do sistema foram atualizadas com sucesso."
    });
  };

  const handleBannerUpload = () => {
    toast({
      title: "Upload realizado!",
      description: "Nova imagem do banner foi carregada com sucesso."
    });
  };

  const toggleSocialMedia = (platform: string) => {
    setConfig({
      ...config,
      socialMediaEnabled: {
        ...config.socialMediaEnabled,
        [platform]: !config.socialMediaEnabled[platform as keyof typeof config.socialMediaEnabled]
      }
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais do Site</CardTitle>
          <CardDescription>Configure informações básicas da plataforma</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName">Nome do Site</Label>
              <Input
                id="siteName"
                value={config.siteName}
                onChange={(e) => setConfig({...config, siteName: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">E-mail de Contato</Label>
              <Input
                id="contactEmail"
                type="email"
                value={config.contactEmail}
                onChange={(e) => setConfig({...config, contactEmail: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="siteDescription">Descrição do Site</Label>
            <Textarea
              id="siteDescription"
              value={config.siteDescription}
              onChange={(e) => setConfig({...config, siteDescription: e.target.value})}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="supportEmail">E-mail de Suporte</Label>
              <Input
                id="supportEmail"
                type="email"
                value={config.supportEmail}
                onChange={(e) => setConfig({...config, supportEmail: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="servicesEmail">E-mail para Serviços</Label>
              <Input
                id="servicesEmail"
                type="email"
                value={config.servicesEmail}
                onChange={(e) => setConfig({...config, servicesEmail: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="whatsapp">WhatsApp</Label>
              <Input
                id="whatsapp"
                value={config.whatsapp}
                onChange={(e) => setConfig({...config, whatsapp: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={config.address}
                onChange={(e) => setConfig({...config, address: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Banner da Home</CardTitle>
          <CardDescription>Configure o banner principal da página inicial</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="bannerTitle">Título do Banner</Label>
            <Input
              id="bannerTitle"
              value={config.bannerTitle}
              onChange={(e) => setConfig({...config, bannerTitle: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="bannerSubtitle">Subtítulo do Banner</Label>
            <Input
              id="bannerSubtitle"
              value={config.bannerSubtitle}
              onChange={(e) => setConfig({...config, bannerSubtitle: e.target.value})}
            />
          </div>

          <div>
            <Label>Imagem do Banner</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-4">Clique para enviar uma nova imagem do banner</p>
              <Button onClick={handleBannerUpload} variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Fazer Upload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Redes Sociais</CardTitle>
          <CardDescription>Configure os links das redes sociais que aparecerão no rodapé</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="facebook-enabled"
                  checked={config.socialMediaEnabled.facebook}
                  onChange={() => toggleSocialMedia('facebook')}
                  className="rounded"
                />
                <Facebook className="h-5 w-5 text-blue-600" />
                <Label htmlFor="facebook-enabled">Facebook</Label>
              </div>
              <div className="flex-1">
                <Input
                  placeholder="https://facebook.com/sua-empresa"
                  value={config.facebookUrl}
                  onChange={(e) => setConfig({...config, facebookUrl: e.target.value})}
                  disabled={!config.socialMediaEnabled.facebook}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="instagram-enabled"
                  checked={config.socialMediaEnabled.instagram}
                  onChange={() => toggleSocialMedia('instagram')}
                  className="rounded"
                />
                <Instagram className="h-5 w-5 text-pink-600" />
                <Label htmlFor="instagram-enabled">Instagram</Label>
              </div>
              <div className="flex-1">
                <Input
                  placeholder="https://instagram.com/sua-empresa"
                  value={config.instagramUrl}
                  onChange={(e) => setConfig({...config, instagramUrl: e.target.value})}
                  disabled={!config.socialMediaEnabled.instagram}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="linkedin-enabled"
                  checked={config.socialMediaEnabled.linkedin}
                  onChange={() => toggleSocialMedia('linkedin')}
                  className="rounded"
                />
                <Linkedin className="h-5 w-5 text-blue-700" />
                <Label htmlFor="linkedin-enabled">LinkedIn</Label>
              </div>
              <div className="flex-1">
                <Input
                  placeholder="https://linkedin.com/company/sua-empresa"
                  value={config.linkedinUrl}
                  onChange={(e) => setConfig({...config, linkedinUrl: e.target.value})}
                  disabled={!config.socialMediaEnabled.linkedin}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="twitter-enabled"
                  checked={config.socialMediaEnabled.twitter}
                  onChange={() => toggleSocialMedia('twitter')}
                  className="rounded"
                />
                <Twitter className="h-5 w-5 text-blue-400" />
                <Label htmlFor="twitter-enabled">Twitter/X</Label>
              </div>
              <div className="flex-1">
                <Input
                  placeholder="https://twitter.com/sua-empresa"
                  value={config.twitterUrl}
                  onChange={(e) => setConfig({...config, twitterUrl: e.target.value})}
                  disabled={!config.socialMediaEnabled.twitter}
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Dica:</strong> As redes sociais habilitadas aparecerão automaticamente no rodapé do site. 
              Certifique-se de que os links estão corretos e ativos.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-primary-blue hover:bg-primary-blue/90 text-white">
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};
