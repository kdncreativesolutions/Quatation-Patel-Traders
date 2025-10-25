// Company Data Configuration
const companies = {
    companyA: {
        name: "કેડીએન ક્રિએટિવ સોલ્યુશન",
        address: "અમદાવાદ, ગુજરાત",
        phone: "+91 98765 43210",
        email: "info@kdncreative.com",
        gst: "24ABCDE1234F1Z5"
    },
    companyB: {
        name: "ટેક સોલ્યુશન",
        address: "સુરત, ગુજરાત",
        phone: "+91 98765 43211",
        email: "info@techsolution.com",
        gst: "24FGHIJ5678K2L6"
    },
    companyC: {
        name: "ડિજિટલ માર્કેટિંગ",
        address: "વડોદરા, ગુજરાત",
        phone: "+91 98765 43212",
        email: "info@digitalmarketing.com",
        gst: "24MNOPQ9012R3S7"
    }
};

// Global variables
let currentQuotation = null;
let quotationHistory = JSON.parse(localStorage.getItem('quotationHistory')) || [];
let isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing app');
    initializeApp();
    setupEventListeners();
    checkAdminStatus();
});

// Also try to initialize when window loads (backup)
window.addEventListener('load', function() {
    console.log('Window loaded - Re-initializing app');
    if (!document.getElementById('addProduct')) {
        console.error('Add product button not found!');
    } else {
        console.log('Add product button found');
    }
});

function initializeApp() {
    // Set current date
    const dateInput = document.getElementById('quotationDate');
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
}

function setupEventListeners() {
    // Form submission
    document.getElementById('quotationForm').addEventListener('submit', handleFormSubmit);
    
    // PDF generation buttons
    document.getElementById('generatePDF18').addEventListener('click', () => generatePDF(18));
    document.getElementById('generatePDF20').addEventListener('click', () => generatePDF(20));
    document.getElementById('generatePDF25').addEventListener('click', () => generatePDF(25));
    document.getElementById('generateAllPDF').addEventListener('click', generateAllPDFs);
    
    // Gujarati PDF generation buttons - with better error handling
    const pdf18Btn = document.getElementById('generateGujaratiPDF18');
    const pdf20Btn = document.getElementById('generateGujaratiPDF20');
    const pdf25Btn = document.getElementById('generateGujaratiPDF25');
    
    if (pdf18Btn) {
        console.log('PDF 18% button found, adding event listener');
        pdf18Btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('PDF 18% button clicked');
            generateGujaratiPDF(18);
        });
    } else {
        console.error('PDF 18% button not found!');
    }
    
    if (pdf20Btn) {
        console.log('PDF 20% button found, adding event listener');
        pdf20Btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('PDF 20% button clicked');
            generateGujaratiPDF(20);
        });
    } else {
        console.error('PDF 20% button not found!');
    }
    
    if (pdf25Btn) {
        console.log('PDF 25% button found, adding event listener');
        pdf25Btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('PDF 25% button clicked');
            generateGujaratiPDF(25);
        });
    } else {
        console.error('PDF 25% button not found!');
    }
    
    // Admin functionality
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('logout').addEventListener('click', handleLogout);
    document.getElementById('manageCompanies').addEventListener('click', manageCompanies);
    document.getElementById('viewHistory').addEventListener('click', viewHistory);
    document.getElementById('exportData').addEventListener('click', exportData);
    document.getElementById('importData').addEventListener('click', importData);
    document.getElementById('uploadCSV').addEventListener('click', uploadCSV);
    
    // Modal functionality
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeModal);
    });
    
    document.getElementById('addCompany').addEventListener('click', addNewCompany);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Multiple products handling - with better error handling
    const addProductBtn = document.getElementById('addProduct');
    if (addProductBtn) {
        console.log('Add product button found, adding event listener');
        addProductBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add product button clicked via event listener');
            addNewProduct();
        });
    } else {
        console.error('Add product button not found!');
    }
    
    // Handle product name changes for custom products
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('product-name')) {
            handleProductNameChange(e.target);
        }
    });
    
    // Handle remove product buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-product-btn')) {
            removeProduct(e.target);
        }
    });
    
    // Handle real-time calculation for multiple products
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('quantity') || e.target.classList.contains('unit-price')) {
            calculateProductTotal(e.target);
        }
    });
    
    // Test button for debugging
    const testBtn = document.getElementById('testButton');
    if (testBtn) {
        console.log('Test button found, adding event listener');
        testBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Test button clicked!');
            alert('ટેસ્ટ બટન કામ કરે છે!');
            
            // Test if other buttons exist
            const addBtn = document.getElementById('addProduct');
            const pdf18Btn = document.getElementById('generateGujaratiPDF18');
            
            let message = 'બટન સ્ટેટસ:\n';
            message += 'Add Product Button: ' + (addBtn ? 'Found' : 'Not Found') + '\n';
            message += 'PDF 18% Button: ' + (pdf18Btn ? 'Found' : 'Not Found') + '\n';
            message += 'JavaScript loaded: Yes';
            
            alert(message);
        });
    } else {
        console.error('Test button not found!');
    }
}

