// Centraliza o mapa no Rio Grande do Sul
var map = L.map('map').setView([-30.0346, -51.2177], 7);

// Adiciona a camada de tiles (visualização) do mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Lista de cidades com coordenadas
var cities = [
    { name: "Porto Alegre", coords: [-30.0346, -51.2177] },
    { name: "Caxias do Sul", coords: [-29.1677, -51.1794] },
    { name: "Pelotas", coords: [-31.7654, -52.3371] },
    { name: "Santa Maria", coords: [-29.6868, -53.8149] },
    { name: "Passo Fundo", coords: [-28.2628, -52.4064] }
];

// Função para adicionar marcadores com informações climáticas
cities.forEach(city => {
    var marker = L.marker(city.coords).addTo(map)
        .bindPopup(`<b>${city.name}</b><br>Carregando clima...`);

    // Solicita dados meteorológicos da API
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords[0]}&lon=${city.coords[1]}&appid=2563b223b4c18281d68a008f9f1e6d70&units=metric&lang=pt_br`)
        .then(response => response.json())
        .then(data => {
            // Atualiza o conteúdo do popup com as informações meteorológicas
            var weatherInfo = `${data.weather[0].description}, ${data.main.temp}°C`;
            marker.getPopup().setContent(`<b>${city.name}</b><br>${weatherInfo}`);
        })
        .catch(error => console.error("Erro ao obter dados meteorológicos:", error));
});