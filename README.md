# કોટેશન જનરેટર - Quotation Generator

A comprehensive web-based quotation generator with Gujarati language support, multi-company functionality, and automatic PDF generation.

## Features

### ✅ Core Features
- **Gujarati Language Support**: Complete interface and PDF output in Gujarati
- **Multi-Company Support**: 3 pre-configured companies with different details
- **Auto Discount Calculation**: Automatic calculation with 18%, 20%, and 25% discounts
- **PDF Generation**: Generate individual or all PDFs with Gujarati text
- **Responsive Design**: Mobile-friendly interface
- **Quotation History**: Local storage of quotation history

### ✅ Form Fields
- Customer Name (ગ્રાહકનું નામ)
- Contact Number/Email (સંપર્ક નંબર/ઇમેઇલ)
- Company Selection (કંપની પસંદ કરો)
- Product/Service Name (પ્રોડક્ટ/સેવાનું નામ)
- Quantity (જથ્થો)
- Unit Price (એકમ ભાવ)
- Notes (નોંધ) - Optional

### ✅ PDF Output
- Quotation_18.pdf (18% discount)
- Quotation_20.pdf (20% discount)
- Quotation_25.pdf (25% discount)
- All PDFs with Gujarati text and proper formatting

## Setup Instructions

### 1. Download Files
Download all files to a folder:
- `index.html`
- `styles.css`
- `script.js`
- `README.md`

### 2. Open in Browser
1. Open `index.html` in any modern web browser
2. No server setup required - works offline
3. For best results, use Chrome, Firefox, or Edge

### 3. Admin Access
- **Username**: `admin`
- **Password**: `admin123`

## Usage Guide

### Creating a Quotation
1. Fill in all required fields in Gujarati
2. Select company from dropdown
3. Enter product details and pricing
4. Click "કોટેશન જનરેટ કરો" (Generate Quotation)
5. Preview will show with all calculations
6. Generate individual PDFs or all at once

### Admin Features
1. Login with admin credentials
2. View quotation history
3. Manage company details (coming soon)
4. Export data (coming soon)

## Technical Details

### Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **PDF Generation**: jsPDF library
- **Fonts**: Noto Sans Gujarati (Google Fonts)
- **Storage**: LocalStorage for quotation history
- **Responsive**: CSS Grid and Flexbox

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Structure
```
Quotation Generator/
├── index.html          # Main HTML file
├── styles.css          # CSS styles with Gujarati fonts
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Company Configuration

### Company A - કેડીએન ક્રિએટિવ સોલ્યુશન
- Address: અમદાવાદ, ગુજરાત
- Phone: +91 98765 43210
- Email: info@kdncreative.com
- GST: 24ABCDE1234F1Z5

### Company B - ટેક સોલ્યુશન
- Address: સુરત, ગુજરાત
- Phone: +91 98765 43211
- Email: info@techsolution.com
- GST: 24FGHIJ5678K2L6

### Company C - ડિજિટલ માર્કેટિંગ
- Address: વડોદરા, ગુજરાત
- Phone: +91 98765 43212
- Email: info@digitalmarketing.com
- GST: 24MNOPQ9012R3S7

## Future Enhancements

### Planned Features
- [ ] Email quotation to clients
- [ ] Company logo support
- [ ] Digital signature
- [ ] Multi-language toggle (Gujarati/English)
- [ ] Advanced admin panel
- [ ] Database integration
- [ ] User management
- [ ] Template customization

### Advanced Features
- [ ] QR code generation
- [ ] Barcode support
- [ ] Tax calculations
- [ ] Payment terms
- [ ] Validity period
- [ ] Terms and conditions

## Support

For any issues or feature requests, please contact the development team.

## License

This project is for internal use. All rights reserved.

---

**Note**: This application works entirely in the browser and doesn't require any server setup. All data is stored locally in the browser's localStorage.