function checkAdminStatus() {
    if (isAdminLoggedIn) {
        showAdminPanel();
    } else {
        showLoginForm();
    }
}

// Multiple Products Functions
function addNewProduct() {
    console.log('Add product button clicked'); // Debug log
    alert('Add product button clicked!'); // Visual confirmation
    
    const container = document.getElementById('productsContainer');
    if (!container) {
        console.error('Products container not found');
        alert('Products container not found!');
        return;
    }
    const productCount = container.children.length;
    const newIndex = productCount;
    
    const productHTML = `
        <div class="product-item" data-product-index="${newIndex}">
            <div class="product-header">
                <h4>પ્રોડક્ટ ${newIndex + 1}</h4>
                <button type="button" class="remove-product-btn">×</button>
            </div>
            
            <div class="product-fields">
                <div class="form-group">
                    <label>પ્રોડક્ટ નામ *</label>
                    <select class="product-name" required>
                        <option value="">પ્રોડક્ટ પસંદ કરો</option>
                        <option value="વેબસાઈટ ડેવલપમેન્ટ">વેબસાઈટ ડેવલપમેન્ટ</option>
                        <option value="મોબાઇલ એપ ડેવલપમેન્ટ">મોબાઇલ એપ ડેવલપમેન્ટ</option>
                        <option value="ઇ-કોમર્સ વેબસાઈટ">ઇ-કોમર્સ વેબસાઈટ</option>
                        <option value="ડિજિટલ માર્કેટિંગ">ડિજિટલ માર્કેટિંગ</option>
                        <option value="સોશિયલ મીડિયા માર્કેટિંગ">સોશિયલ મીડિયા માર્કેટિંગ</option>
                        <option value="SEO સેવાઓ">SEO સેવાઓ</option>
                        <option value="કન્ટેન્ટ રાઇટિંગ">કન્ટેન્ટ રાઇટિંગ</option>
                        <option value="ગ્રાફિક ડિઝાઇન">ગ્રાફિક ડિઝાઇન</option>
                        <option value="લોગો ડિઝાઇન">લોગો ડિઝાઇન</option>
                        <option value="વિડિયો એડિટિંગ">વિડિયો એડિટિંગ</option>
                        <option value="ફોટોગ્રાફી">ફોટોગ્રાફી</option>
                        <option value="બ્રાન્ડિંગ">બ્રાન્ડિંગ</option>
                        <option value="પ્રિન્ટ ડિઝાઇન">પ્રિન્ટ ડિઝાઇન</option>
                        <option value="અન્ય">અન્ય</option>
                    </select>
                </div>
                
                <div class="form-group custom-product-group" style="display: none;">
                    <label>કસ્ટમ પ્રોડક્ટ નામ</label>
                    <input type="text" class="custom-product" placeholder="તમારું પ્રોડક્ટ નામ લખો">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label>જથ્થો *</label>
                        <input type="number" class="quantity" min="1" required>
                    </div>
                    <div class="form-group">
                        <label>એકમ ભાવ (₹) *</label>
                        <input type="number" class="unit-price" min="0" step="0.01" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>નોંધ</label>
                    <input type="text" class="product-notes" placeholder="પ્રોડક્ટ વિશે વધારાની માહિતી">
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', productHTML);
    
    // Show remove button for first product if there are multiple
    if (container.children.length > 1) {
        container.querySelector('.product-item:first-child .remove-product-btn').style.display = 'block';
    }
}

function handleProductNameChange(selectElement) {
    const productItem = selectElement.closest('.product-item');
    const customGroup = productItem.querySelector('.custom-product-group');
    const customInput = productItem.querySelector('.custom-product');
    
    if (selectElement.value === 'અન્ય') {
        customGroup.style.display = 'block';
        customInput.required = true;
    } else {
        customGroup.style.display = 'none';
        customInput.required = false;
    }
}

function removeProduct(button) {
    const productItem = button.closest('.product-item');
    const container = document.getElementById('productsContainer');
    
    if (container.children.length > 1) {
        productItem.remove();
        
        // Update product numbers
        updateProductNumbers();
        
        // Hide remove button for first product if only one left
        if (container.children.length === 1) {
            container.querySelector('.remove-product-btn').style.display = 'none';
        }
    }
}

function updateProductNumbers() {
    const container = document.getElementById('productsContainer');
    const products = container.querySelectorAll('.product-item');
    
    products.forEach((product, index) => {
        product.querySelector('h4').textContent = `પ્રોડક્ટ ${index + 1}`;
        product.setAttribute('data-product-index', index);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    // Collect all products
    const products = [];
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach((item, index) => {
        const productName = item.querySelector('.product-name').value;
        const customProduct = item.querySelector('.custom-product').value;
        const quantity = parseInt(item.querySelector('.quantity').value);
        const unitPrice = parseFloat(item.querySelector('.unit-price').value);
        const notes = item.querySelector('.product-notes').value;
        
        let finalProductName = productName;
        if (productName === 'અન્ય' && customProduct) {
            finalProductName = customProduct;
        }
        
        products.push({
            name: finalProductName,
            quantity: quantity,
            unitPrice: unitPrice,
            notes: notes,
            total: quantity * unitPrice
        });
    });
    
    const quotationData = {
        id: generateQuotationId(),
        date: new Date().toLocaleDateString('gu-IN'),
        customerName: formData.get('customerName'),
        contactInfo: formData.get('contactInfo'),
        customerAddress: formData.get('customerAddress'),
        company: formData.get('company'),
        products: products,
        totalAmount: products.reduce((sum, product) => sum + product.total, 0),
        notes: formData.get('notes'),
        timestamp: new Date().toISOString()
    };
    
    currentQuotation = quotationData;
    quotationHistory.unshift(quotationData);
    localStorage.setItem('quotationHistory', JSON.stringify(quotationHistory));
    
    displayQuotationPreview(quotationData);
    document.getElementById('previewSection').style.display = 'block';
    
    // Scroll to preview
    document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
}

function generateQuotationId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `QTN${year}${month}${day}${random}`;
}

function calculateTotals() {
    // Calculate total for all products
    const productItems = document.querySelectorAll('.product-item');
    let grandTotal = 0;
    
    productItems.forEach(item => {
        const quantity = parseFloat(item.querySelector('.quantity').value) || 0;
        const unitPrice = parseFloat(item.querySelector('.unit-price').value) || 0;
        const total = quantity * unitPrice;
        grandTotal += total;
    });
    
    return { grandTotal };
}

function calculateProductTotal(inputElement) {
    const productItem = inputElement.closest('.product-item');
    const quantity = parseFloat(productItem.querySelector('.quantity').value) || 0;
    const unitPrice = parseFloat(productItem.querySelector('.unit-price').value) || 0;
    const total = quantity * unitPrice;
    
    // You can add real-time total display here if needed
    return { quantity, unitPrice, total };
}

function displayQuotationPreview(data) {
    const company = companies[data.company];
    const total = data.totalAmount;
    
    // Generate products table
    const productsTable = data.products.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>₹${product.unitPrice.toFixed(2)}</td>
            <td>₹${product.total.toFixed(2)}</td>
        </tr>
    `).join('');
    
    const preview = document.getElementById('quotationPreview');
    preview.innerHTML = `
        <h3>કોટેશન પૂર્વાવલોકન</h3>
        <div class="quotation-details">
            <div class="detail-item">
                <span class="detail-label">કોટેશન નંબર:</span>
                <span class="detail-value">${data.id}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">તારીખ:</span>
                <span class="detail-value">${data.date}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">ગ્રાહકનું નામ:</span>
                <span class="detail-value">${data.customerName}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">સંપર્ક:</span>
                <span class="detail-value">${data.contactInfo}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">સરનામું:</span>
                <span class="detail-value">${data.customerAddress}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">કંપની:</span>
                <span class="detail-value">${company.name}</span>
            </div>
        </div>
        
        <div class="products-table">
            <h4>પ્રોડક્ટ વિગતો</h4>
            <table>
                <thead>
                    <tr>
                        <th>પ્રોડક્ટ નામ</th>
                        <th>જથ્થો</th>
                        <th>એકમ ભાવ</th>
                        <th>કુલ</th>
                    </tr>
                </thead>
                <tbody>
                    ${productsTable}
                </tbody>
            </table>
        </div>
        
        <div class="pricing-table">
            <h4>ભાવ ગણતરી</h4>
            <table>
                <thead>
                    <tr>
                        <th>વર્ણન</th>
                        <th>રકમ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>કુલ રકમ</td>
                        <td>₹${total.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>18% રિયાયત સાથે</td>
                        <td>₹${(total * 0.82).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>20% રિયાયત સાથે</td>
                        <td>₹${(total * 0.80).toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>25% રિયાયત સાથે</td>
                        <td>₹${(total * 0.75).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        ${data.notes ? `<div class="notes"><strong>નોંધ:</strong> ${data.notes}</div>` : ''}
    `;
}

