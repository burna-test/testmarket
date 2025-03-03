import { RegexTool } from './regex-tool.js';
import { Base64Tool } from './base64-tool.js';
import { JsonTool } from './json-tool.js';
import { CodeAnalyzerTool } from './code-analyzer-tool.js';
import { SecurityTool } from './security-tool.js';

class App {
    constructor() {
        this.currentTool = 'regex';
        this.tools = {
            regex: new RegexTool(),
            base64: new Base64Tool(),
            json: new JsonTool(),
            analyzer: new CodeAnalyzerTool()
        };
        
        this.initializeNavigation();
    }

    initializeNavigation() {
        document.querySelectorAll('.tool-btn').forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                document.querySelectorAll('.tool-btn').forEach(btn => 
                    btn.classList.remove('active'));
                button.classList.add('active');
                
                // Show active tool section
                const toolId = button.dataset.tool;
                document.querySelectorAll('.tool-section').forEach(section => 
                    section.classList.remove('active'));
                document.getElementById(toolId + 'Tool').classList.add('active');
                
                // Update current tool
                this.currentTool = toolId;
            });
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    const securityTool = new SecurityTool();
});
