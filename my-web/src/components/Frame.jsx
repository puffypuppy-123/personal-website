import './Frame.css'

// Squiggly border fixed around the edges of the screen
function Frame() {
  return (
    <div className="frame" aria-hidden="true">
      <div className="frame-side frame-top" />
      <div className="frame-side frame-bottom" />
      <div className="frame-side frame-left" />
      <div className="frame-side frame-right" />
    </div>
  )
}

export default Frame
