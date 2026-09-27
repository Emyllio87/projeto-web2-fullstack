import type { Permissao } from "../types/Permissao";

interface PermissaoItemProps {
  permissao: Permissao;
}

function PermissaoItem({ permissao }: PermissaoItemProps) {
  return (
    <span>
      {permissao.nome} — {permissao.descricao}
    </span>
  );
}

export default PermissaoItem;
