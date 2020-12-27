import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Row, Col, Button } from 'reactstrap';
import signup from './../../Asset/images/signup-image.webp';
import './Css.css';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
        boxShadow: "0px 0px 1px 1px lightgrey"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

const Signup = props => {
    const classes = useStyles();
    const [term, setTerm] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [psw, setPsw] = useState(true);
    const [nameVal, setnameVal] = useState(true);
    const [emailVal, setemailVal] = useState(true);

    const termCondition = () => {
        setTerm(!term);
    };

    const handleTextChange = (event, name) => {
        const value = event.target.value;

        if (name === "email") {
            setEmail(value);
            if (!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))
                setemailVal(true)
            else
                setemailVal(false)
        }
        else if (name === "password") {
            setPassword(value);
            if (!value || value.trim().length === 0 || value !== confirmPassword)
                setPsw(true)
            else
                setPsw(false)
        }
        else if (name === "confirmPassword") {
            setconfirmPassword(value);
            if (!value || value.trim().length === 0 || value !== password)
                setPsw(true)
            else
                setPsw(false)
        }
        else if (name === "name") {
            setName(value);
            if (!value || value.trim().length === 0)
                setnameVal(true);
            else
                setnameVal(false);
        }
    };

    const registerHandler = () => {
        props.createUser(name, password, email);
        props.history.push('/');
    }

    return (
        <Container component="main" maxWidth="md">
            <div className={classes.paper}>
                <form className={classes.form}>
                    <Row>
                        <Col>
                            <h1>Sign up</h1>
                            <TextField
                                id="input-with-icon-textfield"
                                placeholder="Your Name"
                                error={nameVal}
                                onChange={(event) => handleTextChange(event, "name")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <i className="zmdi zmdi-account zmdi-hc-lg"></i>
                                        </InputAdornment>
                                    ),
                                }}
                            /><br /><br />
                            <TextField
                                id="input-with-icon-textfield"
                                placeholder="Email"
                                error={emailVal}
                                onChange={(event) => handleTextChange(event, "email")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <i className="zmdi zmdi-email"></i>
                                        </InputAdornment>
                                    ),
                                }}
                            /><br /><br />
                            <TextField
                                id="input-with-icon-textfield"
                                placeholder="Password"
                                type="password"
                                error={psw}
                                onChange={(event) => handleTextChange(event, "password")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <i className="zmdi zmdi-lock"></i>
                                        </InputAdornment>
                                    ),
                                }}
                            /><br /><br />
                            <TextField
                                id="input-with-icon-textfield"
                                placeholder="Repeat your password"
                                type="password"
                                error={psw}
                                onChange={(event) => handleTextChange(event, "confirmPassword")}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <i className="zmdi zmdi-lock" style={{ color: 'whitesmoke' }}></i>
                                        </InputAdornment>
                                    ),
                                }}
                            /><br /><br />
                            <Checkbox
                                checked={term}
                                onChange={() => termCondition()}
                            /> I agree all statements in <span style={{ textDecoration: 'underline' }}>Term of services</span>
                            <br /><br />
                            <Button style={{ backgroundColor: '#6384f9' }}
                                disabled={!term || psw || nameVal || emailVal}
                                onClick={() => registerHandler()}
                            >Register</Button>

                        </Col>
                        <Col>
                            <img src={signup} alt="signup" /><br />
                            <span style={{ textDecoration: 'underline' }}>I am already member</span>
                        </Col>
                    </Row>


                </form>
            </div>
        </Container>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (name, password, email) => {
            dispatch({
                type: 'createUser',
                payload: {
                    "name": name, "password": password, "email": email
                }
            })
        },

    }
}

export default connect(
    null,
    mapDispatchToProps
)(Signup);


