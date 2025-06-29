document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const apiKeyInput = document.getElementById('api-key');
    const toggleApiKeyBtn = document.getElementById('toggle-api-key');
    const saveApiKeyBtn = document.getElementById('save-api-key');
    const apiKeyStatus = document.getElementById('api-key-status');
    const productDescription = document.getElementById('product-description');
    const generateButton = document.getElementById('generate-button');
    const generateButtonText = document.getElementById('generate-button-text');
    const spinner = document.querySelector('.spinner');
    const resultSection = document.getElementById('result-section');
    const salesScriptContent = document.getElementById('sales-script-content');
    const salesScriptEditor = document.getElementById('sales-script-editor');
    const copyButton = document.getElementById('copy-button');
    const editButton = document.getElementById('edit-button');
    const editActions = document.getElementById('edit-actions');
    const saveEditButton = document.getElementById('save-edit-button');
    const cancelEditButton = document.getElementById('cancel-edit-button');
    const languageSelect = document.getElementById('language-select');
    const toggleMarkdownButton = document.getElementById('toggle-markdown-button');
    const toggleMarkdownText = document.getElementById('toggle-markdown-text');
    const themeSwitch = document.getElementById('theme-switch');
    
    // Format options
    const useHeadings = document.getElementById('use-headings');
    const useBulletPoints = document.getElementById('use-bullet-points');
    const useBoldEmphasis = document.getElementById('use-bold-emphasis');
    const formatOptionsTitle = document.getElementById('format-options-title');
    const headingsLabel = document.getElementById('headings-label');
    const bulletPointsLabel = document.getElementById('bullet-points-label');
    const boldEmphasisLabel = document.getElementById('bold-emphasis-label');

    // Text elements for translation
    const headerSubtitle = document.getElementById('header-subtitle');
    const apiSectionTitle = document.getElementById('api-section-title');
    const apiKeyLabel = document.getElementById('api-key-label');
    const productSectionTitle = document.getElementById('product-section-title');
    const resultSectionTitle = document.getElementById('result-section-title');
    const copyButtonText = document.getElementById('copy-button-text');
    const editButtonText = document.getElementById('edit-button-text');
    const saveEditText = document.getElementById('save-edit-text');
    const cancelEditText = document.getElementById('cancel-edit-text');
    const footerText = document.getElementById('footer-text');

    // Constants
    const API_KEY_STORAGE_KEY = 'openrouter_api_key';
    const LANGUAGE_STORAGE_KEY = 'selected_language';
    const THEME_STORAGE_KEY = 'preferred_theme';
    const OPENROUTER_API_URL = 'https://generativelanguage.googleapis.com';
    const MODEL = 'gemini-2.5-flash';

    // State variables
    let isMarkdownView = true;
    let rawMarkdown = '';

    // Language translations
    const translations = {
        en: {
            headerSubtitle: 'Generate compelling sales scripts using the Blue Ocean Strategy technique',
            apiSectionTitle: 'API Configuration',
            apiKeyLabel: 'OpenRouter API Key:',
            saveApiKey: 'Save API Key',
            productSectionTitle: 'Product/Service Description',
            productPlaceholder: 'Describe your product or service in detail...',
            formatOptionsTitle: 'Output Format Options',
            useHeadings: 'Use Headings',
            useBulletPoints: 'Use Bullet Points',
            useBoldEmphasis: 'Bold Emphasis',
            generateButton: 'Generate Sales Script',
            generating: 'Generating...',
            resultSectionTitle: 'Your Blue Ocean Sales Script',
            copyButton: 'Copy to Clipboard',
            copied: 'Copied!',
            editButton: 'Edit',
            saveEdit: 'Save Changes',
            cancelEdit: 'Cancel',
            showRawMarkdown: 'Show Raw Markdown',
            showFormattedView: 'Show Formatted View',
            footerText: 'Powered by OpenRouter API with Google/LearnLM-1.5-Pro-Experimental model',
            apiKeyLoaded: 'API key loaded from storage',
            apiKeySaved: 'API key saved successfully',
            enterValidApiKey: 'Please enter a valid API key',
            enterApiKey: 'Please enter your OpenRouter API key',
            enterProductDescription: 'Please describe your product or service',
            copyFailed: 'Failed to copy: ',
            errorPrefix: 'Error: ',
            systemPrompt: 'You are an expert in Blue Ocean Strategy and sales copywriting. Your task is to create compelling sales scripts that highlight unique value propositions and make products/services irresistible to potential customers. Format your response using markdown with headings, bullet points, and bold text for emphasis to make it scannable and easy to read.',
            userPrompt: 'Create a compelling sales script for the following product/service using the Blue Ocean Strategy technique. Highlight unique value propositions, eliminate pain points, and make the offering irresistible to buy. FORMAT INSTRUCTIONS: ',
            blueOceanNoteTitle: 'Blue Ocean Strategy Note',
            blueOceanNoteContent: 'This sales script follows the Blue Ocean Strategy framework by focusing on creating uncontested market space rather than competing in existing markets. It highlights unique value propositions, eliminates industry pain points, and creates new demand by making the competition irrelevant. The script emphasizes differentiation and low cost simultaneously, helping you break the value-cost trade-off.'
        },
        ms: {
            headerSubtitle: 'Jana skrip jualan menarik menggunakan teknik Strategi Lautan Biru',
            apiSectionTitle: 'Konfigurasi API',
            apiKeyLabel: 'Kunci API OpenRouter:',
            saveApiKey: 'Simpan Kunci API',
            productSectionTitle: 'Penerangan Produk/Perkhidmatan',
            productPlaceholder: 'Terangkan produk atau perkhidmatan anda secara terperinci...',
            formatOptionsTitle: 'Pilihan Format Output',
            useHeadings: 'Gunakan Tajuk',
            useBulletPoints: 'Gunakan Poin Berpeluru',
            useBoldEmphasis: 'Penekanan Tebal',
            generateButton: 'Jana Skrip Jualan',
            generating: 'Sedang menjana...',
            resultSectionTitle: 'Skrip Jualan Lautan Biru Anda',
            copyButton: 'Salin ke Papan Keratan',
            copied: 'Disalin!',
            editButton: 'Sunting',
            saveEdit: 'Simpan Perubahan',
            cancelEdit: 'Batal',
            showRawMarkdown: 'Tunjukkan Markdown Mentah',
            showFormattedView: 'Tunjukkan Paparan Berformat',
            footerText: 'Dikuasakan oleh API OpenRouter dengan model Google/LearnLM-1.5-Pro-Experimental',
            apiKeyLoaded: 'Kunci API dimuat dari storan',
            apiKeySaved: 'Kunci API berjaya disimpan',
            enterValidApiKey: 'Sila masukkan kunci API yang sah',
            enterApiKey: 'Sila masukkan kunci API OpenRouter anda',
            enterProductDescription: 'Sila terangkan produk atau perkhidmatan anda',
            copyFailed: 'Gagal menyalin: ',
            errorPrefix: 'Ralat: ',
            systemPrompt: 'Anda adalah pakar dalam Strategi Lautan Biru dan penulisan jualan. Tugas anda adalah untuk mencipta skrip jualan yang menarik yang menyerlahkan cadangan nilai unik dan menjadikan produk/perkhidmatan tidak dapat ditolak oleh pelanggan berpotensi. Format jawapan anda menggunakan markdown dengan tajuk, poin berpeluru, dan teks tebal untuk penekanan untuk menjadikannya mudah dibaca.',
            userPrompt: 'Cipta skrip jualan yang menarik untuk produk/perkhidmatan berikut menggunakan teknik Strategi Lautan Biru. Tonjolkan cadangan nilai unik, hapuskan titik kesakitan, dan jadikan tawaran tidak dapat ditolak untuk dibeli. ARAHAN FORMAT: ',
            blueOceanNoteTitle: 'Nota Strategi Lautan Biru',
            blueOceanNoteContent: 'Skrip jualan ini mengikuti rangka kerja Strategi Lautan Biru dengan memberi tumpuan kepada mewujudkan ruang pasaran yang tidak dipertandingkan dan bukannya bersaing di pasaran sedia ada. Ia menyerlahkan cadangan nilai unik, menghapuskan titik kesakitan industri, dan mewujudkan permintaan baharu dengan menjadikan persaingan tidak relevan. Skrip ini menekankan pembezaan dan kos rendah secara serentak, membantu anda memecahkan pertukaran nilai-kos.'
        }
    };

    // Current language
    let currentLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'en';

    // Initialize tooltips
    const initTooltips = () => {
        tippy('[data-tippy-content]', {
            placement: 'top',
            arrow: true,
            animation: 'scale',
            duration: 200
        });
    };

    // Load theme preference
    const loadThemePreference = () => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-theme');
            themeSwitch.checked = true;
        } else {
            document.documentElement.classList.remove('dark-theme');
            themeSwitch.checked = false;
        }
    };

    // Toggle theme
    const toggleTheme = () => {
        if (themeSwitch.checked) {
            document.documentElement.classList.add('dark-theme');
            localStorage.setItem(THEME_STORAGE_KEY, 'dark');
        } else {
            document.documentElement.classList.remove('dark-theme');
            localStorage.setItem(THEME_STORAGE_KEY, 'light');
        }
    };

    // Load API key from local storage if available
    const loadApiKey = () => {
        const savedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
        if (savedApiKey) {
            apiKeyInput.value = savedApiKey;
            showStatusMessage(translations[currentLanguage].apiKeyLoaded, 'success');
        }
    };

    // Save API key to local storage
    const saveApiKey = () => {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey) {
            localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
            showStatusMessage(translations[currentLanguage].apiKeySaved, 'success');
        } else {
            showStatusMessage(translations[currentLanguage].enterValidApiKey, 'error');
        }
    };

    // Toggle API key visibility
    const toggleApiKeyVisibility = () => {
        const type = apiKeyInput.type === 'password' ? 'text' : 'password';
        apiKeyInput.type = type;
        toggleApiKeyBtn.innerHTML = type === 'password' 
            ? '<i class="fas fa-eye"></i>' 
            : '<i class="fas fa-eye-slash"></i>';
    };

    // Show status message
    const showStatusMessage = (message, type = '') => {
        apiKeyStatus.textContent = message;
        apiKeyStatus.className = 'status-message';
        if (type) {
            apiKeyStatus.classList.add(type);
        }
        
        // Clear message after 3 seconds
        setTimeout(() => {
            apiKeyStatus.textContent = '';
            apiKeyStatus.className = 'status-message';
        }, 3000);
    };

    // Get format instructions based on selected options
    const getFormatInstructions = () => {
        const instructions = [];
        
        if (useHeadings.checked) {
            instructions.push("Use markdown headings (# for main headings, ## for subheadings) to organize the content");
        }
        
        if (useBulletPoints.checked) {
            instructions.push("Use bullet points (- ) for listing features, benefits, and key points");
        }
        
        if (useBoldEmphasis.checked) {
            instructions.push("Use **bold text** to emphasize important points and key phrases");
        }
        
        instructions.push("Include clear sections for: Introduction, Value Proposition, Pain Points Addressed, Unique Features, Benefits, Call to Action");
        
        return instructions.join(". ") + ". Make the content scannable and easy to read.";
    };

    // Generate sales script
    const generateSalesScript = async () => {
        const apiKey = apiKeyInput.value.trim();
        const description = productDescription.value.trim();

        if (!apiKey) {
            showStatusMessage(translations[currentLanguage].enterApiKey, 'error');
            return;
        }

        if (!description) {
            showStatusMessage(translations[currentLanguage].enterProductDescription, 'error');
            return;
        }

        // Show loading state
        generateButton.disabled = true;
        generateButtonText.textContent = translations[currentLanguage].generating;
        spinner.classList.remove('hidden');

        try {
            const formatInstructions = getFormatInstructions();
            const prompt = translations[currentLanguage].userPrompt + formatInstructions + ". The product/service is: " + description;

            // First API call to generate the sales script
            const response = await fetch(OPENROUTER_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Blue Ocean Sales Script Generator'
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [
                        {
                            role: 'system',
                            content: translations[currentLanguage].systemPrompt
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Failed to generate sales script');
            }

            const data = await response.json();
            const salesScript = data.choices[0].message.content;
            
            // Second API call to generate the Blue Ocean Strategy note specific to the product/service
            const notePrompt = currentLanguage === 'en'
                ? `Based on the following product/service description, create a brief note (3-5 sentences) explaining how the Blue Ocean Strategy principles apply specifically to this offering. Focus on how it creates uncontested market space, differentiates from competitors, and creates new demand. Product/service: ${description}`
                : `Berdasarkan penerangan produk/perkhidmatan berikut, buat nota ringkas (3-5 ayat) yang menjelaskan bagaimana prinsip Strategi Lautan Biru khusus untuk tawaran ini. Fokus pada bagaimana ia mewujudkan ruang pasaran yang tidak dipertandingkan, membezakan dari pesaing, dan mewujudkan permintaan baru. Produk/perkhidmatan: ${description}`;
            
            const noteResponse = await fetch(OPENROUTER_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Blue Ocean Sales Script Generator'
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [
                        {
                            role: 'system',
                            content: currentLanguage === 'en'
                                ? 'You are an expert in Blue Ocean Strategy. Create concise, specific notes about how products/services apply Blue Ocean Strategy principles.'
                                : 'Anda adalah pakar dalam Strategi Lautan Biru. Buat nota ringkas dan khusus tentang bagaimana produk/perkhidmatan menggunakan prinsip Strategi Lautan Biru.'
                        },
                        {
                            role: 'user',
                            content: notePrompt
                        }
                    ]
                })
            });
            
            if (!noteResponse.ok) {
                throw new Error('Failed to generate Blue Ocean Strategy note');
            }
            
            const noteData = await noteResponse.json();
            const customNote = noteData.choices[0].message.content;
            
            // Add Blue Ocean Strategy note at the end
            const blueOceanNote = `\n\n---\n\n## ${translations[currentLanguage].blueOceanNoteTitle}\n${customNote}`;
            
            // Save raw markdown with the note
            rawMarkdown = salesScript + blueOceanNote;
            
            // Display the formatted result
            renderMarkdown(rawMarkdown);
            resultSection.classList.remove('hidden');
            
            // Scroll to result section
            resultSection.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            showStatusMessage(`${translations[currentLanguage].errorPrefix}${error.message}`, 'error');
        } finally {
            // Reset loading state
            generateButton.disabled = false;
            generateButtonText.textContent = translations[currentLanguage].generateButton;
            spinner.classList.add('hidden');
        }
    };

    // Render markdown content
    const renderMarkdown = (markdown) => {
        if (isMarkdownView) {
            salesScriptContent.innerHTML = marked.parse(markdown);
        } else {
            salesScriptContent.textContent = markdown;
        }
    };

    // Toggle between raw markdown and formatted view
    const toggleMarkdownView = () => {
        isMarkdownView = !isMarkdownView;
        
        if (isMarkdownView) {
            renderMarkdown(rawMarkdown);
            toggleMarkdownText.textContent = translations[currentLanguage].showRawMarkdown;
        } else {
            salesScriptContent.textContent = rawMarkdown;
            toggleMarkdownText.textContent = translations[currentLanguage].showFormattedView;
        }
    };

    // Copy sales script to clipboard
    const copyToClipboard = () => {
        const textToCopy = isMarkdownView ? rawMarkdown : salesScriptContent.textContent;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                const originalText = copyButtonText.textContent;
                copyButtonText.textContent = translations[currentLanguage].copied;
                setTimeout(() => {
                    copyButtonText.textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                showStatusMessage(translations[currentLanguage].copyFailed + err, 'error');
            });
    };

    // Enable editing of the sales script
    const enableEditing = () => {
        salesScriptEditor.value = rawMarkdown;
        salesScriptContent.classList.add('hidden');
        salesScriptEditor.classList.remove('hidden');
        editActions.classList.remove('hidden');
        editButton.disabled = true;
        toggleMarkdownButton.disabled = true;
    };

    // Save edited sales script
    const saveEditedScript = () => {
        rawMarkdown = salesScriptEditor.value;
        renderMarkdown(rawMarkdown);
        salesScriptContent.classList.remove('hidden');
        salesScriptEditor.classList.add('hidden');
        editActions.classList.add('hidden');
        editButton.disabled = false;
        toggleMarkdownButton.disabled = false;
    };

    // Cancel editing
    const cancelEditing = () => {
        salesScriptContent.classList.remove('hidden');
        salesScriptEditor.classList.add('hidden');
        editActions.classList.add('hidden');
        editButton.disabled = false;
        toggleMarkdownButton.disabled = false;
    };

    // Update UI language
    const updateLanguage = (lang) => {
        currentLanguage = lang;
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        
        // Update all text elements
        headerSubtitle.textContent = translations[lang].headerSubtitle;
        apiSectionTitle.textContent = translations[lang].apiSectionTitle;
        apiKeyLabel.textContent = translations[lang].apiKeyLabel;
        saveApiKeyBtn.textContent = translations[lang].saveApiKey;
        productSectionTitle.textContent = translations[lang].productSectionTitle;
        productDescription.placeholder = translations[lang].productPlaceholder;
        formatOptionsTitle.textContent = translations[lang].formatOptionsTitle;
        headingsLabel.textContent = translations[lang].useHeadings;
        bulletPointsLabel.textContent = translations[lang].useBulletPoints;
        boldEmphasisLabel.textContent = translations[lang].useBoldEmphasis;
        generateButtonText.textContent = translations[lang].generateButton;
        resultSectionTitle.textContent = translations[lang].resultSectionTitle;
        copyButtonText.textContent = translations[lang].copyButton;
        editButtonText.textContent = translations[lang].editButton;
        saveEditText.textContent = translations[lang].saveEdit;
        cancelEditText.textContent = translations[lang].cancelEdit;
        toggleMarkdownText.textContent = isMarkdownView ? 
            translations[lang].showRawMarkdown : 
            translations[lang].showFormattedView;
        footerText.textContent = translations[lang].footerText;
        
        // Reinitialize tooltips after language change
        initTooltips();
    };

    // Event Listeners
    toggleApiKeyBtn.addEventListener('click', toggleApiKeyVisibility);
    saveApiKeyBtn.addEventListener('click', saveApiKey);
    generateButton.addEventListener('click', generateSalesScript);
    copyButton.addEventListener('click', copyToClipboard);
    editButton.addEventListener('click', enableEditing);
    saveEditButton.addEventListener('click', saveEditedScript);
    cancelEditButton.addEventListener('click', cancelEditing);
    toggleMarkdownButton.addEventListener('click', toggleMarkdownView);
    languageSelect.addEventListener('change', (e) => updateLanguage(e.target.value));
    themeSwitch.addEventListener('change', toggleTheme);

    // Initialize
    languageSelect.value = currentLanguage;
    updateLanguage(currentLanguage);
    loadApiKey();
    loadThemePreference();
    initTooltips();
}); 