function generatePDF(discountPercentage) {
    if (!currentQuotation) {
        alert('પહેલા કોટેશન ફોર્મ ભરો');
        return;
    }
    
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set font to support Unicode characters
    doc.setFont('helvetica', 'normal');
    
    const company = companies[currentQuotation.company];
    const total = currentQuotation.totalAmount;
    const discountedPrice = total * (1 - discountPercentage / 100);
    
    // Header - Mixed language for better compatibility
    doc.setFontSize(20);
    doc.text('Quotation / કોટેશન', 105, 20, { align: 'center' });
    
    // Company details - Mixed language
    doc.setFontSize(12);
    doc.text(company.name, 20, 35);
    doc.text(company.address, 20, 42);
    doc.text(`Phone / ફોન: ${company.phone}`, 20, 49);
    doc.text(`Email / ઇમેઇલ: ${company.email}`, 20, 56);
    doc.text(`GST: ${company.gst}`, 20, 63);
    
    // Quotation details - Mixed language
    doc.text(`Quotation No / કોટેશન નંબર: ${currentQuotation.id}`, 120, 35);
    doc.text(`Date / તારીખ: ${currentQuotation.date}`, 120, 42);
    
    // Customer details - Mixed language
    doc.text('Customer Details / ગ્રાહક વિગતો:', 20, 75);
    doc.text(`Name / નામ: ${currentQuotation.customerName}`, 20, 82);
    doc.text(`Contact / સંપર્ક: ${currentQuotation.contactInfo}`, 20, 89);
    
    // Product details - Multiple products
    doc.text('Product Details / પ્રોડક્ટ વિગતો:', 20, 105);
    
    let yPosition = 112;
    currentQuotation.products.forEach((product, index) => {
        doc.text(`${index + 1}. ${product.name}`, 20, yPosition);
        doc.text(`   Quantity / જથ્થો: ${product.quantity}`, 20, yPosition + 7);
        doc.text(`   Unit Price / એકમ ભાવ: ₹${product.unitPrice.toFixed(2)}`, 20, yPosition + 14);
        doc.text(`   Total / કુલ: ₹${product.total.toFixed(2)}`, 20, yPosition + 21);
        yPosition += 35;
    });
    
    // Pricing table - Mixed language
    const tableData = [
        ['Description / વર્ણન', 'Amount / રકમ'],
        ['Total Amount / કુલ રકમ', `₹${total.toFixed(2)}`],
        [`${discountPercentage}% Discount / રિયાયત`, `₹${(total * discountPercentage / 100).toFixed(2)}`],
        ['Final Amount / અંતિમ રકમ', `₹${discountedPrice.toFixed(2)}`]
    ];
    
    doc.autoTable({
        startY: yPosition + 10,
        head: [tableData[0]],
        body: tableData.slice(1),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [0, 0, 0] }
    });
    
    // Notes - Mixed language
    if (currentQuotation.notes) {
        doc.text(`Notes / નોંધ: ${currentQuotation.notes}`, 20, doc.lastAutoTable.finalY + 20);
    }
    
    // Footer - Mixed language
    doc.setFontSize(10);
    doc.text('This quotation is valid for 30 days / આ કોટેશન 30 દિવસ માટે માન્ય છે', 105, doc.internal.pageSize.height - 20, { align: 'center' });
    
    // Save PDF
    const fileName = `Quotation_${discountPercentage}.pdf`;
    doc.save(fileName);
}

