const sum = require('../src/sum');

describe('sum', () => {
  test('使用sum函数，测试整数相加', () => {
    // 初始化
    beforeAll(() => {
      // 预处理操作
    })
    // 调用代码
    const result = sum(1, 2)
    // 断言
    expect(result).toBe(3);
  });
})
