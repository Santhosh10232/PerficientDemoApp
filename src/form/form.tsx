import React, { useState } from 'react';
import * as Yup from 'yup';
import { FormField } from './interface';

interface DynamicFormProps {
    formFields: FormField[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formFields }) => {
    const [formValues, setFormValues] = useState<Record<string, string>>(
        formFields.reduce((values, field) => {
            values[field.name] = '';
            return values;
        }, {} as Record<string, string>)
    );

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const validate = async () => {
        const schema = Yup.object().shape(
            formFields.reduce((schema, field) => {
                if (field.required) {
                    schema[field.name] = Yup.string().required(`${field.label} is required`);
                }
                return schema;
            }, {} as Record<string, any>)
        );
        try {
            await schema.validate(formValues, { abortEarly: false });
            setErrors({});
            return true;
        } catch (err:any) {
            const validationErrors = err.inner.reduce((acc: Record<string, string>, error: any) => {
                acc[error.path] = error.message;
                return acc;
            }, {});
            setErrors(validationErrors);
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await validate();
        if (isValid) {
            console.log('Form Submitted:', formValues);
            // Handle successful form submission (e.g., send to an API)
        }
    };

    console.log("form",formValues.username)
    return (
        <form onSubmit={handleSubmit}>
            {formFields.map((field) => (
                <div key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formValues[field.name]}
                        onChange={handleChange}
                    />
                    {errors[field.name] && (
                        <div style={{ color: 'red' }}>{errors[field.name]}</div>
                    )}
                </div>
            ))}
            <button type="submit">Register</button>
        </form>
    );
};

export default DynamicForm;
