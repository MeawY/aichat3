import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { KnowledgeItem } from '@/lib/knowledge-base';

const KNOWLEDGE_FILE_PATH = path.join(process.cwd(), 'lib/data/knowledge-base.json');

export async function GET() {
  try {
    const data = await readFile(KNOWLEDGE_FILE_PATH, 'utf-8');
    const knowledge = JSON.parse(data);
    return NextResponse.json({ knowledge });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read knowledge base' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // CSVインポートの場合
    if (body.type === 'csv' && body.csvData) {
      const items = parseCSV(body.csvData);
      let successCount = 0;
      
      for (const item of items) {
        if (validateKnowledgeItem(item)) {
          const existingData = await readFile(KNOWLEDGE_FILE_PATH, 'utf-8');
          const knowledge = JSON.parse(existingData);
          
          // IDの自動生成
          if (!item.id) {
            item.id = `knowledge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          }
          
          knowledge.push(item);
          await writeFile(KNOWLEDGE_FILE_PATH, JSON.stringify(knowledge, null, 2));
          successCount++;
        }
      }
      
      return NextResponse.json({ success: true, importedCount: successCount });
    }
    
    // 通常の単一アイテム追加
    const newItem: KnowledgeItem = body;
    
    // バリデーション
    if (!newItem.text || !newItem.keywords || !newItem.category || !newItem.severity) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // IDの自動生成
    if (!newItem.id) {
      newItem.id = `knowledge-${Date.now()}`;
    }
    
    // 既存データの読み込み
    const data = await readFile(KNOWLEDGE_FILE_PATH, 'utf-8');
    const knowledge = JSON.parse(data);
    
    // 新しいアイテムを追加
    knowledge.push(newItem);
    
    // ファイルに保存
    await writeFile(KNOWLEDGE_FILE_PATH, JSON.stringify(knowledge, null, 2));
    
    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add knowledge item' }, { status: 500 });
  }
}

// CSVパース関数
function parseCSV(csvData: string): Partial<KnowledgeItem>[] {
  const lines = csvData.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const items: Partial<KnowledgeItem>[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const item: Partial<KnowledgeItem> = {};
    
    headers.forEach((header, index) => {
      const value = values[index] || '';
      
      switch (header.toLowerCase()) {
        case 'text':
          item.text = value;
          break;
        case 'keywords':
          item.keywords = value.split(';').map(k => k.trim()).filter(k => k);
          break;
        case 'category':
          item.category = value;
          break;
        case 'severity':
          item.severity = value as any;
          break;
        case 'symptoms':
          item.symptoms = value.split(';').map(s => s.trim()).filter(s => s);
          break;
        case 'recommendations':
          item.recommendations = value.split(';').map(r => r.trim()).filter(r => r);
          break;
        case 'references':
          item.references = value.split(';').map(r => r.trim()).filter(r => r);
          break;
      }
    });
    
    if (item.text) {
      items.push(item);
    }
  }
  
  return items;
}

// バリデーション関数
function validateKnowledgeItem(item: Partial<KnowledgeItem>): boolean {
  return !!(item.text && item.keywords && item.category && item.severity);
}

export async function PUT(request: Request) {
  try {
    const { id, ...updatedItem } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    // 既存データの読み込み
    const data = await readFile(KNOWLEDGE_FILE_PATH, 'utf-8');
    const knowledge = JSON.parse(data);
    
    // アイテムの更新
    const index = knowledge.findIndex((item: KnowledgeItem) => item.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    knowledge[index] = { ...knowledge[index], ...updatedItem };
    
    // ファイルに保存
    await writeFile(KNOWLEDGE_FILE_PATH, JSON.stringify(knowledge, null, 2));
    
    return NextResponse.json({ success: true, item: knowledge[index] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update knowledge item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    // 既存データの読み込み
    const data = await readFile(KNOWLEDGE_FILE_PATH, 'utf-8');
    const knowledge = JSON.parse(data);
    
    // アイテムの削除
    const filteredKnowledge = knowledge.filter((item: KnowledgeItem) => item.id !== id);
    
    if (filteredKnowledge.length === knowledge.length) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    // ファイルに保存
    await writeFile(KNOWLEDGE_FILE_PATH, JSON.stringify(filteredKnowledge, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete knowledge item' }, { status: 500 });
  }
} 