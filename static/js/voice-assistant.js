document.addEventListener('DOMContentLoaded', () => {
    // --- 1. INITIALIZATION ---
    const voiceButton = document.getElementById('voice-assistant-btn');
    const voiceModal = document.getElementById('voice-modal');
    const transcriptEl = document.querySelector('#voice-transcript p');
    const responseEl = document.querySelector('#voice-response p');
    const loaderEl = document.getElementById('voice-loader');

    if (!voiceButton) {
        console.error("Voice assistant button not found!");
        return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn("Speech Recognition API is not supported.");
        voiceButton.style.display = 'none';
        return;
    }

    const recognition = new SpeechRecognition();
    const synth = window.speechSynthesis;
    let isListening = false;

    // --- 2. CONFIGURATION ---
    const lang = voiceButton.dataset.lang || 'en-US';
    const commandProcessorUrl = voiceButton.dataset.urlCommandProcessor;
    const textListening = voiceButton.dataset.speakListening;
    const textError = voiceButton.dataset.speakError;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // --- 3. HELPER FUNCTIONS ---

    // Shows or hides the feedback modal
    const showModal = (visible) => {
        if (visible) {
            voiceModal.classList.add('visible');
        } else {
            voiceModal.classList.remove('visible');
        }
    };
    
    // Updates the content of the feedback modal
    const updateModalContent = (transcript, response) => {
        transcriptEl.textContent = transcript ? `"${transcript}"` : "...";
        responseEl.textContent = response ? `"${response}"` : "...";
    };

    // Toggles the loading spinner
    const showLoader = (isLoading) => {
        loaderEl.style.display = isLoading ? 'block' : 'none';
    };
    
    // Makes the assistant speak
    const speak = (text) => {
        if (synth.speaking) {
            synth.cancel(); // Stop any previous speech
        }
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.onerror = (event) => console.error('SpeechSynthesisUtterance.onerror', event);
        synth.speak(utterance);
    };

    // --- 4. CORE LOGIC ---

    const processCommand = async (command) => {
        updateModalContent(command, "");
        showLoader(true);

        try {
            const response = await fetch(commandProcessorUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ transcript: command })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            
            // Speak the response from the server
            speak(data.speak);
            updateModalContent(data.transcript, data.speak);

            // Perform any action requested by the server
            if (data.action && data.action.type === 'navigate') {
                setTimeout(() => {
                    window.location.href = data.action.url;
                }, 2000); // Delay navigation to allow speech to be heard
            }

        } catch (error) {
            console.error('Error processing command:', error);
            speak(textError);
            updateModalContent(command, textError);
        } finally {
            showLoader(false);
        }
    };

    // --- 5. EVENT HANDLERS ---
    recognition.onstart = () => {
        isListening = true;
        voiceButton.classList.add('listening');
        updateModalContent("", textListening);
        showModal(true);
    };

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript;
        processCommand(command);
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error !== 'no-speech') {
            speak(textError);
            updateModalContent("Error", textError);
        }
        // If it's just 'no-speech', we close the modal quietly.
        setTimeout(() => showModal(false), 2000);
    };

    recognition.onend = () => {
        isListening = false;
        voiceButton.classList.remove('listening');
        // Keep the modal visible for a few seconds to show the final result
        setTimeout(() => showModal(false), 4000);
    };

    // Button click toggles listening on/off
    voiceButton.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
        } else {
            try {
                recognition.start();
            } catch (e) {
                console.error("Could not start recognition:", e);
                voiceButton.classList.remove('listening');
            }
        }
    });
});