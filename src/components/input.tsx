import React, { useState } from 'react';

interface AccordionItem {
    title: string;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        console.log("index",index)
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="accordion" id="accordionExample">
            {items.map((item, index) => (
                <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            onClick={() => toggleAccordion(index)}
                            aria-expanded={openIndex === index}
                            aria-controls={`collapse${index}`}
                        >
                            {item.title}
                        </button>
                    </h2>
                    <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${openIndex === index ? 'show' : ''}`}
                        aria-labelledby={`heading${index}`}
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            {item.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;
