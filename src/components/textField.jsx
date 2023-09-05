import { TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import { textFieldStyle } from '../style'


export default function MyTextField(props) {
    const {
        type,
        label,
        placeholder,
        autoComplete,
        name,
        value,
        width,
        onChange,
        required,
        variant
    } = props
  return (
    <Stack spacing={1}>
        <label style={{
          color: "#333333"
        }} htmlFor=""><strong>{label}</strong><span className='req'>{required && "*"}</span></label>
        <TextField required={required} type={type} value={value} autoComplete={autoComplete} onChange={onChange} name={name} variant={variant} placeholder={placeholder || label} sx={{...textFieldStyle, width: {width}}}/>
    </Stack>
  )
}
