import { useState } from "react"


export default function AddQuestion({ questions, setQuestions,
    presentQuestionCounter, presentQuestion, presentQuestionOptions, setPresentQuestionCounter, setPresentQuestion, setPresentQuestionOptions }) {


    const [isTrue, setIsTrue] = useState(false)
    const [optionCounter, setOptionCounter] = useState(1)
    const [presentOption, setPresentOption] = useState("")



    console.log(questions)

    




    return (
        <div>
     
     
            <div>

                <div>

                    {questions.map((innerArray, index) => (
                        <li key={index}>
                            {innerArray.map((item, index2) => <div key={index2}>{item}</div>)}
                        </li>
                    ))}


                    <br />
                    Present Question
                    <br />
                    <br />
                    {presentQuestion}<br />
                    {presentQuestionOptions} <br />
                    <br />
                    {presentOption}
                    <br />
                </div>

                <div>

                    <input type="text" onChange={(e) => setPresentQuestion(e.target.value)} placeholder="Question content" value={presentQuestion} />

                    <div>
                        <input type="text" onChange={(e) => setPresentOption(e.target.value)} placeholder="add options" value={presentOption} />
                        Is Option Correct ?
                        <input type="checkbox" onChange={() => setIsTrue(!isTrue)} checked={isTrue} />
                    </div>

                    <div>
                        <button onClick={() => handleAddMoreOption()}>Add more options</button>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={addNewQuestion}>Add New Questio</button>
            </div>
        </div>
    )

    function addNewQuestion() {
        setPresentQuestionCounter(prev => prev + 1)

        setQuestions([...questions, [presentQuestionCounter, presentQuestion, presentQuestionOptions]])
        setPresentQuestion("")
        setOptionCounter(1)
        setPresentQuestionOptions([]);

    }

    function handleAddMoreOption() {



        setPresentQuestionOptions([...presentQuestionOptions, [optionCounter, presentOption, isTrue]]);
        //         questionId: presentQuestionCounter,
        //         optionId: optionCounter,
        //         ans: presentOption,
        //         isTrue: isTrue
        setOptionCounter(optionCounter + 1);
        setPresentOption("");
        setIsTrue(false);

    }




}
