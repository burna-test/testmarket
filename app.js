// Local storage keys
const ITEMS_STORAGE_KEY = 'freeTechMarketItems';
const SNIPPETS_STORAGE_KEY = 'snipvault_snippets';
const CATEGORIES_STORAGE_KEY = 'snipvault_categories';

// Sample initial items
const initialItems = [
    {
        id: 1,
        name: 'Gaming Laptop',
        description: 'Slightly used gaming laptop, perfect for students learning game development',
        condition: 'Good',
        location: 'San Francisco',
        date: '2025-03-03'
    },
    {
        id: 2,
        name: 'Graphics Tablet',
        description: 'Professional drawing tablet, great for digital artists',
        condition: 'Like New',
        location: 'New York',
        date: '2025-03-03'
    }
];

// Initialize items in local storage if empty
if (!localStorage.getItem(ITEMS_STORAGE_KEY)) {
    localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(initialItems));
}

// DOM Elements
const itemsContainer = document.getElementById('itemsContainer');
const shareItemForm = document.getElementById('shareItemForm');
const searchInput = document.getElementById('searchInput');
const categoryList = document.getElementById('categoryList');
const snippetList = document.getElementById('snippetList');
const snippetForm = document.getElementById('snippetForm');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const newSnippetBtn = document.getElementById('newSnippetBtn');
const saveSnippetBtn = document.getElementById('saveSnippetBtn');
const copySnippetBtn = document.getElementById('copySnippetBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const toast = document.getElementById('toast');

// State
let snippets = JSON.parse(localStorage.getItem(SNIPPETS_STORAGE_KEY)) || [];
let currentCategory = 'all';
let editingSnippetId = null;

// Load and display items
function loadItems() {
    const items = JSON.parse(localStorage.getItem(ITEMS_STORAGE_KEY));
    itemsContainer.innerHTML = '';
    
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>Condition:</strong> ${item.condition}</p>
            <p><strong>Location:</strong> ${item.location}</p>
            <p><strong>Posted:</strong> ${item.date}</p>
            <button onclick="requestItem(${item.id})">Request Item</button>
        `;
        itemsContainer.appendChild(itemCard);
    });
}

// Add new item
function addItem(e) {
    e.preventDefault();
    
    const items = JSON.parse(localStorage.getItem(ITEMS_STORAGE_KEY));
    const newItem = {
        id: Date.now(),
        name: document.getElementById('itemName').value,
        description: document.getElementById('itemDescription').value,
        condition: document.getElementById('condition').value,
        location: document.getElementById('location').value,
        date: new Date().toISOString().split('T')[0]
    };
    
    items.push(newItem);
    localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
    
    // Reset form and reload items
    e.target.reset();
    loadItems();
    
    // Show success message
    alert('Thank you for sharing! Your item has been listed.');
}

// Request item function
function requestItem(itemId) {
    const items = JSON.parse(localStorage.getItem(ITEMS_STORAGE_KEY));
    const item = items.find(i => i.id === itemId);
    
    if (confirm(`Would you like to request the ${item.name}? If you click OK, we'll connect you with the owner.`)) {
        // In a real application, this would involve a backend service
        alert('Request sent! In a real application, this would connect you with the item owner.');
    }
}

// Event listeners
shareItemForm.addEventListener('submit', addItem);

// Initial load
loadItems();

