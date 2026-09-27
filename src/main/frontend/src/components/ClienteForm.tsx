import { FormEvent, useState } from "react";
import api from "../services/api";
import type { Cliente } from "../types/Cliente";

interface ClienteFormProps {
  onClienteSalvo: () => void;
  clienteEditando?: Cliente | null;
}

function ClienteForm({ onClienteSalvo, clienteEditando }: ClienteFormProps) {
  const [nome, setNome] = useState(clienteEditando?.nome ?? "");
  const [email, setEmail] = useState(clienteEditando?.email ?? "");
  const [telefone, setTelefone] = useState(clienteEditando?.telefone ?? "");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const dados = { nome, email, telefone };
    if (clienteEditando) {
      await api.put(`/clientes/${clienteEditando.id}`, dados);
    } else {
      await api.post("/clientes", dados);
    }
    onClienteSalvo();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
      />
      <input
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        placeholder="Telefone"
      />
      <button type="submit">
        {clienteEditando ? "Salvar alterações" : "Cadastrar"}
      </button>
    </form>
  );
}

export default ClienteForm;
