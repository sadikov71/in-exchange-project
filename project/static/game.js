// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// API Service Functions
const API = {
    async signup(userData) {
        const response = await fetch(`${"http://127.0.0.1:5000/api"}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Signup failed');
        }
        return await response.json();
    },

    async login(username, password) {
        const response = await fetch(`${"http://127.0.0.1:5000/api"}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Login failed');
        }
        return await response.json();
    },

    async getUser(userId) {
        const response = await fetch(`${"http://127.0.0.1:5000/api"}/user/${userId}`);
        if (!response.ok) throw new Error('Failed to get user');
        return await response.json();
    },

    async updateUser(userId, userData) {
        const response = await fetch(`${"http://127.0.0.1:5000/api" }/user/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) throw new Error('Failed to update user');
        return await response.json();
    },

    async getItems() {
        const response = await fetch(`${"http://127.0.0.1:5000/api"}/items`);
        if (!response.ok) throw new Error('Failed to get items');
        return await response.json();
    },

    async createItem(itemData) {
        const response = await fetch(`${"http://127.0.0.1:5000/api"}/items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData)
        });
        if (!response.ok) throw new Error('Failed to create item');
        return await response.json();
    },

    async updateItem(itemId, itemData) {
        const response = await fetch(`${"http://127.0.0.1:5000/api"}/items/${itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemData)
        });
        if (!response.ok) throw new Error('Failed to update item');
        return await response.json();
    },

    async deleteItem(itemId) {
        const response = await fetch(`${"http://127.0.0.1:5000/api"}/items/${itemId}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete item');
        return await response.json();
    },

    async getFavorites(userId) {
        const response = await fetch(`${"http://127.0.0.1:5000/api"}/favorites?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to get favorites');
        return await response.json();
    },

    async toggleFavorite(userId, itemId) {
        const response = await fetch(`${"http://127.0.0.1:5000/api"}/favorites`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, itemId })
        });
        if (!response.ok) throw new Error('Failed to toggle favorite');
        return await response.json();
    },

    async getMessages(userId, otherUserId = null) {
        let url = `${"http://127.0.0.1:5000/api"}/messages?userId=${userId}`;
        if (otherUserId) url += `&otherUserId=${otherUserId}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to get messages');
        return await response.json();
    },

    async sendMessage(messageData) {
        const response = await fetch(`${"http://127.0.0.1:5000/api"}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messageData)
        });
        if (!response.ok) throw new Error('Failed to send message');
        return await response.json();
    },

    async markMessagesRead(userId, otherUserId) {
        const response = await fetch(`${"http://127.0.0.1:5000/api"}/messages/read`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, otherUserId })
        });
        if (!response.ok) throw new Error('Failed to mark messages as read');
        return await response.json();
    },

    async getSettings(userId) {
        const response = await fetch(`${"http://127.0.0.1:5000/api"}/settings/${userId}`);
        if (!response.ok) throw new Error('Failed to get settings');
        return await response.json();
    },

    async updateSettings(userId, settings) {
        const response = await fetch(`${"http://127.0.0.1:5000/api"}/settings/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        });
        if (!response.ok) throw new Error('Failed to update settings');
        return await response.json();
    }
};

// Local storage for current user session only
const STORAGE_KEYS = {
    CURRENT_USER: 'inExchange_currentUser'
};

const translations = {
    en: {
        welcome: 'Welcome',
        messages: 'Messages',
        myProfile: 'My Profile',
        addItem: 'Add Item',
        logout: 'Logout',
        settings: 'Settings',
        profileSettings: 'Profile Settings',
        theme: 'Theme',
        language: 'Language',
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode',
        editProfile: 'Edit Profile',
        stock: 'Stock',
        inStock: 'In Stock',
        outOfStock: 'Out of Stock'
    },
    uz: {
        welcome: 'Xush kelibsiz',
        messages: 'Xabarlar',
        myProfile: 'Mening profilim',
        addItem: 'Mahsulot qo\'shish',
        logout: 'Chiqish',
        settings: 'Sozlamalar',
        profileSettings: 'Profil sozlamalari',
        theme: 'Mavzu',
        language: 'Til',
        lightMode: 'Yorug\' rejim',
        darkMode: 'Qorong\'u rejim',
        editProfile: 'Profilni tahrirlash',
        stock: 'Zaxira',
        inStock: 'Mavjud',
        outOfStock: 'Mavjud emas'
    },
    ru: {
        welcome: 'Добро пожаловать',
        messages: 'Сообщения',
        myProfile: 'Мой профиль',
        addItem: 'Добавить товар',
        logout: 'Выйти',
        settings: 'Настройки',
        profileSettings: 'Настройки профиля',
        theme: 'Тема',
        language: 'Язык',
        lightMode: 'Светлый режим',
        darkMode: 'Темный режим',
        editProfile: 'Редактировать профиль',
        stock: 'Склад',
        inStock: 'В наличии',
        outOfStock: 'Нет в наличии'
    }
};

