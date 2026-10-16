import { useState } from 'react'
import './ContactForm.css'

// FormSubmit forwards each message to this inbox. The very first message
// sends an activation email there instead; click its link once to turn it on.
const ENDPOINT = 'https://formsubmit.co/ajax/bollinenishopping@gmail.com'

// Links shown beside the send button. The resume lives in public/.
const RESUME_URL = '/SevithaBollineni_Resume.pdf'
const GITHUB_URL = 'https://github.com/'

const empty = { name: '', email: '', subject: '', message: '' }

function ContactForm() {
  const [fields, setFields] = useState(empty)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  const update = (e) =>
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...fields,
          _subject: `Website: ${fields.subject}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const data = await res.json().catch(() => ({}))
      // FormSubmit explains failures (e.g. "needs activation") in data.message
      if (!res.ok || String(data.success) !== 'true') {
        throw new Error(data.message || `Request failed (${res.status})`)
      }
      setFields(empty)
      setStatus('sent')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-row">
        <label>
          Name
          <input
            name="name"
            autoComplete="name"
            required
            value={fields.name}
            onChange={update}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={update}
          />
        </label>
      </div>
      <label>
        Subject
        <input
          name="subject"
          required
          value={fields.subject}
          onChange={update}
        />
      </label>
      <label>
        Message
        <textarea
          name="message"
          rows="4"
          required
          value={fields.message}
          onChange={update}
        />
      </label>

      <div className="contact-actions">
        <div className="contact-links">
          <a href={RESUME_URL} target="_blank" rel="noreferrer">
            {/* Document icon */}
            <svg viewBox="0 0 24 24" className="icon-stroke" aria-hidden="true">
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
              <path d="M14 3v5h5M9 13h6M9 17h6" />
            </svg>
            Resume
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            {/* GitHub mark */}
            <svg viewBox="0 0 16 16" className="icon-fill" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </a>
        </div>
        <p className="contact-status" role="status">
          {status === 'sending' && 'Sending…'}
          {status === 'sent' && 'Sent! Thanks for reaching out.'}
          {status === 'error' && `Couldn't send: ${error}`}
        </p>
        <button
          type="submit"
          className="contact-send"
          aria-label="Send message"
          disabled={status === 'sending'}
        >
          {/* Enter key arrow */}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 5v7a3 3 0 0 1-3 3H6" />
            <path d="M10 10l-5 5 5 5" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default ContactForm