// AI-powered documentation patterns and templates
const docPatterns = {
    javascript: {
        functionPattern: /\/\*\*([\s\S]*?)\*\/|\/\/(.*)|function\s+(\w+)\s*\((.*?)\)|const\s+(\w+)\s*=\s*(?:async\s*)?\((.*?)\)\s*=>/g,
        classPattern: /\/\*\*([\s\S]*?)\*\/|\/\/(.*)|class\s+(\w+)(?:\s+extends\s+(\w+))?/g
    },
    python: {
        functionPattern: /#\s*(.*)|def\s+(\w+)\s*\((.*?)\)/g,
        classPattern: /#\s*(.*)|class\s+(\w+)(?:\((.*?)\))?:/g
    },
    java: {
        functionPattern: /\/\*\*([\s\S]*?)\*\/|\/\/(.*)|(?:public|private|protected)?\s+(?:static\s+)?[\w<>[\],\s]+\s+(\w+)\s*\((.*?)\)/g,
        classPattern: /\/\*\*([\s\S]*?)\*\/|\/\/(.*)|(?:public|private|protected)?\s+class\s+(\w+)(?:\s+extends\s+(\w+))?(?:\s+implements\s+([^{]+))?/g
    }
};

// DOM Elements
const codeInput = document.getElementById('codeInput');
const docOutput = document.getElementById('docOutput');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const languageSelect = document.getElementById('languageSelect');

// Main documentation generator function
function generateDocumentation() {
    const code = codeInput.value;
    const language = languageSelect.value;
    
    if (!code.trim()) {
        alert('Please enter some code first!');
        return;
    }

    // Show loading state
    generateBtn.classList.add('loading');
    generateBtn.textContent = 'Generating...';

    // Process the code
    setTimeout(() => {
        const documentation = processCode(code, language);
        displayDocumentation(documentation);
        
        // Reset button state
        generateBtn.classList.remove('loading');
        generateBtn.textContent = 'Generate Documentation';
    }, 1000);
}

// Process code and generate documentation
function processCode(code, language) {
    const patterns = docPatterns[language];
    let documentation = '';
    let matches;

    // Process classes
    while ((matches = patterns.classPattern.exec(code)) !== null) {
        const [fullMatch, comment, singleLineComment, className, extends_, implements_] = matches;
        
        // Extract existing documentation comments
        const docs = extractDocs(comment, singleLineComment);
        
        documentation += `\n### Class: ${className}\n\n`;
        if (docs) documentation += `${docs}\n\n`;
        if (extends_) documentation += `Extends: ${extends_}\n`;
        if (implements_) documentation += `Implements: ${implements_}\n`;
        documentation += '\n';
    }

    // Process functions
    patterns.functionPattern.lastIndex = 0; // Reset regex index
    while ((matches = patterns.functionPattern.exec(code)) !== null) {
        const [fullMatch, comment, singleLineComment, funcName, params] = matches;
        
        // Skip if it's part of a class definition
        if (fullMatch.includes('class ')) continue;
        
        if (funcName) {
            const docs = extractDocs(comment, singleLineComment);
            
            documentation += `#### Function: ${funcName}\n\n`;
            if (docs) documentation += `${docs}\n\n`;
            if (params) documentation += `Parameters: ${params}\n`;
            documentation += '\n';
        }
    }

    return documentation || 'No documentation patterns found in the code.';
}

// Extract documentation from comments
function extractDocs(comment, singleLineComment) {
    if (comment) {
        return comment
            .replace(/\/\*\*|\*\/|\*/g, '')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line)
            .join('\n');
    }
    if (singleLineComment) {
        return singleLineComment.trim();
    }
    return '';
}

// Display the generated documentation
function displayDocumentation(documentation) {
    docOutput.innerHTML = marked.parse(documentation);
    Prism.highlightAll();
}

// Copy documentation to clipboard
async function copyToClipboard() {
    try {
        await navigator.clipboard.writeText(docOutput.textContent);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy to Clipboard';
        }, 2000);
    } catch (err) {
        alert('Failed to copy documentation. Please try again.');
    }
}

// Add marked.js for Markdown parsing
const markedScript = document.createElement('script');
markedScript.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
document.head.appendChild(markedScript);

// Event listeners
generateBtn.addEventListener('click', generateDocumentation);
copyBtn.addEventListener('click', copyToClipboard);

// Example code for demonstration
const exampleCode = {
    javascript: `/**
 * Calculates the fibonacci sequence up to n terms
 * @param {number} n - Number of terms
 * @returns {Array} Array of fibonacci numbers
 */
function fibonacci(n) {
    let sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence[i] = sequence[i-1] + sequence[i-2];
    }
    return sequence;
}`,
    python: `# Calculator class for basic arithmetic operations
class Calculator:
    def __init__(self):
        self.result = 0
    
    # Adds two numbers and stores the result
    def add(self, a, b):
        self.result = a + b
        return self.result`,
    java: `/**
 * Represents a bank account
 */
public class BankAccount {
    private double balance;
    
    /**
     * Withdraws money from the account
     * @param amount Amount to withdraw
     */
    public void withdraw(double amount) {
        this.balance -= amount;
    }
}`
};

