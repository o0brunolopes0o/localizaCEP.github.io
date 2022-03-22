function limpaFormularioCep(){
  //LIMPA VALORES DO FORMULÁRIO
  document.getElementById('rua').value=("");
  document.getElementById('bairro').value=("");
  document.getElementById('cidade').value=("");
  document.getElementById('uf').value=("");
  document.getElementById('ibge').value=("");
}

  function meu_callback(conteudo){
    if (!("erro" in conteudo)){
      // ATUALIZA OS CAMPOS COM OS VALORES
      document.getElementById('rua').value=(conteudo.logradouro);
      document.getElementById('bairro').value=(conteudo.bairro);
      document.getElementById('cidade').value=(conteudo.localidade);
      document.getElementById('uf').value=(conteudo.uf);
      document.getElementById('ibge').value=(conteudo.ibge);
    } //end if
    else{
      //CEP NÃO ENCONTRADO
      limpaFormularioCep();
      alert("CEP não encontrado.");
    }
  } 

  function pesquisaCep(valor){
    //NOVA VARIAVEL CEP SOMENTE COM DÍGITOS
    let cep = valor.replace(/\D/g, '');

    //VERIFICA SE O CAMPO CEP POSSUI VALOR INFORMADO
    if (cep != ""){
      //EXPRESSAO REGULAR PARA VALIDAE O CEP
      let validaCep = /^[0-9]{8}$/;

      //VALIDA FORMATO DO CEP
      
      if (validaCep.test(cep)){
      //PREENCHE OS CAMPO COM "LOCALIZANDO..."
      document.getElementById('rua').value="localizando...";
      document.getElementById('bairro').value="localizando...";
      document.getElementById('cidade').value="localizando...";
      document.getElementById('uf').value="localizando...";
      document.getElementById('ibge').value="localizando...";

      //CRIA UM ELEMENTO JAVASCRIPT
      let script = document.createElement('script');

      //SINCRONIZA COM O CALLBACK
      script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

      //INSERE SCRIPT NO DOCUMENTO E CARREGA CONTEUDO
      document.body.appendChild(script)

      } // END IF
      else {
        //CEP INVALIDO
        limpaFormularioCep();
        alert('Formato de CEP inválido')
      }
    } //END IF
    else {
      //CEP SEM VALOR, LIMPAR
      limpaFormularioCep();
    }
  };