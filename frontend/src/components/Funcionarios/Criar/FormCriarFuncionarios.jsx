'use client'
import { useState } from "react";
import axios from "axios";
import BtnActions from "@/components/Geral/Button/BtnActions";
import SearchIcon from '@mui/icons-material/Search';
import SuccessNotification from "@/components/Geral/Notification/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notification/ErrorNotification";
import { useRouter } from "next/navigation";

const FormCriarFuncionarios = () => {
  const [func_nome, setFunc_nome] = useState('');
  const [func_tipo_documento, setFunc_tipo_documento] = useState('');
  const [func_cpf_cnpj, setFunc_cpf_cnpj] = useState('');
  const [func_rg_inscricao_estadual, setFunc_rg_inscricao_estadual] = useState(null);
  const [func_data_nascimento, setFunc_data_nascimento] = useState(null);
  const [func_genero, setFunc_genero] = useState(null);
  const [func_telefone, setFunc_telefone] = useState(null);
  const [func_celular, setFunc_celular] = useState(null);
  const [func_email, setFunc_email] = useState(null);
  const [func_endereco, setFunc_endereco] = useState('');
  const [func_numero, setFunc_numero] = useState('');
  const [func_complemento, setFunc_complemento] = useState(null);
  const [func_bairro, setFunc_bairro] = useState('');
  const [func_cidade, setFunc_cidade] = useState('');
  const [func_estado, setFunc_estado] = useState('');
  const [func_cep, setFunc_cep] = useState('');
  const [func_pais, setFunc_pais] = useState('Brasil');
  const [func_cargo, setFunc_cargo] = useState('');
  const [func_departamento, setFunc_departamento] = useState('');
  const [func_data_admissao, setFunc_data_admissao] = useState('');
  const [func_data_demissao, setFunc_data_demissao] = useState(null);
  const [func_salario, setFunc_salario] = useState(0.00);
  const [func_comissao, setFunc_comissao] = useState(0.00);
  const [func_observacoes, setFunc_observacoes] = useState(null);
  
  const funcionario = {
    func_nome,
    func_tipo_documento,
    func_cpf_cnpj,
    func_rg_inscricao_estadual,
    func_data_nascimento,
    func_genero,
    func_telefone,
    func_celular,
    func_email,
    func_endereco,
    func_numero,
    func_complemento,
    func_bairro,
    func_cidade,
    func_estado,
    func_cep,
    func_pais,
    func_cargo,
    func_departamento,
    func_data_admissao,
    func_data_demissao,
    func_salario,
    func_comissao,
    func_observacoes,
  };
  
  const [isInvalidoFuncionarioNome, setIsInvalidoFuncionarioNome] = useState(false);
  const [isInvalidoFuncionarioCpf, setIsInvalidoFuncionarioCpf] = useState(false);
  const [isInvalidoFuncionarioCnpj, setIsInvalidoFuncionarioCnpj] = useState(false);
  const [isInvalidoFuncionarioRG, setIsInvalidoFuncionarioRG] = useState(false);
  const [isInvalidoFuncionarioDataNascimento, setIsInvalidoFuncionarioDataNascimento] = useState(false);
  const [isInvalidoFuncionarioTelefone, setIsInvalidoFuncionarioTelefone] = useState(false);
  const [isInvalidoFuncionarioCelular, setIsInvalidoFuncionarioCelular] = useState(false);
  const [isInvalidoFuncionarioEmail, setIsInvalidoFuncionarioEmail] = useState(false);
  const [isInvalidoFuncionarioEndereco, setIsInvalidoFuncionarioEndereco] = useState(false);
  const [isInvalidoFuncionarioNumero, setIsInvalidoFuncionarioNumero] = useState(false);
  const [isInvalidoFuncionarioComplemento, setIsInvalidoFuncionarioComplemento] = useState(false);
  const [isInvalidoFuncionarioBairro, setIsInvalidoFuncionarioBairro] = useState(false);
  const [isInvalidoFuncionarioCidade, setIsInvalidoFuncionarioCidade] = useState(false);
  const [isInvalidoFuncionarioEstado, setIsInvalidoFuncionarioEstado] = useState(false);
  const [isInvalidoFuncionarioCep, setIsInvalidoFuncionarioCep] = useState(false);
  const [isInvalidoFuncionarioPais, setIsInvalidoFuncionarioPais] = useState(false);

  const [isInvalidoFuncionarioCargo, setIsInvalidoFuncionarioCargo] = useState(false);
  const [isInvalidoFuncionarioDepartamento, setIsInvalidoFuncionarioDepartamento] = useState(false);
  const [isInvalidoFuncionarioSalario, setIsInvalidoFuncionarioSalario] = useState(false);
  const [isInvalidoFuncionarioComissao, setIsInvalidoFuncionarioComissao] = useState(false);
  const [isInvalidoFuncionarioObservacoes, setIsInvalidoFuncionarioObservacoes] = useState(false);

  const [statusRequest, setStatusRequest] = useState('');
  const [secaoAtiva, setSecaoAtiva] = useState("dadosPessoais");
  const router = useRouter();

  const buscarCNPJ = async (cnpj) => {
    try {
      const response = await axios.post(`https://pos-backend-six.vercel.app/api/utils/cnpj`, { cnpj });
      if(response.data.data === null) {
        alert('CNPJ não encontrado!');
        return;
      }else{
        setFunc_nome(response.data.data.nome);
        setFunc_email(response.data.data.email);

        const cepFormatado = response.data.data.cep.replace(/[.-]/g, '');
        setFunc_cep(cepFormatado);
        setFunc_complemento(response.data.data.complemento);
        setFunc_numero(response.data.data.numero);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buscarCEP = async (cep) => {
    try {
      const response = await axios.post(`https://pos-backend-six.vercel.app/api/utils/cep`, { cep });
      if(response.data.data === null) {
        alert('CEP não encontrado!');
        return;
      }else{
        setFunc_endereco(response.data.data.logradouro);
        setFunc_bairro(response.data.data.bairro);
        setFunc_cidade(response.data.data.localidade);
        setFunc_estado(response.data.data.uf);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCriar = async () => {
    try{
      await axios.post('https://pos-backend-six.vercel.app/api/funcionarios/cadastrar', funcionario)
      router.push('/funcionarios')
      setStatusRequest(true);
    } catch (error) {
      setStatusRequest(false);
    }
  }

  return (<>
    <div className="w-full xl:max-w-screen-lg flex flex-col">
      {/* <BtnBackPage title="Voltar" /> */}
      <h3 className="text-neutral-800 text-xl font-medium ">
        {func_nome || "Novo Funcionario"}
      </h3>

      <div className="flex gap-6 mt-5 mb-2 relative">
        <button
          onClick={() => setSecaoAtiva("dadosPessoais")}
          className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${
            secaoAtiva === "dadosPessoais"
              ? "border-b-2 border-segundaria-900 text-neutral-800"
              : ""
          }`}
        >
          dados pessoais
        </button>
        <button
          onClick={() => setSecaoAtiva("endereco")}
          className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${
            secaoAtiva === "endereco"
              ? "border-b-2 border-segundaria-900 text-neutral-800"
              : ""
          }`}
        >
          endereço
        </button>
        <button
          onClick={() => setSecaoAtiva("dadosProfissionais")}
          className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${
            secaoAtiva === "dadosProfissionais"
              ? "border-b-2 border-segundaria-900 text-neutral-800"
              : ""
          }`}
        >
          dados profissionais
        </button>
        <button
          onClick={() => setSecaoAtiva("dadosAdicionais")}
          className={`text-neutral-600 hover:text-black font-medium transition-colors duration-300 ease-in ${
            secaoAtiva === "dadosAdicionais"
              ? "border-b-2 border-segundaria-900 text-neutral-800"
              : ""
          }`}
        >
          dados adicionais
        </button>
      </div>

      {secaoAtiva === "dadosPessoais" && (
        <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_tipo_documento"
              className="block mb-1 font-medium text-sm text-neutral-700"
            >
              Documento <span className="text-red-600">*</span>
            </label>

            <div className="flex flex-col md:flex-row gap-3 mt-3">
              <label
                htmlFor="func_tipo_documento_fisica"
                className="flex items-center"
              >
                <div
                  className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${
                    func_tipo_documento === "F"
                      ? "border-orange-500 bg-orange-400"
                      : "border-gray-300"
                  }`}
                ></div>
                <input
                  type="radio"
                  value="F"
                  checked={func_tipo_documento === "F"}
                  id="func_tipo_documento_fisica"
                  name="func_tipo_documento"
                  required
                  onChange={(e) => setFunc_tipo_documento(e.target.value)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <span className="font-normal ml-2">Fisíca</span>
              </label>

              <label
                htmlFor="func_tipo_documento_juridica"
                className="flex items-center"
              >
                <div
                  className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${
                    func_tipo_documento === "J"
                      ? "border-orange-500 bg-orange-400"
                      : "border-gray-300"
                  }`}
                ></div>
                <input
                  type="radio"
                  value="J"
                  checked={func_tipo_documento === "J"}
                  id="func_tipo_documento_juridica"
                  name="func_tipo_documento"
                  maxLength={14}
                  onChange={(e) => setFunc_tipo_documento(e.target.value)}
                  className="opacity-0 absolute h-4 w-4"
                />
                <span className="font-normal ml-2">Juridica</span>
              </label>
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            {func_tipo_documento === "F" && (
              <>
                <div>
                  <label
                    htmlFor="cpf"
                    className="block font-medium text-sm text-neutral-700"
                  >
                    CPF <span className="text-red-600">*</span>
                  </label>
                  <input
                    onChange={(e) => {
                      const value = e.target.value;
                      const regex = /^[0-9]*$/;
                      if (value === "" || regex.test(value)) {
                        setFunc_cpf_cnpj(value);
                        setIsInvalidoFuncionarioCpf(false);
                      } else {
                        setIsInvalidoFuncionarioCpf(true);
                      }
                    }}
                    value={func_cpf_cnpj || ""}
                    type="text"
                    id="cpf"
                    name="func_cpf_cnpj"
                    maxLength={11}
                    className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                      isInvalidoFuncionarioCpf
                        ? "outline-red-500 focus:outline-red-500"
                        : ""
                    }`}
                  />
                </div>
              </>
            )}
            {func_tipo_documento === "J" && (
              <div className="relative items-center">
                <label
                  htmlFor="cnpj"
                  className="block font-medium text-sm text-neutral-700"
                >
                  CNPJ <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[0-9]*$/;
                    if (value === "" || regex.test(value)) {
                      setFunc_cpf_cnpj(value);
                      setIsInvalidoFuncionarioCnpj(false);
                      if (value.length === 14) {
                        buscarCNPJ(value);
                      }
                    } else {
                      setIsInvalidoFuncionarioCnpj(true);
                    }
                  }}
                  value={func_cpf_cnpj || ""}
                  type="text"
                  id="cnpj"
                  name="func_cpf_cnpj"
                  maxLength={14}
                  className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                    isInvalidoFuncionarioCnpj
                      ? "outline-red-500 focus:outline-red-500"
                      : ""
                  }`}
                />
                <button
                  onClick={() => buscarCNPJ(func_cpf_cnpj)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-segundaria-900 hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out font-bold py-1 px-2 text-xs lg:text-sm rounded"
                >
                  <SearchIcon fontSize="20px" />
                </button>
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_nome"
              className="block font-medium text-sm text-neutral-700"
            >
              Nome <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[A-Za-z]+$/;
                if (value === "" || regex.test(value)) {
                  setFunc_nome(value);
                  setIsInvalidoFuncionarioNome(false);
                } else {
                  setIsInvalidoFuncionarioNome(true);
                }
              }}
              value={func_nome || ""}
              type="text"
              name="func_nome"
              required
              maxLength={255}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioNome
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>
          
          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_rg_inscricao_estadual"
              className="block font-medium text-sm text-neutral-700"
            >
              RG
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setFunc_rg_inscricao_estadual(value);
                  setIsInvalidoFuncionarioRG(false);
                } else {
                  setIsInvalidoFuncionarioRG(true);
                }
              }}
              value={func_rg_inscricao_estadual || ""}
              type="text"
              name="func_rg_inscricao_estadual"
              maxLength={14}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioRG
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_data_nascimento"
              className="block font-medium text-sm text-neutral-700"
            >
              Data de Nascimento
            </label>
            <input
              onChange={(e) => setFunc_data_nascimento(e.target.value)}
              value={func_data_nascimento || ""}
              type="date"
              name="func_data_nascimento"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioDataNascimento
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_genero"
              className="block font-medium text-sm text-neutral-700"
            >
              Gênero
            </label>
            <div className="flex mt-3 gap-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  value="M"
                  checked={func_genero === "M"}
                  onChange={(e) => setFunc_genero(e.target.value)}
                  id="func_genero_masculino"
                  name="func_genero"
                  className="opacity-0 absolute h-4 w-4"
                />
                <div
                  className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${
                    func_genero === "M"
                      ? "border-orange-500 bg-orange-400"
                      : "border-gray-300"
                  }`}
                ></div>
                <label
                  htmlFor="func_genero_masculino"
                  className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Masculino
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  value="F"
                  checked={func_genero === "F"}
                  onChange={(e) => setFunc_genero(e.target.value)}
                  id="func_genero_feminino"
                  name="func_genero"
                  className="opacity-0 absolute h-4 w-4"
                />
                <div
                  className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${
                    func_genero === "F"
                      ? "border-orange-500 bg-orange-400"
                      : "border-gray-300"
                  }`}
                ></div>
                <label
                  htmlFor="func_genero_feminino"
                  className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Feminino
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  value="O"
                  checked={func_genero === "O"}
                  onChange={(e) => setFunc_genero(e.target.value)}
                  id="func_genero_outro"
                  name="func_genero"
                  className="opacity-0 absolute h-4 w-4"
                />
                <div
                  className={`ml-2 h-4 w-4 rounded-full border bg-gray-100 ${
                    func_genero === "O"
                      ? "border-orange-500 bg-orange-400"
                      : "border-gray-300"
                  }`}
                ></div>
                <label
                  htmlFor="func_genero_outro"
                  className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  Outro
                </label>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_telefone"
              className="block font-medium text-sm text-neutral-700"
            >
              Telefone
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setFunc_telefone(value);
                  setIsInvalidoFuncionarioTelefone(false);
                } else {
                  setIsInvalidoFuncionarioTelefone(true);
                }
              }}
              value={func_telefone || ""}
              type="text"
              name="func_telefone"
              maxLength={11}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioTelefone
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_celular"
              className="block font-medium text-sm text-neutral-700"
            >
              Celular
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setFunc_celular(value);
                  setIsInvalidoFuncionarioCelular(false);
                } else {
                  setIsInvalidoFuncionarioCelular(true);
                }
              }}
              value={func_celular || ""}
              type="text"
              name="func_celular"
              maxLength={11}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioCelular
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_email"
              className="block font-medium text-sm text-neutral-700"
            >
              E-mail
            </label>
            <input
              onChange={(e) => setFunc_email(e.target.value)}
              value={func_email || ""}
              type="email"
              name="func_email"
              maxLength={255}
              placeholder="email@example.com"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioEmail
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

        </div>
      )}

      {secaoAtiva === 'endereco' && (
        <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
          <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
            <label
              htmlFor="func_cep"
              className="block font-medium text-sm text-neutral-700"
            >
              CEP <span className="text-red-600">*</span>
            </label>
            <div className="relative items-center">
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9]*$/;
                  if (value === "" || regex.test(value)) {
                    setFunc_cep(value);
                    setIsInvalidoFuncionarioCep(false);
                    if (value.length === 8) {
                      buscarCEP(value);
                    }
                  } else {
                    setIsInvalidoFuncionarioCep(true);
                  }
                }}
                value={func_cep || ""}
                type="text"
                name="func_cep"
                maxLength={8}
                required
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                  isInvalidoFuncionarioCep
                    ? "outline-red-500 focus:outline-red-500"
                    : ""
                }`}
              />
              <button
                onClick={() => buscarCEP(func_cep)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-segundaria-900 hover:bg-gray-100 active:bg-gray-200 transition duration-300 ease-in-out font-bold py-1 px-2 text-xs lg:text-sm rounded"
              >
                <SearchIcon fontSize="20px" />
              </button>
            </div>
          </div>

          <div className="w-full md:w-4/5 mt-3 mb-4 px-3">
            <label
              htmlFor="func_endereco"
              className="block font-medium text-sm text-neutral-700"
            >
              Logradouro <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setFunc_endereco(value);
                  setIsInvalidoFuncionarioEndereco(false);
                } else {
                  setIsInvalidoFuncionarioEndereco(true);
                }
              }}
              value={func_endereco || ""}
              type="text"
              name="func_endereco"
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioEndereco
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
            <label
              htmlFor="func_bairro"
              className="block font-medium text-sm text-neutral-700"
            >
              Bairro <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setFunc_bairro(value);
                  setIsInvalidoFuncionarioBairro(false);
                } else {
                  setIsInvalidoFuncionarioBairro(true);
                }
              }}
              value={func_bairro || ""}
              type="text"
              name="func_bairro"
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioBairro
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
            <label
              htmlFor="func_numero"
              className="block font-medium text-sm text-neutral-700"
            >
              Número <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setFunc_numero(value);
                  setIsInvalidoFuncionarioNumero(false);
                } else {
                  setIsInvalidoFuncionarioNumero(true);
                }
              }}
              value={func_numero || ""}
              type="text"
              name="func_numero"
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioNumero
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
            <label
              htmlFor="func_complemento"
              className="block font-medium text-sm text-neutral-700"
            >
              Complemento
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[A-Za-z0-9\s]+$/;
                if (value === "" || regex.test(value)) {
                  setFunc_complemento(value);
                  setIsInvalidoFuncionarioComplemento(false);
                } else {
                  setIsInvalidoFuncionarioComplemento(true);
                }
              }}
              value={func_complemento || ""}
              type="text"
              name="func_complemento"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioComplemento
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
            <label
              htmlFor="func_cidade"
              className="block font-medium text-sm text-neutral-700"
            >
              Cidade <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setFunc_cidade(value);
                  setIsInvalidoFuncionarioCidade(false);
                } else {
                  setIsInvalidoFuncionarioCidade(true);
                }
              }}
              value={func_cidade || ""}
              type="text"
              name="func_cidade"
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioCidade
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
            <label  
              htmlFor="func_estado"
              className="block font-medium text-sm text-neutral-700"
            >
              Estado <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setFunc_estado(value);
                  setIsInvalidoFuncionarioEstado(false);
                } else {
                  setIsInvalidoFuncionarioEstado(true);
                }
              }}
              value={func_estado || ""}
              type="text"
              name="func_estado"
              required
              maxLength={2}
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioEstado
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
            <label
              htmlFor="func_pais"
              className="block font-medium text-sm text-neutral-700"
            >
              País <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setFunc_pais(value);
                  setIsInvalidoFuncionarioPais(false);
                } else {
                  setIsInvalidoFuncionarioPais(true);
                }
              }}
              value={func_pais || ""}
              type="text"
              name="func_pais"
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioPais
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>
        </div>
      )}

      {secaoAtiva === 'dadosProfissionais' && (
        <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_cargo"
              className="block font-medium text-sm text-neutral-700"
            >
              Cargo <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[A-Za-z]+$/;
                if (value === "" || regex.test(value)) {
                  setFunc_cargo(value);
                  setIsInvalidoFuncionarioCargo(false);
                } else {
                  setIsInvalidoFuncionarioCargo(true);
                }
              }}
              value={func_cargo || ""}
              type="text"
              name="func_cargo"
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioCargo
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_departamento"
              className="block font-medium text-sm text-neutral-700"
            >
              Departamento <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[A-Za-z]+$/;
                if (value === "" || regex.test(value)) {
                  setFunc_departamento(value);
                  setIsInvalidoFuncionarioDepartamento(false);
                } else {
                  setIsInvalidoFuncionarioDepartamento(true);
                }
              }}
              value={func_departamento || ""}
              type="text"
              name="func_departamento"
              required
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioDepartamento
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_data_admissao"
              className="block font-medium text-sm text-neutral-700"
            >
              Data de Admissão <span className="text-red-600">*</span>
            </label>
            <input
              onChange={(e) => setFunc_data_admissao(e.target.value)}
              value={func_data_admissao || ""}
              type="date"
              name="func_data_admissao"
              required
              className='peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out'
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_data_demissao"
              className="block font-medium text-sm text-neutral-700"
            >
              Data de Demissão
            </label>
            <input
              onChange={(e) => setFunc_data_demissao(e.target.value)}
              value={func_data_demissao || ""}
              type="date"
              name="func_data_demissao"
              className='peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out'
            />
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_salario"
              className="block font-medium text-sm text-neutral-700"
            >
              Salário <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 font-medium">R$</span>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9]*$/;
                  if (value === "" || regex.test(value)) {
                    setFunc_salario(value);
                    setIsInvalidoFuncionarioSalario(false);
                  } else {
                    setIsInvalidoFuncionarioSalario(true);
                  }
                }}
                value={func_salario || ""}
                type="text"
                name="func_salario"
                required
                className={`peer rounded-sm w-full border pl-10 pr-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                  isInvalidoFuncionarioSalario
                    ? "outline-red-500 focus:outline-red-500"
                    : ""
                }`}
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_comissao"
              className="block font-medium text-sm text-neutral-700"
            >
              Comissão
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 font-medium">R$</span>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9]*$/;
                  if (value === "" || regex.test(value)) {
                    setFunc_comissao(value);
                    setIsInvalidoFuncionarioComissao(false);
                  } else {
                    setIsInvalidoFuncionarioComissao(true);
                  }
                }}
                value={func_comissao || ""}
                type="text"
                name="func_comissao"
                className={`peer rounded-sm w-full border pl-10 pr-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                  isInvalidoFuncionarioComissao
                    ? "outline-red-500 focus:outline-red-500"
                    : ""
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {secaoAtiva === 'dadosAdicionais' && (
        <div className='flex flex-wrap my-4 transition-transform duration-500 ease-in'>
          <div className="w-full md:w-1/2 mt-3 mb-4 px-3">
            <label
              htmlFor="func_observacoes"
              className="block font-medium text-sm text-neutral-700"
            >
              Observações
            </label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[A-Za-z0-9]+$/;
                if (value === "" || regex.test(value)) {
                  setFunc_observacoes(value);
                  setIsInvalidoFuncionarioObservacoes(false);
                } else {
                  setIsInvalidoFuncionarioObservacoes(true);
                }
              }}
              value={func_observacoes || ""}
              type="text"
              name="func_observacoes"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${
                isInvalidoFuncionarioObservacoes
                  ? "outline-red-500 focus:outline-red-500"
                  : ""
              }`}
            />
          </div>
        </div>
      )}
    </div>

    <div className="w-60 flex justify-start gap-3 my-9 px-4">
      <BtnActions title="Criar" onClick={handleCriar} color="ativado" />
    </div>

    {statusRequest === true && (
      <SuccessNotification message="Funcionaio criado com sucesso!" />
    )}
    {statusRequest === false && (
      <ErrorNotification message="Não foi possível criar o funcionario!" />
    )}
  </>);
}
export default FormCriarFuncionarios;