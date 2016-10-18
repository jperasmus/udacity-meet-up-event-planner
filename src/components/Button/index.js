import React, {
  PropTypes,
} from 'react';
import './index.css';

const Button = (props) => {
  return (
    <button onClick={props.buttonClickHandler} className={props.className}>{props.text}</button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  buttonClickHandler: PropTypes.func
};

Button.defaultProps = {
  text: '',
  className: 'primary-btn',
  buttonClickHandler: () => {
    console.log('button clicked but no custom handler exists');
  }
};

export default Button;
