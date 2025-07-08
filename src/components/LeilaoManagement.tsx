
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminLeilaoForm } from "@/components/AdminLeilaoForm";
import { Plus, Gavel, FileText } from "lucide-react";

interface LeilaoManagementProps {
  showLeilaoForm: boolean;
  setShowLeilaoForm: (show: boolean) => void;
}

export const LeilaoManagement = ({ showLeilaoForm, setShowLeilaoForm }: LeilaoManagementProps) => {
  if (showLeilaoForm) {
    return <AdminLeilaoForm onClose={() => setShowLeilaoForm(false)} />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gerenciamento de Leilões</CardTitle>
          <CardDescription>
            Controle todos os leilões, lotes e editais da plataforma
          </CardDescription>
        </div>
        <Button 
          onClick={() => setShowLeilaoForm(true)}
          className="bg-primary-blue hover:bg-primary-blue/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Leilão
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Leilões Ativos</p>
                  <p className="text-2xl font-bold text-primary-blue">8</p>
                </div>
                <Gavel className="h-8 w-8 text-primary-blue" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Total de Lotes</p>
                  <p className="text-2xl font-bold text-orange">156</p>
                </div>
                <FileText className="h-8 w-8 text-orange" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Editais Publicados</p>
                  <p className="text-2xl font-bold text-secondary-blue">24</p>
                </div>
                <FileText className="h-8 w-8 text-secondary-blue" />
              </div>
            </CardContent>
          </Card>
        </div>
        <p className="text-neutral-gray">Funcionalidade de listagem de leilões em desenvolvimento...</p>
      </CardContent>
    </Card>
  );
};
