import { useEffect, useState } from "react";
import api from "../services/api";
import type { Permissao } from "../types/Permissao";
import PermissaoItem from "../components/PermissaoItem";
import PermissaoForm from "../components/PermissaoForm";

function PermissoesPage() {
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [editando, setEditando] = useState<Permissao | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  function carregarPermissoes() {
    setLoading(true);
    api
      .get<Permissao[]>("/permissoes")
      .then((resposta) => setPermissoes(resposta.data))
      .catch(() => setErro("Não foi possível carregar as permissões."))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    carregarPermissoes();
  }, []);

  async function excluir(id: number) {
    await api.delete(`/permissoes/${id}`);
    carregarPermissoes();
  }

  return (
    <div>
      <h1>Permissões</h1>
      <PermissaoForm
        key={editando?.id ?? "novo"}
        permissaoEditando={editando}
        onPermissaoSalva={() => {
          carregarPermissoes();
          setEditando(null);
        }}
      />
      {loading && <p>Carregando...</p>}
      {erro && <p>{erro}</p>}
      <ul>
        {permissoes.map((p) => (
          <li key={p.id}>
            <PermissaoItem permissao={p} />
            <button onClick={() => setEditando(p)}>Editar</button>
            <button onClick={() => excluir(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PermissoesPage;
