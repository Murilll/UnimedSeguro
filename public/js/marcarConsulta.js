function excluirDia(consultas) {
    consultas.forEach(c => {
        let today = c.Data;
        console.log(today)
        today = today.split('T')[0];
        console.log(today);
        document.getElementsByName("date")[0].setAttribute(today);
    });  
}