async function getSettings() {
    const user = getCurrentUser();
    if (!user) return { theme: 'dark', language: 'en' };
    try {
        const result = await API.getSettings(user.id);
        return result.settings || { theme: 'dark', language: 'en' };
    } catch (error) {
        console.error('Error getting settings:', error);
        return { theme: 'dark', language: 'en' };
    }
}

async function saveSettings(settings) {
    const user = getCurrentUser();
    if (!user) return;
    try {
        await API.updateSettings(user.id, settings);
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

async function getCurrentLanguage() {
    const settings = await getSettings();
    return settings.language || 'en';
}

function t(key) {
    const lang = getCurrentLanguage();
    return translations[lang]?.[key] || translations.en[key] || key;
}

async function findUserById(userId) {
    try {
        const result = await API.getUser(userId);
        return result.user;
    } catch (error) {
        console.error('Error finding user:', error);
        return null;
    }
}

function setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
}

function getCurrentUser() {
    const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userStr ? JSON.parse(userStr) : null;
}

function clearCurrentUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

async function getItems() {
    try {
        const result = await API.getItems();
        return result.items || [];
    } catch (error) {
        console.error('Error getting items:', error);
        return [];
    }
}

const authModal = document.getElementById('authModal');
const mainApp = document.getElementById('mainApp');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const logoutBtn = document.getElementById('logoutBtn');
const floatingAddBtn = document.getElementById('floatingAddBtn');
const addItemPanel = document.getElementById('addItemPanel');
const itemForm = document.getElementById('itemForm');
const itemsContainer = document.getElementById('itemsContainer');
const noItems = document.getElementById('noItems');
const searchInput = document.getElementById('searchInput');
const filterType = document.getElementById('filterType');
const filterRoom = document.getElementById('filterRoom');
const welcomeUser = document.getElementById('welcomeUser');
const itemDetailsPanel = document.getElementById('itemDetailsPanel');
const itemDetails = document.getElementById('itemDetails');
const favoritesContainer = document.getElementById('favoritesContainer');
const noFavorites = document.getElementById('noFavorites');
const profilePanel = document.getElementById('profilePanel');
const profileForm = document.getElementById('profileForm');
const messagesBtn = document.getElementById('messagesBtn');
const chatPanel = document.getElementById('chatPanel');
const panelOverlay = document.getElementById('panelOverlay');
const conversationsList = document.getElementById('conversationsList');
const messagesList = document.getElementById('messagesList');
const chatMessageInput = document.getElementById('chatMessageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const chatWithUser = document.getElementById('chatWithUser');
const chatInputContainer = document.getElementById('chatInputContainer');
const messageBadge = document.getElementById('messageBadge');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const settingsOverlay = document.getElementById('settingsOverlay');
const closeSettings = document.getElementById('closeSettings');
const languageSelect = document.getElementById('languageSelect');
const lightModeBtn = document.getElementById('lightModeBtn');
const darkModeBtn = document.getElementById('darkModeBtn');
const myItemsContainer = document.getElementById('myItemsContainer');
const noMyItems = document.getElementById('noMyItems');
const ordersContainer = document.getElementById('ordersContainer');
const noOrders = document.getElementById('noOrders');
const dealsContainer = document.getElementById('dealsContainer');
const noDeals = document.getElementById('noDeals');

function showTab(tab) {
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', (tab === 'login' && i === 0) || (tab === 'signup' && i === 1));
    });
    document.getElementById('loginTab').classList.toggle('active', tab === 'login');
    document.getElementById('signupTab').classList.toggle('active', tab === 'signup');
}

function checkAuth() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        showApp(currentUser);
    } else {
        showAuth();
    }
}

function showAuth() {
    authModal.classList.remove('hidden');
    mainApp.classList.add('hidden');
}

