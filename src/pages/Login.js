import '../styles/Login.css';

export default function Login() {
  return (
    <div className="Login">

    <div className="center">
        <div class="login-box">
            <h1 class="login-logo">StockEasy</h1>
            <form action="">
                <input class="input-write" type="text" placeholder="Usuário..."></input>
                <input class="input-write" type="password" placeholder="Senha..."></input>
                <input class="input-send" type="submit" value="ENTRAR"></input>
                <a href="/"><p>Esqueci minha senha</p></a>
            </form>
        </div>
    </div>

    <div className="wave1"></div>
    <div className="wave2"></div>
    <div className="wave3"></div>
    <div className="wave4"></div>
    <div className="wave5"></div>
    <div className="wave6"></div>
    <div className="wave7"></div>

    <div class="wave_star1"></div>
    <div class="wave_star2"></div>
    <div class="wave_star3"></div>
    <div class="wave_star4"></div>
    <div class="wave_star5"></div>
    <div class="wave_star6"></div>

    </div>
  );
}