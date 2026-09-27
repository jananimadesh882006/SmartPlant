const plants = [
    {
        id: 1,
        name: "Snake Plant",
        scientific: "Sansevieria trifasciata",
        image: "https://images.unsplash.com/photo-1593482892290-f54927ae1c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        difficulty: "beginner",
        light: "low",
        water: "Low (every 2-3 weeks)",
        soil: "Well-draining, cactus mix",
        temperature: "65°F-85°F (18°C-30°C)",
        desc: "Nearly indestructible, the Snake Plant thrives on neglect and purifies the air."
    },
    {
        id: 2,
        name: "Monstera Deliciosa",
        scientific: "Monstera deliciosa",
        image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        difficulty: "beginner",
        light: "bright",
        water: "Medium (every 1-2 weeks)",
        soil: "Peat-based potting soil",
        temperature: "65°F-85°F (18°C-30°C)",
        desc: "Famous for its natural leaf holes, it's a stunning tropical plant that grows quickly."
    },
    {
        id: 3,
        name: "Fiddle Leaf Fig",
        scientific: "Ficus lyrata",
        image: "https://images.unsplash.com/photo-1597055905081-8f983173e15f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        difficulty: "advanced",
        light: "bright",
        water: "Medium (when top 2 inches dry)",
        soil: "Well-draining premium potting mix",
        temperature: "65°F-75°F (18°C-24°C)",
        desc: "A popular statement plant with large, violin-shaped leaves. Can be finicky about its environment."
    },
    {
        id: 4,
        name: "ZZ Plant",
        scientific: "Zamioculcas zamiifolia",
        image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        difficulty: "beginner",
        light: "low",
        water: "Low (every 2-3 weeks)",
        soil: "Standard potting mix with perlite",
        temperature: "65°F-75°F (18°C-24°C)",
        desc: "Tolerates low light and irregular watering. Its glossy leaves make it a beautiful addition."
    },
    {
        id: 5,
        name: "Pothos",
        scientific: "Epipremnum aureum",
        image: "https://images.unsplash.com/photo-1646271971714-c15c2ec0f43a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        difficulty: "beginner",
        light: "bright",
        water: "Medium (when top inch dry)",
        soil: "Any well-draining soil",
        temperature: "70°F-90°F (21°C-32°C)",
        desc: "A trailing vine that's incredibly easy to grow and propagate."
    },
    {
        id: 6,
        name: "Calathea Orbifolia",
        scientific: "Calathea orbifolia",
        image: "https://images.unsplash.com/photo-1620127807580-1a6bb52e8055?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        difficulty: "intermediate",
        light: "bright",
        water: "High (keep consistently moist)",
        soil: "Moisture-retaining mix",
        temperature: "65°F-80°F (18°C-27°C)",
        desc: "Stunning oversized leaves with silvery stripes. Requires high humidity to prevent crispy edges."
    }
];

const myPlants = [
    plants[0], plants[4] // Snake plant and Pothos
];

