'use client';

import Link from 'next/link';
import { DocumentTextIcon, LightBulbIcon, AcademicCapIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
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
                      <div className="h-16 sm:h-20 flex items-center whitespace-nowrap overflow-hidden max-w-[90vw] sm:max-w-[600px] md:max-w-[720px]">
                        <div className="relative inline-block">
                          <TypeAnimation
                            sequence={[
                              '算_',
                              80,
                              '算法_',
                              80,
                              '算法学_',
                              80,
                              '算法学习_',
                              80,
                              '算法学习，_',
                              80,
                              '算法学习，从_',
                              80,
                              '算法学习，从未_',
                              80,
                              '算法学习，从未如_',
                              80,
                              '算法学习，从未如此_',
                              80,
                              '算法学习，从未如此简_',
                              80,
                              '算法学习，从未如此简单！_',
                              80,
                              '算法学习，从未如此简单！',
                              3000,
                            ]}
                            wrapper="span"
                            speed={40}
                            className="inline-block text-lg sm:text-2xl md:text-3xl text-[#8ECAE6] border-r-4 border-[#8ECAE6] pr-2 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-[#8ECAE6]/20"
                            repeat={Infinity}
                            cursor={false}
                            deletionSpeed={80}
                          />
                          <span className="absolute -bottom-1 right-0 w-2 h-2 bg-[#8ECAE6] rounded-full animate-ping opacity-75"></span>
                        </div>
                      </div>
                    </div>
                  </h1>
                  <p className="mt-6 text-base text-[#023047]/70 sm:mt-8 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-10 md:text-xl lg:mx-0 relative z-10">
                    通过清晰的图解和实例，让数据结构与算法变得简单有趣。从基础到进阶，助你轻松掌握算法精髓，提升编程能力。
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link href="/docs" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#023047] bg-[#FFB703] hover:bg-[#FFB703]/90 transition-all duration-200 md:py-4 md:text-lg md:px-10 group relative overflow-hidden">
                        <span className="relative z-10">开始学习</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#FFB703]/0 via-white/20 to-[#FFB703]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></span>
                        <span className="ml-2 w-1.5 h-1.5 bg-[#023047] rounded-full group-hover:animate-ping relative z-10"></span>
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link href="/pricing" className="w-full flex items-center justify-center px-8 py-3 border border-[#8ECAE6] text-base font-medium rounded-md text-[#023047] bg-white hover:bg-[#8ECAE6]/10 transition-colors duration-200 md:py-4 md:text-lg md:px-10 group">
                        查看课程
                        <span className="ml-2 w-1.5 h-1.5 border border-[#8ECAE6] rounded-full group-hover:bg-[#8ECAE6] transition-colors duration-200"></span>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Code Preview Card */}
                <div className="relative hidden lg:block lg:col-span-5">
                  <div className="absolute -left-3 -top-3 w-16 h-16 bg-[#8ECAE6] rounded-lg opacity-20 animate-pulse"></div>
                  <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-[#8ECAE6] rounded-lg opacity-20 animate-pulse"></div>
                  <div className="bg-white rounded-lg shadow-lg p-4 relative z-10 transform rotate-1 border border-gray-100 hover:rotate-0 transition-all duration-300 hover:shadow-xl hover:border-[#8ECAE6]/20">
                    <div className="border-b border-gray-200 pb-2 mb-3">
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                      </div>
                    </div>
                    <pre className="text-xs leading-5 sm:text-sm sm:leading-6 text-[#023047] font-mono overflow-x-auto group"><code><span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#FFB703]"># Two Sum - LeetCode #1
# Time: O(n), Space: O(n)</span>

class Solution:
    def twoSum(self, nums: List[int], 
               target: int) -&gt; List[int]:
        <span className="text-[#8ECAE6]"># 使用哈希表优化</span>
        hash_map = {}
        
        <span className="text-[#8ECAE6]"># 一次遍历</span>
        for i, num in enumerate(nums):
            complement = target - num
            if complement in hash_map:
                return [hash_map[complement], i]
            hash_map[num] = i
        
        return []</code></pre>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#8ECAE6] rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Latest Documents */}
      <div className="bg-[#8ECAE6]/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#023047]">热门算法教程</h2>
            <p className="mt-4 max-w-2xl text-xl text-[#023047]/70 mx-auto">
              精心编写的算法教程，让你的学习事半功倍
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Document Card 1 */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-[#8ECAE6]/10 hover:border-[#8ECAE6]/30 transition-colors duration-200">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DocumentTextIcon className="h-8 w-8 text-[#8ECAE6]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-[#023047]">二叉树专题详解</h3>
                    <p className="mt-1 text-sm text-[#023047]/70">
                      从基础到高级，全面掌握二叉树的各种操作和算法...
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/docs/binary-tree" className="text-sm font-medium text-[#8ECAE6] hover:text-[#8ECAE6]/80 flex items-center">
                    开始学习
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Document Card 2 */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-[#8ECAE6]/10 hover:border-[#8ECAE6]/30 transition-colors duration-200">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DocumentTextIcon className="h-8 w-8 text-[#8ECAE6]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-[#023047]">动态规划入门</h3>
                    <p className="mt-1 text-sm text-[#023047]/70">
                      图解动态规划的核心思想，从入门到实战...
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/docs/dynamic-programming" className="text-sm font-medium text-[#8ECAE6] hover:text-[#8ECAE6]/80 flex items-center">
                    开始学习
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Document Card 3 */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-[#8ECAE6]/10 hover:border-[#8ECAE6]/30 transition-colors duration-200">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DocumentTextIcon className="h-8 w-8 text-[#8ECAE6]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-[#023047]">LeetCode 精选题解</h3>
                    <p className="mt-1 text-sm text-[#023047]/70">
                      精选高频面试算法题，详细解析解题思路...
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/docs/leetcode-solutions" className="text-sm font-medium text-[#8ECAE6] hover:text-[#8ECAE6]/80 flex items-center">
                    开始学习
                    <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-[#023047]">为什么选择 Easy Algo？</h2>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-[#8ECAE6] rounded-md shadow-lg">
                        <LightBulbIcon className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-[#023047] tracking-tight">通俗易懂</h3>
                    <p className="mt-5 text-base text-[#023047]/70">
                      深入浅出的讲解方式，配合清晰的图解，让复杂的算法变得简单易懂
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-[#FFB703] rounded-md shadow-lg">
                        <AcademicCapIcon className="h-6 w-6 text-[#023047]" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-[#023047] tracking-tight">循序渐进</h3>
                    <p className="mt-5 text-base text-[#023047]/70">
                      从基础到进阶的学习路线，帮助你系统地掌握数据结构与算法
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-[#8ECAE6] rounded-md shadow-lg">
                        <CodeBracketIcon className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-[#023047] tracking-tight">实战演练</h3>
                    <p className="mt-5 text-base text-[#023047]/70">
                      大量实战案例和习题，帮助你快速应用所学知识
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
