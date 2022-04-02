import React from 'react';
import './landing.css';
import logo from './img/navbar-logo.svg';
import { withRouter } from 'react-router-dom'

var firebase = window.firebase;

class Landing extends React.Component  {

    componentDidMount () {
        var _self = this;
        if(!this.loginUI) {
            this.loginUI = new window.firebaseui.auth.AuthUI(firebase.auth());
            this.loginUI.start('#firebaseui-auth-container', {
                signInOptions: [
                  firebase.auth.EmailAuthProvider.PROVIDER_ID
                ],
                callbacks: {
                    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                      // User successfully signed in.
                      // Return type determines whether we continue the redirect automatically
                      // or whether we leave that to developer to handle.
                      console.log(authResult)
                      if(authResult.additionalUserInfo.isNewUser){
                        firebase.database().ref('users/' + authResult.user.uid).set({
                            username: authResult.user.displayName,
                            email: authResult.user.email
                          }, function(error) {
                            if (error) {
                              // The write failed...
                            } else {
                              // Data saved successfully!
                              _self.props.history.push("/profile");
                            }
                          });
                        
                      }else{
                          console.log(_self.props);
                          _self.props.history.push("/portfolio");
                      }
                      return false;
                    }
                  }
              });
              
        }
        console.log('mount it!');
    }

    render() {
    return(
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-shrink" id="mainNav">
            <div className="container">
                <a className="navbar-brand js-scroll-trigger" href="#page-top"><img src={logo} alt="" /></a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars ml-1"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ml-auto">
                        <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#services">Services</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <header className="masthead">
            <div className="container">
                <div className="masthead-subheading">Welcome To Indie Film Starter!</div>
                <div className="masthead-heading text-uppercase">We help you find your film crew </div>
                <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#login">Get Started</a>
            </div>
        </header>
        <section className="page-section" id="services">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Services</h2>
                    <h3 className="section-subheading text-muted">Jump start your film.</h3>
                </div>
                <div className="row text-center">
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-calendar fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Plan your project</h4>
                        <p className="text-muted">Plan out your filming schedule for each scene.</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-address-card fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Find your crew</h4>
                        <p className="text-muted">Find a film crew for your project from actors to camera operators.</p>
                    </div>
                    <div className="col-md-4">
                        <span className="fa-stack fa-4x">
                            <i className="fas fa-circle fa-stack-2x text-primary"></i>
                            <i className="fas fa-film fa-stack-1x fa-inverse"></i>
                        </span>
                        <h4 className="my-3">Join Projects</h4>
                        <p className="text-muted">Look for and join any project started by others.</p>
                    </div>
                </div>
            </div>
        </section>
        <section className="page-section" id="login">
            <div id="firebaseui-auth-container"></div>
        </section>
        <footer className="footer py-4">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 my-3 my-lg-0">
                        <span>Photo by <a href="https://unsplash.com/@imnoom?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Noom Peerapong</a> on <a href="https://unsplash.com/s/photos/film?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
                    </div>
                </div>
            </div>
        </footer>
      </div>
    )
  }
}
  
  export default withRouter(Landing);