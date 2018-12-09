/**
 *
 * TouristAttractionForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose, defaultProps } from 'recompose';

// Antd
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

// Semantic
import { Segment, Header } from 'semantic-ui-react';

// Components
import withEntityFormBasicOperations from 'components/EntityFormBasicOperations';
import { MultipleImageUploader } from 'components/ImagesUploader';
import uploaderImagesValidator from 'components/ImagesUploader/validators';

const FormItem = Form.Item;

/* eslint-disable react/prefer-stateless-function */
class TouristAttractionForm extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    submitData: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitData(values);
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      loading,
      data,
      action,
    } = this.props;
    return (
      <div>
        <Segment basic textAlign="center">
          <Header as="h2">{`${action} Career`}</Header>
        </Segment>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Office Images">
            {getFieldDecorator('images', {
              initialValue: data.images || [],
              rules: [{ validator: uploaderImagesValidator, required: true }],
            })(<MultipleImageUploader name="Office Images" />)}
          </FormItem>
          <FormItem label="initials">
            {getFieldDecorator('initials', {
              rules: [{ required: true, message: 'Please fill city initials' }],
              initialValue: data.initials || '',
            })(<Input placeholder="Initials" name="initials" />)}
          </FormItem>
          <FormItem label="Address">
            {getFieldDecorator('address', {
              rules: [{ required: true, message: 'Please fill address' }],
              initialValue: data.address || '',
            })(<Input placeholder="Address" name="address" />)}
          </FormItem>
          <FormItem label="Contact number">
            {getFieldDecorator('contactNumber', {
              rules: [{ required: true, message: 'Please fill contactNumber' }],
              initialValue: data.contactNumber || '',
            })(<Input placeholder="Contact number" name="contactNumber" />)}
          </FormItem>
          <FormItem label="City">
            {getFieldDecorator('city', {
              rules: [{ required: true, message: 'Please fill city' }],
              initialValue: data.city || '',
            })(<Input placeholder="City" name="city" />)}
          </FormItem>
          <FormItem label="Latitude">
            {getFieldDecorator('lat', {
              rules: [{ required: true, message: 'Please fill latitude' }],
              initialValue: data.lat || '',
            })(<Input placeholder="Latitude" name="lat" />)}
          </FormItem>
          <FormItem label="Longitude">
            {getFieldDecorator('lng', {
              rules: [{ required: true, message: 'Please fill longitude' }],
              initialValue: data.lng || '',
            })(<Input placeholder="Longitude" name="lng" />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
            >
              Save
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const enhance = compose(
  defaultProps({ entityPath: 'offices/collection' }),
  withEntityFormBasicOperations,
  Form.create(),
);

export default enhance(TouristAttractionForm);
