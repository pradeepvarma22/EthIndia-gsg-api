import { useRouter } from "next/router"
import { useState } from "react"
import AddQuestion from "../../../components/Admin/Dashboard/question/AddQuestion"
import Link from 'next/link'

export default function createquizz() {

    const [questions, setQuestions] = useState([])   // last lo add cheyy
    const [presentQuestionCounter, setPresentQuestionCounter] = useState(1)
    const [presentQuestion, setPresentQuestion] = useState("")
    const [presentQuestionOptions, setPresentQuestionOptions] = useState([]);
    const [quizzName, setQuizzName] = useState("");






    const router = useRouter()
    console.log(router.query)
    const presentCreateUserId = router.query.id

    async function saveData(){

        let temp_obj ={
            userId:  presentCreateUserId,
            length: questions.length,
            quizzName: quizzName
        }
        
        
        for(let i = 0; i < questions.length;i++){
            console.log(questions[i])
            temp_obj[i] = questions[i]
            console.log('xnxx')
        }

        const response = await fetch(`http://127.0.0.1:8000/add_questions/${presentCreateUserId}/`, {
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
        console.log(final)
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