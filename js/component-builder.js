export class ComponentBuilder {
    constructor() {
        this.componentsPanel = document.getElementById('componentsPanel');
        this.previewArea = document.getElementById('previewArea');
        this.codeOutput = document.getElementById('codeOutput');
        this.exportType = document.getElementById('exportType');
        
        this.components = {
            navigation: {
                name: 'Navigation Bar',
                html: `
                    <nav class="navbar">
                        <div class="logo">Logo</div>
                        <ul class="nav-links">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                        <div class="mobile-menu">☰</div>
                    </nav>`,
                css: `
                    .navbar {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 1rem 2rem;
                        background: #ffffff;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .nav-links {
                        display: flex;
                        gap: 2rem;
                        list-style: none;
                    }
                    .nav-links a {
                        text-decoration: none;
                        color: #333;
                        transition: color 0.3s;
                    }
                    .nav-links a:hover {
                        color: #007bff;
                    }
                    .mobile-menu {
                        display: none;
                    }
                    @media (max-width: 768px) {
                        .nav-links {
                            display: none;
                        }
                        .mobile-menu {
                            display: block;
                        }
                    }`
            },
            hero: {
                name: 'Hero Section',
                html: `
                    <section class="hero">
                        <div class="hero-content">
                            <h1>Welcome to Our Site</h1>
                            <p>Create beautiful websites with our drag & drop builder</p>
                            <button class="cta-button">Get Started</button>
                        </div>
                    </section>`,
                css: `
                    .hero {
                        background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
                        color: white;
                        padding: 4rem 2rem;
                        text-align: center;
                    }
                    .hero-content {
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    .hero h1 {
                        font-size: 3rem;
                        margin-bottom: 1rem;
                    }
                    .hero p {
                        font-size: 1.25rem;
                        margin-bottom: 2rem;
                    }
                    .cta-button {
                        padding: 1rem 2rem;
                        font-size: 1.1rem;
                        background: white;
                        color: #6366f1;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: transform 0.3s;
                    }
                    .cta-button:hover {
                        transform: translateY(-2px);
                    }`
            },
            features: {
                name: 'Features Grid',
                html: `
                    <section class="features">
                        <div class="feature-card">
                            <div class="feature-icon">🚀</div>
                            <h3>Fast & Easy</h3>
                            <p>Build websites in minutes with our intuitive tools</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🎨</div>
                            <h3>Customizable</h3>
                            <p>Personalize every aspect of your components</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">📱</div>
                            <h3>Responsive</h3>
                            <p>Works perfectly on all devices and screen sizes</p>
                        </div>
                    </section>`,
                css: `
                    .features {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 2rem;
                        padding: 4rem 2rem;
                        background: #f8f9fa;
                    }
                    .feature-card {
                        background: white;
                        padding: 2rem;
                        border-radius: 10px;
                        text-align: center;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        transition: transform 0.3s;
                    }
                    .feature-card:hover {
                        transform: translateY(-5px);
                    }
                    .feature-icon {
                        font-size: 2.5rem;
                        margin-bottom: 1rem;
                    }
                    .feature-card h3 {
                        margin-bottom: 0.5rem;
                        color: #333;
                    }
                    .feature-card p {
                        color: #666;
                        line-height: 1.6;
                    }`
            },
            footer: {
                name: 'Footer',
                html: `
                    <footer class="footer">
                        <div class="footer-content">
                            <div class="footer-section">
                                <h4>About Us</h4>
                                <p>Building the web, one component at a time.</p>
                            </div>
                            <div class="footer-section">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><a href="#home">Home</a></li>
                                    <li><a href="#services">Services</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                </ul>
                            </div>
                            <div class="footer-section">
                                <h4>Contact</h4>
                                <p>Email: info@example.com</p>
                                <p>Phone: (555) 123-4567</p>
                            </div>
                        </div>
                        <div class="footer-bottom">
                            <p>&copy; 2025 Your Company. All rights reserved.</p>
                        </div>
                    </footer>`,
                css: `
                    .footer {
                        background: #2d3748;
                        color: white;
                        padding: 4rem 2rem 1rem;
                    }
                    .footer-content {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 2rem;
                        max-width: 1200px;
                        margin: 0 auto;
                    }
                    .footer-section h4 {
                        margin-bottom: 1rem;
                        font-size: 1.2rem;
                    }
                    .footer-section ul {
                        list-style: none;
                        padding: 0;
                    }
                    .footer-section ul li {
                        margin-bottom: 0.5rem;
                    }
                    .footer-section a {
                        color: #cbd5e0;
                        text-decoration: none;
                        transition: color 0.3s;
                    }
                    .footer-section a:hover {
                        color: white;
                    }
                    .footer-bottom {
                        text-align: center;
                        margin-top: 3rem;
                        padding-top: 1rem;
                        border-top: 1px solid #4a5568;
                    }`
            }
        };

        this.initializeComponents();
        this.initializeEventListeners();
    }

    initializeComponents() {
        Object.entries(this.components).forEach(([id, component]) => {
            const componentEl = document.createElement('div');
            componentEl.className = 'component-item';
            componentEl.draggable = true;
            componentEl.dataset.componentId = id;
            componentEl.innerHTML = `
                <h3>${component.name}</h3>
                <div class="component-preview">
                    ${component.html}
                </div>
            `;
            this.componentsPanel.appendChild(componentEl);
        });
    }

    initializeEventListeners() {
        // Drag and drop functionality
        this.componentsPanel.querySelectorAll('.component-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.componentId);
            });
        });

        this.previewArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        });

        this.previewArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const componentId = e.dataTransfer.getData('text/plain');
            this.addComponentToPreview(componentId);
            this.updateCodeOutput();
        });

        // Export type change
        this.exportType.addEventListener('change', () => this.updateCodeOutput());
    }

    addComponentToPreview(componentId) {
        const component = this.components[componentId];
        if (!component) return;

        const componentEl = document.createElement('div');
        componentEl.className = 'preview-component';
        componentEl.innerHTML = component.html;
        
        // Add remove button
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-component';
        removeBtn.innerHTML = '×';
        removeBtn.onclick = () => {
            componentEl.remove();
            this.updateCodeOutput();
        };
        
        componentEl.appendChild(removeBtn);
        this.previewArea.appendChild(componentEl);
    }

    updateCodeOutput() {
        const components = Array.from(this.previewArea.querySelectorAll('.preview-component'));
        let output = '';

        if (this.exportType.value === 'react') {
            output = this.generateReactCode(components);
        } else {
            output = this.generateHTMLCode(components);
        }

        this.codeOutput.value = output;
    }

    generateReactCode(components) {
        let imports = 'import React from "react";\n\n';
        let componentCode = '';
        let styles = '';

        components.forEach((component, index) => {
            const componentId = Object.keys(this.components).find(
                key => this.components[key].html.trim() === component.querySelector(':not(.remove-component)').outerHTML.trim()
            );
            const componentData = this.components[componentId];

            if (componentData) {
                const componentName = componentData.name.replace(/\s+/g, '');
                componentCode += `
const ${componentName} = () => {
    return (
        ${this.convertHTMLToJSX(componentData.html)}
    );
};\n\n`;

                styles += componentData.css + '\n';
            }
        });

        return `${imports}
// Components
${componentCode}
// Main App Component
export default function App() {
    return (
        <div className="app">
            ${components.map(c => {
                const componentId = Object.keys(this.components).find(
                    key => this.components[key].html.trim() === c.querySelector(':not(.remove-component)').outerHTML.trim()
                );
                return `<${this.components[componentId].name.replace(/\s+/g, '')} />`;
            }).join('\n            ')}
        </div>
    );
}

// Styles
const styles = \`${styles}\`;`;
    }

    generateHTMLCode(components) {
        let html = '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Your Website</title>\n    <style>\n';
        
        let css = '';
        let body = '';

        components.forEach(component => {
            const componentId = Object.keys(this.components).find(
                key => this.components[key].html.trim() === component.querySelector(':not(.remove-component)').outerHTML.trim()
            );
            const componentData = this.components[componentId];

            if (componentData) {
                css += componentData.css + '\n';
                body += componentData.html + '\n';
            }
        });

        html += css;
        html += '    </style>\n</head>\n<body>\n';
        html += body;
        html += '</body>\n</html>';

        return html;
    }

    convertHTMLToJSX(html) {
        return html
            .replace(/class=/g, 'className=')
            .replace(/for=/g, 'htmlFor=');
    }
}
