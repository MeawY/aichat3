'use client';

import { useState, useEffect } from 'react';
import { KnowledgeItem, SEVERITY_LEVELS, CATEGORIES } from '@/lib/knowledge-base';

export default function KnowledgeAdminPage() {
  const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<KnowledgeItem>>({
    text: '',
    keywords: [],
    category: 'nutrition',
    severity: 'info',
    symptoms: [],
    recommendations: [],
    references: []
  });
  const [keywordInput, setKeywordInput] = useState('');
  const [symptomInput, setSymptomInput] = useState('');
  const [recommendationInput, setRecommendationInput] = useState('');
  const [referenceInput, setReferenceInput] = useState('');
  const [batchInput, setBatchInput] = useState('');
  const [showBatchImport, setShowBatchImport] = useState(false);
  const [csvInput, setCsvInput] = useState('');
  const [showCsvImport, setShowCsvImport] = useState(false);

  useEffect(() => {
    fetchKnowledge();
  }, []);

  const fetchKnowledge = async () => {
    try {
      const response = await fetch('/api/knowledge/admin');
      const data = await response.json();
      setKnowledge(data.knowledge || []);
    } catch (error) {
      console.error('Failed to fetch knowledge:', error);
    }
  };

  const addKnowledge = async () => {
    try {
      const response = await fetch('/api/knowledge/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      
      if (response.ok) {
        setNewItem({
          text: '',
          keywords: [],
          category: 'nutrition',
          severity: 'info',
          symptoms: [],
          recommendations: [],
          references: []
        });
        fetchKnowledge();
      }
    } catch (error) {
      console.error('Failed to add knowledge:', error);
    }
  };

  const batchImport = async () => {
    try {
      const items = JSON.parse(batchInput);
      const validItems = Array.isArray(items) ? items : [items];
      
      let successCount = 0;
      for (const item of validItems) {
        const response = await fetch('/api/knowledge/admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
        if (response.ok) successCount++;
      }
      
      setBatchInput('');
      setShowBatchImport(false);
      fetchKnowledge();
      alert(`${successCount}件の知識を追加しました`);
    } catch (error) {
      alert('JSONの形式が正しくありません');
      console.error('Batch import error:', error);
    }
  };

  const csvImport = async () => {
    try {
      const response = await fetch('/api/knowledge/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'csv',
          csvData: csvInput
        })
      });
      
      if (response.ok) {
        const result = await response.json();
        setCsvInput('');
        setShowCsvImport(false);
        fetchKnowledge();
        alert(`${result.importedCount}件の知識をインポートしました`);
      }
    } catch (error) {
      alert('CSVの形式が正しくありません');
      console.error('CSV import error:', error);
    }
  };

  const generateTemplate = () => {
    const template = [
      {
        "text": "新しい知識の内容をここに入力",
        "keywords": ["キーワード1", "キーワード2"],
        "category": "nutrition",
        "severity": "info",
        "symptoms": [],
        "recommendations": ["推奨事項1", "推奨事項2"],
        "references": ["参考文献1"]
      },
      {
        "text": "もう一つの知識の内容",
        "keywords": ["キーワード3", "キーワード4"],
        "category": "health_risks",
        "severity": "warning",
        "symptoms": ["症状1", "症状2"],
        "recommendations": ["医師に相談"],
        "references": ["医学文献"]
      }
    ];
    setBatchInput(JSON.stringify(template, null, 2));
  };

  const generateCSVTemplate = () => {
    const template = `text,keywords,category,severity,symptoms,recommendations,references
"新しい知識の内容","キーワード1;キーワード2",nutrition,info,"","推奨事項1;推奨事項2","参考文献1"
"もう一つの知識","キーワード3;キーワード4",health_risks,warning,"症状1;症状2","医師に相談","医学文献"`;
    setCsvInput(template);
  };

  const addKeyword = () => {
    if (keywordInput.trim()) {
      setNewItem(prev => ({
        ...prev,
        keywords: [...(prev.keywords || []), keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const addSymptom = () => {
    if (symptomInput.trim()) {
      setNewItem(prev => ({
        ...prev,
        symptoms: [...(prev.symptoms || []), symptomInput.trim()]
      }));
      setSymptomInput('');
    }
  };

  const addRecommendation = () => {
    if (recommendationInput.trim()) {
      setNewItem(prev => ({
        ...prev,
        recommendations: [...(prev.recommendations || []), recommendationInput.trim()]
      }));
      setRecommendationInput('');
    }
  };

  const addReference = () => {
    if (referenceInput.trim()) {
      setNewItem(prev => ({
        ...prev,
        references: [...(prev.references || []), referenceInput.trim()]
      }));
      setReferenceInput('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCsvInput(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const exportKnowledge = (format: 'json' | 'csv') => {
    if (format === 'json') {
      const dataStr = JSON.stringify(knowledge, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'knowledge-base.json';
      link.click();
      URL.revokeObjectURL(url);
    } else if (format === 'csv') {
      const headers = ['text', 'keywords', 'category', 'severity', 'symptoms', 'recommendations', 'references'];
      const csvContent = [
        headers.join(','),
        ...knowledge.map(item => [
          `"${item.text.replace(/"/g, '""')}"`,
          `"${item.keywords.join(';')}"`,
          item.category,
          item.severity,
          `"${item.symptoms.join(';')}"`,
          `"${item.recommendations.join(';')}"`,
          `"${item.references.join(';')}"`
        ].join(','))
      ].join('\n');
      
      const dataBlob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'knowledge-base.csv';
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const removeItem = (array: string[], index: number) => {
    return array.filter((_, i) => i !== index);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">知識ベース管理</h1>
      
      {/* インポート・エクスポート機能 */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => {
              setShowBatchImport(!showBatchImport);
              setShowCsvImport(false);
            }}
            className={`px-4 py-2 rounded ${showBatchImport ? 'bg-purple-600' : 'bg-purple-500'} text-white hover:bg-purple-600`}
          >
            JSON一括インポート
          </button>
          <button
            onClick={() => {
              setShowCsvImport(!showCsvImport);
              setShowBatchImport(false);
            }}
            className={`px-4 py-2 rounded ${showCsvImport ? 'bg-blue-600' : 'bg-blue-500'} text-white hover:bg-blue-600`}
          >
            CSVインポート
          </button>
          <button
            onClick={() => exportKnowledge('json')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            JSONエクスポート
          </button>
          <button
            onClick={() => exportKnowledge('csv')}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            CSVエクスポート
          </button>
        </div>
        
        {/* JSON一括インポート */}
        {showBatchImport && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">JSON一括インポート</h3>
            <div>
              <label className="block text-sm font-medium mb-2">JSONデータ</label>
              <textarea
                value={batchInput}
                onChange={(e) => setBatchInput(e.target.value)}
                className="w-full p-2 border rounded font-mono text-sm"
                rows={10}
                placeholder="JSON形式で複数の知識を入力..."
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={generateTemplate}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                テンプレート生成
              </button>
              <button
                onClick={batchImport}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                一括インポート
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              <p><strong>使用方法:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>「テンプレート生成」でサンプルを表示</li>
                <li>JSON形式で複数の知識を入力</li>
                <li>配列形式で複数項目を一度に追加可能</li>
                <li>必須項目: text, keywords, category, severity</li>
              </ul>
            </div>
          </div>
        )}

        {/* CSVインポート */}
        {showCsvImport && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">CSVインポート</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">CSVファイルをアップロード</label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">またはCSVデータを直接入力</label>
              <textarea
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                className="w-full p-2 border rounded font-mono text-sm"
                rows={10}
                placeholder="CSV形式でデータを入力..."
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={generateCSVTemplate}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                CSVテンプレート生成
              </button>
              <button
                onClick={csvImport}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                CSVインポート
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              <p><strong>CSV形式:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>1行目: ヘッダー（text,keywords,category,severity,symptoms,recommendations,references）</li>
                <li>複数の値は「;」で区切る（例: &quot;キーワード1;キーワード2&quot;）</li>
                <li>テキストにカンマが含まれる場合は&ldquo;&quot;&rdquo;で囲む</li>
                <li>必須項目: text, keywords, category, severity</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 新しい知識の追加フォーム */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">新しい知識を追加</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">内容</label>
            <textarea
              value={newItem.text}
              onChange={(e) => setNewItem(prev => ({ ...prev, text: e.target.value }))}
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="知識の内容を入力..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">カテゴリ</label>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
              className="w-full p-2 border rounded"
            >
              {Object.entries(CATEGORIES).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">深刻度</label>
            <select
              value={newItem.severity}
              onChange={(e) => setNewItem(prev => ({ ...prev, severity: e.target.value as any }))}
              className="w-full p-2 border rounded"
            >
              {Object.entries(SEVERITY_LEVELS).map(([key, level]) => (
                <option key={key} value={key}>
                  {level.label} - {level.criteria}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">キーワード</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="キーワードを入力..."
                onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              />
              <button onClick={addKeyword} className="px-4 py-2 bg-blue-500 text-white rounded">
                追加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newItem.keywords?.map((keyword, index) => (
                <span key={index} className="px-2 py-1 bg-gray-200 rounded text-sm">
                  {keyword}
                  <button
                    onClick={() => setNewItem(prev => ({ ...prev, keywords: removeItem(prev.keywords || [], index) }))}
                    className="ml-1 text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">症状</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="症状を入力..."
                onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
              />
              <button onClick={addSymptom} className="px-4 py-2 bg-blue-500 text-white rounded">
                追加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newItem.symptoms?.map((symptom, index) => (
                <span key={index} className="px-2 py-1 bg-red-100 rounded text-sm">
                  {symptom}
                  <button
                    onClick={() => setNewItem(prev => ({ ...prev, symptoms: removeItem(prev.symptoms || [], index) }))}
                    className="ml-1 text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">推奨事項</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={recommendationInput}
                onChange={(e) => setRecommendationInput(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="推奨事項を入力..."
                onKeyPress={(e) => e.key === 'Enter' && addRecommendation()}
              />
              <button onClick={addRecommendation} className="px-4 py-2 bg-blue-500 text-white rounded">
                追加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newItem.recommendations?.map((rec, index) => (
                <span key={index} className="px-2 py-1 bg-green-100 rounded text-sm">
                  {rec}
                  <button
                    onClick={() => setNewItem(prev => ({ ...prev, recommendations: removeItem(prev.recommendations || [], index) }))}
                    className="ml-1 text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">参考文献</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={referenceInput}
                onChange={(e) => setReferenceInput(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="参考文献を入力..."
                onKeyPress={(e) => e.key === 'Enter' && addReference()}
              />
              <button onClick={addReference} className="px-4 py-2 bg-blue-500 text-white rounded">
                追加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newItem.references?.map((ref, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 rounded text-sm">
                  {ref}
                  <button
                    onClick={() => setNewItem(prev => ({ ...prev, references: removeItem(prev.references || [], index) }))}
                    className="ml-1 text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={addKnowledge}
            className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            知識を追加
          </button>
        </div>
      </div>

      {/* 既存の知識一覧 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">既存の知識 ({knowledge.length}件)</h2>
        
        <div className="space-y-4">
          {knowledge.map((item) => (
            <div key={item.id} className="border p-4 rounded">
              <div className="flex justify-between items-start mb-2">
                <span className={`px-2 py-1 rounded text-sm text-white ${
                  item.severity === 'info' ? 'bg-blue-500' :
                  item.severity === 'caution' ? 'bg-yellow-500' :
                  item.severity === 'warning' ? 'bg-orange-500' :
                  item.severity === 'high' ? 'bg-red-500' :
                  'bg-purple-500'
                }`}>
                  {SEVERITY_LEVELS[item.severity].label}
                </span>
                <span className="text-sm text-gray-500">{CATEGORIES[item.category as keyof typeof CATEGORIES]}</span>
              </div>
              
              <p className="mb-2">{item.text}</p>
              
              {item.keywords.length > 0 && (
                <div className="mb-2">
                  <span className="text-sm font-medium">キーワード: </span>
                  <span className="text-sm text-gray-600">{item.keywords.join(', ')}</span>
                </div>
              )}
              
              {item.symptoms.length > 0 && (
                <div className="mb-2">
                  <span className="text-sm font-medium">症状: </span>
                  <span className="text-sm text-red-600">{item.symptoms.join(', ')}</span>
                </div>
              )}
              
              {item.recommendations.length > 0 && (
                <div className="mb-2">
                  <span className="text-sm font-medium">推奨事項: </span>
                  <span className="text-sm text-green-600">{item.recommendations.join(', ')}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 