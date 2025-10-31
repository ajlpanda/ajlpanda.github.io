// Publications database
const publications = [
    {
        title: "Machine learning approaches for predicting immunotherapy response in melanoma patients",
        authors: "Smith J, Chen L, Panda A, et al.",
        journal: "Journal of Clinical Oncology",
        year: 2024,
        tags: ["immunotherapy", "ml"],
        pdf: "#",
        doi: "10.1200/JCO.2024.001"
    },
    {
        title: "Integrative multi-omics analysis reveals novel therapeutic targets in triple-negative breast cancer",
        authors: "Panda A, Johnson R, Lee M, et al.",
        journal: "Nature Cancer",
        year: 2024,
        tags: ["genomics"],
        pdf: "#",
        doi: "10.1038/s43018-024-001"
    },
    {
        title: "Computational framework for identifying synthetic lethal interactions in cancer",
        authors: "Chen L, Panda A, Smith J, et al.",
        journal: "Cell Systems",
        year: 2023,
        tags: ["genomics", "ml"],
        pdf: "#",
        doi: "10.1016/j.cels.2023.001"
    },
    {
        title: "Epigenetic reprogramming in drug-resistant cancers: mechanisms and therapeutic opportunities",
        authors: "Johnson R, Panda A, et al.",
        journal: "Cancer Research",
        year: 2023,
        tags: ["genomics"],
        pdf: "#",
        doi: "10.1158/0008-5472.CAN-23-001"
    },
    {
        title: "Single-cell RNA sequencing reveals heterogeneity in tumor microenvironment",
        authors: "Lee M, Chen L, Panda A, et al.",
        journal: "Cell",
        year: 2023,
        tags: ["genomics", "immunotherapy"],
        pdf: "#",
        doi: "10.1016/j.cell.2023.001"
    },
    {
        title: "Deep learning models for cancer image analysis and diagnosis",
        authors: "Panda A, Zhang Y, Smith J, et al.",
        journal: "Nature Machine Intelligence",
        year: 2024,
        tags: ["ml"],
        pdf: "#",
        doi: "10.1038/s42256-024-001"
    }
];

function renderPublications(pubs) {
    const pubList = document.getElementById('pubList');
    if (pubs.length === 0) {
        pubList.innerHTML = '<p style="color: #7f8c8d; text-align: center; padding: 40px;">No publications found matching your search.</p>';
        return;
    }
    pubList.innerHTML = pubs.map(pub => `
        <div class="pub-item">
            <div class="pub-title">${pub.title}</div>
            <div class="pub-authors">${pub.authors}</div>
            <div class="pub-meta">${pub.journal}, ${pub.year}</div>
            <div class="pub-links">
                <a href="${pub.pdf}" target="_blank">📄 PDF</a>
                <a href="https://doi.org/${pub.doi}" target="_blank">🔗 DOI</a>
                <a href="#" onclick="alert('Citation copied to clipboard!\\n\\n${pub.authors} (${pub.year}). ${pub.title}. ${pub.journal}.'); return false;">📋 Cite</a>
            </div>
        </div>
    `).join('');
}

function filterPubs(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    let filtered = publications;
    if (filter !== 'all') {
        if (filter.match(/^\d{4}$/)) {
            filtered = publications.filter(pub => pub.year === parseInt(filter));
        } else {
            filtered = publications.filter(pub => pub.tags.includes(filter));
        }
    }
    renderPublications(filtered);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize publications
    renderPublications(publications);

    // Search functionality
    document.getElementById('pubSearch').addEventListener('input', (e) => {
        const search = e.target.value.toLowerCase();
        const filtered = publications.filter(pub => 
            pub.title.toLowerCase().includes(search) ||
            pub.authors.toLowerCase().includes(search) ||
            pub.tags.some(tag => tag.includes(search)) ||
            pub.journal.toLowerCase().includes(search)
        );
        renderPublications(filtered);
    });
});

// Research projects toggle
function toggleProject(element) {
    const details = element.querySelector('.project-details');
    const toggle = element.querySelector('.project-toggle');
    
    details.classList.toggle('active');
    toggle.textContent = details.classList.contains('active') ? '−' : '+';
}

