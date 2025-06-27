import knowledgeBaseData from './data/knowledge-base.json';

export interface KnowledgeItem {
  id: string;
  text: string;
  keywords: string[];
  category: string;
  severity: 'info' | 'caution' | 'warning' | 'high' | 'critical';
  symptoms: string[];
  recommendations: string[];
  references: string[];
}

export interface KnowledgeSearchResult {
  item: KnowledgeItem;
  relevanceScore: number;
  matchedKeywords: string[];
}

export interface KnowledgeFilter {
  category?: string;
  severity?: string[];
  hasSymptoms?: boolean;
}

/**
 * 深刻度レベルの定義と基準
 */
export const SEVERITY_LEVELS = {
  info: { 
    label: '情報', 
    color: 'blue', 
    priority: 1,
    criteria: '一般的な知識、教育的内容、基礎的な理解に必要な情報'
  },
  caution: { 
    label: '注意', 
    color: 'yellow', 
    priority: 2,
    criteria: '軽度の注意が必要、特定の条件下でのリスク、予防的な注意事項'
  },
  warning: { 
    label: '警告', 
    color: 'orange', 
    priority: 3,
    criteria: '中程度のリスク、健康への影響が予想される、医療機関への相談を推奨'
  },
  high: { 
    label: '高リスク', 
    color: 'red', 
    priority: 4,
    criteria: '高いリスク、明確な健康被害の可能性、即座の対応が必要'
  },
  critical: { 
    label: '緊急', 
    color: 'purple', 
    priority: 5,
    criteria: '生命に関わる危険、緊急医療介入が必要、直ちに医師に相談'
  }
} as const;

/**
 * 深刻度判定ガイドライン
 */
export const SEVERITY_GUIDELINES = {
  // 症状の有無による判定
  hasSymptoms: {
    none: 'info',
    mild: 'caution',
    moderate: 'warning',
    severe: 'high',
    lifeThreatening: 'critical'
  },
  
  // 対象者の状態による判定
  targetAudience: {
    general: 'info',
    atRisk: 'caution',
    patients: 'warning',
    highRiskPatients: 'high',
    emergency: 'critical'
  },
  
  // 行動の緊急性による判定
  actionRequired: {
    none: 'info',
    optional: 'caution',
    recommended: 'warning',
    required: 'high',
    immediate: 'critical'
  },
  
  // 科学的根拠の強さによる判定
  evidenceLevel: {
    established: 'info',
    probable: 'caution',
    possible: 'warning',
    likely: 'high',
    confirmed: 'critical'
  }
} as const;

/**
 * カテゴリの定義
 */
export const CATEGORIES = {
  protein_structure: 'タンパク質構造',
  biochemistry: '生化学',
  physiology: '生理学',
  nutrition: '栄養学',
  metabolism: '代謝',
  genetics: '遺伝学',
  health_risks: '健康リスク',
  cancer_risks: '癌リスク',
  cancer_biology: '癌生物学',
  nutritional_disorders: '栄養障害',
  health_misconceptions: '健康に関する誤解',
  vaccine_safety: 'ワクチン安全性',
  gender_specific_health: '性別特異的健康'
} as const;

/**
 * 知識ベースから関連する情報を検索する
 */
export function searchKnowledgeBase(
  query: string, 
  filters?: KnowledgeFilter
): KnowledgeSearchResult[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(word => word.length > 0);
  
  const results: KnowledgeSearchResult[] = [];
  
  for (const item of knowledgeBaseData as KnowledgeItem[]) {
    // フィルター適用
    if (filters) {
      if (filters.category && item.category !== filters.category) continue;
      if (filters.severity && !filters.severity.includes(item.severity)) continue;
      if (filters.hasSymptoms !== undefined) {
        const hasSymptoms = item.symptoms.length > 0;
        if (filters.hasSymptoms !== hasSymptoms) continue;
      }
    }
    
    let relevanceScore = 0;
    const matchedKeywords: string[] = [];
    
    // キーワードマッチング
    for (const keyword of item.keywords) {
      const keywordLower = keyword.toLowerCase();
      
      // 完全一致
      if (queryLower.includes(keywordLower) || keywordLower.includes(queryLower)) {
        relevanceScore += 10;
        matchedKeywords.push(keyword);
      }
      
      // 部分一致
      for (const queryWord of queryWords) {
        if (keywordLower.includes(queryWord) || queryWord.includes(keywordLower)) {
          relevanceScore += 5;
          if (!matchedKeywords.includes(keyword)) {
            matchedKeywords.push(keyword);
          }
        }
      }
    }
    
    // テキスト内容でのマッチング
    const textLower = item.text.toLowerCase();
    for (const queryWord of queryWords) {
      if (textLower.includes(queryWord)) {
        relevanceScore += 2;
      }
    }
    
    // 症状でのマッチング
    for (const symptom of item.symptoms) {
      const symptomLower = symptom.toLowerCase();
      for (const queryWord of queryWords) {
        if (symptomLower.includes(queryWord)) {
          relevanceScore += 8; // 症状マッチは高スコア
        }
      }
    }
    
    if (relevanceScore > 0) {
      results.push({
        item,
        relevanceScore,
        matchedKeywords: [...new Set(matchedKeywords)]
      });
    }
  }
  
  // 関連性スコアでソート（降順）
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * 知識ベースから最も関連性の高い情報を取得
 */
export function getMostRelevantKnowledge(
  query: string, 
  limit: number = 3,
  filters?: KnowledgeFilter
): KnowledgeItem[] {
  const results = searchKnowledgeBase(query, filters);
  return results.slice(0, limit).map(result => result.item);
}

/**
 * 深刻度別に知識を取得
 */
export function getKnowledgeBySeverity(severity: string): KnowledgeItem[] {
  return (knowledgeBaseData as KnowledgeItem[]).filter(item => 
    item.severity === severity
  );
}

/**
 * カテゴリ別に知識を取得
 */
export function getKnowledgeByCategory(category: string): KnowledgeItem[] {
  return (knowledgeBaseData as KnowledgeItem[]).filter(item => 
    item.category === category
  );
}

/**
 * 症状がある知識を取得
 */
export function getKnowledgeWithSymptoms(): KnowledgeItem[] {
  return (knowledgeBaseData as KnowledgeItem[]).filter(item => 
    item.symptoms.length > 0
  );
}

/**
 * 高リスクの知識を取得
 */
export function getHighRiskKnowledge(): KnowledgeItem[] {
  return (knowledgeBaseData as KnowledgeItem[]).filter(item => 
    ['high', 'critical'].includes(item.severity)
  );
}

/**
 * 知識ベースの全データを取得
 */
export function getAllKnowledge(): KnowledgeItem[] {
  return knowledgeBaseData as KnowledgeItem[];
}

/**
 * 特定のキーワードに関連する知識を取得
 */
export function getKnowledgeByKeyword(keyword: string): KnowledgeItem[] {
  const keywordLower = keyword.toLowerCase();
  return (knowledgeBaseData as KnowledgeItem[]).filter(item =>
    item.keywords.some(k => k.toLowerCase().includes(keywordLower))
  );
}

/**
 * 統計情報を取得
 */
export function getKnowledgeStats() {
  const data = knowledgeBaseData as KnowledgeItem[];
  
  const severityCounts = data.reduce((acc, item) => {
    acc[item.severity] = (acc[item.severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const categoryCounts = data.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total: data.length,
    withSymptoms: data.filter(item => item.symptoms.length > 0).length,
    highRisk: data.filter(item => ['high', 'critical'].includes(item.severity)).length,
    severityCounts,
    categoryCounts
  };
} 