function showApp(user) {
    authModal.classList.add('hidden');
    mainApp.classList.remove('hidden');
    applySettings();
    updateTranslations();
    welcomeUser.textContent = `${t('welcome')}, ${user.username}!`;
    loadItems();
    updateMessageBadge();
    setInterval(updateMessageBadge, 5000);
}

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const username = document.getElementById('signupUsername').value.trim();
        const name = document.getElementById('signupName').value.trim();
        const surname = document.getElementById('signupSurname').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const birthDate = document.getElementById('signupBirthDate').value;
        const age = parseInt(document.getElementById('signupAge').value);
        const grade = parseInt(document.getElementById('signupGrade').value);
        const password = document.getElementById('signupPassword').value;
        
        const result = await API.signup({
            username, name, surname, email, birthDate, age, grade, password
        });
        
        setCurrentUser(result.user);
        signupForm.reset();
        showApp(result.user);
    } catch (error) {
        alert(error.message || 'Signup failed. Please try again.');
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        const result = await API.login(username, password);
        setCurrentUser(result.user);
        loginForm.reset();
        showApp(result.user);
    } catch (error) {
        alert(error.message || 'Invalid username or password!');
    }
});

logoutBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        clearCurrentUser();
        showAuth();
    }
});

messagesBtn.addEventListener('click', () => {
    loadConversations();
    chatPanel.classList.remove('hidden');
    chatPanel.classList.add('active');
    panelOverlay.classList.remove('hidden');
});

floatingAddBtn.addEventListener('click', () => {
    itemForm.reset();
    document.getElementById('itemId').value = '';
    document.getElementById('itemFormTitle').textContent = t('addItem');
    document.getElementById('itemSubmitBtn').textContent = t('addItem');
    document.getElementById('deleteItemBtn').classList.add('hidden');
    clearImagePreview();
    addItemPanel.classList.remove('hidden');
    addItemPanel.classList.add('active');
    panelOverlay.classList.remove('hidden');
});

settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.add('active');
    settingsOverlay.classList.remove('hidden');
});

closeSettings.addEventListener('click', () => {
    settingsPanel.classList.remove('active');
    settingsOverlay.classList.add('hidden');
});

settingsOverlay.addEventListener('click', () => {
    settingsPanel.classList.remove('active');
    settingsOverlay.classList.add('hidden');
});

languageSelect.addEventListener('change', (e) => {
    const settings = getSettings();
    settings.language = e.target.value;
    saveSettings(settings);
    updateTranslations();
});

lightModeBtn.addEventListener('click', () => {
    const settings = getSettings();
    settings.theme = 'light';
    saveSettings(settings);
    applySettings();
});

darkModeBtn.addEventListener('click', () => {
    const settings = getSettings();
    settings.theme = 'dark';
    saveSettings(settings);
    applySettings();
});

async function applySettings() {
    const settings = await getSettings();
    if (settings.theme === 'dark') {
        document.body.classList.add('dark-mode');
        lightModeBtn.classList.remove('active');
        darkModeBtn.classList.add('active');
    } else {
        document.body.classList.remove('dark-mode');
        lightModeBtn.classList.add('active');
        darkModeBtn.classList.remove('active');
    }
}

async function updateTranslations() {
    const user = getCurrentUser();
    if (user) {
        welcomeUser.textContent = `${t('welcome')}, ${user.username}!`;
    }
    if (document.getElementById('settingsTitle')) {
        document.getElementById('settingsTitle').textContent = t('settings');
        document.getElementById('profileSettingsTitle').textContent = t('profileSettings');
        document.getElementById('themeTitle').textContent = t('theme');
        document.getElementById('languageTitle').textContent = t('language');
        lightModeBtn.textContent = `☀️ ${t('lightMode')}`;
        darkModeBtn.textContent = `🌙 ${t('darkMode')}`;
        const editProfileBtn = document.querySelector('button[onclick="openProfileFromSettings()"]');
        if (editProfileBtn) editProfileBtn.textContent = t('editProfile');
        const lang = await getCurrentLanguage();
        languageSelect.value = lang;
    }
}

function openProfileFromSettings() {
    settingsPanel.classList.remove('active');
    settingsOverlay.classList.add('hidden');
    loadProfile();
    profilePanel.classList.remove('hidden');
    profilePanel.classList.add('active');
    panelOverlay.classList.remove('hidden');
}

window.openProfileFromSettings = openProfileFromSettings;

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        e.target.closest('.modal').classList.add('hidden');
    });
});

document.querySelectorAll('.close-panel').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        const panel = e.target.closest('.slide-panel');
        if (panel) {
            panel.classList.remove('active');
            panel.classList.add('hidden');
            panelOverlay.classList.add('hidden');
        }
    });
});

panelOverlay.addEventListener('click', () => {
    document.querySelectorAll('.slide-panel').forEach(panel => {
        panel.classList.remove('active');
        panel.classList.add('hidden');
    });
    panelOverlay.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.add('hidden');
    }
});

