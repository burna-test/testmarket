export class SecurityTool {
    constructor() {
        this.input = document.getElementById('securityInput');
        this.result = document.getElementById('securityResult');
        this.mode = document.getElementById('securityMode');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Mode selection
        this.mode.addEventListener('change', () => this.clearResults());
        
        // Action buttons
        document.getElementById('analyzeToken').addEventListener('click', () => this.analyzeJWT());
        document.getElementById('checkPassword').addEventListener('click', () => this.analyzePassword());
        document.getElementById('clearSecurity').addEventListener('click', () => this.clear());

        // Sample data
        document.querySelectorAll('#securityTool .sample-grid button').forEach(button => {
            button.addEventListener('click', () => {
                this.input.value = button.dataset.sample;
                this.mode.value = button.dataset.mode;
                if (button.dataset.mode === 'jwt') {
                    this.analyzeJWT();
                } else {
                    this.analyzePassword();
                }
            });
        });
    }

    analyzeJWT() {
        try {
            const token = this.input.value.trim();
            if (!token) {
                this.result.innerHTML = '<div class="info">Please enter a JWT token</div>';
                return;
            }

            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT format. Token must have 3 parts separated by dots.');
            }

            const [header, payload, signature] = parts;
            
            // Decode header and payload
            const decodedHeader = JSON.parse(this.base64UrlDecode(header));
            const decodedPayload = JSON.parse(this.base64UrlDecode(payload));
            
            // Analyze expiration
            let expirationStatus = '';
            if (decodedPayload.exp) {
                const expDate = new Date(decodedPayload.exp * 1000);
                const now = new Date();
                expirationStatus = `<div class="token-expiration ${expDate > now ? 'valid' : 'expired'}">
                    Token ${expDate > now ? 'expires' : 'expired'} on ${expDate.toLocaleString()}
                </div>`;
            }

            this.result.innerHTML = `
                <div class="result-header">JWT Analysis:</div>
                ${expirationStatus}
                <div class="result-section">
                    <h3>Header:</h3>
                    <pre class="result-content">${JSON.stringify(decodedHeader, null, 2)}</pre>
                </div>
                <div class="result-section">
                    <h3>Payload:</h3>
                    <pre class="result-content">${JSON.stringify(decodedPayload, null, 2)}</pre>
                </div>
                <div class="result-section">
                    <h3>Signature:</h3>
                    <div class="result-content">${signature}</div>
                </div>
                <div class="result-stats">
                    <ul>
                        <li>Algorithm: ${decodedHeader.alg}</li>
                        <li>Token Type: ${decodedHeader.typ}</li>
                        <li>Issued At: ${decodedPayload.iat ? new Date(decodedPayload.iat * 1000).toLocaleString() : 'Not specified'}</li>
                        <li>Issuer: ${decodedPayload.iss || 'Not specified'}</li>
                    </ul>
                </div>`;
        } catch (error) {
            this.result.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    }

    analyzePassword() {
        try {
            const password = this.input.value;
            if (!password) {
                this.result.innerHTML = '<div class="info">Please enter a password to analyze</div>';
                return;
            }

            const metrics = this.calculatePasswordStrength(password);
            const suggestions = this.generatePasswordSuggestions(metrics);

            this.result.innerHTML = `
                <div class="result-header">Password Analysis:</div>
                <div class="strength-meter">
                    <div class="strength-bar ${metrics.strengthClass}" 
                         style="width: ${metrics.score}%"></div>
                </div>
                <div class="result-section">
                    <h3>Strength: ${metrics.strength}</h3>
                    <ul>
                        <li>Length: ${metrics.length} characters</li>
                        <li>Uppercase letters: ${metrics.uppercase}</li>
                        <li>Lowercase letters: ${metrics.lowercase}</li>
                        <li>Numbers: ${metrics.numbers}</li>
                        <li>Special characters: ${metrics.special}</li>
                    </ul>
                </div>
                <div class="result-section">
                    <h3>Suggestions:</h3>
                    <ul>
                        ${suggestions.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>`;
        } catch (error) {
            this.result.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        }
    }

    calculatePasswordStrength(password) {
        const metrics = {
            length: password.length,
            uppercase: (password.match(/[A-Z]/g) || []).length,
            lowercase: (password.match(/[a-z]/g) || []).length,
            numbers: (password.match(/[0-9]/g) || []).length,
            special: (password.match(/[^A-Za-z0-9]/g) || []).length,
            score: 0,
            strength: '',
            strengthClass: ''
        };

        // Calculate base score
        metrics.score = Math.min(100, 
            metrics.length * 4 +
            metrics.uppercase * 2 +
            metrics.lowercase * 2 +
            metrics.numbers * 4 +
            metrics.special * 6
        );

        // Determine strength
        if (metrics.score >= 80) {
            metrics.strength = 'Very Strong';
            metrics.strengthClass = 'very-strong';
        } else if (metrics.score >= 60) {
            metrics.strength = 'Strong';
            metrics.strengthClass = 'strong';
        } else if (metrics.score >= 40) {
            metrics.strength = 'Moderate';
            metrics.strengthClass = 'moderate';
        } else if (metrics.score >= 20) {
            metrics.strength = 'Weak';
            metrics.strengthClass = 'weak';
        } else {
            metrics.strength = 'Very Weak';
            metrics.strengthClass = 'very-weak';
        }

        return metrics;
    }

    generatePasswordSuggestions(metrics) {
        const suggestions = [];

        if (metrics.length < 12) {
            suggestions.push('🔍 Increase password length to at least 12 characters');
        }
        if (metrics.uppercase === 0) {
            suggestions.push('🔍 Add uppercase letters');
        }
        if (metrics.lowercase === 0) {
            suggestions.push('🔍 Add lowercase letters');
        }
        if (metrics.numbers === 0) {
            suggestions.push('🔍 Add numbers');
        }
        if (metrics.special === 0) {
            suggestions.push('🔍 Add special characters');
        }
        if (metrics.length > 0 && metrics.score < 60) {
            suggestions.push('🔍 Mix different character types more evenly');
        }

        if (suggestions.length === 0) {
            suggestions.push('✅ Password meets all security criteria!');
        }

        return suggestions;
    }

    base64UrlDecode(str) {
        // Add removed padding
        str = str.padEnd(str.length + ((4 - (str.length % 4)) % 4), '=');
        // Convert URL-safe characters back to regular base64
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        // Decode
        return decodeURIComponent(atob(str).split('').map(c => 
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));
    }

    clear() {
        this.input.value = '';
        this.result.innerHTML = '';
    }

    clearResults() {
        this.result.innerHTML = '';
    }
}
