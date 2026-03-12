# EmailJS Setup Instructions

Follow these steps to connect your contact form to EmailJS and start receiving form submissions via email.

## Step 1: Create EmailJS Account (2 minutes)

1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Click "Sign Up" (top right)
3. Create account with email/password or use Google/GitHub
4. Verify your email address

## Step 2: Add Email Service (2 minutes)

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for most users)
   - Outlook
   - Yahoo
   - Or any custom SMTP
4. Click **Connect Account** and authorize EmailJS
5. **Copy the Service ID** (looks like: `service_abc123`)

## Step 3: Create Email Template (3 minutes)

1. Go to **Email Templates**
2. Click **Create New Template**
3. Replace the template content with this:

```
Subject: New Contact Form Submission from {{name}}

From: {{name}}
Email: {{email}}
Interested in: {{interest}}

Message:
{{message}}

---
Sent via Equal Path contact form
```

4. **Important**: Set the template variables:
   - `{{name}}` - maps to form field "name"
   - `{{email}}` - maps to form field "email"
   - `{{interest}}` - maps to form field "interest"
   - `{{message}}` - maps to form field "message"

5. Configure the **To Email** field to: `hello@equalpath.ai` (or your preferred email)
6. Set **From Email** to: `{{email}}` (so you can reply directly)
7. Set **From Name** to: `{{name}}`
8. Click **Save**
9. **Copy the Template ID** (looks like: `template_xyz789`)

## Step 4: Get Your Public Key

1. Click your username (top right)
2. Go to **Account** → **General**
3. Find your **Public Key** (looks like: `xyzABC123_456DEF`)
4. **Copy this key**

## Step 5: Update Your Website Code

1. Open `script.js`
2. Find the `EMAILJS_CONFIG` section at the top (around line 142)
3. Replace the placeholder values:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'xyzABC123_456DEF',    // Paste your Public Key here
    SERVICE_ID: 'service_abc123',       // Paste your Service ID here
    TEMPLATE_ID: 'template_xyz789'      // Paste your Template ID here
};
```

4. Save the file
5. Deploy your website

## Step 6: Test It!

1. Visit your website
2. Go to the "Get Started" section
3. Fill out the contact form
4. Submit it
5. Check your email inbox (hello@equalpath.ai)

You should receive the form submission within seconds!

## Free Tier Limits

EmailJS free tier includes:
- ✅ 200 emails per month
- ✅ 2 email services
- ✅ 2 email templates
- ✅ Email history for 1 month

This is more than enough for a small business contact form!

## Troubleshooting

### Not receiving emails?

1. Check your spam/junk folder
2. Verify the "To Email" in your template is correct
3. Check the EmailJS dashboard → History to see if emails were sent
4. Make sure all 3 IDs in `script.js` are correct

### Form shows "EmailJS not configured" message?

- You haven't updated the `EMAILJS_CONFIG` values in `script.js` yet
- Make sure you removed the placeholder text `YOUR_PUBLIC_KEY`, etc.

### Console shows "Invalid public key" error?

- Double-check you copied the Public Key correctly (no extra spaces)
- Make sure you initialized EmailJS properly

## Support

- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/

## Security Note

Your EmailJS Public Key is safe to expose in client-side code - it's designed for this purpose. EmailJS has rate limiting and domain restrictions to prevent abuse.

For extra security, you can add allowed domains in EmailJS dashboard → Account → Security.
