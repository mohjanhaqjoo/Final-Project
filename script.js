
let currentView = "welcomePage";


let historyStack = [];


const pageNumbers = {

    welcomePage: "1 / 16",

    choicePage: "2 / 16",

    memory1: "3–4 / 16",

    memory2: "5–6 / 16",

    memory3: "7–8 / 16",

    memoryEnd: "9 / 16",

    dream1: "10–11 / 16",

    dream2: "12–13 / 16",

    dream3: "14–15 / 16",

    dreamEnd: "16 / 16",

};



const allViews = [

    "welcomePage",
    "choicePage",

    "memory1",
    "memory2",
    "memory3",

    "memoryEnd",

    "dream1",
    "dream2",
    "dream3",

    "dreamEnd"

];



function openBook() {

    document
        .getElementById("cover")
        .classList
        .add("hidden");


    document
        .getElementById("book")
        .classList
        .remove("hidden");


    showView(
        "welcomePage",
        false
    );


    playPageSound();
}



function hideAllViews() {

    allViews.forEach(function(id) {

        const element =
            document.getElementById(id);

        if (element) {

            element.classList.add("hidden");

        }

    });

}


function showView(
    id,
    saveHistory = true
) {

    if (!document.getElementById(id)) {

        return;

    }


    if (
        saveHistory &&
        currentView !== id
    ) {

        historyStack.push(
            currentView
        );

    }


    hideAllViews();


    document
        .getElementById(id)
        .classList
        .remove("hidden");


    currentView = id;


    updateNavigation();


    playPageSound();

}


function choosePath(path) {

    if (path === "memory") {

        showView("memory1");

    }


    if (path === "dream") {

        showView("dream1");

    }

}



function goToChoice() {

    historyStack = [];

    showView(
        "choicePage",
        false
    );

}



function goNext() {
    


    if (
        currentView === "welcomePage"
    ) {

        showView("choicePage");

        return;

    }


    if (
        currentView === "choicePage"
    ) {

        return;

    }



    if (
        currentView === "memory1"
    ) {

        showView("memory2");

        return;

    }


    if (
        currentView === "memory2"
    ) {

        showView("memory3");

        return;

    }


    if (
        currentView === "memory3"
    ) {

        showView("memoryEnd");

        return;

    }


    if (
        currentView === "memoryEnd"
    ) {

        showView("choicePage");

        return;

    }



    if (
        currentView === "dream1"
    ) {

        showView("dream2");

        return;

    }


    if (
        currentView === "dream2"
    ) {

        showView("dream3");


        return;

    }
if (
    currentView === "dream3"
) {

    showView("dreamEnd");

    return;

}
if(currentView === "dreamEnd"){
    return;

}

}



function restartBook() {

    historyStack = [];

    currentView = "welcomePage";

    hideAllViews();

    document
        .getElementById("book")
        .classList
        .add("hidden");

    document
        .getElementById("cover")
        .classList
        .remove("hidden");

}


function goBack() {

    if (
        historyStack.length === 0
    ) {

        return;

    }


    const previous =
        historyStack.pop();


    hideAllViews();


    const previousElement =
        document.getElementById(previous);


    if (previousElement) {

        previousElement
            .classList
            .remove("hidden");

    }


    currentView = previous;


    updateNavigation();


    playPageSound();

}



function updateNavigation() {

    const indicator =
        document.getElementById(
            "chapterIndicator"
        );


    const backButton =
        document.getElementById(
            "backBtn"
        );


    const nextButton =
        document.getElementById(
            "nextBtn"
        );


    indicator.textContent =
        pageNumbers[currentView] ||
        "1 / 14";



    if (
        historyStack.length === 0
    ) {

        backButton.style.opacity =
            "0.3";

        backButton.style.pointerEvents =
            "none";

    }

    else {

        backButton.style.opacity =
            "1";

        backButton.style.pointerEvents =
            "auto";

    }



    if (
        currentView === "choicePage"
    ) {

        nextButton.style.opacity =
            "0.3";

        nextButton.style.pointerEvents =
            "none";

    }

    else {

        nextButton.style.opacity =
            "1";

        nextButton.style.pointerEvents =
            "auto";

    }

}



let audioContext = null;


function getAudioContext() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    return audioContext;

}


function playPageSound() {

    try {

        const ctx =
            getAudioContext();


        if (
            ctx.state === "suspended"
        ) {

            ctx.resume();

        }


        const now =
            ctx.currentTime;




        const oscillator1 =
            ctx.createOscillator();


        const gain1 =
            ctx.createGain();


        oscillator1.type =
            "triangle";


        oscillator1.frequency
            .setValueAtTime(
                170,
                now
            );


        oscillator1.frequency
            .exponentialRampToValueAtTime(
                80,
                now + 0.08
            );


        gain1.gain
            .setValueAtTime(
                0.0001,
                now
            );


        gain1.gain
            .exponentialRampToValueAtTime(
                0.06,
                now + 0.01
            );


        gain1.gain
            .exponentialRampToValueAtTime(
                0.0001,
                now + 0.12
            );


        oscillator1.connect(gain1);

        gain1.connect(
            ctx.destination
        );


        oscillator1.start(now);

        oscillator1.stop(
            now + 0.13
        );



        const oscillator2 =
            ctx.createOscillator();


        const gain2 =
            ctx.createGain();


        oscillator2.type =
            "sine";


        oscillator2.frequency
            .setValueAtTime(
                500,
                now + 0.025
            );


        oscillator2.frequency
            .exponentialRampToValueAtTime(
                180,
                now + 0.13
            );


        gain2.gain
            .setValueAtTime(
                0.0001,
                now + 0.025
            );


        gain2.gain
            .exponentialRampToValueAtTime(
                0.025,
                now + 0.04
            );


        gain2.gain
            .exponentialRampToValueAtTime(
                0.0001,
                now + 0.15
            );


        oscillator2.connect(gain2);

        gain2.connect(
            ctx.destination
        );


        oscillator2.start(
            now + 0.025
        );


        oscillator2.stop(
            now + 0.16
        );

    }

    catch (error) {

        console.log(
            "Page sound unavailable:",
            error
        );

    }

}


document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "ArrowRight"
        ) {

            goNext();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            goBack();

        }

    }
);