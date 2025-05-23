import Link from 'next/link';
import { DocumentTextIcon, LightBulbIcon, AcademicCapIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { TypedTitle } from '@/components/home/TypedTitle';
import { getTranslations } from 'next-intl/server';
import { isPaymentEnabled } from '@/components/paywall/config';

export default async function Home({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = await params;
  
  const t = await getTranslations({
    locale,
    namespace: 'home'
  });
  
  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 grid grid-cols-6 gap-1 pointer-events-none select-none opacity-[0.02]">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="h-4 bg-[#8ECAE6]"></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white/80 backdrop-blur-sm sm:pb-16 md:pb-20 lg:max-w-none lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
                <div className="sm:text-center lg:text-left lg:col-span-7">
                  <h1 className="text-4xl tracking-tight font-extrabold text-[#023047] sm:text-5xl md:text-6xl">
                    <div className="flex flex-col items-start lg:items-start sm:items-center">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="inline-flex items-center">
                          <span className="glitch-text text-3xl sm:text-4xl md:text-5xl" data-text="Easy Algo">Easy Algo</span>
                          <span className="ml-1 w-2 h-2 bg-[#FFB703] rounded-full animate-pulse"></span>
                        </span>
                      </div>
                      <TypedTitle />
                    </div>
                  </h1>
                  <p className="mt-6 text-base text-[#023047]/70 sm:mt-8 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-10 md:text-xl lg:mx-0 relative z-10">
                    {t('hero.description')}
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link href="/docs" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#023047] bg-[#FFB703] hover:bg-[#FFB703]/90 transition-all duration-200 md:py-4 md:text-lg md:px-10 group relative overflow-hidden">
                        <span className="relative z-10">{t('hero.startLearning')}</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#FFB703]/0 via-white/20 to-[#FFB703]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></span>
                        <span className="ml-2 w-1.5 h-1.5 bg-[#023047] rounded-full group-hover:animate-ping relative z-10"></span>
                      </Link>
                    </div>
                    {isPaymentEnabled() && (
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link href="/pricing" className="w-full flex items-center justify-center px-8 py-3 border border-[#8ECAE6] text-base font-medium rounded-md text-[#023047] bg-white hover:bg-[#8ECAE6]/10 transition-colors duration-200 md:py-4 md:text-lg md:px-10 group">
                          {t('hero.membershipButton')}
                          <span className="ml-2 w-1.5 h-1.5 border border-[#8ECAE6] rounded-full group-hover:bg-[#8ECAE6] transition-colors duration-200"></span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                {/* Code Preview Card */}
                <div className="relative hidden lg:block lg:col-span-5">
                  <div className="absolute -left-3 -top-3 w-16 h-16 bg-[#8ECAE6] rounded-lg opacity-20 animate-pulse"></div>
                  <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-[#8ECAE6] rounded-lg opacity-20 animate-pulse"></div>
                  <div className="bg-white rounded-lg shadow-lg p-5 relative z-10 transform rotate-1 border border-gray-100 hover:rotate-0 transition-all duration-300 hover:shadow-xl hover:border-[#8ECAE6]/20">
                    <div className="border-b border-gray-200 pb-2 mb-4">
                      <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <div className="w-full">
                      <pre className="text-[13px] leading-6 sm:text-sm sm:leading-7 text-[#023047] font-mono whitespace-pre-wrap break-words p-6 bg-gray-50/50 rounded-md">
                        <span className="block text-[#FFB703] font-medium"># {t('hero.codeExample.title')}</span>
                        <span className="block mb-4 text-[#FFB703] font-medium"># {t('hero.codeExample.complexity')}</span>
                        <div className="block">
                          <span className="text-[#023047]">class</span> <span className="text-[#8ECAE6] font-semibold">{t('hero.codeExample.solution')}</span>:
                        </div>
                        <div className="block">
                          <span className="pl-8" />
                          <span className="text-[#023047]">def</span> <span className="text-[#FFB703] font-semibold">{t('hero.codeExample.method')}</span>(<span className="text-[#023047]">{t('hero.codeExample.params.self')}</span>, nums: <span className="text-[#8ECAE6]">List[int]</span>, target: <span className="text-[#8ECAE6]">int</span>) {'->'} <span className="text-[#8ECAE6]">List[int]</span>:
                        </div>
                        <div className="block">
                          <span className="pl-16" />
                          <span>hash_map = {'{}'}</span>
                        </div>
                        <div className="block">
                          <span className="pl-16" />
                          <span className="text-[#023047]">for</span> i, num <span className="text-[#023047]">in</span> enumerate(nums):
                        </div>
                        <div className="block">
                          <span className="pl-24" />
                          <span>complement = target - num</span>
                        </div>
                        <div className="block">
                          <span className="pl-24" />
                          <span className="text-[#023047]">if</span> complement <span className="text-[#023047]">in</span> hash_map:
                        </div>
                        <div className="block">
                          <span className="pl-32" />
                          <span className="text-[#023047]">return</span> [hash_map[complement], i]
                        </div>
                        <div className="block">
                          <span className="pl-24" />
                          <span className="text-[#023047]">hash_map[num] = i</span>
                        </div>
                        <div className="block">
                          <span className="pl-16" />
                          <span className="text-[#023047]">return []</span>
                        </div>
                      </pre>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#8ECAE6] rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
} 