const itemImageInput = document.getElementById('itemImage');
const itemImageData = document.getElementById('itemImageData');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');

itemImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64 = event.target.result;
            itemImageData.value = base64;
            previewImg.src = base64;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

function clearImagePreview() {
    itemImageInput.value = '';
    itemImageData.value = '';
    previewImg.src = '';
    imagePreview.style.display = 'none';
}

window.clearImagePreview = clearImagePreview;

itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentUser = getCurrentUser();
    if (!currentUser) {
        alert('Please login first!');
        return;
    }
    
    try {
        const itemId = document.getElementById('itemId').value;
        const isEditing = itemId !== '';
        
        // Get image data from hidden input, or keep existing if editing and no new image uploaded
        let imageData = itemImageData.value;
        if (isEditing && !imageData) {
            const items = await getItems();
            const existingItem = items.find(i => i.id === itemId);
            imageData = existingItem?.image || '';
        }
        
        const itemData = {
            name: document.getElementById('itemName').value.trim(),
            description: document.getElementById('itemDescription').value.trim(),
            price: parseFloat(document.getElementById('itemPrice').value),
            type: document.getElementById('itemType').value,
            image: imageData,
            meetingRoom: document.getElementById('meetingRoom').value,
            stock: parseInt(document.getElementById('itemStock').value) || 0,
            sellerId: currentUser.id,
            sellerUsername: currentUser.username,
            sellerEmail: currentUser.email
        };
        
        if (isEditing) {
            await API.updateItem(itemId, itemData);
        } else {
            await API.createItem(itemData);
        }
        
        itemForm.reset();
        document.getElementById('itemId').value = '';
        document.getElementById('itemFormTitle').textContent = 'List Your Item';
        document.getElementById('itemSubmitBtn').textContent = 'List Item';
        document.getElementById('deleteItemBtn').classList.add('hidden');
        clearImagePreview();
        addItemPanel.classList.remove('active');
        addItemPanel.classList.add('hidden');
        panelOverlay.classList.add('hidden');
        await loadItems();
        if (isEditing) {
            await loadMyItems();
            alert('Item updated successfully!');
        } else {
            alert('Item listed successfully!');
        }
    } catch (error) {
        console.error('Error saving item:', error);
        alert('Failed to save item. Please try again.');
    }
});

async function loadItems() {
    try {
        const items = await getItems();
        const currentUser = getCurrentUser();
        const searchTerm = searchInput.value.toLowerCase();
        const typeFilter = filterType.value;
        const roomFilter = filterRoom.value.toLowerCase().trim();
        let filteredItems = items;
        
        if (typeFilter === 'myItems') {
            if (currentUser) {
                filteredItems = filteredItems.filter(item => item.sellerId === currentUser.id);
            } else {
                filteredItems = [];
            }
        } else if (typeFilter !== 'all') {
            filteredItems = filteredItems.filter(item => item.type === typeFilter);
        }
        
        if (searchTerm) {
            filteredItems = filteredItems.filter(item =>
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)
            );
        }
        if (roomFilter) {
            filteredItems = filteredItems.filter(item => 
                item.meetingRoom.toLowerCase().includes(roomFilter)
            );
        }
        filteredItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        await displayItems(filteredItems);
    } catch (error) {
        console.error('Error loading items:', error);
        alert('Failed to load items. Please refresh the page.');
    }
}

async function displayItems(items) {
    itemsContainer.innerHTML = '';
    if (items.length === 0) {
        noItems.classList.remove('hidden');
        return;
    }
    noItems.classList.add('hidden');
    const currentUser = getCurrentUser();
    for (const item of items) {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.onclick = () => showItemDetails(item);
        const imageUrl = item.image || '';
        const imageHtml = imageUrl
            ? `<img src="${imageUrl}" alt="${item.name}" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:white;font-size:48px;\\'>📦</div>'">`
            : '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:white;font-size:48px;">📦</div>';
        const isFav = await isFavorite(item.id);
        const stock = item.stock || 0;
        const stockDisplay = stock > 0 ? `<span class="stock-badge in-stock">${t('inStock')}: ${stock}</span>` : `<span class="stock-badge out-of-stock">${t('outOfStock')}</span>`;
        const isMyItem = currentUser && item.sellerId === currentUser.id;
        const editButton = isMyItem ? `<button class="btn-primary edit-item-btn" onclick="event.stopPropagation(); editItem('${item.id}')" style="margin-top:10px;width:100%;">✏️ Edit Item</button>` : '';
        itemCard.innerHTML = `
            <div class="item-image">${imageHtml}</div>
            <div class="item-info">
                <div class="item-header">
                    <div class="item-name">${escapeHtml(item.name)}</div>
                    <button class="favorite-btn ${isFav ? 'favorited' : ''}" onclick="event.stopPropagation(); toggleFavoriteItem('${item.id}')" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
                        ${isFav ? '❤️' : '🤍'}
                    </button>
                </div>
                <div class="item-description">${escapeHtml(item.description)}</div>
                <div class="item-meta">
                    <div class="item-price">${formatPrice(item.price)} so'm</div>
                    <div class="item-type ${item.type}">${item.type === 'sell' ? 'For Sale' : 'For Rent'}</div>
                </div>
                <div class="item-room">${escapeHtml(item.meetingRoom)}</div>
                <div class="item-stock">${stockDisplay}</div>
                ${editButton}
            </div>
        `;
        itemsContainer.appendChild(itemCard);
    };
}

