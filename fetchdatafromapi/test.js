async function fetchData() {
    try {
        const name = document.getElementById("pokimonName").value.toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (!response.ok) {
            throw new Error("Pokemon Not Found!");
        }

        const data = await response.json();

        const pokemonSprite = data.sprites.front_default;
        const pokemonImg = document.getElementById("pokimonimg");

        pokemonImg.src = pokemonSprite;
        pokemonImg.style.display = "block";

    } catch (error) {
        console.error(error);
        alert("Pokemon not found! Try again.");
    }
}

document.getElementById("submit").addEventListener("click", fetchData);
