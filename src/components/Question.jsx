import QuestionTimer from "./QuestionTimer.jsx";
import QUESTIONS from "../questions.js";
import Answers from "./Answers.jsx";
import {useState} from "react";


export default function Question({ index, onSelectANswer, onSkipAnswer}) {

    const [answer, setAnswer] = useState({
        selectAnswer: '',
        isCorrect: null
    });

    let timer = 10000;

    if (answer.selectAnswer){
        timer = 1000;
    }

    if (answer.isCorrect !== null){
        timer = 2000;
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectAnswer: answer,
            isCorrect: null
        })
        setTimeout(() => {
            setAnswer({
                selectAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectANswer(answer);
            }, 2000);
        }, 1000);
    }

    let answerState = '';

    if (answer.selectAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    }else if (answer.selectAnswer){
        answerState = 'answered'
    }

    return (
        <div id={"question"}>
            <QuestionTimer
                key={timer}
                timeOut={timer}
                onTimeOut={answer.selectAnswer === '' ? onSkipAnswer : null}
                mode={answerState}
            />

            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                answers={QUESTIONS[index].answers}
                selectAnswerss={answer.selectAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    )
}