function showItemDetails(item) {
    const imageUrl = item.image || '';
    const imageHtml = imageUrl
        ? `<img src="${imageUrl}" alt="${item.name}" onerror="this.style.display='none'">`
        : '';
    itemDetails.innerHTML = `
        ${imageHtml}
        <h2>${escapeHtml(item.name)}</h2>
        <div class="detail-section">
            <div class="detail-label">Description:</div>
            <div class="detail-value">${escapeHtml(item.description)}</div>
        </div>
        <div class="detail-section">
            <div class="detail-label">Price:</div>
            <div class="detail-value">${formatPrice(item.price)} so'm</div>
        </div>
        <div class="detail-section">
            <div class="detail-label">Type:</div>
            <div class="detail-value">
                <span class="item-type ${item.type}">${item.type === 'sell' ? 'For Sale' : 'For Rent'}</span>
            </div>
        </div>
        <div class="detail-section">
            <div class="detail-label">Meeting Room:</div>
            <div class="detail-value">📍 ${escapeHtml(item.meetingRoom)}</div>
        </div>
        <div class="contact-info">
            <div class="detail-label">Contact Seller:</div>
            <div class="detail-value">
                <strong>${escapeHtml(item.sellerUsername)}</strong><br>
                <small>${escapeHtml(item.sellerEmail)}</small>
            </div>
            <button class="btn-primary" onclick="openChatWithSeller('${item.sellerId}', '${escapeHtml(item.sellerUsername)}')" style="margin-top:10px;width:100%;">💬 Chat with Seller</button>
        </div>
    `;
    itemDetailsPanel.classList.remove('hidden');
    itemDetailsPanel.classList.add('active');
    panelOverlay.classList.remove('hidden');
}

searchInput.addEventListener('input', loadItems);
filterType.addEventListener('change', loadItems);
filterRoom.addEventListener('input', loadItems);

function formatPrice(price) {
    return Math.round(price).toLocaleString('uz-UZ');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showProfileTab(tab) {
    document.querySelectorAll('.profile-tab-btn').forEach((btn, i) => {
        const tabs = ['info', 'items', 'favorites', 'orders', 'deals'];
        btn.classList.toggle('active', tabs[i] === tab);
    });
    document.getElementById('profileInfoTab').classList.toggle('active', tab === 'info');
    document.getElementById('profileItemsTab').classList.toggle('active', tab === 'items');
    document.getElementById('profileFavoritesTab').classList.toggle('active', tab === 'favorites');
    document.getElementById('profileOrdersTab').classList.toggle('active', tab === 'orders');
    document.getElementById('profileDealsTab').classList.toggle('active', tab === 'deals');
    
    if (tab === 'items') loadMyItems();
    if (tab === 'favorites') loadFavorites();
    if (tab === 'orders') loadOrders();
    if (tab === 'deals') loadDeals();
}

function loadProfile() {
    const user = getCurrentUser();
    if (!user) return;
    
    document.getElementById('profileName').value = user.name || '';
    document.getElementById('profileSurname').value = user.surname || '';
    document.getElementById('profileUsername').textContent = user.username;
    document.getElementById('profileEmail').value = user.email || '';
    document.getElementById('profileBirthDate').value = user.birthDate || '';
    document.getElementById('profileAge').value = user.age || '';
    document.getElementById('profileGrade').value = user.grade || '';
}

profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) {
        alert('Please login first!');
        return;
    }
    
    user.name = document.getElementById('profileName').value.trim();
    user.surname = document.getElementById('profileSurname').value.trim();
    user.email = document.getElementById('profileEmail').value.trim();
    user.birthDate = document.getElementById('profileBirthDate').value;
    user.age = parseInt(document.getElementById('profileAge').value);
    user.grade = parseInt(document.getElementById('profileGrade').value);
    
    saveUser(user);
    setCurrentUser(user);
    alert('Profile updated successfully!');
});

