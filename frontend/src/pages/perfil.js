import React, { useState } from 'react';
import { TextField, Button, Container, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MenuAppBar from '../components/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




function ProfilePage() {
    const [open, setOpen] = useState(false); 
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const nav = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    function handleDelete() {
        axios.delete(`http://localhost:5001/api/auth/delete/${userData.user.id_user}`)
        .then(response => {
            console.log(response.data);
        })
        .then(() => {
            localStorage.removeItem('user');
            nav('/');
        })
        .catch(error => {
            console.error(error);
        });
        handleClose();
    }        
    const data = localStorage.getItem("user");
    const userData = JSON.parse(data);

    function handleUpdate() {
        const formData = {
            nome: nome,
            email: email,
            password: password,
        }
        axios.put(`http://localhost:5001/api/auth/update/${userData.user.id_user}`, formData)
        .then(response => {
            console.log(response.data);
        })
        .then(() => {
            localStorage.setItem('user', JSON.stringify(formData));
            handleClose();
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <>
        <MenuAppBar  user={userData}/>
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="nome"
                        label="Nome"
                        name="nome"
                        value={nome}
                        onChange={(value) => setNome(value.target.value)}
                        autoComplete="nome"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={(value) => setEmail(value.target.value)}
                        autoComplete="email"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(value) => setPassword(value.target.value)}
                        autoComplete="current-password"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button
                            type="button"
                            variant="outlined"
                            color="error"
                            onClick={handleClickOpen}
                        >
                            Delete
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleUpdate}
                        >
                            Save
                        </Button>
                    </Box>
                </form>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Deletion"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete your profile? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
        </>
    );
}

export default ProfilePage;