function generateAllPDFs() {
    if (!currentQuotation) {
        alert('પહેલા કોટેશન ફોર્મ ભરો');
        return;
    }
    
    generatePDF(18);
    setTimeout(() => generatePDF(20), 500);
    setTimeout(() => generatePDF(25), 1000);
}

// Alternative PDF generation with better Gujarati support
function generateGujaratiPDF(discountPercentage) {
    if (!currentQuotation) {
        alert('પહેલા કોટેશન ફોર્મ ભરો');
        return;
    }
    
    const company = companies[currentQuotation.company];
    const total = currentQuotation.totalAmount;
    const discountedPrice = total * (1 - discountPercentage / 100);
    
    // Create HTML content with proper Gujarati fonts
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="gu">
    <head>
        <meta charset="UTF-8">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@400;500;600;700&family=Noto+Sans+Gujarati:wght@100..900&display=swap');
            body {
                font-family: 'Baloo Bhai 2', 'Noto Sans Gujarati', sans-serif;
                margin: 20px;
                line-height: 1.6;
                color: #000000;
            }
            .header {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 30px;
                color: #667eea;
            }
            .company-info {
                float: left;
                width: 50%;
                margin-bottom: 20px;
            }
            .quotation-info {
                float: right;
                width: 45%;
                text-align: right;
            }
            .clear {
                clear: both;
            }
            .section {
                margin: 20px 0;
            }
            .section h3 {
                color: #667eea;
                border-bottom: 2px solid #667eea;
                padding-bottom: 5px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
            }
            th {
                background-color: #000000;
                color: white;
                font-weight: bold;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 12px;
                color: #666;
            }
            .amount {
                font-weight: bold;
                color: #28a745;
            }
        </style>
    </head>
    <body>
        <div class="header">કોટેશન</div>
        
        <div class="company-info">
            <strong>${company.name}</strong><br>
            ${company.address}<br>
            ફોન: ${company.phone}<br>
            ઇમેઇલ: ${company.email}<br>
            GST: ${company.gst}
        </div>
        
        <div class="quotation-info">
            કોટેશન નંબર: ${currentQuotation.id}<br>
            તારીખ: ${currentQuotation.date}
        </div>
        
        <div class="clear"></div>
        
        <div class="section">
            <h3>ગ્રાહક વિગતો</h3>
            <strong>નામ:</strong> ${currentQuotation.customerName}<br>
            <strong>સંપર્ક:</strong> ${currentQuotation.contactInfo}<br>
            <strong>સરનામું:</strong> ${currentQuotation.customerAddress}
        </div>
        
        <div class="section">
            <h3>પ્રોડક્ટ વિગતો</h3>
            ${currentQuotation.products.map((product, index) => `
                <div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                    <strong>પ્રોડક્ટ ${index + 1}:</strong> ${product.name}<br>
                    <strong>જથ્થો:</strong> ${product.quantity}<br>
                    <strong>એકમ ભાવ:</strong> ₹${product.unitPrice.toFixed(2)}<br>
                    <strong>કુલ:</strong> ₹${product.total.toFixed(2)}
                </div>
            `).join('')}
        </div>
        
        <table>
            <thead>
                <tr>
                    <th>વર્ણન</th>
                    <th>રકમ</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>કુલ રકમ</td>
                    <td class="amount">₹${total.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>${discountPercentage}% રિયાયત</td>
                    <td class="amount">₹${(total * discountPercentage / 100).toFixed(2)}</td>
                </tr>
                <tr>
                    <td><strong>અંતિમ રકમ</strong></td>
                    <td class="amount"><strong>₹${discountedPrice.toFixed(2)}</strong></td>
                </tr>
            </tbody>
        </table>
        
        ${currentQuotation.notes ? `
        <div class="section">
            <h3>નોંધ</h3>
            ${currentQuotation.notes}
        </div>
        ` : ''}
        
        <div class="footer">
            આ કોટેશન 30 દિવસ માટે માન્ય છે
        </div>
    </body>
    </html>
    `;
    
    // Open in new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Auto print after a short delay
    setTimeout(() => {
        printWindow.print();
    }, 500);
}


function handleLogin(e) {
    e.preventDefault();
    console.log('Login attempt'); // Debug log
    alert('Login form submitted!'); // Visual confirmation
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    console.log('Username:', username, 'Password:', password); // Debug log
    
    // Simple authentication (in production, use proper authentication)
    if (username === 'admin' && password === 'admin123') {
        console.log('Login successful'); // Debug log
        alert('Login successful!'); // Visual confirmation
        isAdminLoggedIn = true;
        localStorage.setItem('isAdminLoggedIn', 'true');
        showAdminPanel();
    } else {
        console.log('Login failed'); // Debug log
        alert('ખોટા લોગિન ક્રેડેન્શિયલ');
    }
}

function handleLogout() {
    isAdminLoggedIn = false;
    localStorage.removeItem('isAdminLoggedIn');
    showLoginForm();
}

function showAdminPanel() {
    console.log('Showing admin panel'); // Debug log
    const loginSection = document.getElementById('loginSection');
    const adminSection = document.getElementById('adminSection');
    
    if (loginSection) loginSection.style.display = 'none';
    if (adminSection) adminSection.style.display = 'block';
}

function showLoginForm() {
    console.log('Showing login form'); // Debug log
    const loginSection = document.getElementById('loginSection');
    const adminSection = document.getElementById('adminSection');
    
    if (adminSection) adminSection.style.display = 'none';
    if (loginSection) loginSection.style.display = 'block';
}

function manageCompanies() {
    const modal = document.getElementById('companyModal');
    const companyList = document.getElementById('companyList');
    
    companyList.innerHTML = '';
    
    Object.keys(companies).forEach(companyKey => {
        const company = companies[companyKey];
        const companyItem = document.createElement('div');
        companyItem.className = 'company-item';
        companyItem.innerHTML = `
            <h4>${company.name}</h4>
            <p><strong>સરનામું:</strong> ${company.address}</p>
            <p><strong>ફોન:</strong> ${company.phone}</p>
            <p><strong>ઇમેઇલ:</strong> ${company.email}</p>
            <p><strong>GST:</strong> ${company.gst}</p>
            <button onclick="editCompany('${companyKey}')" class="admin-btn">સંપાદન કરો</button>
        `;
        companyList.appendChild(companyItem);
    });
    
    modal.style.display = 'flex';
}

function viewHistory() {
    const modal = document.getElementById('historyModal');
    const historyList = document.getElementById('historyList');
    
    if (quotationHistory.length === 0) {
        historyList.innerHTML = '<p>કોઈ કોટેશન ઇતિહાસ નથી</p>';
    } else {
        historyList.innerHTML = '';
        quotationHistory.slice(0, 20).forEach((quotation, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <h4>${quotation.id}</h4>
                <p><strong>ગ્રાહક:</strong> ${quotation.customerName}</p>
                <p><strong>કંપની:</strong> ${companies[quotation.company]?.name || 'Unknown'}</p>
                <p><strong>પ્રોડક્ટ:</strong> ${quotation.productName}</p>
                <p><strong>તારીખ:</strong> ${quotation.date}</p>
                <p><strong>કુલ રકમ:</strong> ₹${(quotation.quantity * quotation.unitPrice).toFixed(2)}</p>
            `;
            historyItem.addEventListener('click', () => {
                currentQuotation = quotation;
                displayQuotationPreview(quotation);
                modal.style.display = 'none';
                document.getElementById('previewSection').style.display = 'block';
                document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
            });
            historyList.appendChild(historyItem);
        });
    }
    
    modal.style.display = 'flex';
}

