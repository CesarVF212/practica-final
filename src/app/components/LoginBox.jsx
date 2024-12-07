import "./LoginBox.css";

export default function LoginBox() {
  return (
    <div className="form-box">
      <h2>LOGIN</h2>
      <form action="login-form">
        <label htmlFor="email-box">Correo:</label>
        <br />
        <input type="email" id="email-box" name="email" />
        <br />
        <label htmlFor="password-box">Contraseña:</label>
        <br />
        <input type="password" id="password-box" name="password" />
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
