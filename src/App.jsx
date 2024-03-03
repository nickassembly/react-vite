import { useEffect, useState } from 'react';
import { Header } from './components/Header.jsx';
import { CorrectGuesses } from './components/CorrectGuesses.jsx';
import { Guess } from './components/Guess.jsx';
import { Honeycomb } from './components/Honeycomb.jsx';
import './App.css';


function App() {
    
    const [data, setData] = useState();
    const [guess, setGuess] = useState('');
    const [correctGuesses, setCorrectGuesses] = useState([]);

    const addLetter = (letter) => {
        setGuess((g) => g + letter);
    }

    const removeLetter = () => {
        setGuess(guess.slice(0, -1));
    }

    const addCorrectGuess = () => {
        setCorrectGuesses([...correctGuesses, guess])
    }

    const checkGuess = () => {
        if (correctGuesses.includes(guess)) {
            console.log('Already found');
        } else if (data.answers && data.answers.includes(guess)) {
            addCorrectGuess(guess);
            console.log('Correct Answer!');
        } else {
            console.log('Not in the list');
        }

        setGuess('');
    }


    // get data on initial render only
    useEffect(() => {
        async function fetchData() {
            const result = await fetch('/api/data.json', {
                    headers: { "Content-Type": "application/json" } })
                    const json = await result.json();
                    setData(json.data.today);
            }
            fetchData()
    }, []);
   
    return (
        <>
        { data 
            ? 
                <>
                    <Header date={data.displayDate} editor={data.editor} /> 
                    <CorrectGuesses correctGuesses={correctGuesses} />
                    <section className="container">
                        <div className="inputs">
                            <div className="center">
                                <Guess guess={guess} />
                                <Honeycomb 
                                    centerLetter={data.centerLetter}
                                    outerLetters={data.outerLetters}
                                    validLetters={data.validLetters} 
                                    addLetter={addLetter}
                                    removeLetter={removeLetter}
                                    checkGuess={checkGuess}
                                />
                            </div>
                        </div>
                    </section>
                </>
            : <p>...Loading</p> 
        }
        </>
    );
}

export default App
