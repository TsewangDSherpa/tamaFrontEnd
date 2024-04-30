import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


interface Stats {
  [key: string]: number;
}

const initialStats: Stats = {
  food: 0,
  sleep: 0,
  enjoyment: 0,
};

const StatContainer = styled.div`
    display: flex;
    align-items: center;

    gap: 20px;
    flex-direction: column;

`
const TextBox = styled.div`
  align-items: center;
  margin: 40px;
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: row;
`

const StyledButton = styled.button`
    width: 100px; 
    height: 100px;
    border-width: 1px;
    border-radius: 42%;
    border:1 none;
    &:hover {
    background-color: #04AA6D; /* Green */
    color: white;
  }

`;

const Buttons = () => {
  const PetQuestions = ['Do you like me?', 'Can I have your SSID?', 'Can we play ball?', 'Do you want me to be happy?']
  const [stats, setStats] = useState<Stats>(initialStats);
  const [affec, setAffec] = useState(0);
  const [ques, setCurQues] = useState('Do you like me?')

  const handleIncreaseStat = (stat: string) => {
    setAffec(affec+1);
    setStats((prevStats) => ({
      ...prevStats,
      [stat]: prevStats[stat] + 2,
    }));
  };


  const handleResponse = (isGood: boolean) =>{
    if(isGood){
      alert('tama loved your response!')
      setAffec(affec+20);
    }else{
      alert('tama hated your response!')
      setAffec(affec-20);
    }
    setCurQues(PetQuestions[(Math.floor(Math.random() * PetQuestions.length))])
  }

  return (
    <div>
          <TextBox>Total affection: {affec}</TextBox>

    <ButtonContainer>
      {Object.keys(stats).map((stat) => (
        <StatContainer key={stat}>
          <StyledButton onClick={() => handleIncreaseStat(stat)}>Increase {stat}</StyledButton>
          <progress value={stats[stat]} max={100}></progress>
        </StatContainer>
      ))}

    </ButtonContainer>

        <TextBox>Pet question: {ques}</TextBox> 
        <ButtonContainer>
         <StatContainer>
        <StyledButton onClick={() => handleResponse(true)}>Yes!</StyledButton>
        </StatContainer>
        <StatContainer>
        <StyledButton onClick={() => handleResponse(false)}>NO!</StyledButton>
        </StatContainer>
        <StatContainer>
        <StyledButton onClick={() => handleResponse(Math.random() < 0.5)}>Idk</StyledButton>
        </StatContainer>
        </ButtonContainer>
    </div>
  );
};

export default Buttons;
