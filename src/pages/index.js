// /pages/index.js
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  };

  return (
    <div className="container">
      <Head>
      <style>{`
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding-top: 100px;
    }

    nav {
      background-color: #333;
      color: white;
      padding: 10px 20px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    nav h1 {
      margin: 0;
      font-size: 20px;
    }

    nav ul {
      list-style: none;
      display: flex;
      gap: 20px;
      margin: 0;
      padding: 0;
    }

    nav li {
      cursor: pointer;
    }

    .main-content {
      background-color: white;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 6px;
    }

    h2 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 15px;
    }

    textarea {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: vertical;
    }

    button {
      margin-top: 10px;
      padding: 10px 20px;
      font-size: 16px;
      background-color: #444;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background-color: #999;
      cursor: not-allowed;
    }

    .response-box {
      margin-top: 20px;
      padding: 10px;
      background-color: #f9f9f9;
      border-left: 4px solid #333;
      border-radius: 4px;
    }

    footer {
      text-align: center;
      margin-top: 40px;
      padding: 10px;
      font-size: 14px;
      color: #555;
      border-top: 1px solid #ccc;
    }
  `}</style>



      </Head>

      <nav>
        <h1>GokulCare</h1>
        <ul>
          <li>Home</li>
          <li>Shop</li>
          <li>Contact</li>
        </ul>
      </nav>

      <main className="main-content">
        <h2>AI Skin Care Product Advisor</h2>
        <p>Describe your skin concerns or goals and get personalized product suggestions from our AI!</p>
        <textarea
          rows={8}
          placeholder="e.g., I have oily skin and want a natural cleanser."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Finding products...' : 'Get Recommendations'}
        </button>

        {response && (
          <div className="response-box">
            <h3>Recommended Products:</h3>
            <p>{response}</p>
          </div>
        )}
      </main>

      <footer>© 2025 GlowCare. All rights reserved.</footer>
    </div>
  );
}
