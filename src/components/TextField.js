import React from 'react';

class TextField extends React.Component {

  static defaultProps = {
    onChange: Boolean,
    onSubmit: Boolean
  }
  state = { scrollHeight: undefined }

  cache = {
    length: 0,
    height: 0
  }

  onChange = (e) => {
    const element = e.target, { value } = element, { cache } = this;
    if (value.length) {
      if (cache.length > value.length) {
        element.style.height = 'auto';
        cache.height = 0;
      }
      cache.length = value.length;
      const { scrollHeight } = element;
      if (cache.height < scrollHeight) {
        cache.height = scrollHeight;
        element.style.height = cache.height + 'px';
      }
    }
    return this.props.onChange(e);
  }

  componentDidMount() {
    const { textarea } = this.refs;

    Object.assign(textarea.style, {
      padding: 0,
      margin: 0,
      border: 'none',
      resize: 'none'
    });
  }

  componentDidUpdate() {
    const { textarea } = this.refs;
    if (textarea.value.length === 0) {
      textarea.style.height = 'auto';
    }
  }

  render() {
    const { props } = this;
    return (
      <label className="c-field">
        <span className="c-field_label">{props.label}</span>
        <div className="c-field_area">
          <textarea
            {...props}
            onChange={this.onChange}
            ref="textarea"
            className="c-field_input"
            />
          </div>
      </label>
    )
  }
}

export default TextField;