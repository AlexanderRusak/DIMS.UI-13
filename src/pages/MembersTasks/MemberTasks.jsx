import { useParams } from "react-router-dom"

export const MemberTasks = () => {

    const userName = useParams();
    console.log(userName);

    return (
        <h1>12121</h1>
    )
}