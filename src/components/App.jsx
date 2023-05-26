import { useEffect, useState } from 'react';
import React from 'react';
import Statistics from './statistics/statistics';
import FeedbackOptions from './feedbackOptions/feedbackOptions';
import Section from './sectionTittle/sectionTittle';
import Notification from './notification/notification';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [positivePercentage, setPositivePercentage] = useState(0);

  const handdleIncrement = event => {
    switch (event.target.name) {
      case 'good':
        setGood(state => state + 1);
        break;
      case 'neutral':
        setNeutral(state => state + 1);
        break;
      case 'bad':
        setBad(state => state + 1);
        break;

      default:
        return;
    }
  };

  useEffect(() => {
    setTotal(state => (state = good + neutral + bad));
  }, [good, neutral, bad]);

  useEffect(() => {
    setPositivePercentage(state => {
      if (total === 0) {
        state = 0;
        return state;
      } else {
        state = Math.round((good * 100) / total);
        return state;
      }
    });
  }, [good, neutral, bad, total]);

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Section tittle="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={handdleIncrement}
        />
      </Section>
      <Section tittle="Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </Section>
    </div>
  );
}


export default App;