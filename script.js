const terminalOutput = document.getElementById('output');
const inputField = document.getElementById('input');
// for auto complete command
const commands = ['about', 'contact', 'help', 'clear', 'time', 'resume', 'certifications', 'motivation', 'events'];
let commandHistory = [];
let historyIndex = -1;

function handleInput(event) {
    if (event.key === 'Enter') {
        const userInput = inputField.value.trim().toLowerCase();
        inputField.value = '';

        if (userInput) {
            commandHistory.unshift(userInput);
            historyIndex = -1;

            switch (userInput) {
                case 'about':
                    showOutput('<div class="about">Hey, I am <span class="command"><b>Dishant Vishwakarma</b></span>. I am pursuing Cybersecurity from Parul University. My interests include:<br> <span class="command"><b>1. The Hackers Meetup Core Member</b></span> <br> <span class="command"><b>2. Android Pentesting</b></span> <br> <span class="command"><b>3. Android OS Development</b></span><br>(I recently won the HavokSecurity CTF hosted by Google Student Developer Club! Yay!)</div>');
                    break;

                    case 'contact':
                        showOutput('Hit me up at:<br> LinkedIn: <a href="https://www.linkedin.com/in/dishant-kumar-vishwakarma-493529286/" target="_blank">[Link]</a> <br> Twitter: <a href="https://x.com/dishantkv981" target="_blank">[Link]</a> <br> Instagram: <a href="https://www.instagram.com/dishantkv981" target="_blank">[Link]</a> <br> Medium: <a href="https://medium.com/@vishwakarmadishant4" target="_blank">[Link]</a>');
                        break;

                case 'help':
                    showOutput('Available commands:<br> - about [Get to know me] <br> - contact [Get my contact info] <br> - help [List commands] <br> - clear [Clear the terminal] <br> - time [Get the current time] <br> - resume [Download my resume] <br> - certifications [View my certifications] <br> - motivation [Get a random motivational quote] <br> - events [View events I\'ve attended]');
                    break;
                case 'clear':
                    clearOutput();
                    break;
                case 'time':
                    showTime();
                    break;
                case 'resume':
                    showOutput('Redirecting to my resume...');
                    setTimeout(() => {
                        window.location.href = 'https://drive.google.com/file/d/1ztlMCedfjMedQgRsgwyHW65UN2C0Hmev/view?usp=drive_link';
                    }, 2000);
                    break;
                    case 'certifications':
                        showOutput('<div style="color: rgb(255, 255, 255); text-shadow: 0 0 5px rgb(255, 0, 0), 0 0 10px rgb(255, 0, 0), 0 0 15px rgb(255, 0, 0);">Certifications:<br> - <span style="color: rgb(0, 255, 0);">CMPenAndroid</span> ( Mobile Application Penetration Tester)<br> - <span style="color: rgb(0, 0, 255);">eJPTv2</span> (eLearnSecurity Junior Penetration Tester)<br> - <span style="color: rgb(255, 255, 0);">PJMT</span> (Practical Junior Mobile Tester)<br> - <span style="color: rgb(0, 255, 255);">CAP</span> (Certified Application Security Professional)<br> - <span style="color: rgb(255, 0, 255);">CAPT</span> (Certified Android Penetration Tester)</div>');
                        break;
                    

                case 'motivation':
                    const quotes = [
                        '"The only limit to our realization of tomorrow is our doubts of today." – Franklin D. Roosevelt',
                        '"Success is not final, failure is not fatal: It is the courage to continue that counts." – Winston Churchill',
                        '"Believe you can and you\'re halfway there." – Theodore Roosevelt',
                        '"The future belongs to those who believe in the beauty of their dreams." – Eleanor Roosevelt',
                        '"Do not wait to strike till the iron is hot; but make it hot by striking." – William Butler Yeats',
                        '"Padhai Likhai Karo Hacking karo Lekin Nahi Tumko Rajneeti Karni Hai." – Munaa Bhaiya Mirzapur'
                    ];
                    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                    showOutput(`<div class="motivation">${randomQuote}</div>`);
                    break;
                    case 'events':
                        showOutput(`<div class="events">
                            <h3>Attended Events</h3>
                            <ul>
                                <li>BSides Ahmedabad 2024</li>
                                <li>GDG Gandhinagar 2024</li>
                                <li>The Hacker Meetup Ahmedabad 2023</li>
                                <li>The Hacker Meetup Vadodara 2023</li>
                                <li>Havok Security GDSC 2023</li>

                            </ul>
                        </div>`);
                        break;                    
                default:
                    showOutput('<div class="error">Command not recognized. Type "help" to see the list of available commands.</div>');
                    break;
            }
        }
    } else if (event.key === 'Tab') {
        autocompleteCommand();
        event.preventDefault();
    } else if (event.key === 'ArrowUp') {
        navigateCommandHistory(1);
    } else if (event.key === 'ArrowDown') {
        navigateCommandHistory(-1);
    }
}

function showOutput(message) {
    terminalOutput.innerHTML += `<br><div>${message}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function clearOutput() {
    terminalOutput.innerHTML = '';
}

function autocompleteCommand() {
    const userInput = inputField.value.trim().toLowerCase();
    const partialCommand = userInput.split(' ')[0];

    if (partialCommand.length > 0) {
        const matchingCommands = commands.filter(command => command.startsWith(partialCommand));

        if (matchingCommands.length === 1) {
            inputField.value = matchingCommands[0];
        } else if (matchingCommands.length > 1) {
            showOutput('Matching commands: ' + matchingCommands.join(', '));
        }
    }
}

function navigateCommandHistory(direction) {
    if (commandHistory.length === 0) {
        return;
    }

    historyIndex += direction;

    if (historyIndex < -1) {
        historyIndex = -1;
    } else if (historyIndex >= commandHistory.length) {
        historyIndex = commandHistory.length - 1;
    }

    inputField.value = historyIndex === -1 ? '' : commandHistory[historyIndex];
}

function showTime() {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    showOutput(`Current time is: ${currentTime}`);
}

// Event listener for input field
document.getElementById('input').addEventListener('keydown', handleInput);

// Automatically scroll down every second
setInterval(() => { window.scrollBy(0, 1000); }, 1000);
