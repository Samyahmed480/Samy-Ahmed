document.addEventListener('DOMContentLoaded', () => {
    // تفعيل أزرار التصفية
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // إزالة الفلتر النشط
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            newsItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'flex';
                    return;
                }

                if (item.dataset.category === filter) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // تفعيل أزرار الصفحات
    const pageBtns = document.querySelectorAll('.page-btn');

    pageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pageBtns.forEach(b => b.classList.remove('active'));
            if (!btn.querySelector('i')) { // تجاهل أزرار السابق والتالي
                btn.classList.add('active');
            }
        });
    });

    // إضافة تأثيرات حركية للأخبار
    newsItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
});
