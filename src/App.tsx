import React from 'react';
import Accordion from './components/input';
import DynamicForm from './form/form'
import { FormField } from './form/interface'; 
import './App.css'

const App: React.FC = () => {
    const accordionItems = [
        {
            title: 'Accordion Item #1',
            content: <p>This is the content for item 1.</p>,
        },
        {
            title: 'Accordion Item #2',
            content: <p>This is the content for item 2.</p>,
        },
        {
            title: 'Accordion Item #3',
            content: <p>This is the content for item 3.</p>,
        },
    ];

    const formFields: FormField[] = [
      {
          name: 'username',
          label: 'Username',
          type: 'text',
          placeholder: 'Enter your username',
          required: true,
      },
      {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
          required: true,
      },
      {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
          required: true,
      },
      {
          name: 'age',
          label: 'Age',
          type: 'number',
          placeholder: 'Enter your age',
          required: false,
      },
  ];

    return (
        <div className="App">
            {/* <div className="Input"><Accordion items={accordionItems} /></div>     */}
            <div><DynamicForm formFields= {formFields}/></div>
        </div>
    );
};

export default App;
