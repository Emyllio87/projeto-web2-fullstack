import type { Cliente } from "../types/Cliente";

interface ClienteItemProps {
  cliente: Cliente;
}

function ClienteItem({ cliente }: ClienteItemProps) {
  return (
    <span>
      {cliente.nome} — {cliente.email} — {cliente.telefone}
    </span>
  );
}

export default ClienteItem;
