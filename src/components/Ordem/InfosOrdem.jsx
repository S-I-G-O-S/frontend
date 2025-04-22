import { formatCNPJ } from "@services/utils";
import { converterSituacao } from "@services/utils";

const InfosOrdem = ({ordem, cargo}) => {
    
    return ( 
        <section id="secPrincipal">
			<h2>Informações</h2>
			<div id="contGeral">
				<div>
					<span>ID ordem:</span>
					{ordem.id}
				</div>
				<div>
					<span>Criado por:</span>
					{ordem.criadoPor}
				</div>
				<div id="contSituacao">
					<span>Situação:</span><div id="situacao" className={`situacao${ordem.situacao}`}>
					{converterSituacao(ordem.situacao, 'maiusculo')}
					</div>
				</div>
				<div>
					<span>Descrição:</span>
					{ordem.descricao || 'sem descrição'}
				</div>
				{
					ordem.funcionario &&
					<div>
						<span>Técnico atendendo:</span>
						{ordem.funcionario.primeiro} {ordem.funcionario.ultimo}
					</div>
				}
			</div>
			<div id="contServico">
				<div>
					<span>Serviço:</span>
					{ordem.servico.nome}
				</div>
				<div>
					<span>Descrição:</span>
					{ordem.servico.descricao}
				</div>
			</div>
			<div id="contCliente">
				<div>
					<span>Cliente:</span>
					{ordem.cliente.nome}
				</div>
				<div>

					<span>CNPJ:</span>
					{formatCNPJ(ordem.cliente.cnpj)}
				</div>
				<div>
					<span>ID cliente:</span>
					{ordem.cliente.id}
				</div>
			</div>
			<div id="contEndereco">
				<span>
					<div>Endereço:</div>
				</span>
				<div>{ordem.endereco.logradouro}, {ordem.endereco.numero}{`${ordem.endereco.complemento}` || ''}  - {ordem.endereco.bairro}, {ordem.endereco.cidade}-{ordem.endereco.uf}/{ordem.endereco.cep}</div>
			</div>
			{(ordem.funcionario && cargo!=="TECNICO") && (
					<div id="contFuncionario">
						<p><span>Funcionário: </span>{ordem.funcionario.primeiro} {ordem.funcionario.ultimo}</p>
						<p><span>contato: </span>{ordem.funcionario.celular}</p>
					</div>
				)
			}
		</section>
    )
}
export default InfosOrdem