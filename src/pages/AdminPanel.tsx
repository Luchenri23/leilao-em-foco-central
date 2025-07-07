
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Gavel, 
  FileText, 
  BarChart3, 
  Settings,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

const AdminPanel = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const handleApproveUser = (userId: number) => {
    setPendingUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: "aprovado" }
          : user
      )
    );
    toast({
      title: "Usuário aprovado!",
      description: "O usuário foi aprovado e pode acessar a plataforma."
    });
  };

  const handleRejectUser = (userId: number) => {
    setPendingUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: "rejeitado" }
          : user
      )
    );
    toast({
      title: "Usuário rejeitado",
      description: "O usuário foi rejeitado e será notificado.",
      variant: "destructive"
    });
  };

  const filteredUsers = pendingUsers.filter(user => {
    const matchesSearch = user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pendente</Badge>;
      case "aprovado":
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Aprovado</Badge>;
      case "rejeitado":
        return <Badge variant="destructive" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejeitado</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header do Admin */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary-blue">Painel Administrativo</h1>
              <p className="text-neutral-gray">Leilão em Foco - Controle Total</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Pendentes</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {pendingUsers.filter(u => u.status === "pendente").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Usuários Ativos</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">247</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leilões Ativos</CardTitle>
              <Gavel className="h-4 w-4 text-primary-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary-blue">12</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
              <BarChart3 className="h-4 w-4 text-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange">R$ 85.2K</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs do Painel Admin */}
        <Tabs defaultValue="usuarios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="usuarios">Gerenciar Usuários</TabsTrigger>
            <TabsTrigger value="leiloes">Leilões</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="usuarios">
            <Card>
              <CardHeader>
                <CardTitle>Aprovação de Usuários</CardTitle>
                <CardDescription>
                  Gerencie e aprove novos cadastros na plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filtros */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-gray" />
                      <Input
                        placeholder="Buscar por nome ou email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={statusFilter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter("all")}
                    >
                      Todos
                    </Button>
                    <Button 
                      variant={statusFilter === "pendente" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter("pendente")}
                    >
                      Pendentes
                    </Button>
                    <Button 
                      variant={statusFilter === "aprovado" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter("aprovado")}
                    >
                      Aprovados
                    </Button>
                  </div>
                </div>

                {/* Tabela de Usuários */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome/Empresa</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Contato</TableHead>
                        <TableHead>Documento</TableHead>
                        <TableHead>Data Cadastro</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{user.nome}</p>
                              <p className="text-sm text-neutral-gray">{user.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{user.tipo}</Badge>
                          </TableCell>
                          <TableCell>{user.telefone}</TableCell>
                          <TableCell>{user.documento}</TableCell>
                          <TableCell>{user.dataCadastro}</TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              {user.status === "pendente" && (
                                <>
                                  <Button 
                                    size="sm" 
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => handleApproveUser(user.id)}
                                  >
                                    <CheckCircle className="h-3 w-3" />
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => handleRejectUser(user.id)}
                                  >
                                    <XCircle className="h-3 w-3" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leiloes">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Leilões</CardTitle>
                <CardDescription>
                  Controle todos os leilões da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-gray">Funcionalidade em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="relatorios">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios e Análises</CardTitle>
                <CardDescription>
                  Visualize estatísticas e gere relatórios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-gray">Funcionalidade em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracoes">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>
                  Configure parâmetros gerais da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-gray">Funcionalidade em desenvolvimento...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
