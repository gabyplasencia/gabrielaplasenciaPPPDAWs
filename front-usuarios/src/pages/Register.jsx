
const Register = () => {
    
    return (
        <main className="main-wrapper">
            <form action="/" className="form" id="register">
                <h1 className="form__title">REGISTER</h1>
                <div className="form__field-wrapper">
                    <label htmlFor="email" className="form__label">Email:</label>
                    <input type="email" name="email" id="email" className="form__input" required/>
                </div>
                <div className="form__field-wrapper">
                    <label htmlFor="name" className="form__label">Username:</label>
                    <input type="name" name="name" id="name" className="form__input" required/>
                </div>
                <div className="form__field-wrapper">
                    <label htmlFor="password" className="form__label">Password:</label>
                    <input type="password" name="password" id="password" className="form__input" required/>
                </div>   
                <button className="regular-bnt">REGISTER</button> 
            </form>
        </main>
    )
}

export default Register