function loadMyItems() {
    const user = getCurrentUser();
    if (!user) return;
    
    const items = getItems().filter(item => item.sellerId === user.id);
    myItemsContainer.innerHTML = '';
    
    if (items.length === 0) {
        noMyItems.classList.remove('hidden');
        return;
    }
    
    noMyItems.classList.add('hidden');
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.onclick = () => showItemDetails(item);
        const imageUrl = item.image || '';
        const imageHtml = imageUrl
            ? `<img src="${imageUrl}" alt="${item.name}" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:white;font-size:48px;\\'>📦</div>'">`
            : '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:white;font-size:48px;">📦</div>';
        itemCard.innerHTML = `
            <div class="item-image">${imageHtml}</div>
            <div class="item-info">
                <div class="item-name">${escapeHtml(item.name)}</div>
                <div class="item-description">${escapeHtml(item.description)}</div>
                <div class="item-meta">
                    <div class="item-price">${formatPrice(item.price)} so'm</div>
                    <div class="item-type ${item.type}">${item.type === 'sell' ? 'For Sale' : 'For Rent'}</div>
                </div>
                <div class="item-room">${escapeHtml(item.meetingRoom)}</div>
                <button class="btn-primary edit-item-btn" onclick="event.stopPropagation(); editItem('${item.id}')" style="margin-top:10px;width:100%;">✏️ Edit Item</button>
            </div>
        `;
        myItemsContainer.appendChild(itemCard);
    });
}

function loadOrders() {
    const user = getCurrentUser();
    if (!user) return;
    
    ordersContainer.innerHTML = '<p style="text-align:center;padding:20px;color:#666;">Orders feature coming soon. You can track items you\'re interested in here.</p>';
    noOrders.classList.add('hidden');
}

function loadDeals() {
    const user = getCurrentUser();
    if (!user) return;
    
    const items = getItems().filter(item => item.sellerId === user.id);
    dealsContainer.innerHTML = '';
    
    if (items.length === 0) {
        noDeals.classList.remove('hidden');
        return;
    }
    
    noDeals.classList.add('hidden');
    dealsContainer.innerHTML = `
        <div style="padding:20px;">
            <h3 style="margin-bottom:15px;">Your Listed Items</h3>
            <p style="color:#666;margin-bottom:15px;">Total items listed: <strong>${items.length}</strong></p>
            <p style="color:#666;">Active deals will appear here when buyers contact you.</p>
        </div>
    `;
}

async function getFavorites() {
    const user = getCurrentUser();
    if (!user) return [];
    try {
        const result = await API.getFavorites(user.id);
        return result.favorites || [];
    } catch (error) {
        console.error('Error getting favorites:', error);
        return [];
    }
}

async function toggleFavorite(itemId) {
    const user = getCurrentUser();
    if (!user) {
        alert('Please login to favorite items!');
        return false;
    }
    try {
        const result = await API.toggleFavorite(user.id, itemId);
        return result.isFavorite;
    } catch (error) {
        console.error('Error toggling favorite:', error);
        alert('Failed to update favorite');
        return false;
    }
}

async function isFavorite(itemId) {
    const user = getCurrentUser();
    if (!user) return false;
    const favorites = await getFavorites();
    return favorites.includes(itemId);
}

async function toggleFavoriteItem(itemId) {
    await toggleFavorite(itemId);
    await loadItems();
}

function loadFavorites() {
    const user = getCurrentUser();
    if (!user) return;
    
    const favoriteIds = getFavorites();
    const items = getItems().filter(item => favoriteIds.includes(item.id));
    favoritesContainer.innerHTML = '';
    
    if (items.length === 0) {
        noFavorites.classList.remove('hidden');
        return;
    }
    
    noFavorites.classList.add('hidden');
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.onclick = () => showItemDetails(item);
        const imageUrl = item.image || '';
        const imageHtml = imageUrl
            ? `<img src="${imageUrl}" alt="${item.name}" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:white;font-size:48px;\\'>📦</div>'">`
            : '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:white;font-size:48px;">📦</div>';
        itemCard.innerHTML = `
            <div class="item-image">${imageHtml}</div>
            <div class="item-info">
                <div class="item-header">
                    <div class="item-name">${escapeHtml(item.name)}</div>
                    <button class="favorite-btn favorited" onclick="event.stopPropagation(); toggleFavoriteItem('${item.id}')" title="Remove from favorites">
                        ❤️
                    </button>
                </div>
                <div class="item-description">${escapeHtml(item.description)}</div>
                <div class="item-meta">
                    <div class="item-price">${formatPrice(item.price)} so'm</div>
                    <div class="item-type ${item.type}">${item.type === 'sell' ? 'For Sale' : 'For Rent'}</div>
                </div>
                <div class="item-room">${escapeHtml(item.meetingRoom)}</div>
            </div>
        `;
        favoritesContainer.appendChild(itemCard);
    });
}

