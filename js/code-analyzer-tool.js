export class CodeAnalyzerTool {
    constructor() {
        this.input = document.getElementById('codeInput');
        this.result = document.getElementById('analyzerResult');
        this.language = document.getElementById('languageSelect');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('analyzeCode').addEventListener('click', () => this.analyze());
        document.getElementById('clearAnalyzer').addEventListener('click', () => this.clear());

        // Sample code buttons
        document.querySelectorAll('#analyzerTool .sample-grid button').forEach(button => {
            button.addEventListener('click', () => {
                this.input.value = button.dataset.code;
                this.language.value = button.dataset.language;
                this.analyze();
            });
        });
    }

    analyze() {
        const code = this.input.value.trim();
        if (!code) {
            this.result.innerHTML = '<div class="info">Please enter code to analyze</div>';
            return;
        }

        try {
            const metrics = this.calculateMetrics(code);
            const suggestions = this.generateSuggestions(metrics);
            
            this.result.innerHTML = `
                <div class="result-header">Code Analysis Results:</div>
                <div class="result-section">
                    <h3>Complexity Metrics:</h3>
                    <ul>
                        <li>Lines of Code: ${metrics.loc}</li>
                        <li>Cyclomatic Complexity: ${metrics.complexity}</li>
                        <li>Number of Functions: ${metrics.functions}</li>
                        <li>Maximum Nesting: ${metrics.maxNesting}</li>
                        <li>Comment Ratio: ${metrics.commentRatio}%</li>
                    </ul>
                </div>
                <div class="result-section">
                    <h3>Code Structure:</h3>
                    <ul>
                        <li>Control Statements: ${metrics.controlStatements}</li>
                        <li>Function Length (avg): ${metrics.avgFunctionLength} lines</li>
                        <li>Variable Declarations: ${metrics.variables}</li>
                    </ul>
                </div>
                <div class="result-section">
                    <h3>Suggestions:</h3>
                    <ul>
                        ${suggestions.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>`;
        } catch (error) {
            this.result.innerHTML = `<div class="error">Error analyzing code: ${error.message}</div>`;
        }
    }

    calculateMetrics(code) {
        const lines = code.split('\n');
        const metrics = {
            loc: lines.length,
            complexity: 0,
            functions: 0,
            maxNesting: 0,
            commentRatio: 0,
            controlStatements: 0,
            avgFunctionLength: 0,
            variables: 0
        };

        let currentNesting = 0;
        let commentLines = 0;
        let functionLines = 0;
        let inFunction = false;
        let bracketStack = [];

        const controlKeywords = ['if', 'for', 'while', 'switch', 'catch'];
        const variableKeywords = ['var', 'let', 'const'];

        lines.forEach(line => {
            line = line.trim();
            
            // Count comments
            if (line.startsWith('//') || line.startsWith('/*')) {
                commentLines++;
                return;
            }

            // Count control statements and complexity
            controlKeywords.forEach(keyword => {
                if (line.startsWith(keyword + ' ') || line.includes(' ' + keyword + ' ')) {
                    metrics.controlStatements++;
                    metrics.complexity++;
                }
            });

            // Count variable declarations
            variableKeywords.forEach(keyword => {
                if (line.startsWith(keyword + ' ') || line.includes(' ' + keyword + ' ')) {
                    metrics.variables++;
                }
            });

            // Track functions
            if (line.includes('function') || line.includes('=>')) {
                metrics.functions++;
                inFunction = true;
                functionLines = 0;
            }

            // Track nesting
            line.split('').forEach(char => {
                if (char === '{') {
                    bracketStack.push(char);
                    currentNesting = Math.max(currentNesting, bracketStack.length);
                } else if (char === '}') {
                    bracketStack.pop();
                    if (inFunction && bracketStack.length === 0) {
                        metrics.avgFunctionLength += functionLines;
                        inFunction = false;
                    }
                }
            });

            if (inFunction) functionLines++;
        });

        metrics.maxNesting = currentNesting;
        metrics.commentRatio = Math.round((commentLines / metrics.loc) * 100);
        metrics.avgFunctionLength = metrics.functions ? 
            Math.round(metrics.avgFunctionLength / metrics.functions) : 0;

        return metrics;
    }

    generateSuggestions(metrics) {
        const suggestions = [];

        if (metrics.complexity > 10) {
            suggestions.push('⚠️ High cyclomatic complexity. Consider breaking down complex functions.');
        }

        if (metrics.maxNesting > 4) {
            suggestions.push('⚠️ Deep nesting detected. Try to reduce nesting levels for better readability.');
        }

        if (metrics.avgFunctionLength > 20) {
            suggestions.push('⚠️ Long functions detected. Consider breaking them into smaller, focused functions.');
        }

        if (metrics.commentRatio < 10) {
            suggestions.push('📝 Low comment ratio. Consider adding more documentation.');
        }

        if (metrics.controlStatements / metrics.loc > 0.3) {
            suggestions.push('⚠️ High density of control statements. Consider simplifying logic.');
        }

        if (suggestions.length === 0) {
            suggestions.push('✅ Code looks well-structured! Keep up the good work!');
        }

        return suggestions;
    }

    clear() {
        this.input.value = '';
        this.result.innerHTML = '';
    }
}
