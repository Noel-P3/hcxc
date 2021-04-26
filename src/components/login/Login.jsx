import React, { useState } from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
const Login = ({ onLogIn }) => {

    const paperStyle = { padding: 20, height: '70vh', width: '50vh', margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const [data, setData] = useState({});

    const handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setData({ ...data, [event.target.name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogIn({ user: data.user, password: data.password });
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Iniciar Sesión</h2>
                </Grid>
                <TextField
                    name='user'
                    label='Usuario'
                    placeholder='Digitar usuario'
                    fullWidth
                    required
                    onChange={handleInputChange}
                />
                <form onSubmit={handleSubmit}>
                    <TextField
                        name='password'
                        label='Contraseña'
                        placeholder='Digitar contraseña'
                        type='password'
                        fullWidth
                        required
                        onChange={handleInputChange}
                    />
                    <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        style={btnstyle}
                        fullWidth
                    >
                        Iniciar Sesión
                </Button>
                </form>
                <Typography >
                    <Link href="#" >
                        Olvidaste la contraseña ?
                    </Link>
                </Typography>
                <Typography > Tienes una cuenta ?
                    <Link href="#" > Registrate aqui!</Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login