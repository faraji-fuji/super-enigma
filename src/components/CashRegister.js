import { useState, useEffect } from 'react';
import Display from './Display';
import CustomButton from './CustomButton';
import Register from './Register';
import Logout from './Logout';
import axios from 'axios';
import "./CashRegister.css"

export default function CashRegister({ authToken, handleAuthentication }) {
    const [displayContent, setDisplayContent] = useState("");
    const [registerEntries, setRegisterEntries] = useState([]);
    const [isComponentMounted, setComponentMounted] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const headers = { Authorization: `Token ${authToken}` }

    // helper functions
    const logout = async () => {
        try {
            console.log("sending logout request")
            const response = await axios.post(`${apiUrl}/logout/`, {}, { headers })
            console.log("Logged out")
        } catch (error) {
            console.log("an error occurred while logging out")
            console.log(error)
        } finally {
            sessionStorage.clear();
            handleAuthentication();
        }
    }

    const fetchEntries = async () => {
        try {
            console.log("fetching entries..")
            const response = await axios.get(`${apiUrl}/entries/`, { headers })
            console.log(response.data)
            setRegisterEntries(response.data);

        } catch (error) {
            // console.log(error.response.status)

            console.log("An error occurred while fetching entries")

            if (error.response.status === 401) {
                sessionStorage.clear()
                handleAuthentication()
            }
        }
    };

    const createEntry = async (displayContent) => {
        try {
            console.log("creating an entry")
            const response = await axios.post(`${apiUrl}/entries/`, { value: displayContent }, { headers });
            setRegisterEntries([...registerEntries, response.data])
            console.log(registerEntries)
        }
        catch (error) {
            console.log(error);

            if (error.response && error.response.status === 401) {
                sessionStorage.clear();
                handleAuthentication();
            }
        }
    }

    const updateDisplayContent = (value) => {
        let newDisplayContent = displayContent + value
        setDisplayContent(newDisplayContent)
    }

    const resetDisplay = () => {
        let newDisplayContent = "";
        setDisplayContent(newDisplayContent);
    }

    const deleteLastChar = () => {
        let newDisplayContent = displayContent.slice(0, -1);
        setDisplayContent(newDisplayContent)
    }

    // event handlers
    const handleLogoutClick = () => {
        logout();
    }

    const handleButtonClick = (value) => {
        // regex to check for decimal places and periods in the input
        const decimalRegexCheck = new RegExp(/^\d*\.\d{3,}$/)
        const periodRegexCheck = new RegExp(/\./)

        switch (value) {
            case "DEL":
                // check if display content is empty
                if (!displayContent) {
                    break;
                }

                deleteLastChar();
                break;

            case "ADD":
                // check if display is empty
                if (!displayContent) {
                    break;
                }

                createEntry(displayContent);
                resetDisplay();
                break;

            case ".":
                // check if period is in the display
                if (periodRegexCheck.test(displayContent)) {
                    break;
                }

                updateDisplayContent(value);
                break;

            default:
                //  check leading zeros
                if (value === "0" && displayContent === "") {
                    break;
                }

                // check if display content is greater than 1,000,000
                if (parseFloat(displayContent + value) > 1000000) {
                    break;
                }

                // check for more than two decimal places
                if (decimalRegexCheck.test(displayContent + value)) {
                    break;
                }

                updateDisplayContent(value);
        }
    }

    // Hooks
    // track mount state
    useEffect(() => {
        setComponentMounted(true)

        return () => setComponentMounted(false)
    })

    // fetch entries when component mounts
    useEffect(() => {
        if (isComponentMounted) {
            fetchEntries();
        }
    }, [isComponentMounted]);


    return (
        <div className='container'>
            <Display displayContent={displayContent} />
            <div className='flex-item'>
                <div className='btn-group'>
                    <CustomButton value={"1"} handleButtonClick={() => handleButtonClick("1")} />
                    <CustomButton value={"2"} handleButtonClick={() => handleButtonClick("2")} />
                    <CustomButton value={"3"} handleButtonClick={() => handleButtonClick("3")} />
                </div>
                <div className='btn-group'>
                    <CustomButton value={"4"} handleButtonClick={() => handleButtonClick("4")} />
                    <CustomButton value={"5"} handleButtonClick={() => handleButtonClick("5")} />
                    <CustomButton value={"6"} handleButtonClick={() => handleButtonClick("6")} />
                </div>
                <div className='btn-group'>
                    <CustomButton value={"7"} handleButtonClick={() => handleButtonClick("7")} />
                    <CustomButton value={"8"} handleButtonClick={() => handleButtonClick("8")} />
                    <CustomButton value={"9"} handleButtonClick={() => handleButtonClick("9")} />
                </div>
                <div className='btn-group'>
                    <CustomButton value={"DEL"} handleButtonClick={() => handleButtonClick("DEL")} />
                    <CustomButton value={"0"} handleButtonClick={() => handleButtonClick("0")} />
                    {/* period button to simplify adding cents */}
                    <CustomButton value={"."} handleButtonClick={() => handleButtonClick(".")} />
                </div>
                <div className='btn-group'>
                    <CustomButton value={"ADD"} handleButtonClick={() => handleButtonClick("ADD")} />
                </div>
            </div>
            <Register registerEntries={registerEntries} />
            <Logout handleLogoutClick={handleLogoutClick} />
        </div>
    )
}
