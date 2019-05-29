import * as React from 'react';
import propTypes from 'prop-types';

/**
 * inputNumber组件
 */
class InputNumber extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.value || '',
    };
  }

  inputRef = null

  // 提供给外界的失焦方法
  blur() {
    this.inputRef.blur();
  }

  // 提供给外界的聚焦方法
  focus() {
    this.inputRef.focus();
  }

  // 精度
  handlePrecision = (val) => {
    const {precision} = this.props
    if(+(precision) < 0){
      throw new Error('精度不可小于0')
    }
    if(+(precision) === 0){
      return val.indexOf('.') > -1 ? val.split('.')[0] : val;
    }
    if(+(precision) > 0 && val.indexOf('.') > -1){
      return `${val.split('.')[0]}.${val.split('.')[1].substring(0, precision)}`
    }
    return val
  }

  // 正负数
  handleNegative = (val) => {
    const {isSupportNegative} = this.props
    if(!isSupportNegative){
      val = val.replace(/-/, '')
    }
    return val
  }

  // 输入框内容改变
  handleChange = (event) => {
    const {onChange} = this.props
    let val = event.target.value.trim();
    // 为了最后一个字符能被删除
    if(val.toString() === ''){
      this.setState({
        inputValue: val,
      });
      onChange(event)
    }
    // 输入的为数字、-、.
    if ((/^(-?)\d+(\.\d+)?$/.test(val)) || (/^-$/.test(val))) {
      val = val.toString()
      // 正负数
      val = this.handleNegative(val)
      // 精度
      val = this.handlePrecision(val)
      this.setState({
        inputValue: val,
      });
      onChange(event)
    }
  }

  // 输入框聚焦
  handleFocus = (event) => {
    const {onFocus} = this.props
    onFocus(event);
  }

  // 输入框失焦
  handleBlur = (event) => {
    const {onBlur} = this.props
    onBlur(event);
  }

  render() {
    const { className, placeholder } = this.props;
    let { inputValue } = this.state;
    return (
      <div className={`${className}__wrapper`} >
        <input
          className={className}
          type="text"
          ref={(i) => {this.inputRef = i}}
          value={inputValue}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder={placeholder}
        />
      </div>
    )
  }
}

// props的类型校验
InputNumber.propTypes = {
  className: propTypes.string,
  isSupportNegative: propTypes.bool, // 支持负数
  precision: propTypes.number, // 精度
  onChange: propTypes.func,// 输入框内容改变的回调
  onFocus: propTypes.func,// 输入框聚焦的回调
  onBlur: propTypes.func,// 输入框失焦的回调
  placeholder: propTypes.string,// input的placeholder
  value: propTypes.any,// input的value
};

// 默认值
InputNumber.defaultProps = {
  className: 'input-number',
  isSupportNegative: false,
  precision: 0,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  inputProps: {},
  value: null,
  placeholder: '请输入',
};

export default InputNumber
