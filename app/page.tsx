import Link from "next/link"
import { ArrowRight, Brain, Dna, MessageCircle, Shield, Sparkles, Users, ChartLine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ナビゲーションバー */}
      <header className="bg-[#008080] text-[#fffff0] py-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Dna className="h-6 w-6 text-[#fffff0]" />
            <span className="text-xl font-bold text-[#fffff0]">NutriGenAI</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-[#fffff0] hover:text-[#fffff0]/80">特徴</a>
            <a href="#how-it-works" className="text-[#fffff0] hover:text-[#fffff0]/80">使い方</a>
            <a href="#pricing" className="text-[#fffff0] hover:text-[#fffff0]/80">料金</a>
            <a href="#faq" className="text-[#fffff0] hover:text-[#fffff0]/80">よくある質問</a>
          </nav>
          <Button className="bg-[#fffff0] text-[#008080] hover:bg-[#fffff0]/90">無料で始める</Button>
        </div>
      </header>

      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="relative py-20 md:py-32 bg-gradient-to-b from-emerald-50 to-white">
          <div className="container flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-6 bg-white">
              <span className="text-emerald-600 mr-1">✨</span> 分子栄養学の力で健康管理を革新
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl">
              あなただけの健康管理パートナー
              <span className="text-emerald-600">分子レベル</span>
              でサポート
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl">
              NutriGenAIは最先端の分子栄養学とAI技術を組み合わせ、あなたの体質や生活習慣に合わせたパーソナライズされた健康アドバイスを提供します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                無料トライアル開始 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                デモを見る
              </Button>
            </div>
            <div className="relative w-full max-w-4xl rounded-xl border bg-white p-2 shadow-lg">
              <div className="rounded-lg bg-gray-50 p-4 h-[400px] flex flex-col">
                <div className="flex-1 overflow-auto space-y-4 p-4">
                  <div className="flex items-start gap-4 text-left">
                    <div className="rounded-full bg-gray-200 p-2">
                      <MessageCircle className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        最近疲れやすくて、集中力も続かないんです。食事で改善できることはありますか？
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 text-left flex-row-reverse">
                    <div className="rounded-full bg-emerald-100 p-2">
                      <Brain className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm">
                        疲労感と集中力低下には、ビタミンB群とマグネシウムの不足が関係している可能性があります。あなたの食事記録を分析すると、これらの栄養素が最適レベルに達していないようです。
                      </p>
                      <p className="text-sm mt-2">
                        緑の葉野菜、ナッツ類、全粒穀物を増やすことをお勧めします。特に朝食にオートミールとナッツ、昼食に葉物サラダを取り入れてみてはいかがでしょうか？また、あなたの体質に合わせて、マグネシウムが豊富なアーモンドやほうれん草を毎日の食事に取り入れることで、エネルギー代謝が改善される可能性があります。
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="質問を入力してください..."
                    className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Button className="bg-emerald-600 hover:bg-emerald-700">送信</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 特徴セクション */}
        <section id="features" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">NutriGenAIの特徴</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#008080] p-6 rounded-lg text-[#fffff0]">
                <Dna className="h-8 w-8 mb-4 text-[#fffff0]" />
                <h3 className="text-xl font-bold mb-2">分子栄養学に基づく</h3>
                <p>遺伝子レベルでの栄養分析により、あなたに最適な食事プランを提案します。</p>
              </div>
              <div className="bg-[#008080] p-6 rounded-lg text-[#fffff0]">
                <Brain className="h-8 w-8 mb-4 text-[#fffff0]" />
                <h3 className="text-xl font-bold mb-2">AIによる最適化</h3>
                <p>人工知能があなたの体質や生活習慣に合わせて、最適な栄養バランスを計算します。</p>
              </div>
              <div className="bg-[#008080] p-6 rounded-lg text-[#fffff0]">
                <ChartLine className="h-8 w-8 mb-4 text-[#fffff0]" />
                <h3 className="text-xl font-bold mb-2">進化する提案</h3>
                <p>継続的な利用により、AIがあなたの体質をより深く理解し、より正確な提案を行います。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 仕組みセクション */}
        <section id="how-it-works" className="py-20 bg-[#008080] text-[#fffff0]">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">NutriGenAIの仕組み</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                最先端のAI技術と分子栄養学の専門知識を組み合わせた、革新的な健康管理プラットフォーム。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="bg-[#fffff0] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#000080] font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">プロフィール作成</h3>
                <p className="text-gray-600">
                  あなたの年齢、性別、健康状態、生活習慣、目標などの情報を入力。AIがあなたの基本プロフィールを作成します。
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="bg-[#fffff0] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#000080] font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">AIによる分析</h3>
                <p className="text-gray-600">
                  入力された情報をもとに、AIが分子レベルでの栄養バランスを分析し、あなたに最適な栄養素の組み合わせを特定します。
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="bg-[#fffff0] w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-[#000080] font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">パーソナライズされたアドバイス</h3>
                <p className="text-gray-600">
                  あなたの質問や悩みに対して、分子栄養学に基づいたパーソナライズされたアドバイスをリアルタイムで提供します。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 料金プランセクション */}
        <section id="pricing" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">シンプルな料金プラン</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                あなたのニーズに合わせた柔軟なプランをご用意しています。いつでもアップグレードやダウングレードが可能です。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>ベーシック</CardTitle>
                  <div className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-3xl font-bold tracking-tight">¥1,980</span>
                    <span className="ml-1 text-xl font-semibold">/月</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">AIチャットボット（月100回まで）</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">基本的な栄養アドバイス</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">週次レポート</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">選択する</Button>
                </CardFooter>
              </Card>
              <Card className="border-emerald-200 bg-emerald-50 shadow-md">
                <CardHeader>
                  <div className="py-1 px-3 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full inline-block mb-2">
                    人気
                  </div>
                  <CardTitle>プレミアム</CardTitle>
                  <div className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-3xl font-bold tracking-tight">¥3,980</span>
                    <span className="ml-1 text-xl font-semibold">/月</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">AIチャットボット（無制限）</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">詳細な分子栄養分析</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">カスタム栄養プラン</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">日次・週次レポート</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">優先サポート</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">選択する</Button>
                </CardFooter>
              </Card>
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>エンタープライズ</CardTitle>
                  <div className="mt-4 flex items-baseline text-gray-900">
                    <span className="text-3xl font-bold tracking-tight">お問い合わせ</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">プレミアムの全機能</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">専任の栄養コンサルタント</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">カスタムAPI連携</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">ホワイトラベル対応</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 text-gray-600">24時間サポート</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    お問い合わせ
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* お客様の声セクション */}
        <section className="py-20 bg-emerald-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">お客様の声</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                NutriGenAIを実際に使用されているお客様からの声をご紹介します。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-emerald-600 font-bold">TK</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">田中 健太</h4>
                      <p className="text-sm text-gray-500">会社員 / 42歳</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    「忙しい仕事の合間でも、AIチャットボットに相談するだけで具体的な栄養アドバイスがもらえるのが素晴らしい。慢性的な疲労感が改善され、集中力も上がりました。分子レベルでの説明が分かりやすく、なぜその食品が良いのかが理解できます。」
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-emerald-600 font-bold">MY</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">宮本 優子</h4>
                      <p className="text-sm text-gray-500">主婦 / 35歳</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    「子育てと家事で忙しい中、自分の健康管理がおろそかになっていました。NutriGenAIのおかげで、家族の食事を作りながら自分の栄養バランスも考えられるようになりました。肌の調子も良くなり、エネルギーレベルが上がったのを実感しています。」
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-emerald-600 font-bold">SK</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">佐藤 健一</h4>
                      <p className="text-sm text-gray-500">アスリート / 28歳</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    「トレーニングのパフォーマンスを上げるために栄養面を改善したいと思っていました。NutriGenAIは私の体質や運動強度に合わせた具体的なアドバイスをくれるので、回復力が上がり、記録も伸びています。科学的根拠に基づいているので信頼できます。」
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* よくある質問セクション */}
        <section id="faq" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">よくある質問</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                NutriGenAIについてよくいただく質問にお答えします。
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">分子栄養学とは何ですか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    分子栄養学は、栄養素が体内でどのように代謝され、細胞レベルでどのような影響を与えるかを研究する学問です。従来の栄養学よりも詳細に、分子・細胞レベルでの栄養素の働きを解明し、個人の体質や状態に合わせた最適な栄養摂取を目指します。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AIチャットボットは医師の診断の代わりになりますか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    いいえ、NutriGenAIは医療アドバイスや診断の代わりにはなりません。健康管理や栄養に関する一般的な情報提供を目的としており、特定の健康状態や疾患に関しては、必ず医療専門家にご相談ください。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    どのようにして私の体質に合ったアドバイスを提供するのですか？
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    ご登録時に入力いただく基本情報と、日々の食事記録、体調の変化、活動レベルなどのデータを分析し、AIが学習することであなた専用のプロファイルを作成します。このプロファイルに基づいて、あなたの体質や状態に最適なアドバイスを提供します。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">解約はいつでもできますか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    はい、いつでも解約可能です。アカウント設定から簡単に解約手続きができます。解約後は次回の請求日以降のサービス提供が停止されます。なお、解約前のデータは一定期間保存されますので、再開時にも以前の記録を引き継ぐことができます。
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">個人情報はどのように保護されていますか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    お客様の個人情報とデータは厳重に保護されています。最新の暗号化技術を使用し、第三者への情報提供は行いません。また、データはAIの学習と改善のために匿名化された形で使用されることがありますが、個人を特定できる情報は含まれません。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="py-20 bg-[#008080]">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#fffff0] mb-6">あなたの健康管理を次のレベルへ</h2>
            <p className="text-xl text-[#fffff0] mb-10 max-w-2xl mx-auto">
              分子栄養学に基づいた科学的アプローチで、あなたの健康をサポートします。今すぐ始めて、体感してください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#fffff0] text-[#000080] hover:bg-[#fffff0]/90">
                無料トライアル開始
              </Button>
              <Button size="lg" variant="outline" className="text-[#fffff0] border-[#fffff0] hover:bg-[#000080]/90">
                詳細を見る
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-[#008080] text-[#fffff0] py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dna className="h-6 w-6 text-[#fffff0]" />
                <span className="text-xl font-bold text-[#fffff0]">NutriGenAI</span>
              </div>
              <p className="text-[#fffff0]/80">
                分子栄養学に基づいた自主健康管理AIチャットボットで、あなたの健康をサポートします。
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#fffff0]">サービス</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#fffff0] transition-colors">
                    AIチャットボット
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fffff0] transition-colors">
                    栄養分析
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fffff0] transition-colors">
                    カスタムプラン
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fffff0] transition-colors">
                    健康レポート
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#fffff0]">会社情報</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#fffff0] transition-colors">
                    会社概要
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fffff0] transition-colors">
                    プライバシーポリシー
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fffff0] transition-colors">
                    利用規約
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#fffff0] transition-colors">
                    お問い合わせ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#fffff0]">お問い合わせ</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-[#fffff0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>info@nutrigen-ai.com</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2 text-[#fffff0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>03-1234-5678</span>
                </li>
              </ul>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-[#fffff0] hover:text-[#fffff0]">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-[#fffff0] hover:text-[#fffff0]">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-[#fffff0] hover:text-[#fffff0]">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} NutriAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 