// Set example code based on selected language
languageSelect.addEventListener('change', () => {
    codeInput.value = exampleCode[languageSelect.value];
});

// Initialize highlight.js
hljs.highlightAll();

// Event Listeners
searchInput.addEventListener('input', filterSnippets);
categoryList.addEventListener('click', handleCategoryClick);
addCategoryBtn.addEventListener('click', handleAddCategory);
newSnippetBtn.addEventListener('click', handleNewSnippet);
saveSnippetBtn.addEventListener('click', handleSaveSnippet);
copySnippetBtn.addEventListener('click', handleCopySnippet);
exportBtn.addEventListener('click', handleExport);
importBtn.addEventListener('click', handleImport);

// Load initial snippets
renderSnippets();

// Filter snippets based on search
function filterSnippets() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredSnippets = snippets.filter(snippet => {
        return (
            snippet.title.toLowerCase().includes(searchTerm) ||
            snippet.description.toLowerCase().includes(searchTerm) ||
            snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    });
    renderSnippetList(filteredSnippets);
}

// Handle category selection
function handleCategoryClick(e) {
    if (e.target.tagName === 'LI') {
        const category = e.target.dataset.category;
        currentCategory = category;
        
        // Update active state
        categoryList.querySelectorAll('li').forEach(li => {
            li.classList.remove('active');
        });
        e.target.classList.add('active');
        
        renderSnippets();
    }
}

// Add new category
function handleAddCategory() {
    const category = prompt('Enter new category name:');
    if (category) {
        const li = document.createElement('li');
        li.textContent = category;
        li.dataset.category = category.toLowerCase();
        categoryList.insertBefore(li, addCategoryBtn);
        
        // Add option to select
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        document.getElementById('snippetCategory').appendChild(option);
    }
}

// Create new snippet
function handleNewSnippet() {
    editingSnippetId = null;
    snippetForm.reset();
    document.getElementById('snippetTitle').focus();
}

// Save snippet
function handleSaveSnippet() {
    const title = document.getElementById('snippetTitle').value;
    const category = document.getElementById('snippetCategory').value;
    const code = document.getElementById('snippetCode').value;
    const description = document.getElementById('snippetDescription').value;
    const tags = document.getElementById('snippetTags').value
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

    if (!title || !code) {
        showToast('Please fill in required fields', 'error');
        return;
    }

    const snippet = {
        id: editingSnippetId || Date.now(),
        title,
        category,
        code,
        description,
        tags,
        created: editingSnippetId ? snippets.find(s => s.id === editingSnippetId).created : new Date().toISOString(),
        modified: new Date().toISOString()
    };

    if (editingSnippetId) {
        snippets = snippets.map(s => s.id === editingSnippetId ? snippet : s);
    } else {
        snippets.unshift(snippet);
    }

    saveSnippets();
    renderSnippets();
    handleNewSnippet();
    showToast('Snippet saved successfully!');
}

// Copy snippet to clipboard
function handleCopySnippet() {
    const code = document.getElementById('snippetCode').value;
    navigator.clipboard.writeText(code).then(() => {
        showToast('Copied to clipboard!');
    });
}

