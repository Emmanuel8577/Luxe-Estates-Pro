// backend/utils/emailTemplates.js
export const welcomeEmailTemplate = (username) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
    <h1 style="color: #2563eb;">LUXE<span style="color: #111827;">ESTATES</span></h1>
    <hr />
    <h2>Welcome to the Inner Circle, ${username}!</h2>
    <p>Thank you for joining our exclusive real estate platform. You now have access to:</p>
    <ul>
      <li>Private virtual tours</li>
      <li>First-access to off-market listings</li>
      <li>Personalized investment analysis</li>
    </ul>
    <p>Our concierge team is standing by if you have any questions.</p>
    <div style="margin-top: 30px; font-size: 12px; color: #888;">
      &copy; 2026 Luxe Estates International. All rights reserved.
    </div>
  </div>
`;