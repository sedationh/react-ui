import type { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { createForm, FormProps } from "./index";

const nameRules = { required: true, message: "请输入姓名！" };
const passwordRules = { required: true, message: "请输入密码！" };

class FormPage extends React.Component<FormProps> {
  componentDidMount() {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({ username: "a" });
  }

  submit = () => {
    console.log("trigger submit");
    const { getFieldsValue, validateFields } = this.props.form;
    validateFields((error, value) => {
      console.log("validateFields ", {
        error,
        value,
      });
    });
    console.log("submit", getFieldsValue());
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h3>FormPage</h3>
        {getFieldDecorator("username", { rules: [nameRules] })(
          <input className="border border-gray-300" placeholder="Username" />
        )}
        <br />
        {getFieldDecorator("password", { rules: [passwordRules] })(
          <input className="border border-gray-300" placeholder="Password" />
        )}
        <br />
        <button onClick={this.submit}>submit</button>
      </div>
    );
  }
}

const FormWithDecorator = createForm(FormPage);

export default {
  title: "Components/FormV3",
  component: FormWithDecorator,
} as Meta;

const Template: StoryFn = (args) => <FormWithDecorator {...args} />;

export const Default = Template.bind({});
Default.args = {};
