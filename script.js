// ✅ INITIAL SETUP (Variables and element selections)
document.addEventListener("DOMContentLoaded", function () {
    let age = 0;
    let eventIndex = 0;
    let happiness = 80, health = 75, smarts = 90, looks = 99; // Initial stat values with Looks added
    let playerName = "Player"; // Default name until the player enters one
    let currentAgeHeaderAdded = false; // Track if the age header has been added for the current age

    // Select HTML elements
    const nameModal = document.getElementById("name-modal");
    const playerNameInput = document.getElementById("player-name-input");
    const nameSubmitBtn = document.getElementById("name-submit-btn");
    const charName = document.getElementById("char-name");
    const story = document.getElementById("story");
    const choiceText = document.getElementById("choice-text");
    const choicesContainer = document.querySelector(".choices-container");

    // Select stat bars and values
    const happinessBar = document.querySelector(".happiness-bar");
    const happinessValue = document.querySelector(".happiness-value");
    const healthBar = document.querySelector(".health-bar");
    const healthValue = document.querySelector(".health-value");
    const smartsBar = document.querySelector(".smarts-bar");
    const smartsValue = document.querySelector(".smarts-value");
    const looksBar = document.querySelector(".looks-bar");
    const looksValue = document.querySelector(".looks-value");

    // ✅ EVENTS FOR AGE 0
    const eventsAge0 = [
        { text: "You were born!", stats: { happiness: 10, health: 10, smarts: 5, looks: 0 } },
        { text: "Your parents welcomed you warmly.", stats: { happiness: 5 } },
        { text: "You received your first vaccinations.", stats: { health: 5 } },
        { text: "Will you smile at visitors?", choice: true, yes: { happiness: 5 }, no: { happiness: -2 } },
        { text: "Did you sleep peacefully?", choice: true, yes: { health: 5 }, no: { happiness: -3 } }
    ];

    // ✅ EVENTS FOR AGE 1
    const eventsAge1 = [
        { text: "You said your first word!", stats: { smarts: 5 } },
        { text: "You took your first steps!", stats: { health: 5 } },
        { text: "You celebrated your first birthday!", stats: { happiness: 5 } },
        { text: "Will you eat vegetables willingly?", choice: true, yes: { health: 5 }, no: { happiness: -3 } },
        { text: "Will you take regular naps?", choice: true, yes: { health: 5 }, no: { happiness: -2 } }
    ];

    // ✅ EVENTS FOR AGE 2
    const eventsAge2 = [
        { text: "You started running around the house.", stats: { health: 5 } },
        { text: "You started talking in short sentences.", stats: { smarts: 5 } },
        { text: "You made your first friend!", stats: { happiness: 5 } },
        { text: "Will you share toys with your friend?", choice: true, yes: { happiness: 5 }, no: { smarts: 3 } },
        { text: "Will you throw a tantrum when denied candy?", choice: true, yes: { happiness: -5 }, no: { smarts: 2 } }
    ];

    // ✅ EVENTS FOR AGE 3
    const eventsAge3 = [
        { text: "You started preschool!", stats: { smarts: 5 } },
        { text: "You played with other kids at school.", stats: { happiness: 5 } },
        { text: "You drew your first picture.", stats: { smarts: 3 } },
        { text: "Will you listen to the teacher carefully?", choice: true, yes: { smarts: 5 }, no: { happiness: -3 } },
        { text: "Will you fight with another kid?", choice: true, yes: { happiness: -5, health: -3 }, no: { smarts: 2 } }
    ];

    // ✅ EVENTS FOR AGE 4
    const eventsAge4 = [
        { text: "You learned how to ride a tricycle!", stats: { health: 5 } },
        { text: "You visited the zoo with family.", stats: { happiness: 5 } },
        { text: "You started learning numbers and letters.", stats: { smarts: 5 } },
        { text: "Will you try eating broccoli?", choice: true, yes: { health: 5 }, no: { happiness: -3 } }
    ];

    // ✅ EVENTS FOR AGE 5
    const eventsAge5 = [
        { text: "You started primary school!", stats: { smarts: 5 } },
        { text: "You made more friends at school.", stats: { happiness: 5 } },
        { text: "You had your first school test.", stats: { smarts: 5 } },
        { text: "Will you join a sports club?", choice: true, yes: { health: 5 }, no: { happiness: -3 } },
        { text: "Will you practice reading at home?", choice: true, yes: { smarts: 5 }, no: { happiness: -3 } }
    ];

    // ✅ EVENTS FOR AGE 10
    const eventsAge10 = [
        { text: "You turned 10 years old!", stats: { happiness: 5 } },
        { text: "You started learning multiplication and division.", stats: { smarts: 5 } },
        { text: "You joined a summer camp.", stats: { happiness: 5, health: 5 } },
        { text: "Will you start a new hobby?", choice: true, yes: { happiness: 5 }, no: { smarts: -3 } },
        { text: "Will you study hard for school?", choice: true, yes: { smarts: 5 }, no: { happiness: -3 } }
    ];

    // ✅ EVENTS FOR AGE 15
    const eventsAge15 = [
        { text: "You started high school!", stats: { smarts: 5 } },
        { text: "You made new friends!", stats: { happiness: 5 } },
        { text: "You had your first school dance.", stats: { happiness: 5 } },
        { text: "Will you try smoking?", choice: true, yes: { health: -10 }, no: { smarts: 5 } },
        { text: "Will you start a part-time job?", choice: true, yes: { happiness: 5, smarts: 5 }, no: { health: -2 } }
    ];

    // ✅ EVENTS FOR AGE 18
    const eventsAge18 = [
        { text: "You turned 18 and became an adult!", stats: { happiness: 5 } },
        { text: "You graduated high school.", stats: { smarts: 5 } },
        { text: "You got your first driver's license!", stats: { happiness: 5, smarts: 3 } },
        { text: "Will you go to college or work?", choice: true, yes: { smarts: 10 }, no: { happiness: 5 } },
        { text: "Will you start saving money?", choice: true, yes: { smarts: 5 }, no: { happiness: -3 } }
    ];

    // ✅ EVENTS FOR AGE 20
    const eventsAge20 = [
        { text: "You turned 20!", stats: { happiness: 5 } },
        { text: "You started college or your first job.", stats: { smarts: 5 } },
        { text: "You moved out and lived alone.", stats: { happiness: 5 } },
        { text: "Will you make a financial plan?", choice: true, yes: { smarts: 5 }, no: { happiness: -3 } },
        { text: "Will you start exercising regularly?", choice: true, yes: { health: 5 }, no: { happiness: -3 } }
    ];

    // ✅ COMBINED EVENTS BY AGE (All events in one object)
    const eventsByAge = {
        0: eventsAge0,
        1: eventsAge1,
        2: eventsAge2,
        3: eventsAge3,
        4: eventsAge4,
        5: eventsAge5,
        10: eventsAge10,
        15: eventsAge15,
        18: eventsAge18,
        20: eventsAge20
    };

    // ✅ FUNCTION: UPDATE STATS (Updates Happiness, Health, Smarts, Looks)
    function updateStats(stats) {
        console.log("Updating stats with:", stats); // Debug: Log the stats being updated
        stats = stats || {};
        
        happiness = Math.max(0, Math.min(100, happiness + (stats.happiness || 0)));
        health = Math.max(0, Math.min(100, health + (stats.health || 0)));
        smarts = Math.max(0, Math.min(100, smarts + (stats.smarts || 0)));
        looks = Math.max(0, Math.min(100, looks + (stats.looks || 0)));

        happinessBar.style.width = `${happiness}%`;
        happinessValue.innerText = `${happiness}%`;

        healthBar.style.width = `${health}%`;
        healthValue.innerText = `${health}%`;

        smartsBar.style.width = `${smarts}%`;
        smartsValue.innerText = `${smarts}%`;

        looksBar.style.width = `${looks}%`;
        looksValue.innerText = `${looks}%`;
        console.log("Stats updated:", { happiness, health, smarts, looks }); // Debug: Log updated stats
    }

    // ✅ FUNCTION: ADD STORY (Adds a new story entry with age header when age changes)
    function addStory(text) {
        console.log("Adding story:", text); // Debug: Log the story being added
        let eventHTML = text; // Use the text as is, without name replacement
        if (!currentAgeHeaderAdded) {
            eventHTML = `<p><strong>Age: ${age}</strong></p>` + eventHTML; // Add age header only once
            currentAgeHeaderAdded = true;
        }
        story.innerHTML += `<p>${eventHTML}</p>`; // Append the event as a paragraph
        console.log("Story added to DOM"); // Debug: Confirm story added
        // Auto-scroll to the bottom to show the newest event
        story.parentElement.scrollTop = story.parentElement.scrollHeight;
    }

    // ✅ FUNCTION: NEXT EVENT (Handles aging and events)
function nextEvent() {
    if (!eventsByAge[age]) {
        addStory("A quiet year passed.");
        age++;
        eventIndex = 0;
        currentAgeHeaderAdded = false; // Reset header flag for new age
        updateLifeTag(); // Update life tag based on new age
        return;
    }

    if (eventIndex >= eventsByAge[age].length) {
        age++;
        eventIndex = 0;
        currentAgeHeaderAdded = false; // Reset header flag for new age
        // If there's no event for the new age, skip to the next year
        if (!eventsByAge[age]) {
            addStory("A quiet year passed.");
            age++;
            eventIndex = 0;
            currentAgeHeaderAdded = false; // Reset header flag for new age
        }
        updateLifeTag(); // Update life tag based on new age
        return;
    }

    const event = eventsByAge[age][eventIndex++];
    if (!event) {
        addStory("Nothing special happened this year.");
        return;
    }

    if (event.choice) {
        choiceText.textContent = event.text; // Use text as is
        choicesContainer.style.display = "block";
    } else {
        addStory(event.text);
        updateStats(event.stats);
    }
    updateLifeTag(); // Update life tag after each event
}

// ✅ FUNCTION: PREVIOUS EVENT (Handles decreasing age)
function previousEvent() {
    if (age <= 0) {
        addStory("You can't go back any further!");
        return;
    }

    age--;
    eventIndex = 0; // Reset event index when going back
    currentAgeHeaderAdded = false; // Reset header flag for new age
    addStory("You went back a year.");
    updateLifeTag(); // Update life tag based on new age
}

// ✅ FUNCTION: UPDATE LIFE TAG (Dynamically set life tag based on age)
function updateLifeTag() {
    const lifeTag = document.getElementById("life-tag");
    if (age <= 5) {
        lifeTag.textContent = "Child";
    } else if (age <= 18) {
        lifeTag.textContent = "Student";
    } else {
        lifeTag.textContent = "Adult";
    }
}

    // ✅ EVENT LISTENER FOR NAME SUBMIT BUTTON
    nameSubmitBtn.onclick = function () {
        console.log("Name submit button clicked"); // Debug: Confirm button click
        const enteredName = playerNameInput.value.trim();
        console.log("Entered name:", enteredName); // Debug: Log the entered name
        if (enteredName) {
            playerName = enteredName;
            console.log("Player name set to:", playerName); // Debug: Confirm name set
            charName.textContent = playerName; // Update the character name in the header
            console.log("Character name updated in header"); // Debug: Confirm header update
            nameModal.style.display = "none"; // Hide the modal
            console.log("Modal hidden"); // Debug: Confirm modal hidden
            // Start the game after the name is submitted
            addStory(eventsByAge[0][0].text);
            updateStats(eventsByAge[0][0].stats);
            eventIndex = 1;
            console.log("Game started, eventIndex:", eventIndex); // Debug: Confirm game start
        } else {
            alert("Please enter your name to start the game!");
            console.log("Alert shown: Please enter your name"); // Debug: Confirm alert
        }
    };

    // ✅ EVENT LISTENER FOR OCCUPATION BUTTON
    const occupationButton = document.querySelector(".occupation-btn");
    occupationButton.onclick = function () {
        addStory("You clicked the Occupation button!");
        // Add your custom actions here (e.g., show a job menu, change stats)
    };

    // ✅ EVENT LISTENER FOR ASSETS BUTTON
    const assetsButton = document.querySelector(".assets-btn");
    assetsButton.onclick = function () {
        addStory("You clicked the Assets button!");
        // Add your custom actions here (e.g., show a list of assets, change stats)
    };

    // ✅ EVENT LISTENER FOR AGE BUTTON (Increase age)
    const ageButton = document.querySelector(".age-btn");
    ageButton.onclick = function () {
        nextEvent();
        // Add your custom actions here (e.g., additional age-related events)
    };

    // ✅ EVENT LISTENER FOR AGE DECREASE BUTTON (Decrease age)
    const ageDecreaseButton = document.querySelector(".age-decrease-btn");
    ageDecreaseButton.onclick = function () {
        previousEvent();
        // Add your custom actions here (e.g., additional age-related events)
    };

    // ✅ EVENT LISTENER FOR RELATIONSHIPS BUTTON
    const relationshipsButton = document.querySelector(".relationships-btn");
    relationshipsButton.onclick = function () {
        addStory("You clicked the Relationships button!");
        // Add your custom actions here (e.g., show relationships menu, change stats)
    };

    // ✅ EVENT LISTENER FOR ACTIVITIES BUTTON
    const activitiesButton = document.querySelector(".activities-btn");
    activitiesButton.onclick = function () {
        addStory("You clicked the Activities button!");
        // Add your custom actions here (e.g., show activities menu, change stats)
    };

    // ✅ EVENT LISTENER FOR YES BUTTON (Choice box)
    const yesButton = document.getElementById("yes-btn");
    yesButton.onclick = function () {
        const event = eventsByAge[age][eventIndex - 1];
        addStory(event.text + " You chose YES.");
        updateStats(event.yes);
        choicesContainer.style.display = "none";
        // Add your custom actions here (e.g., additional effects for choosing Yes)
    };

    // ✅ EVENT LISTENER FOR NO BUTTON (Choice box)
    const noButton = document.getElementById("no-btn");
    noButton.onclick = function () {
        const event = eventsByAge[age][eventIndex - 1];
        addStory(event.text + " You chose NO.");
        updateStats(event.no);
        choicesContainer.style.display = "none";
        // Add your custom actions here (e.g., additional effects for choosing No)
    };

    // ✅ EVENT LISTENER FOR MENU BUTTON (Top left ☰ button)
    const menuButton = document.getElementById("menu-btn");
    menuButton.onclick = function () {
        addStory("You clicked the Menu button!");
        // Add your custom actions here (e.g., show a menu, pause the game)
    };

    // ✅ INITIALIZE MODAL VISIBILITY
    console.log("Initializing game: Showing name modal"); // Debug: Confirm modal shown on load
    nameModal.style.display = "flex"; // Ensure the modal is visible on page load
});