function exportData() {
    if (quotationHistory.length === 0) {
        alert('કોઈ ડેટા એક્સપોર્ટ કરવા માટે નથી');
        return;
    }
    
    const exportOptions = document.createElement('div');
    exportOptions.className = 'export-options';
    exportOptions.innerHTML = `
        <button class="export-btn" onclick="exportToCSV()">CSV એક્સપોર્ટ</button>
        <button class="export-btn" onclick="exportToJSON()">JSON એક્સપોર્ટ</button>
        <button class="export-btn" onclick="exportToPDF()">PDF રિપોર્ટ</button>
    `;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>ડેટા એક્સપોર્ટ</h3>
            <p>કુલ ${quotationHistory.length} કોટેશન મળ્યા છે</p>
            ${exportOptions.outerHTML}
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

function exportToCSV() {
    const headers = ['ID', 'Date', 'Customer', 'Company', 'Product', 'Quantity', 'Unit Price', 'Total'];
    const csvContent = [
        headers.join(','),
        ...quotationHistory.map(q => [
            q.id,
            q.date,
            q.customerName,
            companies[q.company]?.name || 'Unknown',
            q.productName,
            q.quantity,
            q.unitPrice,
            (q.quantity * q.unitPrice).toFixed(2)
        ].join(','))
    ].join('\n');
    
    downloadFile(csvContent, 'quotations.csv', 'text/csv');
}

function exportToJSON() {
    const jsonContent = JSON.stringify(quotationHistory, null, 2);
    downloadFile(jsonContent, 'quotations.json', 'application/json');
}

function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('કોટેશન રિપોર્ટ', 105, 20, { align: 'center' });
    
    const tableData = quotationHistory.map(q => [
        q.id,
        q.date,
        q.customerName,
        companies[q.company]?.name || 'Unknown',
        q.productName,
        q.quantity.toString(),
        `₹${q.unitPrice.toFixed(2)}`,
        `₹${(q.quantity * q.unitPrice).toFixed(2)}`
    ]);
    
    doc.autoTable({
        startY: 30,
        head: [['ID', 'Date', 'Customer', 'Company', 'Product', 'Qty', 'Unit Price', 'Total']],
        body: tableData,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [0, 0, 0] }
    });
    
    doc.save('quotation_report.pdf');
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

