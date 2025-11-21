# 🤖 Chatbot Embedding Guide

This guide shows you how to embed your portfolio chatbot on any website.

## 🚀 Method 1: Simple iframe Embed

The easiest way to embed your chatbot:

```html
<iframe 
  src="https://xyz-chatbot.vercel.app/embed.html" 
  width="400" 
  height="600"
  frameborder="0"
  title="Portfolio Chatbot">
</iframe>
```

### Responsive iframe:
```html
<div style="position: relative; width: 100%; height: 600px;">
  <iframe 
    src="https://xyz-chatbot.vercel.app/embed.html" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;"
    title="Portfolio Chatbot">
  </iframe>
</div>
```

## 🎨 Method 2: JavaScript Widget (Recommended)

A floating chat widget that appears on any page:

### Basic Implementation:
```html
<!-- Add this before closing </body> tag -->
<script 
  src="https://xyz-chatbot.vercel.app/chatbot-widget.js" 
  data-auto-init="true">
</script>
```

### 🔒 CORS-Free Solutions (For Webflow, Squarespace, etc.):

**Method A: Get Inline Code (Recommended)**
Visit this URL to get copy-paste code:
```
https://xyz-chatbot.vercel.app/api/embed-code
```
Copy the entire HTML block and paste it into your website's custom code section.

**Method B: Use API Endpoint**
```html
<script src="https://xyz-chatbot.vercel.app/api/widget" data-auto-init="true"></script>
```

**Method C: Invisible iframe**
```html
<iframe 
  src="https://xyz-chatbot.vercel.app/embed-snippet.html" 
  style="position: fixed; bottom: 0; right: 0; width: 100vw; height: 100vh; border: none; pointer-events: none; z-index: 9999;"
  title="Chatbot Widget">
</iframe>
```

### Advanced Configuration:
```html
<script src="https://xyz-chatbot.vercel.app/chatbot-widget.js"></script>
<script>
  new ChatbotWidget({
    position: 'bottom-right',    // bottom-right, bottom-left, top-right, top-left
    theme: 'light',              // light, dark
    width: '350px',
    height: '500px',
    buttonColor: '#ff8c42'       // Custom button color
  });
</script>
```

### Data Attribute Configuration:
```html
<script 
  src="https://xyz-chatbot.vercel.app/chatbot-widget.js" 
  data-auto-init="true"
  data-position="bottom-left"
  data-button-color="#007bff">
</script>
```

## 🎯 Method 3: Custom Integration

For more control, you can integrate the chatbot API directly:

```javascript
async function sendMessage(message) {
  const response = await fetch('https://xyz-chatbot.vercel.app/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message })
  });
  
  const data = await response.json();
  return data.response;
}

// Usage
sendMessage("Tell me about your projects").then(response => {
  console.log(response);
});
```

## 📱 Responsive Design

All embedding methods are mobile-responsive:
- **Desktop**: Shows as a floating widget or fixed-size iframe
- **Mobile**: Expands to full screen for better usability

## 🔧 Customization Options

### Widget Positions:
- `bottom-right` (default)
- `bottom-left`
- `top-right` 
- `top-left`

### Themes:
- `light` (default)
- `dark`

### Custom Styling:
You can override the widget styles with CSS:

```css
.chatbot-widget-button {
  background: your-custom-color !important;
}

.chatbot-widget-iframe {
  border-radius: 20px !important;
}
```

## 🚀 Quick Start Examples

### WordPress:
Add to your theme's `footer.php` or use a custom HTML block:
```html
<script 
  src="https://xyz-chatbot.vercel.app/chatbot-widget.js" 
  data-auto-init="true">
</script>
```

### React/Next.js:
```jsx
import { useEffect } from 'react';

export default function MyPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://xyz-chatbot.vercel.app/chatbot-widget.js';
    script.onload = () => {
      new window.ChatbotWidget({
        position: 'bottom-right',
        buttonColor: '#your-brand-color'
      });
    };
    document.body.appendChild(script);
    
    return () => document.body.removeChild(script);
  }, []);

  return <div>Your page content</div>;
}
```

### Static HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome to my website</h1>
  
  <!-- Your content -->
  
  <!-- Chatbot Widget -->
  <script 
    src="https://xyz-chatbot.vercel.app/chatbot-widget.js" 
    data-auto-init="true"
    data-position="bottom-right">
  </script>
</body>
</html>
```

## 🔒 Security & Performance

- **HTTPS Required**: Ensure your website uses HTTPS for iframe embedding
- **CSP Headers**: Add your domain to Content Security Policy if needed
- **Lazy Loading**: The widget loads only when needed
- **Mobile Optimized**: Automatically adapts to mobile screens

## 📞 Support

If you need help customizing the embed for your specific use case, feel free to reach out!

---

**Replace `https://xyz-chatbot.vercel.app` with your actual Vercel deployment URL**
