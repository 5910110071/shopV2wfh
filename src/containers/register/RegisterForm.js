import React, { Component } from "react"
import { reduxForm, Field } from "redux-form"
import FormField from "../../components/FormField"
import { RegisterFormFields } from "./RegisterFormFields"
class RegisterForm extends Component {

    renderFields(RegisterFormFields) {

        return RegisterFormFields.map(({ label, name, type, required }) => {
            return (
                <Field key={name} label={label} name={name} type={type} required={required} component={FormField} />
            )
        })

    }
    
    render() {
        const { onPaymentSubmit } = this.props
        return (
            <div className="container mb-3 card">
                <div className="row d-flex justify-content-center " >
                    <form onSubmit={this.props.handleSubmit(onPaymentSubmit)}>
                        <h2 className = "mt-3">ลงทะเบียนเข้าใช้งาน</h2>
                        {this.renderFields(RegisterFormFields)}
                        <div className="">
                            <button className="btn btn-block  btn-danger title mb-4 mt-4 " type="submit" >บันทึก</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function validate(values) {
    const errors = {};
    RegisterFormFields.forEach(({ name, required }) => {
        if (!values[name] && required) {
            errors[name] = 'กรุณากรอกข้อมูล'
        }
    })
    return errors // redux from จะจัดการโดยการส่ง error ไปให้ Field
}



RegisterForm = reduxForm({ validate, form: "registerForm" })(RegisterForm)
export default (RegisterForm)