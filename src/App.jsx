import React, { useState } from 'react'
import { FaStar } from "react-icons/fa"

const App = () => {
  const [state, setState] = useState(0);
  const [start, setStart] = useState(0);
  const [feedback, setFeedback] = useState({});
  const [card, setCard] = useState([]);

  const handleOver = (index) => {
    setState(index + 1);
  }

  const handleLeave = () => {
    setState(0);
  }

  const handleClick = (index) => {
    setStart(index + 1);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setCard([...card,
    {
      id: Date.now(),
      name: feedback.name,
      start: start,
      text: feedback.text
    }
    ]);
    setState(0);
    setStart(0);
    setFeedback({ text: "" });
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6">
          <form className="form" method="post" onSubmit={handleSubmit}>
            <h2>Feedback</h2>
            <input type="text" name="name" placeholder="Your Name" value={feedback.name || ''} onChange={handleChange} />
            <textarea name='text'
              rows="3"
              placeholder="Write your feedback..."
              value={feedback.text || ''}
              onChange={handleChange}
            />
            <div className="stars">
              {[...Array(5)].map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={32}
                    className="star"
                    color={start > index || state > index ? 'gold' : 'gray'}
                    onMouseOver={() => handleOver(index)}
                    onMouseLeave={handleLeave}
                    onClick={() => handleClick(index)}
                  />
                )
              })}
            </div>

            <button type="submit">Submit Feedback</button>
          </form>
        </div>
      </div>

      <div className="row justify-content-center">
        {card.map((item) => (
          <div className="col-3" key={item.id}>
            <div className="card">
              <h3>{item.name}</h3>
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    size={20}
                    color={index < item.start ? "gold" : "#ccc"}
                  />
                ))}
              </div>

              <blockquote>{item.text}</blockquote>
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}

export default App
