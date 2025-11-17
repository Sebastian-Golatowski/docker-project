import { Button } from "./Button"

const Header = (props) => {
    return(
        <header className="header">
            <h1>Hi, {props.title}</h1>
            <Button color='green' name="Add"/>
        </header>
    )
}
Header.defaultProps = {
    title: "Task Tracker"
}

export default Header