import logoImg from '../assets/logo.jpg';

export default function Header() {
    return (
        <header id="main-header">
            <div id="title" >
                <img src={logoImg} alt='logo REACTFOOD' />
                <h1>REACTFOOD</h1>
            </div>
            <nav>
                <button className="button">Cart (0)</button>
            </nav>
        </header>
    );
}