const Contact = () => {
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="row wrap-social">
          <div className="col-6 social facebook mb-3" style={{backgroundColor: "#1976d2"}}>
            <a href="https://www.facebook.com/buitruongtin" style={{color: "#fff"}}>
              <img alt="facebook" src={"/assets/icon/facebook.png"} width="30" height="30" className="me-3"/>
              <span>Facebook</span>
            </a>
          </div>
          <div className="col-6 social google mb-3" style={{backgroundColor: "#fefefe"}}>
            <a href="storeman1311@gmail.com" style={{color: "#000"}}>
              <img alt="google" src={"/assets/icon/google.png"} width="30" height="30" className="me-3"/>
              <span>Google</span>
            </a>
          </div>
          <div className="col-6 social telegram mb-3" style={{backgroundColor: "#26a5e5"}}>
            <a href="https://t.me/TinTruong" style={{color: "#fff"}}>
              <img alt="telegram" src={"/assets/icon/telegram.png"} width="30" height="30" className="me-3"/>
              <span>Telegram</span>
            </a>
          </div>
          <div className="col-6 social github mb-3" style={{backgroundColor: "#fefefe"}}>
            <a href="https://github.com/tinryu" style={{color: "#000"}}>
              <img alt="github" src={"/assets/icon/github.png"} width="30" height="30" className="me-3"/>
              <span>Github</span>
            </a>
          </div>
          
        </div>
          
      </div>
    </>
  );
};

export default Contact;