export class RegexTool {
    constructor() {
        this.inputText = document.getElementById('inputText');
        this.pattern = document.getElementById('pattern');
        this.flags = document.getElementById('flags');
        this.results = document.getElementById('results');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Input listeners
        this.inputText.addEventListener('input', () => this.testRegex());
        this.pattern.addEventListener('input', () => this.testRegex());
        this.flags.addEventListener('input', () => this.testRegex());

        // Pattern buttons
        document.querySelectorAll('#regexTool .pattern-grid button').forEach(button => {
            button.addEventListener('click', () => {
                this.pattern.value = button.dataset.pattern;
                this.flags.value = button.dataset.flags || '';
                this.testRegex();
            });
        });

        // Sample text buttons
        document.querySelectorAll('#regexTool .sample-grid button').forEach(button => {
            button.addEventListener('click', () => {
                this.inputText.value = button.textContent;
                this.testRegex();
            });
        });
    }

    testRegex() {
        if (!this.inputText.value || !this.pattern.value) {
            this.results.textContent = 'Enter both text and pattern to test';
            this.results.className = 'results';
            return;
        }

        try {
            const regex = new RegExp(this.pattern.value, this.flags.value);
            const matches = [];
            const text = this.inputText.value;
            
            if (this.flags.value.includes('g')) {
                let match;
                while ((match = regex.exec(text)) !== null) {
                    matches.push({
                        text: match[0],
                        index: match.index,
                        groups: match.slice(1)
                    });
                }
            } else {
                const match = regex.exec(text);
                if (match) {
                    matches.push({
                        text: match[0],
                        index: match.index,
                        groups: match.slice(1)
                    });
                }
            }
            
            this.displayResults(matches, text);
        } catch (error) {
            this.results.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    }

    displayResults(matches, text) {
        if (matches.length === 0) {
            this.results.textContent = 'No matches found';
            return;
        }

        let html = `Found ${matches.length} match${matches.length > 1 ? 'es' : ''}\n\n`;
        
        let lastIndex = 0;
        let highlightedText = '';
        
        matches.forEach((match, i) => {
            highlightedText += text.slice(lastIndex, match.index);
            highlightedText += `<span class="match">${match.text}</span>`;
            lastIndex = match.index + match.text.length;
            
            html += `Match ${i + 1}: "${match.text}"\n`;
            if (match.groups.length > 0) {
                html += `Groups: ${match.groups.map(g => `"${g}"`).join(', ')}\n`;
            }
            html += '\n';
        });
        
        highlightedText += text.slice(lastIndex);
        this.results.innerHTML = html + 'Text with highlights:\n' + highlightedText;
    }
}
