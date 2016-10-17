import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import surveyValidation from './surveyValidation';
import FormTextField from '../FormTextField/FormTextField';
import * as surveyActions from 'redux/modules/survey';

import styles from './SurveyForm.scss';

function asyncValidate(data, dispatch, { isValidEmail }) {
  if (!data.email) {
    return Promise.resolve({});
  }
  return isValidEmail(data);
}

@connect(null, {...surveyActions})
@reduxForm({
  form: 'survey',
  validate: surveyValidation,
  asyncValidate,
  asyncBlurFields: ['email']
})
export default
class SurveyForm extends Component {
  static propTypes = {
    active: PropTypes.string,
    asyncValidating: PropTypes.bool.isRequired,
    dirty: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired
  }

  render() {
    const {
      dirty,
      active,
      onSubmit,
      handleSubmit,
      invalid,
      reset,
      pristine,
      valid
    } = this.props;

    return (
      <div>
        <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
          <Field component={FormTextField} name="name" label="Full Name" styles={styles} />
          <Field component={FormTextField} name="email" label="Email" styles={styles} />
          <Field component={FormTextField} name="occupation" label="Occupation" styles={styles} />
          <div className="form-group">
            <label htmlFor="currentlyEmployed" className="col-sm-2">Currently Employed?</label>
            <div className="col-sm-8">
              <Field name="currentlyEmployed" component="input" type="checkbox" id="currentlyEmployed" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2">Sex</label>
            <div className="col-sm-8">
              <label className={styles.radioLabel} >
                <Field name="sex" component="input" type="radio" value="male"/>
                Male
              </label>
              <label className={styles.radioLabel}>
                <Field name="sex" component="input" type="radio" value="female"/>
                Female
              </label>
              </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button className="btn btn-success" onClick={handleSubmit}>
                <i className="fa fa-paper-plane"/> Submit
              </button>
              <button className="btn btn-warning" onClick={reset} style={{ marginLeft: 15 }}>
                <i className="fa fa-undo"/> Reset
              </button>
            </div>
          </div>
        </form>

        <h4>Props from redux-form</h4>

        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Active Field</th>
              <td>{active}</td>
            </tr>
            <tr>
              <th>Dirty</th>
              <td className={dirty ? 'success' : 'danger'}>{dirty ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>Pristine</th>
              <td className={pristine ? 'success' : 'danger'}>{pristine ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>Valid</th>
              <td className={valid ? 'success' : 'danger'}>{valid ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <th>Invalid</th>
              <td className={invalid ? 'success' : 'danger'}>{invalid ? 'true' : 'false'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