// Team portal functionality
let loggedIn = false;
const teamUploads = [
    {
        title: "TCGA Lung Cancer Analysis - Q1 2024",
        author: "Dr. Smith",
        date: "2024-03-15",
        category: "🧬 Genomic Data",
        description: "Comprehensive analysis of 250 lung cancer samples"
    },
    {
        title: "Drug Response Screening Results",
        author: "Dr. Chen",
        date: "2024-03-10",
        category: "📈 Analysis Results",
        description: "High-throughput screening across 50 compounds"
    },
    {
        title: "Clinical Trial Protocol v2.3",
        author: "Dr. Johnson",
        date: "2024-03-08",
        category: "📋 Protocols",
        description: "Updated immunotherapy trial protocol"
    }
];

function login(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple demo login (in production, use proper authentication)
    if (email && password) {
        loggedIn = true;
        document.getElementById('loginView').classList.add('hidden');
        document.getElementById('uploadView').classList.remove('hidden');
        renderUploads();
    } else {
        alert('Please enter valid credentials');
    }
}

function logout() {
    loggedIn = false;
    document.getElementById('loginView').classList.remove('hidden');
    document.getElementById('uploadView').classList.add('hidden');
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}

function renderUploads() {
    const uploadsList = document.getElementById('uploadsList');
    if (teamUploads.length === 0) {
        uploadsList.innerHTML = '<p style="color: #7f8c8d; text-align: center; padding: 20px;">No uploads yet. Be the first to share!</p>';
        return;
    }
    uploadsList.innerHTML = teamUploads.map(upload => `
        <div class="upload-item">
            <div class="upload-header">
                <div class="upload-title">${upload.title}</div>
            </div>
            <p style="color: #5a6c7d; font-size: 0.9em; margin-bottom: 8px;">${upload.description}</p>
            <div class="upload-meta">👤 ${upload.author} • 📅 ${upload.date}</div>
            <span class="upload-category">${upload.category}</span>
        </div>
    `).join('');
}

// File upload handling
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    let selectedFiles = [];

    if (uploadArea && fileInput) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('dragover');
            }, false);
        });

        uploadArea.addEventListener('drop', handleDrop, false);
        fileInput.addEventListener('change', handleFiles, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles({ target: { files: files } });
        }

        function handleFiles(e) {
            selectedFiles = [...e.target.files];
            displaySelectedFiles();
        }

        function displaySelectedFiles() {
            const container = document.getElementById('selectedFiles');
            if (selectedFiles.length > 0) {
                container.innerHTML = `
                    <div style="background: white; padding: 15px; border-radius: 8px; border: 2px solid #e8f4f8;">
                        <strong style="color: #2c3e50;">📎 Selected Files (${selectedFiles.length}):</strong>
                        <ul style="margin-top: 10px; color: #5a6c7d; list-style: none;">
                            ${selectedFiles.map(file => `<li style="padding: 5px 0;">✓ ${file.name} (${(file.size / 1024).toFixed(2)} KB)</li>`).join('')}
                        </ul>
                    </div>
                `;
            } else {
                container.innerHTML = '';
            }
        }

        window.submitUpload = function(e) {
            e.preventDefault();
            
            const title = document.getElementById('uploadTitle').value;
            const desc = document.getElementById('uploadDesc').value;
            const category = document.getElementById('uploadCategory').value;
            
            if (selectedFiles.length === 0) {
                alert('⚠️ Please select at least one file to upload');
                return;
            }
            
            // Add to uploads list
            teamUploads.unshift({
                title: title,
                author: "You",
                date: new Date().toISOString().split('T')[0],
                category: category,
                description: desc
            });
            
            // Clear form
            document.getElementById('uploadTitle').value = '';
            document.getElementById('uploadDesc').value = '';
            selectedFiles = [];
            fileInput.value = '';
            displaySelectedFiles();
            
            // Refresh uploads list
            renderUploads();
            
            alert('✅ Upload successful! Your data has been shared with the team.');
        };
    }
});

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