async function getMessages(otherUserId = null) {
    const user = getCurrentUser();
    if (!user) return [];
    try {
        const result = await API.getMessages(user.id, otherUserId);
        return result.messages || [];
    } catch (error) {
        console.error('Error getting messages:', error);
        return [];
    }
}

async function saveMessage(message) {
    try {
        const result = await API.sendMessage(message);
        return result.message;
    } catch (error) {
        console.error('Error saving message:', error);
        throw error;
    }
}

function getConversations() {
    const user = getCurrentUser();
    if (!user) return [];
    const messages = getMessages();
    const conversations = new Map();
    
    messages.forEach(msg => {
        if (msg.senderId === user.id || msg.receiverId === user.id) {
            const otherUserId = msg.senderId === user.id ? msg.receiverId : msg.senderId;
            const otherUsername = msg.senderId === user.id ? msg.receiverUsername : msg.senderUsername;
            
            if (!conversations.has(otherUserId)) {
                conversations.set(otherUserId, {
                    userId: otherUserId,
                    username: otherUsername,
                    lastMessage: msg.text,
                    lastMessageTime: msg.timestamp,
                    unread: msg.receiverId === user.id && !msg.read
                });
            } else {
                const conv = conversations.get(otherUserId);
                if (new Date(msg.timestamp) > new Date(conv.lastMessageTime)) {
                    conv.lastMessage = msg.text;
                    conv.lastMessageTime = msg.timestamp;
                    conv.unread = msg.receiverId === user.id && !msg.read;
                }
        }
    }
});
    
    return Array.from(conversations.values()).sort((a, b) => 
        new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );
}

let currentChatUserId = null;

function loadConversations() {
    const conversations = getConversations();
    conversationsList.innerHTML = '';
    
    if (conversations.length === 0) {
        conversationsList.innerHTML = '<div class="no-conversations">No conversations yet. Start chatting with sellers!</div>';
        return;
    }
    
    conversations.forEach(conv => {
        const convItem = document.createElement('div');
        convItem.className = `conversation-item ${conv.unread ? 'unread' : ''}`;
        convItem.onclick = () => openChat(conv.userId, conv.username);
        convItem.innerHTML = `
            <div class="conversation-username">${escapeHtml(conv.username)}</div>
            <div class="conversation-preview">${escapeHtml(conv.lastMessage)}</div>
            <div class="conversation-time">${formatTime(conv.lastMessageTime)}</div>
        `;
        conversationsList.appendChild(convItem);
    });
}

function openChat(userId, username) {
    currentChatUserId = userId;
    chatWithUser.textContent = `Chat with ${escapeHtml(username)}`;
    chatInputContainer.classList.remove('hidden');
    loadMessages(userId);
}

function openChatWithSeller(sellerId, sellerUsername) {
    itemDetailsPanel.classList.remove('active');
    itemDetailsPanel.classList.add('hidden');
    chatPanel.classList.remove('hidden');
    chatPanel.classList.add('active');
    panelOverlay.classList.remove('hidden');
    openChat(sellerId, sellerUsername);
    loadConversations();
}

