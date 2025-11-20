/**
 * 测试脚本：验证 MediumAPI 集成和降级机制
 *
 * 使用方法：
 * 1. 不设置 RAPIDAPI_KEY - 应该直接使用 RSS Feed
 * 2. 设置无效的 RAPIDAPI_KEY - 应该降级到 RSS Feed
 * 3. 设置有效的 RAPIDAPI_KEY - 应该使用 MediumAPI
 */

// 模拟环境变量
const MEDIUM_USERNAME = 'jamievaron';

console.log('================================');
console.log('MediumAPI 集成测试');
console.log('================================\n');

// 测试 1: RSS Feed（不配置 API Key）
console.log('测试 1: RSS Feed（未配置 RAPIDAPI_KEY）');
console.log('预期: 使用 RSS Feed，dataSource = "rss"\n');

async function testRssFeed() {
  try {
    const { fetchMediumFeed } = await import('../app/utils/medium.ts');
    const result = await fetchMediumFeed(MEDIUM_USERNAME, 5);
    console.log('✅ RSS Feed 测试成功');
    console.log(`   - 获取文章数量: ${result.articles.length}`);
    console.log(`   - Feed 标题: ${result.feed.title}`);
    if (result.articles.length > 0) {
      console.log(`   - 第一篇文章: ${result.articles[0].title}`);
    }
    console.log('');
  } catch (error) {
    console.error('❌ RSS Feed 测试失败:', error.message);
    console.log('');
  }
}

// 测试 2: MediumAPI 客户端（模拟无效 API Key）
console.log('测试 2: MediumAPI 客户端（模拟无效 API Key）');
console.log('预期: 抛出错误，然后降级到 RSS Feed\n');

async function testInvalidMediumApi() {
  // 设置无效的 API Key
  process.env.RAPIDAPI_KEY = 'invalid_key_for_testing';

  try {
    const { getMediumUserId } = await import('../app/utils/mediumApi.ts');
    await getMediumUserId(MEDIUM_USERNAME);
    console.log('❌ 应该抛出错误但没有');
    console.log('');
  } catch (error) {
    console.log('✅ MediumAPI 正确抛出错误');
    console.log(`   - 错误信息: ${error.message}`);
    console.log('');
  } finally {
    // 清除 API Key
    delete process.env.RAPIDAPI_KEY;
  }
}

// 测试 3: 数据适配器
console.log('测试 3: 数据适配器（MediumAPI → MediumArticle）');
console.log('预期: 正确转换数据格式\n');

async function testAdapter() {
  try {
    const { convertMediumApiArticle } = await import('../app/utils/mediumApiAdapter.ts');

    const mockApiArticle = {
      id: 'test123',
      title: 'Test Article',
      subtitle: 'This is a test',
      author: 'author123',
      published_at: '2024-01-15 10:30:00',
      image_url: 'https://example.com/image.jpg',
      tags: ['tag1', 'tag2'],
      url: 'https://medium.com/@user/test-article',
      claps: 100,
      reading_time: 5
    };

    const converted = convertMediumApiArticle(mockApiArticle);

    console.log('✅ 数据适配器测试成功');
    console.log(`   - 标题: ${converted.title}`);
    console.log(`   - GUID: ${converted.guid}`);
    console.log(`   - 链接: ${converted.link}`);
    console.log(`   - 发布日期: ${converted.pubDate}`);
    console.log(`   - 封面图片: ${converted.coverImage}`);
    console.log(`   - 分类: ${converted.categories.join(', ')}`);
    console.log('');
  } catch (error) {
    console.error('❌ 数据适配器测试失败:', error.message);
    console.log('');
  }
}

// 运行所有测试
async function runAllTests() {
  await testRssFeed();
  await testInvalidMediumApi();
  await testAdapter();

  console.log('================================');
  console.log('测试完成！');
  console.log('================================\n');

  console.log('后续步骤:');
  console.log('1. 获取真实的 RAPIDAPI_KEY');
  console.log('2. 在 .env.local 中配置 RAPIDAPI_KEY');
  console.log('3. 运行开发服务器: npm run dev');
  console.log('4. 访问: http://localhost:3000/api/medium?limit=30');
  console.log('5. 检查响应中的 dataSource 字段\n');
}

runAllTests();
