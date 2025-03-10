const Login = () => {
    
    return (
        <section className="main-wrapper">
            <form action="/" className="form" id="login">
                <h1 className="form__title">LOGIN</h1>
                <div className="form__field-wrapper">
                    <label htmlFor="email" className="form__label">Email:</label>
                    <input type="email" name="email" id="email" className="form__input" required/>
                </div>
                <div className="form__field-wrapper">
                    <label htmlFor="password" className="form__label">Password:</label>
                    <input type="password" name="password" id="password" className="form__input" required/>
                </div>   
                <button className="regular-bnt">LOGIN</button> 
            </form>
        </section>
    )
}

export default Login