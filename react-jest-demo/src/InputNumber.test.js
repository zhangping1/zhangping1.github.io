import InputNumber from './InputNumber.jsx';

describe('InputNumber', () => {

  describe('传入的参数处理', () => {
    test('input的渲染是否正常', () => {
      const wrapper = mount(<InputNumber />);
      expect(wrapper).toExist();
    });

    test('传入placeholder是否正常显示', () => {
      const inputProps = {
        placeholder: '测试placeholder',
      };
      const wrapper = mount(<InputNumber {...inputProps} />);
      expect(
        wrapper
          .find('input')
          .getDOMNode()
          .getAttribute('placeholder')
      ).toEqual(inputProps.placeholder);
    });
  })

  describe('自身逻辑处理', () => {

    describe('测试负数', () => {

      test('测试只输入-', () => {
        const handleChange = jest.fn();
        const inputProps = {
          isSupportNegative: true,
          onChange:handleChange
        };
        const wrapper = mount(<InputNumber {...inputProps} />);
        const input = wrapper.find('input');
        input.simulate('change', {
          target: {
            value: '-',
          },
        });
        expect(input.getDOMNode().value).toEqual('-');
      });

      test('测试输入-1', () => {
        const handleChange = jest.fn();
        const inputProps = {
          isSupportNegative: true,
          onChange:handleChange
        };
        const wrapper = mount(<InputNumber {...inputProps} />);
        const input = wrapper.find('input');
        input.simulate('change', {
          target: {
            value: '-1',
          },
        });
        expect(input.getDOMNode().value).toEqual('-1');
      });
    })

    describe('测试正数', () => {
      const handleChange = jest.fn();
      const inputProps = {
        isSupportNegative: false,
        onChange:handleChange
      };
      const wrapper = mount(<InputNumber {...inputProps} />);
      const input = wrapper.find('input');

      test('测试只输入-', () => {
        input.simulate('change', {
          target: {
            value: '-',
          },
        });
        expect(input.getDOMNode().value).toEqual('');
        // expect(handleChange).not.toBeCalled();
      });

      test('测试输入-1', () => {
        input.simulate('change', {
          target: {
            value: '-1',
          },
        });
        expect(input.getDOMNode().value).toEqual('1');
      });
    })

  })

  describe('测试精度', () => {

    test('测试数字2', () => {
      const inputProps = {
        precision: 1
      };
      const wrapper = mount(<InputNumber {...inputProps} />);
      const input = wrapper.find('input');
      input.simulate('change', {
        target: {
          value: '1',
        },
      });
      expect(input.getDOMNode().value).toEqual('1');
    });

    test('测试数字2.0', () => {
      const inputProps = {
        precision: 1
      };
      const wrapper = mount(<InputNumber {...inputProps} />);
      const input = wrapper.find('input');
      input.simulate('change', {
        target: {
          value: '2.0',
        },
      });
      expect(input.getDOMNode().value).toEqual('2.0');
    });

    test('测试数字2.01', () => {
      const inputProps = {
        precision: 1
      };
      const wrapper = mount(<InputNumber {...inputProps} />);
      const input = wrapper.find('input');
      input.simulate('change', {
        target: {
          value: '2.01',
        },
      });
      expect(input.getDOMNode().value).toEqual('2.0');
    });
  });

  describe('测试默认情况下只能输入数字', () => {

    test('测试输入1', () => {
      const wrapper = mount(<InputNumber  />);
      const input = wrapper.find('input');
      input.simulate('change', {
        target: {
          value: '1',
        },
      });
      expect(input.getDOMNode().value).toEqual('1');
    });


    test('测试输入q', () => {
      const wrapper = mount(<InputNumber />);
      const input = wrapper.find('input');
      input.simulate('change', {
        target: {
          value: 'q',
        },
      });
      expect(input.getDOMNode().value).toEqual('');
    });

    test('测试输入空格', () => {
      const wrapper = mount(<InputNumber />);
      const input = wrapper.find('input');
      input.simulate('change', {
        target: {
          value: ' ',
        },
      });
      expect(input.getDOMNode().value).toEqual('');
    });

    test('测试输入.', () => {
      const wrapper = mount(<InputNumber />);
      const input = wrapper.find('input');
      input.simulate('change', {
        target: {
          value: '.',
        },
      });
      expect(input.getDOMNode().value).toEqual('');
    });
  })

  describe('调用外界方法', () => {

    let container;
    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    test('测试onFocus', () => {
      const handleFocus = jest.fn();
      const wrapper = mount(<InputNumber onFocus={handleFocus} />);
      const input = wrapper.find('input');
      input.simulate('focus');
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    test('测试onBlur', () => {
      const handleBlur = jest.fn();
      const wrapper = mount(<InputNumber onBlur={handleBlur} />);
      const input = wrapper.find('input');
      input.simulate('blur');
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    test('测试多次输入，调用多次onChange', () => {
      const handleChange = jest.fn();
      const wrapper = mount(<InputNumber onChange={handleChange} />);
      const input = wrapper.find('input');
      input.simulate('change', {
        target: {
          value: '1',
        },
      });
      input.simulate('change', {
        target: {
          value: '2',
        },
      });
      expect(input.getDOMNode().value).toEqual('2');
      expect(handleChange).toHaveBeenCalledTimes(2);
    });

    test('测试提供给外界的focus', () => {
      const handleFocus = jest.fn();
      const wrapper = mount(<InputNumber onFocus={handleFocus} />, { attachTo: container });
      wrapper.instance().focus();
      expect(handleFocus).toBeCalled();
    });

    test('测试提供给外界的blur', () => {
      const handleBlur = jest.fn();
      const wrapper = mount(<InputNumber onBlur={handleBlur}  />, { attachTo: container });
      wrapper.instance().focus();
      wrapper.instance().blur();
      expect(handleBlur).toBeCalled();
    });
  })
});
