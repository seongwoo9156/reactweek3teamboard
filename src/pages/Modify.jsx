import { useParams } from "react-router-dom"

import PostWrite from "../components/postwrite/PostWrite"
import Header from "../components/header/Header"

function Modify(){
    const { id } = useParams()

    return  <>
            <PostWrite id = {id}/>
        </>

}

export default Modify