function addNewCompany() {
    const companyName = prompt('કંપનીનું નામ દાખલ કરો:');
    if (companyName) {
        const newCompanyKey = 'company' + (Object.keys(companies).length + 1);
        companies[newCompanyKey] = {
            name: companyName,
            address: 'સરનામું દાખલ કરો',
            phone: '+91 00000 00000',
            email: 'info@company.com',
            gst: '24XXXXX0000X0X0'
        };
        
        // Update company dropdown
        const companySelect = document.getElementById('company');
        const option = document.createElement('option');
        option.value = newCompanyKey;
        option.textContent = `${newCompanyKey} - ${companyName}`;
        companySelect.appendChild(option);
        
        alert('નવી કંપની ઉમેરાઈ ગઈ છે');
        manageCompanies(); // Refresh the list
    }
}

function editCompany(companyKey) {
    const company = companies[companyKey];
    const newName = prompt('કંપનીનું નામ:', company.name);
    if (newName) {
        company.name = newName;
        alert('કંપની અપડેટ થઈ ગઈ છે');
        manageCompanies(); // Refresh the list
    }
}

// CSV Import Functions
function importData() {
    const modal = document.getElementById('importModal');
    modal.style.display = 'flex';
}

function uploadCSV() {
    const fileInput = document.getElementById('csvFile');
    const statusDiv = document.getElementById('importStatus');
    
    if (!fileInput.files[0]) {
        statusDiv.innerHTML = '<p style="color: red;">કૃપા કરીને CSV ફાઇલ પસંદ કરો</p>';
        return;
    }
    
    const file = fileInput.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const csv = e.target.result;
            const lines = csv.split('\n');
            const headers = lines[0].split(',');
            
            let importedCount = 0;
            
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim()) {
                    const values = lines[i].split(',');
                    if (values.length >= 3) {
                        const quotation = {
                            id: `QTN${Date.now()}${i}`,
                            date: new Date().toLocaleDateString('gu-IN'),
                            customerName: values[0] || 'Unknown',
                            contactInfo: values[1] || '',
                            company: 'companyA',
                            products: [{
                                name: values[2] || 'Unknown Product',
                                quantity: parseInt(values[3]) || 1,
                                unitPrice: parseFloat(values[4]) || 0,
                                notes: values[5] || '',
                                total: (parseInt(values[3]) || 1) * (parseFloat(values[4]) || 0)
                            }],
                            totalAmount: (parseInt(values[3]) || 1) * (parseFloat(values[4]) || 0),
                            notes: values[6] || '',
                            timestamp: new Date().toISOString()
                        };
                        
                        quotationHistory.unshift(quotation);
                        importedCount++;
                    }
                }
            }
            
            localStorage.setItem('quotationHistory', JSON.stringify(quotationHistory));
            statusDiv.innerHTML = `<p style="color: green;">સફળતાપૂર્વક ${importedCount} કોટેશન ઇમ્પોર્ટ થયા</p>`;
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 2000);
            
        } catch (error) {
            statusDiv.innerHTML = '<p style="color: red;">CSV ફાઇલ પડવામાં ભૂલ: ' + error.message + '</p>';
        }
    };
    
    reader.readAsText(file);
}

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('gu-IN');
}

// Export functions for global access
window.generatePDF = generatePDF;
window.generateAllPDFs = generateAllPDFs;
