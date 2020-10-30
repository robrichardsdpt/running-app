import React from 'react'
// import styled from 'styled-components'

class Quote extends React.Component {
  render () {
    const quoteArray = ['You miss 100% of the shots you don\'t take. -Wayne Gretzky',
      'The miracle isn\'t that I finished. The miracle is that I had the courage to start. - John Bingham',
      'Don\'t dream of winning, train for it! — Mo Farah',
      'Running allows me to set my mind free. Nothing seems impossible. Nothing unattainable. — Kara Goucher',
      'I don’t run to add days to my life, I run to add life to my days. – Ronald Rook',
      'I’ll be happy if running and I can grow old together. – Haruki Murakami',
      'The pain of running relieves the pain of living. – Jacqueline Simon Gunn',
      'If you run, you are a runner. It doesn’t matter how fast or how far. It doesn’t matter if today is your first day or if you’ve been running for twenty years. There is no test to pass, no license to earn, no membership card to get. You just run. – John Bingham',
      'I run because long after my footprints fade away, maybe I will have inspired a few to reject the easy path, hit the trails, put one foot in front of the other, and come to the same conclusion I did: I run because it always takes me where I want to go. – Dean Karnazes',
      'If it doesn’t challenge you, it won’t change you. – Fred DeVito',
      'The man who moves a mountain begins by carrying away small stones. – Confucius',
      'Never underestimate the power that one good workout can have on your mind. Keeping the dream alive is half the battle. – Kara Goucher',
      'Ask yourself: “Can I give more?” The answer is usually: “Yes.” – Paul Tergat',
      'Long distance running is 90 percent mental and the other half is physical. – Rich Davis',
      'Running is my private time, my therapy, my religion. – Gail W. Kislevitz',
      'There is something magical about running; after a certain distance, it transcends the body. Then a bit further, it transcends the mind. A bit further yet, and what you have before you, laid bare, is the soul. – Kristin Armstrong',
      'I hated every minute of training, but I said, ”Don’t quit. Suffer now and live the rest of your life as a champion.” – Muhammad Ali',
      'We all have dreams. But in order to make dreams come into reality, it takes an awful lot of determination, dedication, self-discipline, and effort. — Jesse Owens',
      'Run when you can, walk if you have to, crawl if you must; just never give up. – Dean Karnazes',
      'Run often. Run long. But never outrun your joy of running. —Julie Isphording',
      'I’m not telling you it’s going to be easy… I’m telling you it’s going to be worth it. – Art Williams',
      'The reason we race isn’t so much to beat each other,… but to be with each other. – Christopher McDougall',
      'I’ve learned that it’s what you do with the miles, rather than how many you’ve run – Rod DeHaven',
      'Remember, the feeling you get from a good run is far better than the feeling you get from sitting around wishing you were running. – Sarah Condor',
      'A runner must run with dreams in his heart. – Emil Zatopek',
      'Running is a thing worth doing not because of the future rewards it bestows, but because of how it feeds our bodies and minds and souls in the present. – Kevin Nelson',
      'Go fast enough to get there, but slow enough to see. – Jimmy Buffett',
      'Running is a road to self-awareness and reliance-you can push yourself to extremes and learn the harsh reality of your physical and mental limitations or coast quietly down a solitary path watching the earth spin beneath your feet. – Doris Brown Heritage'
    ]
    // generates random quote from array to be shown on the screen
    const randomQuote = function (array) {
      return array[Math.floor(Math.random() * array.length)]
    }
    return (
      <div className="quote">
        <h5>{randomQuote(quoteArray)}</h5>
      </div>
    )
  }
}

export default Quote