// App State & Methods
const app = {
    init() {
        this.bindEvents();
        this.renderPlantLibrary(plants);
        this.renderMyPlants();
    },

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target.getAttribute('data-target');
                this.navigate(target);
                
                // Close mobile menu if open
                document.querySelector('.nav-links').classList.remove('show');
            });
        });

        // Mobile Menu Toggle
        document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('show');
        });

        // Search & Filter
        document.getElementById('plant-search').addEventListener('input', this.filterPlants.bind(this));
        document.getElementById('filter-difficulty').addEventListener('change', this.filterPlants.bind(this));
        document.getElementById('filter-light').addEventListener('change', this.filterPlants.bind(this));

        // Symptom Checker
        document.querySelectorAll('.symptom-tag').forEach(tag => {
            tag.addEventListener('click', (e) => this.toggleSymptom(e.target));
        });

        // Chatbot
        document.getElementById('chat-send').addEventListener('click', this.sendChatMessage.bind(this));
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendChatMessage();
        });

        // Care schedule checks
        document.querySelectorAll('.btn-check').forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('completed');
                const icon = this.querySelector('i');
                if(this.classList.contains('completed')) {
                    this.parentElement.style.opacity = '0.5';
                } else {
                    this.parentElement.style.opacity = '1';
                }
            });
        });
    },

    navigate(targetId) {
        // Update active link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            }
        });

        // Show target section
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
        window.scrollTo(0,0);
    },

    createPlantCard(plant, isMyPlant = false) {
        return `
            <div class="card plant-card">
                <img src="${plant.image}" alt="${plant.name}">
                <div class="plant-card-content">
                    <h3>${plant.name}</h3>
                    <p style="font-style: italic; color: var(--clr-text-light); font-size: 0.9rem; margin-bottom: 1rem;">${plant.scientific}</p>
                    <div class="tags">
                        <span class="tag"><i class="fa-solid fa-sun"></i> ${plant.light}</span>
                        <span class="tag"><i class="fa-solid fa-seedling"></i> ${plant.difficulty}</span>
                    </div>
                    <p style="margin-bottom: 1rem; flex: 1;">${plant.desc}</p>
                    <div style="font-size: 0.9rem; color: var(--clr-text-light); margin-bottom: 1rem;">
                        <div><strong>Water:</strong> ${plant.water}</div>
                        <div><strong>Soil:</strong> ${plant.soil}</div>
                        <div><strong>Temp:</strong> ${plant.temperature}</div>
                    </div>
                    ${isMyPlant ? 
                        `<button class="btn btn-outline" style="width: 100%; justify-content: center;">Care Details</button>` : 
                        `<button class="btn btn-primary" style="width: 100%; justify-content: center;"><i class="fa-solid fa-plus"></i> Add to My Plants</button>`
                    }
                </div>
            </div>
        `;
    },

    renderPlantLibrary(plantsData) {
        const grid = document.getElementById('plant-library-grid');
        if (plantsData.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No plants found matching your criteria.</p>';
            return;
        }
        grid.innerHTML = plantsData.map(p => this.createPlantCard(p)).join('');
    },

    renderMyPlants() {
        const grid = document.getElementById('my-plants-grid');
        grid.innerHTML = myPlants.map(p => this.createPlantCard(p, true)).join('');
    },

    filterPlants() {
        const search = document.getElementById('plant-search').value.toLowerCase();
        const difficulty = document.getElementById('filter-difficulty').value;
        const light = document.getElementById('filter-light').value;

        const filtered = plants.filter(p => {
            const matchSearch = p.name.toLowerCase().includes(search) || p.scientific.toLowerCase().includes(search);
            const matchDiff = difficulty === 'all' || p.difficulty === difficulty;
            const matchLight = light === 'all' || p.light === light;
            return matchSearch && matchDiff && matchLight;
        });

        this.renderPlantLibrary(filtered);
    },

    toggleSymptom(element) {
        element.classList.toggle('selected');
        
        const selectedSymptoms = Array.from(document.querySelectorAll('.symptom-tag.selected'))
                                    .map(el => el.textContent);
        
        const resultCard = document.getElementById('diagnosis-result');
        const resultText = document.getElementById('diagnosis-text');

        if (selectedSymptoms.length === 0) {
            resultCard.classList.add('hidden');
            return;
        }

        resultCard.classList.remove('hidden');
        
        // Simple logic for dummy diagnosis
        if (selectedSymptoms.includes('Yellow Leaves') && selectedSymptoms.includes('Drooping')) {
            resultText.innerHTML = "<strong>Likely Cause: Overwatering.</strong><br>Check the soil. If it's soggy, let it dry out completely before watering again. Ensure your pot has drainage holes.";
        } else if (selectedSymptoms.includes('Brown Tips')) {
            resultText.innerHTML = "<strong>Likely Cause: Low Humidity or Inconsistent Watering.</strong><br>Try misting your plant or grouping it with others. Also ensure you aren't letting it dry out too much between waterings.";
        } else if (selectedSymptoms.includes('Pests')) {
            resultText.innerHTML = "<strong>Likely Cause: Infestation.</strong><br>Isolate the plant immediately. Wipe leaves with diluted neem oil or insecticidal soap.";
        } else {
            resultText.innerHTML = "<strong>Observation:</strong><br>These symptoms can be caused by environmental stress. Ensure your plant is getting appropriate light and water according to its specific care guide.";
        }
    },

    sendChatMessage() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;

        const messagesContainer = document.getElementById('chat-messages');

        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = text;
        messagesContainer.appendChild(userMsg);

        input.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Simulate bot response
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot';
            
            // Simple keyword-based dummy bot
            const lowerText = text.toLowerCase();
            if (lowerText.includes('water') && lowerText.includes('how often')) {
                botMsg.textContent = "It depends on the plant! Succulents need watering every 2-3 weeks, while tropicals like Calatheas prefer soil that stays slightly moist. Always check the top inch of soil first.";
            } else if (lowerText.includes('yellow')) {
                botMsg.textContent = "Yellow leaves usually indicate overwatering, but it can also be a sign of poor drainage or lack of nutrients. Check the soil moisture first!";
            } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
                botMsg.textContent = "Hi there! I'm here to help with any plant care questions you have.";
            } else {
                botMsg.textContent = "That's an interesting question! For specific advice, make sure to check out our Plant Library or use the Symptom Checker above.";
            }

            messagesContainer.appendChild(botMsg);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
    }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
