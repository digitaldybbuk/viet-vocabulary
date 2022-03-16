import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './App.css'
import axios from 'axios'
import {ALL_ANSWERS, VIET_WORDS} from "./constants";

function App() {
    const [flashcards, setFlashcards] = useState([])
    const [categories, setCategories] = useState([])
    const defaultNumWords = VIET_WORDS.length
    const categoryEl = useRef()
    const amountEl = useRef()

    // useEffect(() => {
    //   axios
    //     .get('https://opentdb.com/api_category.php')
    //     .then(res => {
    //       setCategories(res.data.trivia_categories)
    //     })
    // }, [])
    function arrayRemove(arr, value) {

        return arr.filter(function(ele){
            return ele != value;
        });
    }

    function decodeString(str) {
        const textArea = document.createElement('textarea')
        textArea.innerHTML= str
        return textArea.value
    }
    function handleSubmit(e) {
        e.preventDefault()

        var reorderedVietWords = (VIET_WORDS.sort(() => 0.5 - Math.random()))
        setFlashcards(reorderedVietWords.slice(0,amountEl.current.value).map((questionItem, index) => {
                const answer = decodeString(questionItem.answer)
                const shuffled_answers = arrayRemove(ALL_ANSWERS.sort(() => 0.5 - Math.random()), answer);
                const options = [
                    ...shuffled_answers.slice(0, 3),
                    //...questionItem.options.map(a => decodeString(a)),
                    answer
                ]
                return {
                    id: `${index}-${Date.now()}`,
                    question: decodeString(questionItem.question),
                    answer: answer,
                    options: options.sort(() => Math.random() - .5)
                }
            }
        ))
        // axios
        // .get('https://opentdb.com/api.php', {
        //   params: {
        //     amount: amountEl.current.value,
        //     // category: categoryEl.current.value
        //   }
        // })
        // .then(res => {
        //   setFlashcards(res.data.results.map((questionItem, index) => {
        //     const answer = decodeString(questionItem.correct_answer)
        //     const options = [
        //       ...questionItem.incorrect_answers.map(a => decodeString(a)),
        //       answer
        //     ]
        //     return {
        //       id: `${index}-${Date.now()}`,
        //       question: decodeString(questionItem.question),
        //       answer: answer,
        //       options: options.sort(() => Math.random() - .5)
        //     }
        //   }))
        // })
    }

    return (
        <>
            <form className="header" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="amount">Number of Words</label>
                    <input type="number" id="amount" min="1" step="1" defaultValue={defaultNumWords} ref={amountEl} />
                </div>
                <div className="form-group">
                    <button className="btn">Generate</button>
                </div>
            </form>
            <div className="container">
                <FlashcardList flashcards={flashcards} />
            </div>
        </>
    );
}

const SAMPLE_WORDS =
    [
        {id: 1,
            question: "Test Question 1",
            answer: "Back",
            options: ["1","2","3"]
        },
        {id: 2,
            question: "Test Question 2",
            answer: "Back 2",
            options: ["1","2","3"]}
    ]

export default App;
