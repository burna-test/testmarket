export class JsonTool {
    constructor() {
        this.input = document.getElementById('jsonInput');
        this.result = document.getElementById('jsonResult');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Sample JSON buttons
        document.querySelectorAll('#jsonTool .sample-grid button').forEach(button => {
            button.addEventListener('click', () => {
                this.input.value = button.dataset.json;
                // Auto-format the sample
                try {
                    const obj = JSON.parse(button.dataset.json);
                    this.input.value = JSON.stringify(obj, null, 2);
                } catch (error) {
                    console.error('Invalid sample JSON:', error);
                }
            });
        });

        // Format button
        document.getElementById('formatJson').addEventListener('click', () => this.format());

        // Minify button
        document.getElementById('minifyJson').addEventListener('click', () => this.minify());

        // Clear button
        document.getElementById('clearJson').addEventListener('click', () => this.clear());
    }

    format() {
        try {
            const text = this.input.value.trim();
            if (!text) {
                this.result.innerHTML = '<div class="info">Please enter JSON to format</div>';
                return;
            }
            
            const obj = JSON.parse(text);
            const formatted = JSON.stringify(obj, null, 2);
            
            // Count elements
            const stats = this.analyzeJson(obj);
            
            this.result.innerHTML = `
                <div class="result-header">Formatted JSON:</div>
                <pre class="result-content">${formatted}</pre>
                <div class="result-stats">
                    Objects: ${stats.objects}<br>
                    Arrays: ${stats.arrays}<br>
                    Total Properties: ${stats.properties}<br>
                    Nesting Level: ${stats.depth}
                </div>`;
        } catch (error) {
            this.result.innerHTML = `
                <div class="error">
                    Error: Invalid JSON<br>
                    <span class="error-details">${error.message}</span>
                </div>`;
        }
    }

    minify() {
        try {
            const text = this.input.value.trim();
            if (!text) {
                this.result.innerHTML = '<div class="info">Please enter JSON to minify</div>';
                return;
            }
            
            const obj = JSON.parse(text);
            const minified = JSON.stringify(obj);
            
            const compressionRatio = ((text.length - minified.length) / text.length * 100).toFixed(1);
            
            this.result.innerHTML = `
                <div class="result-header">Minified JSON:</div>
                <div class="result-content">${minified}</div>
                <div class="result-stats">
                    Original size: ${text.length} characters<br>
                    Minified size: ${minified.length} characters<br>
                    Space saved: ${compressionRatio}%
                </div>`;
        } catch (error) {
            this.result.innerHTML = `
                <div class="error">
                    Error: Invalid JSON<br>
                    <span class="error-details">${error.message}</span>
                </div>`;
        }
    }

    clear() {
        this.input.value = '';
        this.result.innerHTML = '';
    }

    analyzeJson(obj, depth = 0) {
        let stats = {
            objects: 0,
            arrays: 0,
            properties: 0,
            depth: depth
        };
        
        if (Array.isArray(obj)) {
            stats.arrays++;
            obj.forEach(item => {
                if (typeof item === 'object' && item !== null) {
                    const childStats = this.analyzeJson(item, depth + 1);
                    stats = this.combineStats(stats, childStats);
                }
            });
        } else if (typeof obj === 'object' && obj !== null) {
            stats.objects++;
            stats.properties += Object.keys(obj).length;
            
            Object.values(obj).forEach(value => {
                if (typeof value === 'object' && value !== null) {
                    const childStats = this.analyzeJson(value, depth + 1);
                    stats = this.combineStats(stats, childStats);
                }
            });
        }
        
        return stats;
    }

    combineStats(stats1, stats2) {
        return {
            objects: stats1.objects + stats2.objects,
            arrays: stats1.arrays + stats2.arrays,
            properties: stats1.properties + stats2.properties,
            depth: Math.max(stats1.depth, stats2.depth)
        };
    }
}
