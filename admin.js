document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('projectForm');
    const techInput = document.getElementById('techInput');
    const tagsContainer = document.querySelector('.tags-container');
    const imageInput = document.getElementById('projectImage');
    const imagePreview = document.querySelector('.image-preview');

    // إدارة التقنيات
    const tags = new Set();

    techInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const value = techInput.value.trim();
            if (value && !tags.has(value)) {
                addTag(value);
                techInput.value = '';
            }
        }
    });

    function addTag(text) {
        tags.add(text);
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.innerHTML = `
            <button type="button" onclick="removeTag(this)">×</button>
            ${text}
        `;
        tagsContainer.appendChild(tag);
    }

    window.removeTag = function (button) {
        const tag = button.parentElement;
        const text = tag.textContent.slice(1);
        tags.delete(text);
        tag.remove();
    };

    // معاينة الصورة
    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.innerHTML = `
                    <img src="${e.target.result}" alt="معاينة" style="max-width: 200px; margin-top: 1rem;">
                `;
            };
            reader.readAsDataURL(file);
        }
    });

    // إرسال النموذج
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // هنا يمكنك إضافة كود لحفظ المشروع
        alert('تم حفظ المشروع بنجاح!');
    });

    // أزرار التحكم في المشاريع
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
                btn.closest('.project-card').remove();
            }
        });
    });

    document.querySelectorAll('.btn-visibility').forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // استرجاع إعدادات الشعار عند تحميل الصفحة
    const savedSettings = localStorage.getItem('logoSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        logoText.value = settings.text;
        logoColor.value = settings.textColor;
        glowColor.value = settings.glowColor;
        updateLogoPreview();
    }

    // استرجاع الصورة الشخصية عند تحميل الصفحة
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        previewProfileImage.src = savedImage;
    }

    // News Management
    const newsForm = document.getElementById('newsForm');
    const newsGrid = document.querySelector('.news-grid');
    
    if (newsForm) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const title = document.getElementById('newsTitle').value;
            const content = document.getElementById('newsContent').value;
            const category = document.getElementById('newsCategory').value;
            
            // Create news item
            const newsItem = createNewsItem(title, content, category);
            newsGrid.insertBefore(newsItem, newsGrid.firstChild);
            
            // Reset form
            newsForm.reset();
            document.querySelector('.image-preview').innerHTML = '';
        });
    }

    // Filter news items
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter news items
            const newsItems = document.querySelectorAll('.news-item');
            newsItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

function createNewsItem(title, content, category) {
    const date = new Date().toLocaleDateString('ar-EG');
    const link = document.getElementById('newsLink').value;
    
    const newsItem = document.createElement('div');
    newsItem.className = 'news-item';
    newsItem.dataset.category = category;
    
    newsItem.innerHTML = `
        <div class="news-header">
            <span class="news-category">${getCategoryName(category)}</span>
            <div class="news-actions">
                <button class="btn-edit" onclick="editNews(this)" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteNews(this)" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="news-content">
            <h3>${title}</h3>
            <p>${content}</p>
            ${link ? `
                <div class="news-link">
                    <a href="${link}" target="_blank" class="btn-link">
                        <i class="fas fa-external-link-alt"></i>
                        اقرأ المزيد
                    </a>
                </div>
            ` : ''}
            <div class="news-date">
                <i class="fas fa-calendar"></i>
                ${date}
            </div>
        </div>
    `;
    
    return newsItem;
}

function getCategoryName(category) {
    const categories = {
        'general': 'عام',
        'tech': 'تقنية',
        'events': 'فعاليات',
        'updates': 'تحديثات'
    };
    return categories[category] || category;
}

function deleteNews(btn) {
    if (confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
        btn.closest('.news-item').remove();
    }
}

function editNews(btn) {
    const newsItem = btn.closest('.news-item');
    const title = newsItem.querySelector('h3').textContent;
    const content = newsItem.querySelector('p').textContent;
    const category = newsItem.dataset.category;
    const linkElement = newsItem.querySelector('.btn-link');
    
    // Fill form with news data
    document.getElementById('newsTitle').value = title;
    document.getElementById('newsContent').value = content;
    document.getElementById('newsCategory').value = category;
    document.getElementById('newsLink').value = linkElement ? linkElement.href : '';
    
    // Remove the old news item
    newsItem.remove();
    
    // Scroll to form
    document.querySelector('.news-form').scrollIntoView({ behavior: 'smooth' });
}

// إضافة وظائف تغيير الشعار
const logoForm = document.getElementById('logoForm');
const logoText = document.getElementById('logoText');
const previewLogoText = document.getElementById('previewLogoText');
const logoColor = document.getElementById('logoColor');
const glowColor = document.getElementById('glowColor');

// تحديث المعاينة المباشرة
logoText.addEventListener('input', updateLogoPreview);
logoColor.addEventListener('input', updateLogoPreview);
glowColor.addEventListener('input', updateLogoPreview);

function updateLogoPreview() {
    previewLogoText.textContent = logoText.value;
    previewLogoText.style.color = logoColor.value;
    previewLogoText.style.textShadow = `0 0 15px ${glowColor.value}`;
}

// حفظ إعدادات الشعار
logoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // هنا يمكنك إضافة كود لحفظ إعدادات الشعار في Local Storage أو قاعدة البيانات
    const logoSettings = {
        text: logoText.value,
        textColor: logoColor.value,
        glowColor: glowColor.value
    };

    localStorage.setItem('logoSettings', JSON.stringify(logoSettings));
    alert('تم حفظ إعدادات الشعار بنجاح!');
});

// إضافة وظائف تغيير الصورة الشخصية
const profileForm = document.getElementById('profileForm');
const profileImage = document.getElementById('profileImage');
const previewProfileImage = document.getElementById('previewProfileImage');

// معاينة الصورة الشخصية
profileImage.addEventListener('change', () => {
    const file = profileImage.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewProfileImage.src = e.target.result;
            // حفظ الصورة مؤقتاً في localStorage
            localStorage.setItem('tempProfileImage', e.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// حفظ الصورة الشخصية
profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const imageData = localStorage.getItem('tempProfileImage');
    if (imageData) {
        // حفظ الصورة بشكل دائم في localStorage
        localStorage.setItem('profileImage', imageData);
        alert('تم حفظ الصورة الشخصية بنجاح!');
    }
});
