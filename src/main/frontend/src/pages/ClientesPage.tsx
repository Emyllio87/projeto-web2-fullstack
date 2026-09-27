import { useEffect, useState } from "react";
import api from "../services/api";
import type { Cliente } from "../types/Cliente";
import ClienteItem from "../components/ClienteItem";
import ClienteForm from "../components/ClienteForm";

function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [editando, setEditando] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  function carregarClientes() {
    setLoading(true);
    api
      .get<Cliente[]>("/clientes")
      .then((resposta) => setClientes(resposta.data))
      .catch(() => setErro("Não foi possível carregar os clientes."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  async function excluir(id: number) {
    await api.delete(`/clientes/${id}`);
    carregarClientes();
  }

  return (
    <div>
      <h1>Clientes</h1>
      <ClienteForm
        key={editando?.id ?? "novo"}
        clienteEditando={editando}
        onClienteSalvo={() => {
          carregarClientes();
          setEditando(null);
        }}
      />
      {loading && <p>Carregando...</p>}
      {erro && <p>{erro}</p>}
      <ul>
        {clientes.map((c) => (
          <li key={c.id}>
            <ClienteItem cliente={c} />
            <button onClick={() => setEditando(c)}>Editar</button>
            <button onClick={() => excluir(c.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientesPage;
