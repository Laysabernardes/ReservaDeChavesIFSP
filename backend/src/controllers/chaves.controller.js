const ChavesServices = require("../services/chaves.service.js");
const services = new ChavesServices();

class ChavesController {
    create = async (req, res) => {
        try {//constante que verifica todos os campos
            const { nm_chave, ds_chave, ds_status, ds_obs_chave } = req.body;
            
            if (!nm_chave || !ds_chave || !ds_status) {
                res.status(400).send({ message: "Preencha todos os espaços" });
            }
            
            //await é usado junto com async
            await services.create(nm_chave, ds_chave, ds_status, ds_obs_chave);

            res.status(201).send({
                message: "Chave criada com sucesso!",
                chave: {
                    nm_chave,
                    ds_chave,
                    ds_status,
                    ds_obs_chave
                }
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    };

    find = async (req, res) => {
        try {//constante que verifica todos os campos
            const { cd_chave } = req.params;

            if (!cd_chave) {
                res.status(400).send({ message: "Adicione o código da chave!" });
            }

            //await é usado junto com async
            let chave = await services.find(cd_chave);

            res.status(201).send({
                message: "Chave:",
                chave: chave
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    };

    findAll = async (req, res) => {
        try {
            const chaves = await services.findAll();

            if (chaves.length === 0) {
                return res.status(400).send({ message: "Não existe nenhum local registrado" });
            }
            res.send(chaves);
        } catch (err) {
            res.status(500).send({ message: err.message })
        }
    };

    findByCategoria = async (req, res) => {
        try {
            const { ds_chave } = req.params;
            console.log('Parâmetros recebidos:', { ds_chave });
    
            if (!ds_chave) {
                res.status(400).send({ message: "Adicione uma chave válida!" });
                return;
            }
    
            console.log('Parâmetros recebidos:', { ds_chave });
            let chave = await services.findByCategoria(ds_chave);
    
            // console.log('Chave encontrada:', chave);
            
            if (chave.error) {
                res.status(404).send({ message: 'Chave não encontradaaa.' });
            } else {
                res.status(200).send({
                    message: "Chave:",
                    chave: chave
                });
            }
        } catch (err) {
            console.error('Erro na função findByCategoria:', err);
            res.status(500).send({ message: err.message });
        }
    }

    findByStatus = async (req, res) => {
        try {
            const { ds_status } = req.params;
            console.log('Parâmetros recebidos:', { ds_status });
    
            if (!ds_status) {
                res.status(400).send({ message: "Adicione um parâmetro!" });
                return;
            }
    
            console.log('Parâmetros recebidos:', { ds_status });
            let chave = await services.findByStatus(ds_status);
    
            console.log('Chave encontrada:', chave);
            
            if (chave.error) {
                res.status(404).send({ message: 'Chave não encontradaaa.' });
            } else {
                res.status(200).send({
                    message: "Chave:",
                    chave: chave
                });
            }
        } catch (err) {
            console.error('Erro na função findByCategoria:', err);
            res.status(500).send({ message: err.message });
        }
    }
    
    findByNome = async (req, res) => {
        try {
            const { nm_chave } = req.params;
            console.log('Parâmetros recebidos:', { nm_chave });
    
            if (!nm_chave) {
                res.status(400).send({ message: "Adicione um parâmetro!" });
                return;
            }
    
            console.log('Parâmetros recebidos:', { nm_chave });
            let chave = await services.findByNome(nm_chave);
                
            if (chave.error) {
                res.status(200).send({ message: 'Chave não encontrada.' });
            } else {
                res.status(200).send({
                    message: "Chave:",
                    chave: chave
                });
            }
        } catch (err) {
            console.error('Erro na função findByNome:', err);
            res.status(500).send({ message: err.message });
        }
    }

    update = async (req, res) => {
        try {//constante que verifica todos os campos
            const { cd_chave, ds_status } = req.body;

            if (!cd_chave || !ds_status) {
                res.status(400).send({ message: "Preencha os campos!" });
            }

            //await é usado junto com async
            await services.update(cd_chave, ds_status);


            res.status(201).send({
                message: "Chave Status Update:",
                status: ds_status
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    };

    delete = async (req, res) => {
        try {
            const { cd_chave } = req.params;

            if (!cd_chave) {
                res.status(400).send({ message: "Adicione o código da chave!" });
            }

            //await é usado junto com async
            let chave = await services.delete(cd_chave);

            res.status(201).send({
                message: "Chave:",
                chave: chave
            });
        } catch (err) {
            res.status(500).send({ message: err });
        }
    }
};

module.exports = ChavesController;