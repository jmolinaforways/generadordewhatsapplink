document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('generator-form');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const generatedLinkInput = document.getElementById('generated-link');
    const copyBtn = document.getElementById('copy-btn');
    const resultContainer = document.getElementById('result-area');
    const openBtn = document.getElementById('generate-btn'); // reusing the main button

    // Initial check
    updateLink();

    // Real-time updates
    phoneInput.addEventListener('input', updateLink);
    messageInput.addEventListener('input', updateLink);

    // Main button action: Open WhatsApp directly
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const link = generatedLinkInput.value;

        if (isValidPhone(phoneInput.value)) {
            window.open(link, '_blank');
        } else {
            // Shake animation for invalid input
            const wrapper = document.querySelector('.phone-input-wrapper');
            wrapper.classList.add('shake');
            setTimeout(() => wrapper.classList.remove('shake'), 500);
            phoneInput.focus();
        }
    });

    function isValidPhone(phone) {
        const cleanNumber = phone.replace(/\D/g, '');
        // Basic validation: at least 7 digits for international support
        return cleanNumber.length >= 7;
    }

    function updateLink() {
        const rawPhone = phoneInput.value;
        const message = messageInput.value;

        let cleanNumber = rawPhone.replace(/\D/g, '');

        // Use the number as is, assuming user enters country code
        const phoneParam = cleanNumber ? `${cleanNumber}` : '';
        let link = `https://wa.me/${phoneParam}`;

        if (message.trim()) {
            link += `?text=${encodeURIComponent(message)}`;
        }

        generatedLinkInput.value = link;

        // Show/Hide result area based on input presence
        if (cleanNumber.length > 0) {
            resultContainer.classList.remove('hidden');
        } else {
            resultContainer.classList.add('hidden');
        }
    }

    // Copy functionality
    copyBtn.addEventListener('click', () => {
        if (!generatedLinkInput.value) return;

        generatedLinkInput.select();
        generatedLinkInput.setSelectionRange(0, 99999); // Mobile

        navigator.clipboard.writeText(generatedLinkInput.value).then(() => {
            const originalIcon = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = originalIcon;
            }, 1500);
        });
    });
});
