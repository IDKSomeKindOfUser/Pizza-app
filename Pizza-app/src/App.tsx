import Button from "./components/Button/Button.tsx";
import Input from "./components/Input/Input.tsx";
import {Route, Routes} from "react-router-dom";
import { Menu } from "./pages/Menu/Menu.tsx";
import {Cart} from "./pages/Cart/Cart.tsx";
import {Error} from "./pages/Error/Error.tsx";

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

        <Routes>
            <Route path={'/'} element={<Menu/>}/>
            <Route path={'/cart'} element={<Cart/>}/>
            <Route path={'*'} element={<Error/>}/>
        </Routes>
    </>
  )
}

export default App
