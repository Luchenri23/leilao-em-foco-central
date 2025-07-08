
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminHeader } from "@/components/AdminHeader";
import { AdminStats } from "@/components/AdminStats";
import { UserManagement } from "@/components/UserManagement";
import { LeilaoManagement } from "@/components/LeilaoManagement";
import { ContentManagement } from "@/components/ContentManagement";
import { ReportsSection } from "@/components/ReportsSection";
import { AdminConfigForm } from "@/components/AdminConfigForm";
import { AdminChat } from "@/components/AdminChat";
import { ServicesManager } from "@/components/ServicesManager";
import { AdminManagement } from "@/components/AdminManagement";

const AdminPanel = () => {
  const [showLeilaoForm, setShowLeilaoForm] = useState(false);

  // Mock data para usuários pendentes
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: 1,
      nome: "João Silva Santos",
      email: "joao@email.com",
      tipo: "Pessoa Física",
      telefone: "(11) 99999-9999",
      documento: "123.456.789-00",
      dataCadastro: "2024-07-05",
      status: "pendente"
    },
    {
      id: 2,
      nome: "Empresa ABC Ltda",
      email: "contato@empresaabc.com",
      tipo: "Pessoa Jurídica",
      telefone: "(11) 88888-8888",
      documento: "12.345.678/0001-90",
      dataCadastro: "2024-07-06",
      status: "pendente"
    },
    {
      id: 3,
      nome: "Carlos Leiloeiro",
      email: "carlos@leiloeiro.com",
      tipo: "Leiloeiro",
      telefone: "(11) 77777-7777",
      documento: "JC-SP 12345",
      dataCadastro: "2024-07-07",
      status: "pendente"
    }
  ]);

  const pendingUsersCount = pendingUsers.filter(u => u.status === "pendente").length;

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <AdminStats pendingUsersCount={pendingUsersCount} />

        {/* Tabs do Painel Admin */}
        <Tabs defaultValue="usuarios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="usuarios">Usuários</TabsTrigger>
            <TabsTrigger value="leiloes">Leilões</TabsTrigger>
            <TabsTrigger value="servicos">Serviços</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
            <TabsTrigger value="configuracoes">Config</TabsTrigger>
            <TabsTrigger value="administradores">Admins</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="usuarios">
            <UserManagement 
              pendingUsers={pendingUsers} 
              setPendingUsers={setPendingUsers} 
            />
          </TabsContent>

          <TabsContent value="leiloes">
            <LeilaoManagement 
              showLeilaoForm={showLeilaoForm}
              setShowLeilaoForm={setShowLeilaoForm}
            />
          </TabsContent>

          <TabsContent value="servicos">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle>Chat com Usuários</CardTitle>
                <CardDescription>
                  Converse diretamente com os usuários da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminChat />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conteudo">
            <ContentManagement />
          </TabsContent>

          <TabsContent value="configuracoes">
            <AdminConfigForm />
          </TabsContent>

          <TabsContent value="administradores">
            <AdminManagement />
          </TabsContent>

          <TabsContent value="relatorios">
            <ReportsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
