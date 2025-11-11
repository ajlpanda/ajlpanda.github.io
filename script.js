// Publications database
const publications = [
    {
        title: "HybridEnsemble: A machine learning framework for accurate drug response prediction in cancer",
        authors: "Lu A, Chen L, Zhang Y, et al.",
        journal: "Nature Communications",
        year: 2024,
        tags: ["drug-response", "ml"],
        pdf: "#",
        doi: "10.1038/s41467-024-001"
    },
    {
        title: "Multi-omics integration reveals biomarkers for chemotherapy resistance in triple-negative breast cancer",
        authors: "Zhang Y, Lu A, Johnson R, et al.",
        journal: "Cancer Research",
        year: 2024,
        tags: ["drug-response", "precision"],
        pdf: "#",
        doi: "10.1158/0008-5472.CAN-24-001"
    },
    {
        title: "Deep learning models for personalized drug selection in precision oncology",
        authors: "Chen L, Lu A, Smith J, et al.",
        journal: "Cell Systems",
        year: 2024,
        tags: ["ml", "precision"],
        pdf: "#",
        doi: "10.1016/j.cels.2024.001"
    },
    {
        title: "Genomic and transcriptomic predictors of targeted therapy response in lung adenocarcinoma",
        authors: "Johnson R, Lu A, et al.",
        journal: "Journal of Clinical Oncology",
        year: 2023,
        tags: ["drug-response", "precision"],
        pdf: "#",
        doi: "10.1200/JCO.2023.001"
    },
    {
        title: "A comprehensive drug response database for cancer precision medicine",
        authors: "Lu A, Zhang Y, Chen L, et al.",
        journal: "Nucleic Acids Research",
        year: 2023,
        tags: ["drug-response"],
        pdf: "#",
        doi: "10.1093/nar/gk2023001"
    },
    {
        title: "Ensemble machine learning outperforms single algorithms in drug sensitivity prediction",
        authors: "Chen L, Smith J, Lu A, et al.",
        journal: "Bioinformatics",
        year: 2023,
        tags: ["ml"],
        pdf: "#",
        doi: "10.1093/bioinformatics/bt2023001"
    },
    {
        title: "Integration of clinical and genomic data improves immunotherapy response prediction",
        authors: "Lu A, Johnson R, Zhang Y, et al.",
        journal: "Clinical Cancer Research",
        year: 2023,
        tags: ["drug-response", "precision"],
        pdf: "#",
        doi: "10.1158/1078-0432.CCR-23-001"
    },
    {
        title: "Synergistic drug combination discovery through network-based approaches",
        authors: "Zhang Y, Lu A, Chen L, et al.",
        journal: "Molecular Systems Biology",
        year: 2024,
        tags: ["drug-response", "ml"],
        pdf: "#",
        doi: "10.15252/msb.2024001"
    }
];

function renderPublications(pubs) {
    const pubList = document.getElementById('pubList');
    if (pubs.length === 0) {
        pubList.innerHTML = '<p style="color: #718096; text-align: center; padding: 40px;">No publications found matching your search.</p>';
        return;
    }
    pubList.innerHTML = pubs.map(pub => `
        <div class="pub-item">
            <div class="pub-title">${pub.title}</div>
            <div class="pub-authors">${pub.authors}</div>
            <div class="pub-meta">📄 ${pub.journal}, ${pub.year}</div>
            <div class="pub-links">
                <a href="${pub.pdf}" target="_blank">PDF</a>
                <a href="https://doi.org/${pub.doi}" target="_blank">DOI</a>
                <a href="#" onclick="copyCitation('${pub.authors}', ${pub.year}, '${pub.title}', '${pub.journal}'); return false;">Cite</a>
            </div>
        </div>
    `).join('');
}

function copyCitation(authors, year, title, journal) {
    const citation = `${authors} (${year}). ${title}. ${journal}.`;
    navigator.clipboard.writeText(citation).then(() => {
        alert('✅ Citation copied to clipboard!\n\n' + citation);
    }).catch(() => {
        alert('Citation:\n\n' + citation);
    });
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize publications
    renderPublications(publications);

    // Search functionality
    const searchBox = document.getElementById('pubSearch');
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            const search = e.target.value.toLowerCase();
            const filtered = publications.filter(pub => 
                pub.title.toLowerCase().includes(search) ||
                pub.authors.toLowerCase().includes(search) ||
                pub.tags.some(tag => tag.includes(search)) ||
                pub.journal.toLowerCase().includes(search)
            );
            renderPublications(filtered);
        });
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

    // Add scroll-to-top button
    createScrollToTop();
});

// Scroll to top button
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #667eea;
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s;
        z-index: 1000;
    `;

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.transform = 'translateY(-5px)';
        scrollBtn.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
    });

    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'translateY(0)';
        scrollBtn.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
    });

    document.body.appendChild(scrollBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    // Animate sections on scroll
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
