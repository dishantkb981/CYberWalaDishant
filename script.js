const terminalOutput = document.getElementById('output');
const inputField = document.getElementById('input');
// for auto complete command
const commands = ['about', 'contact', 'help', 'clear','time', 'resume'];
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
                    showOutput('<div class="about">Hey, I am <span class="command"><b>Dishant Vishwakarma</b></span>.  I am pursuing Cyber Security from Parul University... My keen interest are in <br> <span class="command"><b>1.Android Os Development</b></span> <br> <span class="command"><b>2.Malware Devlopment</b></span> <br> <span class="command"><b>3.CTF</b></span> <br>(I have currently won HavokSecurity Ctf hosted by GoogleStudentDeveloperClub YAAAAYYYY!!!!) </div>');
                    break;
                case 'contact':
                    showOutput('Hit me up at: <hr><br> Linkedin: <a href="https://www.linkedin.com/in/dishant-kumar-vishwakarma-493529286/">[Link]</a> <br> Twitter: <a href="">[Link]</a> <br> Medium: <a href="">[Link]</a>');
                    break;
                case 'help':
                    showOutput('Available commands: <br> <div class="command">- about [Get to know Me] <br> - contact <br> - help <br> - clear <br> - time [Your current Clock] <br> - resume [download resume]</div><br> Use <span class="command2">Up Arrow</span> to go back to previous command, Use <span class="command2"><b>Tab</b></span> to autocomplete command.');
                    break;
                case 'clear':
                    clearOutput();
                    break;
                case 'time':_
                    showTime();
                    break;
                case 'resume':
                    showOutput('On our way to my resume...');
                    setTimeout(() => {
                        window.location.href = 'https://docs.google.com/document/d/1PQ9-WGn1MHZccfs2nzxUARrOv1_SCTDCDZCg4wMqZrE/edit?usp=sharing'; // Replace with your encryption site URL
                    }, 2000); // Adjust the delay time as needed (2000 milliseconds = 2 seconds)
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

function navigateToPage(page) {
    window.location.href = page;
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
    const currentTime = new Date().toLocaleTimeString();
    showOutput(`Current time is: ${currentTime}`);
}

setInterval(function(){ window.scrollBy(0,1000); }, 1000);

// Event listener for input field
document.getElementById('input').addEventListener('keydown', handleInput);
