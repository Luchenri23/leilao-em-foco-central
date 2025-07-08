
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, FileText, Image } from "lucide-react";

export const ContentManagement = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Conteúdo</CardTitle>
        <CardDescription>
          Gerencie páginas, textos e banners do site
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Button variant="outline" className="h-20 flex flex-col">
            <Globe className="h-6 w-6 mb-2" />
            <span>Criar Página</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col">
            <FileText className="h-6 w-6 mb-2" />
            <span>Editar Textos</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col">
            <Image className="h-6 w-6 mb-2" />
            <span>Gerenciar Banners</span>
          </Button>
        </div>
        <p className="text-neutral-gray">Funcionalidades de gerenciamento de conteúdo em desenvolvimento...</p>
      </CardContent>
    </Card>
  );
};
