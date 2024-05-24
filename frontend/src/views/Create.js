import {Button,Box} from '@mui/material';
import {React,useState} from 'react'
import TextField from '@mui/material/TextField';
import {useForm} from 'react-hook-form'
import AxiosInstance from '../components/Routes';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';




const Create=()=>{
    const navigate=useNavigate()
    // const {handleSubmit,reset,setValuecontrol}=useForm()
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const defaultValues={
        name:'',
        comment:''
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(name,comment)
        AxiosInstance.post('http://localhost:8000/crud/',{
        name :name,
        comment:comment
        }
        )
        .then((res) =>{
            navigate('/')
        })
    }
    const onchangename = (event) => {
        setName(event.target.value);

      };
      const onchange = (event) => {
        setComment(event.target.value);

      };
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <Box sx={{marginTop:'30px'}}>
                    <TextField id="standard-basic" label="Name" variant="standard" onChange={onchangename} value={name} />
                </Box>
                <Box sx={{marginTop:'70px'}}>
                    <TextField id="standard-basic" label="Comment" variant="standard" onChange={onchange} value={comment}/>
                </Box>
                <Box sx={{marginTop:'70px'}}>
                    <Button variant="contained" type='submit'>Create</Button>
                </Box>
                {/* <Box sx={{marginTop:'70px'}}>
                    <Button variant="contained">Edit</Button>
                </Box>
                <Box sx={{marginTop:'70px'}}>
                    <Button variant="contained">Delete</Button>
                </Box>
                <Box sx={{marginTop:'70px'}}>
                    <Button variant="contained">List</Button>
                </Box> */}
            </form>
        </div>
    )
}
export default Create;