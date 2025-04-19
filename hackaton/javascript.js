// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// Example: Dynamically update progress bar
function updateProgressBar(progressPercentage) {
    const progressBar = document.querySelector('.progress-bar .progress');
    progressBar.style.width = `${progressPercentage}%`;
}

// Simulate progress update (e.g., based on user performance)
setTimeout(() => {
    updateProgressBar(85); // Update progress to 85%
}, 2000);

// Accessibility Toolbar Functionality
document.getElementById('textSizeBtn').addEventListener('click', () => {
    document.body.style.fontSize = '1.2em';
});

document.getElementById('dyslexiaBtn').addEventListener('click', () => {
    document.body.classList.toggle('dyslexia-friendly');
});

document.getElementById('contrastBtn').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// Update Progress Circle
function updateProgressCircle(selector, percentage) {
    const circle = document.querySelector(selector);
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
}

// Example: Update progress circle dynamically
setTimeout(() => {
    updateProgressCircle('.progress-circle path:nth-child(2)', 85); // Update to 85%
}, 2000);

// AI Tutor Assistant Functionality
async function callOpenAIAPI(question) {
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY` // Replace with your OpenAI API key
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: `Answer this question: ${question}`,
            max_tokens: 100,
            temperature: 0.7
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}

document.querySelector('.ai-tutor button').addEventListener('click', async () => {
    const input = document.querySelector('.ai-tutor-input').value;
    const responseElement = document.querySelector('.ai-tutor-response');

    if (input) {
        responseElement.textContent = 'Thinking...';
        try {
            const answer = await callOpenAIAPI(input);
            responseElement.textContent = answer;
        } catch (error) {
            responseElement.textContent = 'Sorry, something went wrong. Please try again.';
            console.error(error);
        }
    } else {
        responseElement.textContent = 'Please enter a question.';
    }
});

// AI Summarization Feature
async function summarizeText(text) {
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY` // Replace with your OpenAI API key
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: `Summarize this text: ${text}`,
            max_tokens: 100,
            temperature: 0.5
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}

document.querySelector('#summarizeBtn').addEventListener('click', async () => {
    const input = document.querySelector('#summarizeInput').value;
    const responseElement = document.querySelector('#summarizeResponse');

    if (input) {
        responseElement.textContent = 'Summarizing...';
        try {
            const summary = await summarizeText(input);
            responseElement.textContent = summary;
        } catch (error) {
            responseElement.textContent = 'Sorry, something went wrong. Please try again.';
            console.error(error);
        }
    } else {
        responseElement.textContent = 'Please enter text to summarize.';
    }
});

// AI Chatbot Feature
async function chatWithAI(message) {
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY` // Replace with your OpenAI API key
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: `You are a helpful assistant. Respond to: ${message}`,
            max_tokens: 150,
            temperature: 0.7
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}

document.querySelector('#chatBtn').addEventListener('click', async () => {
    const input = document.querySelector('#chatInput').value;
    const responseElement = document.querySelector('#chatResponse');

    if (input) {
        responseElement.textContent = 'Thinking...';
        try {
            const reply = await chatWithAI(input);
            responseElement.textContent = reply;
        } catch (error) {
            responseElement.textContent = 'Sorry, something went wrong. Please try again.';
            console.error(error);
        }
    } else {
        responseElement.textContent = 'Please enter a message.';
    }
});
