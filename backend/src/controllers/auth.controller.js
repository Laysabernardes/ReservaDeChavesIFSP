const { loginService } = require("../services/auth.service.js");
// Importa o serviço de autenticação "loginService".

// Função para processar o login do usuário.
const login = async (req, res) => {
    const { prontuario, password } = req.body;
    // Extrai o email e senha da solicitação.

    try {
        const user = await loginService(prontuario);
        // Pesquisa um usuário com base no prontuario fornecido.

        if (!user) {
            return res.status(404).send({ message: "Usuário ou senha não encontrados." });
        }

        // Compara a senha fornecida no login com a senha armazenada no banco de dados (em texto simples).
        if (password !== user.password) {
            // Se as senhas não coincidirem, retorna uma resposta de erro com status 404.
            return res.status(404).send({ message: "Usuário ou senha não encontrados." });
        }

        // Verifica a categoria do usuário
        const categoria = user.categoria;
        

        // Se o login for bem-sucedido, envia uma resposta indicando que o login está ok.
        res.status(200).send({ message: "Login bem-sucedido", categoria });

    } catch (err) {
        res.status(500).send(err.message);
    };
};

module.exports = { login };//Exportando um obejto desconstruido, só a função.