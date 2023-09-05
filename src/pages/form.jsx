import React from 'react'
import FirstStep from '../components/FirstStep';
import SecondStep from '../components/SecondStep';
import TirstStep from '../components/TirstStep';
import {Stepper, StepLabel, Step} from '@mui/material';
import { ValueContext } from '../context/value.context';
import { useContext } from 'react';


function form() {
const multiStep = useContext(ValueContext)

 const handleSteps = (step) =>{
     switch (step) {
    case 0:
      return <FirstStep />
    case 1:
      return <SecondStep />
    case 2:
      return <TirstStep />
    default:
      throw new Error('Unknown step')
  }
 }
  return (
    <div>
      <h3 style={{textAlign:"center"}}>ສ້າງລາຍການ TAXLIST</h3>
      <div className="center-stepper">
        <Stepper activeStep={multiStep.currentStep} orientation="horizontal">
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
          <Step>
            <StepLabel></StepLabel>
          </Step>
        </Stepper>
      </div>
      {handleSteps(multiStep.currentStep)}
    </div>
  );
}

export default form