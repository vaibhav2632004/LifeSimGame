document.addEventListener("DOMContentLoaded", function () {
    let age = 0;
    let eventIndex = 0;
    let happiness = 80, health = 75, smarts = 90; // Match initial values from HTML

    // Select HTML elements
    const story = document.getElementById("story");
    const ageButton = document.querySelector(".age-btn");
    const choicesContainer = document.getElementById("choices-container");
    const choiceText = document.getElementById("choice-text");
    const yesBtn = document.getElementById("choice-yes");
    const noBtn = document.getElementById("choice-no");

    const statBars = document.querySelectorAll(".stat-bar");
    const statValues = document.querySelectorAll(".stat span");

    // Events per age
    const eventsByAge = {
        0: [
        { text: "You were born!", stats: { happiness: 10, health: 10, smarts: 5 } },
        { text: "Your parents welcomed you warmly.", stats: { happiness: 5 } },
        { text: "You received your first vaccinations.", stats: { health: 5 } },
        { text: "Smile at visitors?", choice: true, yes: { happiness: 5 }, no: { happiness: -2 } },
        { text: "Did you sleep peacefully?", choice: true, yes: { health: 5 }, no: { happiness: -3 } }
    ],
    1: [
        { text: "You said your first word!", stats: { smarts: 5 } },
        { text: "You took your first steps!", stats: { health: 5 } },
        { text: "You celebrated your first birthday!", stats: { happiness: 5 } },
        { text: "Eat vegetables willingly?", choice: true, yes: { health: 5 }, no: { happiness: -3 } },
        { text: "Take regular naps?", choice: true, yes: { health: 5 }, no: { happiness: -2 } }
    ],
    2: [
        { text: "You started running around the house.", stats: { health: 5 } },
        { text: "You started talking in short sentences.", stats: { smarts: 5 } },
        { text: "You made your first friend!", stats: { happiness: 5 } },
        { text: "Share toys with your friend?", choice: true, yes: { happiness: 5 }, no: { smarts: 3 } },
        { text: "Throw a tantrum when denied candy?", choice: true, yes: { happiness: -5 }, no: { smarts: 2 } }
    ],
    3: [
        { text: "You started preschool!", stats: { smarts: 5 } },
        { text: "You played with other kids at school.", stats: { happiness: 5 } },
        { text: "You drew your first picture.", stats: { smarts: 3 } },
        { text: "Listen to teacher carefully?", choice: true, yes: { smarts: 5 }, no: { happiness: -3 } },
        { text: "Fight with another kid?", choice: true, yes: { happiness: -5, health: -3 }, no: { smarts: 2 } }
    ],
    4: [
        { text: "You learned how to ride a tricycle!", stats: { health: 5 } },
        { text: "You visited the zoo with family.", stats: { happiness: 5 } },
        { text: "You started learning numbers and letters.", stats: { smarts: 5 } },
        { text: "Try eating broccoli?", choice: true, yes: { health: 5 }, no: { happiness: -3 } },
        { text: "Play outside more or watch TV?", choice: true, yes: { health: 5 }, no: { smarts: -3 } }
    ],
    5: [
        { text: "You started primary school!", stats: { smarts: 5 } },
        { text: "You made more friends at school.", stats: { happiness: 5 } },
        { text: "You had your first school test.", stats: { smarts: 5 } },
        { text: "Join a sports club?", choice: true, yes: { health: 5 }, no: { happiness: -3 } },
        { text: "Practice reading at home?", choice: true, yes: { smarts: 5 }, no: { happiness: -3 } }
    ],
    10: [
        { text: "You turned 10 years old!", stats: { happiness: 5 } },
        { text: "You started learning multiplication and division.", stats: { smarts: 5 } },
        { text: "You joined a summer camp.", stats: { happiness: 5, health: 5 } },
        { text: "Start a new hobby?", choice: true, yes: { happiness: 5 }, no: { smarts: -3 } },
        { text: "Study hard for school?", choice: true, yes: { smarts: 5 }, no: { happiness: -3 } }
    ],
    15: [
        { text: "You started high school!", stats: { smarts: 5 } },
        { text: "You made new friends!", stats: { happiness: 5 } },
        { text: "You had your first school dance.", stats: { happiness: 5 } },
        { text: "Try smoking?", choice: true, yes: { health: -10 }, no: { smarts: 5 } },
        { text: "Start a part-time job?", choice: true, yes: { happiness: 5, smarts: 5 }, no: { health: -2 } }
    ],
    18: [
        { text: "You turned 18 and became an adult!", stats: { happiness: 5 } },
        { text: "You graduated high school.", stats: { smarts: 5 } },
        { text: "You got your first driver's license!", stats: { happiness: 5, smarts: 3 } },
        { text: "Go to college or work?", choice: true, yes: { smarts: 10 }, no: { happiness: 5 } },
        { text: "Start saving money?", choice: true, yes: { smarts: 5 }, no: { happiness: -3 } }
    ],
    20: [
        { text: "You turned 20!", stats: { happiness: 5 } },
        { text: "You started college or your first job.", stats: { smarts: 5 } },
        { text: "You moved out and lived alone.", stats: { happiness: 5 } },
        { text: "Make a financial plan?", choice: true, yes: { smarts: 5 }, no: { happiness: -3 } },
        { text: "Start exercising regularly?", choice: true, yes: { health: 5 }, no: { happiness: -3 } }
    ]
        // More ages can be added similarly...
    };

    function updateStats(stats) {
        happiness = Math.max(0, Math.min(100, happiness + (stats.happiness || 0)));
        health = Math.max(0, Math.min(100, health + (stats.health || 0)));
        smarts = Math.max(0, Math.min(100, smarts + (stats.smarts || 0)));

        statBars[0].style.width = `${happiness}%`;
        statValues[0].innerText = `${happiness}%`;

        statBars[1].style.width = `${health}%`;
        statValues[1].innerText = `${health}%`;

        statBars[2].style.width = `${smarts}%`;
        statValues[2].innerText = `${smarts}%`;
    }

    function addStory(text) {
        const eventHTML = `<p><strong>Age: ${age} years</strong></p><p>${text}</p>`;
        story.innerHTML = eventHTML + story.innerHTML;
    }

    function nextEvent() {
        if (!eventsByAge[age]) {
            addStory("A quiet year passed.");
            age++;
            eventIndex = 0;
            return;
        }

        if (eventIndex >= eventsByAge[age].length) {
            age++;
            eventIndex = 0;
        }

        const event = eventsByAge[age][eventIndex++];
        if (!event) {
            addStory("Nothing special happened this year.");
            return;
        }

        if (event.choice) {
            choiceText.textContent = event.text;
            choicesContainer.style.display = "block";

            yesBtn.onclick = function () {
                addStory(event.text + " You chose YES.");
                updateStats(event.yes);
                choicesContainer.style.display = "none";
            };

            noBtn.onclick = function () {
                addStory(event.text + " You chose NO.");
                updateStats(event.no);
                choicesContainer.style.display = "none";
            };
        } else {
            addStory(event.text);
            updateStats(event.stats);
        }
    }

    // Start the game with the first event
    addStory(eventsByAge[0][0].text);
    updateStats(eventsByAge[0][0].stats);
    eventIndex = 1;

    ageButton.onclick = nextEvent;
});
