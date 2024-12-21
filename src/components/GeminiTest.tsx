import React, { useState } from 'react';
import { getOpenAIResponse } from '../utils/openai';

export default function GeminiTest() {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const testGemini = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await getOpenAIResponse('蠍座の恋愛運を教えて', [], new Date());
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
      console.error('Gemini Test Error:', err);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-purple-100">Gemini API テスト</h2>
      <button
        onClick={testGemini}
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'テスト実行中...' : 'テスト実行'}
      </button>

      {error && (
        <div className="p-4 bg-red-500/20 text-red-100 rounded-lg">
          エラー: {error}
        </div>
      )}

      {response && (
        <div className="p-4 bg-purple-800/20 text-purple-100 rounded-lg">
          <h3 className="font-bold mb-2">API レスポンス:</h3>
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      )}
    </div>
  );
}
