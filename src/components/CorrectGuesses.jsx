import { useState } from 'react';

export function CorrectGuesses({ correctGuesses }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleGuesses = (event) => {
        event.preventDefault();
        setIsOpen(!isOpen);
    }

    return (
        <section className="correctGuesses" onClick={toggleGuesses}>
            { isOpen ? 
                        <ul>
                            { correctGuesses.map((g) => {
                             return <li key={g}>{g}</li>
                            })}
                        </ul>
                    : <p>{ correctGuesses.length } words found </p>
            }
            { correctGuesses.length > 0
                    ? 
                        <a className="openclose" href="#" onClick={toggleGuesses}>
                            Click to { isOpen ? 'hide' : 'show' }
                        </a>
                    : null
            }
        </section>
    )
}