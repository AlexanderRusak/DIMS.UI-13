import { PureComponent } from "react";
import { RoleContext } from "../../hoc/RoleContext/RoleContext";
import classes from "./About.module.css";


export class About extends PureComponent {

    state = {
        data: '',
        email: ''
    }

    componentDidMount() {
        const data = localStorage.getItem('data');
        const email = localStorage.getItem('email');
        this.setState({
            data: JSON.parse(data),
            email
        })
    }


    render() {
        const { email, data } = this.state;
        console.log(email, data);

        const userName = data ? data[email].fullName : '';

        return (<div className={classes.About}>
            <h1>
                {userName}, wellcome to Dev Incubator Manage System
            </h1>
        </div>
        )
    }
}

About.contextType = RoleContext;