import Button from "./components/Button/Button.tsx";
import Input from "./components/Input/Input.tsx";


function App() {

    return (
        <>
            <Button>Button</Button>
            <Button appearance={'big'}>Button</Button>
            <Input placeholder={'Email'}/>
            <div>
                <a href="/">Menu link</a>
                <a href="/cart">Cart link</a>
            </div>
        </>
    )
}

export default App


