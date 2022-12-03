import Link from 'next/link'
import { useRouter } from "next/router"
import { useState } from "react"

import AddQuestion from "../../../components/Admin/Dashboard/question/AddQuestion"

export default function Createquizz() {

    const [questions, setQuestions] = useState([])   // last lo add cheyy
    const [presentQuestionCounter, setPresentQuestionCounter] = useState(1)
    const [presentQuestion, setPresentQuestion] = useState("")
    const [presentQuestionOptions, setPresentQuestionOptions] = useState([]);
    const [quizzName, setQuizzName] = useState("");






    const router = useRouter()

    const presentCreateUserId = router.query.id

    async function saveData(){

        let temp_obj ={
            userId:  presentCreateUserId,
            length: questions.length,
            quizzName: quizzName
        }
        
        
        for(let i = 0; i < questions.length;i++){

            temp_obj[i] = questions[i]
        }
        const URI = `${process.env.NEXT_PUBLIC_REST_API}/add_questions/${presentCreateUserId}/` 

        const response = await fetch(URI, {
            method: 'POST',
            body: JSON.stringify({
                questions: temp_obj,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const  final= await response.json()
        alert(final)

        if(final.error){
            alert('Internal Server Error')
        }else{
            router.push({
                pathname: `/admin/deatils/`,
                query: { id: final.User_id, qid: final.quizzId }            
            })
        }
    
    }




    return (
        <div>
            Hello {"  "} {presentCreateUserId}

            {/* <PrintAddedQuestions /> */}

            <input type="text" onChange={(e)=>setQuizzName(e.target.value)} placeholder="Quizz Name" />

            <AddQuestion
                presentQuestionCounter={presentQuestionCounter}
                presentQuestion={presentQuestion}
                presentQuestionOptions={presentQuestionOptions}
                questions={questions}
                setQuestions={setQuestions}
                setPresentQuestionCounter={setPresentQuestionCounter}
                setPresentQuestion={setPresentQuestion}
                setPresentQuestionOptions={setPresentQuestionOptions}

            />
            <br/>
            <br/>
            <br/>
            <div>
                <button onClick={saveData}>Next</button>
            </div>





            <br />
            <br />
            <br />
            <br />





        </div>
    )
}