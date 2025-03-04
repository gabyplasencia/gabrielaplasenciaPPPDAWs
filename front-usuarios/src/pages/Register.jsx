
const Register = () => {
    
    return (
        <section className="main-wrapper">
            <form action="/" className="form">
                <h1 className="form__title">REGISTER</h1>
                <div className="form__field-wrapper">
                    <label htmlFor="email" className="form__label">Email:</label>
                    <input type="email" name="email" id="email" className="form__input"/>
                </div>
                <div className="form__field-wrapper">
                    <label htmlFor="username" className="form__label">Username:</label>
                    <input type="username" name="username" id="username" className="form__input"/>
                </div>
                <div className="form__field-wrapper">
                    <label htmlFor="password" className="form__label">Password:</label>
                    <input type="password" name="password" id="password" className="form__input"/>
                </div>   
                <button className="form__submit-btn">REGISTER</button> 
            </form>
        </section>
    )
}

export default Register