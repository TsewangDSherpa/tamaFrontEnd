import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { AuthContext } from "../helpers/AuthContext";
import anime from '../anime.gif'
import chirp from '../petchirp.mp4'
import snore from '../petsnores.mp4'
import toy from '../pettoy.mp4'
import munch from '../petmunch.mp4'
import PetCanvas from "../components/reusable/PetCanvas";



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


function TAMA({ setAlert }) {
  const [pet, setPet] = useState(null);
  const { authState } = useContext(AuthContext);
  const username = authState.username;
  const [dialogue, setDialogue] = useState([]);
  const [petAction, setpetAction] = useState("Greet")

  const resetaction = ()=>{
    console.log("HOLLA")
    setpetAction("Idle");
  }
  useEffect(() => {
    axios.get(`http://localhost:3001/pets/byName/${username}`)
      .then((response) => {
        const petData = response.data[0];
        setPet(petData);
        if (petData) {
          axios.get(`http://localhost:3001/dialogues/${petData.personality}`)
            .then((response) => {
              const fetchedDialogues = response.data;
              console.log("Dialogues fetched successfully:", fetchedDialogues);
              setDialogue(fetchedDialogues);
            })
            .catch((error) => {
              console.error("Error fetching dialogue:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching pet information:", error);
      });

  }, []);

  const updateStat = (stat, value) => {
    if(value > 100){
      value =100;
    }
    axios.put(`http://localhost:3001/pets/updateStats/${pet.id}`, { stat, value })
      .then(response => {
        console.log(`Pet ${stat} increased`);
        setPet({ ...pet, [stat]: value });
      })
      .catch(error => {
        console.error(`Error increasing pet ${stat}:`, error);
      });
  };

  const feed = (value) => {
    console.log("PERSONALITY: " + value);
    if (pet.hunger >= 100) {
      setAlert({ message: "I can't eat any more!", type: "warning" });
      setpetAction("Talk")
    } else {
      setpetAction("Feed");
      switch(value) {
        case 1:
          updateStat("hunger", pet.hunger + 8);
          break;
        case 2:
          updateStat("hunger", pet.hunger + 10);
          break;
        case 3:
          updateStat("hunger", pet.hunger + 6);
          break;
        case 4:
          updateStat("hunger", pet.hunger + 5);
          break;
        case 5:
          updateStat("hunger", pet.hunger + 8);
          break;
        default:
          return "";
      }
  }
  };

  const increaseEnergy = (value) => {
    console.log("PERSONALITY: " + value);
    if (pet.sleepiness >= 100) {
      setAlert({ message: "I'm not tired right now!", type: "warning" });
      setpetAction("Talk")
    } else {
      
        setpetAction("Sleep")
    
      
      switch(value) {
        case 1:
          updateStat("sleepiness", pet.sleepiness + 10);
          break;
        case 2:
          updateStat("sleepiness", pet.sleepiness + 10);
          break;
        case 3:
          updateStat("sleepiness", pet.sleepiness + 10);
          break;
        case 4:
          updateStat("sleepiness", pet.sleepiness + 10);
          break;
        case 5:
          updateStat("sleepiness", pet.sleepiness + 10);
          break;
        default:
          return "";
      }
    }
  };

  const play = (value) => {
    console.log("PERSONALITY: " + value);
    if (pet.fun >= 100) {
      setAlert({ message: "I'm not in the mood right now.", type: "warning" });
      setpetAction("Talk")
    } else {
      setpetAction("Play");
      switch(value) {
        case 1:
          updateStat("fun", pet.fun + 8);
          break;
        case 2:
          updateStat("fun", pet.fun + 2);
          break;
        case 3:
          updateStat("fun", pet.fun + 5);
          break;
        case 4:
          updateStat("fun", pet.fun + 5);
          break;
        case 5:
          updateStat("fun", pet.fun + 8);
          break;
        default:
          return "";
      }
  }
  };

  const increaseAffection = (value) => {
    console.log("PERSONALITY: " + value);
    if (pet.affection >= 100) {
      setpetAction("Talk")
      setAlert({ message: "My love for you cannot grow any more!", type: "warning" });
    } else {
      setpetAction("Excited")
      switch(value) {
        case 1:
          updateStat("affection", pet.affection + 3);
          break;
        case 2:
          updateStat("affection", pet.affection + 1);
          break;
        case 3:
          updateStat("affection", pet.affection + 3);
          break;
        case 4:
          updateStat("affection", pet.affection + 2);
          break;
        case 5:
          updateStat("affection", pet.affection + 2);
          break;
        default:
          return "";
      }
    }
  };

  const getPersonalityName = (value) => {
    switch(value) {
      case 1:
        return "Normal";
      case 2:
        return "Cranky";
      case 3:
        return "Playful";
      case 4:
        return "Lazy";
      case 5:
        return "Calm";
      default:
        return "";
    }
  };

  const playSound = (soundId, stat) => {
    if (stat < 100) {
      const audio = document.getElementById(soundId);
      audio.play();
    }
  };
  
  

  return ( 
    <div style={{ margin: "auto" }}>
      <div className='Stats_container'>
          <div style={{backgroundColor:"#33223301", borderRadius:"50%", boxShadow:"2px 3px 4px 4px"}}>
          <PetCanvas givenaction={petAction} resetaction={resetaction}></PetCanvas>
          </div>
      </div>
      <div className='Stats_container'>
        {pet && (
          <div>
            <div className='DialogueBox' style={{backgroundColor:"#33333322", padding:"1.5em", margin:"1.4em"}}>
            <h2>{pet.name} says:</h2>
            <h3>{dialogue[Math.floor(Math.random() * dialogue.length)]}</h3>
            <p>Personality: {getPersonalityName(pet.personality)}</p>
          </div>
            <ButtonContainer>
              <StatContainer>
                <audio id="munchAudio" src={munch}></audio>
                <StyledButton onClick={() => { playSound("munchAudio", pet.hunger); feed(pet.personality);}}>
                  FEED
                </StyledButton>
                <progress value={(pet.hunger / 100) * 100} max={100}></progress>
                <p>Full Belly: {pet.hunger} / 100</p>
              </StatContainer>
              <StatContainer>
                <audio id="snoreAudio" src={snore}></audio>
                <StyledButton onClick={() => { playSound("snoreAudio", pet.sleepiness); increaseEnergy(pet.personality);}}>
                  REST
                </StyledButton>
                <progress value={(pet.sleepiness / 100) * 100} max={100}></progress>
                <p>Energy: {pet.sleepiness} / 100</p>
              </StatContainer>
              <StatContainer>
                <audio id="toyAudio" src={toy}></audio>
                <StyledButton onClick={() => { playSound("toyAudio", pet.fun); play(pet.personality);}}>
                  PLAY
                </StyledButton>
                <progress value={(pet.fun / 100) * 100} max={100}></progress>
                <p>Fun: {pet.fun} / 100</p>
              </StatContainer>
              <StatContainer>
                <audio id="chirpAudio" src={chirp}></audio>
                <StyledButton onClick={() => { playSound("chirpAudio", pet.affection); increaseAffection(pet.personality)}}>
                  HUG
                </StyledButton>
                <progress value={(pet.affection / 100) * 100} max={100}></progress>
                <p>Affection: {pet.affection} / 100</p>
              </StatContainer>
            </ButtonContainer>

          </div>
        )}
      </div>
    </div>

  );
}

export default TAMA;
