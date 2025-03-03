export class Base64Tool {
    constructor() {
        this.input = document.getElementById('base64Input');
        this.result = document.getElementById('base64Result');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Sample text buttons
        document.querySelectorAll('#base64Tool .sample-grid button').forEach(button => {
            button.addEventListener('click', () => {
                this.input.value = button.dataset.text;
                this.result.innerHTML = ''; // Clear previous results
            });
        });

        // Encode button
        document.getElementById('encodeBase64').addEventListener('click', () => this.encode());

        // Decode button
        document.getElementById('decodeBase64').addEventListener('click', () => this.decode());

        // Clear button
        document.getElementById('clearBase64').addEventListener('click', () => this.clear());
    }

    encode() {
        try {
            const text = this.input.value;
            if (!text.trim()) {
                this.result.innerHTML = '<div class="info">Please enter text to encode</div>';
                return;
            }
            const encoded = btoa(text);
            this.result.innerHTML = `
                <div class="result-header">Encoded Result:</div>
                <div class="result-content">${encoded}</div>
                <div class="result-stats">
                    Original length: ${text.length} characters<br>
                    Encoded length: ${encoded.length} characters
                </div>`;
        } catch (error) {
            this.result.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    }

    decode() {
        try {
            const text = this.input.value;
            if (!text.trim()) {
                this.result.innerHTML = '<div class="info">Please enter Base64 text to decode</div>';
                return;
            }
            const decoded = atob(text);
            this.result.innerHTML = `
                <div class="result-header">Decoded Result:</div>
                <div class="result-content">${decoded}</div>
                <div class="result-stats">
                    Original length: ${text.length} characters<br>
                    Decoded length: ${decoded.length} characters
                </div>`;
        } catch (error) {
            this.result.innerHTML = `<div class="error">Error: Invalid Base64 string. Make sure your input is properly encoded.</div>`;
        }
    }

    clear() {
        this.input.value = '';
        this.result.innerHTML = '';
    }
}
