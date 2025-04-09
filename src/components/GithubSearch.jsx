import { useState } from 'react';
import styles from './GithubSearch.module.css';

const GithubSearch = () => {
  const [data, setData] = useState(null); // Estado para armazenar os dados do usuário
  const [user, setUser] = useState(""); // Estado para o input do usuário
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const [loading, setLoading] = useState(false); // Estado para exibir "Carregando..."

  const searchUser = async () => {
    if (user.trim() === "") return; // Impede buscas vazias

    setData(null);
    setError("");
    setLoading(true); // Ativa carregamento antes da busca

    try {
      const response = await fetch(`https://api.github.com/users/${user}`); // 🔥 Sem autenticação

      if (!response.ok) throw new Error("Usuário não encontrado!");

      const result = await response.json();

      // Simula tempo de carregamento artificial antes de exibir os dados
      await new Promise(resolve => setTimeout(resolve, 1000));

      setData(result);
    } catch {
      setError("Usuário não encontrado!");
    } finally {
      setLoading(false); // Finaliza carregamento corretamente
    }
  };

  return (
    <div className="flex flex-col justify-start items-center gap-8 w-[1156px] h-[537px] bg-black p-[34px] mx-auto">
      <div className="flex flex-row justify-between items-center gap-[10px] w-[384px] h-[82px]">
        <img className="w-58px" src="src/assets/imgs/githublogo.svg" alt="GitHub Logo" />
        <p className="font-nunito text-[60px] font-semibold text-white">Perfil</p>
        <img className="w-[160px] h-[45px]" src="src/assets/imgs/github.svg" alt="GitHub" />
      </div>

      <div className="flex flex-row items-center bg-gray-300 rounded-[10px] p-[1px] gap-[1px]">
        <input 
          className="w-[503px] h-[62px] rounded-[10px] bg-transparent font-nunito font-semibold text-[20px] text-black pl-[15px] border-none focus:outline-none focus:border-none"
          type="text" 
          placeholder="Digite um usuário do GitHub" 
          value={user} 
          onChange={(e) => setUser(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchUser()}
        />
        <button className="flex justify-center items-center w-[62px] h-[62px] rounded-[10px] bg-[#005CFF] border border-gray-300" onClick={searchUser}>
          <img src="src/assets/imgs/Lupa.svg" alt="Buscar" />
        </button>
      </div>

      {/* Exibe mensagem de carregamento enquanto busca */}
      {loading && <p className="text-[18px] font-bold text-center text-white bg-gradient-to-r from-[#005CFF] to-[#00D4FF] p-[10px] px-[20px] rounded-[8px] shadow-lg animate-pulse">Carregando...</p>}

      {/* Exibe mensagem de erro caso o usuário não seja encontrado */}
      {error && (
        <div className={styles.profileContainerError}>
          <p className="font-nunito font-normal text-[20px] text-center text-red-500">Nenhum perfil foi encontrado com esse nome de usuário.<br/>Tente novamente.</p>
        </div>
      )}

      {/* Exibe os dados do perfil apenas se houver informações */}
      {data && !loading && (
        <div className={styles.profileContainer}>
          <div className="w-[220px] h-[220px] border-[2px] border-[#005CFF] rounded-full overflow-hidden flex items-center justify-center">
            <img className="min-w-full h-auto object-cover" src={data.avatar_url} alt="Avatar do GitHub" />
          </div>
          <div className="w-[448px] flex flex-col items-start">
            <p className="font-nunito font-bold text-[20px] text-[#005CFF]">{data.login}</p>
            <p className="font-nunito font-light text-[15px] text-black text-justify">{data.bio ? data.bio : "Nenhuma descrição disponível"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubSearch;