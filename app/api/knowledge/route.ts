import { NextResponse } from 'next/server';
import { 
  searchKnowledgeBase, 
  getMostRelevantKnowledge, 
  getKnowledgeStats,
  getKnowledgeBySeverity,
  getKnowledgeByCategory,
  getHighRiskKnowledge,
  getKnowledgeWithSymptoms,
  SEVERITY_LEVELS,
  CATEGORIES
} from '@/lib/knowledge-base';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const category = searchParams.get('category');
  const severity = searchParams.get('severity');
  const hasSymptoms = searchParams.get('hasSymptoms');
  const action = searchParams.get('action');

  try {
    // 統計情報の取得
    if (action === 'stats') {
      const stats = getKnowledgeStats();
      return NextResponse.json({
        stats,
        severityLevels: SEVERITY_LEVELS,
        categories: CATEGORIES
      });
    }

    // 高リスク知識の取得
    if (action === 'high-risk') {
      const highRiskKnowledge = getHighRiskKnowledge();
      return NextResponse.json({
        action: 'high-risk',
        knowledge: highRiskKnowledge,
        count: highRiskKnowledge.length
      });
    }

    // 症状がある知識の取得
    if (action === 'with-symptoms') {
      const knowledgeWithSymptoms = getKnowledgeWithSymptoms();
      return NextResponse.json({
        action: 'with-symptoms',
        knowledge: knowledgeWithSymptoms,
        count: knowledgeWithSymptoms.length
      });
    }

    // カテゴリ別取得
    if (category && !query) {
      const categoryKnowledge = getKnowledgeByCategory(category);
      return NextResponse.json({
        action: 'category',
        category,
        knowledge: categoryKnowledge,
        count: categoryKnowledge.length
      });
    }

    // 深刻度別取得
    if (severity && !query) {
      const severityKnowledge = getKnowledgeBySeverity(severity);
      return NextResponse.json({
        action: 'severity',
        severity,
        knowledge: severityKnowledge,
        count: severityKnowledge.length
      });
    }

    // 検索クエリがある場合
    if (query) {
      const filters: any = {};
      if (category) filters.category = category;
      if (severity) filters.severity = [severity];
      if (hasSymptoms !== null) filters.hasSymptoms = hasSymptoms === 'true';

      const searchResults = searchKnowledgeBase(query, filters);
      const mostRelevant = getMostRelevantKnowledge(query, 3, filters);

      return NextResponse.json({
        query,
        filters,
        searchResults,
        mostRelevant,
        totalResults: searchResults.length
      });
    }

    // デフォルト：全データ取得
    const allKnowledge = getKnowledgeStats();
    return NextResponse.json({
      action: 'all',
      stats: allKnowledge,
      severityLevels: SEVERITY_LEVELS,
      categories: CATEGORIES
    });

  } catch (error) {
    console.error('Knowledge base API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 