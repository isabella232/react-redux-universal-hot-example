import React, { PropTypes } from 'react';

const { bool, object, string } = PropTypes;

const TextFieldWrapper = ({ disabled, input, styles, label, meta: { visited, name, asyncValidating, dirty, active, touched, error }, ...custom }) => {
  console.log(error);

  return (
    <div className={'form-group' + (error && touched ? ' has-error' : '')}>
      <label htmlFor={name} className="col-sm-2">{label}</label>
      <div className={'col-sm-8 ' + styles.inputGroup}>
        { asyncValidating && <i className={'fa fa-cog fa-spin ' + styles.cog}/>}
        <input
          type="text"
          className="form-control"
          disabled={disabled}
          {...input}
          {...custom}
          onChange={event => {
            const { value } = event.target;
            input.onChange(value);
          }}
          onBlur={event => {
            const { value } = event.target;
            input.onBlur(value);
          }}
        />
        {error && touched && <div className="text-danger">{error}</div>}
        <div className={styles.flags}>
          {dirty && <span className={styles.dirty} title="Dirty">D</span>}
          {active && <span className={styles.active} title="Active">A</span>}
          {visited && <span className={styles.visited} title="Visited">V</span>}
          {touched && <span className={styles.touched} title="Touched">T</span>}
        </div>
      </div>
    </div>
  );
};

TextFieldWrapper.propTypes = {
  disabled: bool,
  input: object,
  label: string,
  meta: object,
};

export default TextFieldWrapper;
