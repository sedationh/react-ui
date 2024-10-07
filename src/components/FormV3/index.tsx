import React, { Component } from "react";

interface Rule {
  required?: boolean;
  message?: string;
}

interface FieldOption {
  rules: Rule[];
}

export interface FormProps {
  form: ReturnType<ReturnType<typeof createForm>["prototype"]["getForm"]>;
}

function createForm(Comp: any) {
  return class extends Component {
    options: Record<string, FieldOption>;

    constructor(props) {
      super(props);

      this.state = {};
      this.options = {};
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({
        [name]: value,
      });
    };

    getFieldDecorator = (name, option) => (InputComp) => {
      this.options[name] = option;
      return React.cloneElement(InputComp, {
        name: name,
        value: this.state[name] || "",
        onChange: this.handleChange,
      });
    };

    setFieldsValue = (newState) => {
      this.setState(newState);
    };

    validateFields = (callback) => {
      let error = {};
      for (const optionKey in this.options) {
        const rules = this.options[optionKey].rules;

        const errors = [];
        for (const rule of rules) {
          if (rule.required && !this.state[optionKey]) {
            errors.push({
              message: rule.message,
              field: optionKey,
            });
          }
        }
        if (errors.length) {
          error[optionKey] = { errors };
        }
      }
      if (!Object.keys(error).length) {
        error = null;
      }
      return callback(error, this.getFieldsValue());
    };

    getFieldsValue = () => {
      return { ...this.state };
    };

    getForm() {
      return {
        getFieldDecorator: this.getFieldDecorator,
        setFieldsValue: this.setFieldsValue,
        getFieldsValue: this.getFieldsValue,
        validateFields: this.validateFields,
      };
    }
    render() {
      return <Comp form={this.getForm()} />;
    }
  };
}

export { createForm };
