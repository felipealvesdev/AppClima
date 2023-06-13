const apiKey = `456165af1a0e7545d7d46530a7190936`
let cityName = document.querySelector(".form-control");
const pesquisar = document.querySelector("#pesquisar");
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

pesquisar.addEventListener("click", ()=>{
    //    cityName = cityName.value;
    const city = cityName.value;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    console.log(city);
    buscarClima();
})
document.addEventListener('keypress', function(e){
    if(e.which == 13){
       //console.log('a tecla enter foi pressionada');
       const city = cityName.value;
       url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
       console.log(city);
       buscarClima();
    }
}, false);

function buscarClima(){
     fetch(url).then((response)=>{
        response.json()
        .then((data)=>{
            console.log(data);
            mostrarClima(data);
            cityName.value = ""; // Aqui fará com que o input seja zerado a cada vez que for feito uma pesquisa
        }).catch((erro)=>{
            console.log(erro);
            mostrandoErro();
        })
    })
}

function mostrarClima(dados){
    // RESGATANDO INFORMACOES DA API
    const conteudo = document.querySelector(".conteudo");
    const bandeira = document.querySelector(".bandeira");
    const temperatura = document.querySelector(".temperatura");
    const tempMaxMin = document.querySelector(".temperatura-max-min");
        // TEMPERATURAS 
            temperaturaAtual = Number(dados.main.temp) - 273.15;
            temperaturaAtual = temperaturaAtual.toFixed(0);

            temperaturaMaxima = Number(dados.main.temp_max) - 273.15;
            temperaturaMaxima = temperaturaMaxima.toFixed(0);

            temperaturaMinima = Number(dados.main.temp_min) - 273.15;
            temperaturaMinima = temperaturaMinima.toFixed(0);

            sensacaoTermica = Number(dados.main.feels_like) - 273.15;
            sensacaoTermica = sensacaoTermica.toFixed(0);
        // HUMIDADE
            humidade = dados.main.humidity;

        // LATITUDE E LONGITUDE

            latitude = dados.coord.lat;
            longitude = dados.coord.lon;
        // HORARIO CONVERTENDO UNIX TIMESTAMP 1970
            // HORÁRIO LOCAL
                //let horaLocal = dados.timezone + 10800;
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            const dt = dados.dt;
            console.log(`O VALOR DE localTimeStamp é ${dt}`);

            let dateLocal = new Date((dt + dados.timezone + 10800) * 1000)

            // Hours part from the timestamp
            let horasLocal = dateLocal.getHours();
            // Minutes part from the timestamp
            let minutosLocal = "0" + dateLocal.getMinutes();
            // Seconds part from the timestamp
            let segundosLocal = "0" + dateLocal.getSeconds();

            // Will display time in 10:30:23 format
            let horarioFormatadoLocal = horasLocal + ':' + minutosLocal.substr(-2) + ':' + segundosLocal.substr(-2);

            //NASCER DO SOL
                
                let nascerSol = dados.sys.sunrise + dados.timezone + 10800;
                // Create a new JavaScript Date object based on the timestamp
                // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                
                let dateNascer = new Date((nascerSol) * 1000);
                // Hours part from the timestamp
                let horasNascer = dateNascer.getHours();
                // Minutes part from the timestamp
                let minutosNascer = "0" + dateNascer.getMinutes();
                // Seconds part from the timestamp
                let segundosNascer = "0" + dateNascer.getSeconds();

                // Will display time in 10:30:23 format
                let horarioFormatadoNascer = horasNascer + ':' + minutosNascer.substr(-2) + ':' + segundosNascer.substr(-2);
                /*
                const sunrise = new Date((dados.sys.sunrise + dados.timezone + 10800) * 1000);
                let horarioFormatadoNascer = sunrise.getHours() + ':' + sunrise.getMinutes()+ ':' + sunrise.getSeconds();
                */
            // POR DO SOL
    
                let porSol = dados.sys.sunset + dados.timezone + 10800;
                // Create a new JavaScript Date object based on the timestamp
                // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                let datePor = new Date(porSol * 1000);
                // Hours part from the timestamp
                let horasPor = datePor.getHours();
                // Minutes part from the timestamp
                let minutosPor = "0" + datePor.getMinutes();
                // Seconds part from the timestamp
                let segundosPor = "0" + datePor.getSeconds();

                // Will display time in 10:30:23 format
                let horarioFormatadoPor = horasPor + ':' + minutosPor.substr(-2) + ':' + segundosPor.substr(-2);
            
            //VELOCIDADE DO VENTO

                let velocidadeVento = dados.wind.speed;


    // INSERINDO NO HTML
    temperatura.innerHTML = `<p> ${temperaturaAtual}<sup>ºC</sup></p>`

    tempMaxMin.innerHTML = `<p>${cityName.value}<br></p>
                            <p>  Máx: ${temperaturaMaxima}ºC / Min: ${temperaturaMinima}ºC<br></p>
                            <p>Sensação térmica: ${sensacaoTermica}ºC</p>
                            `

    conteudo.innerHTML = `  <p>Horário local: ${horarioFormatadoLocal}<br>(Horário pode diferenciar um pouco devido às atualizações do servidor)<br></p>
                            <p>A humidade de ${cityName.value} é: ${humidade}%</p>
                            <p>A latitude de ${cityName.value} é de: ${latitude}</p>
                            <p>A longitude de ${cityName.value} é de: ${longitude}</p>
                            <p>O nascer do sol em ${cityName.value} é de: ${horarioFormatadoNascer}</p>
                            <p>Pôr do sol em ${cityName.value} é de: ${horarioFormatadoPor}</p>
                            <p>Velocidade do vento em ${cityName.value} é de: ${velocidadeVento}m/s</p>
                            `
    bandeira.innerHTML = `  <p class ="dimensionarBandeira"><img src="https://flagsapi.com/${dados.sys.country}/flat/64.png"></p>
                            <p><img src="https://openweathermap.org/img/wn/${dados.weather[0].icon}@4x.png"</p>
                            `
}

    

function mostrandoErro(){
    const conteudo = document.querySelector(".conteudo");
    conteudo.innerHTML = `A cidade de ${cityName.value} não foi encontrada. Por favor, tente outra localização.`
}