function loadMessages(otherUserId) {
    const user = getCurrentUser();
    if (!user) return;
    
    const messages = getMessages().filter(msg => 
        (msg.senderId === user.id && msg.receiverId === otherUserId) ||
        (msg.senderId === otherUserId && msg.receiverId === user.id)
    ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    
    messagesList.innerHTML = '';
    messages.forEach(msg => {
        const isOwn = msg.senderId === user.id;
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isOwn ? 'own' : 'other'}`;
        messageDiv.innerHTML = `
            <div class="message-text">${escapeHtml(msg.text)}</div>
            <div class="message-time">${formatTime(msg.timestamp)}</div>
        `;
        messagesList.appendChild(messageDiv);
    });
    
    messagesList.scrollTop = messagesList.scrollHeight;
    
    markMessagesAsRead(otherUserId);
}

function markMessagesAsRead(otherUserId) {
    const user = getCurrentUser();
    if (!user) return;
    
    const messages = getMessages();
    let updated = false;
    messages.forEach(msg => {
        if (msg.receiverId === user.id && msg.senderId === otherUserId && !msg.read) {
            msg.read = true;
            updated = true;
        }
    });
    
    if (updated) {
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
        loadConversations();
        updateMessageBadge();
    }
}

function getUnreadCount() {
    const user = getCurrentUser();
    if (!user) return 0;
    
    const messages = getMessages();
    return messages.filter(msg => msg.receiverId === user.id && !msg.read).length;
}

function updateMessageBadge() {
    const unreadCount = getUnreadCount();
    if (unreadCount > 0) {
        messageBadge.textContent = unreadCount > 99 ? '99+' : unreadCount;
        messageBadge.classList.remove('hidden');
    } else {
        messageBadge.classList.add('hidden');
    }
}

sendMessageBtn.addEventListener('click', sendMessage);
chatMessageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const user = getCurrentUser();
    if (!user || !currentChatUserId) return;
    
    const text = chatMessageInput.value.trim();
    if (!text) return;
    
    const receiver = findUserById(currentChatUserId);
    if (!receiver) {
        alert('User not found!');
        return;
    }
    
    const message = {
        id: Date.now().toString(),
        senderId: user.id,
        senderUsername: user.username,
        receiverId: currentChatUserId,
        receiverUsername: receiver.username,
        text: text,
        timestamp: new Date().toISOString(),
        read: false
    };
    
    saveMessage(message);
    chatMessageInput.value = '';
    loadMessages(currentChatUserId);
    loadConversations();
    updateMessageBadge();
}

function findUserById(userId) {
    const users = getUsers();
    return users.find(u => u.id === userId);
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
}

function editItem(itemId) {
    const item = getItems().find(i => i.id === itemId);
    if (!item) {
        alert('Item not found!');
        return;
    }
    
    const currentUser = getCurrentUser();
    if (item.sellerId !== currentUser.id) {
        alert('You can only edit your own items!');
        return;
    }
    
    document.getElementById('itemId').value = item.id;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemType').value = item.type;
    document.getElementById('meetingRoom').value = item.meetingRoom;
    document.getElementById('itemStock').value = item.stock || 0;
    document.getElementById('itemFormTitle').textContent = 'Edit Item';
    document.getElementById('itemSubmitBtn').textContent = 'Update Item';
    document.getElementById('deleteItemBtn').classList.remove('hidden');
    
    // Show existing image if available
    if (item.image) {
        itemImageData.value = item.image;
        previewImg.src = item.image;
        imagePreview.style.display = 'block';
    } else {
        clearImagePreview();
    }
    
    // Clear file input (can't set value on file input)
    itemImageInput.value = '';
    
    addItemPanel.classList.remove('hidden');
    addItemPanel.classList.add('active');
    panelOverlay.classList.remove('hidden');
}

function deleteItem() {
    const itemId = document.getElementById('itemId').value;
    if (!itemId) {
        alert('No item selected for deletion!');
        return;
    }
    
    const item = getItems().find(i => i.id === itemId);
    if (!item) {
        alert('Item not found!');
        return;
    }
    
    const currentUser = getCurrentUser();
    if (item.sellerId !== currentUser.id) {
        alert('You can only delete your own items!');
        return;
    }
    
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
        return;
    }
    
    const items = getItems();
    const filteredItems = items.filter(i => i.id !== itemId);
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(filteredItems));
    
    // Also remove from favorites
    const favorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');
    const filteredFavorites = favorites.filter(f => f.itemId !== itemId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filteredFavorites));
    
    itemForm.reset();
    document.getElementById('itemId').value = '';
    document.getElementById('itemFormTitle').textContent = 'List Your Item';
    document.getElementById('itemSubmitBtn').textContent = 'List Item';
    document.getElementById('deleteItemBtn').classList.add('hidden');
    addItemPanel.classList.remove('active');
    addItemPanel.classList.add('hidden');
    panelOverlay.classList.add('hidden');
    
    loadItems();
    loadMyItems();
    alert('Item deleted successfully!');
}

window.toggleFavoriteItem = toggleFavoriteItem;
window.openChatWithSeller = openChatWithSeller;
window.editItem = editItem;
window.deleteItem = deleteItem;

initStorage();
applySettings();
checkAuth();
