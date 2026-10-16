import Frame from './components/Frame'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ContactForm from './components/ContactForm'
import mathSticker from './assets/stickers/sticker-math.png'
import sleepSticker from './assets/stickers/sticker-sleep.png'
import dwgSticker from './assets/stickers/sticker-dwg.png'
import './App.css'

function App() {
  return (
    <>
      <Frame />
      <Navbar />

      <main>
        <section id="home">
          <h1 className="hero-name">I’m Sevitha</h1>
          <p className="hero-tagline">an aspiring software engineer</p>
          <p className="hero-bio">
            first-year computer science major at UT Dallas. currently building
            small projects and exploring{' '}
            <span className="nowrap">full-stack</span> web development.
          </p>
          <img className="sticker sticker-math" src={mathSticker} alt="" />
          <img className="sticker sticker-sleep" src={sleepSticker} alt="" />
          <img className="sticker sticker-dwg" src={dwgSticker} alt="" />
        </section>
        <section id="about">
          <h2>About</h2>
        </section>
        <section id="projects">
          <h2>Projects</h2>
        </section>
        <section id="contact">
          <h2 className="contact-title">Get in Touch</h2>
          <ContactForm />
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App