// Export snippets
function handleExport() {
    const dataStr = JSON.stringify(snippets, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportName = 'snippets_' + new Date().toISOString().split('T')[0] + '.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportName);
    linkElement.click();
}

// Import snippets
function handleImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = event => {
            try {
                const importedSnippets = JSON.parse(event.target.result);
                snippets = [...importedSnippets, ...snippets];
                saveSnippets();
                renderSnippets();
                showToast('Snippets imported successfully!');
            } catch (err) {
                showToast('Error importing snippets', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Render all snippets
function renderSnippets() {
    let filteredSnippets = snippets;
    if (currentCategory !== 'all') {
        filteredSnippets = snippets.filter(snippet => snippet.category === currentCategory);
    }
    renderSnippetList(filteredSnippets);
}

// Render snippet list
function renderSnippetList(snippetsToRender) {
    snippetList.innerHTML = '';
    
    snippetsToRender.forEach(snippet => {
        const div = document.createElement('div');
        div.className = 'snippet-item';
        div.innerHTML = `
            <h4>${snippet.title}</h4>
            <p>${snippet.description || ''}</p>
            <div class="snippet-tags">
                ${snippet.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;
        
        div.onclick = () => editSnippet(snippet);
        snippetList.appendChild(div);
    });
}

// Edit existing snippet
function editSnippet(snippet) {
    editingSnippetId = snippet.id;
    document.getElementById('snippetTitle').value = snippet.title;
    document.getElementById('snippetCategory').value = snippet.category;
    document.getElementById('snippetCode').value = snippet.code;
    document.getElementById('snippetDescription').value = snippet.description;
    document.getElementById('snippetTags').value = snippet.tags.join(', ');
}

// Save snippets to localStorage
function saveSnippets() {
    localStorage.setItem(SNIPPETS_STORAGE_KEY, JSON.stringify(snippets));
}

// Show toast message
function showToast(message, type = 'success') {
    toast.textContent = message;
    toast.style.backgroundColor = type === 'success' ? 'var(--success-color)' : 'var(--danger-color)';
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Tool Navigation
document.querySelectorAll('.tool-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Show active tool section
        document.querySelectorAll('.tool-section').forEach(section => section.classList.remove('active'));
        document.getElementById(button.dataset.tool + 'Tool').classList.add('active');
    });
});

// Base64 Tool
const base64Input = document.getElementById('base64Input');
const base64Result = document.getElementById('base64Result');

// Base64 sample texts
document.querySelectorAll('#base64Tool .sample-grid button').forEach(button => {
    button.addEventListener('click', () => {
        base64Input.value = button.dataset.text;
        base64Result.innerHTML = ''; // Clear previous results
    });
});

document.getElementById('encodeBase64').addEventListener('click', () => {
    try {
        const text = base64Input.value;
        if (!text.trim()) {
            base64Result.innerHTML = '<div class="info">Please enter text to encode</div>';
            return;
        }
        const encoded = btoa(text);
        base64Result.innerHTML = `
            <div class="result-header">Encoded Result:</div>
            <div class="result-content">${encoded}</div>
            <div class="result-stats">
                Original length: ${text.length} characters<br>
                Encoded length: ${encoded.length} characters
            </div>`;
    } catch (error) {
        base64Result.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
});

document.getElementById('decodeBase64').addEventListener('click', () => {
    try {
        const text = base64Input.value;
        if (!text.trim()) {
            base64Result.innerHTML = '<div class="info">Please enter Base64 text to decode</div>';
            return;
        }
        const decoded = atob(text);
        base64Result.innerHTML = `
            <div class="result-header">Decoded Result:</div>
            <div class="result-content">${decoded}</div>
            <div class="result-stats">
                Original length: ${text.length} characters<br>
                Decoded length: ${decoded.length} characters
            </div>`;
    } catch (error) {
        base64Result.innerHTML = `<div class="error">Error: Invalid Base64 string. Make sure your input is properly encoded.</div>`;
    }
});

document.getElementById('clearBase64').addEventListener('click', () => {
    base64Input.value = '';
    base64Result.innerHTML = '';
});

// JSON Tool
const jsonInput = document.getElementById('jsonInput');
const jsonResult = document.getElementById('jsonResult');

// JSON sample data
document.querySelectorAll('#jsonTool .sample-grid button').forEach(button => {
    button.addEventListener('click', () => {
        jsonInput.value = button.dataset.json;
        // Auto-format the sample
        try {
            const obj = JSON.parse(button.dataset.json);
            jsonInput.value = JSON.stringify(obj, null, 2);
        } catch (error) {
            console.error('Invalid sample JSON:', error);
        }
    });
});

document.getElementById('formatJson').addEventListener('click', () => {
    try {
        const text = jsonInput.value.trim();
        if (!text) {
            jsonResult.innerHTML = '<div class="info">Please enter JSON to format</div>';
            return;
        }
        
        const obj = JSON.parse(text);
        const formatted = JSON.stringify(obj, null, 2);
        
        // Count elements
        const stats = analyzeJson(obj);
        
        jsonResult.innerHTML = `
            <div class="result-header">Formatted JSON:</div>
            <pre class="result-content">${formatted}</pre>
            <div class="result-stats">
                Objects: ${stats.objects}<br>
                Arrays: ${stats.arrays}<br>
                Total Properties: ${stats.properties}<br>
                Nesting Level: ${stats.depth}
            </div>`;
    } catch (error) {
        jsonResult.innerHTML = `
            <div class="error">
                Error: Invalid JSON<br>
                <span class="error-details">${error.message}</span>
            </div>`;
    }
});

document.getElementById('minifyJson').addEventListener('click', () => {
    try {
        const text = jsonInput.value.trim();
        if (!text) {
            jsonResult.innerHTML = '<div class="info">Please enter JSON to minify</div>';
            return;
        }
        
        const obj = JSON.parse(text);
        const minified = JSON.stringify(obj);
        
        const compressionRatio = ((text.length - minified.length) / text.length * 100).toFixed(1);
        
        jsonResult.innerHTML = `
            <div class="result-header">Minified JSON:</div>
            <div class="result-content">${minified}</div>
            <div class="result-stats">
                Original size: ${text.length} characters<br>
                Minified size: ${minified.length} characters<br>
                Space saved: ${compressionRatio}%
            </div>`;
    } catch (error) {
        jsonResult.innerHTML = `
            <div class="error">
                Error: Invalid JSON<br>
                <span class="error-details">${error.message}</span>
            </div>`;
    }
});

document.getElementById('clearJson').addEventListener('click', () => {
    jsonInput.value = '';
    jsonResult.innerHTML = '';
});

// Helper function to analyze JSON structure
function analyzeJson(obj, depth = 0) {
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
                const childStats = analyzeJson(item, depth + 1);
                stats = combineStats(stats, childStats);
            }
        });
    } else if (typeof obj === 'object' && obj !== null) {
        stats.objects++;
        stats.properties += Object.keys(obj).length;
        
        Object.values(obj).forEach(value => {
            if (typeof value === 'object' && value !== null) {
                const childStats = analyzeJson(value, depth + 1);
                stats = combineStats(stats, childStats);
            }
        });
    }
    
    return stats;
}

function combineStats(stats1, stats2) {
    return {
        objects: stats1.objects + stats2.objects,
        arrays: stats1.arrays + stats2.arrays,
        properties: stats1.properties + stats2.properties,
        depth: Math.max(stats1.depth, stats2.depth)
    };
}

// RegEx Tool
const inputText = document.getElementById('inputText');
const pattern = document.getElementById('pattern');
const flags = document.getElementById('flags');
const results = document.getElementById('results');

// Add event listeners for RegEx tool
inputText.addEventListener('input', testRegex);
pattern.addEventListener('input', testRegex);
flags.addEventListener('input', testRegex);

// Common patterns
document.querySelectorAll('.pattern-grid button').forEach(button => {
    button.addEventListener('click', () => {
        pattern.value = button.dataset.pattern;
        flags.value = button.dataset.flags || '';
        testRegex();
    });
});

// Sample text
document.querySelectorAll('.sample-grid button').forEach(button => {
    button.addEventListener('click', () => {
        inputText.value = button.textContent;
        testRegex();
    });
});

function testRegex() {
    if (!inputText.value || !pattern.value) {
        results.textContent = 'Enter both text and pattern to test';
        results.className = 'results';
        return;
    }

    try {
        const regex = new RegExp(pattern.value, flags.value);
        const matches = [];
        const text = inputText.value;
        
        if (flags.value.includes('g')) {
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
        
        displayResults(matches, text);
    } catch (error) {
        results.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

function displayResults(matches, text) {
    if (matches.length === 0) {
        results.textContent = 'No matches found';
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
    results.innerHTML = html + 'Text with highlights:\n' + highlightedText;
}

// Initialize with empty state
testRegex();
